// Reverse-engineered main game service (webpack class `l`)
// Source range: 762872-872089
// Methods: 272

class l {
  constructor(l, n, e, t, i) {
    (this.router = l),
      (this.data = n),
      (this.conf = e),
      (this.toastService = t),
      (this.kongService = i),
      (this.icons = ug);
  }
  isDailyAllowed() {
    return this.isUnlocked("daily_bonus")
      ? this.data.saveddaily > 0
        ? 1
        : Date.now() - this.data.lastdaily >= 828e5
          ? 2
          : 0
      : 0;
  }
  isDeitySelectionAllowed() {
    return this.isUnlocked("deity_selection") && !this.player().deity;
  }
  player(l = 0) {
    return this.data.players.find((n) => n.id == l);
  }
  pop(l = null) {
    return l
      ? Object.values(l.citizens).reduce((l, n) => l + n)
      : this.player()
          .cities.map((l) => this.pop(l))
          .reduce((l, n) => l + n);
  }
  isUnlocked(l) {
    return (
      this.data.locks.includes(l) || this.data.persistent_locks.includes(l)
    );
  }
  hasUpgrade(l) {
    return this.data.upgrades.includes(l);
  }
  checkLocks() {
    Object.keys(this.conf.locks).forEach((l) => {
      !this.isUnlocked(l) &&
        this.conf.locks[l].check(this, this.data) &&
        (this.conf.locks[l].persistent
          ? this.data.persistent_locks.push(l)
          : this.data.locks.push(l),
        this.toastService.success(
          "A new feature has been unlocked: " + this.conf.locks[l].name,
          ug.unlock,
          this.conf.locks[l].link,
        ));
    });
  }
  cultureDiff(l = null, n = null, e = !1) {
    return (
      n || (n = this.player()),
      l && l.cultureDiff && !e
        ? l.cultureDiff
        : l
          ? (this.cultureProduction(l) *
              (1 +
                (this.hasPolicy("philosophy", l.ownerid) &&
                this.hasBuilding(l, "library")
                  ? 0.05
                  : 0)) *
              (1 +
                (l.capital && this.hasPolicyGroup("traditionalism", l.ownerid)
                  ? 0.15
                  : 0)) *
              (1 + (this.hasPolicyGroup("imperialism", l.ownerid) ? 0.05 : 0)) *
              (1 + this.happinessEffect(l)) *
              (1 + ("culture" == l.bonus ? 0.2 : 0)) *
              (1 + this.ouroborosBonus(l.ownerid)) *
              this.getPlayerRatio(l.ownerid, "culture") +
              this.tradeRouteGains(l).culture) *
            (1 +
              (this.data.spelltime.dionysia
                ? this.dionysiaBonus(l.ownerid)
                : 0))
          : n.cities.map((l) => this.cultureDiff(l)).reduce((l, n) => l + n, 0)
    );
  }
  cultureProduction(l) {
    return (
      l.citizens.artists * this.conf.citizens.artists.culture(this, l.ownerid) +
      l.citizens.idle * this.conf.citizens.idle.culture(this, l.ownerid) +
      (this.hasBuilding(l, "monument") ? 1 : 0) +
      (this.hasBuilding(l, "amphitheatre") ? 2 : 0) +
      (this.hasBuilding(l, "opera") ? 5 : 0) +
      (this.hasBuilding(l, "museum") ? 10 : 0) +
      (this.hasBuilding(l, "palace") ? 2 : 0) +
      (this.hasBuilding(l, "pyramid") ? 5 : 0) +
      (this.hasBuilding(l, "mausoleum") ? 5 : 0) +
      (this.hasBuilding(l, "forbidden") ? 5 : 0) +
      (this.hasBuilding(l, "sistine") ? 15 : 0) +
      (this.hasBuilding(l, "versailles") ? 15 : 0) +
      (this.hasWonder(l.ownerid, "hermitage") ? 5 * (0 | l.relics) : 0) +
      (this.hasBuilding(l, "castle") &&
      "french" == this.player(l.ownerid).civ_id
        ? 10
        : 0) +
      (this.hasBuilding(l, "zoo") &&
      "brazilians" == this.player(l.ownerid).civ_id
        ? 10
        : 0)
    );
  }
  cultureCost(l = this.data.players[0]) {
    return Math.floor(
      (25 +
        Math.pow(
          6 * (l.policies.policies.length + l.policies.groups.length),
          2.8,
        )) *
        (0.3 + 0.7 * l.cities.length),
    );
  }
  faithDiff(l = null, n = null) {
    return l
      ? (this.faithProduction(l) *
          (1 +
            (l.capital && this.hasPolicy("landed_elite", l.ownerid)
              ? 0.5
              : 0)) *
          (1 + (this.hasPolicy("colonialism", l.ownerid) ? 0.15 : 0)) *
          (1 +
            (this.hasPolicy("reformation", l.ownerid) &&
            this.hasBuilding(l, "monastery")
              ? 0.1
              : 0)) *
          (1 +
            (this.hasPolicy("scientific_state", l.ownerid) &&
            this.hasBuilding(l, "uni")
              ? 0.1
              : 0)) *
          (1 +
            (this.hasPolicy("proselytism", l.ownerid)
              ? this.player(l.ownerid).cities.length / 100
              : 0)) *
          (1 +
            (this.data.spelltime.bacchanalia
              ? this.bacchanaliaBonus(l.ownerid)
              : 0)) *
          (1 + this.punisherBonus(l.ownerid) * this.plagueNb()) *
          (1 + this.happinessEffect(l)) *
          (1 + ("faith" == l.bonus ? 0.2 : 0)) +
          this.tradeRouteGains(l).faith) *
          this.difficulty().faith_mult
      : (n || (n = this.player()),
        n.cities.map((l) => this.faithDiff(l)).reduce((l, n) => l + n));
  }
  faithProduction(l) {
    return (
      l.citizens.priests * this.conf.citizens.priests.faith(this, l.ownerid) +
      this.pop(l) * this.orphicBonus(l.ownerid) +
      (this.hasBuilding(l, "shrine") ? 1 : 0) +
      (this.hasBuilding(l, "temple") ? 5 : 0) +
      (this.hasBuilding(l, "monastery") ? 15 : 0) +
      (this.hasBuilding(l, "pyramid") ? 2 * this.wondersNbInCity(l) : 0) +
      (this.hasPolicyGroup("piety", l.ownerid) && this.hasBuilding(l, "shrine")
        ? 2
        : 0)
    );
  }
  goldDiff(l = null) {
    return l
      ? this.goldProduction(l) *
          (1 +
            (l.capital && this.hasPolicy("aristocracy", l.ownerid)
              ? 0.25
              : 0)) *
          (1 + (this.hasPolicy("meritocracy", l.ownerid) ? 0.05 : 0)) *
          (1 + this.happinessEffect(l)) *
          (1 + this.colonyTotalGoldBonus(l.ownerid)) *
          (1 + ("gold" == l.bonus ? 0.2 : 0)) *
          this.getPlayerRatio(l.ownerid, "gold") *
          (this.cityConnectedToCapital(l) ? this.conf.road_gold_mult : 1) *
          this.upgradeGoldMult(l.ownerid) +
          this.tradeRouteGains(l).gold -
          this.maintenanceCost(l)
      : this.player()
          .cities.map((l) => this.goldDiff(l))
          .reduce((l, n) => l + n);
  }
  goldTotal(l = 0) {
    return this.player(l).cities.length
      ? this.player(l)
          .cities.map((l) => l.gold)
          .reduce((l, n) => l + n)
      : 0;
  }
  maintenanceCost(l) {
    return this.troopNb(l) * this.maintenanceUnitaryCost(l);
  }
  maintenanceUnitaryCost(l) {
    return (
      this.conf.troop_maintenance *
      (this.hasBuilding(l, "armory") ? 0.5 : 1) *
      (l.capital && this.hasPolicy("oligarchy", l.ownerid) ? 0.5 : 1) *
      (this.hasPolicy("professional_army", l.ownerid) ? 0.5 : 1) *
      (1 - this.warpathMaintenanceBonus(l.ownerid))
    );
  }
  goldProduction(l) {
    return (
      l.citizens.merchants * this.conf.citizens.merchants.gold(this, l) +
      (this.hasBuilding(l, "cop") ? 5 : 0) +
      (this.hasBuilding(l, "go") ? 15 : 0) +
      (this.hasBuilding(l, "coa") ? 25 : 0) +
      (this.hasBuilding(l, "palace") ? 2 : 0) +
      (this.hasBuilding(l, "colossus") ? 10 : 0) +
      (this.hasBuilding(l, "castle") &&
      "french" == this.player(l.ownerid).civ_id
        ? 10
        : 0)
    );
  }
  totalTroopNb(l = 0) {
    return this.player(l)
      .cities.map((l) => this.troopNb(l, !0))
      .reduce((l, n) => l + n);
  }
  troopNb(l, n = !0) {
    return (
      Object.values(l.troops).reduce((l, n) => l + n, 0) +
      (n
        ? this.data.attacks
            .filter((n) => n.from.x == l.x && n.from.y == l.y)
            .reduce(
              (l, n) => l + Object.values(n.troops).reduce((l, n) => l + n, 0),
              0,
            )
        : 0)
    );
  }
  troopNbById(l, n, e = !0, t = !0) {
    return (
      this.player(l).cities.reduce((l, e) => l + (e.troops[n] || 0), 0) +
      (t ? this.troopNbInQueuesById(l, n) : 0) +
      (e
        ? this.data.attacks
            .filter((n) => n.ownerid == l)
            .reduce(
              (l, e) =>
                l +
                Object.keys(e.troops).reduce(
                  (l, t) => l + (t == n ? e.troops[t] : 0),
                  0,
                ),
              0,
            )
        : 0)
    );
  }
  troopNbInQueuesById(l, n) {
    return this.player(l).cities.reduce(
      (l, e) =>
        l +
        e.troop_queue.filter((l) => l.id == n).reduce((l, n) => l + n.nb, 0),
      0,
    );
  }
  maxGold(l) {
    return this.hasBuilding(l, "reserve")
      ? 1e10
      : this.hasBuilding(l, "mint")
        ? 1e8
        : this.hasBuilding(l, "treasury")
          ? 1e6
          : this.hasBuilding(l, "chest")
            ? 1e3
            : 100;
  }
  scienceDiff(l = null, n = null) {
    return l
      ? this.scienceProduction(l) *
          (1 +
            (l.capital && this.hasPolicy("wisdom_ancients", l.ownerid)
              ? 0.25
              : 0)) *
          (1 +
            (this.hasPolicy("reformation", l.ownerid) &&
            this.hasBuilding(l, "monastery")
              ? 0.1
              : 0)) *
          (1 +
            (this.hasPolicy("scientific_state", l.ownerid) &&
            this.hasBuilding(l, "uni")
              ? 0.1
              : 0)) *
          (1 + this.happinessEffect(l)) *
          (1 + ("science" == l.bonus ? 0.2 : 0)) *
          (1 + this.clairvoyanceBonus(l.ownerid)) *
          (1 + this.enlightmentBonus(l.ownerid)) *
          (1 +
            (this.data.spelltime.bacchanalia
              ? this.bacchanaliaBonus(l.ownerid)
              : 0)) *
          (1 + this.punisherBonus(l.ownerid) * this.plagueNb()) *
          (1 + this.colonyTotalScienceBonus(l.ownerid)) *
          (1 + (this.hasBuilding(l, "oxford") ? 0.5 : 0)) *
          this.getPlayerRatio(l.ownerid, "science") *
          this.upgradeScienceMult(l.ownerid) +
          this.tradeRouteGains(l).science
      : (n || (n = this.player()),
        n.cities.map((l) => this.scienceDiff(l)).reduce((l, n) => l + n));
  }
  scienceProduction(l) {
    return (
      l.citizens.scientists * this.conf.citizens.scientists.science(this, l) +
      this.pop(l) * this.sciencePerPop(l.ownerid) +
      (this.hasBuilding(l, "palace") ? 2 : 0) +
      (this.hasBuilding(l, "library")
        ? this.buildingBonus("library", l.ownerid)
        : 0) +
      (this.hasBuilding(l, "uni") ? 15 : 0) +
      (this.hasBuilding(l, "school") ? 25 : 0)
    );
  }
  sciencePerPop(l = 0) {
    return (
      0.1 +
      (this.hasScience("language", this.player(l)) ? 0.1 : 0) +
      (this.hasPolicy("code_of_laws", l) ? 0.1 : 0)
    );
  }
  sciencePercent() {
    return this.player().science_queue.length
      ? Math.floor(
          (100 *
            this.player().sciences[this.player().science_queue[0]].progress) /
            this.scienceCost(
              this.conf.sciences[this.player().science_queue[0]],
            ),
        )
      : 0;
  }
  scienceTime(l) {
    return l || this.player().science_queue.length
      ? l
        ? this.scienceCost(this.conf.sciences[l]) / this.scienceDiff()
        : (this.scienceCost(
            this.conf.sciences[this.player().science_queue[0]],
          ) -
            this.player().sciences[this.player().science_queue[0]].progress) /
          this.scienceDiff()
      : 0;
  }
  discoverScience(l = 0) {
    let n = this.player(l),
      e =
        n.sciences[n.science_queue[0]].progress -
        this.scienceCost(this.conf.sciences[n.science_queue[0]], l);
    for (; e > 0 && n.science_queue.length; ) {
      if (
        ("future" == n.science_queue[0]
          ? ((n.sciences[n.science_queue[0]].progress = 0),
            (n.progress += 10),
            this.changeOrientationFortech(n, 10),
            (e = 0))
          : (n.sciences[n.science_queue[0]].done = !0),
        0 == n.id)
      ) {
        if (
          (this.toastService.success(
            "A new discovery : " + this.conf.sciences[n.science_queue[0]].label,
            ug.science,
            "/game/science",
          ),
          this.updateStats(),
          this.checkLocks(),
          "astronomy" == n.science_queue[0])
        ) {
          let l = this.data.players.filter((l) =>
            this.hasScience("astronomy", l),
          ).length;
          this.data.players.forEach((n) => {
            l < 2 &&
              this.isScienceAvailable("astronomy", n) &&
              ((n.sciences.astronomy = {
                progress: 0,
                done: !0,
              }),
              l++);
          });
        }
        this.currentScienceRank() >= 7 &&
          !this.data.last_plague &&
          (this.data.last_plague = 0.01);
      } else
        n.id > 1 &&
          ("religion" != n.science_queue[0] ||
            n.deity ||
            ((n.deity = yg.fromArray(Object.keys(this.conf.deities))),
            (this.data.deities[n.id] = n.deity)));
      "exploration" == n.science_queue[0] &&
        (this.completeCheckNewCiv(l),
        n.cities.forEach((l) => {
          this.viewRange(l.x, l.y, 1).forEach((l) => {
            this.setTile(n, l[0], l[1]);
          });
        })),
        "future" != n.science_queue[0] &&
          (n.science_queue.shift(),
          n.science_queue.length &&
            (n.sciences[n.science_queue[0]] ||
              (n.sciences[n.science_queue[0]] = {
                progress: 0,
                done: !1,
              }),
            (n.sciences[n.science_queue[0]].progress = e),
            (e -= this.scienceCost(
              this.conf.sciences[n.science_queue[0]],
              l,
            ))));
    }
  }
  hasPolicyGroup(l, n = 0) {
    return -1 != this.player(n).policies.groups.indexOf(l);
  }
  hasPolicy(l, n = 0) {
    return -1 != this.player(n).policies.policies.indexOf(l);
  }
  hasScience(l, n = null) {
    return n || (n = this.player()), !(!n.sciences[l] || !n.sciences[l].done);
  }
  hasScienceRank(l) {
    return (
      null !=
      Object.keys(this.player().sciences).find(
        (n) =>
          this.conf.sciences[n].rank >= l && this.player().sciences[n].done,
      )
    );
  }
  currentScienceRank(l = 0) {
    return Object.keys(this.player(l).sciences)
      .filter((n) => this.player(l).sciences[n].done)
      .map((l) => this.conf.sciences[l].rank)
      .reduce((l, n) => Math.max(l, n), 0);
  }
  era(l = 0, n = -1) {
    return (
      -1 == n && (n = this.currentScienceRank(l)),
      Object.values(this.conf.eras).find(
        (l) => l.rank_start <= n && l.rank_end >= n,
      ).id
    );
  }
  isScienceAvailable(l, n = null) {
    return (
      n || (n = this.player()),
      -1 ==
        this.conf.sciences[l].require
          .map((l) => this.hasScience(l, n))
          .indexOf(!1)
    );
  }
  foodDiff(l, n = null) {
    return l
      ? this.foodProduction(l) *
          (1 + this.happinessEffect(l)) *
          (1 + ("food" == l.bonus ? 0.2 : 0)) *
          (1 + this.serpentBonus(l)) *
          (1 +
            (this.data.spelltime.abundance
              ? this.abundanceBonus(l.ownerid)
              : 0)) *
          (1 + this.thirdeyeBonus(l)) *
          (1 +
            (this.hasPolicy("monopoly", l.ownerid) &&
            this.tradeRoutes(l).out.length
              ? 0.1
              : 0)) *
          (1 + this.prestigeBonus(l.ownerid)) *
          this.getPlayerRatio(l.ownerid, "food") -
          this.pop(l)
      : (n || (n = this.player()),
        n.cities.map((l) => this.foodDiff(l)).reduce((l, n) => l + n));
  }
  foodProduction(l) {
    return (
      1 +
      (l.citizens.idle * this.conf.citizens.idle.food(this, l) +
        l.citizens.farmers * this.conf.citizens.farmers.food(this, l) +
        (this.hasBuilding(l, "palace") ? 2 : 0) +
        (this.hasBuilding(l, "granary")
          ? this.buildingBonus("granary", l.ownerid)
          : 0) +
        (this.hasBuilding(l, "port") ? 5 : 0) +
        (this.hasBuilding(l, "mill") ? 10 : 0) +
        (this.hasBuilding(l, "hanging_gardens") ? 10 : 0))
    );
  }
  foodRequired(l) {
    return 52 + 6 * Math.pow(2, this.pop(l) + 2);
  }
  citizenTime(l) {
    return (this.foodRequired(l) - l.food) / this.foodDiff(l);
  }
  prodDiff(l) {
    return (
      this.prodProduction(l) *
      (1 + (this.hasPolicy("administration", l.ownerid) ? 0.05 : 0)) *
      (1 + this.happinessEffect(l)) *
      (1 + ("prod" == l.bonus ? 0.2 : 0)) *
      (1 + this.eternityBonus(l.ownerid)) *
      (1 + this.thirdeyeBonus(l)) *
      (1 + this.prestigeBonus(l.ownerid)) *
      (1 +
        (this.hasWonder(l.ownerid, "ruhr") &&
        l.building_queue.length &&
        "progress" == l.building_queue[0]
          ? 0.25
          : 0)) *
      (1 +
        (this.hasPolicy("liberalism", l.ownerid) &&
        l.building_queue.length &&
        "progress" == l.building_queue[0]
          ? 0.25
          : 0)) *
      this.getPlayerRatio(l.ownerid, "prod") *
      (2 == this.cityConnectedToCapital(l) ? this.conf.rail_prod_mult : 1)
    );
  }
  prodProduction(l) {
    return (
      l.citizens.builders * this.conf.citizens.builders.prod(this, l) +
      (this.hasBuilding(l, "workshop")
        ? this.buildingBonus("workshop", l.ownerid)
        : 0) +
      (this.hasBuilding(l, "furnace") ? 15 : 0) +
      (this.hasBuilding(l, "ironworks")
        ? this.buildingBonus("ironworks", l.ownerid)
        : 0) +
      (this.hasBuilding(l, "factory") ? 50 : 0) +
      (this.hasBuilding(l, "hydro") ? 50 : 0) +
      (this.hasBuilding(l, "palace") ? 2 : 0)
    );
  }
  buildingBonus(l, n) {
    return this.conf.buildings[l].bonus(this.player(n), this);
  }
  health(l) {
    return l
      ? Ng.constraint(
          1 -
            0.05 * this.pop(l) +
            l.citizens.scientists *
              this.conf.citizens.scientists.health(this, l.ownerid) -
            (l.plague && l.plague > 0 ? 0.3 : 0) +
            (this.hasScience("pottery") ? 0.05 : 0) +
            (this.hasBuilding(l, "well") ? 0.05 : 0) +
            (this.hasBuilding(l, "aqueduct") ? 0.1 : 0) +
            (this.hasBuilding(l, "hospital")
              ? this.hasPolicy("procedures", l.ownerid)
                ? 0.2
                : 0.15
              : 0) +
            (this.hasBuilding(l, "dispensary") ? 0.2 : 0) +
            (this.hasBuilding(l, "quarantine") ? 0.1 : 0) +
            (this.hasPolicy("organized_religion", l.ownerid) &&
            this.hasBuilding(l, "temple")
              ? 0.05
              : 0) +
            (this.hasPolicy("isolationism", l.ownerid) && l.capital
              ? 0.15
              : 0) +
            (this.hasPolicy("nih", l.ownerid) ? 0.05 : 0) +
            this.upgradeHealth(l.ownerid),
        )
      : this.player()
          .cities.map((l) => this.health(l))
          .reduce((l, n) => l + n) / this.player().cities.length;
  }
  healthKillChance(l) {
    return Ng.constraint(
      ((1 - this.underworldBonus(l.ownerid)) *
        (1 - (this.hasPolicy("red_cross", l.ownerid) ? 0.5 : 0)) *
        (Math.exp(30 * (1 - this.health(l))) - 1)) /
        1e14,
    );
  }
  revoltRisks(l) {
    let n = this.happiness(l);
    if (n >= (0 == l.ownerid ? 0.2 : 0.25)) return null;
    if (
      l.ownerchange &&
      Date.now() - l.ownerchange < this.conf.revoltImmunityDuration
    )
      return null;
    let e = Ng.constraint((Math.exp(30 * (1 - n)) - 1) / 4e14);
    this.hasBuilding(l, "police") && (e *= 0.5);
    let t = this.mostInfluencialPlayer(l);
    return yg.roll(e * (1 + 10 * t.influence)) ? t.player : null;
  }
  happiness(l, n = !1) {
    if (l && 1 == l.ownerid) return this.conf.barbarian_happiness;
    if (l && l.happiness && !n) return l.happiness;
    if (l) {
      let n = Ng.constraint(
        1 -
          this.popNbHappinessEffect(l) +
          l.citizens.artists *
            this.conf.citizens.artists.happiness(this, l.ownerid) +
          l.citizens.idle * this.conf.citizens.idle.happiness(this, l.ownerid) -
          this.citiesNbHappinessEffect(l.ownerid) -
          this.happinessDistance(l) +
          this.colonyTotalHappinessBonus(l.ownerid) +
          (this.hasPolicy("patriotism", l.ownerid) ? 0.05 : 0) +
          (this.hasBuilding(l, "gardens")
            ? this.buildingBonus("gardens", l.ownerid)
            : 0) +
          (this.hasBuilding(l, "theatre") ? 0.1 : 0) +
          (this.hasBuilding(l, "circus") ? 0.15 : 0) +
          (this.hasBuilding(l, "zoo") ? 0.15 : 0) +
          (this.hasBuilding(l, "hanging_gardens") ? 0.1 : 0) +
          (this.hasWonder(l.ownerid, "versailles") ? 0.1 : 0) +
          (this.hasPolicy("theocracy", l.ownerid) &&
          this.hasBuilding(l, "monastery")
            ? 0.05
            : 0) +
          (this.hasPolicy("secularism", l.ownerid) &&
          this.hasBuilding(l, "shrine")
            ? 0.05
            : 0) +
          (this.hasPolicy("despotism", l.ownerid) &&
          this.hasBuilding(l, "barracks")
            ? 0.05
            : 0) +
          (this.hasPolicy("police_state", l.ownerid) &&
          this.hasBuilding(l, "courthouse")
            ? 0.1
            : 0) +
          (this.hasPolicy("monopoly", l.ownerid) &&
          this.tradeRoutes(l).out.length
            ? 0.05
            : 0) +
          this.newfireBonus(l.ownerid) +
          this.blissBonus(l.ownerid) +
          this.eyeBonus(l.ownerid) +
          this.valhallaBonus(l) -
          this.influenceEffectTotal(l) +
          this.upgradeHappiness(l.ownerid),
      );
      return isNaN(n) ? 0.2 : n;
    }
    return (
      this.player()
        .cities.map((l) => this.happiness(l))
        .reduce((l, n) => l + n) / this.player().cities.length
    );
  }
  influenceEffectTotal(l) {
    return this.data.players
      .filter((n) => 1 != n.id && n.id != l.ownerid)
      .reduce((n, e) => n + this.influenceEffectFromPlayer(l, e), 0);
  }
  influenceEffectFromPlayer(l, n) {
    if (1 == n.id) return 0;
    if (!this.haveRelation(l.ownerid, n.id)) return 0;
    let e = Math.max(-2, this.influence(l.ownerid, n.id));
    if (e >= 0) return 0;
    let t = this.closestCity(l.x, l.y, n.id);
    if (t) {
      let i = this.cityDistance(l.id, t.id) + 0.5,
        s = 2;
      return (
        l.capital && (s = 1.6),
        (Math.floor(Math.pow(-100 * e, s) / (100 * Math.pow(i, 0.5))) / 100) *
          (l.rightful_ownerid == n.id
            ? this.conf.rightful_owner_influence_mult
            : 1) || 0
      );
    }
    return 0;
  }
  mostInfluencialPlayer(l) {
    let n = this.player(1),
      e = 0;
    return (
      this.data.players
        .filter((n) => 1 != n.id && n.id != l.ownerid)
        .forEach((t) => {
          let i = this.influenceEffectFromPlayer(l, t);
          i > e && ((n = t), (e = i));
        }),
      {
        player: n,
        influence: e,
      }
    );
  }
  popNbHappinessEffect(l) {
    let n = this.pop(l);
    return Math.floor(5 * Math.pow(n, 0.9)) / 100;
  }
  citiesNbHappinessEffect(l) {
    let n = this.player(l).cities.length;
    return Math.floor(5 * Math.pow(n, 0.8)) / 100;
  }
  happinessDistance(l) {
    return (
      0.025 *
      this.cityDistance(l.id) *
      (this.hasBuilding(l, "tribunal") ? 0.5 : 1) *
      (this.hasBuilding(l, "courthouse") ? 0.5 : 1) *
      (this.hasWonder(l.ownerid, "pantheon") ? 0.5 : 1)
    );
  }
  happinessEffect(l) {
    return Ng.constraint(1 - Math.exp(1 * (0.7 - this.happiness(l))), 0.25, -1);
  }
  cityForWonder(l) {
    return this.allCities().find((n) => this.hasBuilding(n, l));
  }
  isWonderDone(l) {
    return this.allCities().some((n) => this.hasBuilding(n, l));
  }
  wondersNbTotal() {
    let l = 0;
    return (
      Object.values(this.conf.buildings)
        .filter((l) => l.wonder)
        .forEach((n) => {
          this.isWonderDone(n.id) && l++;
        }),
      l
    );
  }
  wondersNb(l = 0) {
    let n = 0;
    return (
      Object.values(this.conf.buildings)
        .filter((l) => l.wonder)
        .forEach((e) => {
          this.hasWonder(l, e.id) && n++;
        }),
      n
    );
  }
  wondersNbInCity(l) {
    let n = 0;
    return (
      Object.values(this.conf.buildings)
        .filter((l) => l.wonder)
        .forEach((e) => {
          this.hasBuilding(l, e.id) && n++;
        }),
      n
    );
  }
  hasWonder(l, n) {
    return (
      !!this.player(l) &&
      this.player(l).cities.some((l) => this.hasBuilding(l, n))
    );
  }
  isBuildingWonder(l, n) {
    return this.player(l).cities.some((l) => l.building_queue.includes(n));
  }
  hasBuilding(l, n) {
    return l.buildings[n] && l.buildings[n].done;
  }
  buildingPercent(l) {
    return l.building_queue.length
      ? Math.floor(
          (100 * l.buildings[l.building_queue[0]].progress) /
            this.buildingProdCost(this.conf.buildings[l.building_queue[0]], l),
        )
      : 0;
  }
  buildingTime(l, n = "") {
    if (!n) {
      if (!l.building_queue.length) return 0;
      n = l.building_queue[0];
    }
    return (
      (this.buildingProdCost(this.conf.buildings[n], l) -
        (l.buildings[n] ? l.buildings[n].progress : 0)) /
      this.prodDiff(l)
    );
  }
  troopTimeToGoldCost(l, n, e = !0) {
    return (
      ((this.troopTime(l, n, e) * this.conf.troops[n].gold(this, l.ownerid)) /
        500) *
      50
    );
  }
  isUpgradable(l, n = 0) {
    return (
      l.upgradable && l.obsolete && this.hasScience(l.obsolete, this.player(n))
    );
  }
  canUpgrade(l, n, e) {
    return (
      this.isUpgradable(l, e.ownerid) && this.upgradeCost(l, n, e) < e.gold
    );
  }
  upgradeCost(l, n, e) {
    if (!l.upgradable) return 0;
    let t = this.conf.troops[l.upgradable];
    return t
      ? n *
          (t.gold(this, e.ownerid) -
            l.gold(this, e.ownerid) +
            (this.troopTimeToGoldCost(e, t.id, !1) -
              this.troopTimeToGoldCost(e, l.id, !1)))
      : 0;
  }
  upgrade(l, n) {
    let e = n.troops[l.id];
    this.canUpgrade(l, e, n) &&
      (n.troops[l.upgradable] || (n.troops[l.upgradable] = 0),
      (n.troops[l.upgradable] += e),
      delete n.troops[l.id],
      (n.gold -= this.upgradeCost(l, e, n)));
  }
  buildingProdToGoldCost(l, n) {
    let e = 50;
    return (
      "progress" == n && (e = 500),
      e *
        (this.buildingProdCost(this.conf.buildings[n], l) -
          (l.buildings[n] ? l.buildings[n].progress : 0))
    );
  }
  buyBuilding(l, n) {
    return !(
      l.gold < this.buildingProdToGoldCost(l, n) ||
      ((l.gold -= this.buildingProdToGoldCost(l, n)),
      "progress" == n
        ? ((l.buildings[n].progress = 0),
          l.building_queue.length > 1 && l.building_queue.shift())
        : (l.building_queue.splice(l.building_queue.indexOf(n), 1),
          (l.buildings[n] = {
            progress: 0,
            done: !0,
          })),
      0)
    );
  }
  troopTime(l, n = "", e = !0) {
    if (!n) {
      if (!l.troop_queue.length) return 0;
      n = l.troop_queue[0].id;
    }
    return (
      (this.conf.troops[n].time(this, l.ownerid) -
        (e && l.troops_progress[n] ? l.troops_progress[n] : 0)) /
      this.recruitmentSpeed(l)
    );
  }
  isSpellAvailable(l) {
    return !(
      (3 == l.level && this.player().orientation > -75) ||
      (2 == l.level && this.player().orientation > -50) ||
      (1 == l.level && this.player().orientation > -25) ||
      this.data.cooldowns[l.id] ||
      this.isSpellLocked(l)
    );
  }
  isSpellLocked(l) {
    return l.lock && !this.isUnlocked(l.lock);
  }
  useSpell(l, n) {
    if (this.isSpellAvailable(l)) {
      if (l.charging)
        this.data.charging[l.id]
          ? this.data.charging[l.id]++
          : (this.data.charging[l.id] = 1);
      else if (l.time) this.data.spelltime[l.id] = l.time;
      else if (!l.run(this, n)) return;
      (this.data.cooldowns[l.id] = l.cooldown * this.coolDownMult()),
        this.changeOrientation(this.player(), -1),
        this.checkLocks();
    }
  }
  viewRange(l, n, e) {
    let t = [];
    for (let i = -e; i <= e; i++)
      for (let s = -e; s <= e; s++) t.push([l + i, n + s]);
    return t;
  }
  cityCache() {
    (this.data.citiespos = {}),
      (this.data.citiesids = {}),
      this.data.players.forEach((l, n) => {
        l.cities.forEach((l, e) => {
          (this.data.citiespos[l.x + "_" + l.y] = [n, e]),
            (this.data.citiesids[l.id] = [n, e]);
        });
      });
  }
  city(l, n) {
    if (void 0 === n) {
      if (!this.data.citiesids) return this.allCities().find((n) => n.id == l);
      {
        let n = this.data.citiesids[l];
        if (n) {
          let l = this.data.players[n[0]];
          if (l) return l.cities[n[1]];
        }
      }
      return null;
    }
    if (this.data.citiespos) {
      let e = this.data.citiespos[l + "_" + n];
      if (e) {
        let l = this.data.players[e[0]];
        if (l) return l.cities[e[1]];
      }
    } else
      for (let e of this.data.players)
        for (let t of e.cities) if (t.x == l && t.y == n) return t;
    return null;
  }
  capital(l = 0) {
    return this.player(l).cities.find((l) => l.capital);
  }
  allCities() {
    return [].concat(...this.data.players.map((l) => l.cities));
  }
  closestCity(l, n, e = 0, t) {
    let i = 99999999999,
      s = void 0;
    return (
      (t
        ? this.allCities().filter((l) => l.ownerid != e)
        : this.player(e).cities
      ).forEach((e) => {
        let t = this.distance(l, n, e.x, e.y);
        t < i && 0 != t && ((i = t), (s = e));
      }),
      s
    );
  }
  citiesInRange(l, n) {
    return this.allCities().filter(
      (e) => e.id != l.id && this.cityDistance(l.id, e.id) <= n,
    );
  }
  hasUndiscovered(l) {
    return (
      this.player(l).discovered.length <
        this.arrayIndexOf(
          this.conf.init.map_size + 1,
          this.conf.init.map_size + 1,
        ) || this.player(l).discovered.some((l) => !l)
    );
  }
  closestUndiscovered(l, n, e) {
    let t = 1;
    for (; t < 2 * this.conf.init.map_size; ) {
      let i = yg.fromArray([-1, 1]),
        s = yg.fromArray([-1, 1]);
      for (let u = n - i * t; u <= n + t && u >= n - t; u += i)
        for (let n = e - s * t; n <= e + t && n >= e - t; n += s)
          if (
            u >= -this.conf.init.map_size &&
            u <= this.conf.init.map_size &&
            n >= -this.conf.init.map_size &&
            n <= this.conf.init.map_size &&
            !this.isDiscovered(l, u, n)
          )
            return {
              x: u,
              y: n,
            };
      t++;
    }
  }
  closestUndiscoveredWithRange(l, n, e, t, i, s, u = !0) {
    let r = 1;
    for (; r < 2 * this.conf.init.map_size; ) {
      let a = yg.fromArray([-1, 1]),
        o = yg.fromArray([-1, 1]);
      for (let c = n - a * r; c <= n + r && c >= n - r; c += a)
        for (let n = e - o * r; n <= e + r && n >= e - r; n += o)
          if (
            c >= -this.conf.init.map_size &&
            c <= this.conf.init.map_size &&
            n >= -this.conf.init.map_size &&
            n <= this.conf.init.map_size &&
            this.distance(c, n, t, i) <= s &&
            !this.isDiscovered(l, c, n) &&
            (!u ||
              !this.data.scouts.some(
                (e) => e.ownerid == l && e.to.x == c && e.to.y == n,
              ))
          )
            return {
              x: c,
              y: n,
            };
      r++;
    }
  }
  distance(l, n, e, t) {
    let i = e - l,
      s = t - n;
    return Math.sqrt(i * i + s * s);
  }
  cityDistance(l, n) {
    let e = this.city(l);
    if (e) {
      let l = n
        ? this.city(n)
        : this.player(e.ownerid).cities.find((l) => l.capital);
      return l ? this.distance(e.x, e.y, l.x, l.y) : 0;
    }
    return 10;
  }
  movPos(l) {
    return l.progress <= l.dist
      ? {
          x: Math.floor(
            0.5 + l.from.x + ((l.to.x - l.from.x) * l.progress) / l.dist,
          ),
          y: Math.floor(
            0.5 + l.from.y + ((l.to.y - l.from.y) * l.progress) / l.dist,
          ),
        }
      : l.progress <= 2 * l.dist
        ? {
            x: Math.floor(
              0.5 + l.from.x + (l.to.x - l.from.x) * (2 - l.progress / l.dist),
            ),
            y: Math.floor(
              0.5 + l.from.y + (l.to.y - l.from.y) * (2 - l.progress / l.dist),
            ),
          }
        : {
            x: l.to.x,
            y: l.to.y,
          };
  }
  speedNoCity(l, n, e, t) {
    let i = this.connected(n, e.x, e.y, t.x, t.y),
      s = 1;
    return (
      2 == i
        ? (s = this.conf.rail_speed_mult)
        : 1 == i && (s = this.conf.road_speed_mult),
      ("gold" == l
        ? this.conf.gold_transfer_speed
        : this.conf.troops[l].speed(this.player(n))) *
        s *
        (1 + this.hasteBonus(n)) *
        this.upgradeSpeedMult(n)
    );
  }
  speed(l, n, e, t) {
    let i = this.cityConnected(e, t),
      s = 1;
    return (
      2 == i
        ? (s = this.conf.rail_speed_mult)
        : 1 == i && (s = this.conf.road_speed_mult),
      ("gold" == l
        ? this.conf.gold_transfer_speed
        : this.conf.troops[l].speed(this.player(n))) *
        s *
        (1 + this.hasteBonus(n)) *
        this.upgradeSpeedMult(n)
    );
  }
  attackSpeed(l, n, e, t) {
    return Object.keys(l)
      .filter((n) => 0 != l[n])
      .reduce((l, i) => Math.min(l, this.speed(i, n, e, t)), 999);
  }
  defense(l) {
    return (
      this.conf.base_defense +
      this.pop(l) * this.conf.pop_defense +
      (l.capital && this.hasPolicy("city_state", l.ownerid) ? 0.2 : 0) +
      this.stoneBonus(l.ownerid) +
      (this.hasBuilding(l, "walls") ? 0.5 : 0) +
      (this.hasBuilding(l, "castle") ? 0.5 : 0) +
      (this.hasBuilding(l, "fortress") ? 0.5 : 0) +
      (this.hasBuilding(l, "temple_artemis") ? 0.5 : 0) +
      (this.hasWonder(l.ownerid, "great_wall") ? 0.5 : 0)
    );
  }
  getPlayerRatio(l, n) {
    if (0 == l) return 1;
    if (1 == l)
      return "science" == n
        ? this.difficulty().barbarian_science_mult
        : "gold" == n || "prod" == n
          ? this.difficulty().barbarian_gold_prod_mult
          : "attack" == n || "defense" == n
            ? this.difficulty().barbarian_battle_mult
            : 1;
    {
      let e = this.conf.civilizations[this.player(l).civ_id];
      return "recruitment" == n
        ? this.difficulty().ai_recruit_bonus * e.mult[n]
        : "attack" == n || "defense" == n
          ? e.mult[n]
          : this.era(l) == e.golden
            ? this.difficulty().ai_golden_bonus * e.mult[n]
            : this.difficulty().ai_bonus * e.mult[n];
    }
  }
  attackMult(l) {
    return (
      1 *
      (1 == l && this.hasPolicy("code_of_honor", l) ? 1.15 : 1) *
      (this.data.spelltime.berserker ? 1 + this.berserkerAttackBonus(l) : 1) *
      (this.hasWonder(l, "statue_zeus") ? 1.15 : 1) *
      (this.hasWonder(l, "brandenburg") ? 1.15 : 1) *
      this.getPlayerRatio(l, "attack")
    );
  }
  fight(l, n, e, t) {
    let i = this.player(t),
      s = this.player(t),
      u = this.attackMult(t),
      r =
        1 *
        (1 == e.ownerid && this.hasPolicy("code_of_honor", t) ? 1.15 : 1) *
        this.getPlayerRatio(e.ownerid, "defense"),
      a = this.defense(e);
    -1 != e.id && (a *= 1 - this.influenceEffectFromPlayer(e, this.player(t)));
    let [o, c] = [0, 0],
      d = Object.assign({}, l),
      h = Object.assign({}, n),
      p = !1,
      f = !1,
      g = 0,
      m = 0,
      y = 0,
      v = 0;
    if (
      (Object.keys(d).forEach((l) => {
        this.conf.troops[l].siege &&
          (g += d[l] * this.conf.troops[l].attack(i)),
          (m += d[l] * this.conf.troops[l].defense(i));
      }),
      g)
    ) {
      Object.keys(h).forEach((l) => {
        this.conf.troops[l].ranged(s) &&
          (y += h[l] * this.conf.troops[l].attack(s)),
          (v += h[l] * this.conf.troops[l].defense(s));
      }),
        (g *= u),
        (m *= u),
        (y *= 0),
        (v *= r),
        (v *= a);
      let [l, n] = this.getLost(g, m, y, v);
      Object.keys(d).forEach((n) => {
        d[n] = Math.floor((1 - l) * d[n]);
      }),
        Object.keys(h).forEach((l) => {
          h[l] = Math.floor((1 - n) * h[l]);
        });
      let i = 0.1 * (this.hasPolicy("discipline", t) ? 0.75 : 1);
      g / v > 3 * i
        ? (this.hasBuilding(e, "fortress") && (p = !0),
          this.hasBuilding(e, "castle") && (p = !0),
          this.hasBuilding(e, "walls") && (f = !0))
        : g / v > 2 * i
          ? (this.hasBuilding(e, "fortress") && (p = !0),
            this.hasBuilding(e, "castle")
              ? (p = !0)
              : this.hasBuilding(e, "walls") && (f = !0))
          : g / v > i &&
            (this.hasBuilding(e, "fortress")
              ? (p = !0)
              : this.hasBuilding(e, "castle")
                ? (p = !0)
                : this.hasBuilding(e, "walls") && (f = !0)),
        p &&
          (e.buildings.castle = {
            done: !1,
            progress: 0,
          }),
        f &&
          (e.buildings.walls = {
            done: !1,
            progress: 0,
          }),
        (a *= 1 - this.influenceEffectFromPlayer(e, this.player(t)));
    }
    (g = 0),
      (m = 0),
      (y = 0),
      (v = 0),
      Object.keys(d).forEach((l) => {
        this.conf.troops[l].ranged(i) &&
          (g += d[l] * this.conf.troops[l].attack(i)),
          (m += d[l] * this.conf.troops[l].defense(i));
      }),
      Object.keys(h).forEach((l) => {
        this.conf.troops[l].ranged(s) &&
          !this.conf.troops[l].siege &&
          (y += h[l] * this.conf.troops[l].attack(s)),
          (v += h[l] * this.conf.troops[l].defense(s));
      }),
      (g *= u),
      (m *= u),
      (y *= r),
      (v *= r),
      (v *= a),
      ([o, c] = this.getLost(g, m, y, v)),
      Object.keys(d).forEach((l) => {
        d[l] = Math.floor((1 - o) * d[l]);
      }),
      Object.keys(h).forEach((l) => {
        h[l] = Math.floor((1 - c) * h[l]);
      }),
      (g = 0),
      (m = 0),
      (y = 0),
      (v = 0),
      Object.keys(d).forEach((l) => {
        (d[l] = Math.floor((1 - o) * d[l])),
          this.conf.troops[l].ranged(i) ||
            this.conf.troops[l].siege ||
            (g += d[l] * this.conf.troops[l].attack(i)),
          (m += d[l] * this.conf.troops[l].defense(i));
      }),
      Object.keys(h).forEach((l) => {
        (h[l] = Math.floor((1 - c) * h[l])),
          this.conf.troops[l].ranged(s) ||
            this.conf.troops[l].siege ||
            (y += h[l] * this.conf.troops[l].attack(s)),
          (v += h[l] * this.conf.troops[l].defense(s));
      }),
      (g *= u),
      (m *= u),
      (y *= r),
      (v *= r),
      (v *= a),
      ([o, c] = this.getLost(g, m, y, v)),
      Object.keys(d).forEach((l) => {
        d[l] = Math.floor((1 - o) * d[l]);
      }),
      Object.keys(h).forEach((l) => {
        h[l] = Math.floor((1 - c) * h[l]);
      });
    let b = Object.values(d).reduce((l, n) => l + n, 0);
    return (
      l.governor && b && (d.governor = l.governor),
      l.slaver && b && (d.slaver = l.slaver),
      {
        troops: [d, h],
        walls: f,
        castle: p,
        fortress: !1,
      }
    );
  }
  getLost(l, n, e, t) {
    let i = Ng.constraint(0.5 * Math.log10(10 * (l ? (t ? l / t : 1e3) : 0)));
    return [
      Ng.constraint(0.5 * Math.log10(10 * (t ? (n ? e / n : 1e3) : 0))),
      i,
    ];
  }
  spy(l) {
    let n = l.spies / ((this.city(l.to.x, l.to.y).troops.spies || 0) + 1),
      [e, t, i, s, u, r] = [!1, !1, !1, !1, 0, !1];
    return (
      n >= 3
        ? ((e = !0),
          (s = !0),
          (t = !0),
          (i = !0),
          (r = !0),
          (u = Math.max(
            0,
            Math.floor(
              100 * Math.log10(n) * this.scienceDiff(this.city(l.to.x, l.to.y)),
            ),
          )))
        : n >= 2
          ? ((e = !0), (s = !0), (t = !0), (i = !0), (r = !0))
          : n >= 1.5
            ? ((e = !0), (s = !0), (t = !0), (r = !0))
            : n >= 1 && (e = !0),
      {
        survived: e,
        buildings: t,
        troops: i,
        gold: s,
        science: u,
        cityDef: r,
      }
    );
  }
  minDistFromCity(l) {
    let n = 999;
    return (
      this.player().cities.forEach((e) => {
        let t = this.distance(e.x, e.y, l.x, l.y);
        t < n && (n = t);
      }),
      n
    );
  }
  killCitizen(l) {
    l.citizens.idle
      ? l.citizens.idle--
      : Object.keys(l.citizens)
          .reverse()
          .some((n) => {
            if (l.citizens[n]) return l.citizens[n]--, !0;
          });
  }
  killTroop(l) {
    if (!Object.keys(l.troops).length) return;
    let n = yg.get(0, Object.keys(l.troops).length - 1),
      e = Object.keys(l.troops)[n];
    return "governor" == e && this.troopNb(l, !1) > l.troops.governor
      ? this.killTroop(l)
      : (l.troops[e]--, l.troops[e] <= 0 && delete l.troops[e], e);
  }
  govCost(l, n = 0) {
    let e = this.player(l).cities.length + this.troopNbById(l, "governor") + n;
    return (
      Math.floor(500 + 50 * Math.pow(e, 3.15)) *
      (this.hasPolicy("collective_rules", l) ? 0.75 : 1)
    );
  }
  powerCost(l, n) {
    let e = this.player(l).powers[n] || 0;
    return Math.pow(2, e);
  }
  reincarnation(l = !1) {
    let n = this.data.dailys.length,
      e = this.favorGain(),
      t = this.prestigeGain(),
      i = this.player().orientation > 0,
      s = Object.assign({}, this.data.deities);
    this.data.init(!0),
      (this.data.pause = !0),
      this.initGame(),
      l ||
        (this.data.rebirths++,
        i
          ? (this.data.prestige += t)
          : this.data.players
              .filter((l) => 1 != l.id)
              .forEach((l) => {
                let n = s[l.id],
                  t = 1;
                0 != l.id && (t = yg.get(70, 100) / 100),
                  this.data.favors[l.id] || (this.data.favors[l.id] = {}),
                  n
                    ? ((this.data.favors[l.id][n] =
                        Math.floor(t * e[0]) +
                        (this.data.favors[l.id][n] || 0)),
                      (this.data.favors[l.id][""] =
                        Math.floor(t * e[1]) +
                        (this.data.favors[l.id][""] || 0)))
                    : (this.data.favors[l.id][""] =
                        Math.floor(t * e[0] + e[1]) +
                        (this.data.favors[l.id][""] || 0)),
                  l.id > 1 && this.allocatePowers(l);
              })),
      this.data.saveddaily || (this.data.saveddaily = 0),
      (this.data.saveddaily += n),
      this.checkLocks(),
      this.toastService.info(
        "You have been reincarnated",
        ug.favor,
        "/game/help#reincarnation",
      ),
      (this.data.death_modal = i ? 2 : 1),
      this.updateStats(),
      this.router.navigate(["/game/city"]);
  }
  chooseCiv(l, n = !0) {
    (this.player().civ_id = l),
      n &&
        ((this.player().cities[0].name =
          this.conf.civilizations[l].vil_names[0]),
        this.initCivs(l));
  }
  allocatePowers(l) {
    let n = 0;
    for (; n < 50; ) {
      let e = yg.fromArray(
        Object.keys(this.conf.powers).filter(
          (l) => "sequencer" != l && "orphic" != l,
        ),
      );
      this.powerAvailable(l.id, e) ? (this.addPower(l.id, e), (n = 0)) : n++;
    }
  }
  powerAvailable(l, n) {
    let e = !0;
    return (
      Object.keys(this.conf.powers[n].cost).forEach((t) => {
        this.powerCost(l, n) * this.conf.powers[n].cost[t] >
          (this.data.favors[l][t] || 0) && (e = !1);
      }),
      e
    );
  }
  addPower(l, n) {
    this.powerAvailable(l, n) &&
      (Object.keys(this.conf.powers[n].cost).forEach((e) => {
        this.data.favors[l][e] -=
          this.powerCost(l, n) * this.conf.powers[n].cost[e];
      }),
      (this.player(l).powers[n] = 1 + (this.player(l).powers[n] || 0)),
      0 == l && this.updateStats());
  }
  favorGain() {
    let l = Math.pow(this.player().faith, 0.7) / 600;
    return [Math.floor(0.8 * l), Math.ceil(0.2 * l)];
  }
  prestigeGain() {
    return Math.floor(Math.pow(this.player().progress, 0.8) / 5);
  }
  prestigeBonus(l) {
    return !this.data.prestige || l > 0 ? 0 : this.data.prestige / 100;
  }
  nextPoint() {
    let l = this.favorGain();
    return Math.min(
      1 + Math.floor(Math.pow((600 * (1 + l[0])) / 0.8, 1 / 0.7)),
      1 + Math.floor(Math.pow((600 * (1 + l[1])) / 0.2, 1 / 0.7)),
    );
  }
  nextPrestige() {
    let l = this.prestigeGain();
    return 1 + Math.floor(Math.pow(10 * (1 + l), 1 / 0.7));
  }
  arrayIndexOf(l, n) {
    return (
      l +
      this.conf.init.map_size +
      1 +
      (n + this.conf.init.map_size + 1) *
        (2 * (this.conf.init.map_size + 1) + 1)
    );
  }
  indexToCoords(l) {
    let n = 2 * (this.conf.init.map_size + 1) + 1,
      e = Math.floor(l / n);
    return [
      l - e * n - (this.conf.init.map_size + 1),
      (e -= this.conf.init.map_size + 1),
    ];
  }
  setTile(l, n, e, t = !0) {
    1 != l.id && (l.discovered[this.arrayIndexOf(n, e)] = t ? 1 : 0);
  }
  getTile(l, n, e) {
    if (1 == l.id) return 0;
    let t = this.arrayIndexOf(n, e);
    return l.discovered.length > t ? l.discovered[t] : 0;
  }
  setTerrain(l, n, e) {
    l < -this.conf.init.map_size ||
      l > this.conf.init.map_size ||
      n < -this.conf.init.map_size ||
      n > this.conf.init.map_size ||
      (this.data.map[this.arrayIndexOf(l, n)] = e);
  }
  getTerrain(l, n) {
    let e = this.arrayIndexOf(l, n);
    return this.data.map[e];
  }
  setImprovement(l, n, e) {
    this.data.improvements[this.arrayIndexOf(l, n)] = e;
  }
  getImprovement(l, n) {
    let e = this.arrayIndexOf(l, n);
    return this.data.improvements.length > e ? this.data.improvements[e] : 0;
  }
  setRoad(l, n, e) {
    this.data.roads[this.arrayIndexOf(l, n)] = e;
  }
  getRoad(l, n) {
    let e = this.arrayIndexOf(l, n);
    return this.data.roads.length > e ? this.data.roads[e] : 0;
  }
  hasRuin(l, n) {
    return this.data.ruins.some((e) => e.x == l && e.y == n);
  }
  cityConnectedToCapital(l) {
    let n = this.capital(l.ownerid);
    return n ? this.cityConnected(l, n) : 0;
  }
  cityConnected(l, n) {
    if (!l || !n) return 0;
    let e = l.id > n.id ? n.id + "-" + l.id : l.id + "-" + n.id;
    if (this.data.connections[e] || 0 === this.data.connections[e])
      return this.data.connections[e];
    {
      let t = this.connected(l.ownerid, l.x, l.y, n.x, n.y);
      return (this.data.connections[e] = t), t;
    }
  }
  connected(l, n, e, t, i, s = []) {
    return this.railConnected(n, e, t, i)
      ? this.hasScience("railroad", this.player(l))
        ? 2
        : 1
      : this.roadConnected(n, e, t, i)
        ? 1
        : 0;
  }
  roadConnected(l, n, e, t, i = []) {
    if (l == e && n == t) return !0;
    if (i && i.some((e) => e.x == l && e.y == n)) return !1;
    i
      ? i.push({
          x: l,
          y: n,
        })
      : (i = [
          {
            x: l,
            y: n,
          },
        ]);
    let s = this.getRoad(l, n + 1) || this.city(l, n + 1),
      u = this.getRoad(l, n - 1) || this.city(l, n - 1),
      r = this.getRoad(l - 1, n) || this.city(l - 1, n),
      a = this.getRoad(l + 1, n) || this.city(l + 1, n),
      o = t < n,
      c = e < l;
    return !(
      !(o && u && this.roadConnected(l, n - 1, e, t, i)) &&
      (!s || !this.roadConnected(l, n + 1, e, t, i)) &&
      (o || !u || !this.roadConnected(l, n - 1, e, t, i)) &&
      !(c && r && this.roadConnected(l - 1, n, e, t, i)) &&
      (!a || !this.roadConnected(l + 1, n, e, t, i)) &&
      (c || !r || !this.roadConnected(l - 1, n, e, t, i))
    );
  }
  railConnected(l, n, e, t, i = []) {
    if (l == e && n == t) return !0;
    if (i && i.some((e) => e.x == l && e.y == n)) return !1;
    i
      ? i.push({
          x: l,
          y: n,
        })
      : (i = [
          {
            x: l,
            y: n,
          },
        ]);
    let s = 6 == this.getRoad(l, n + 1) || this.city(l, n + 1),
      u = 6 == this.getRoad(l, n - 1) || this.city(l, n - 1),
      r = 6 == this.getRoad(l - 1, n) || this.city(l - 1, n),
      a = 6 == this.getRoad(l + 1, n) || this.city(l + 1, n);
    return !!(
      (s && this.railConnected(l, n + 1, e, t, i)) ||
      (u && this.railConnected(l, n - 1, e, t, i)) ||
      (r && this.railConnected(l - 1, n, e, t, i)) ||
      (a && this.railConnected(l + 1, n, e, t, i))
    );
  }
  discover(l, n = !1) {
    if (1 == l.ownerid) return;
    let e = this.player(l.ownerid),
      t = this.movPos(l);
    this.viewRange(t.x, t.y, 1).forEach((n) => {
      this.isDiscovered(e.id, n[0], n[1]) ||
        (this.setTile(e, n[0], n[1]), 1 != l.ownerid && this.checkNewCiv(e, n));
    });
  }
  checkNewCiv(l, n) {
    let e = this.city(n[0], n[1]);
    if (
      e &&
      1 != e.ownerid &&
      e.ownerid != l.id &&
      !this.haveRelation(l.id, e.ownerid)
    ) {
      let t = this.player(e.ownerid);
      this.data.relations.push({
        playersid: [l.id, t.id].sort(),
        status: 0,
        war_rating: 0,
        war_total: 0,
      }),
        0 != l.id &&
          (l.appreciation[t.id] =
            this.conf.civilizations[l.civ_id].starting_relations +
            (this.hasPolicy("patronage", t.id) ? 10 : 0)),
        0 != t.id &&
          (t.appreciation[l.id] =
            this.conf.civilizations[t.civ_id].starting_relations +
            (this.hasPolicy("patronage", l.id) ? 10 : 0)),
        (l.influence[t.id] = 0),
        (t.influence[l.id] = 0);
      let i = this.capital(l.id),
        s = this.capital(t.id);
      s && this.setTile(l, s.x, s.y),
        i && this.setTile(t, i.x, i.y),
        0 == l.id
          ? this.toastService.info(
              "New civilization discovered: " + t.name,
              ug.act_scout,
              "/game/world?x=" + n[0] + "&y=" + n[1],
            )
          : 0 == t.id
            ? this.toastService.info(
                "New civilization discovered: " + l.name,
                ug.act_scout,
                "/game/world?x=" + n[0] + "&y=" + n[1],
              )
            : Pr.production || console.log(l.name + " discovered " + t.name);
    }
  }
  completeCheckNewCiv(l) {
    if (1 != l)
      for (let n = 0; n < this.player(l).discovered.length; n++)
        this.player(l).discovered[n] &&
          this.checkNewCiv(this.player(l), this.indexToCoords(n));
  }
  isDiscovered(l, n, e) {
    return 1 == this.getTile(this.player(l), n, e);
  }
  createScout(l, n, e, t, i = []) {
    if (1 == l.ownerid) return;
    let s = !!l.troops.explorer;
    this.data.scouts.push({
      ownerid: l.ownerid,
      destid: -1,
      from: {
        x: l.x,
        y: l.y,
      },
      to: {
        x: e,
        y: t,
      },
      dist: this.distance(l.x, l.y, e, t),
      progress: 0,
      speed: this.speedNoCity(s ? "explorer" : "scout", l.ownerid, l, {
        x: e,
        y: t,
      }),
      returning: !1,
      auto: n,
      origin_id: l.id,
      explorer: s,
      route: i,
    }),
      s ? l.troops.explorer-- : l.troops.scout--;
  }
  createGold(l, n, e) {
    this.data.goldtransfers.push({
      ownerid: l.ownerid,
      destid: n.ownerid,
      from: {
        x: l.x,
        y: l.y,
      },
      to: {
        x: n.x,
        y: n.y,
      },
      dist: this.distance(l.x, l.y, n.x, n.y),
      speed: this.speed("gold", l.ownerid, l, n),
      progress: 0,
      gold: e,
      returning: !1,
      goldTransfer: !0,
    }),
      (l.gold -= e);
  }
  availableCitiesForTrade(l) {
    return this.allCities().filter(
      (n) =>
        n.ownerid != l.ownerid &&
        this.haveRelation(l.ownerid, n.ownerid) &&
        !this.atWar(l.ownerid, n.ownerid) &&
        -1 ==
          this.data.trades.findIndex(
            (e) =>
              e.from.x == l.x &&
              e.from.y == l.y &&
              e.to.x == n.x &&
              e.to.y == n.y,
          ) &&
        this.cityDistance(l.id, n.id) <= this.tradeRouteMaxDist(l.ownerid),
    );
  }
  tradeRouteMaxDist(l = 0) {
    if (this.hasWonder(l, "panama")) return 9999;
    let n = this.player(l);
    return this.hasScience("rigging", n)
      ? 35
      : this.hasScience("physics", n)
        ? 30
        : this.hasScience("engineering", n)
          ? 25
          : this.hasScience("optics", n)
            ? 20
            : this.hasScience("wheel", n)
              ? 15
              : 10;
  }
  supprTradeRouteForPlayers(l, n) {
    let e = !1;
    return (
      this.data.trades.forEach((t) => {
        if (
          (t.ownerid == l.id && t.destid == n.id) ||
          (t.ownerid == n.id && t.destid == l.id)
        ) {
          let l = this.city(t.to.x, t.to.y);
          this.supprTradeRoute(this.city(t.from.x, t.from.y), l) &&
            ((e = !0),
            this.toastService.warning(
              "Trade routes to " + l.name + " have been lost",
              ug.trade,
              "/game/diplomacy#tab_trade",
            ));
        }
      }),
      e
    );
  }
  supprTradeRoute(l, n = null) {
    let e = this.data.trades.length,
      t = !1;
    if (n)
      (this.data.trades = this.data.trades.filter(
        (e) =>
          !(
            e.from.x == l.x &&
            e.from.y == l.y &&
            e.to.x == n.x &&
            e.to.y == n.y
          ),
      )),
        (t =
          e != this.data.trades.length && (0 == l.ownerid || 0 == n.ownerid));
    else {
      let n = [];
      this.data.trades.forEach((e) => {
        (e.from.x == l.x && e.from.y == l.y) || (e.to.x == l.x && e.to.y == l.y)
          ? (0 != e.ownerid && 0 != e.destid) || (t = !0)
          : n.push(e);
      }),
        (this.data.trades = n);
    }
    return t;
  }
  tradeRouteNb(l) {
    return (
      l || (l = this.player()),
      this.data.trades.filter((n) => n.ownerid == l.id).length
    );
  }
  maxTradeRoute(l) {
    return (
      l || (l = this.player()),
      0 +
        ("arabians" == l.civ_id ? 2 : 0) +
        (this.hasScience("navigation", l) ? 1 : 0) +
        (this.hasScience("wheel", l) ? 1 : 0) +
        (this.hasScience("diplomacy", l) ? 1 : 0) +
        (this.hasScience("optics", l) ? 1 : 0) +
        (this.hasScience("engineering", l) ? 1 : 0) +
        (this.hasScience("corporation", l) ? 1 : 0) +
        (this.hasPolicyGroup("pacifism", l.id) ? 2 : 0) +
        (this.hasPolicy("scholasticism", l.id) ? 2 : 0) +
        (this.hasPolicy("academy", l.id) ? 1 : 0) +
        (this.hasWonder(l.id, "colossus") ? 1 : 0) +
        (this.hasWonder(l.id, "panama") ? 2 : 0) +
        this.upgradeTrade(l.id) +
        (0 == l.id && this.data.charging.tradenode
          ? Math.floor(this.tradeNodeBonus())
          : 0)
    );
  }
  coloniesAvailable() {
    return this.conf.colony_nb - this.data.colonies.length;
  }
  colonyNb(l = 0) {
    return this.data.colonies.filter((n) => this.city(n).ownerid == l).length;
  }
  colonyNbForCity(l = 0) {
    return this.data.colonies.filter((n) => n == l).length;
  }
  colonyTotalGoldBonus(l = 0) {
    return this.colonyNb(l) ? this.colonyNb(l) * this.colonyGoldBonus(l) : 0;
  }
  colonyTotalTradeGoldBonus(l = 0) {
    return this.colonyNb(l)
      ? this.colonyNb(l) * this.colonyTradeGoldBonus(l)
      : 0;
  }
  colonyTotalGoldBonusForCity(l) {
    return this.colonyNbForCity(l)
      ? this.colonyNbForCity(l) * this.colonyGoldBonus(this.city(l).ownerid)
      : 0;
  }
  colonyTotalTradeGoldBonusForCity(l) {
    return this.colonyNbForCity(l)
      ? this.colonyNbForCity(l) *
          this.colonyTradeGoldBonus(this.city(l).ownerid)
      : 0;
  }
  colonyTotalHappinessBonus(l = 0) {
    return this.colonyNb(l)
      ? this.colonyNb(l) * this.colonyHappinessBonus(l)
      : 0;
  }
  colonyGoldBonus(l = 0) {
    return (
      this.conf.colony_base_gold +
      (this.hasScience("rigging", this.player(l)) ? 0.03 : 0) +
      (this.hasWonder(l, "bigben") ? 0.05 : 0) +
      (this.hasWonder(l, "casa") ? 0.02 : 0) +
      (this.hasPolicy("colonial_conquest", l) ? 0.05 : 0)
    );
  }
  colonyTradeGoldBonus(l = 0) {
    return this.conf.colony_base_gold_trade;
  }
  colonyTotalScienceBonus(l = 0) {
    return this.colonyNb(l) ? this.colonyNb(l) * this.colonyScienceBonus(l) : 0;
  }
  colonyScienceBonus(l = 0) {
    return this.hasPolicy("geographical", l) ? 0.02 : 0;
  }
  colonyHappinessBonus(l = 0) {
    return (
      this.conf.colony_base_happiness +
      (this.hasWonder(l, "bigben") ? 0.03 : 0) +
      (this.hasWonder(l, "casa") ? 0.02 : 0)
    );
  }
  tradeRouteGains(l, n = !1) {
    if (l && l.tradeGains && !n) return l.tradeGains;
    let e = this.tradeRoutes(l),
      t = {
        gold: 0,
        culture: 0,
        faith: 0,
        science: 0,
      };
    return (
      e.out
        .map((l) => this.tradeRouteValueForTrade(l))
        .forEach((l) => {
          (t.gold += l.gold),
            (t.culture += l.culture),
            (t.faith += l.faith),
            (t.science += l.science);
        }),
      e.in
        .map((l) => this.tradeRouteValueForTrade(l))
        .forEach((l) => {
          (t.gold += l.gold * this.conf.trade_route_ratio),
            (t.culture += l.culture * this.conf.trade_route_ratio),
            (t.faith += l.faith * this.conf.trade_route_ratio),
            (t.science += l.science * this.conf.trade_route_ratio);
        }),
      t
    );
  }
  tradeRoutes(l) {
    return {
      out: this.data.trades.filter((n) => n.from.x == l.x && n.from.y == l.y),
      in: this.data.trades.filter((n) => n.to.x == l.x && n.to.y == l.y),
    };
  }
  tradeRouteValueForTrade(l) {
    return this.tradeRouteValue(
      this.city(l.from.x, l.from.y),
      this.city(l.to.x, l.to.y),
    );
  }
  tradeRouteValue(l, n) {
    if (!l || !n)
      return {
        gold: 0,
        culture: 0,
        diplomacy: 0,
        science: 0,
        faith: 0,
      };
    let e = this.cityConnected(l, n),
      t = 1;
    2 == e
      ? (t = this.conf.rail_trade_mult)
      : 1 == e && (t = this.conf.road_trade_mult);
    let i =
      ((this.pop(l) + this.pop(n)) / 2 +
        ("gold" == l.bonus ? 2 : 0) +
        ("gold" == n.bonus ? 2 : 0) +
        (this.hasBuilding(l, "market") ? 2 : 0) +
        (this.hasBuilding(n, "market") ? 1 : 0) +
        (this.hasBuilding(l, "bank")
          ? this.buildingBonus("bank", l.ownerid)
          : 0) +
        (this.hasBuilding(n, "bank")
          ? this.buildingBonus("bank", n.ownerid) / 2
          : 0) +
        (this.hasBuilding(l, "stock") ? 10 : 0) +
        (this.hasBuilding(n, "stock") ? 5 : 0)) *
      (1 + (this.hasPolicy("merchant_confederacy", l.ownerid) ? 0.15 : 0)) *
      (1 +
        (this.data.spelltime.negociation
          ? this.negociationBonus(l.ownerid)
          : 0)) *
      (1 + this.colonyTotalTradeGoldBonusForCity(l.id)) *
      (1 + this.colonyTotalTradeGoldBonusForCity(n.id) / 2) *
      t;
    return {
      gold: i,
      culture:
        ((this.pop(l) + this.pop(n)) / 2 +
          ("culture" == l.bonus ? 2 : 0) +
          ("culture" == n.bonus ? 2 : 0) +
          (this.hasBuilding(l, "monument") ? 2 : 0) +
          (this.hasBuilding(n, "monument") ? 1 : 0) +
          (this.hasBuilding(l, "amphitheatre") ? 5 : 0) +
          (this.hasBuilding(n, "amphitheatre") ? 2 : 0) +
          (this.hasBuilding(l, "opera") ? 10 : 0) +
          (this.hasBuilding(n, "opera") ? 5 : 0) +
          (this.hasWonder(l.ownerid, "pisa") ? 10 : 0)) *
        (1 + (this.hasPolicy("cultural_diplomacy", l.ownerid) ? 0.15 : 0)) *
        t,
      diplomacy:
        (1 +
          (this.hasBuilding(l, "embassy") ? 1 : 0) +
          (this.hasBuilding(l, "consulate") ? 1 : 0) +
          (this.hasPolicy("philantropy", l.ownerid) ? 1 : 0)) *
        this.conf.trade_diplomacy_ratio,
      science:
        0 +
        (this.hasPolicy("sovereignty", l.ownerid) ? 2 : 0) +
        (this.hasPolicy("academy", l.ownerid) ? 5 : 0) +
        (0 == l.ownerid && this.data.spelltime.seshat ? i : 0),
      faith:
        0 +
        (this.hasPolicy("religious_laws", l.ownerid) ? 2 : 0) +
        (this.hasPolicy("scholasticism", l.ownerid) ? 5 : 0),
    };
  }
  giftValue(l) {
    let n = (100 * l) / this.goldTotal(0);
    return Ng.constraint(Math.min(n, l / 10), 25, 0);
  }
  truce(l, n) {
    let e = this.getRelation(l, n);
    e &&
      ((e.status = 2),
      (e.cooldown = this.conf.truce_length),
      delete e.war_length,
      l > 1 &&
        (this.player(l).appreciation[n] < 10 &&
          (this.player(l).appreciation[n] += 20),
        this.player(l).appreciation[n] < 15 &&
          (this.player(l).appreciation[n] += 15),
        this.player(l).appreciation[n] < 20 &&
          (this.player(l).appreciation[n] += 10)),
      n > 1 &&
        (this.player(n).appreciation[l] < 10 &&
          (this.player(n).appreciation[l] += 20),
        this.player(n).appreciation[l] < 15 &&
          (this.player(n).appreciation[l] += 15),
        this.player(n).appreciation[l] < 20 &&
          (this.player(n).appreciation[l] += 10)),
      this.data.attacks
        .filter((e) => {
          let t = this.city(e.to.x, e.to.y);
          return (
            !e.returning &&
            ((e.ownerid == l && t.ownerid == n) ||
              (e.ownerid == n && t.ownerid == l))
          );
        })
        .forEach((l) => {
          (l.returning = !0), (l.progress = 2 * l.dist - l.progress);
        }));
  }
  attackRatioRequired(l) {
    return l ? 3 - this.conf.civilizations[l].agressivity / 10 : 1.4;
  }
  war(l, n) {
    let e = this.player(l),
      t = this.player(n),
      i = this.getRelation(l, n);
    i &&
      ((i.status = 1),
      (i.cooldown = this.conf.war_min_length),
      (i.war_length = 0),
      (i.war_rating = 0),
      (i.war_total = 0),
      0 != e.id && (e.appreciation[t.id] = 10),
      0 != t.id && (t.appreciation[e.id] = 10),
      this.supprTradeRouteForPlayers(e, t),
      this.data.relations
        .filter(
          (e) =>
            e.playersid.includes(n) &&
            3 == e.status &&
            !e.playersid.includes(l),
        )
        .forEach((e) => {
          let i = e.playersid.find((l) => l != n);
          if (i != n && !this.atWar(l, i) && this.haveRelation(0, l)) {
            let n = !0;
            0 == i && 0 == this.data.difficulty && (n = !1),
              n &&
                (this.war(i, l),
                0 == i
                  ? this.toastService.danger(
                      "You declared war on " +
                        this.player(l).name +
                        " (def. pact with " +
                        t.name +
                        ")",
                      ug.attack,
                      "/game/diplomacy/",
                    )
                  : this.haveRelation(0, i) &&
                    this.haveRelation(0, l) &&
                    this.toastService.warning(
                      this.player(i).name +
                        " declared war on " +
                        this.player(l).name,
                      ug.attack,
                      "/game/diplomacy/",
                    ));
          }
        }));
  }
  transferCity(l, n, e = !1, t = !0) {
    let i = this.city(l),
      s = this.player(i.ownerid),
      u = this.player(n);
    if (
      (i.capital && s.cities.length > 1 && (s.cities[1].capital = !0),
      (i.capital = !1),
      i.buildings.palace && delete i.buildings.palace,
      i.building_queue.includes("palace") &&
        (i.building_queue.splice(i.building_queue.indexOf("palace"), 1),
        i.buildings.palace && (i.buildings.palace.progress = 0)),
      this.supprTradeRoute(i) &&
        this.toastService.warning(
          "Trade routes to " +
            i.name +
            " have been lost because city has been taken",
          ug.trade,
          "/game/diplomacy#tab_trade",
        ),
      this.data.attacks
        .filter((l) => l.to.x == i.x && l.to.y == i.y)
        .forEach((l) => {
          l.destid = n;
        }),
      (this.data.colonies = this.data.colonies.filter((n) => n != l)),
      (this.data.goldtransfers = this.data.goldtransfers.filter(
        (l) => !(l.to.x == i.x && l.to.y == i.y),
      )),
      this.data.spies
        .filter((l) => l.to.x == i.x && l.to.y == i.y)
        .forEach((l) => {
          this.cancelMove(l);
        }),
      (i.troop_queue = []),
      s.cities.splice(s.cities.indexOf(i), 1),
      e ||
        (u.cities.push(i),
        (i.ownerid = n),
        1 != u.id &&
          "Barb. vil." == i.name &&
          (i.name =
            this.conf.civilizations[u.civ_id].vil_names[u.civ_cities++] ||
            i.name),
        (i.ownerchange = Date.now()),
        Object.values(this.conf.buildings).forEach((l) => {
          l.add_all &&
            this.hasWonder(n, l.id) &&
            this.player(n).cities.forEach(
              (n) =>
                (n.buildings[l.add_all] = {
                  done: !0,
                  progress: 0,
                }),
            );
        })),
      this.viewRange(i.x, i.y, 1).forEach((l) => {
        this.isDiscovered(u.id, l[0], l[1]) ||
          (this.setTile(u, l[0], l[1]), 1 != n && this.checkNewCiv(u, l));
      }),
      n > 1 &&
        this.isDiscovered(0, i.x, i.y) &&
        this.checkNewCiv(this.player(), [i.x, i.y]),
      0 == n &&
        (e && this.data.burnNb++, this.checkLocks(), this.updateStats()),
      (i.owner_change_timer = this.conf.rightful_owner_timer),
      t)
    ) {
      let l = e ? "burned down" : "captured",
        t =
          0 != n || e
            ? "/game/world?x=" + i.x + "&y=" + i.y
            : "/game/city/" + i.id;
      0 == n
        ? this.toastService.success(
            i.name + " has been " + l + " !",
            ug.success,
            t,
          )
        : 0 == s.id &&
          this.toastService.success(
            i.name + " has been " + l + " !",
            ug.defeat,
            t,
          );
    }
    this.cityCache();
  }
  peaceCost(l, n) {
    let e = this.playerAttack(l),
      t = this.playerAttack(this.player(n)),
      i = (e - t) / (t + e),
      s =
        (i +
          this.getRelation(l.id, n).war_rating /
            (this.getRelation(l.id, n).war_total + 1)) /
        2;
    return (
      (s *=
        s >= 0 ? 1.9 - this.fatigueRatio(l, n) : 0.1 + this.fatigueRatio(l, n)),
      (s = Math.pow(1 + s, 0.7) - 1) >= 0 && i < 0 ? 0 : s
    );
  }
  playerAttack(l) {
    return (
      (l.cities.reduce((l, n) => l + this.cityAttack(n), 0) +
        this.data.attacks
          .filter((n) => n.ownerid == l.id)
          .reduce((l, n) => l + this.attackAttack(n), 0)) *
      this.attackMult(l.id)
    );
  }
  cityAttack(l) {
    return Object.keys(l.troops).reduce(
      (n, e) =>
        n + l.troops[e] * this.conf.troops[e].attack(this.player(l.ownerid)),
      0,
    );
  }
  attackAttack(l) {
    return Object.keys(l.troops).reduce(
      (n, e) =>
        n + l.troops[e] * this.conf.troops[e].attack(this.player(l.ownerid)),
      0,
    );
  }
  fatigueRatio(l, n) {
    let e = this.player(n).civ_id;
    return (
      this.conf.civilizations[e].war_fatigue_ratio /
      (this.conf.civilizations[e].war_fatigue_ratio +
        1e3 * this.getRelation(l.id, n).war_length)
    );
  }
  aiMinWarTime(l) {
    return this.conf.civilizations[l.civ_id].war_fatigue_ratio / 2500;
  }
  playerValue(l) {
    return this.player(l).cities.reduce((l, n) => l + this.cityValue(n), 0);
  }
  cityValue(l) {
    return (
      50 * this.pop(l) +
      Object.keys(l.buildings)
        .filter((n) => l.buildings[n].done)
        .reduce((l, n) => l + this.buildingGoldCost(this.conf.buildings[n]), 0)
    );
  }
  warChance(l, n) {
    if (0 == n.id && 0 == this.data.difficulty) return 0;
    if (0 == n.id && this.era(n.id) == this.conf.eras.prehistory.id) return 0;
    let e = this.playerAttack(l),
      t = this.playerAttack(n),
      i = this.conf.civilizations[l.civ_id].agressivity,
      s = 999;
    l.cities.forEach((l) => {
      n.cities.forEach((n) => {
        let e = this.cityDistance(l.id, n.id);
        e < s && (s = e);
      });
    }),
      this.getRelations(n.id)
        .filter((n) => !n.playersid.includes(l.id))
        .forEach((e) => {
          let i = e.playersid[0];
          i == n.id && (i = e.playersid[0]),
            3 != e.status ||
              this.atWar(l.id, i) ||
              (t += 0.5 * this.playerAttack(this.player(i))),
            1 == e.status && (t -= 0.25 * this.playerAttack(this.player(i)));
        }),
      t < 0 && (t = 0);
    let u = 0.5 + (0.5 * (e - t)) / (e + t);
    return u < 0.4
      ? 0
      : Ng.constraint(
          ((1 +
            ((i - 12) * (this.wondersNb(n.id) + this.colonyNb(n.id))) / 100) *
            Math.pow(500, u - 0.55) *
            Math.pow(4, i - 13.5)) /
            (7e3 *
              Math.pow(s + 1, 0.5) *
              Math.pow(1.1, l.appreciation[n.id] - 50)),
        );
  }
  scienceCost(l, n = 0) {
    let e =
      1 - 0.02 * this.data.players.filter((n) => this.hasScience(l.id)).length;
    return (
      1 == n && (e = 1),
      Math.floor(e * (5.5 * Math.pow(l.rank / 2, 7.8) - 10 + 20 * l.rank))
    );
  }
  buildingGoldCost(l, n = 0) {
    return l.free
      ? 0
      : Math.floor(
          (86 +
            Math.pow(this.conf.sciences[l.require.science].rank || 0, 6) /
              4.5) *
            (this.hasPolicyGroup("militarism", n) && "military" == l.category
              ? 0.75
              : 1),
        );
  }
  buildingProdCost(l, n) {
    let e = this.conf.sciences[l.require.science].rank || 0;
    return (
      "progress" == l.id && (e -= 1),
      (31 + Math.pow(e, 5) / 2) *
        (l.wonder ? 3.4 + 0.1 * this.player(n.ownerid).cities.length : 1) *
        (this.hasPolicyGroup("militarism", n.ownerid) &&
        "military" == l.category
          ? 0.75
          : 1) *
        (this.hasBuilding(n, "shrine") && l.wonder ? 0.95 : 1)
    );
  }
  coolDownMult(l = 0) {
    return (
      (this.hasWonder(l, "mausoleum") ? 0.85 : 1) *
      (this.hasWonder(l, "taj") ? 0.85 : 1) *
      (this.hasPolicy("miracles", l) ? 0.8 : 1) *
      (1 - this.sequencerBonus(l))
    );
  }
  abundanceBonus(l = 0) {
    return 0 != l
      ? 0
      : (40 * Math.pow(1.4, this.player(l).powers.serpent || 0) - 20) / 100;
  }
  newfireBonus(l = 0) {
    return 0 != l
      ? 0
      : !this.data.charging.newfire || this.player(l).orientation > 0
        ? 0
        : 0.44 * Math.log10(1 + 0.3 * this.data.charging.newfire);
  }
  sacrificeBonus() {
    return (
      Math.pow(10 + this.foodDiff(null), 1.05) *
      Math.pow(0.5 + this.happiness(), 6.5)
    );
  }
  negociationBonus(l = 0) {
    return 0 != l
      ? 0
      : (20 * Math.pow(1.4, this.player(l).powers.eye || 0)) / 100;
  }
  tradeNodeBonus(l = 0) {
    return 0 != l
      ? 0
      : !this.data.charging.tradenode || this.player(l).orientation > 0
        ? 0
        : 7.2 * Math.log(0.05 * (this.data.charging.tradenode + 2) + 1);
  }
  warpathBonus(l = 0) {
    return 0 != l
      ? 0
      : !this.data.charging.warpath || this.player(l).orientation > 0
        ? 0
        : 1.27 * Math.log10(0.2 * this.data.charging.warpath + 1);
  }
  warpathMaintenanceBonus(l = 0) {
    return 0 != l
      ? 0
      : !this.data.charging.warpath || this.player(l).orientation > 0
        ? 0
        : 0.223 * Math.log10(1 + 1.8 * this.data.charging.warpath);
  }
  berserkerAttackBonus(l = 0) {
    return 0 != l
      ? 0
      : (40 * Math.pow(1.25, this.player(l).powers.valhalla || 0) - 30) / 100;
  }
  berserkerSpeedBonus(l = 0) {
    return 0 != l
      ? 0
      : (40 * Math.pow(1.1, this.player(l).powers.valhalla || 0) - 30) / 100;
  }
  appropriationBonus(l = 0) {
    return 0 != l
      ? 0
      : 2 * Math.pow(1 + this.playerAttack(this.player(l)) / 70, 1.2);
  }
  timeshiftBonus(l = 0) {
    return 0 != l
      ? 0
      : 80 * Math.pow(1.2, this.player(l).powers.thirdeye || 0) - 50;
  }
  enlightmentBonus(l = 0) {
    return 0 != l
      ? 0
      : !this.data.charging.enlightment || this.player(l).orientation > 0
        ? 0
        : 1.03 * Math.log10(1 + 0.25 * this.data.charging.enlightment);
  }
  mahaBonus(l = 0) {
    if (0 != l) return 0;
    let n = this.player(l);
    return (
      Math.pow(1 + this.scienceDiff(null, n), 1.5) +
      Math.pow(1 + this.foodDiff(null, n), 1.5)
    );
  }
  idlersBonus(l = 0) {
    return 0 != l
      ? 0
      : !this.data.charging.idlers || this.player(l).orientation > 0
        ? 0
        : Math.floor(28 * Math.log10(1 + 1.2 * this.data.charging.idlers)) / 10;
  }
  dionysiaBonus(l = 0) {
    return 0 != l
      ? 0
      : 0.5 *
          this.happiness() *
          Math.pow(1 + (this.player(l).powers.orphic || 0), 0.7);
  }
  bacchanaliaBonus(l = 0) {
    return 0 != l
      ? 0
      : (Math.pow(1 + this.colonyNb(l), 2) *
          Math.pow(100 + this.cultureDiff(null), 0.2) *
          Math.pow(this.happiness(), 4)) /
          1e3;
  }
  underworldBonus(l = 0) {
    return 0 != l
      ? 0
      : !this.data.charging.underworld || this.player(l).orientation > 0
        ? 0
        : 0.223 * Math.log10(1 + 1.8 * this.data.charging.underworld);
  }
  punisherBonus(l = 0) {
    return 0 != l
      ? 0
      : !this.data.charging.punisher || this.player(l).orientation > 0
        ? 0
        : 0.05 * Math.log10(1 + 1.5 * this.data.charging.punisher);
  }
  clairvoyanceBonus(l) {
    return 0.1 * (this.player(l).powers.clairvoyance || 0);
  }
  stoneBonus(l) {
    return 0.05 * (this.player(l).powers.stone || 0);
  }
  buildingNb(l) {
    return Object.values(l.buildings).filter((l) => l.done).length;
  }
  serpentBonus(l) {
    return (
      (this.player(l.ownerid).powers.serpent || 0) * this.buildingNb(l) * 0.01
    );
  }
  eyeBonus(l = 0) {
    return (
      (this.player(l).powers.eye || 0) *
      this.tradeRouteNb(this.player(l)) *
      0.005
    );
  }
  valhallaBonus(l) {
    return (
      (this.player(l.ownerid).powers.valhalla || 0) *
      this.troopNb(l, !1) *
      25e-5
    );
  }
  thirdeyeBonus(l) {
    return l.capital ? 0.1 * (this.player(l.ownerid).powers.thirdeye || 0) : 0;
  }
  eternityBonus(l) {
    return (
      (this.player(l).powers.eternity || 0) *
      this.tradeRouteNb(this.player(l)) *
      0.05
    );
  }
  ouroborosBonus(l) {
    return (
      (this.player(l).powers.ouroboros || 0) *
      Object.values(this.player(l).sciences).filter((l) => l.done).length *
      0.02
    );
  }
  blissBonus(l) {
    return 0.05 * (this.player(l).powers.bliss || 0);
  }
  sequencerBonus(l, n = 0) {
    return (
      0.83 * Math.log10(0.15 * (n + (this.player(l).powers.sequencer || 0)) + 1)
    );
  }
  orphicBonus(l) {
    return 0.2 * (this.player(l).powers.orphic || 0);
  }
  hasteBonus(l) {
    return 0.05 * (this.player(l).powers.haste || 0);
  }
  recruitmentSpeed(l) {
    return (
      1.5 *
      (1 +
        (this.hasBuilding(l, "mia") ? 0.25 : 0) +
        (this.hasBuilding(l, "trc") ? 0.25 : 0) +
        (this.hasBuilding(l, "arsenal") ? 0.25 : 0) +
        ("recruitment" == l.bonus ? 0.25 : 0) +
        (this.hasWonder(l.ownerid, "statue_zeus") ? 0.15 : 0) +
        (this.hasWonder(l.ownerid, "brandenburg") ? 0.15 : 0)) *
      this.getPlayerRatio(l.ownerid, "recruitment") *
      (1 + this.warpathBonus())
    );
  }
  updateStats() {
    this.data.nostats ||
      (this.kongService.submmitStat("cities", this.player().cities.length),
      this.kongService.submmitStat("science", this.currentScienceRank()),
      this.kongService.submmitStat(
        "powers",
        Object.values(this.player().powers).reduce((l, n) => l + n, 0),
      ),
      this.kongService.submmitStat("reincarnations", this.data.rebirths));
  }
  isPolicyAvailable(l, n = 0) {
    let e = this.player(n);
    if (e.culture < this.cultureCost(e)) return !1;
    if (l.require.science && !this.hasScience(l.require.science, e)) return !1;
    if (l.require.policy && !this.hasPolicy(l.require.policy, n)) return !1;
    for (let t = 0; t < l.groups.length; t++)
      if (!this.hasPolicyGroup(l.groups[t], n)) return !1;
    return !0;
  }
  isPolicyGroupAvailable(l, n = 0) {
    let e = this.player(n);
    return (
      !(e.culture < this.cultureCost(e)) &&
      (!l.lockedBy || !this.hasPolicyGroup(l.lockedBy, n)) &&
      (!l.require || this.hasScience(l.require, e))
    );
  }
  hasAnyPolicyAvailable() {
    return (
      Object.values(this.conf.policies.groups).some(
        (l) => !this.hasPolicyGroup(l.id) && this.isPolicyGroupAvailable(l),
      ) ||
      Object.values(this.conf.policies.policies).some(
        (l) => !this.hasPolicy(l.id) && this.isPolicyAvailable(l),
      )
    );
  }
  hasAnyBuildingAvailable(l) {
    return Object.values(this.conf.buildings).some((n) =>
      this.isBuildingSelectable(l, n),
    );
  }
  isBuildingSelectable(l, n) {
    return this.isBuildingVisible(l, n) && this.isBuildingAvailable(l, n);
  }
  isBuildingVisible(l, n) {
    return !(
      (n.wonder && this.isWonderDone(n.id)) ||
      ("palace" == n.id && !l.capital) ||
      ("tribunal" == n.id && l.capital) ||
      ("courthouse" == n.id && l.capital) ||
      this.hasBuilding(l, n.id) ||
      l.building_queue.includes(n.id) ||
      (n.require.science &&
        !this.hasScience(n.require.science, this.player(l.ownerid))) ||
      (n.coastal && !this.isCoastal(l))
    );
  }
  isBuildingAvailable(l, n) {
    if (n.industrial && !n.wonder && this.player(l.ownerid).orientation < 25)
      return !1;
    if (n.industrial && n.wonder && this.player(l.ownerid).orientation < 75)
      return !1;
    if (n.require.buildings.length)
      for (let e = 0; e < n.require.buildings.length; e++)
        if (
          !this.hasBuilding(l, n.require.buildings[e]) &&
          !l.building_queue.includes(n.require.buildings[e])
        )
          return !1;
    return !(
      (!l.buildings[n.id] && l.gold < this.buildingGoldCost(n, l.ownerid)) ||
      (n.wonder && this.isBuildingWonder(l.ownerid, n.id))
    );
  }
  visibleBuildings(l) {
    return Object.values(this.conf.buildings)
      .filter((n) => this.isBuildingVisible(l, n))
      .sort((l, n) => {
        let e = this.conf.sciences[l.require.science].rank,
          t = this.conf.sciences[n.require.science].rank;
        return e > t ? 1 : e < t ? -1 : 0;
      });
  }
  selectableBuildings(l) {
    return Object.values(this.conf.buildings)
      .filter((n) => this.isBuildingSelectable(l, n))
      .sort((l, n) => {
        let e = this.buildingGoldCost(l),
          t = this.buildingGoldCost(n);
        return e > t ? 1 : e < t ? -1 : 0;
      });
  }
  isTroopVisible(l, n) {
    return !(
      (n.require.tech && l.orientation < n.require.tech) ||
      (n.obsolete && this.hasScience(n.obsolete)) ||
      (("caravel" != n.id ||
        "portuguese" != l.civ_id ||
        !this.hasScience("education", l)) &&
        n.require.science &&
        !this.hasScience(n.require.science, l))
    );
  }
  isTroopAvailable(l, n, e) {
    return !(
      !this.isTroopVisible(l, e) ||
      (e.require.building && !this.hasBuilding(n, e.require.building)) ||
      n.gold < e.gold(this, l.id)
    );
  }
  isImprovementVisible(l, n, e) {
    return !(
      n < l.level ||
      (l.level > 1 && this.player(e).orientation < 50) ||
      !this.hasScience(l.require, this.player(e))
    );
  }
  isImprovementAvailable(l, n, e) {
    return !(l.cost > e.gold) && this.isImprovementVisible(l, n, e.ownerid);
  }
  isImprovementAllowed(l, n, e, t, i) {
    let s = this.getTerrain(l, n),
      u = this.conf.improvements[e];
    return !(
      (2 == u.level && this.player(t.ownerid).orientation < 50) ||
      (this.city(l, n) && !i) ||
      !this.isDiscovered(t.ownerid, l, n) ||
      this.getImprovement(l, n) == e ||
      !this.hasScience(u.require, this.player(t.ownerid)) ||
      u.cost > t.gold ||
      (u.road && this.getRoad(l, n) == e) ||
      (!(e <= 2 && 6 == s && "australians" == this.player(t.ownerid).civ_id) &&
        u.terrains.length &&
        !u.terrains.includes(s))
    );
  }
  createWorker(l, n, e, t, i, s = !1) {
    Pr.production ||
      console.log(
        "New worker orders from " +
          l.name +
          " to create " +
          this.conf.improvements[n].name +
          " on (" +
          e +
          "," +
          t +
          "), roadto: " +
          s,
      ),
      (l.gold -= this.conf.improvements[n].cost);
    let u = [];
    if (s) {
      let i = l.x,
        s = l.y,
        r = !1;
      for (; i != e || s != t; ) {
        let l = !1;
        r || i == e
          ? r && s != t && ((s += s > t ? -1 : 1), (l = !0))
          : ((i += i > e ? -1 : 1), (l = !0)),
          (r = !r),
          l &&
            this.getRoad(i, s) < n &&
            !this.city(i, s) &&
            u.push({
              x: i,
              y: s,
            });
      }
    }
    let r = e,
      a = t;
    u.length && ((r = u[0].x), (a = u[0].y), u.splice(0, 1));
    let o = 2 == i ? "engineer" : "worker";
    this.data.workers.push({
      ownerid: l.ownerid,
      destid: l.ownerid,
      from: {
        x: l.x,
        y: l.y,
      },
      to: {
        x: r,
        y: a,
      },
      dist: this.distance(l.x, l.y, r, a),
      progress: 0,
      speed: this.speedNoCity(o, l.ownerid, l, {
        x: r,
        y: a,
      }),
      returning: !1,
      origin_id: l.id,
      type: n,
      construction_progress: 0,
      level: i,
      route: u,
    }),
      l.troops[o]--;
  }
  cancelMove(l) {
    if (l.auto) {
      let n = this.city(l.origin_id),
        e = this.movPos(l);
      (l.from = {
        x: n.x,
        y: n.y,
      }),
        (l.to = {
          x: e.x,
          y: e.y,
        }),
        (l.dist = this.distance(n.x, n.y, l.to.x, l.to.y)),
        (l.progress = l.dist),
        (l.auto = !1);
    }
    (l.returning = !0), (l.progress = 2 * l.dist - l.progress);
  }
  difficulty() {
    return this.conf.difficulties[this.data.difficulty];
  }
  totalCultureUsed(l, n = 1.5) {
    let e = l.policies.policies.length + l.policies.groups.length,
      t = 0;
    for (let i = 0; i < e; i++)
      t += Math.floor((25 + Math.pow(6 * i, 2.8)) * (0.3 + 0.7 * n));
    return t;
  }
  cultureResetCost() {
    return this.data.culture_reset ? 2 * this.data.culture_reset + 4 : 4;
  }
  haveRelation(l, n) {
    return this.data.relations.some(
      (e) => e.playersid.includes(l) && e.playersid.includes(n),
    );
  }
  getRelations(l) {
    return this.data.relations.filter((n) => n.playersid.includes(l));
  }
  getRelation(l, n) {
    return this.data.relations.find(
      (e) => e.playersid.includes(l) && e.playersid.includes(n),
    );
  }
  atWar(l, n) {
    return this.data.relations.some(
      (e) =>
        e.playersid.includes(l) &&
        e.playersid.includes(n) &&
        l != n &&
        1 == e.status,
    );
  }
  allied(l, n) {
    return this.data.relations.some(
      (e) =>
        e.playersid.includes(l) &&
        e.playersid.includes(n) &&
        l != n &&
        3 == e.status,
    );
  }
  diploDiff(l, n) {
    let e = 0;
    return (
      (e += this.diploBase(l, n)),
      (e += this.diploTrade(l, n)),
      (e -= this.diploProximity(l, n)),
      (e += this.diploDeity(l, n)),
      this.atWar(l, n) && (e -= 1),
      e + this.diploRelations(l, n)
    );
  }
  diploBase(l, n) {
    let e = this.player(l);
    return e.appreciation[n] >
      this.conf.civilizations[e.civ_id].starting_relations
      ? -this.conf.civilizations[e.civ_id].relation_decrease
      : e.appreciation[n] < this.conf.civilizations[e.civ_id].starting_relations
        ? this.conf.civilizations[e.civ_id].relation_decrease / 2
        : 0;
  }
  diploRelations(l, n) {
    this.player(l), this.player(n);
    let e = 0;
    return (
      this.getRelations(n)
        .filter((n) => !n.playersid.includes(l))
        .forEach((t) => {
          let i = t.playersid[0];
          i == n && (i = t.playersid[1]),
            1 == t.status &&
              this.atWar(l, i) &&
              (e += this.conf.war_w_enemy_relation_change),
            3 == t.status &&
              this.atWar(l, i) &&
              (e += this.conf.alliance_w_enemy_relation_change),
            1 == t.status &&
              this.allied(l, i) &&
              (e += this.conf.war_w_friend_relation_change),
            3 == t.status &&
              this.allied(l, i) &&
              (e += this.conf.alliance_w_friend_relation_change);
        }),
      e
    );
  }
  diploDeity(l, n) {
    let e = this.player(l),
      t = this.player(n);
    return e.orientation <= 0 && t.orientation <= 0
      ? e.deity && t.deity
        ? e.deity == t.deity
          ? this.conf.deity_relation_change
          : -this.conf.deity_relation_change
        : 0
      : e.orientation > 0 && t.orientation > 0
        ? this.conf.deity_relation_change
        : -this.conf.deity_relation_change;
  }
  diploProximity(l, n) {
    let e = this.player(l),
      t = this.player(n);
    return (
      e.cities
        .map((l) => this.closestCity(l.x, l.y, e.id, !0).ownerid)
        .filter((l) => l == t.id).length *
      this.conf.closest_relation_decrease *
      (this.conf.civilizations[e.civ_id].agressivity / 2 - 5)
    );
  }
  diploTrade(l, n) {
    return this.data.trades
      .filter(
        (e) =>
          (e.ownerid == l && e.destid == n) ||
          (e.ownerid == n && e.destid == l),
      )
      .map((l) => this.tradeRouteValueForTrade(l).diplomacy)
      .reduce((l, n) => l + n, 0);
  }
  influenceDiff(l, n) {
    let e = this.player(l),
      t = this.player(n),
      i =
        this.cultureDiff(null, e) *
        (this.hasWonder(l, "forbidden") ? 1.25 : 1) *
        (this.hasPolicy("conservatism", n) ? 0.75 : 1) *
        (this.hasPolicy("holy_place", l) && e.deity && e.deity == t.deity
          ? 1.25
          : 1) *
        (this.hasPolicy("collaboration", l) &&
        0 == this.getRelation(l, n).status
          ? 1.05
          : 1) *
        (this.hasPolicy("collaboration", l) &&
        3 == this.getRelation(l, n).status
          ? 1.1
          : 1) *
        (this.hasPolicy("congress", l) ? 1.25 : 1);
    return (
      this.hasPolicy("cultural_promotion", l) &&
        (i *=
          1 +
          0.1 *
            this.data.trades.filter((e) => e.destid == n && e.ownerid == l)
              .length),
      i
    );
  }
  influence(l, n) {
    let e = this.player(l),
      t = this.player(n);
    if (
      e.influence[e.id] &&
      e.influence[t.id] &&
      t.influence[e.id] &&
      t.influence[t.id]
    ) {
      let l =
        t.influence[e.id] / (1e8 + 10 * t.influence[t.id]) -
        e.influence[t.id] / (1e8 + 10 * e.influence[e.id]);
      return l > this.conf.max_influence
        ? this.conf.max_influence
        : l < -this.conf.max_influence
          ? -this.conf.max_influence
          : l;
    }
    return 0;
  }
  promotionCost(l) {
    return 0.1 * this.player(l).influence[l];
  }
  isPromotionAllowed(l, n) {
    return (
      this.player(l).promotion_cooldown ||
        (this.player(l).promotion_cooldown = {}),
      !this.player(l).promotion_cooldown[n]
    );
  }
  promote(l, n) {
    let e = this.promotionCost(l);
    if (e > this.player(l).culture || !this.isPromotionAllowed(l, n)) return !1;
    (this.player(l).culture -= e),
      (this.player(l).promotion_cooldown[n] = this.conf.promotion_cooldown),
      (this.player(n).influence[l] += e / 2);
  }
  isCoastal(l) {
    return (
      Math.abs(l.x) == this.conf.init.map_size ||
      Math.abs(l.y) == this.conf.init.map_size
    );
  }
  scoutAmbushRisk(l) {
    let n = this.city(l.origin_id);
    if (!n) return 0.1;
    let e = this.movPos(l),
      t = this.distance(e.x, e.y, n.x, n.y);
    l.explorer && (t /= 2.5);
    let i = (Math.exp(t - 15) - 1) / 5e8;
    return i < 0 ? 0 : i;
  }
  plagueInitRisk(l) {
    return this.data.last_plague
      ? this.health(l) >= 0.4
        ? 0
        : this.hasBuilding(l, "quarantine")
          ? 0
          : (Math.pow(8, this.data.difficulty) *
              (Math.pow(40 - 100 * this.health(l), 3) - 1) *
              Math.pow(this.data.last_plague, 4)) /
            1e23
      : 0;
  }
  initPlague(l) {
    (this.data.last_plague = 0), (l.plague = yg.get(60, 600));
    let n = this.isDiscovered(0, l.x, l.y) ? l.name : "unknown city",
      e = this.isDiscovered(0, l.x, l.y)
        ? "/game/world?x=" + l.x + "&y=" + l.y
        : "/game/help#health";
    this.toastService.black("Plague outbreak in " + n + " !", ug.plague, e),
      this.data.plagueNb++,
      0 == l.ownerid && this.data.autopause.plague && (this.data.pause = !0);
  }
  plagueDoctorRatio(l) {
    let n = l.troops.plague_doctor ? l.troops.plague_doctor : 0,
      e = 100;
    return (
      this.hasBuilding(l, "aqueduct") && (e = 75),
      this.hasBuilding(l, "hospital") && (e = 50),
      1 - Math.pow(n, 0.8) / e
    );
  }
  plagueRisk(l) {
    if (this.health(l) >= 0.7) return 0;
    if (this.hasBuilding(l, "quarantine")) return 0;
    let n =
      ((Math.pow(this.pop(l), 2) *
        (Math.pow(14 - 20 * this.health(l), 4) - 1)) /
        5e8) *
      (1 + 10 * this.punisherBonus(0)) *
      this.plagueDoctorRatio(l);
    return n < 0 ? 0 : n;
  }
  plague() {
    return this.allCities().some((l) => l.plague);
  }
  plagueNb() {
    return this.allCities().filter((l) => l.plague && l.plague > 0).length;
  }
  plagueTroopKillChances(l) {
    return (
      (5e-4 / Math.pow(this.health(l), 2)) *
      (1 - this.underworldBonus(l.ownerid)) *
      (1 - (this.hasPolicy("red_cross", l.ownerid) ? 0.5 : 0))
    );
  }
  plagueTradeLostChances(l) {
    return (
      (1e-6 / Math.pow(this.health(l) + 0.05, 2)) *
      (1 - this.underworldBonus(l.ownerid)) *
      (1 - (this.hasPolicy("red_cross", l.ownerid) ? 0.5 : 0))
    );
  }
  color(l) {
    let n = this.player(l);
    return 1 == l
      ? this.conf.barbarians_color
      : n && n.civ_id
        ? this.conf.civilizations[n.civ_id].color
        : "#000";
  }
  color2(l) {
    let n = this.player(l);
    return 1 == l
      ? this.conf.barbarians_color2
      : n && n.civ_id
        ? this.conf.civilizations[n.civ_id].color2
        : "#999";
  }
  upgradeTrade(l) {
    return 0 != l
      ? 0
      : 0 +
          (this.hasUpgrade("trade1") ? 1 : 0) +
          (this.hasUpgrade("trade2") ? 1 : 0);
  }
  upgradeScienceMult(l) {
    return 0 != l
      ? 1
      : 1 +
          (this.hasUpgrade("science1") ? 0.2 : 0) +
          (this.hasUpgrade("science2") ? 0.2 : 0);
  }
  upgradeHealth(l) {
    return 0 != l
      ? 0
      : 0 +
          (this.hasUpgrade("health1") ? 0.1 : 0) +
          (this.hasUpgrade("health2") ? 0.1 : 0);
  }
  upgradeHappiness(l) {
    return 0 != l
      ? 0
      : 0 +
          (this.hasUpgrade("happiness1") ? 0.1 : 0) +
          (this.hasUpgrade("happiness2") ? 0.1 : 0);
  }
  upgradeGoldMult(l) {
    return 0 != l
      ? 1
      : 1 +
          (this.hasUpgrade("gold1") ? 0.2 : 0) +
          (this.hasUpgrade("gold2") ? 0.2 : 0);
  }
  upgradeSpeedMult(l) {
    return 0 != l
      ? 1
      : 1 +
          (this.hasUpgrade("speed1") ? 0.1 : 0) +
          (this.hasUpgrade("speed2") ? 0.1 : 0);
  }
  improvements(l, n) {
    let e = 0;
    for (let t = l.x - 1; t <= l.x + 1; t++)
      for (let i = l.y - 1; i <= l.y + 1; i++)
        this.getImprovement(t, i) == n && e++;
    return e;
  }
  relicsGain(l) {
    return (
      this.player(l).cities.reduce(
        (l, n) => l + (n.relics || 0) * this.relicsValue(n),
        0,
      ) + (this.hasWonder(l, "eiffel") ? 10 : 0)
    );
  }
  relicsNb(l) {
    return this.player(l).cities.reduce((l, n) => l + (n.relics || 0), 0);
  }
  relicsValue(l) {
    return 1 * (this.hasBuilding(l, "museum") ? 1.5 : 1);
  }
  changeOrientationFortech(l, n) {
    if (this.currentScienceRank(l.id) < 16) return;
    let e = Math.pow(110 - l.orientation, 1.3) / 100;
    this.changeOrientation(l, n * e);
  }
  changeOrientation(l, n) {
    this.currentScienceRank(l.id) < 16 ||
      ((l.orientation += n),
      l.orientation < -100 && (l.orientation = -100),
      l.orientation > 100 && (l.orientation = 100));
  }
  initGame() {
    this.generateMap(),
      this.hasUpgrade("tech1") &&
        ((this.player().sciences.language = {
          done: !0,
          progress: 0,
        }),
        (this.player().sciences.dog_domestication = {
          done: !0,
          progress: 0,
        })),
      this.hasUpgrade("tech2") &&
        ((this.player().sciences.tanning = {
          done: !0,
          progress: 0,
        }),
        (this.player().sciences.pottery = {
          done: !0,
          progress: 0,
        })),
      this.checkLocks();
  }
  initCivs(l) {
    let n = new Eg(this.data.lastids.player++, "Barbarians");
    this.data.players.push(n),
      Object.values(this.conf.civilizations)
        .filter((n) => !n.respawn && n.id != l)
        .forEach((l) => {
          let n = new Eg(this.data.lastids.player++, l.name);
          (n.civ_id = l.id),
            Pr.production ||
              console.log("Creation of " + l.name + " (" + n.id + ")");
          let [e, t] = [0, 0];
          for (
            ;
            []
              .concat(...this.data.players.map((l) => l.cities))
              .find((l) => l.x == e && l.y == t);

          )
            (e = yg.get(-this.conf.init.map_size, this.conf.init.map_size)),
              (t = yg.get(-this.conf.init.map_size, this.conf.init.map_size));
          let i = new Ag(
            this.data.lastids.city++,
            l.vil_names[0],
            e,
            t,
            n.id,
            !0,
            !0,
          );
          Pr.production ||
            console.log("Creation of " + i.name + " (" + i.x + "," + i.y + ")"),
            n.cities.push(i),
            this.data.players.push(n);
        }),
      this.data.tmp_powers &&
        (Object.keys(this.data.tmp_powers).forEach((l) => {
          let n = this.data.players[l];
          n && (n.powers = this.data.tmp_powers[l]);
        }),
        delete this.data.tmp_powers),
      (n.science_queue = Object.keys(this.conf.sciences));
    for (let e = 0; e < this.conf.init.barbarians.nb; e++) {
      let l = yg.get(-this.conf.init.map_size, this.conf.init.map_size),
        e = yg.get(-this.conf.init.map_size, this.conf.init.map_size);
      if (
        ![]
          .concat(...this.data.players.map((l) => l.cities))
          .find((n) => n.x == l && n.y == e)
      ) {
        let t = new Ag(this.data.lastids.city++, "Barb. vil.", l, e, 1, !0);
        (t.bonus = yg.randomVilBonus()), n.cities.push(t);
      }
    }
    if (
      []
        .concat(...this.data.players.map((l) => l.cities))
        .every(
          (l) =>
            !(
              Math.abs(l.x) == this.conf.init.map_size ||
              Math.abs(l.y) == this.conf.init.map_size
            ),
        )
    ) {
      let l = new Ag(
        this.data.lastids.city++,
        "Barb. vil.",
        -this.conf.init.map_size,
        0,
        1,
        !0,
      );
      (l.bonus = yg.randomVilBonus()), n.cities.push(l);
    }
  }
  generateMap() {
    (this.data.improvements = []),
      (this.data.roads = []),
      ((this.data.map = []).length =
        this.arrayIndexOf(
          this.conf.init.map_size + 2,
          this.conf.init.map_size + 2,
        ) + 1),
      this.data.map.fill(0);
    let l = -this.conf.init.map_size;
    for (; l <= this.conf.init.map_size; ) {
      let n = -this.conf.init.map_size;
      for (; n <= this.conf.init.map_size; ) {
        let e = yg.fromArray(this.conf.biomes);
        for (let t = 0; t < this.conf.biome_size; t++)
          for (let i = 0; i < this.conf.biome_size; i++) {
            let s = yg.fromArray(e.terrains);
            this.setTerrain(n + i, l + t, s);
          }
        n += this.conf.biome_size;
      }
      l += this.conf.biome_size;
    }
    this.data.ruins = [];
    for (let n = 0; n < this.conf.ruins; n++) {
      let l = yg.get(-this.conf.init.map_size, this.conf.init.map_size),
        n = yg.get(-this.conf.init.map_size, this.conf.init.map_size);
      this.city(l, n) ||
        this.data.ruins.push({
          x: l,
          y: n,
        });
    }
  }
  updateVersion() {
    let l = this.data.version;
    if (
      (l < 4 && (this.data.difficulty = 2),
      l < 11 &&
        this.data.reports.forEach((l) => {
          let n = this.city(l.from_id);
          l.isAttacker = 0 == n.ownerid;
          let e = Object.values(l.troops.remaining.attacker).reduce(
              (l, n) => l + n,
              0,
            ),
            t = Object.values(l.troops.remaining.defender).reduce(
              (l, n) => l + n,
              0,
            );
          l.defeat = (0 == n.ownerid && 0 == e) || (0 != n.ownerid && 0 == t);
        }),
      l < 12 &&
        ((this.data.darktheme = !1),
        this.data.players.forEach((l) => {
          l.science_queue =
            0 == l.id
              ? l.cur_science
                ? [l.cur_science]
                : []
              : Object.keys(this.conf.sciences).filter(
                  (n) => !l.sciences[n] || !l.sciences[n].done,
                );
        })),
      l < 16 &&
        ((this.data.cooldowns = {}),
        (this.data.charging = {}),
        (this.data.spelltime = {}),
        (this.data.spellshidden = !1),
        (this.data.burnNb = 0),
        (this.data.nostats = !1),
        (this.data.autopause = {
          save: !1,
          incoming: !1,
          science: !1,
          building: !1,
          citizen: !1,
          city_captured: !1,
          city_lost: !1,
          city_joined: !1,
          plague: !1,
        }),
        this.isUnlocked("queue_buildings") &&
          (this.data.locks.splice(
            this.data.locks.indexOf("queue_buildings"),
            1,
          ),
          this.data.persistent_locks.push("queue_buildings")),
        this.isUnlocked("queue_troops") &&
          (this.data.locks.splice(this.data.locks.indexOf("queue_troops"), 1),
          this.data.persistent_locks.push("queue_troops")),
        this.isUnlocked("recruit_x10") &&
          (this.data.locks.splice(this.data.locks.indexOf("recruit_x10"), 1),
          this.data.persistent_locks.push("recruit_x10"))),
      l < 18 &&
        ((this.data.saveddaily = 0),
        Object.values(this.conf.buildings).forEach((l) => {
          if ((l.add_all || l.add_city) && this.isWonderDone(l.id)) {
            let n = this.cityForWonder(l.id);
            l.add_city &&
              (n.buildings[l.add_city] = {
                done: !0,
                progress: 0,
              }),
              l.add_all &&
                this.player(n.ownerid).cities.forEach((n) => {
                  n.buildings[l.add_all] = {
                    done: !0,
                    progress: 0,
                  };
                });
          }
        })),
      l < 21)
    ) {
      if (
        ((this.data.relations = []),
        (this.data.lefthidden = !1),
        (this.data.colonies = []),
        (this.data.max_rpt = 50),
        (this.data.max_notif = 100),
        this.data.players
          .filter((l) => 1 != l.id)
          .forEach((l) => {
            (l.appreciation = {}),
              (l.influence = {}),
              (l.promotion_lastdate = {}),
              (l.discovered = []),
              (l.influence[l.id] = l.culture + this.totalCultureUsed(l)),
              this.data.players
                .filter(
                  (n) => 0 != l.id && 0 != n.id && 1 != n.id && n.id != l.id,
                )
                .forEach((n) => {
                  0 != l.id &&
                    l.id != n.id &&
                    (l.appreciation[n.id] =
                      this.conf.civilizations[l.civ_id].starting_relations),
                    (l.influence[n.id] = 0),
                    this.haveRelation(l.id, n.id) ||
                      this.data.relations.push({
                        playersid: [l.id, n.id].sort(),
                        status: 0,
                        war_rating: 0,
                        war_total: 0,
                      });
                });
          }),
        this.data.diplomacy)
      ) {
        let l = this.data.diplomacy;
        Object.keys(l).forEach((n) => {
          let e = parseInt(n),
            t = l[e];
          this.player(e).appreciation[0] = t.relations;
          let i = 0;
          "war" == t.status && (i = 1),
            "truce" == t.status && (i = 2),
            this.data.relations.push({
              playersid: [0, e],
              status: i,
              war_rating: t.war_rating,
              war_total: t.war_rating,
              status_updated: t.status_updated,
            });
        }),
          delete this.data.diplomacy;
      }
      this.data.discovered.forEach((l) => {
        this.setTile(this.player(), l[0], l[1]);
      }),
        delete this.data.discovered,
        (this.data.autopause.city_joined = !1),
        (this.data.autopause.save = !1);
    }
    if (
      (l < 24 &&
        this.allCities().forEach((l) => (l.rightful_ownerid = l.ownerid)),
      l < 25 &&
        (this.currentScienceRank() >= 7 &&
          (this.data.last_plague = this.currentScienceRank() * yg.get(1, 600)),
        (this.data.autopause.plague = !1),
        (this.data.plagueNb = 0),
        (this.data.plagueMaxCities = 0),
        this.data.relations.forEach((l) => (l.war_total = 2 * l.war_rating))),
      l < 26 &&
        (this.isUnlocked("empire_orders") ||
          ((this.data.emp_autoassign = !1),
          (this.data.emp_priority = ""),
          (this.data.emp_strong = !1))),
      l < 29)
    ) {
      this.data.favors &&
        (this.data.favors = {
          0: this.data.favors,
        }),
        (this.data.deities = {});
      let l = 0;
      this.data.players
        .filter((l) => 1 != l.id)
        .forEach((n) => {
          n.deity && (this.data.deities[n.id] = n.deity),
            0 == n.id
              ? (l = Object.values(n.powers).reduce(
                  (l, n) => Math.max(l, n),
                  0,
                ))
              : Object.keys(n.powers).forEach((e) => {
                  n.powers[e] > l && (n.powers[e] = l);
                });
        });
    }
    if ((l < 30 && (this.data.respawn = []), l < 31)) {
      this.data.favors[0] || (this.data.favors[0] = {});
      let l =
        Object.keys(this.player().powers).reduce(
          (l, n) =>
            l +
            (Math.pow(2, this.player().powers[n]) - 1) *
              Object.keys(this.conf.powers[n].cost).length,
          0,
        ) + Object.values(this.data.favors[0]).reduce((l, n) => l + n, 0);
      this.player(1) && (this.player(1).powers = {}),
        this.data.players
          .filter((l) => l.id > 1)
          .forEach((n) => {
            n.powers = {};
            let e = Math.floor((yg.get(70, 95) * l) / 100);
            for (
              this.data.favors[n.id] || (this.data.favors[n.id] = {}),
                this.data.favors[n.id][""] || (this.data.favors[n.id][""] = 0),
                this.data.favors[n.id][""] = Math.ceil(0.2 * e),
                e = Math.floor(0.8 * e);
              e > 0;

            ) {
              let l = Math.max(1, Math.floor(e / 20)),
                t = yg.fromArray(Object.keys(this.conf.deities));
              this.data.favors[n.id][t]
                ? (this.data.favors[n.id][t] += l)
                : (this.data.favors[n.id][t] = l),
                (e -= l);
            }
            this.allocatePowers(n);
          });
    }
    if (
      (l < 32 &&
        (this.data.relations.forEach((l) => {
          l.status_updated &&
            ((l.cooldown = Math.max(
              0,
              this.conf.war_min_length - (Date.now() - l.status_updated) / 1e3,
            )),
            1 == l.status && (l.war_length = l.status_updated / 1e3)),
            delete l.status_updated;
        }),
        this.data.players.forEach((l) => {
          if (l.promotion_lastdate) {
            let n = l.promotion_lastdate;
            Object.keys(n).forEach((e) => {
              (l.promotion_cooldown = {}),
                (l.promotion_cooldown[e] = Math.max(
                  0,
                  this.conf.promotion_cooldown - (Date.now() - n[e]) / 1e3,
                ));
            }),
              delete l.promotion_lastdate;
          }
        }),
        delete this.data.capitalchange),
      l < 35 && !this.player(1))
    ) {
      let l = new Eg(1, "Barbarians");
      this.data.players.push(l);
    }
    l < 36 &&
      (this.generateMap(),
      (this.data.prestige = 0),
      (this.data.upgrades = []),
      (this.data.workers = []),
      (this.data.archeologists = []),
      this.data.players.forEach((l) => {
        (l.orientation = -75),
          (l.progress = 0),
          delete l.color,
          delete l.color2;
      }),
      this.player(1) && (this.player(1).civ_id = "")),
      l < 37 && ((this.data.notif_pop = !0), (this.data.notif_building = !0)),
      l < 39 &&
        this.allCities().forEach((l) => {
          Object.keys(l.buildings).forEach((n) => {
            let e = Object.values(this.conf.buildings).find((l) => l.oid == n);
            e &&
              ((l.buildings[e.id] = Object.assign({}, l.buildings[n])),
              delete l.buildings[n]);
          }),
            l.building_queue.forEach((n, e) => {
              let t = Object.values(this.conf.buildings).find(
                (l) => l.oid == n,
              );
              t && (l.building_queue[e] = t.id);
            });
        }),
      l < 40 &&
        ((this.data.connections = {}),
        this.allCities().forEach((l) => {
          delete l.connected;
        })),
      (this.data.version = this.conf.version);
  }
  getStrVersion() {
    switch (this.conf.version) {
      case 1:
        return "1.0.0";
      case 2:
        return "1.0.1";
      case 3:
        return "1.0.2";
      case 4:
        return "1.0.3";
      case 5:
        return "1.0.4";
      case 6:
        return "1.0.5";
      case 7:
        return "1.0.6";
      case 8:
        return "1.0.7";
      case 9:
        return "1.0.8";
      case 10:
        return "1.0.9";
      case 11:
        return "1.0.10";
      case 12:
        return "1.0.11";
      case 13:
        return "1.0.12";
      case 14:
        return "1.0.13";
      case 15:
        return "1.0.14";
      case 16:
        return "1.1.0";
      case 17:
        return "1.1.1";
      case 18:
        return "1.1.2";
      case 19:
        return "1.1.3";
      case 20:
        return "1.1.4";
      case 21:
        return "1.2.0";
      case 22:
        return "1.2.1";
      case 23:
        return "1.2.2";
      case 24:
        return "1.2.3";
      case 25:
        return "1.2.4";
      case 26:
        return "1.2.5";
      case 27:
        return "1.2.6";
      case 28:
        return "1.2.7";
      case 29:
        return "1.2.8";
      case 30:
        return "1.2.9";
      case 31:
        return "1.2.10";
      case 32:
        return "1.2.11";
      case 33:
        return "1.2.12";
      case 34:
        return "1.2.13";
      case 35:
        return "1.2.14";
      case 36:
        return "1.3.0";
      case 37:
        return "1.3.1";
      case 38:
        return "1.3.2";
      case 39:
        return "1.3.3";
      case 40:
        return "1.3.4";
      case 41:
        return "1.3.5";
      case 42:
        return "1.3.6";
      case 43:
        return "1.3.7";
      default:
        return "?";
    }
  }
}

export default l;
