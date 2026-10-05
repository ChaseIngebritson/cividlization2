import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { DataService } from '../../core/services/data.service';
import type { PlayerState } from '../../core/models/game-state';

interface ScienceNode {
  id: string;
  rank: number;
  x: number;
  y: number;
}

interface ScienceLink {
  origin: string;
  end: string;
  points?: [number, number][];
  d?: string;
}

interface SvgData {
  nodes: ScienceNode[];
  links: ScienceLink[];
  width: number;
  height: number;
}

interface HoverTip {
  title: string;
  desc: string;
  cost: number;
  time: number;
  x: number;
  y: number;
}

@Component({
  selector: 'app-science',
  standalone: true,
  templateUrl: './science.component.html',
  styleUrl: './science.component.scss',
})
export class ScienceComponent implements OnInit {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;

  readonly dataService = inject(DataService);
  readonly conf = this.dataService.conf;
  readonly icons = this.dataService.icons;

  player!: PlayerState;
  ctrl = false;

  ranks_nb = 0;
  readonly max_nodes = 5;
  readonly era_height = 28;
  readonly node_width = 150;
  readonly node_height = 40;
  readonly rank_sep = 100;
  readonly node_sep = 20;
  readonly curve = 20;
  readonly link_color = 'black';
  readonly era_color = 'url(#black)';
  readonly node_colors = {
    current: 'url(#blue)',
    inqueue: 'url(#lightblue)',
    done: 'url(#gold)',
    available: 'url(#green)',
    locked: 'url(#black)',
  };

  svg_data: SvgData = { nodes: [], links: [], width: 0, height: 0 };
  tip: HoverTip | null = null;

