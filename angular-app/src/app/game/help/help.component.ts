import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../core/services/data.service';

interface HelpTopic {
  id: string;
  name: string;
  html: string;
  parent?: string;
}

@Component({
  selector: 'app-help',
  standalone: true,
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss',
})
export class HelpComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly data = inject(DataService);
  private readonly sanitizer = inject(DomSanitizer);

  private readonly icons = this.data.icons;

  readonly topics: Record<string, HelpTopic> = this.buildTopics();

  id = 'home';

  constructor() {
    this.route.fragment.subscribe((frag) => {
      this.id = frag && this.topics[frag] ? frag : 'home';
    });
  }

  get current(): HelpTopic {
    return this.topics[this.id] ?? this.topics['home'];
  }

  get currentHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.current.html);
  }

  get parent(): HelpTopic | undefined {
    return this.current.parent ? this.topics[this.current.parent] : undefined;
  }

  get children(): HelpTopic[] {
    return Object.values(this.topics).filter((t) => t.parent === this.id);
  }

  get siblings(): HelpTopic[] {
    if (!this.current.parent) return [];
    return Object.values(this.topics).filter(
      (t) => t.parent === this.current.parent && t.id !== this.id,
    );
  }

  go(event: Event, id: string): void {
    event.preventDefault();
    this.id = id;
    history.replaceState(null, '', `/game/help#${id}`);
  }

  private buildTopics(): Record<string, HelpTopic> {
    const i = this.icons;
    const deities = Object.values(this.data.conf.deities) as any[];
    const difficulties = Object.values(this.data.conf.difficulties) as any[];
    const groups = Object.values(this.data.conf.policies.groups) as any[];

    return {
      home: {
        id: 'home',
        name: 'Cividlization II',
        html: `<p>Welcome to the Cividlization II Help pages !</p>
          <p>Here you will find answers to all of your questions about this Game.</p>
          <p><b class="text-danger">Spoiler alert !</b> While the help sections are a great way to learn more about the mechanics of this game, it might reveal some features that are locked in the early stage of the game.</p>
          <p>You can find the meaning of all the icons used in this game <a href="/game/help#icons">in this section</a>.</p>
          <div class="text-center w-100"><i class="text-500 fas fa-arrow-down"></i></div>`,
      },
      citizens: {
        id: 'citizens',
        name: 'Citizens & Improvements',
        parent: 'home',
        html: `<p>There are different types of citizens which all contribute to your empire in a specific way:
          <ul>
            <li>Idle citizens don't produce only what is needed to keep them alive.</li>
            <li><b>Hunter-gatherers</b> and <b>Farmers</b> specialize in <span class="text-food"><i class="${i.food}"></i> food</span></li>
            <li><b>Builders</b> specialize in <span class="text-prod"><i class="${i.prod}"></i> industrial</span> production</li>
            <li><b>Merchants</b> specialize in <span class="text-gold"><i class="${i.gold}"></i> gold</span></li>
            <li><b>Scientists</b> specialize in <span class="text-science"><i class="${i.science}"></i> science</span></li>
            <li><b>Artists</b> specialize in <span class="text-culture"><i class="${i.culture}"></i> culture</span> and happiness</li>
            <li><b>Priests</b> specialize in <span class="text-faith"><i class="${i.faith}"></i> faith</span></li>
          </ul></p>
          <p>You can allocate population manually or use auto-assign.</p>`,
      },
      'food-health-happiness': {
        id: 'food-health-happiness',
        name: 'Food, Health & Happiness',
        parent: 'home',
        html: `<p><span class="text-food"><i class="${i.food}"></i> Food</span> is the most important resource. Without it, cities will not grow.</p>
          <p><span class="text-health"><i class="${i.health}"></i> Health</span> sustains city growth.</p>
          <p><span class="text-happiness"><i class="${i.happiness}"></i> Happiness</span> is essential — without it production collapses and cities may revolt.</p>`,
      },
      buildings: {
        id: 'buildings',
        name: 'Production & Buildings',
        parent: 'home',
        html: `<p><span class="text-prod"><i class="${i.prod}"></i> Industrial production</span> constructs buildings that provide bonuses and unlock troop recruitment.</p>
          <p><span class="text-special">Wonders</span> are unique buildings — if someone else finishes first, you cannot complete yours.</p>`,
      },
      science: {
        id: 'science',
        name: 'Science',
        parent: 'home',
        html: `<p><span class="text-science"><i class="${i.science}"></i> Science</span> unlocks technologies for buildings, troops, policies and more.</p>
          <p>Technologies are grouped in Eras: Prehistoric, Ancient, Classical and Medieval.</p>`,
      },
      culture: {
        id: 'culture',
        name: 'Culture & Social Policies',
        parent: 'home',
        html: `<p><span class="text-culture"><i class="${i.culture}"></i> Culture</span> unlocks social policies.</p>
          <p>Policies are divided into 6 groups: ${groups.map((g) => g.name).join(', ')}.<br/>
          Some groups are exclusive — choose carefully!</p>`,
      },
      religion: {
        id: 'religion',
        name: 'Religion & Tech',
        parent: 'home',
        html: `<h5>Religion</h5>
          <p><span class="text-faith"><i class="${i.faith}"></i> Faith</span> lets you choose a Deity and cast Spells.
          Theology unlocks Reincarnation for divine favor and Powers.</p>
          <h5>Technology</h5>
          <p>In the Industrial Era you choose Magic or Technology — there is no easy way back.</p>`,
      },
      gold: {
        id: 'gold',
        name: 'Gold',
        parent: 'home',
        html: `<p><span class="text-gold"><i class="${i.gold}"></i> Gold</span> pays for buildings, troops and maintenance.
          Merchants, buildings and trade routes produce it. Raiding enemy cities is also effective.</p>`,
      },
      diplomacy: {
        id: 'diplomacy',
        name: 'Diplomacy & Trade',
        parent: 'home',
        html: `<p>After Exploration you meet civilizations; Diplomacy unlocks further interaction.
          Navigation unlocks <span class="text-trade"><i class="${i.trade}"></i> trade routes</span>.</p>
          <p>Relations depend on trade, proximity, religion and civilization traits.</p>`,
      },
      war: {
        id: 'war',
        name: 'War & Troops',
        parent: 'home',
        html: `<p>Attack to pillage gold or conquer cities (bring a governor after clearing all troops).</p>
          <p>Battles resolve in assaults: siege → ranged → melee. Defend before the Ancient Era ends!</p>`,
      },
      misc: {
        id: 'misc',
        name: 'Miscellaneous',
        parent: 'home',
        html: `<ul>
          <li><a href="/game/help#icons">Icons</a></li>
          <li><a href="/game/help#difficulties">Difficulty Levels</a></li>
          <li><a href="/game/help#daily_bonus">Daily Bonus</a></li>
        </ul>`,
      },
      food: {
        id: 'food',
        name: 'Food',
        parent: 'food-health-happiness',
        html: `<p><span class="text-food"><i class="${i.food}"></i> Food</span> grows your cities. New citizens appear when you reach the growth threshold.</p>`,
      },
      health: {
        id: 'health',
        name: 'Health & Plague',
        parent: 'food-health-happiness',
        html: `<p><span class="text-health"><i class="${i.health}"></i> Health</span> drops with population. Low health causes disease and plague outbreaks from the Classical Era.</p>`,
      },
      happiness: {
        id: 'happiness',
        name: 'Happiness',
        parent: 'food-health-happiness',
        html: `<p><span class="text-happiness"><i class="${i.happiness}"></i> Happiness</span> affects almost everything. Keep it high or cities may revolt.</p>`,
      },
      deities: {
        id: 'deities',
        name: 'Deities',
        parent: 'religion',
        html: `<p>After Religion you choose a deity. Each grants unique spells. You cannot change until reincarnation.</p>
          <table class="table table-sm"><tbody>
          <tr><th>Deity</th><th>Description</th></tr>
          ${deities
            .map(
              (d) =>
                `<tr><td nowrap><i class="${d.icon}" style="color:${d.color}"></i> ${d.name}</td><td>${d.description}</td></tr>`,
            )
            .join('')}
          </tbody></table>`,
      },
      reincarnation: {
        id: 'reincarnation',
        name: 'Reincarnation',
        parent: 'religion',
        html: `<p>Reincarnation resets your run but grants <span class="text-favor"><i class="${i.favor}"></i> favor</span>
          based on faith produced, which buys permanent Powers.</p>`,
      },
      powers: {
        id: 'powers',
        name: 'Powers',
        parent: 'religion',
        html: `<p>Spend divine favor on permanent powers that carry across reincarnations.</p>`,
      },
      spells: {
        id: 'spells',
        name: 'Spells',
        parent: 'religion',
        html: `<p>Your deity grants Spells: timed buffs, burst effects, and charging/incremental bonuses. Each has a cooldown.</p>`,
      },
      trade: {
        id: 'trade',
        name: 'Trade',
        parent: 'diplomacy',
        html: `<p><span class="text-trade"><i class="${i.trade}"></i> Trade routes</span> need a caravan and provide gold, culture and better relations.</p>`,
      },
      influence: {
        id: 'influence',
        name: 'Influence',
        parent: 'diplomacy',
        html: `<p><span class="text-influence"><i class="${i.influence}"></i> Influence</span> comes from culture and penalizes distant enemy cities' happiness and defense.</p>`,
      },
      military: {
        id: 'military',
        name: 'Military Troops',
        parent: 'war',
        html: `<p>Recruit military troops in cities with the required buildings. Siege, ranged and melee units fight in that order.</p>`,
      },
      daily_bonus: {
        id: 'daily_bonus',
        name: 'Daily Bonus',
        parent: 'misc',
        html: `<p>After Spirituality you receive one random gift every 24h: science, gold, food, culture or troops
          (Common / Rare / Epic).</p>`,
      },
      difficulties: {
        id: 'difficulties',
        name: 'Difficulty Levels',
        parent: 'misc',
        html: `<table class="table table-sm"><tbody>
          <tr><th>Difficulty</th><th>Description</th></tr>
          ${difficulties
            .map((d) => `<tr><td>${d.name}</td><td>${d.description}</td></tr>`)
            .join('')}
          </tbody></table>`,
      },
      icons: {
        id: 'icons',
        name: 'Icons',
        parent: 'misc',
        html: `<ul>
          <li><i class="${i.player}"></i> Player / City</li>
          <li><i class="${i.capital}"></i> Capital</li>
          <li><i class="${i.pop} text-pop"></i> Population</li>
          <li><i class="${i.food} text-food"></i> Food</li>
          <li><i class="${i.health} text-health"></i> Health</li>
          <li><i class="${i.happiness} text-happiness"></i> Happiness</li>
          <li><i class="${i.prod} text-prod"></i> Production</li>
          <li><i class="${i.science} text-science"></i> Science</li>
          <li><i class="${i.diplomacy} text-diplomacy"></i> Diplomacy</li>
          <li><i class="${i.gold} text-gold"></i> Gold</li>
          <li><i class="${i.culture} text-culture"></i> Culture</li>
          <li><i class="${i.faith} text-faith"></i> Faith</li>
          <li><i class="${i.favor} text-favor"></i> Favor</li>
          <li><i class="${i.trade} text-trade"></i> Trade Route</li>
          <li><i class="${i.troops}"></i> Troops</li>
          <li><i class="${i.attack}"></i> Attack</li>
          <li><i class="${i.defense}"></i> Defense</li>
          <li><i class="${i.speed}"></i> Speed</li>
        </ul>`,
      },
    };
  }
}
