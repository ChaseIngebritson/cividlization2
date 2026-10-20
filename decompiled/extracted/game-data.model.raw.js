      class Pg {
        constructor(l) {
          ((this.conf = l),
            (this.environment = Pr),
            (this.name = "unnamed"),
            (this.spellshidden = !1),
            (this.lefthidden = !1));
        }
        newGame(l, n, e) {
          ((this.name = l),
            (this.difficulty = n),
            this.init(),
            (this.players[0].civ_id = e),
            (this.players[0].cities[0].name =
              this.conf.civilizations[e].vil_names[0]));
        }
        init(l = !1) {
          (l
            ? ((this.tmp_powers = {}),
              this.players.forEach(
                (l) => (this.tmp_powers[l.id] = Object.assign({}, l.powers)),
              ))
            : ((this.autopause = {
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
              (this.notif_pop = !0),
              (this.notif_building = !0),
              (this.max_rpt = 50),
              (this.max_notif = 100),
              (this.nostats = !1),
              (this.darktheme = !1),
              (this.pause = !1),
              (this.version = this.conf.version),
              (this.tuto_done = !1),
              (this.death_modal = 0),
              (this.persistent_locks = []),
              (this.rebirths = 0),
              (this.prestige = 0),
              (this.favors = {}),
              (this.upgrades = []),
              (this.culture_reset = 0),
              (this.lastdaily = 0),
              (this.saveddaily = 0),
              (this.savetime = Date.now()),
              (this.lt = Date.now())),
            (this.connections = {}),
            (this.respawn = []),
            (this.deities = {}),
            (this.emp_autoassign = !1),
            (this.emp_priority = ""),
            (this.emp_strong = !1),
            (this.colonies = []),
            (this.cooldowns = {}),
            (this.charging = {}),
            (this.spelltime = {}),
            (this.autocast = void 0),
            (this.plagueNb = 0),
            (this.plagueMaxCities = 0),
            (this.burnNb = 0),
            (this.world_pos = {
              x: 0,
              y: 0,
            }),
            (this.dailys = []),
            (this.lastids = {
              city: 1,
              player: 0,
              report: 1,
            }),
            (this.locks = []),
            (this.relations = []),
            (this.workers = []),
            (this.archeologists = []),
            (this.scouts = []),
            (this.spies = []),
            (this.attacks = []),
            (this.goldtransfers = []),
            (this.trades = []),
            (this.reports = []),
            (this.notifications = []));
          let n = new Eg(this.lastids.player++, this.name);
          this.players = [n];
          let e = new Ag(
            this.lastids.city++,
            this.name + " Village",
            0,
            0,
            0,
            !1,
            !0,
          );
          n.cities = [e];
        }
        load(l) {
          for (var n in l) this[n] = l[n];
          ((this.spelltime = {}), (this.connections = {}));
        }
      }
