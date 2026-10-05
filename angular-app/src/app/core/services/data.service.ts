import { Injectable, inject } from '@angular/core';
import { ToastService } from './toast.service';
import { KongService } from './kong.service';
import { SaveService } from './save.service';
import { icons } from '../../data/icons';
import { sciences } from '../../data/sciences';
import { buildings } from '../../data/buildings';
import { units } from '../../data/units';
import { civilizations } from '../../data/civilizations';
import { policies } from '../../data/policies';
import { jobs } from '../../data/jobs';
import { eras } from '../../data/eras';
import { deities } from '../../data/deities';
import { powers } from '../../data/powers';
import { spells } from '../../data/spells';
import { mysteries } from '../../data/mysteries';
import { difficulties } from '../../data/difficulties';
import { upgrades } from '../../data/upgrades';
import { features } from '../../data/features';
import { terrains } from '../../data/terrains';
import { improvements } from '../../data/improvements';
import type { GameData, PlayerState } from '../models/game-state';

/**
 * Core game logic service.
 *
 * Recovered from the minified production class used as `dataService`
 * (~272 methods). Method bodies here are stubs — port logic from
 * `decompiled/game/DataService.js` as features are rebuilt.
 */
@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly toastService = inject(ToastService);
  private readonly kongService = inject(KongService);
  private readonly saveService = inject(SaveService);

  /** Font-awesome / UI icon class map (`ug` in the bundle). */
  readonly icons = icons;

  /** Static design data tables recovered from the webpack bundle. */
  readonly conf = {
    sciences,
    buildings,
    units,
    civilizations,
    policies,
    jobs,
    eras,
    deities,
    powers,
    spells,
    mysteries,
    difficulties,
    upgrades,
    features,
    terrains,
    improvements,
    icons,
  };

  data: GameData = this.createEmptyGame();

  player(id: number | null = null): PlayerState {
    const idx = id == null ? 0 : id;
    return this.data.players[idx] ?? this.data.players[0];
  }

  private createEmptyGame(): GameData {
    return {
      players: [
        {
          id: 0,
          civ_id: 'romans',
          name: 'Player',
          deity: '',
          orientation: -75,
          sciences: {},
          science_queue: [],
          policies: { policies: [] },
          gold: 0,
          powers: {},
        },
      ],
      cities: [],
      turn: 0,
      version: 'reconstructed-0.1',
      darktheme: false,
      nostats: false,
      no_respawn: false,
      notif_pop: true,
      notif_building: true,
      max_rpt: 50,
      max_notif: 100,
      difficulty: 2,
      spellshidden: false,
      cooldowns: {},
      charging: {},
      spelltime: {},
      autocast: '',
      plagueMaxCities: 0,
      burnNb: 0,
      autopause: {
        citizen: false,
        building: false,
        science: false,
        incoming: false,
        city_captured: false,
        city_lost: false,
        city_joined: false,
        plague: false,
      },
    };
  }

  initGame(): void {
    this.data = this.createEmptyGame();
  }

  persist(): void {
    this.saveService.save(this.data);
  }

  hydrate(): boolean {
    const loaded = this.saveService.load();
    if (!loaded) return false;
    this.data = loaded;
    return true;
  }

  isDailyAllowed(..._args: any[]): boolean {
    return false;
  }
  isDeitySelectionAllowed(..._args: any[]): boolean {
    return false;
  }
  pop(..._args: any[]): number {
    return 0;
  }
  isUnlocked(..._args: any[]): boolean {
    // Reconstruction: unlock menus so recovered navigation is visible
    return true;
  }
  hasUpgrade(..._args: any[]): boolean {
    return false;
  }
  checkLocks(..._args: any[]): void {
    return;
  }
  cultureDiff(..._args: any[]): number {
    return 0;
  }
  cultureProduction(..._args: any[]): number {
    return 0;
  }
  cultureCost(..._args: any[]): number {
    return 0;
  }
  faithDiff(..._args: any[]): number {
    return 0;
  }
  faithProduction(..._args: any[]): number {
    return 0;
  }
  goldDiff(..._args: any[]): number {
    return 0;
  }
  goldTotal(..._args: any[]): number {
    return this.player().gold ?? 0;
  }
  maintenanceCost(..._args: any[]): number {
    return 0;
  }
  maintenanceUnitaryCost(..._args: any[]): number {
    return 0;
  }
  goldProduction(..._args: any[]): number {
    return 0;
  }
  totalTroopNb(..._args: any[]): number {
    return 0;
  }
  troopNb(..._args: any[]): number {
    return 0;
  }
  troopNbById(..._args: any[]): void {
    return;
  }
  troopNbInQueuesById(..._args: any[]): void {
    return;
  }
  maxGold(..._args: any[]): void {
    return;
  }
  scienceDiff(..._args: any[]): number {
    // Stub production rate until city science income is ported
    return 1;
  }
  scienceProduction(..._args: any[]): number {
    return 1;
  }
  sciencePerPop(..._args: any[]): void {
    return;
  }
  sciencePercent(..._args: any[]): number {
    const p = this.player();
    if (!p.science_queue?.length) return 0;
    const id = p.science_queue[0];
    const prog = p.sciences[id]?.progress ?? 0;
    const cost = this.scienceCost(this.conf.sciences[id]);
    return cost ? Math.floor((100 * prog) / cost) : 0;
  }
  scienceTime(id?: string | null): number {
    const p = this.player();
    const rate = this.scienceDiff() || 1;
    if (id) return this.scienceCost(this.conf.sciences[id]) / rate;
    if (!p.science_queue?.length) return 0;
    const cur = p.science_queue[0];
    const remaining =
      this.scienceCost(this.conf.sciences[cur]) - (p.sciences[cur]?.progress ?? 0);
    return remaining / rate;
  }
  discoverScience(..._args: any[]): void {
    return;
  }
  hasPolicyGroup(..._args: any[]): boolean {
    return false;
  }
  hasPolicy(..._args: any[]): boolean {
    return false;
  }
  hasScience(id: string, player: PlayerState | null = null): boolean {
    const p = player ?? this.player();
    return !!(p.sciences[id] && p.sciences[id].done);
  }
  hasScienceRank(rank: number): boolean {
    return Object.keys(this.player().sciences).some(
      (id) => (this.conf.sciences[id]?.rank ?? 0) >= rank && this.player().sciences[id]?.done,
    );
  }
  currentScienceRank(playerId = 0): number {
    const p = this.player(playerId);
    return Object.keys(p.sciences)
      .filter((id) => p.sciences[id]?.done)
      .map((id) => this.conf.sciences[id]?.rank ?? 0)
      .reduce((a, b) => Math.max(a, b), 0);
  }
  era(playerId = 0, rank = -1): string {
    if (rank === -1) rank = this.currentScienceRank(playerId);
    const found = Object.values(this.conf.eras).find(
      (e: any) => e.rank_start <= rank && e.rank_end >= rank,
    ) as { id: string } | undefined;
    return found?.id ?? 'prehistory';
  }
  isScienceAvailable(id: string, player: PlayerState | null = null): boolean {
    const p = player ?? this.player();
    const sci = this.conf.sciences[id];
    if (!sci) return false;
    return (sci.require as string[]).every((req) => this.hasScience(req, p));
  }
  foodDiff(..._args: any[]): number {
    return 0;
  }
  foodProduction(..._args: any[]): number {
    return 0;
  }
  foodRequired(..._args: any[]): void {
    return;
  }
  citizenTime(..._args: any[]): number {
    return 0;
  }
  prodDiff(..._args: any[]): number {
    return 0;
  }
  prodProduction(..._args: any[]): number {
    return 0;
  }
  buildingBonus(..._args: any[]): number {
    return 0;
  }
  health(..._args: any[]): void {
    return;
  }
  healthKillChance(..._args: any[]): number {
    return 0;
  }
  revoltRisks(..._args: any[]): void {
    return;
  }
  happiness(..._args: any[]): number {
    return 0;
  }
  influenceEffectTotal(..._args: any[]): number {
    return 0;
  }
  influenceEffectFromPlayer(..._args: any[]): void {
    return;
  }
  mostInfluencialPlayer(..._args: any[]): void {
    return;
  }
  popNbHappinessEffect(..._args: any[]): void {
    return;
  }
  citiesNbHappinessEffect(..._args: any[]): void {
    return;
  }
  happinessDistance(..._args: any[]): void {
    return;
  }
  happinessEffect(..._args: any[]): void {
    return;
  }
  cityForWonder(..._args: any[]): void {
    return;
  }
  isWonderDone(..._args: any[]): boolean {
    return false;
  }
  wondersNbTotal(..._args: any[]): number {
    return 0;
  }
  wondersNb(..._args: any[]): number {
    return 0;
  }
  wondersNbInCity(..._args: any[]): void {
    return;
  }
  hasWonder(..._args: any[]): boolean {
    return false;
  }
  isBuildingWonder(..._args: any[]): boolean {
    return false;
  }
  hasBuilding(..._args: any[]): boolean {
    return false;
  }
  buildingPercent(..._args: any[]): number {
    return 0;
  }
  buildingTime(..._args: any[]): number {
    return 0;
  }
  troopTimeToGoldCost(..._args: any[]): number {
    return 0;
  }
  isUpgradable(..._args: any[]): boolean {
    return false;
  }
  canUpgrade(..._args: any[]): boolean {
    return false;
  }
  upgradeCost(..._args: any[]): number {
    return 0;
  }
  upgrade(..._args: any[]): void {
    return;
  }
  buildingProdToGoldCost(..._args: any[]): number {
    return 0;
  }
  buyBuilding(..._args: any[]): void {
    return;
  }
  troopTime(..._args: any[]): number {
    return 0;
  }
  isSpellAvailable(spell: { id: string; level: number; lock?: string }): boolean {
    const orientation = this.player().orientation ?? -75;
    return !(
      (spell.level === 3 && orientation > -75) ||
      (spell.level === 2 && orientation > -50) ||
      (spell.level === 1 && orientation > -25) ||
      !!this.data.cooldowns?.[spell.id] ||
      this.isSpellLocked(spell)
    );
  }
  isSpellLocked(spell: { lock?: string }): boolean {
    return !!(spell.lock && !this.isUnlocked(spell.lock));
  }
  useSpell(spell: any, _engine?: unknown): void {
    if (!this.isSpellAvailable(spell)) return;
    this.data.cooldowns ??= {};
    this.data.charging ??= {};
    this.data.spelltime ??= {};

    if (spell.charging) {
      this.data.charging[spell.id] = (this.data.charging[spell.id] ?? 0) + 1;
    } else if (spell.time) {
      this.data.spelltime[spell.id] = spell.time;
    } else if (typeof spell.run === 'function') {
      if (!spell.run(this, _engine)) return;
    }

    this.data.cooldowns[spell.id] = spell.cooldown * this.coolDownMult();
    this.changeOrientation(this.player(), -1);
    this.checkLocks();
  }
  viewRange(..._args: any[]): number {
    return 0;
  }
  cityCache(..._args: any[]): void {
    return;
  }
  city(..._args: any[]): any {
    return null as any;
  }
  capital(..._args: any[]): any {
    return null as any;
  }
  allCities(..._args: any[]): any[] {
    return [];
  }
  closestCity(..._args: any[]): any {
    return null as any;
  }
  citiesInRange(..._args: any[]): number {
    return 0;
  }
  hasUndiscovered(..._args: any[]): boolean {
    return false;
  }
  closestUndiscovered(..._args: any[]): any {
    return null as any;
  }
  closestUndiscoveredWithRange(..._args: any[]): number {
    return 0;
  }
  distance(..._args: any[]): number {
    return 0;
  }
  cityDistance(..._args: any[]): void {
    return;
  }
  movPos(..._args: any[]): string {
    return '';
  }
  speedNoCity(..._args: any[]): void {
    return;
  }
  speed(..._args: any[]): void {
    return;
  }
  attackSpeed(..._args: any[]): boolean {
    return false;
  }
  defense(..._args: any[]): void {
    return;
  }
  getPlayerRatio(..._args: any[]): void {
    return;
  }
  attackMult(..._args: any[]): boolean {
    return false;
  }
  fight(..._args: any[]): void {
    return;
  }
  getLost(..._args: any[]): void {
    return;
  }
  spy(..._args: any[]): void {
    return;
  }
  minDistFromCity(..._args: any[]): void {
    return;
  }
  killCitizen(..._args: any[]): void {
    return;
  }
  killTroop(..._args: any[]): void {
    return;
  }
  govCost(..._args: any[]): number {
    return 0;
  }
  powerCost(..._args: any[]): number {
    return 0;
  }
  reincarnation(..._args: any[]): void {
    return;
  }
  chooseCiv(..._args: any[]): void {
    return;
  }
  allocatePowers(..._args: any[]): void {
    return;
  }
  powerAvailable(..._args: any[]): void {
    return;
  }
  addPower(..._args: any[]): void {
    return;
  }
  favorGain(..._args: any[]): void {
    return;
  }
  prestigeGain(..._args: any[]): void {
    return;
  }
  prestigeBonus(..._args: any[]): number {
    return 0;
  }
  nextPoint(..._args: any[]): number {
    return 0;
  }
  nextPrestige(..._args: any[]): number {
    return 0;
  }
  arrayIndexOf(..._args: any[]): void {
    return;
  }
  indexToCoords(..._args: any[]): [number, number] {
    return [0, 0] as [number, number];
  }
  setTile(..._args: any[]): void {
    return;
  }
  getTile(..._args: any[]): any {
    return null as any;
  }
  setTerrain(..._args: any[]): void {
    return;
  }
  getTerrain(..._args: any[]): any {
    return null as any;
  }
  setImprovement(..._args: any[]): void {
    return;
  }
  getImprovement(..._args: any[]): void {
    return;
  }
  setRoad(..._args: any[]): void {
    return;
  }
  getRoad(..._args: any[]): void {
    return;
  }
  hasRuin(..._args: any[]): boolean {
    return false;
  }
  cityConnectedToCapital(..._args: any[]): void {
    return;
  }
  cityConnected(..._args: any[]): void {
    return;
  }
  connected(..._args: any[]): boolean {
    return false;
  }
  roadConnected(..._args: any[]): void {
    return;
  }
  railConnected(..._args: any[]): void {
    return;
  }
  discover(..._args: any[]): void {
    return;
  }
  checkNewCiv(..._args: any[]): void {
    return;
  }
  completeCheckNewCiv(..._args: any[]): void {
    return;
  }
  isDiscovered(..._args: any[]): boolean {
    return false;
  }
  createScout(..._args: any[]): void {
    return;
  }
  createGold(..._args: any[]): void {
    return;
  }
  availableCitiesForTrade(..._args: any[]): void {
    return;
  }
  tradeRouteMaxDist(..._args: any[]): number {
    return 0;
  }
  supprTradeRouteForPlayers(..._args: any[]): void {
    return;
  }
  supprTradeRoute(..._args: any[]): void {
    return;
  }
  tradeRouteNb(..._args: any[]): number {
    return 0;
  }
  maxTradeRoute(..._args: any[]): void {
    return;
  }
  coloniesAvailable(..._args: any[]): void {
    return;
  }
  colonyNb(..._args: any[]): number {
    return 0;
  }
  colonyNbForCity(..._args: any[]): void {
    return;
  }
  colonyTotalGoldBonus(..._args: any[]): number {
    return 0;
  }
  colonyTotalTradeGoldBonus(..._args: any[]): number {
    return 0;
  }
  colonyTotalGoldBonusForCity(..._args: any[]): void {
    return;
  }
  colonyTotalTradeGoldBonusForCity(..._args: any[]): void {
    return;
  }
  colonyTotalHappinessBonus(..._args: any[]): number {
    return 0;
  }
  colonyGoldBonus(..._args: any[]): number {
    return 0;
  }
  colonyTradeGoldBonus(..._args: any[]): number {
    return 0;
  }
  colonyTotalScienceBonus(..._args: any[]): number {
    return 0;
  }
  colonyScienceBonus(..._args: any[]): number {
    return 0;
  }
  colonyHappinessBonus(..._args: any[]): number {
    return 0;
  }
  tradeRouteGains(..._args: any[]): void {
    return;
  }
  tradeRoutes(..._args: any[]): any[] {
    return [];
  }
  tradeRouteValueForTrade(..._args: any[]): void {
    return;
  }
  tradeRouteValue(..._args: any[]): number {
    return 0;
  }
  giftValue(..._args: any[]): number {
    return 0;
  }
  truce(..._args: any[]): void {
    return;
  }
  attackRatioRequired(..._args: any[]): boolean {
    return false;
  }
  war(..._args: any[]): void {
    return;
  }
  transferCity(..._args: any[]): void {
    return;
  }
  peaceCost(..._args: any[]): number {
    return 0;
  }
  playerAttack(..._args: any[]): void {
    return;
  }
  cityAttack(..._args: any[]): void {
    return;
  }
  attackAttack(..._args: any[]): boolean {
    return false;
  }
  fatigueRatio(..._args: any[]): number {
    return 0;
  }
  aiMinWarTime(..._args: any[]): number {
    return 0;
  }
  playerValue(..._args: any[]): number {
    return 0;
  }
  cityValue(..._args: any[]): number {
    return 0;
  }
  warChance(..._args: any[]): number {
    return 0;
  }
  scienceCost(science: { id: string; rank: number } | null | undefined, playerId = 0): number {
    if (!science) return 0;
    let mult =
      1 - 0.02 * this.data.players.filter((p) => this.hasScience(science.id, p)).length;
    if (playerId === 1) mult = 1;
    return Math.floor(mult * (5.5 * Math.pow(science.rank / 2, 7.8) - 10 + 20 * science.rank));
  }
  buildingGoldCost(..._args: any[]): number {
    return 0;
  }
  buildingProdCost(..._args: any[]): number {
    return 0;
  }
  coolDownMult(playerId = 0): number {
    return (
      (this.hasWonder(playerId, 'mausoleum') ? 0.85 : 1) *
      (this.hasWonder(playerId, 'taj') ? 0.85 : 1) *
      (this.hasPolicy('miracles', playerId) ? 0.8 : 1) *
      (1 - this.sequencerBonus(playerId))
    );
  }
  sequencerBonus(_playerId = 0, _extra = 0): number {
    return 0;
  }
  changeOrientation(player: PlayerState, delta: number): void {
    player.orientation = (player.orientation ?? -75) + delta;
    if (player.orientation < -100) player.orientation = -100;
    if (player.orientation > 100) player.orientation = 100;
  }
  abundanceBonus(_playerId = 0): number {
    return 0.2;
  }
  newfireBonus(playerId = 0): number {
    if (playerId !== 0) return 0;
    if (!this.data.charging?.['newfire'] || (this.player(playerId).orientation ?? 0) > 0) return 0;
    return 0.44 * Math.log10(1 + 0.3 * this.data.charging['newfire']);
  }
  sacrificeBonus(): number {
    return 10;
  }
  negociationBonus(..._args: any[]): number {
    return 0;
  }
  tradeNodeBonus(..._args: any[]): number {
    return 0;
  }
  warpathBonus(..._args: any[]): number {
    return 0;
  }
  warpathMaintenanceBonus(..._args: any[]): number {
    return 0;
  }
  berserkerAttackBonus(): number {
    return 0.25;
  }
  berserkerSpeedBonus(): number {
    return 0.25;
  }
  appropriationBonus(): number {
    return 1;
  }
  timeshiftBonus(): number {
    return 60;
  }
  enlightmentBonus(..._args: any[]): number {
    return 0;
  }
  mahaBonus(): number {
    return 100;
  }
  idlersBonus(): number {
    return 1;
  }
  dionysiaBonus(..._args: any[]): number {
    return 0;
  }
  bacchanaliaBonus(): number {
    return 0.25;
  }
  underworldBonus(): number {
    return 0.1;
  }
  punisherBonus(): number {
    return 0.05;
  }
  clairvoyanceBonus(..._args: any[]): number {
    return 0;
  }
  stoneBonus(..._args: any[]): number {
    return 0;
  }
  buildingNb(..._args: any[]): number {
    return 0;
  }
  serpentBonus(..._args: any[]): number {
    return 0;
  }
  eyeBonus(..._args: any[]): number {
    return 0;
  }
  valhallaBonus(..._args: any[]): number {
    return 0;
  }
  thirdeyeBonus(..._args: any[]): number {
    return 0;
  }
  eternityBonus(..._args: any[]): number {
    return 0;
  }
  ouroborosBonus(..._args: any[]): number {
    return 0;
  }
  blissBonus(..._args: any[]): number {
    return 0;
  }
  orphicBonus(..._args: any[]): number {
    return 0;
  }
  hasteBonus(..._args: any[]): boolean {
    return false;
  }
  recruitmentSpeed(..._args: any[]): number {
    return 0;
  }
  updateStats(..._args: any[]): void {
    return;
  }
  isPolicyAvailable(..._args: any[]): boolean {
    return false;
  }
  isPolicyGroupAvailable(..._args: any[]): boolean {
    return false;
  }
  hasAnyPolicyAvailable(..._args: any[]): boolean {
    return false;
  }
  hasAnyBuildingAvailable(..._args: any[]): boolean {
    return false;
  }
  isBuildingSelectable(..._args: any[]): boolean {
    return false;
  }
  isBuildingVisible(..._args: any[]): boolean {
    return false;
  }
  isBuildingAvailable(..._args: any[]): boolean {
    return false;
  }
  visibleBuildings(..._args: any[]): any[] {
    return [];
  }
  selectableBuildings(..._args: any[]): any[] {
    return [];
  }
  isTroopVisible(..._args: any[]): boolean {
    return false;
  }
  isTroopAvailable(..._args: any[]): boolean {
    return false;
  }
  isImprovementVisible(..._args: any[]): boolean {
    return false;
  }
  isImprovementAvailable(..._args: any[]): boolean {
    return false;
  }
  isImprovementAllowed(..._args: any[]): boolean {
    return false;
  }
  createWorker(..._args: any[]): void {
    return;
  }
  cancelMove(..._args: any[]): boolean {
    return false;
  }
  difficulty(..._args: any[]): number {
    return 0;
  }
  totalCultureUsed(..._args: any[]): void {
    return;
  }
  cultureResetCost(..._args: any[]): number {
    return 0;
  }
  haveRelation(..._args: any[]): boolean {
    return false;
  }
  getRelations(..._args: any[]): any[] {
    return [];
  }
  getRelation(..._args: any[]): any {
    return null as any;
  }
  atWar(..._args: any[]): boolean {
    return false;
  }
  allied(..._args: any[]): boolean {
    return false;
  }
  diploDiff(..._args: any[]): number {
    return 0;
  }
  diploBase(..._args: any[]): void {
    return;
  }
  diploRelations(..._args: any[]): void {
    return;
  }
  diploDeity(..._args: any[]): void {
    return;
  }
  diploProximity(..._args: any[]): void {
    return;
  }
  diploTrade(..._args: any[]): void {
    return;
  }
  influenceDiff(..._args: any[]): number {
    return 0;
  }
  influence(..._args: any[]): void {
    return;
  }
  promotionCost(..._args: any[]): number {
    return 0;
  }
  isPromotionAllowed(..._args: any[]): boolean {
    return false;
  }
  promote(..._args: any[]): void {
    return;
  }
  isCoastal(..._args: any[]): boolean {
    return false;
  }
  scoutAmbushRisk(..._args: any[]): number {
    return 0;
  }
  plagueInitRisk(..._args: any[]): number {
    return 0;
  }
  initPlague(..._args: any[]): void {
    return;
  }
  plagueDoctorRatio(..._args: any[]): void {
    return;
  }
  plagueRisk(..._args: any[]): number {
    return 0;
  }
  plague(..._args: any[]): void {
    return;
  }
  plagueNb(..._args: any[]): number {
    return 0;
  }
  plagueTroopKillChances(..._args: any[]): number {
    return 0;
  }
  plagueTradeLostChances(..._args: any[]): number {
    return 0;
  }
  color(..._args: any[]): number {
    return 0;
  }
  color2(..._args: any[]): string {
    return '';
  }
  upgradeTrade(..._args: any[]): void {
    return;
  }
  upgradeScienceMult(..._args: any[]): number {
    return 0;
  }
  upgradeHealth(..._args: any[]): void {
    return;
  }
  upgradeHappiness(..._args: any[]): void {
    return;
  }
  upgradeGoldMult(..._args: any[]): number {
    return 0;
  }
  upgradeSpeedMult(..._args: any[]): number {
    return 0;
  }
  improvements(..._args: any[]): void {
    return;
  }
  relicsGain(..._args: any[]): void {
    return;
  }
  relicsNb(..._args: any[]): number {
    return 0;
  }
  relicsValue(..._args: any[]): number {
    return 0;
  }
  changeOrientationFortech(..._args: any[]): void {
    return;
  }
  initCivs(..._args: any[]): void {
    return;
  }
  generateMap(..._args: any[]): void {
    return;
  }
  updateVersion(..._args: any[]): void {
    return;
  }
  getStrVersion(..._args: any[]): string {
    return '1.3.7';
  }
}
