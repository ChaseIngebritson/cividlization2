      class vv {
        constructor(l, n, e, t, i) {
          ((this.conf = l),
            (this.data = n),
            (this.dataService = e),
            (this.toastService = t),
            (this.saveService = i),
            (this.icons = ug),
            (this.subscriptions = []),
            (this.engine = om(0, this.conf.ut)),
            (this.minuteEngine = om(0, this.conf.mut)));
        }
        ngOnDestroy() {
          this.stop();
        }
        stop() {
          this.subscriptions.forEach((l) => l.unsubscribe());
        }
        start() {
          (this.subscriptions.push(this.engine.subscribe(this.run.bind(this))),
            this.subscriptions.push(
              this.minuteEngine.subscribe(this.runMinute.bind(this)),
            ));
        }
        runMinute(l) {
          if (!this.data.pause) {
            let l =
              this.conf.init.barbarians.nb +
              Object.keys(this.conf.civilizations).length +
              2;
            if (
              !this.data.no_respawn &&
              yg.roll(0.2) &&
              this.dataService.allCities().length < l
            ) {
              let l = !1,
                n = 0,
                e = 0;
              if (
                this.dataService
                  .allCities()
                  .some((l) => this.dataService.isCoastal(l))
              )
                for (; !l;)
                  ((n = yg.get(
                    -this.conf.init.map_size,
                    this.conf.init.map_size,
                  )),
                    (e = yg.get(
                      -this.conf.init.map_size,
                      this.conf.init.map_size,
                    )),
                    this.dataService
                      .allCities()
                      .some((l) => l.x == n && l.y == e) || (l = !0));
              else
                ((n = -30),
                  (e = yg.get(
                    -this.conf.init.map_size,
                    this.conf.init.map_size,
                  )));
              if (
                this.data.players.length <= 8 &&
                this.data.respawn.length <
                  Object.values(this.conf.civilizations).filter(
                    (l) => l.respawn,
                  ).length
              ) {
                let l = Object.values(this.conf.civilizations).find(
                  (l) => l.respawn && !this.data.respawn.includes(l.id),
                );
                this.data.respawn.push(l.id);
                let t = new Eg(this.data.lastids.player++, l.name);
                ((t.civ_id = l.id),
                  Pr.production ||
                    console.log("Creation of " + l.name + " (" + t.id + ")"));
                let i = new Ag(
                  this.data.lastids.city++,
                  l.vil_names[0],
                  n,
                  e,
                  t.id,
                  !0,
                  !0,
                );
                (Pr.production ||
                  console.log(
                    "Creation of " + i.name + " (" + i.x + "," + i.y + ")",
                  ),
                  t.cities.push(i));
                let s = this.dataService.pop(this.dataService.capital(0)) - 1;
                (s < 5 && (s = 5),
                  (i.citizens.idle = s),
                  (t.sciences = Object.assign(
                    {},
                    this.dataService.player().sciences,
                  )),
                  this.dataService.isTroopVisible(t, this.conf.troops.musketman)
                    ? ((i.troops.pikeman = 100),
                      (i.troops.musketman = 100),
                      (i.troops.explorer = 3))
                    : this.dataService.isTroopVisible(
                          t,
                          this.conf.troops.pikeman,
                        )
                      ? ((i.troops.pikeman = 100),
                        (i.troops.longbowman = 100),
                        (i.troops.scout = 3))
                      : ((i.troops.lancier = 100),
                        (i.troops.archer = 100),
                        (i.troops.scout = 3)),
                  (i.troops.governor = 2),
                  (i.troops.caravan = 2),
                  (i.buildings = Object.assign(
                    {},
                    this.dataService.capital(0).buildings,
                  )),
                  Object.keys(i.buildings).forEach((l) => {
                    (this.conf.buildings[l].wonder && delete i.buildings[l],
                      i.buildings[l].done || delete i.buildings[l]);
                  }),
                  (i.buildings.walls && i.buildings.walls.done) ||
                    (i.buildings.walls = {
                      progress: 0,
                      done: !0,
                    }),
                  (i.buildings.cop && i.buildings.cop.done) ||
                    (i.buildings.cop = {
                      progress: 0,
                      done: !0,
                    }),
                  (i.gold = 1e6),
                  (t.influence[t.id] = this.dataService.player().influence[0]),
                  (t.culture = this.dataService.totalCultureUsed(
                    this.dataService.player(),
                  )),
                  this.data.players.push(t),
                  this.data.favors[0] || (this.data.favors[0] = {}));
                let u =
                  Object.keys(this.dataService.player().powers).reduce(
                    (l, n) =>
                      l +
                      (Math.pow(2, this.dataService.player().powers[n]) - 1) *
                        Object.keys(this.conf.powers[n].cost).length,
                    0,
                  ) +
                  Object.values(this.data.favors[0]).reduce((l, n) => l + n, 0);
                t.powers = {};
                let r = Math.floor((yg.get(70, 95) * u) / 100);
                for (
                  this.data.favors[t.id] || (this.data.favors[t.id] = {}),
                    this.data.favors[t.id][""] ||
                      (this.data.favors[t.id][""] = 0),
                    this.data.favors[t.id][""] = Math.ceil(0.2 * r),
                    r = Math.floor(0.8 * r);
                  r > 0;
                ) {
                  let l = Math.max(1, Math.floor(r / 20)),
                    n = yg.fromArray(Object.keys(this.conf.deities));
                  (this.data.favors[t.id][n]
                    ? (this.data.favors[t.id][n] += l)
                    : (this.data.favors[t.id][n] = l),
                    (r -= l));
                }
                this.dataService.allocatePowers(t);
              } else if (this.dataService.player(1)) {
                let l = new Ag(
                  this.data.lastids.city++,
                  "Barb. vil.",
                  n,
                  e,
                  1,
                  !0,
                );
                ((l.bonus = yg.randomVilBonus()),
                  this.dataService.player(1).cities.push(l));
              }
              this.dataService.cityCache();
            }
            this.data.players.forEach((l) => {
              if (
                this.dataService.hasPolicy("conscription", l.id) &&
                (l.id > 0 || !this.data.emp_noconscription) &&
                yg.roll(0.05)
              ) {
                let n = this.data.colonies.filter(
                  (n) => this.dataService.city(n).ownerid == l.id,
                );
                if (n.length) {
                  let e = this.dataService.city(yg.fromArray(n));
                  if (e) {
                    let n = Object.values(this.conf.troops).filter(
                        (n) =>
                          this.dataService.isTroopVisible(l, n) && n.conscript,
                      ),
                      t = yg.fromArray(n),
                      i = this.dataService.currentScienceRank(l.id),
                      s = Math.floor(yg.get(3 * i, 16 * i));
                    (e.troops[t.id] || (e.troops[t.id] = 0),
                      (e.troops[t.id] += s),
                      0 == l.id &&
                        this.toastService.success(
                          "Conscription: " +
                            s +
                            " " +
                            t.name(l) +
                            " arrived in " +
                            e.name,
                          ug.attack,
                          "/game/city/" + e.id,
                        ));
                  }
                }
              }
            });
          }
          (this.data.max_rpt &&
            this.data.reports.splice(
              0,
              this.data.reports.length - this.data.max_rpt,
            ),
            this.data.max_notif &&
              this.data.notifications.splice(
                0,
                this.data.notifications.length - this.data.max_notif,
              ),
            Object.values(this.conf.buildings)
              .filter((l) => l.wonder)
              .forEach((l) => {
                let n = this.dataService
                  .allCities()
                  .filter((n) => this.dataService.hasBuilding(n, l.id));
                n.length > 1 &&
                  (n.pop(),
                  n.forEach((n) => {
                    (console.log("removing " + l.id + " from " + n.name),
                      delete n.buildings[l.id]);
                  }));
              }),
            this.data.players.forEach((l) =>
              this.dataService.completeCheckNewCiv(l.id),
            ),
            Object.values(this.conf.buildings).forEach((l) => {
              if (l.add_all && this.dataService.isWonderDone(l.id)) {
                let n = this.dataService.cityForWonder(l.id);
                n &&
                  this.dataService.player(n.ownerid).cities.forEach(
                    (n) =>
                      (n.buildings[l.add_all] = {
                        done: !0,
                        progress: 0,
                      }),
                  );
              }
            }),
            this.dataService.allCities().forEach((l) => {
              (l.buildings.progress &&
                l.buildings.progress.done &&
                (l.buildings.progress.done = !1),
                Object.keys(l.buildings).forEach((n) => {
                  let e = l.buildings[n];
                  e.done && delete e.progress;
                }));
            }));
        }
        run(l, n = 0, e = !1) {
          let t = Date.now();
          if (
            (n || (n = (t - this.data.lt) / 1e3),
            n > this.conf.max_dt && (n = this.conf.max_dt),
            t - this.data.savetime >= this.conf.autosave_delay &&
              this.saveService.save(!1),
            l % 40 == 0 && (this.data.connections = {}),
            l % 20 == 0 &&
              this.dataService.allCities().forEach((l) => {
                l.tradeGains = this.dataService.tradeRouteGains(l, !0);
              }),
            l % 10 == 0 &&
              (this.dataService.cityCache(),
              this.dataService.allCities().forEach((l) => {
                (l.autoassign || this.data.emp_autoassign) &&
                  this.conf.autoassign.balanced.sort(l, this.dataService);
              }),
              (this.data.pause && !e) ||
                this.dataService
                  .allCities()
                  .filter((l) => l.autobuild && 0 == l.building_queue.length)
                  .forEach((l) => {
                    let n = this.dataService
                      .selectableBuildings(l)
                      .filter((l) => !l.wonder);
                    n.length > 0 &&
                      ((l.gold -= this.dataService.buildingGoldCost(n[0])),
                      l.building_queue.push(n[0].id));
                  })),
            l % 5 == 0 &&
              this.dataService.allCities().forEach((l) => {
                ((l.happiness = this.dataService.happiness(l, !0)),
                  (l.cultureDiff = this.dataService.cultureDiff(l, null, !0)));
              }),
            !this.data.pause || e)
          ) {
            if (
              (this.data.players.forEach((l) => {
                if (l.cities.length) {
                  (l.cities.forEach((e) => {
                    e.food += this.dataService.foodDiff(e) * n;
                    let t = !1;
                    if (
                      (e.autoassign_options &&
                        e.autoassign_options.nogrowth &&
                        (t = !0),
                      e.food >= this.dataService.foodRequired(e)
                        ? t
                          ? (e.food = this.dataService.foodRequired(e))
                          : ((e.food = this.dataService.hasBuilding(
                              e,
                              "town_hall",
                            )
                              ? 0.25 * this.dataService.foodRequired(e)
                              : this.dataService.hasBuilding(e, "lo")
                                ? 0.15 * this.dataService.foodRequired(e)
                                : 0),
                            e.citizens.idle++,
                            0 == e.ownerid &&
                              (this.data.notif_pop &&
                                this.toastService.success(
                                  "A new citizen is available in " + e.name,
                                  ug.pop,
                                  "/game/city/" + e.id,
                                ),
                              this.data.autopause.citizen &&
                                (this.data.pause = !0)))
                        : e.food < 0 && this.dataService.pop(e) > 1
                          ? (this.dataService.killCitizen(e),
                            (e.food = this.dataService.foodRequired(e) / 10),
                            0 == e.ownerid &&
                              this.toastService.danger(
                                "A citizen died of starvation in " + e.name,
                                ug.defeat,
                                "/game/city/" + e.id,
                              ))
                          : e.food < 0 &&
                            1 == this.dataService.pop(e) &&
                            (e.food = 0),
                      (e.gold = e.gold + this.dataService.goldDiff(e) * n),
                      isNaN(e.gold) && (e.gold = 0),
                      e.gold > this.dataService.maxGold(e) &&
                        (e.gold = this.dataService.maxGold(e)),
                      e.gold < 0)
                    ) {
                      let n = {};
                      for (
                        ;
                        this.dataService.goldDiff(e) < 0 &&
                        this.dataService.troopNb(e, !1);
                      ) {
                        let l = this.dataService.killTroop(e);
                        n[l] ? n[l]++ : (n[l] = 1);
                      }
                      if (Object.keys(n).length && 0 == e.ownerid) {
                        let t = "";
                        (Object.keys(n).forEach(
                          (e) =>
                            (t +=
                              n[e] + " " + this.conf.troops[e].name(l) + ", "),
                        ),
                          (t = t.slice(0, -2)),
                          this.toastService.danger(
                            "Troops have been dismissed due to lack of gold: " +
                              t,
                            ug.defeat,
                            "/game/city/" + e.id,
                          ));
                      }
                      e.gold = 0;
                    }
                    if (
                      e.building_queue.length &&
                      (e.buildings[e.building_queue[0]] ||
                        (e.buildings[e.building_queue[0]] = {
                          progress: 0,
                          done: !1,
                        }),
                      (e.buildings[e.building_queue[0]].progress +=
                        this.dataService.prodDiff(e) * n),
                      e.buildings[e.building_queue[0]].progress >=
                        this.dataService.buildingProdCost(
                          this.conf.buildings[e.building_queue[0]],
                          e,
                        ))
                    ) {
                      let n =
                        e.buildings[e.building_queue[0]].progress -
                        this.dataService.buildingProdCost(
                          this.conf.buildings[e.building_queue[0]],
                          e,
                        );
                      for (; n > 0 && e.building_queue.length;) {
                        let t = this.conf.buildings[e.building_queue[0]];
                        if ("progress" == t.id)
                          ((e.buildings[e.building_queue[0]].progress = 0),
                            l.progress++,
                            this.dataService.changeOrientationFortech(l, 1),
                            e.building_queue.length > 1 &&
                              e.building_queue.shift());
                        else {
                          if (0 == l.id)
                            ((this.data.notif_building || t.wonder) &&
                              this.toastService.success(
                                e.name +
                                  " has finished the construction of " +
                                  this.conf.buildings[
                                    e.building_queue[0]
                                  ].label(l),
                                t.wonder ? ug.wonder : ug.prod,
                                "/game/city/" + e.id,
                              ),
                              this.data.autopause.building &&
                                (this.data.pause = !0));
                          else if (t.wonder) {
                            let n = this.dataService.haveRelation(0, e.ownerid)
                              ? this.dataService.player(e.ownerid).name
                              : "An unknown civilization";
                            this.toastService.danger(
                              n +
                                " has finished the construction of " +
                                this.conf.buildings[e.building_queue[0]].label(
                                  l,
                                ),
                              ug.wonder,
                              "/game/world?x=" + e.x + "&y=" + e.y,
                            );
                          }
                          (t.add_city &&
                            (e.buildings[t.add_city] = {
                              done: !0,
                              progress: 0,
                            }),
                            t.add_all &&
                              l.cities.forEach((l) => {
                                l.buildings[t.add_all] = {
                                  done: !0,
                                  progress: 0,
                                };
                              }),
                            (e.buildings[e.building_queue[0]].done = !0),
                            e.building_queue.shift(),
                            t.wonder &&
                              this.dataService
                                .allCities()
                                .filter((l) => l.building_queue.includes(t.id))
                                .forEach((l) => {
                                  (l.building_queue.splice(
                                    l.building_queue.indexOf(t.id),
                                    1,
                                  ),
                                    delete l.buildings[t.id],
                                    (l.gold +=
                                      this.dataService.buildingGoldCost(
                                        t,
                                        l.ownerid,
                                      )));
                                }));
                        }
                        e.building_queue.length &&
                          ((e.buildings[e.building_queue[0]].progress = n),
                          (n -= this.dataService.buildingProdCost(
                            this.conf.buildings[e.building_queue[0]],
                            e,
                          )));
                      }
                    }
                    for (let l in e.troops)
                      e.troops[l] < 0 && (e.troops[l] = 0);
                    if (e.troop_queue.length) {
                      if (
                        ((e.troops_progress[e.troop_queue[0].id] +=
                          n * this.dataService.recruitmentSpeed(e)),
                        e.troops_progress[e.troop_queue[0].id] >=
                          this.conf.troops[e.troop_queue[0].id].time(
                            this.dataService,
                            l.id,
                          ))
                      ) {
                        let n =
                          e.troops_progress[e.troop_queue[0].id] -
                          this.conf.troops[e.troop_queue[0].id].time(
                            this.dataService,
                            l.id,
                          );
                        for (; n > 0 && e.troop_queue.length;) {
                          let t = this.conf.troops[e.troop_queue[0].id].citizen,
                            i = this.dataService.pop(e);
                          if (
                            (t && i > 1 && this.dataService.killCitizen(e),
                            (!t || i > 1) &&
                              (e.troops[e.troop_queue[0].id]
                                ? e.troops[e.troop_queue[0].id]++
                                : (e.troops[e.troop_queue[0].id] = 1)),
                            (e.troops_progress[e.troop_queue[0].id] = n),
                            e.troop_queue[0].nb--,
                            e.troop_queue[0].nb <= 0 &&
                              ((e.troops_progress[e.troop_queue[0].id] = 0),
                              e.troop_queue.shift()),
                            !e.troop_queue.length && e.autorecruit)
                          ) {
                            let l = this.conf.troops[e.autorecruit];
                            e.gold >= l.gold(this.dataService, e.ownerid) &&
                              ((e.gold -= l.gold(this.dataService, e.ownerid)),
                              e.troops_progress[l.id] ||
                                (e.troops_progress[l.id] = 0),
                              e.troop_queue.push({
                                id: l.id,
                                nb: 1,
                              }));
                          }
                          e.troop_queue.length &&
                            (n -= this.conf.troops[e.troop_queue[0].id].time(
                              this.dataService,
                              l.id,
                            ));
                        }
                      }
                    } else if (e.autorecruit) {
                      let l = this.conf.troops[e.autorecruit];
                      e.gold >= l.gold(this.dataService, e.ownerid) &&
                        ((e.gold -= l.gold(this.dataService, e.ownerid)),
                        e.troops_progress[l.id] ||
                          (e.troops_progress[l.id] = 0),
                        e.troop_queue.push({
                          id: l.id,
                          nb: 1,
                        }));
                    }
                    if (
                      (this.dataService.pop(e) > 1 &&
                        yg.roll(this.dataService.healthKillChance(e)) &&
                        (this.dataService.killCitizen(e),
                        0 == e.ownerid &&
                          this.toastService.danger(
                            "Citizen died from disease in " + e.name,
                            ug.health,
                            "/game/city/" + e.id,
                          )),
                      1 != e.ownerid &&
                        !e.capital &&
                        this.dataService.happiness(e) < 0.2)
                    ) {
                      let l = this.dataService.revoltRisks(e);
                      l &&
                        ((0 != e.ownerid && 0 != l.id) ||
                          this.toastService.danger(
                            "Uprising in " +
                              e.name +
                              ". The city joined " +
                              l.name,
                            ug.happiness,
                            "/game/world?x=" + e.x + "&y=" + e.y,
                          ),
                        (e.troops = {}),
                        this.dataService.transferCity(e.id, l.id, !1, !1),
                        this.data.autopause.city_joined &&
                          0 == l.id &&
                          (this.data.pause = !0));
                    }
                    if (
                      (e.owner_change_timer &&
                        ((e.owner_change_timer -= n),
                        e.owner_change_timer <= 0 &&
                          (delete e.owner_change_timer,
                          (e.rightful_ownerid = e.ownerid))),
                      0 != this.data.difficulty &&
                        !this.dataService.plague() &&
                        yg.roll(this.dataService.plagueInitRisk(e)) &&
                        this.dataService.initPlague(e),
                      e.plague)
                    ) {
                      let l = e.plague,
                        t = e.troops.plague_doctor ? e.troops.plague_doctor : 0,
                        i = 0.1;
                      if (
                        (this.dataService.hasBuilding(e, "aqueduct") &&
                          (i = 0.2),
                        this.dataService.hasBuilding(e, "hospital") &&
                          (i = 0.3),
                        (e.plague -=
                          e.plague > 0
                            ? n *
                              ((10 * this.dataService.health(e)) /
                                this.dataService.pop(e) +
                                Math.pow(t, 0.8) * i)
                            : n),
                        e.plague <= -600 && delete e.plague,
                        e.plague &&
                          (0 == e.ownerid &&
                            l > 0 &&
                            e.plague <= 0 &&
                            this.toastService.success(
                              "Plague is over in " + e.name + " !",
                              ug.plague,
                              "/game/world?x=" + e.x + "&y=" + e.y,
                            ),
                          e.plague > 0))
                      ) {
                        let l = this.dataService.citiesInRange(e, 5),
                          n = this.dataService.tradeRoutes(e);
                        if (
                          ([
                            ...n.in.map((l) =>
                              this.dataService.city(l.from.x, l.from.y),
                            ),
                            ...n.out.map((l) =>
                              this.dataService.city(l.to.x, l.to.y),
                            ),
                          ].forEach((n) => {
                            l.some((l) => l.id == n.id) || l.push(n);
                          }),
                          (l = l.filter((l) => !l.plague)).forEach((l) => {
                            yg.roll(this.dataService.plagueRisk(l)) &&
                              ((l.plague = yg.get(60, 600)),
                              (this.data.plagueMaxCities =
                                this.dataService.plagueNb()),
                              0 == l.ownerid &&
                                (this.toastService.black(
                                  "Plague has propagated to " + l.name + " !",
                                  ug.plague,
                                  "/game/world?x=" + l.x + "&y=" + l.y,
                                ),
                                this.data.autopause.plague &&
                                  (this.data.pause = !0)));
                          }),
                          yg.roll(this.dataService.plagueTroopKillChances(e)))
                        ) {
                          let l = Object.keys(e.troops).filter(
                            (l) => "governor" != l,
                          );
                          if (l.length) {
                            let n = yg.fromArray(l);
                            "plague_doctor" != n &&
                              (e.troops[n]--,
                              e.troops[n] <= 0 && delete e.troops[n]);
                          }
                        }
                        if (
                          yg.roll(this.dataService.plagueTradeLostChances(e))
                        ) {
                          let l = this.dataService.tradeRoutes(e).out;
                          if (l.length) {
                            let n = yg.fromArray(l),
                              t = this.dataService.city(n.to.x, n.to.y);
                            (this.data.trades.splice(
                              this.data.trades.indexOf(n),
                              1,
                            ),
                              (0 != e.ownerid && 0 != t.ownerid) ||
                                this.toastService.danger(
                                  "Trade route between " +
                                    e.name +
                                    " and " +
                                    t.name +
                                    " has been lost due to the plague",
                                  ug.trade,
                                  "/game/diplomacy#tab_trade",
                                ));
                          }
                        }
                      }
                    }
                  }),
                    l.science_queue.length &&
                      (l.sciences[l.science_queue[0]] ||
                        (l.sciences[l.science_queue[0]] = {
                          progress: 0,
                          done: !1,
                        }),
                      (l.sciences[l.science_queue[0]].progress +=
                        this.dataService.scienceDiff(null, l) * n),
                      l.sciences[l.science_queue[0]].progress >=
                        this.dataService.scienceCost(
                          this.conf.sciences[l.science_queue[0]],
                          l.id,
                        ) &&
                        (this.dataService.discoverScience(l.id),
                        0 == l.id &&
                          this.data.autopause.science &&
                          (this.data.pause = !0))),
                    1 != l.id &&
                      ((l.culture += this.dataService.cultureDiff(null, l) * n),
                      this.dataService.cultureCost(l),
                      (l.faith += this.dataService.faithDiff(null, l) * n),
                      l.influence[l.id] || (l.influence[l.id] = 0),
                      (l.influence[l.id] +=
                        this.dataService.cultureDiff(null, l) *
                        Math.min(n, this.conf.max_influence_dt))),
                    l.promotion_cooldown &&
                      Object.keys(l.promotion_cooldown).forEach((e) => {
                        ((l.promotion_cooldown[e] -= n),
                          l.promotion_cooldown[e] <= 0 &&
                            delete l.promotion_cooldown[e]);
                      }));
                  let e = (this.dataService.relicsGain(l.id) * n) / 60;
                  ((l.progress += e),
                    this.dataService.changeOrientationFortech(l, e));
                } else
                  (0 == l.id
                    ? (this.dataService.reincarnation(),
                      this.toastService.danger(
                        "You lost your last city...",
                        ug.defeat,
                      ))
                    : 1 != l.id &&
                      this.toastService.danger(
                        "Player " + l.name + " has lost his last city",
                        ug.success,
                        "/game/diplomacy",
                      ),
                    1 != l.id &&
                      (this.data.players.splice(
                        this.data.players.indexOf(l),
                        1,
                      ),
                      (this.data.relations = this.data.relations.filter(
                        (n) => n.playersid[0] != l.id && n.playersid[1] != l.id,
                      ))),
                    (this.data.attacks = this.data.attacks.filter(
                      (n) => n.ownerid != l.id,
                    )),
                    (this.data.spies = this.data.spies.filter(
                      (n) => n.ownerid != l.id,
                    )),
                    (this.data.scouts = this.data.scouts.filter(
                      (n) => n.ownerid != l.id,
                    )),
                    (this.data.goldtransfers = this.data.goldtransfers.filter(
                      (n) => n.ownerid != l.id,
                    )));
              }),
              this.data.relations.forEach((l) => {
                (l.cooldown &&
                  ((l.cooldown -= n), l.cooldown <= 0 && delete l.cooldown),
                  l.war_length && (l.war_length += n),
                  2 != l.status || l.cooldown || (l.status = 0));
                let e = this.dataService.player(l.playersid[0]),
                  t = this.dataService.player(l.playersid[1]);
                (e.influence[t.id] || (e.influence[t.id] = 0),
                  (e.influence[t.id] +=
                    this.dataService.influenceDiff(t.id, e.id) *
                    Math.min(n, this.conf.max_influence_dt)),
                  t.influence[e.id] || (t.influence[e.id] = 0),
                  (t.influence[e.id] +=
                    this.dataService.influenceDiff(e.id, t.id) *
                    Math.min(n, this.conf.max_influence_dt)));
              }),
              (this.data.workers = this.data.workers.filter(
                (l) => 1 != l.ownerid && this.dataService.player(l.ownerid),
              )),
              this.data.workers.slice(0).forEach((l) => {
                if (
                  (l.construction_progress
                    ? ((l.construction_progress +=
                        l.speed *
                        n *
                        (this.dataService.hasWonder(l.ownerid, "apadana")
                          ? 1.25
                          : 1)),
                      this.conf.improvements[l.type].road
                        ? this.dataService.getRoad(l.to.x, l.to.y) >= l.type &&
                          (l.construction_progress = 99999)
                        : this.dataService.getImprovement(l.to.x, l.to.y) ==
                            l.type &&
                          ((l.construction_progress = 0), (l.returning = !0)))
                    : (l.progress += l.speed * n * this.conf.troop_speed_ratio),
                  l.returning && l.progress >= 2 * l.dist)
                ) {
                  let n = this.dataService.city(l.origin_id);
                  if (n) {
                    let e = 2 == l.level ? "engineer" : "worker";
                    n.troops[e] ? n.troops[e]++ : (n.troops[e] = 1);
                  }
                  this.data.workers.splice(this.data.workers.indexOf(l), 1);
                } else if (
                  !l.returning &&
                  !l.construction_progress &&
                  l.progress >= l.dist
                )
                  l.construction_progress = 0.01;
                else if (
                  l.construction_progress &&
                  l.construction_progress >= this.conf.improvements[l.type].time
                )
                  if (this.conf.improvements[l.type].road)
                    if (
                      (this.dataService.setRoad(l.to.x, l.to.y, l.type),
                      l.route.length)
                    ) {
                      let n = this.dataService.city(l.origin_id),
                        e = this.conf.improvements[l.type];
                      n && n.gold >= e.cost
                        ? ((n.gold -= e.cost),
                          (l.from.x = l.to.x),
                          (l.from.y = l.to.y),
                          (l.to.x = l.route[0].x),
                          (l.to.y = l.route[0].y),
                          l.route.splice(0, 1),
                          (l.progress = 0),
                          (l.construction_progress = 0),
                          (l.dist = this.dataService.distance(
                            l.from.x,
                            l.from.y,
                            l.to.x,
                            l.to.y,
                          )))
                        : (l.route = []);
                    } else {
                      let n = this.dataService.city(l.origin_id);
                      n
                        ? ((l.from.x = l.to.x),
                          (l.from.y = l.to.y),
                          (l.to.x = n.x),
                          (l.to.y = n.y),
                          (l.returning = !0),
                          (l.dist = this.dataService.distance(
                            l.from.x,
                            l.from.y,
                            l.to.x,
                            l.to.y,
                          )),
                          (l.progress = l.dist),
                          (l.construction_progress = 0))
                        : this.data.workers.splice(
                            this.data.workers.indexOf(l),
                            1,
                          );
                    }
                  else
                    (this.dataService.setImprovement(l.to.x, l.to.y, l.type),
                      this.data.workers.splice(
                        this.data.workers.indexOf(l),
                        1,
                      ));
                else this.dataService.discover(l, !0);
              }),
              this.data.archeologists.slice(0).forEach((l) => {
                if (
                  ((l.progress += l.speed * n * this.conf.troop_speed_ratio),
                  !l.returning && l.progress >= l.dist)
                )
                  if (this.dataService.hasRuin(l.to.x, l.to.y)) {
                    let n = this.dataService.city(l.from.x, l.from.y);
                    (n &&
                      (n.relics || (n.relics = 0),
                      n.relics++,
                      0 == l.ownerid &&
                        this.toastService.success(
                          "A new relic in " + n.name,
                          ug.relics,
                          "/game/empire#tab_orientation",
                        ),
                      this.data.ruins.splice(
                        this.data.ruins.indexOf(
                          this.data.ruins.find(
                            (n) => n.x == l.to.x && n.y == l.to.y,
                          ),
                        ),
                        1,
                      )),
                      this.data.archeologists.splice(
                        this.data.archeologists.indexOf(l),
                        1,
                      ));
                  } else l.returning = !0;
                else if (l.returning && l.progress >= 2 * l.dist) {
                  let n = this.dataService.city(l.from.x, l.from.y);
                  (n && n.troops.archeologist++,
                    this.data.archeologists.splice(
                      this.data.archeologists.indexOf(l),
                      1,
                    ));
                } else this.dataService.discover(l, !0);
              }),
              (this.data.scouts = this.data.scouts.filter(
                (l) => 1 != l.ownerid,
              )),
              this.data.scouts.slice(0).forEach((l) => {
                if (yg.roll(this.dataService.scoutAmbushRisk(l))) {
                  this.data.scouts.splice(this.data.scouts.indexOf(l), 1);
                  let n = this.dataService.movPos(l);
                  0 == l.ownerid &&
                    this.toastService.danger(
                      "A scout has been ambushed by marauders",
                      ug.act_scout,
                      "/game/world?x=" + n.x + "&y=" + n.y,
                    );
                } else if (
                  ((l.progress += l.speed * n * this.conf.troop_speed_ratio),
                  l.returning && l.progress >= 2 * l.dist)
                ) {
                  this.data.scouts.splice(this.data.scouts.indexOf(l), 1);
                  let n = this.dataService.city(l.from.x, l.from.y);
                  n &&
                    (l.explorer
                      ? n.troops.explorer
                        ? n.troops.explorer++
                        : (n.troops.explorer = 1)
                      : n.troops.scout
                        ? n.troops.scout++
                        : (n.troops.scout = 1));
                } else if (!l.returning && l.progress >= l.dist)
                  if (l.auto) {
                    let n = this.dataService.city(l.origin_id),
                      e =
                        l.explorer || !n
                          ? this.dataService.closestUndiscovered(
                              l.ownerid,
                              l.to.x,
                              l.to.y,
                            )
                          : this.dataService.closestUndiscoveredWithRange(
                              l.ownerid,
                              l.to.x,
                              l.to.y,
                              n.x,
                              n.y,
                              15,
                            );
                    e
                      ? ((l.progress = 0),
                        (l.from = {
                          x: l.to.x,
                          y: l.to.y,
                        }),
                        (l.to = {
                          x: e.x,
                          y: e.y,
                        }),
                        (l.dist = this.dataService.distance(
                          l.from.x,
                          l.from.y,
                          l.to.x,
                          l.to.y,
                        )))
                      : n
                        ? this.dataService.cancelMove(l)
                        : this.data.scouts.splice(
                            this.data.scouts.indexOf(l),
                            1,
                          );
                  } else if (l.route && l.route.length) {
                    let n = l.route.shift();
                    l.route.length
                      ? ((l.progress = 0),
                        (l.from.x = l.to.x),
                        (l.from.y = l.to.y),
                        (l.to.x = n.x),
                        (l.to.y = n.y),
                        (l.dist = this.dataService.distance(
                          l.from.x,
                          l.from.y,
                          l.to.x,
                          l.to.y,
                        )))
                      : ((l.auto = !0), this.dataService.cancelMove(l));
                  } else l.returning = !0;
                else this.dataService.discover(l, !0);
              }),
              this.data.spies.slice(0).forEach((e) => {
                let t = this.dataService.city(e.from.x, e.from.y),
                  i = this.dataService.city(e.to.x, e.to.y);
                if (
                  (l % 10 == 0 &&
                    t &&
                    i &&
                    (e.speed = this.dataService.speed("spy", e.ownerid, t, i)),
                  (e.progress += e.speed * n * this.conf.troop_speed_ratio),
                  e.returning && e.progress >= 2 * e.dist)
                ) {
                  this.data.spies.splice(this.data.spies.indexOf(e), 1);
                  let l = this.dataService.city(e.from.x, e.from.y);
                  l &&
                    (l.troops.spy
                      ? (l.troops.spy += e.spies)
                      : (l.troops.spy = e.spies));
                } else if (!e.returning && e.progress >= e.dist) {
                  let l = this.dataService.spy(e);
                  if (t && i) {
                    let n = this.dataService.player(i.ownerid);
                    0 == e.ownerid &&
                      !l.survived &&
                      i.ownerid > 1 &&
                      (n.appreciation[e.ownerid] -= 5);
                    let s = {
                      id: this.data.lastids.report++,
                      from_id: t.id,
                      to_id: i.id,
                      spy: !0,
                      spyBuildings: l.buildings
                        ? Object.assign({}, i.buildings)
                        : {},
                      spyPop: l.buildings ? this.dataService.pop(i) : 0,
                      spyData: l,
                      spyTroops: l.troops ? Object.assign({}, i.troops) : {},
                      spyScience: l.science || 0,
                      troops: {
                        initial: {
                          attacker: {
                            spy: e.spies,
                          },
                          defender: {},
                        },
                        remaining: {
                          attacker: {
                            spy: l.survived ? e.spies : 0,
                          },
                          defender: {},
                        },
                      },
                      gold: l.gold ? Math.floor(i.gold) : 0,
                      cityTaken: !1,
                      cityBurned: !1,
                      date: new Date(),
                      victory: l.buildings,
                      isAttacker: !0,
                      defense: l.cityDef ? this.dataService.defense(i) : 0,
                    };
                    if (
                      (this.data.reports.push(s),
                      s.victory
                        ? this.toastService.success(
                            "Spying succeded in " + i.name + " !",
                            ug.success,
                            "/game/reports/" + s.id,
                          )
                        : this.toastService.success(
                            l.survived
                              ? "Spying failed in " + i.name + " !"
                              : "Spying failed in " +
                                  i.name +
                                  ". Relations with " +
                                  n.name +
                                  " decreased.",
                            ug.defeat,
                            "/game/reports/" + s.id,
                          ),
                      l.science &&
                        this.dataService.player().science_queue.length)
                    ) {
                      let n = this.dataService.player().science_queue[0];
                      ((this.dataService.player().sciences[n].progress +=
                        l.science),
                        this.dataService.player().sciences[n].progress >
                          this.dataService.scienceCost(
                            this.conf.sciences[n],
                            e.ownerid,
                          ) &&
                          (this.dataService.player().sciences[n].progress =
                            this.dataService.scienceCost(
                              this.conf.sciences[n],
                              e.ownerid,
                            )));
                    }
                    l.survived
                      ? (e.returning = !0)
                      : this.data.spies.splice(this.data.spies.indexOf(e), 1);
                  } else e.returning = !0;
                } else this.dataService.discover(e);
              }),
              this.data.goldtransfers.slice(0).forEach((e) => {
                let t = this.dataService.city(e.from.x, e.from.y),
                  i = this.dataService.city(e.to.x, e.to.y);
                if (
                  (l % 10 == 0 &&
                    t &&
                    i &&
                    (e.speed = this.dataService.speed("gold", e.ownerid, t, i)),
                  (e.progress += e.speed * n * this.conf.troop_speed_ratio),
                  (e.progress >= e.dist && !e.returning) ||
                    (e.progress >= 2 * e.dist && e.returning))
                )
                  if (i && i.ownerid == e.destid) {
                    i.gold += e.gold;
                    let l = this.dataService.player(i.ownerid);
                    if (l.appreciation[e.ownerid]) {
                      let n = this.dataService.giftValue(e.gold);
                      l.appreciation[e.ownerid] = Ng.constraint(
                        l.appreciation[e.ownerid] + n,
                        100,
                        0,
                      );
                    }
                    (0 == e.ownerid && 0 == i.ownerid
                      ? this.toastService.success(
                          "Gold transfer arrived in " + i.name + " !",
                          ug.gold,
                          "/game/city/" + i.id,
                        )
                      : 0 == e.ownerid
                        ? this.toastService.success(
                            "Your gift arrived in " + i.name + " !",
                            ug.diplomacy,
                            "/game/diplomacy/",
                          )
                        : 0 == i.ownerid &&
                          this.toastService.success(
                            "Gift from " +
                              this.dataService.player(e.ownerid).name +
                              " arrived in " +
                              i.name +
                              " !",
                            ug.diplomacy,
                            "/game/city/" + i.id,
                          ),
                      !e.returning &&
                      t &&
                      i.ownerid == e.ownerid &&
                      i.gold > this.dataService.maxGold(i)
                        ? ((e.from.x = i.x),
                          (e.from.y = i.y),
                          (e.to.x = t.x),
                          (e.to.y = t.y),
                          (e.gold = i.gold - this.dataService.maxGold(i)),
                          (e.returning = !0),
                          (i.gold = this.dataService.maxGold(i)))
                        : this.data.goldtransfers.splice(
                            this.data.goldtransfers.indexOf(e),
                            1,
                          ));
                  } else
                    this.data.goldtransfers.splice(
                      this.data.goldtransfers.indexOf(e),
                      1,
                    );
                else this.dataService.discover(e);
              }),
              this.data.attacks.slice(0).forEach((e) => {
                let t = this.dataService.city(e.from.x, e.from.y),
                  i = this.dataService.city(e.to.x, e.to.y);
                if (
                  (l % 10 == 0 &&
                    t &&
                    i &&
                    (e.speed = this.dataService.attackSpeed(
                      e.troops,
                      e.ownerid,
                      t,
                      i,
                    )),
                  i &&
                    ((0 == this.data.difficulty &&
                      0 == i.ownerid &&
                      0 != e.ownerid) ||
                      (1 == this.data.difficulty &&
                        0 == i.ownerid &&
                        1 == e.ownerid)) &&
                    ((e.returning = !0),
                    (e.progress = 2 * e.dist - e.progress)),
                  (e.progress +=
                    e.speed *
                    n *
                    this.conf.troop_speed_ratio *
                    (this.data.spelltime.berserker
                      ? 1 + this.dataService.berserkerSpeedBonus(e.ownerid)
                      : 1)),
                  e.returning && e.progress >= 2 * e.dist)
                )
                  t
                    ? t.ownerid != e.ownerid
                      ? (this.dataService.fight(
                          e.troops,
                          t.troops,
                          t,
                          e.ownerid,
                        ),
                        this.data.attacks.splice(
                          this.data.attacks.indexOf(e),
                          1,
                        ))
                      : (Object.keys(e.troops).forEach((l) => {
                          t.troops[l]
                            ? (t.troops[l] += e.troops[l])
                            : (t.troops[l] = e.troops[l]);
                        }),
                        e.gold && (t.gold += e.gold),
                        this.data.attacks.splice(
                          this.data.attacks.indexOf(e),
                          1,
                        ))
                    : this.data.attacks.splice(this.data.attacks.indexOf(e), 1);
                else if (!e.returning && e.progress >= e.dist) {
                  let l = this.dataService.city(e.from.x, e.from.y),
                    n = this.dataService.city(e.to.x, e.to.y);
                  if (l && n)
                    if (e.ownerid == n.ownerid)
                      (Object.keys(e.troops).forEach((l) => {
                        (n.troops[l] || (n.troops[l] = 0),
                          (n.troops[l] += e.troops[l]));
                      }),
                        this.data.attacks.splice(
                          this.data.attacks.indexOf(e),
                          1,
                        ),
                        0 == n.ownerid &&
                          this.toastService.info(
                            "Your troops have arrived in " + n.name,
                            ug.act_move,
                            "/game/city/" + n.id,
                          ));
                    else if (
                      1 == n.ownerid ||
                      1 == e.ownerid ||
                      this.dataService.atWar(l.ownerid, n.ownerid)
                    ) {
                      let t = this.dataService.player(e.ownerid),
                        i = this.dataService.player(n.ownerid),
                        s = new yv(this.data.lastids.report++);
                      ((s.from_id = l.id),
                        (s.name = n.name),
                        (s.to_pid = n.ownerid),
                        (s.to_id = n.id),
                        (s.troops = {
                          initial: {
                            attacker: Object.assign({}, e.troops),
                            defender: Object.assign({}, n.troops),
                          },
                          remaining: void 0,
                        }),
                        (s.cityTaken = !1),
                        (s.defense = this.dataService.defense(n)),
                        (s.gold = 0),
                        (s.isAttacker = !0));
                      let u = Object.values(e.troops).reduce(
                          (l, n) => l + n,
                          0,
                        ),
                        r = Object.values(n.troops).reduce((l, n) => l + n, 0),
                        a = Object.keys(e.troops).reduce(
                          (l, n) =>
                            l + e.troops[n] * this.conf.troops[n].attack(t),
                          0,
                        ),
                        o = Object.keys(n.troops).reduce(
                          (l, e) =>
                            l + n.troops[e] * this.conf.troops[e].attack(i),
                          0,
                        ),
                        c = this.dataService.fight(
                          e.troops,
                          n.troops,
                          n,
                          e.ownerid,
                        );
                      [e.troops, n.troops] = c.troops;
                      let d = this.dataService.influenceEffectFromPlayer(
                        n,
                        this.dataService.player(e.ownerid),
                      );
                      (d && (s.influence = d),
                        c.castle && (s.castle_destroyed = !0),
                        c.walls && (s.walls_destroyed = !0),
                        (s.troops.remaining = {
                          attacker: Object.assign({}, e.troops),
                          defender: Object.assign({}, n.troops),
                        }));
                      let h = Object.values(e.troops).reduce(
                          (l, n) => l + n,
                          0,
                        ),
                        p = Object.values(n.troops).reduce((l, n) => l + n, 0),
                        f = Object.keys(e.troops).reduce(
                          (l, n) =>
                            l + e.troops[n] * this.conf.troops[n].attack(t),
                          0,
                        ),
                        g = Object.keys(n.troops).reduce(
                          (l, e) =>
                            l + n.troops[e] * this.conf.troops[e].attack(i),
                          0,
                        );
                      if (1 != e.ownerid && 1 != e.destid) {
                        let t = this.dataService.getRelation(
                          e.ownerid,
                          n.ownerid,
                        );
                        t &&
                          (l.ownerid == t.playersid[0]
                            ? (t.war_rating += o - g - (a - f))
                            : (t.war_rating -= o - g - (a - f)),
                          (t.war_total += o - g + (a - f)));
                      }
                      if (this.data.spelltime.appropriation && 0 == e.ownerid) {
                        let l = this.dataService.player(e.ownerid),
                          n =
                            this.dataService.appropriationBonus(e.ownerid) *
                            (r - p);
                        (l.sciences[l.science_queue[0]].progress ||
                          (l.sciences[l.science_queue[0]].progress = 0),
                          (l.sciences[l.science_queue[0]].progress += n),
                          l.sciences[l.science_queue[0]].progress >=
                            this.dataService.scienceCost(
                              this.dataService.conf.sciences[
                                l.science_queue[0]
                              ],
                              l.id,
                            ) && this.dataService.discoverScience(l.id),
                          (l.faith += n));
                      }
                      if (
                        (this.dataService.hasPolicy("crusades", t.id) &&
                          (t.faith += 10 * (r - p)),
                        (s.isAttacker = 0 == e.ownerid),
                        (s.victory =
                          (0 == e.ownerid && h > 0) ||
                          (0 != e.ownerid && 0 == h)),
                        (s.defeat =
                          (0 == e.ownerid && 0 == h) ||
                          (0 != e.ownerid && 0 == p)),
                        (e.returning = !0),
                        (e.troops.slaver ||
                          (e.troops.warrior &&
                            "aztecs" == t.civ_id &&
                            this.dataService.hasScience(
                              "bronze_working",
                              t,
                            ))) &&
                          (0 != p || !e.troops.governor))
                      ) {
                        let l =
                            (h / (0.1 + u) - p / (0.1 + r)) *
                            (this.dataService.pop(n) - 1) *
                            0.1 *
                            (this.dataService.hasWonder(t.id, "ziggurat")
                              ? 2
                              : 1),
                          i = 0;
                        (e.troops.slaver && (i += e.troops.slaver),
                          e.troops.warrior &&
                            "aztecs" == t.civ_id &&
                            (i += e.troops.warrior),
                          (l = 1 - Math.pow(1 - l, i)),
                          yg.roll(l) &&
                            (this.dataService.killCitizen(n),
                            (e.troops.worker = 1),
                            this.dataService.pop(n) > 1 &&
                              this.dataService.hasPolicy("slavery") &&
                              yg.roll(0.5) &&
                              (this.dataService.killCitizen(n),
                              (e.troops.worker = 2))));
                      }
                      let m = n.gold;
                      if (0 == h)
                        this.data.attacks.splice(
                          this.data.attacks.indexOf(e),
                          1,
                        );
                      else if (0 == p && e.troops.governor) {
                        if (1 != e.ownerid && 1 != e.destid) {
                          let t = this.dataService.getRelation(
                            e.ownerid,
                            n.ownerid,
                          );
                          if (t) {
                            let e = this.dataService.cityValue(n);
                            (l.ownerid == t.playersid[0]
                              ? (t.war_rating += e / 10)
                              : (t.war_rating -= e / 10),
                              (t.war_total += e / 10));
                          }
                        }
                        (e.burn
                          ? this.dataService.transferCity(n.id, e.ownerid, !0)
                          : (this.dataService.transferCity(n.id, e.ownerid),
                            e.troops.governor--,
                            e.troops.governor || delete e.troops.governor,
                            e.noreturn &&
                              (Object.keys(e.troops).forEach((l) => {
                                (n.troops[l] || (n.troops[l] = 0),
                                  (n.troops[l] += e.troops[l]));
                              }),
                              this.data.attacks.splice(
                                this.data.attacks.indexOf(e),
                                1,
                              ))),
                          this.dataService.hasPolicy("civilizing", t.id) &&
                            ((t.progress += 50),
                            this.dataService.changeOrientationFortech(t, 50)),
                          0 == e.ownerid &&
                            this.data.autopause.city_captured &&
                            (this.data.pause = !0),
                          0 == n.id &&
                            this.data.autopause.city_lost &&
                            (this.data.pause = !0),
                          (s.cityTaken = !0),
                          e.burn && (s.cityBurned = !0));
                      }
                      if (!s.cityTaken || s.cityBurned) {
                        let l = Object.keys(e.troops)
                          .map(
                            (l) => this.conf.troops[l].capacity * e.troops[l],
                          )
                          .reduce((l, n) => l + n);
                        this.data.spelltime.berserker && (l *= 10);
                        let t = Math.floor(Math.min(l, m));
                        (n && (n.gold -= t), (e.gold = t), (s.gold = t));
                      }
                      (0 != l.ownerid && 0 != n.ownerid) ||
                        (this.data.reports.push(s),
                        s.victory
                          ? this.toastService.success(
                              "Victory in " + n.name + " !",
                              ug.success,
                              "/game/reports/" + s.id,
                            )
                          : s.defeat
                            ? this.toastService.info(
                                "Defeat in " + n.name + " !",
                                ug.defeat,
                                "/game/reports/" + s.id,
                              )
                            : this.toastService.info(
                                "Battle of " + n.name + " is over !",
                                ug.attack,
                                "/game/reports/" + s.id,
                              ));
                    } else e.returning = !0;
                  else e.returning = !0;
                } else this.dataService.discover(e);
              }),
              !e)
            ) {
              for (let l in this.data.cooldowns)
                ((this.data.cooldowns[l] -= n),
                  this.data.cooldowns[l] <= 0 && delete this.data.cooldowns[l]);
              for (let l in this.data.spelltime)
                ((this.data.spelltime[l] -= n),
                  this.data.spelltime[l] <= 0 && delete this.data.spelltime[l]);
            }
            if (this.data.autocast && !e)
              if (this.dataService.player().orientation > -100)
                this.data.autocast = void 0;
              else {
                let l = this.conf.spells[this.data.autocast];
                this.dataService.isSpellAvailable(l) &&
                  this.dataService.useSpell(l, this);
              }
            ((this.data.last_plague += Math.min(n, this.conf.max_plague_dt)),
              this.data.capitalchange_cooldown &&
                ((this.data.capitalchange_cooldown -= n),
                this.data.capitalchange_cooldown <= 0 &&
                  delete this.data.capitalchange_cooldown),
              this.dataService.checkLocks());
          }
          this.data.lt = t;
        }
      }