  /** Preserve eras insertion order (KeyValuePipe sorts alphabetically by default). */
  get erasList(): { key: string; value: any }[] {
    return Object.entries(this.conf.eras).map(([key, value]) => ({ key, value }));
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydownEvent(ev: KeyboardEvent): void {
    if (this.isCtrl(ev.key)) this.ctrl = true;
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyupEvent(ev: KeyboardEvent): void {
    if (this.isCtrl(ev.key)) this.ctrl = false;
  }

  ngOnInit(): void {
    this.player = this.dataService.player();
    if (!this.player.science_queue) this.player.science_queue = [];
    this.init();
  }

  private isCtrl(key: string): boolean {
    return key === 'Control' || key === 'Meta';
  }

  init(): void {
    this.svg_data.nodes = [];
    this.svg_data.links = [];
    Object.values(this.conf.sciences).forEach((sci: any) => {
      if (!this.isScienceUnlocked(sci)) return;
      this.svg_data.nodes.push({ id: sci.id, rank: sci.rank, x: 0, y: 0 });
      (sci.require as string[]).forEach((req) => {
        this.svg_data.links.push({ origin: req, end: sci.id });
      });
      this.ranks_nb = sci.rank;
    });
    this.initChart();
    setTimeout(() => this.scroll(), 10);
  }

  label(id: string): string {
    const sci = this.conf.sciences[id];
    const idx = this.player.science_queue.indexOf(id);
    return sci.label + (idx > 0 ? ` (${idx})` : '');
  }

  scroll(): void {
    if (!this.container?.nativeElement) return;
    this.container.nativeElement.scrollLeft =
      (this.dataService.currentScienceRank() - 2) * (this.node_width + this.rank_sep);
  }

  isScienceUnlocked(sci: { rank: number }): boolean {
    return this.isEraUnlocked(this.dataService.era(0, sci.rank));
  }

  isEraUnlocked(eraId: string): boolean {
    return eraId === 'prehistory' || this.dataService.isUnlocked('era_' + eraId);
  }

  color(id: string): string {
    if (this.player.science_queue[0] === id) return this.node_colors.current;
    if (this.player.science_queue.some((q) => q === id)) return this.node_colors.inqueue;
    if (this.player.sciences[id]?.done) return this.node_colors.done;
    if (this.dataService.isScienceAvailable(id)) return this.node_colors.available;
    return this.node_colors.locked;
  }

  clearQueue(): void {
    this.dataService.player().science_queue = [];
  }

  mouseenter(ev: MouseEvent, id: string): void {
    const sci = this.conf.sciences[id];
    if (!sci) return;
    this.tip = {
      title: sci.label,
      desc: sci.description ?? '',
      cost: this.dataService.scienceCost(sci),
      time: this.dataService.scienceTime(id),
      x: ev.clientX + 12,
      y: ev.clientY + 12,
    };
  }

  mouseleave(): void {
    this.tip = null;
  }

  select(id: string): void {
    if (this.player.sciences[id]?.done) return;

    if (this.dataService.isUnlocked('queue_science')) {
      const reqs = this.getReqs(id);
      reqs.sort((a, b) => {
        const ra = this.conf.sciences[a].rank;
        const rb = this.conf.sciences[b].rank;
        return ra > rb ? 1 : ra < rb ? -1 : 0;
      });
      reqs.push(id);
      if (this.ctrl) {
        this.player.science_queue.push(...reqs);
        this.player.science_queue = [...new Set(this.player.science_queue)];
      } else {
        this.player.science_queue = reqs;
      }
    } else {
      if (!this.dataService.isScienceAvailable(id)) return;
      this.player.science_queue = [id];
    }

    const head = this.player.science_queue[0];
    if (!this.player.sciences[head]) {
      this.player.sciences[head] = { progress: 0, done: false };
    }
  }

  getReqs(id: string): string[] {
    const out: string[] = [];
    (this.conf.sciences[id].require as string[]).forEach((req) => {
      if (!this.dataService.hasScience(req)) {
        out.push(req);
        out.push(...this.getReqs(req));
      }
    });
    return [...new Set(out)];
  }

  initChart(): void {
    this.svg_data.width =
      3 * Object.keys(this.conf.eras).length * (this.node_width + this.rank_sep - 1);
    this.svg_data.height =
      this.max_nodes * this.node_height + (this.max_nodes - 1) * this.node_sep;

    for (let rank = 1; rank <= this.ranks_nb; rank++) {
      const column = this.svg_data.nodes.filter((n) => n.rank === rank);
      column.forEach((node, i, arr) => {
        const t = arr.length;
        const offsetY =
          (this.svg_data.height - t * this.node_height - (t - 1) * this.node_sep) / 2 +
          this.era_height +
          this.node_sep;
        node.x = (this.node_width + this.rank_sep) * (node.rank - 1);
        node.y = (this.node_height + this.node_sep) * i + offsetY;
      });
    }

    this.svg_data.links.forEach((link) => {
      const origin = this.node(link.origin);
      const end = this.node(link.end);
      if (!origin || !end) {
        link.d = '';
        return;
      }
      link.points = [
        [origin.x + this.node_width, origin.y + this.node_height / 2],
        [end.x - 4, end.y + this.node_height / 2],
      ];
      const [a, b] = link.points;
      const midCurve =
        this.curve + (end.rank - origin.rank - 1) * (1.5 * this.rank_sep + this.node_width);
      link.d = `M${a[0]} ${a[1]} C ${a[0] + this.curve} ${a[1]}, ${b[0] - midCurve} ${b[1]}, ${b[0]} ${b[1]}`;
    });
  }

  node(id: string): ScienceNode | undefined {
    return this.svg_data.nodes.find((n) => n.id === id);
  }

  eraWidth(era: { rank_start: number; rank_end: number }): number {
    return (
      (era.rank_end - era.rank_start + 1) * (this.rank_sep + this.node_width) -
      (era.rank_start === 1 ? this.rank_sep / 2 : 0)
    );
  }

  eraX(era: { rank_start: number }): number {
    return (
      (era.rank_start - 1) * (this.node_width + this.rank_sep) -
      (era.rank_start === 1 ? 0 : this.rank_sep / 2)
    );
  }

  formatTime(seconds: number): string {
    if (!isFinite(seconds) || seconds <= 0) return '0s';
    const s = Math.ceil(seconds);
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    const rem = s % 60;
    if (m < 60) return rem ? `${m}m ${rem}s` : `${m}m`;
    const h = Math.floor(m / 60);
    const rm = m % 60;
    return rm ? `${h}h ${rm}m` : `${h}h`;
  }

  get legendY(): number {
    return this.svg_data.height + 2 * this.node_sep + this.era_height;
  }

  get svgHeight(): number {
    return this.svg_data.height + this.node_height + 2 * this.node_sep + this.era_height;
  }

  get svgWidth(): number {
    return this.svg_data.width + this.rank_sep;
  }

  get queueUnlocked(): boolean {
    return this.dataService.isUnlocked('queue_science');
  }
}
