import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoreEngineService } from '../../services/core-engine.service';
import { AiEngineService } from '../../services/ai-engine.service';
import { GameData } from '../../models/game-data.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy {
  constructor(
    public data: GameData,
    private core: CoreEngineService,
    private ai: AiEngineService,
  ) {}

  ngOnInit(): void {
    this.core.start();
    this.ai.start();
  }

  ngOnDestroy(): void {
    this.core.stop();
    try {
      this.ai.stop();
    } catch {
      /* ignore */
    }
  }
}
