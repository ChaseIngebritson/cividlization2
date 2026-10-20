      const ug = {
        deity: "fas fa-ankh text-danger text-300 cursor-pointer",
        daily: "fas fa-gift text-warning text-300 cursor-pointer",
        arrow_left: "fas fa-chevron-left",
        arrow_right: "fas fa-chevron-right",
        arrow_down: "fas fa-angle-double-down",
        arrow_up: "fas fa-angle-up",
        chevron_up: "fas fa-chevron-up",
        arrow_angle_left: "fas fa-angle-left",
        arrow_angle_right: "fas fa-angle-right",
        arrow_angle_left_double: "fas fa-angle-double-left",
        arrow_angle_right_double: "fas fa-angle-double-right",
        expand: "fas fa-expand-arrows-alt",
        exit: "fas fa-sign-out-alt",
        play: "fas fa-play",
        pause: "fas fa-pause",
        spells: "fas fa-magic",
        copy: "fas fa-copy",
        download: "fas fa-download",
        save: "fas fa-save",
        edit: "fas fa-edit",
        ok: "fas fa-check",
        cancel: "fas fa-times",
        player: "fas fa-flag",
        capital: "fas fa-star",
        city: "fas fa-university",
        empire: "fas fa-crown",
        pop: "fas fa-users",
        troops: "fas fa-user-shield",
        recruitment: "fas fa-user-shield",
        auto: "fas fa-sync",
        connected: "fas fa-recycle",
        food: "fas fa-drumstick-bite",
        prod: "fas fa-tools",
        wonder: "fas fa-university",
        science: "fas fa-flask",
        diplomacy: "fas fa-handshake",
        gold: "fas fa-coins",
        time: "fas fa-hourglass-half",
        culture: "fas fa-theater-masks",
        influence: "fas fa-broadcast-tower",
        faith: "fas fa-pray",
        trade: "fas fa-trailer",
        colony: "fas fa-globe-americas",
        favor: "fas fa-ankh",
        health: "fas fa-heartbeat",
        happiness: "fas fa-smile",
        capacity: "fas fa-box",
        details: "fas fa-eye",
        attack: "fas fa-bolt",
        defense: "fas fa-chess-rook",
        success: "fas fa-check-circle",
        defeat: "fas fa-times",
        ranged: "fas fa-bullseye",
        siege: "fas fa-holly-berry",
        speed: "fas fa-angle-double-right",
        unlock: "fas fa-unlock",
        act_view: "fas fa-eye",
        act_move: "fas fa-user-shield",
        act_scout: "fas fa-binoculars",
        act_attack: "fas fa-bolt",
        act_spy: "fas fa-mask",
        act_trade: "fas fa-trailer",
        act_transfer: "fas fa-coins",
        act_colony: "fas fa-globe-americas",
        act_worker: "fas fa-hammer",
        plus: "fas fa-plus",
        minus: "fas fa-minus",
        center: "fas fa-crosshairs",
        opt_buy: "fas fa-coins",
        opt_minus:
          "fas fa-minus bg-danger rounded-circle text-light p-2 text-80 cursor-pointer",
        question: "fas fa-question",
        exclamation: "fas fa-exclamation-circle text-warning mr-1",
        warning: "fas fa-exclamation-triangle text-danger mr-1",
        info: "fas fa-info-circle text-primary mr-1",
        forbidden: "fas fa-ban text-danger mr-1",
        world: "fas fa-globe-asia",
        report: "fas fa-file-alt",
        simulator: "fas fa-calculator",
        notification: "fas fa-bell",
        power: "fas fa-magic",
        help: "fas fa-question",
        option: "fas fa-sliders-h",
        support: "fas fa-info",
        plague: "fas fa-skull",
        sleep: "fas fa-bed",
        balanced: "fas fa-balance-scale",
        tech: "fas fa-cogs",
        progress: "fas fa-cog",
        prestige: "fas fa-lightbulb",
        relics: "fas fa-monument",
      };
      class rg {
        constructor(l, n, e, t, i, s) {
          ((this.conf = l),
            (this.data = n),
            (this.router = e),
            (this.saveService = t),
            (this.kongService = i),
            (this.dataService = s),
            (this.icons = ug),
            (this.load = !1),
            (this.loadText = !1),
            (this.loadTextContent = ""),
            (this.new = !1),
            (this.step2 = !1),
            (this.name = ""),
            (this.difficulty = 2),
            (this.saves = []));
        }
        ngOnInit() {
          this.init();
        }
        init() {
          this.saves = [];
          try {
            Object.keys(localStorage).forEach((l) => {
              l.startsWith(this.conf.save.prefix) &&
                this.saves.push(
                  this.saveService.extractSave(
                    l.substr(this.conf.save.prefix.length),
                  ),
                );
            });
          } catch (l) {
            this.data.noautosave = !0;
          }
          this.saves.sort((l, n) =>
            l.date < n.date ? 1 : l.date > n.date ? -1 : 0,
          );
        }
        warning() {
          return this.saves.map((l) => l.name).includes(this.name);
        }
        initNew() {
          ((this.name = this.kongService.getUsername()),
            (this.new = !0),
            (this.step2 = !1));
        }
        newGame() {
          this.name &&
            (this.data.newGame(this.name, this.difficulty, this.civid),
            this.dataService.initGame(),
            this.dataService.initCivs(this.civid),
            this.router.navigate(["/game"]));
        }
        continue() {
          this.loadSave(this.saves[0]);
        }
        loadSave(l) {
          (this.saveService.load(l.data), this.router.navigate(["/game"]));
        }
        delete(l) {
          (this.saveService.delete(l.name), this.init());
        }
        loadFromText() {
          try {
            (this.saveService.load(this.loadTextContent),
              this.router.navigate(["/game"]));
          } catch (l) {
            ((this.error = "This game could not be loaded."), console.error(l));
          }
        }
      }
      const ag = {
          idle: {
            id: "idle",
            name: () => "Idle",
            food: (l, n) => 1 + l.idlersBonus(n.ownerid),
            culture: (l, n = 0) => Math.floor(5 * l.idlersBonus(n)) / 10,
            happiness: (l, n = 0) => l.idlersBonus(n) / 100,
          },
          farmers: {
            id: "farmers",
            name: (l) =>
              l.hasScience("agriculture") ? "Farmers" : "Hunters-Gatherers",
            food: (l, n) =>
              1.5 +
              (l.hasScience("dog_domestication", l.player(n.ownerid))
                ? 0.5
                : 0) +
              (l.hasScience("agriculture", l.player(n.ownerid)) ? 1 : 0) +
              (l.hasScience("crop_rotation", l.player(n.ownerid)) ? 1 : 0) +
              (l.hasScience("fertilizer", l.player(n.ownerid)) ? 2 : 0) +
              l.improvements(n, 1) +
              2 * l.improvements(n, 2),
          },
          builders: {
            id: "builders",
            name: () => "Builders",
            prod: (l, n) =>
              1 +
              (l.hasScience("navigation", l.player(n.ownerid)) ? 0.5 : 0) +
              (l.hasWonder(n.ownerid, "temple_artemis") ? 1 : 0) +
              l.improvements(n, 3) +
              2 * l.improvements(n, 4),
          },
          merchants: {
            id: "merchants",
            name: () => "Merchants",
            gold: (l, n) =>
              1 +
              (l.hasScience("wheel", l.player(n.ownerid)) ? 1 : 0) +
              l.improvements(n, 7),
          },
          scientists: {
            id: "scientists",
            name: (l) =>
              l.hasScience("engineering") ? "Scientists" : "Scholars",
            science: (l, n) =>
              1 +
              (l.hasScience("engineering", l.player(n.ownerid)) ? 1 : 0) +
              (l.hasPolicyGroup("rationalism", n.ownerid) ? 1 : 0) +
              l.improvements(n, 8),
            health: (l, n) => (l.hasPolicy("who", n) ? 0.08 : 0),
          },
          artists: {
            id: "artists",
            name: () => "Artists",
            culture: (l, n = 0) =>
              1 + (l.hasScience("drama", l.player(n)) ? 0.5 : 0),
            happiness: (l) => 0.08,
          },
          priests: {
            id: "priests",
            name: () => "Priests",
            faith: (l, n = 0) =>
              1 + (l.hasScience("theology", l.player(n)) ? 0.5 : 0),
          },
        },
        og = {
          lo: {
            id: "lo",
            oid: "longhouse",
            label: () => "Longhouse",
            description: () =>
              '15% <span class="text-food"><i class="' +
              ug.food +
              '"></i></span> kept after growth',
            category: "administration",
            require: {
              science: "tanning",
              buildings: [],
            },
            free: !0,
          },
          town_hall: {
            id: "town_hall",
            label: () => "Town Hall",
            description: () =>
              '25% <span class="text-food"><i class="' +
              ug.food +
              '"></i></span> kept after growth<br/>Require to recruit <span class="text-troop">Governors</span>',
            category: "administration",
            require: {
              science: "state",
              buildings: ["lo", "granary", "monument"],
            },
          },
          police: {
            id: "police",
            label: () => "Police Station",
            description: () => "Reduce revolt risk by 50%",
            category: "administration",
            require: {
              science: "gunpowder",
              buildings: ["town_hall", "library", "furnace", "hospital"],
            },
          },
          palace: {
            id: "palace",
            label: () => "Palace",
            description: () =>
              'Only available in Capital City<br/><span class="text-food"><i class="' +
              ug.food +
              '"></i> +2</span><br/><span class="text-culture"><i class="' +
              ug.culture +
              '"></i> +2</span><br/><span class="text-prod"><i class="' +
              ug.prod +
              '"></i> +2</span><br/><span class="text-gold"><i class="' +
              ug.gold +
              '"></i> +2</span><br/><span class="text-science"><i class="' +
              ug.science +
              '"></i> +2</span>',
            desc: () =>
              '<span class="text-food"><i class="' +
              ug.food +
              '"></i> +2</span> | <span class="text-culture"><i class="' +
              ug.culture +
              '"></i> +2</span> | <span class="text-prod"><i class="' +
              ug.prod +
              '"></i> +2</span> | <span class="text-gold"><i class="' +
              ug.gold +
              '"></i> +2</span> | <span class="text-science"><i class="' +
              ug.science +
              '"></i> +2</span>',
            category: "administration",
            require: {
              science: "masonry",
              buildings: [
                "town_hall",
                "walls",
                "gardens",
                "stables",
                "treasury",
              ],
            },
          },
          tribunal: {
            id: "tribunal",
            label: () => "Tribunal",
            description: () =>
              "Reduce discontent due to distance from capital by 50%",
            category: "administration",
            require: {
              science: "code_of_laws",
              buildings: ["town_hall"],
            },
          },
          courthouse: {
            id: "courthouse",
            label: () => "Courthouse",
            description: () =>
              "Reduce discontent due to distance from capital by 50%",
            category: "administration",
            require: {
              science: "architecture",
              buildings: ["town_hall", "tribunal"],
            },
          },
          monument: {
            id: "monument",
            label: () => "Monument",
            description: () =>
              '<span class="text-culture"><i class="' +
              ug.culture +
              '"></i> +1</span><br/><span class="text-culture"><i class="' +
              ug.culture +
              '"></i> +2 / trade route</span>',
            desc: () =>
              '<span class="text-culture"><i class="' +
              ug.culture +
              '"></i> +1</span> | <span class="text-culture"><i class="' +
              ug.trade +
              '"></i> <i class="' +
              ug.culture +
              '"></i> +2</span>',
            category: "culture",
            require: {
              science: "art",
              buildings: ["lo"],
            },
          },
          amphitheatre: {
            id: "amphitheatre",
            label: () => "Amphitheatre",
            description: () =>
              '<span class="text-culture"><i class="' +
              ug.culture +
              '"></i> +2</span><br/><span class="text-culture"><i class="' +
              ug.culture +
              '"></i> +5 / trade route</span>',
            desc: () =>
              '<span class="text-culture"><i class="' +
              ug.culture +
              '"></i> +2</span> | <span class="text-culture"><i class="' +
              ug.trade +
              '"></i> <i class="' +
              ug.culture +
              '"></i> +5</span>',
            category: "culture",
            require: {
              science: "wheel",
              buildings: ["town_hall"],
            },
          },
          opera: {
            id: "opera",
            label: () => "Opera",
            description: () =>
              '<span class="text-culture"><i class="' +
              ug.culture +
              '"></i> +5</span><br/><span class="text-culture"><i class="' +
              ug.culture +
              '"></i> +10 / trade route</span>',
            desc: () =>
              '<span class="text-culture"><i class="' +
              ug.culture +
              '"></i> +5</span> | <span class="text-culture"><i class="' +
              ug.trade +
              '"></i> <i class="' +
              ug.culture +
              '"></i> +10</span>',
            category: "culture",
            require: {
              science: "acoustics",
              buildings: ["amphitheatre", "town_hall"],
            },
          },
          museum: {
            id: "museum",
            label: () => "Museum",
            description: () =>
              '<span class="text-culture"><i class="' +
              ug.culture +
              '"></i> +10</span><br/><span class="text-relics"><i class="' +
              ug.relics +
              '"></i> Relics</span> gain +50%',
            desc: () =>
              '<span class="text-culture"><i class="' +
              ug.culture +
              '"></i> +10</span> | <span class="text-relics"><i class="' +
              ug.relics +
              '"></i> +50%</span>',
            category: "culture",
            require: {
              science: "archeology",
              buildings: ["amphitheatre", "town_hall"],
            },
            industrial: !0,
          },
          walls: {
            id: "walls",
            label: () => "Walls",
            description: () =>
              '<div><i class="' + ug.defense + '"></i> +50%</div>',
            desc: () => '<span><i class="' + ug.defense + '"></i> +50%</span>',
            category: "defense",
            require: {
              science: "masonry",
              buildings: ["lo"],
            },
          },
          castle: {
            id: "castle",
            label: (l) => ("french" == l.civ_id ? "Chateau" : "Castle"),
            description: (l, n) =>
              '<div><i class="' +
              ug.defense +
              '"></i> +50%</div>' +
              ("french" == n.player(l).civ_id
                ? '<div class="text-gold"><i class="' +
                  ug.gold +
                  '"></i> +10</div><div class="text-culture"><i class="' +
                  ug.culture +
                  '"></i> +10</div>'
                : ""),
            desc: (l, n) =>
              '<span><i class="' +
              ug.defense +
              '"></i> +50%</span>' +
              ("french" == n.player(l).civ_id
                ? ' | <span class="text-gold"><i class="' +
                  ug.gold +
                  '"></i> +10</span> | <span class="text-culture"><i class="' +
                  ug.culture +
                  '"></i> +10</span>'
                : ""),
            category: "defense",
            require: {
              science: "advanced_fortification",
              buildings: ["town_hall", "walls"],
            },
          },
          fortress: {
            id: "fortress",
            label: () => "Fortress",
            description: () =>
              '<div><i class="' + ug.defense + '"></i> +50%</div>',
            desc: () => '<span><i class="' + ug.defense + '"></i> +50%</span>',
            category: "defense",
            require: {
              science: "siege",
              buildings: ["town_hall", "castle"],
            },
          },
          embassy: {
            id: "embassy",
            label: () => "Embassy",
            description: () =>
              '<div class="text-diplomacy"><i class="' +
              ug.diplomacy +
              '"></i> +1 / trade route</div>',
            desc: () =>
              '<span class="text-diplomacy"><i class="' +
              ug.diplomacy +
              '"></i> +1</span>',
            category: "diplomacy",
            require: {
              science: "diplomacy",
              buildings: ["town_hall"],
            },
          },
          consulate: {
            id: "consulate",
            label: () => "Consulate",
            description: () =>
              '<div class="text-diplomacy"><i class="' +
              ug.diplomacy +
              '"></i> +1 / trade route</div>',
            desc: () =>
              '<span class="text-diplomacy"><i class="' +
              ug.diplomacy +
              '"></i> +1</span>',
            category: "diplomacy",
            require: {
              science: "republic",
              buildings: ["town_hall", "embassy"],
            },
          },
          shrine: {
            id: "shrine",
            label: () => "Shrine",
            description: (l, n) =>
              '<div>Wonders <i class="' +
              ug.prod +
              ' text-prod"></i> cost -5%</div>' +
              (n
                ? '<div class="text-faith"><i class="' +
                  ug.faith +
                  '"></i> +' +
                  (n.hasPolicyGroup("piety") ? 3 : 1) +
                  "</div>" +
                  (n.hasPolicy("secularism")
                    ? '<div class="text-happiness"><i class="' +
                      ug.happiness +
                      '"></i> +5%</div>'
                    : "")
                : '<div class="text-faith"><i class="' +
                  ug.faith +
                  '"></i> +1</div>'),
            desc: (l, n) =>
              '<span class="text-faith"><i class="' +
              ug.faith +
              '"></i> +' +
              (n.hasPolicyGroup("piety") ? 3 : 1) +
              "</span>" +
              (n.hasPolicy("secularism")
                ? ' | <span class="text-happiness"><i class="' +
                  ug.happiness +
                  '"></i> +5%</span>'
                : ""),
            category: "faith",
            require: {
              science: "spirituality",
              buildings: ["lo"],
            },
          },
          temple: {
            id: "temple",
            label: () => "Temple",
            description: (l, n) =>
              '<div class="text-faith"><i class="' +
              ug.faith +
              '"></i> +5</div>' +
              (n && n.hasPolicy("organized_religion")
                ? '<div class="text-health"><i class="' +
                  ug.health +
                  '"></i> +5%</div>'
                : ""),
            desc: (l, n) =>
              '<span class="text-faith"><i class="' +
              ug.faith +
              '"></i> +5</span>' +
              (n.hasPolicy("organized_religion")
                ? ' | <span class="text-health"><i class="' +
                  ug.health +
                  '"></i> +5%</span>'
                : ""),
            category: "faith",
            require: {
              science: "religion",
              buildings: ["town_hall", "shrine"],
            },
          },
          monastery: {
            id: "monastery",
            label: () => "Monastery",
            description: (l, n) =>
              '<div class="text-faith"><i class="' +
              ug.faith +
              '"></i> +15</div>' +
              (n && n.hasPolicy("theocracy")
                ? '<div class="text-happiness"><i class="' +
                  ug.happiness +
                  '"></i> +5%</div>'
                : "") +
              (n && n.hasPolicy("reformation")
                ? '<div class="text-science"><i class="' +
                  ug.science +
                  '"></i> +10%</div><div class="text-faith"><i class="' +
                  ug.faith +
                  '"></i> +10%</div>'
                : ""),
            desc: (l, n) =>
              '<span class="text-faith"><i class="' +
              ug.faith +
              '"></i> +15</span>' +
              (n.hasPolicy("theocracy")
                ? ' | <span class="text-happiness"><i class="' +
                  ug.happiness +
                  '"></i> +5%</span>'
                : "") +
              (n.hasPolicy("reformation")
                ? ' | <span class="text-science"><i class="' +
                  ug.science +
                  '"></i> +10%</span> | <span class="text-faith"><i class="' +
                  ug.faith +
                  '"></i> +10%</span>'
                : ""),
            category: "faith",
            require: {
              science: "theology",
              buildings: ["town_hall", "temple"],
            },
          },
          granary: {
            id: "granary",
            label: (l) => ("incans" == l.civ_id ? "Terrace" : "Granary"),
            description: (l, n) =>
              '<div class="text-food"><i class="' +
              ug.food +
              '"></i> +' +
              n.buildingBonus("granary", l) +
              "</div>",
            desc: (l, n) =>
              '<span class="text-food"><i class="' +
              ug.food +
              '"></i> +' +
              n.buildingBonus("granary", l) +
              "</span>",
            bonus: (l) => ("incans" == l.civ_id ? 5 : 2),
            category: "food",
            require: {
              science: "agriculture",
              buildings: ["lo"],
            },
          },
          port: {
            id: "port",
            label: () => "Harbor",
            description: () =>
              '<div class="text-food"><i class="' + ug.food + '"></i> +5</div>',
            desc: () =>
              '<span class="text-food"><i class="' +
              ug.food +
              '"></i> +5</span>',
            category: "food",
            require: {
              science: "navigation",
              buildings: ["lo"],
            },
            coastal: !0,
          },
          mill: {
            id: "mill",
            label: () => "Mill",
            description: () =>
              '<div class="text-food"><i class="' +
              ug.food +
              '"></i> +10</div>',
            desc: () =>
              '<span class="text-food"><i class="' +
              ug.food +
              '"></i> +10</span>',
            category: "food",
            require: {
              science: "milling",
              buildings: ["town_hall", "granary"],
            },
          },
          cop: {
            id: "cop",
            oid: "copper_mine",
            label: () => "Copper Mine",
            description: () =>
              '<div class="text-gold"><i class="' + ug.gold + '"></i> +5</div>',
            desc: () =>
              '<span class="text-gold"><i class="' +
              ug.gold +
              '"></i> +5</span>',
            category: "gold",
            require: {
              science: "bronze_working",
              buildings: ["lo"],
            },
          },
          go: {
            id: "go",
            oid: "gold_mine",
            label: () => "Gold Mine",
            description: () =>
              '<div class="text-gold"><i class="' +
              ug.gold +
              '"></i> +15</div>',
            desc: () =>
              '<span class="text-gold"><i class="' +
              ug.gold +
              '"></i> +15</span>',
            category: "gold",
            require: {
              science: "iron_working",
              buildings: ["town_hall", "cop"],
            },
          },
          coa: {
            id: "coa",
            oid: "coal_mine",
            label: () => "Coal Mine",
            description: () =>
              '<div class="text-gold"><i class="' +
              ug.gold +
              '"></i> +25</div>',
            desc: () =>
              '<span class="text-gold"><i class="' +
              ug.gold +
              '"></i> +25</span>',
            category: "gold",
            require: {
              science: "steam",
              buildings: ["police", "go"],
            },
            industrial: !0,
          },
          market: {
            id: "market",
            label: () => "Market",
            description: () =>
              '<div class="text-gold"><i class="' +
              ug.gold +
              '"></i> +2 / trade route</div>',
            desc: () =>
              '<span class="text-gold"><i class="' +
              ug.trade +
              '"></i><i class="' +
              ug.gold +
              '"></i> +2</span>',
            category: "gold_trade",
            require: {
              science: "mathematics",
              buildings: ["town_hall"],
            },
          },
          bank: {
            id: "bank",
            label: (l) => ("ottomans" == l.civ_id ? "Bazaar" : "Bank"),
            description: (l, n) =>
              '<div class="text-gold"><i class="' +
              ug.gold +
              '"></i> +' +
              n.buildingBonus("bank", l) +
              " / trade route</div>",
            desc: (l, n) =>
              '<span class="text-gold"><i class="' +
              ug.trade +
              '"></i><i class="' +
              ug.gold +
              '"></i> +' +
              n.buildingBonus("bank", l) +
              "</span>",
            bonus: (l) => (l && "ottomans" == l.civ_id ? 10 : 5),
            category: "gold_trade",
            require: {
              science: "currency",
              buildings: ["town_hall", "market"],
            },
          },
          stock: {
            id: "stock",
            label: () => "Stock Exchange",
            description: () =>
              '<div class="text-gold"><i class="' +
              ug.gold +
              '"></i> +10 / trade route</div>',
            desc: () =>
              '<span class="text-gold"><i class="' +
              ug.trade +
              '"></i><i class="' +
              ug.gold +
              '"></i> +10</span>',
            category: "gold_trade",
            require: {
              science: "economics",
              buildings: ["town_hall", "bank"],
            },
          },
          chest: {
            id: "chest",
            label: () => "Chest",
            description: () =>
              'Increase <span class="text-gold"><i class="' +
              ug.gold +
              '"></i></span> limit to 1 000',
            category: "gold_limit",
            require: {
              science: "mining",
              buildings: ["lo"],
            },
          },
          treasury: {
            id: "treasury",
            label: () => "Treasury",
            description: () =>
              'Increase <span class="text-gold"><i class="' +
              ug.gold +
              '"></i></span> limit to 1M',
            category: "gold_limit",
            require: {
              science: "writing",
              buildings: ["lo", "chest"],
            },
          },
          mint: {
            id: "mint",
            label: () => "Mint",
            description: () =>
              'Increase <span class="text-gold"><i class="' +
              ug.gold +
              '"></i></span> limit to 100M',
            category: "gold_limit",
            require: {
              science: "currency",
              buildings: ["town_hall", "treasury"],
            },
          },
          reserve: {
            id: "reserve",
            label: () => "Gold Reserve",
            description: () =>
              'Increase <span class="text-gold"><i class="' +
              ug.gold +
              '"></i></span> limit to 10B',
            category: "gold_limit",
            require: {
              science: "corporation",
              buildings: ["police", "mint"],
            },
            industrial: !0,
          },
          gardens: {
            id: "gardens",
            label: (l) => ("indonesians" == l.civ_id ? "Candi" : "Gardens"),
            description: (l, n) =>
              '<div class="text-happiness"><i class="' +
              ug.happiness +
              '"></i> +' +
              100 * n.buildingBonus("gardens", l) +
              "%</div>",
            desc: (l, n) =>
              '<span class="text-happiness"><i class="' +
              ug.happiness +
              '"></i> +' +
              100 * n.buildingBonus("gardens", l) +
              "%</span>",
            bonus: (l) => (l && "indonesians" == l.civ_id ? 0.1 : 0.05),
            category: "happiness",
            require: {
              science: "crop_rotation",
              buildings: ["lo"],
            },
          },
          theatre: {
            id: "theatre",
            label: () => "Theatre",
            description: () =>
              '<div class="text-happiness"><i class="' +
              ug.happiness +
              '"></i> +10%</div>',
            desc: () =>
              '<span class="text-happiness"><i class="' +
              ug.happiness +
              '"></i> +10%</span>',
            category: "happiness",
            require: {
              science: "drama",
              buildings: ["town_hall", "gardens"],
            },
          },
          circus: {
            id: "circus",
            label: () => "Circus",
            description: () =>
              '<div class="text-happiness"><i class="' +
              ug.happiness +
              '"></i> +15%</div>',
            desc: () =>
              '<span class="text-happiness"><i class="' +
              ug.happiness +
              '"></i> +15%</span>',
            category: "happiness",
            require: {
              science: "music_theory",
              buildings: ["town_hall", "theatre"],
            },
          },
          zoo: {
            id: "zoo",
            label: (l) => ("brazilians" == l.civ_id ? "Carnival" : "Zoo"),
            description: (l, n) =>
              '<div class="text-happiness"><i class="' +
              ug.happiness +
              '"></i> +15%</div>' +
              ("brazilians" == n.player(l).civ_id
                ? '<div class="text-culture"><i class="' +
                  ug.culture +
                  '"></i> +10</div>'
                : ""),
            desc: (l, n) =>
              '<span class="text-happiness"><i class="' +
              ug.happiness +
              '"></i> +15%</span>' +
              ("brazilians" == n.player(l).civ_id
                ? ' | <span class="text-culture"><i class="' +
                  ug.culture +
                  '"></i> +10</span>'
                : ""),
            category: "happiness",
            require: {
              science: "rigging",
              buildings: ["town_hall", "circus"],
            },
          },
          well: {
            id: "well",
            label: () => "Well",
            description: () =>
              '<div class="text-health"><i class="' +
              ug.health +
              '"></i> +5%</div>',
            desc: () =>
              '<span class="text-health"><i class="' +
              ug.health +
              '"></i> +5%</span>',
            category: "health",
            require: {
              science: "masonry",
              buildings: ["lo"],
            },
          },
          aqueduct: {
            id: "aqueduct",
            label: () => "Aqueduct",
            description: () =>
              '<div class="text-health"><i class="' +
              ug.health +
              '"></i> +10%</div><div>Increase Plague Doctors efficiency</div>',
            desc: () =>
              '<span class="text-health"><i class="' +
              ug.health +
              '"></i> +10%</span>',
            category: "health",
            require: {
              science: "construction",
              buildings: ["town_hall", "well"],
            },
          },
          hospital: {
            id: "hospital",
            label: () => "Hospital",
            description: (l, n) =>
              '<div class="text-health"><i class="' +
              ug.health +
              '"></i> +' +
              (n && n.hasPolicy("procedures") ? "20" : "15") +
              "%</div><div>Increase Plague Doctors efficiency</div>",
            desc: (l, n) =>
              '<span class="text-health"><i class="' +
              ug.health +
              '"></i> +' +
              (n && n.hasPolicy("procedures") ? "20" : "15") +
              "%</span>",
            category: "health",
            require: {
              science: "anatomy",
              buildings: ["town_hall", "aqueduct"],
            },
          },
          dispensary: {
            id: "dispensary",
            label: () => "Dispensary",
            description: () =>
              '<div class="text-health"><i class="' +
              ug.health +
              '"></i> +20%</div>',
            desc: () =>
              '<span class="text-health"><i class="' +
              ug.health +
              '"></i> +20%</span>',
            category: "health",
            require: {
              science: "biology",
              buildings: ["police", "hospital"],
            },
            industrial: !0,
          },
          quarantine: {
            id: "quarantine",
            label: () => "Quarantine Station",
            description: () =>
              '<div class="text-health"><i class="' +
              ug.health +
              '"></i> +10%</div><div>Prevents Plague propagation</div>',
            desc: () =>
              '<span class="text-health"><i class="' +
              ug.health +
              '"></i> +10%</span>',
            category: "health",
            require: {
              science: "sanitation",
              buildings: ["police", "hospital"],
            },
            industrial: !0,
          },
          armory: {
            id: "armory",
            label: () => "Armory",
            description: () => "Reduce troop maintenance in this city by half",
            category: "military",
            require: {
              science: "steel",
              buildings: ["town_hall", "barracks"],
            },
          },
          barracks: {
            id: "barracks",
            label: () => "Barracks",
            description: (l, n) =>
              "Allow recruitment of melee & ranged units" +
              (n && n.hasPolicy("despotism")
                ? '<div class="text-happiness"><i class="' +
                  ug.happiness +
                  '"></i> +5%</div>'
                : ""),
            desc: (l, n) =>
              n.hasPolicy("despotism")
                ? '<span class="text-happiness"><i class="' +
                  ug.happiness +
                  '"></i> +5%</span>'
                : "",
            category: "military",
            require: {
              science: "tools",
              buildings: ["lo"],
            },
          },
          stables: {
            id: "stables",
            label: () => "Stables",
            description: () => "Allow recruitment of mounted units",
            category: "military",
            require: {
              science: "horseriding",
              buildings: ["lo"],
            },
          },
          sif: {
            id: "sif",
            oid: "siege_factory",
            label: () => "Siege Factory",
            description: () => "Allow recruitment of siege units",
            category: "military",
            require: {
              science: "mathematics",
              buildings: ["town_hall"],
            },
          },
          seaport: {
            id: "seaport",
            label: () => "Seaport",
            description: () => "Allow recruitment of naval units",
            category: "military",
            require: {
              science: "astronomy",
              buildings: ["town_hall"],
            },
            coastal: !0,
          },
          trc: {
            id: "trc",
            oid: "training_center",
            label: () => "Training Center",
            description: () => "Increase recruitment speed by 25%",
            category: "military",
            require: {
              science: "armies",
              buildings: ["lo"],
            },
          },
          mia: {
            id: "mia",
            oid: "military_academy",
            label: () => "Military Academy",
            description: () => "Increase recruitment speed by 25%",
            category: "military",
            require: {
              science: "chivalry",
              buildings: ["town_hall", "trc"],
            },
          },
          arsenal: {
            id: "arsenal",
            label: () => "Arsenal",
            description: () => "Increase recruitment speed by 25%",
            category: "military",
            require: {
              science: "production",
              buildings: ["town_hall", "mia"],
            },
          },
          workshop: {
            id: "workshop",
            label: (l) =>
              l && "egyptians" == l.civ_id ? "Granite quarry" : "Workshop",
            description: (l, n) =>
              '<div class="text-prod"><i class="' +
              ug.prod +
              '"></i> +' +
              n.buildingBonus("workshop", l) +
              "</div>",
            desc: (l, n) =>
              '<span class="text-prod"><i class="' +
              ug.prod +
              '"></i> +' +
              n.buildingBonus("workshop", l) +
              "</span>",
            bonus: (l) => (l && "egyptians" == l.civ_id ? 10 : 5),
            category: "production",
            require: {
              science: "bronze_working",
              buildings: ["town_hall"],
            },
          },
          furnace: {
            id: "furnace",
            label: () => "Furnace",
            description: () =>
              '<div class="text-prod"><i class="' +
              ug.prod +
              '"></i> +15</div>',
            desc: () =>
              '<span class="text-prod"><i class="' +
              ug.prod +
              '"></i> +15</span>',
            category: "production",
            require: {
              science: "iron_working",
              buildings: ["town_hall", "workshop"],
            },
          },
          ironworks: {
            id: "ironworks",
            label: (l) => (l && "germans" == l.civ_id ? "Hanse" : "Ironworks"),
            description: (l, n) =>
              '<div class="text-prod"><i class="' +
              ug.prod +
              '"></i> +' +
              n.buildingBonus("ironworks", l) +
              "</div>",
            desc: (l, n) =>
              '<span class="text-prod"><i class="' +
              ug.prod +
              '"></i> +' +
              n.buildingBonus("ironworks", l) +
              "</span>",
            bonus: (l) => (l && "germans" == l.civ_id ? 40 : 25),
            category: "production",
            require: {
              science: "metallurgy",
              buildings: ["town_hall", "furnace"],
            },
          },
          factory: {
            id: "factory",
            label: () => "Factory",
            description: () =>
              '<div class="text-prod"><i class="' +
              ug.prod +
              '"></i> +50</div>',
            desc: () =>
              '<span class="text-prod"><i class="' +
              ug.prod +
              '"></i> +50</span>',
            category: "production",
            require: {
              science: "industrialization",
              buildings: ["police", "ironworks"],
            },
            industrial: !0,
          },
          hydro: {
            id: "hydro",
            label: () => "Hydro Plant",
            description: () =>
              '<div class="text-prod"><i class="' +
              ug.prod +
              '"></i> +50</div>',
            desc: () =>
              '<span class="text-prod"><i class="' +
              ug.prod +
              '"></i> +50</span>',
            category: "production",
            require: {
              science: "electricity",
              buildings: ["police", "factory"],
            },
            industrial: !0,
          },
          progress: {
            id: "progress",
            label: () => "Progress",
            description: () =>
              'Can be built repeatedly.<br/>Produce <span class="text-progress"><i class="' +
              ug.progress +
              '"></i> Progress</span>',
            desc: () =>
              '<span class="text-progress"><i class="' +
              ug.progress +
              '"></i> +1</span>',
            category: "production",
            require: {
              science: "industrialization",
              buildings: ["police"],
            },
            free: !0,
          },
          library: {
            id: "library",
            label: (l) =>
              l && "chinese" == l.civ_id ? "Paper Maker" : "Library",
            description: (l, n) =>
              '<div class="text-science"><i class="' +
              ug.science +
              '"></i> +' +
              n.buildingBonus("library", l) +
              "</div>" +
              (n && n.hasPolicy("philosophy")
                ? '<div class="text-culture"><i class="' +
                  ug.culture +
                  '"></i> +5%</div>'
                : ""),
            desc: (l, n) =>
              '<span class="text-science"><i class="' +
              ug.science +
              '"></i> +' +
              n.buildingBonus("library", l) +
              "</span>" +
              (n.hasPolicy("philosophy")
                ? ' | <span class="text-culture"><i class="' +
                  ug.culture +
                  '"></i> +5%</div>'
                : ""),
            bonus: (l, n) => {
              let e = 5;
              return (
                n.hasWonder(l.id, "great_library") && (e += 5),
                l && "chinese" == l.civ_id && (e += 5),
                e
              );
            },
            category: "science",
            require: {
              science: "literature",
              buildings: ["town_hall"],
            },
          },
          uni: {
            id: "uni",
            oid: "university",
            label: () => "University",
            description: (l, n) =>
              '<div class="text-science"><i class="' +
              ug.science +
              '"></i> +15</div>' +
              (n && n.hasPolicy("scientific_state")
                ? '<div class="text-science"><i class="' +
                  ug.science +
                  '"></i> +10%</div><div class="text-faith"><i class="' +
                  ug.faith +
                  '"></i> +10%</div>'
                : ""),
            desc: (l, n) =>
              '<span class="text-science"><i class="' +
              ug.science +
              '"></i> +15</span>' +
              (n.hasPolicy("scientific_state")
                ? '| <span class="text-science"><i class="' +
                  ug.science +
                  '"></i> +10%</span> | <span class="text-faith"><i class="' +
                  ug.faith +
                  '"></i> +10%</span>'
                : ""),
            category: "science",
            require: {
              science: "education",
              buildings: ["town_hall", "library"],
            },
          },
          school: {
            id: "school",
            label: () => "Public School",
            description: () =>
              '<div class="text-science"><i class="' +
              ug.science +
              '"></i> +25</div>',
            desc: () =>
              '<span class="text-science"><i class="' +
              ug.science +
              '"></i> +25</span>',
            category: "science",
            require: {
              science: "scientific",
              buildings: ["police", "uni"],
            },
            industrial: !0,
          },
          pyramid: {
            id: "pyramid",
            label: () => "Pyramids",
            description: () =>
              '<div>Free Granary in each of your cities</div><div class="text-culture"><i class="' +
              ug.culture +
              '"></i>+5</div><div class="text-faith"><i class="' +
              ug.faith +
              '"></i>+2 for each wonder in this city</div>',
            desc: (l, n, e) =>
              '<span class="text-culture"><i class="' +
              ug.culture +
              '"></i> +5</span> | <span class="text-faith"><i class="' +
              ug.faith +
              '"></i> +' +
              2 * n.wondersNbInCity(e) +
              "</span>",
            add_all: "granary",
            category: "_wonder",
            wonder: !0,
            require: {
              science: "herding",
              buildings: ["lo"],
            },
          },
          colossus: {
            id: "colossus",
            label: () => "Colossus",
            description: () =>
              '<div class="text-gold"><i class="' +
              ug.gold +
              '"></i> +10</div><div class="text-trade"><i class="' +
              ug.trade +
              '"></i> +1</div>',
            desc: () =>
              '<span class="text-gold"><i class="' +
              ug.gold +
              '"></i> +10</span> | <span class="text-trade"><i class="' +
              ug.trade +
              '"></i> +1</span>',
            category: "_wonder",
            wonder: !0,
            require: {
              science: "bronze_working",
              buildings: ["lo"],
            },
          },
          hanging_gardens: {
            id: "hanging_gardens",
            label: () => "Hanging Gardens",
            description: () =>
              '<div class="text-food"><i class="' +
              ug.food +
              '"></i> +10</div><div class="text-happiness"><i class="' +
              ug.happiness +
              '"></i> +10%</div><div>Free Garden in the city in which it was built</div>',
            desc: () =>
              '<span class="text-food"><i class="' +
              ug.food +
              '"></i> +10</span> | <span class="text-happiness"><i class="' +
              ug.happiness +
              '"></i> +1</span>',
            add_city: "gardens",
            category: "_wonder",
            wonder: !0,
            require: {
              science: "bronze_working",
              buildings: ["lo"],
            },
          },
          apadana: {
            id: "apadana",
            label: () => "Apadana",
            description: () => "<div>Improvement building speed +25%</div>",
            category: "_wonder",
            wonder: !0,
            require: {
              science: "masonry",
              buildings: ["town_hall"],
            },
          },
          ziggurat: {
            id: "ziggurat",
            label: () => "Great Ziggurat",
            description: () =>
              "<div>Slavers chances of success +100%</div><div>Free Temple in the city in which it was built</div>",
            add_city: "temple",
            category: "_wonder",
            wonder: !0,
            require: {
              science: "calendar",
              buildings: ["town_hall"],
            },
          },
          great_library: {
            id: "great_library",
            label: () => "Great Library",
            description: () =>
              '<div class="text-science"><i class="' +
              ug.science +
              '"></i> +5 / library</div><div>Free Library in the city in which it was built</div>',
            add_city: "library",
            category: "_wonder",
            wonder: !0,
            require: {
              science: "literature",
              buildings: ["town_hall"],
            },
          },
          mausoleum: {
            id: "mausoleum",
            label: () => "Mausoleum of Halicarnassus",
            description: () =>
              '<div>Reduce <i class="' +
              ug.spells +
              '"></i> spells cooldown by 15%</div><div class="text-culture"><i class="' +
              ug.culture +
              '"></i>+5</div>',
            desc: () =>
              '<span class="text-culture"><i class="' +
              ug.culture +
              '"></i> +5</span>',
            category: "_wonder",
            wonder: !0,
            require: {
              science: "religion",
              buildings: ["town_hall"],
            },
          },
          statue_zeus: {
            id: "statue_zeus",
            label: () => "Statue of Zeus",
            description: () =>
              "<div>+15% attack</div><div>+15% recruitment speed</div>",
            category: "_wonder",
            wonder: !0,
            require: {
              science: "archery",
              buildings: ["lo"],
            },
          },
          temple_artemis: {
            id: "temple_artemis",
            label: () => "Temple of Artemis",
            description: () =>
              '<div>+50% defense in the city in which it was built</div><div class="text-prod"><i class="' +
              ug.prod +
              '"></i>+1 / builder</div>',
            category: "_wonder",
            wonder: !0,
            require: {
              science: "archery",
              buildings: ["lo"],
            },
          },
          pantheon: {
            id: "pantheon",
            label: () => "Pantheon",
            description: () =>
              "Reduce discontent due to distance from capital by 50% (in all empire)",
            category: "_wonder",
            wonder: !0,
            require: {
              science: "construction",
              buildings: ["town_hall"],
            },
          },
          great_wall: {
            id: "great_wall",
            label: () => "Great Wall",
            description: () =>
              '<div><i class="' +
              ug.defense +
              '"></i> +50% (in all empire)</div>',
            desc: () => '<span><i class="' + ug.defense + '"></i> +50%</span>',
            category: "_wonder",
            wonder: !0,
            require: {
              science: "construction",
              buildings: ["town_hall"],
            },
          },
          forbidden: {
            id: "forbidden",
            label: () => "Forbidden City",
            description: () =>
              '<div><span class="text-influence"><i class="' +
              ug.influence +
              '"></i> +25%</span> to all civilizations</div><div class="text-culture"><i class="' +
              ug.culture +
              '"></i>+5</div>',
            desc: () =>
              '<span class="text-culture"><i class="' +
              ug.culture +
              '"></i> +5</span>',
            category: "_wonder",
            wonder: !0,
            require: {
              science: "printing",
              buildings: ["town_hall"],
            },
          },
          sistine: {
            id: "sistine",
            label: () => "Sistine Chapel",
            description: () =>
              '<div>Free Opera in each of your cities</div><div class="text-culture"><i class="' +
              ug.culture +
              '"></i>+15</div>',
            desc: () =>
              '<span class="text-culture"><i class="' +
              ug.culture +
              '"></i> +15</span>',
            category: "_wonder",
            wonder: !0,
            add_all: "opera",
            require: {
              science: "acoustics",
              buildings: ["town_hall"],
            },
          },
          versailles: {
            id: "versailles",
            label: () => "Versailles",
            description: () =>
              '<div class="text-happiness"><i class="' +
              ug.happiness +
              '"></i>+10% to all cities</div><div class="text-culture"><i class="' +
              ug.culture +
              '"></i>+15</div>',
            desc: () =>
              '<span class="text-happiness"><i class="' +
              ug.happiness +
              '"></i> +10%</span> | <span class="text-culture"><i class="' +
              ug.culture +
              '"></i> +15</span>',
            category: "_wonder",
            wonder: !0,
            require: {
              science: "acoustics",
              buildings: ["town_hall"],
            },
          },
          taj: {
            id: "taj",
            label: () => "Taj Mahal",
            description: () =>
              '<div>Reduce <i class="' +
              ug.spells +
              '"></i> spells cooldown by 15%</div><div class="text-culture"><i class="' +
              ug.culture +
              '"></i>+10</div>',
            desc: () =>
              '<span class="text-culture"><i class="' +
              ug.culture +
              '"></i> +10</span>',
            category: "_wonder",
            wonder: !0,
            require: {
              science: "architecture",
              buildings: ["town_hall"],
            },
          },
          pisa: {
            id: "pisa",
            label: () => "Leaning Tower of Pisa",
            description: () =>
              '<div class="text-culture"><i class="' +
              ug.culture +
              '"></i> +10 / all trade routes</div>',
            desc: () =>
              '<span class="text-culture"><i class="' +
              ug.trade +
              '"></i> <i class="' +
              ug.culture +
              '"></i> +10</span>',
            category: "_wonder",
            wonder: !0,
            require: {
              science: "architecture",
              buildings: ["town_hall"],
            },
          },
          bigben: {
            id: "bigben",
            label: () => "Big Ben",
            description: () =>
              '<div class="text-gold"><i class="' +
              ug.gold +
              '"></i> +5% / colony</div><div class="text-happiness"><i class="' +
              ug.happiness +
              '"></i> +3% / colony</div>',
            category: "_wonder",
            wonder: !0,
            require: {
              science: "economics",
              buildings: ["town_hall"],
            },
          },
          casa: {
            id: "casa",
            label: () => "Casa Da India",
            description: () =>
              '<div>Caravel cost -50% & recruit time -50% in every city</div><div class="text-gold"><i class="' +
              ug.gold +
              '"></i> +2% / colony</div><div class="text-happiness"><i class="' +
              ug.happiness +
              '"></i> +2% / colony</div>',
            category: "_wonder",
            wonder: !0,
            require: {
              science: "astronomy",
              buildings: ["town_hall"],
            },
          },
          panama: {
            id: "panama",
            label: () => "Panama Canal",
            description: () =>
              '<div class="text-trade">+2 <i class="' +
              ug.trade +
              '"></i> trade routes</div>Remove <span class="text-trade"><i class="' +
              ug.trade +
              '"></i> trade routes</span> max dist.',
            category: "_wonder",
            wonder: !0,
            require: {
              science: "steam",
              buildings: ["police"],
            },
            industrial: !0,
          },
          oxford: {
            id: "oxford",
            label: () => "Oxford University",
            description: () =>
              '<span class="text-science"><i class="' +
              ug.science +
              '"></i> +50%</span> in the city in which it was built',
            category: "_wonder",
            wonder: !0,
            require: {
              science: "scientific",
              buildings: ["police"],
            },
            industrial: !0,
          },
          ruhr: {
            id: "ruhr",
            label: () => "Ruhr Valley",
            description: () =>
              '<span class="text-prod"><i class="' +
              ug.prod +
              '"></i> +25%</span> when producing <span class="text-prod">Progress</span>',
            category: "_wonder",
            wonder: !0,
            require: {
              science: "industrialization",
              buildings: ["police"],
            },
            industrial: !0,
          },
          eiffel: {
            id: "eiffel",
            label: () => "Eiffel Tower",
            description: () =>
              '<span class="text-progress"><i class="' +
              ug.progress +
              '"></i> +10 / min</span>',
            category: "_wonder",
            wonder: !0,
            require: {
              science: "railroad",
              buildings: ["police"],
            },
            industrial: !0,
          },
          brandenburg: {
            id: "brandenburg",
            label: () => "Brandenburg Gate",
            description: () =>
              "<div>+15% attack</div><div>+15% recruitment speed</div>",
            category: "_wonder",
            wonder: !0,
            require: {
              science: "military",
              buildings: ["police"],
            },
            industrial: !0,
          },
          hermitage: {
            id: "hermitage",
            label: () => "Hermitage",
            description: () =>
              '<span class="text-culture"><i class="' +
              ug.culture +
              '"></i> +5</span> / <span class="text-relics"><i class="' +
              ug.relics +
              '"></i></span>',
            category: "_wonder",
            wonder: !0,
            require: {
              science: "archeology",
              buildings: ["police"],
            },
            industrial: !0,
          },
        },
        cg = {
          prehistory: {
            id: "prehistory",
            name: "Prehistoric Era",
            rank_start: 0,
            rank_end: 3,
          },
          ancient: {
            id: "ancient",
            name: "Ancient Era",
            rank_start: 4,
            rank_end: 6,
          },
          classical: {
            id: "classical",
            name: "Classical Era",
            rank_start: 7,
            rank_end: 9,
          },
          medieval: {
            id: "medieval",
            name: "Medieval Era",
            rank_start: 10,
            rank_end: 12,
          },
          renaissance: {
            id: "renaissance",
            name: "Renaissance Era",
            rank_start: 13,
            rank_end: 15,
          },
          industrial: {
            id: "industrial",
            name: "Industrial Era",
            rank_start: 16,
            rank_end: 18,
          },
          future: {
            id: "future",
            name: "Future Era",
            rank_start: 19,
            rank_end: 19,
          },
        },
        dg = {
          language: {
            id: "language",
            label: "Language",
            description:
              '<span class="text-science">+0.1 <i class="' +
              ug.science +
              '"></i> / citizen</span>',
            require: [],
            rank: 1,
          },
          dog_domestication: {
            id: "dog_domestication",
            label: "Dog domestication",
            description:
              '<span class="text-food">+0.5 <i class="' +
              ug.food +
              '"></i> / hunter-gatherer</span>',
            require: [],
            rank: 1,
          },
          tanning: {
            id: "tanning",
            label: "Tanning",
            description:
              'Unlock <span class="text-pop">Builders</span><br/>Unlock <span class="text-prod">Longhouse</span>',
            require: [],
            rank: 1,
          },
          pottery: {
            id: "pottery",
            label: "Pottery",
            description:
              '<span class="text-health">+5% <i class="' +
              ug.health +
              '"></i></span>',
            require: [],
            rank: 1,
          },
          trade: {
            id: "trade",
            label: "Trade",
            description: 'Unlock <span class="text-pop">Merchants</span>',
            require: ["language", "dog_domestication"],
            rank: 2,
          },
          spirituality: {
            id: "spirituality",
            label: "Spirituality",
            description:
              'Unlock <span class="text-prod">Shrine</span><br/>Unlock <span class="text-special">Daily Bonus</span>',
            require: ["language", "tanning"],
            rank: 2,
          },
          mining: {
            id: "mining",
            label: "Mining",
            description: 'Unlock <span class="text-prod">Chest</span>',
            require: ["pottery", "tanning"],
            rank: 2,
          },
          tools: {
            id: "tools",
            label: "Tools",
            description:
              'Unlock <span class="text-prod">Barracks</span><br/>Unlock <span class="text-troop">Warrior</span><br/>',
            require: ["pottery", "tanning"],
            rank: 2,
          },
          art: {
            id: "art",
            label: "Art",
            description:
              'Unlock <span class="text-pop">Artists</span><br/>Unlock <span class="text-prod">Monument</span><br/>Unlock <span class="text-special">Social Policies</span><br/>Unlock <span class="text-culture">Traditionalism</span><br/>Unlock <span class="text-culture">Imperialism</span>',
            require: ["trade", "spirituality"],
            rank: 3,
          },
          exploration: {
            id: "exploration",
            label: "Exploration",
            description:
              'Unlock <span class="text-troop">Scout</span><br/>Unlock <span class="text-special">World Map</span>',
            require: ["trade", "tools"],
            rank: 3,
          },
          agriculture: {
            id: "agriculture",
            label: "Agriculture",
            description:
              'Unlock <span class="text-pop">Farmers</span> <span class="text-food">+1 <i class="' +
              ug.food +
              '"></i><br/>Unlock <span class="text-prod">Granary</span>',
            require: ["tools", "mining"],
            rank: 3,
          },
          archery: {
            id: "archery",
            label: "Archery",
            description:
              'Unlock <span class="text-troop">Archer</span><br/>Unlock <span class="text-special">Statue of Zeus</span><br/>Unlock <span class="text-special">Temple of Artemis</span><br/>Unlock <span class="text-special">Troop queues</span>',
            require: ["tools"],
            rank: 3,
          },
          writing: {
            id: "writing",
            label: "Writing",
            description:
              'Unlock <span class="text-special">Building & troops purchase</span><br/>Unlock <span class="text-pop">Scholars</span><br/>Unlock <span class="text-prod">Treasury</span><br/>Unlock <span class="text-culture">Rationalism</span><br/>Unlock <span class="text-culture">Platonic Academy</span>',
            require: ["art", "exploration"],
            rank: 4,
          },
          state: {
            id: "state",
            label: "State",
            description:
              'Unlock <span class="text-special">Empire</span><br/>Unlock <span class="text-prod">Town Hall</span><br/>Unlock <span class="text-troop">Governor</span><br/>Unlock <span class="text-culture">Collective Rule</span><br/>Unlock <span class="text-culture">Militarism</span>',
            require: ["exploration", "agriculture"],
            rank: 4,
          },
          herding: {
            id: "herding",
            label: "Herding",
            description:
              'Unlock <span class="text-culture">Ancients\' Wisdom</span><br/>Unlock <span class="text-culture">Piety</span><br/>Unlock <span class="text-special">Pyramids</span>',
            require: ["agriculture"],
            rank: 4,
          },
          navigation: {
            id: "navigation",
            label: "Navigation",
            description:
              'Unlock <span class="text-special">Diplomacy</span><br/>Unlock <span class="text-special">Trade</span><br/>Unlock <span class="text-troop">Caravan</span><br/><span class="text-prod">+0.5 <i class="' +
              ug.prod +
              '"></i> / builder</span><br/>Unlock <span class="text-prod">Harbor</span><br/>Unlock <span class="text-culture">Pacifism</span>',
            require: ["exploration", "archery"],
            rank: 4,
          },
          armies: {
            id: "armies",
            label: "Armies",
            description:
              'Unlock <span class="text-prod">Training Center</span><br/>Unlock <span class="text-culture">Aristocracy</span><br/>Unlock <span class="text-culture">Meritocracy</span><br/>Unlock <span class="text-culture">Code of Honor</span>',
            require: ["state", "writing"],
            rank: 5,
          },
          horseriding: {
            id: "horseriding",
            label: "Horseriding",
            description:
              'Unlock <span class="text-prod">Stables</span><br/>Unlock <span class="text-troop">Horseman</span><br/>Unlock <span class="text-culture">Wonder Builder</span>',
            require: ["herding"],
            rank: 5,
          },
          bronze_working: {
            id: "bronze_working",
            label: "Bronze Working",
            description:
              'Unlock <span class="text-prod">Copper Mine</span><br/>Unlock <span class="text-special">Colossus</span><br/>Unlock <span class="text-special">Hanging Gardens</span><br/>Unlock <span class="text-prod">Workshop</span><br/>Unlock <span class="text-troop">Lancier</span><br/>Unlock <span class="text-troop">Worker</span><br/>Unlock <span class="text-improvement">Mine</span><br/>Unlock <span class="text-troop">Slaver</span>',
            require: ["navigation", "state"],
            rank: 5,
          },
          crop_rotation: {
            id: "crop_rotation",
            label: "Crop Rotation",
            description:
              '<span class="text-food">+1 <i class="' +
              ug.food +
              '"></i> / farmer</span><br/>Unlock <span class="text-prod">Gardens</span><br/>Unlock <span class="text-improvement">Farm</span>',
            require: ["herding"],
            rank: 5,
          },
          wheel: {
            id: "wheel",
            label: "Wheel",
            description:
              '<span class="text-gold">+1 <i class="' +
              ug.gold +
              '"></i> / merchant</span><br/><span class="text-trade">+1 <i class="' +
              ug.trade +
              '"></i> trade route</span><br/>Increase <span class="text-trade"><i class="' +
              ug.trade +
              '"></i> trade routes</span> max dist.<br/>Unlock <span class="text-prod">Amphitheatre</span><br/>Unlock <span class="text-improvement">Road</span>',
            require: ["horseriding", "armies"],
            rank: 6,
          },
          masonry: {
            id: "masonry",
            label: "Masonry",
            description:
              'Unlock <span class="text-prod">Palace</span><br/>Unlock <span class="text-prod">Walls</span><br/>Unlock <span class="text-prod">Well</span><br/>Unlock <span class="text-special">Apadana</span>',
            require: ["bronze_working"],
            rank: 6,
          },
          code_of_laws: {
            id: "code_of_laws",
            label: "Justice",
            description:
              'Unlock <span class="text-prod">Tribunal</span><br/>Unlock <span class="text-culture">Administration</span><br/>Unlock <span class="text-culture">Religious Laws</span><br/>Unlock <span class="text-culture">Code of Laws</span><br/>Unlock <span class="text-culture">Despotism</span><br/>Unlock <span class="text-culture">Organized Slavery</span>',
            require: ["bronze_working"],
            rank: 6,
          },
          calendar: {
            id: "calendar",
            label: "Calendar",
            description:
              'Unlock <span class="text-troop">Plague Doctors</span><br/>Unlock <span class="text-special">Great Ziggurat</span><br/>Unlock <span class="text-culture">City-State</span>',
            require: ["crop_rotation", "bronze_working"],
            rank: 6,
          },
          literature: {
            id: "literature",
            label: "Literature",
            description:
              'Unlock <span class="text-prod">Library</span><br/>Unlock <span class="text-special">Great Library</span><br/>Unlock <span class="text-culture">Philosophy</span><br/>Unlock <span class="text-culture">Oligarchy</span>',
            require: ["wheel"],
            rank: 7,
          },
          mathematics: {
            id: "mathematics",
            label: "Mathematics",
            description:
              'Unlock <span class="text-troop">Catapult</span><br/>Unlock <span class="text-prod">Market</span><br/>Unlock <span class="text-prod">Siege Factory</span><br/>Unlock <span class="text-improvement">Trading Post</span>',
            require: ["masonry", "calendar"],
            rank: 7,
          },
          diplomacy: {
            id: "diplomacy",
            label: "Diplomacy",
            description:
              'Unlock <span class="text-special">Global diplomacy</span><br/>Unlock <span class="text-special">Alliances</span><br/><span class="text-trade">+1 <i class="' +
              ug.trade +
              '"></i> trade route</span><br/>Unlock <span class="text-prod">Embassy</span><br/>Unlock <span class="text-culture">Patronage</span><br/>Unlock <span class="text-culture">Patriotism</span>',
            require: ["code_of_laws"],
            rank: 7,
          },
          religion: {
            id: "religion",
            label: "Religion",
            description:
              'Unlock <span class="text-special">Deity</span><br/>Unlock <span class="text-special">Spells</span><br/>Unlock <span class="text-pop">Priests</span><br/>Unlock <span class="text-prod">Temple</span><br/>Unlock <span class="text-special">Mausoleum of Halicarnassus</span><br/>Unlock <span class="text-culture">Organized Religion</span>',
            require: ["code_of_laws", "calendar"],
            rank: 7,
          },
          tactics: {
            id: "tactics",
            label: "Tactics",
            description:
              'Unlock <span class="text-special">Battle Simulator</span><br/>Unlock <span class="text-culture">Discipline</span>',
            require: ["mathematics"],
            rank: 8,
          },
          iron_working: {
            id: "iron_working",
            label: "Iron Working",
            description:
              'Unlock <span class="text-prod">Gold Mine</span><br/>Unlock <span class="text-prod">Furnace</span><br/>Unlock <span class="text-troop">Swordsman</span><br/>Unlock <span class="text-improvement">Forest Camp</span>',
            require: ["mathematics"],
            rank: 8,
          },
          monarchy: {
            id: "monarchy",
            label: "Monarchy",
            description:
              'Unlock <span class="text-troop">Spy</span><br/>Unlock <span class="text-culture">Landed Elites</span>',
            require: ["religion", "diplomacy"],
            rank: 8,
          },
          drama: {
            id: "drama",
            label: "Drama",
            description:
              '<span class="text-culture">+0.5 <i class="' +
              ug.culture +
              '"></i> / artist</span><br/>Unlock <span class="text-prod">Theatre</span><br/>Unlock <span class="text-culture">Philantropy</span>',
            require: ["literature", "religion"],
            rank: 8,
          },
          optics: {
            id: "optics",
            label: "Optics",
            description:
              'Unlock <span class="text-troop">Longbowman</span><br/><span class="text-trade">+1 <i class="' +
              ug.trade +
              '"></i> trade route</span><br/>Increase <span class="text-trade"><i class="' +
              ug.trade +
              '"></i> trade routes</span> max dist.',
            require: ["tactics"],
            rank: 9,
          },
          construction: {
            id: "construction",
            label: "Construction",
            description:
              'Unlock <span class="text-special">Pantheon</span><br/>Unlock <span class="text-special">Great Wall</span><br/>Unlock <span class="text-prod">Aqueduct</span>',
            require: ["tactics", "iron_working"],
            rank: 9,
          },
          milling: {
            id: "milling",
            label: "Milling",
            description:
              'Unlock <span class="text-prod">Mill</span><br/>Unlock <span class="text-culture">Conservatism</span>',
            require: ["iron_working"],
            rank: 9,
          },
          republic: {
            id: "republic",
            label: "Republic",
            description:
              'Unlock <span class="text-prod">Consulate</span><br/>Unlock <span class="text-culture">State Religion</span><br/>Unlock <span class="text-culture">Cultural Diplomacy</span>',
            require: ["monarchy", "drama"],
            rank: 9,
          },
          theology: {
            id: "theology",
            label: "Theology",
            description:
              '<span class="text-faith">+0.5 <i class="' +
              ug.faith +
              '"></i> / priest</span><br/>Unlock <span class="text-special">Reincarnation</span><br/>Unlock <span class="text-prod">Monastery</span><br/>Unlock <span class="text-culture">Secularism</span><br/>Unlock <span class="text-culture">Theocracy</span><br/>Unlock <span class="text-culture">Crusades</span>',
            require: ["republic", "optics"],
            rank: 10,
          },
          civil_service: {
            id: "civil_service",
            label: "Civil Service",
            description:
              'Unlock <span class="text-troop">Pikeman</span><br/>Unlock <span class="text-culture">Isolationism</span>',
            require: ["construction"],
            rank: 10,
          },
          feudalism: {
            id: "feudalism",
            label: "Feudalism",
            description:
              'Unlock <span class="text-culture">Sovereignty</span><br/>Unlock <span class="text-culture">Military Tradition</span>',
            require: ["construction", "milling"],
            rank: 10,
          },
          currency: {
            id: "currency",
            label: "Currency",
            description:
              'Unlock <span class="text-prod">Bank</span><br/>Unlock <span class="text-prod">Mint</span><br/>Unlock <span class="text-culture">Merchant Confederacy</span>',
            require: ["republic", "milling"],
            rank: 10,
          },
          music_theory: {
            id: "music_theory",
            label: "Music Theory",
            description:
              'Unlock <span class="text-prod">Circus</span><br/>Unlock <span class="text-culture">Proselytism</span>',
            require: ["theology"],
            rank: 11,
          },
          engineering: {
            id: "engineering",
            label: "Engineering",
            description:
              'Unlock <span class="text-pop">Scientists</span> <span class="text-science">+1 <i class="' +
              ug.science +
              '"></i><br/><span class="text-trade">+1 <i class="' +
              ug.trade +
              '"></i> trade route</span><br/>Increase <span class="text-trade"><i class="' +
              ug.trade +
              '"></i> trade routes</span> max dist.',
            require: ["civil_service"],
            rank: 11,
          },
          chivalry: {
            id: "chivalry",
            label: "Chivalry",
            description:
              'Unlock <span class="text-troop">Knight</span><br/>Unlock <span class="text-prod">Military Academy</span><br/>Unlock <span class="text-culture">Holy Wars</span><br/>Unlock <span class="text-culture">Professional Army</span>',
            require: ["feudalism", "civil_service"],
            rank: 11,
          },
          anatomy: {
            id: "anatomy",
            label: "Anatomy",
            description: 'Unlock <span class="text-prod">Hospital</span>',
            require: ["currency", "theology"],
            rank: 11,
          },
          advanced_fortification: {
            id: "advanced_fortification",
            label: "Adv. Fortification",
            description:
              'Unlock <span class="text-prod">Castle</span><br/>Unlock <span class="text-culture">Square of Miracles</span>',
            require: ["engineering"],
            rank: 12,
          },
          physics: {
            id: "physics",
            label: "Physics",
            description:
              'Unlock <span class="text-troop">Trebuchet</span><br/>Increase <span class="text-trade"><i class="' +
              ug.trade +
              '"></i> trade routes</span> max dist.',
            require: ["engineering"],
            rank: 12,
          },
          steel: {
            id: "steel",
            label: "Steel",
            description:
              'Unlock <span class="text-prod">Armory</span><br/>Unlock <span class="text-troop">Longswordsman</span>',
            require: ["chivalry"],
            rank: 12,
          },
          education: {
            id: "education",
            label: "Education",
            description:
              'Unlock <span class="text-prod">University</span><br/>Unlock <span class="text-troop">Explorer</span><br/>Unlock <span class="text-culture">Reformation</span><br/>Unlock <span class="text-culture">Scientific State</span><br/>Unlock <span class="text-culture">Scholasticism</span>',
            require: ["music_theory", "anatomy"],
            rank: 12,
          },
          gunpowder: {
            id: "gunpowder",
            label: "Gunpowder",
            description:
              'Unlock <span class="text-prod">Police Station</span><br/>Unlock <span class="text-troop">Musketman</span><br/>Unlock <span class="text-culture">Police State</span>',
            require: ["advanced_fortification", "education", "steel"],
            rank: 13,
          },
          astronomy: {
            id: "astronomy",
            label: "Astronomy",
            description:
              'Unlock <span class="text-special">Colonization</span><br/>Unlock <span class="text-special">Casa da India</span><br/>Unlock <span class="text-prod">Seaport</span><br/>Unlock <span class="text-troop">Caravel</span><br/>Unlock <span class="text-culture">Colonialism</span><br/>Unlock <span class="text-culture">Colonial Conquest</span>',
            require: ["education", "physics"],
            rank: 13,
          },
          printing: {
            id: "printing",
            label: "Printing Press",
            description:
              'Unlock <span class="text-special">Cultural promotion</span><br/>Unlock <span class="text-special">Forbidden City</span><br/>Unlock <span class="text-culture">Holy Place</span><br/>Unlock <span class="text-culture">Cultural Promotion</span>',
            require: ["education", "steel"],
            rank: 13,
          },
          acoustics: {
            id: "acoustics",
            label: "Acoustics",
            description:
              'Unlock <span class="text-prod">Opera</span><br/>Unlock <span class="text-special">Sistine Chapel</span><br/>Unlock <span class="text-special">Palace of Versailles</span>',
            require: ["education", "physics"],
            rank: 13,
          },
          chemistry: {
            id: "chemistry",
            label: "Chemistry",
            description:
              'Unlock <span class="text-troop">Cannon</span><br/>Unlock <span class="text-culture">Red Cross</span>',
            require: ["astronomy", "gunpowder"],
            rank: 14,
          },
          metallurgy: {
            id: "metallurgy",
            label: "Metallurgy",
            description: 'Unlock <span class="text-prod">Ironworks</span>',
            require: ["printing", "gunpowder"],
            rank: 14,
          },
          architecture: {
            id: "architecture",
            label: "Architecture",
            description:
              'Unlock <span class="text-prod">Courthouse</span><br/>Unlock <span class="text-special">Taj Mahal</span><br/>Unlock <span class="text-special">Tower of Pisa</span>',
            require: ["printing", "acoustics"],
            rank: 14,
          },
          economics: {
            id: "economics",
            label: "Economics",
            description:
              'Unlock <span class="text-prod">Stock Exchange</span><br/>Unlock <span class="text-special">Big Ben</span><br/>Unlock <span class="text-culture">Collaboration</span><br/>Unlock <span class="text-culture">Geographical Society</span>',
            require: ["printing"],
            rank: 14,
          },
          fertilizer: {
            id: "fertilizer",
            label: "Fertilizer",
            description:
              '<span class="text-food">+2 <i class="' +
              ug.food +
              '"></i> / farmer</span><br/>Unlock <span class="text-culture">Medical Procedures</span>',
            require: ["economics", "chemistry"],
            rank: 15,
          },
          rigging: {
            id: "rigging",
            label: "Square Rigging",
            description:
              '<span class="text-gold">+3% <i class="' +
              ug.gold +
              '"></i> / colony</span><br/>Unlock <span class="text-prod">Zoo</span><br/>Increase <span class="text-trade"><i class="' +
              ug.trade +
              '"></i> trade routes</span> max dist.<br/>Unlock <span class="text-culture">Conscription</span>',
            require: ["architecture", "metallurgy"],
            rank: 15,
          },
          siege: {
            id: "siege",
            label: "Siege Tactics",
            description: 'Unlock <span class="text-prod">Fortress</span>',
            require: ["architecture", "metallurgy"],
            rank: 15,
          },
          production: {
            id: "production",
            label: "Mass Production",
            description:
              'Unlock <span class="text-prod">Arsenal</span><br/>Unlock <span class="text-culture">Monopoly</span>',
            require: ["economics", "metallurgy"],
            rank: 15,
          },
          scientific: {
            id: "scientific",
            label: "Scientific Theory",
            description:
              'Unlock <span class="text-prod">Public School</span><br/>Unlock <span class="text-special">Oxford University</span><br/>Unlock <span class="text-culture">World Congress</span>',
            require: ["rigging", "fertilizer"],
            rank: 16,
          },
          industrialization: {
            id: "industrialization",
            label: "Industrialization",
            description:
              'Unlock <span class="text-prod">Factory</span><br/>Unlock <span class="text-prod">Progress</span><br/>Unlock <span class="text-special">Ruhr Valley</span><br/>Unlock <span class="text-troop">Engineer</span>',
            require: ["rigging", "production"],
            rank: 16,
          },
          military: {
            id: "military",
            label: "Military Science",
            description:
              'Unlock <span class="text-troop">Cavalry</span><br/>Unlock <span class="text-special">Brandenburg Gate</span>',
            require: ["siege", "production"],
            rank: 16,
          },
          archeology: {
            id: "archeology",
            label: "Archeology",
            description:
              'Unlock <span class="text-special">Ruins</span> (Tech +100 req.)<br/>Unlock <span class="text-troop">Archeologist</span> (Tech +100 req.)<br/>Unlock <span class="text-prod">Museum</span><br/>Unlock <span class="text-special">Hermitage</span>',
            require: ["production"],
            rank: 16,
          },
          steam: {
            id: "steam",
            label: "Steam Power",
            description:
              'Unlock <span class="text-prod">Coal Mine</span><br/>Unlock <span class="text-special">Panama Canal</span>',
            require: ["industrialization", "scientific"],
            rank: 17,
          },
          corporation: {
            id: "corporation",
            label: "Corporation",
            description:
              'Unlock <span class="text-prod">Gold Reserve</span><br/><span class="text-trade">+1 <i class="' +
              ug.trade +
              '"></i> trade route</span><br/>Unlock <span class="text-culture">Liberalism</span><br/>Allow buying <span class="text-prod">Progress</span> with <i class="text-gold ' +
              ug.gold +
              '"></i>',
            require: ["scientific", "military"],
            rank: 17,
          },
          rifling: {
            id: "rifling",
            label: "Rifling",
            description: 'Unlock <span class="text-troop">Rifleman</span>',
            require: ["industrialization", "military"],
            rank: 17,
          },
          biology: {
            id: "biology",
            label: "Biology",
            description:
              'Unlock <span class="text-prod">Dispensary</span><br/>Unlock <span class="text-culture">National Institute of Health</span>',
            require: ["scientific", "archeology"],
            rank: 17,
          },
          electricity: {
            id: "electricity",
            label: "Electricity",
            description:
              'Unlock <span class="text-improvement">Industrial Park</span><br/>Unlock <span class="text-prod">Hydro Plant</span>',
            require: ["steam"],
            rank: 18,
          },
          railroad: {
            id: "railroad",
            label: "Railroad",
            description:
              'Unlock <span class="text-improvement">Railroad</span><br/>Unlock <span class="text-special">Eiffel Tower</span>',
            require: ["steam", "corporation"],
            rank: 18,
          },
          dynamite: {
            id: "dynamite",
            label: "Dynamite",
            description:
              'Unlock <span class="text-troop">Artillery</span><br/>Unlock <span class="text-culture">Civilizing Mission</span>',
            require: ["steam", "rifling"],
            rank: 18,
          },
          sanitation: {
            id: "sanitation",
            label: "Sanitation",
            description:
              'Unlock <span class="text-improvement">Mechanized Farm</span><br/>Unlock <span class="text-prod">Quarantine Station</span><br/>Unlock <span class="text-culture">World Health Organization</span>',
            require: ["biology"],
            rank: 18,
          },
          future: {
            id: "future",
            label: "Future Tech.",
            description:
              'Can be researched repeatedly.<br/>Produce <span class="text-progress"><i class="' +
              ug.progress +
              '"></i> +10</span>',
            require: ["electricity", "railroad", "dynamite", "sanitation"],
            rank: 19,
          },
        },
        hg = {
          groups: {
            traditionalism: {
              id: "traditionalism",
              name: "Traditionalism",
              description:
                '<span class="text-culture"><i class="' +
                ug.culture +
                '"></i> +15%</span> in the Capital<br/><i class="' +
                ug.forbidden +
                '"></i><b>Exclude <span class="text-culture">Imperialism</span><b>',
              require: "art",
              lockedBy: "imperialism",
            },
            imperialism: {
              id: "imperialism",
              name: "Imperialism",
              description:
                '<span class="text-culture"><i class="' +
                ug.culture +
                '"></i> +5% </span>/ city<br/><i class="' +
                ug.forbidden +
                '"></i><b>Exclude <span class="text-culture">Traditionalism</span><b>',
              require: "art",
              lockedBy: "traditionalism",
            },
            piety: {
              id: "piety",
              name: "Piety",
              description:
                '<span class="text-faith"><i class="' +
                ug.faith +
                '"></i> +2 </span>/ shrine<br/><i class="' +
                ug.forbidden +
                '"></i><b>Exclude <span class="text-culture">Rationalism</span><b>',
              require: "herding",
              lockedBy: "rationalism",
            },
            rationalism: {
              id: "rationalism",
              name: "Rationalism",
              description:
                '<span class="text-science"><i class="' +
                ug.science +
                '"></i> +1 </span>/ scientist<br/><i class="' +
                ug.forbidden +
                '"></i><b>Exclude <span class="text-culture">Piety</span><b>',
              require: "writing",
              lockedBy: "piety",
            },
            pacifism: {
              id: "pacifism",
              name: "Pacifism",
              description:
                '<span class="text-trade"><i class="' +
                ug.trade +
                '"></i> +2 </span> trade routes<br/><i class="' +
                ug.forbidden +
                '"></i><b>Exclude <span class="text-culture">Militarism</span><b>',
              require: "navigation",
              lockedBy: "militarism",
            },
            militarism: {
              id: "militarism",
              name: "Militarism",
              description:
                'Military buildings cost <span class="text-gold"><i class="' +
                ug.gold +
                '"></i> -25%</span> <span class="text-prod"><i class="' +
                ug.prod +
                '"></i> -25%</span><br/><i class="' +
                ug.forbidden +
                '"></i><b>Exclude <span class="text-culture">Pacifism</span><b>',
              require: "state",
              lockedBy: "pacifism",
            },
          },
          policies: {
            wisdom_ancients: {
              id: "wisdom_ancients",
              name: "Wisdom of the Ancients",
              description:
                '<span class="text-science"><i class="' +
                ug.science +
                '"></i> +25%</span> in the Capital',
              require: {
                science: "herding",
                policy: "",
              },
              groups: ["traditionalism"],
            },
            aristocracy: {
              id: "aristocracy",
              name: "Aristocracy",
              description:
                '<span class="text-gold"><i class="' +
                ug.gold +
                '"></i> +25%</span> in the Capital',
              require: {
                science: "armies",
                policy: "wisdom_ancients",
              },
              groups: ["traditionalism"],
            },
            city_state: {
              id: "city_state",
              name: "City-state",
              description:
                '<i class="' + ug.defense + '"></i> +20% in the Capital',
              require: {
                science: "calendar",
                policy: "aristocracy",
              },
              groups: ["traditionalism"],
            },
            oligarchy: {
              id: "oligarchy",
              name: "Oligarchy",
              description: "Reduce troop maintenance in the Capital by half",
              require: {
                science: "literature",
                policy: "city_state",
              },
              groups: ["traditionalism"],
            },
            landed_elite: {
              id: "landed_elite",
              name: "Landed Elite",
              description:
                '<span class="text-faith"><i class="' +
                ug.faith +
                '"></i> +50%</span> in the Capital',
              require: {
                science: "monarchy",
                policy: "oligarchy",
              },
              groups: ["traditionalism"],
            },
            conservatism: {
              id: "conservatism",
              name: "Conservatism",
              description:
                '<span class="text-influence"><i class="' +
                ug.influence +
                '"></i> -25%</span> form other civilizations',
              require: {
                science: "milling",
                policy: "landed_elite",
              },
              groups: ["traditionalism"],
            },
            isolationism: {
              id: "isolationism",
              name: "Isolationism",
              description:
                '<span class="text-health"><i class="' +
                ug.health +
                '"></i> +15%</span> in the Capital',
              require: {
                science: "civil_service",
                policy: "conservatism",
              },
              groups: ["traditionalism"],
            },
            collective_rules: {
              id: "collective_rules",
              name: "Collective Rules",
              description:
                'Governor cost <span class="text-gold"><i class="' +
                ug.gold +
                '"></i> -25%</span>',
              require: {
                science: "state",
                policy: "",
              },
              groups: ["imperialism"],
            },
            meritocracy: {
              id: "meritocracy",
              name: "Meritocracy",
              description:
                '<span class="text-gold"><i class="' +
                ug.gold +
                '"></i> +5%</span> in every city',
              require: {
                science: "armies",
                policy: "collective_rules",
              },
              groups: ["imperialism"],
            },
            administration: {
              id: "administration",
              name: "Administration",
              description:
                '<span class="text-prod"><i class="' +
                ug.prod +
                '"></i> +5%</span> in every city',
              require: {
                science: "code_of_laws",
                policy: "meritocracy",
              },
              groups: ["imperialism"],
            },
            patriotism: {
              id: "patriotism",
              name: "Patriotism",
              description:
                '<span class="text-happiness"><i class="' +
                ug.happiness +
                '"></i> +5%</span> in every city',
              require: {
                science: "diplomacy",
                policy: "administration",
              },
              groups: ["imperialism"],
            },
            colonialism: {
              id: "colonialism",
              name: "State Religion",
              description:
                '<span class="text-faith"><i class="' +
                ug.faith +
                '"></i> +15%</span> in every city',
              require: {
                science: "republic",
                policy: "patriotism",
              },
              groups: ["imperialism"],
            },
            colonialism1: {
              id: "colonialism1",
              name: "Colonialism",
              description: "Caravel cost -50% & recruit time -50%",
              require: {
                science: "astronomy",
                policy: "colonialism",
              },
              groups: ["imperialism"],
            },
            geographical: {
              id: "geographical",
              name: "Geographical Society",
              description:
                '+ 2% <i class="text-science ' +
                ug.science +
                '"></i> / <span class="text-colony"><i class="' +
                ug.colony +
                '"></i> Colony</span>',
              require: {
                science: "economics",
                policy: "colonialism1",
              },
              groups: ["imperialism"],
            },
            religious_laws: {
              id: "religious_laws",
              name: "Religious Laws",
              description:
                '<span class="text-faith"><i class="' +
                ug.faith +
                '"></i> +2</span> / trade route',
              require: {
                science: "code_of_laws",
                policy: "",
              },
              groups: ["piety"],
            },
            organized_religion: {
              id: "organized_religion",
              name: "Organized Religion",
              description:
                '<span class="text-health"><i class="' +
                ug.health +
                '"></i> +5%</span> / Temple',
              require: {
                science: "religion",
                policy: "religious_laws",
              },
              groups: ["piety"],
            },
            theocracy: {
              id: "theocracy",
              name: "Theocracy",
              description:
                '<span class="text-happiness"><i class="' +
                ug.happiness +
                '"></i> +5%</span> / Monastery',
              require: {
                science: "theology",
                policy: "organized_religion",
              },
              groups: ["piety"],
            },
            holy_wars: {
              id: "holy_wars",
              name: "Holy Wars",
              description:
                'Knights cost <span class="text-gold"><i class="' +
                ug.gold +
                '"></i> -25%</span>',
              require: {
                science: "chivalry",
                policy: "theocracy",
              },
              groups: ["piety"],
            },
            reformation: {
              id: "reformation",
              name: "Reformation",
              description:
                '<span class="text-science"><i class="' +
                ug.science +
                '"></i> +10%</span> <span class="text-faith"><i class="' +
                ug.faith +
                '"></i> +10%</span> / Monastery',
              require: {
                science: "education",
                policy: "holy_wars",
              },
              groups: ["piety"],
            },
            holy_place: {
              id: "holy_place",
              name: "Holy Place",
              description:
                '<span class="text-influence"><i class="' +
                ug.influence +
                '"></i> +25%</span> towards civilization with same religion',
              require: {
                science: "printing",
                policy: "reformation",
              },
              groups: ["piety"],
            },
            red_cross: {
              id: "red_cross",
              name: "Red Cross",
              description:
                "Reduce risks of loosing citizens, troops and trade routes from disease & plague by 50%",
              require: {
                science: "chemistry",
                policy: "holy_place",
              },
              groups: ["piety"],
            },
            code_of_laws: {
              id: "code_of_laws",
              name: "Code of Laws",
              description:
                '<span class="text-science"><i class="' +
                ug.science +
                '"></i> +0.1</span> / citizen',
              require: {
                science: "code_of_laws",
                policy: "",
              },
              groups: ["rationalism"],
            },
            philosophy: {
              id: "philosophy",
              name: "Philosophy",
              description:
                '<span class="text-culture"><i class="' +
                ug.culture +
                '"></i> +5%</span> / library',
              require: {
                science: "literature",
                policy: "code_of_laws",
              },
              groups: ["rationalism"],
            },
            secularism: {
              id: "secularism",
              name: "Secularism",
              description:
                '<span class="text-happiness"><i class="' +
                ug.happiness +
                '"></i> +5%</span> / shrine',
              require: {
                science: "theology",
                policy: "philosophy",
              },
              groups: ["rationalism"],
            },
            sovereignty: {
              id: "sovereignty",
              name: "Sovereignty",
              description:
                '<span class="text-science"><i class="' +
                ug.science +
                '"></i> +2</span> / trade route',
              require: {
                science: "feudalism",
                policy: "secularism",
              },
              groups: ["rationalism"],
            },
            scientific_state: {
              id: "scientific_state",
              name: "Scientific State",
              description:
                '<span class="text-science"><i class="' +
                ug.science +
                '"></i> +10%</span> <span class="text-faith"><i class="' +
                ug.faith +
                '"></i> +10%</span> / University',
              require: {
                science: "education",
                policy: "sovereignty",
              },
              groups: ["rationalism"],
            },
            cultural_promotion: {
              id: "cultural_promotion",
              name: "Cultural Promotion",
              description:
                '<span class="text-influence"><i class="' +
                ug.influence +
                '"></i> +10%</span> / trade route',
              require: {
                science: "printing",
                policy: "scientific_state",
              },
              groups: ["rationalism"],
            },
            procedures: {
              id: "procedures",
              name: "Medical Procedures",
              description:
                '<span class="text-health"><i class="' +
                ug.health +
                '"></i> +5%</span> / hospital',
              require: {
                science: "fertilizer",
                policy: "cultural_promotion",
              },
              groups: ["rationalism"],
            },
            patronage: {
              id: "patronage",
              name: "Patronage",
              description:
                'Starting relation <span class="text-diplomacy"><i class="' +
                ug.diplomacy +
                '"></i> +10</span>',
              require: {
                science: "diplomacy",
                policy: "",
              },
              groups: ["pacifism"],
            },
            philantropy: {
              id: "philantropy",
              name: "Philantropy",
              description:
                '<span class="text-diplomacy"><i class="' +
                ug.diplomacy +
                '"></i> +1</span> / trade route<br/>Caravans & Caravels cost <span class="text-gold"><i class="' +
                ug.gold +
                '"></i> -25%</span>',
              require: {
                science: "drama",
                policy: "patronage",
              },
              groups: ["pacifism"],
            },
            cultural_diplomacy: {
              id: "cultural_diplomacy",
              name: "Cultural Diplomacy",
              description:
                '<span class="text-culture"><i class="' +
                ug.culture +
                '"></i> +15%</span> / trade route',
              require: {
                science: "republic",
                policy: "philantropy",
              },
              groups: ["pacifism"],
            },
            merchant_confederacy: {
              id: "merchant_confederacy",
              name: "Merchant Confederacy",
              description:
                '<span class="text-gold"><i class="' +
                ug.gold +
                '"></i> +15%</span> / trade route',
              require: {
                science: "currency",
                policy: "cultural_diplomacy",
              },
              groups: ["pacifism"],
            },
            scholasticism: {
              id: "scholasticism",
              name: "Scholasticism",
              description:
                '<span class="text-faith"><i class="' +
                ug.faith +
                '"></i> +5</span> / trade route<br/><span class="text-trade"><i class="' +
                ug.trade +
                '"></i> +2 </span> trade routes',
              require: {
                science: "education",
                policy: "merchant_confederacy",
              },
              groups: ["pacifism"],
            },
            collaboration: {
              id: "collaboration",
              name: "Collaboration",
              description:
                '<span class="text-influence"><i class="' +
                ug.influence +
                '"></i> +5%</span> towards civilization at peace<br/><span class="text-influence"><i class="' +
                ug.influence +
                '"></i> +10%</span> towards allied civilization<br/>',
              require: {
                science: "economics",
                policy: "scholasticism",
              },
              groups: ["pacifism"],
            },
            monopoly: {
              id: "monopoly",
              name: "Monopoly",
              description:
                '<span class="text-food"><i class="' +
                ug.food +
                '"></i> +10%</span> and <span class="text-happiness"><i class="' +
                ug.happiness +
                '"></i> +5%</span> in cities with trade routes.',
              require: {
                science: "production",
                policy: "collaboration",
              },
              groups: ["pacifism"],
            },
            code_of_honor: {
              id: "code_of_honor",
              name: "Code of Honor",
              description:
                '<i class="' +
                ug.attack +
                '"></i> +15% attack & defense against barbarians',
              require: {
                science: "armies",
                policy: "",
              },
              groups: ["militarism"],
            },
            despotism: {
              id: "despotism",
              name: "Despotism",
              description:
                '<span class="text-happiness"><i class="' +
                ug.happiness +
                '"></i> +5%</span> / barracks',
              require: {
                science: "code_of_laws",
                policy: "code_of_honor",
              },
              groups: ["militarism"],
            },
            discipline: {
              id: "discipline",
              name: "Discipline",
              description:
                '<i class="' +
                ug.siege +
                '"></i> +25% chance to break walls & castle with siege units',
              require: {
                science: "tactics",
                policy: "despotism",
              },
              groups: ["militarism"],
            },
            military_tradition: {
              id: "military_tradition",
              name: "Military Tradition",
              description:
                'Military units cost <span class="text-gold"><i class="' +
                ug.gold +
                '"></i> -25%</span>',
              require: {
                science: "feudalism",
                policy: "discipline",
              },
              groups: ["militarism"],
            },
            professional_army: {
              id: "professional_army",
              name: "Professional Army",
              description: "Reduce troop maintenance by half",
              require: {
                science: "chivalry",
                policy: "military_tradition",
              },
              groups: ["militarism"],
            },
            colonial_conquest: {
              id: "colonial_conquest",
              name: "Colonial Conquest",
              description:
                '<span class="text-gold"><i class="' +
                ug.gold +
                '"></i> +5% / colony</span> ',
              require: {
                science: "astronomy",
                policy: "professional_army",
              },
              groups: ["militarism"],
            },
            conscription: {
              id: "conscription",
              name: "Conscription",
              description: "Chances to receive troops from your colonies",
              require: {
                science: "rigging",
                policy: "colonial_conquest",
              },
              groups: ["militarism"],
            },
            wonder_builder: {
              id: "wonder_builder",
              name: "Wonder builder",
              description:
                'Worker can be converted into <span class="text-prod"><i class="' +
                ug.prod +
                '"></i> 600 (increase with scientific adv.)</span>',
              require: {
                science: "horseriding",
                policy: "",
              },
              groups: ["traditionalism", "piety"],
            },
            who: {
              id: "who",
              name: "World Health Organization",
              description:
                '<span class="text-health"><i class="' +
                ug.health +
                '"></i> +8%</span> / <span class="text-pop">Scientist</span>',
              require: {
                science: "sanitation",
                policy: "",
              },
              groups: ["traditionalism", "rationalism"],
            },
            academy: {
              id: "academy",
              name: "Platonic Academy",
              description:
                '+1 <span class="text-trade"><i class="' +
                ug.trade +
                '"></i></span><br/><span class="text-science"><i class="' +
                ug.science +
                '"></i> +5</span> / <span class="text-trade"><i class="' +
                ug.trade +
                '"></i></span>',
              require: {
                science: "writing",
                policy: "",
              },
              groups: ["traditionalism", "pacifism"],
            },
            slavery: {
              id: "slavery",
              name: "Organized Slavery",
              description:
                "50% chances to get a 2nd worker when slaver attack is succesful (only if enemy city has enough population)",
              require: {
                science: "code_of_laws",
                policy: "",
              },
              groups: ["traditionalism", "militarism"],
            },
            proselytism: {
              id: "proselytism",
              name: "Proselytism",
              description:
                '<span class="text-faith"><i class="' +
                ug.faith +
                '"></i> +1%</span> / nb of cities',
              require: {
                science: "music_theory",
                policy: "",
              },
              groups: ["imperialism", "piety"],
            },
            nih: {
              id: "nih",
              name: "National Institute of Health",
              description:
                '<span class="text-health"><i class="' +
                ug.health +
                '"></i> +5%</span> (globally)',
              require: {
                science: "biology",
                policy: "",
              },
              groups: ["imperialism", "rationalism"],
            },
            congress: {
              id: "congress",
              name: "World Congress",
              description:
                '<span class="text-influence"><i class="' +
                ug.influence +
                '"></i> +25%</span>',
              require: {
                science: "scientific",
                policy: "",
              },
              groups: ["imperialism", "pacifism"],
            },
            police_state: {
              id: "police_state",
              name: "Police State",
              description:
                '<span class="text-happiness"><i class="' +
                ug.happiness +
                '"></i> +10%</span> / Courthouse',
              require: {
                science: "gunpowder",
                policy: "",
              },
              groups: ["imperialism", "militarism"],
            },
            miracles: {
              id: "miracles",
              name: "Square of Miracles",
              description:
                '<span class="text-magic"><i class="' +
                ug.spells +
                '"></i>Spells</span> cooldown reduced by 20%',
              require: {
                science: "advanced_fortification",
                policy: "",
              },
              groups: ["piety", "pacifism"],
            },
            crusades: {
              id: "crusades",
              name: "Crusades",
              description:
                '<span class="text-faith"><i class="' +
                ug.faith +
                '"></i></span> +10 / enemy killed (attacking only)',
              require: {
                science: "theology",
                policy: "",
              },
              groups: ["piety", "militarism"],
            },
            liberalism: {
              id: "liberalism",
              name: "Liberalism",
              description:
                '<span class="text-prod"><i class="' +
                ug.prod +
                '"></i> +25%</span> when building <span class="text-prod">Progress</span>',
              require: {
                science: "corporation",
                policy: "",
              },
              groups: ["rationalism", "pacifism"],
            },
            civilizing: {
              id: "civilizing",
              name: "Civilizing Mission",
              description:
                '<span class="text-progress"><i class="' +
                ug.progress +
                '"></i> +50</span> on city conquest',
              require: {
                science: "dynamite",
                policy: "",
              },
              groups: ["rationalism", "militarism"],
            },
          },
        },
        pg = {
          warrior: {
            id: "warrior",
            name: (l) => ("aztecs" == l.civ_id ? "Eagle Warrior" : "Warrior"),
            description: "",
            gold: (l, n) =>
              20 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
            time: () => 20,
            attack: (l) => ("aztecs" == l.civ_id ? 6 : 2),
            ranged: () => !1,
            siege: !1,
            defense: () => 1,
            speed: () => 1,
            capacity: 20,
            require: {
              science: "tools",
              building: "barracks",
            },
            obsolete: "iron_working",
            upgradable: "swordsman",
            special: !1,
            conscript: !0,
          },
          swordsman: {
            id: "swordsman",
            name: (l) => ("romans" == l.civ_id ? "Legion" : "Swordsman"),
            description: "",
            gold: (l, n) =>
              200 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
            time: () => 100,
            attack: (l) => ("romans" == l.civ_id ? 25 : 15),
            ranged: () => !1,
            siege: !1,
            defense: (l) => ("romans" == l.civ_id ? 20 : 10),
            speed: () => 1,
            capacity: 40,
            require: {
              science: "iron_working",
              building: "barracks",
            },
            obsolete: "steel",
            upgradable: "longswordsman",
            special: !1,
            conscript: !0,
          },
          longswordsman: {
            id: "longswordsman",
            name: (l) =>
              "japanese" == l.civ_id
                ? "Samurai"
                : "vikings" == l.civ_id
                  ? "Berserker"
                  : "Longswordsman",
            description: "",
            gold: (l, n) =>
              2e3 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
            time: () => 500,
            attack: (l) =>
              "japanese" == l.civ_id ? 45 : "vikings" == l.civ_id ? 50 : 35,
            ranged: () => !1,
            siege: !1,
            defense: (l) => ("japanese" == l.civ_id ? 40 : 30),
            speed: (l) => ("vikings" == l.civ_id ? 2 : 1),
            capacity: 50,
            require: {
              science: "steel",
              building: "barracks",
            },
            obsolete: "rifling",
            special: !1,
            conscript: !0,
          },
          horseman: {
            id: "horseman",
            name: (l) => ("indians" == l.civ_id ? "War elephant" : "Horseman"),
            description: "",
            gold: (l, n) =>
              30 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
            time: () => 40,
            attack: () => 3,
            ranged: (l) => "indians" == l.civ_id,
            siege: !1,
            defense: () => 1,
            speed: () => 3,
            capacity: 80,
            require: {
              science: "horseriding",
              building: "stables",
            },
            obsolete: "chivalry",
            upgradable: "knight",
            special: !1,
            conscript: !0,
          },
          knight: {
            id: "knight",
            name: (l) => ("mongols" == l.civ_id ? "Keshik" : "Knight"),
            description: "",
            gold: (l, n) =>
              300 *
              (l && l.hasPolicy("holy_wars", n) ? 0.75 : 1) *
              (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
            time: () => 200,
            attack: () => 30,
            ranged: (l) => "mongols" == l.civ_id,
            siege: !1,
            defense: () => 10,
            speed: () => 2,
            capacity: 200,
            require: {
              science: "chivalry",
              building: "stables",
            },
            obsolete: "production",
            upgradable: "cavalry",
            special: !1,
            conscript: !0,
          },
          cavalry: {
            id: "cavalry",
            name: (l) =>
              "russians" == l.civ_id
                ? "Cossack"
                : "spanish" == l.civ_id
                  ? "Conquistador"
                  : "Cavalry",
            description: "",
            gold: (l, n) =>
              ("russians" == l.player(n).civ_id ? 2e3 : 3e3) *
              (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
            time: () => 600,
            attack: (l) => ("russians" == l.civ_id ? 80 : 60),
            ranged: (l) => "spanish" == l.civ_id,
            siege: !1,
            defense: () => 20,
            speed: () => 3,
            capacity: 400,
            require: {
              science: "military",
              building: "stables",
            },
            special: !1,
            conscript: !0,
          },
          archer: {
            id: "archer",
            name: () => "Archer",
            description: "Ranged units attack before all other troops",
            gold: (l, n) =>
              30 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
            time: () => 40,
            attack: () => 2,
            ranged: () => !0,
            siege: !1,
            defense: () => 2,
            speed: () => 1,
            capacity: 10,
            require: {
              science: "archery",
              building: "barracks",
            },
            obsolete: "optics",
            upgradable: "longbowman",
            special: !1,
            conscript: !0,
          },
          longbowman: {
            id: "longbowman",
            name: () => "Longbowman",
            description: "Ranged units attack before all other troops",
            gold: (l, n) =>
              300 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
            time: () => 200,
            attack: () => 10,
            ranged: () => !0,
            siege: !1,
            defense: () => 8,
            speed: () => 1,
            capacity: 20,
            require: {
              science: "optics",
              building: "barracks",
            },
            obsolete: "gunpowder",
            upgradable: "musketman",
            special: !1,
            conscript: !0,
          },
          musketman: {
            id: "musketman",
            name: (l) => ("americans" == l.civ_id ? "Minuteman" : "Musketman"),
            description: "",
            gold: (l, n) =>
              ("americans" == l.player(n).civ_id ? 2e3 : 3e3) *
              (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
            time: () => 600,
            attack: (l) => ("americans" == l.civ_id ? 40 : 30),
            ranged: () => !0,
            siege: !1,
            defense: () => 30,
            speed: () => 1,
            capacity: 30,
            require: {
              science: "gunpowder",
              building: "barracks",
            },
            special: !1,
            conscript: !0,
          },
          rifleman: {
            id: "rifleman",
            name: (l) => ("english" == l.civ_id ? "Red Coat" : "Rifleman"),
            description: "",
            gold: (l, n) =>
              2e4 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
            time: () => 1e3,
            attack: (l) => ("english" == l.civ_id ? 80 : 60),
            ranged: () => !0,
            siege: !1,
            defense: () => 50,
            speed: () => 1,
            capacity: 50,
            require: {
              science: "rifling",
              building: "barracks",
            },
            special: !1,
            conscript: !0,
          },
          lancier: {
            id: "lancier",
            name: (l) =>
              "greeks" == l.civ_id
                ? "Hoplite"
                : "persians" == l.civ_id
                  ? "Immortal"
                  : "Lancier",
            description: "Melee unit specialized in defense",
            gold: (l, n) =>
              ("persians" == l.player(n).civ_id ? 20 : 30) *
              (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
            time: () => 40,
            attack: (l) =>
              "greeks" == l.civ_id ? 7 : "persians" == l.civ_id ? 5 : 1,
            ranged: () => !1,
            siege: !1,
            defense: () => 4,
            speed: () => 1,
            capacity: 10,
            require: {
              science: "bronze_working",
              building: "barracks",
            },
            obsolete: "civil_service",
            upgradable: "pikeman",
            special: !1,
            conscript: !0,
          },
          pikeman: {
            id: "pikeman",
            name: (l) => ("zulus" == l.civ_id ? "Impi" : "Pikeman"),
            description: "",
            gold: (l, n) =>
              300 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
            time: () => 200,
            attack: (l) => ("zulus" == l.civ_id ? 21 : 1),
            ranged: () => !1,
            siege: !1,
            defense: () => 30,
            speed: () => 1,
            capacity: 20,
            require: {
              science: "civil_service",
              building: "barracks",
            },
            special: !1,
            conscript: !0,
          },
          catapult: {
            id: "catapult",
            name: (l) => ("assyrians" == l.civ_id ? "Siege Tower" : "Catapult"),
            description: "",
            gold: (l, n) =>
              60 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
            time: () => 80,
            attack: (l) => ("assyrians" == l.civ_id ? 8 : 4),
            ranged: () => !1,
            siege: !0,
            defense: () => 0,
            speed: () => 0.5,
            capacity: 0,
            require: {
              science: "mathematics",
              building: "sif",
            },
            obsolete: "physics",
            upgradable: "trebuchet",
            special: !1,
          },
          trebuchet: {
            id: "trebuchet",
            name: () => "Trebuchet",
            description: "",
            gold: (l, n) =>
              600 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
            time: () => 400,
            attack: () => 40,
            ranged: () => !1,
            siege: !0,
            defense: () => 0,
            speed: () => 0.5,
            capacity: 0,
            require: {
              science: "physics",
              building: "sif",
            },
            obsolete: "chemistry",
            upgradable: "cannon",
            special: !1,
          },
          cannon: {
            id: "cannon",
            name: () => "Cannon",
            description: "",
            gold: (l, n) =>
              6e3 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
            time: () => 800,
            attack: () => 60,
            ranged: () => !1,
            siege: !0,
            defense: () => 0,
            speed: () => 0.5,
            capacity: 0,
            require: {
              science: "chemistry",
              building: "sif",
            },
            special: !1,
          },
          artillery: {
            id: "artillery",
            name: () => "Artillery",
            description: "",
            gold: (l, n) =>
              15e3 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
            time: () => 1200,
            attack: () => 90,
            ranged: () => !1,
            siege: !0,
            defense: () => 0,
            speed: () => 1,
            capacity: 0,
            require: {
              science: "dynamite",
              building: "sif",
            },
            special: !1,
          },
          governor: {
            id: "governor",
            name: () => "Governor",
            description: "Governors are used to capture enemy cities",
            gold: (l, n = 0) => (l ? l.govCost(n) : 0),
            time: () => 1e3,
            attack: () => 0,
            ranged: () => !1,
            siege: !1,
            defense: () => 0,
            speed: () => 1,
            capacity: 0,
            require: {
              science: "state",
              building: "town_hall",
            },
            special: !1,
            noautorecruit: !0,
          },
          scout: {
            id: "scout",
            name: () => "Scout",
            description: "Scouts are used to explore the world",
            gold: () => 40,
            time: () => 40,
            attack: () => 0,
            ranged: () => !1,
            siege: !1,
            defense: () => 0,
            speed: () => 1,
            capacity: 0,
            require: {
              science: "exploration",
              building: "lo",
            },
            obsolete: "education",
            upgradable: "explorer",
            special: !0,
          },
          explorer: {
            id: "explorer",
            name: () => "Explorer",
            description:
              "Explorer are like scouts, but faster and more resistant",
            gold: () => 1e3,
            time: () => 100,
            attack: () => 0,
            ranged: () => !1,
            siege: !1,
            defense: () => 0,
            speed: () => 2,
            capacity: 0,
            require: {
              science: "education",
              building: "town_hall",
            },
            special: !0,
          },
          worker: {
            id: "worker",
            name: () => "Worker",
            description:
              'Workers can build improvements. Each worker can build a limited amount of improvements. Cost <span class="text-pop"><i class="' +
              ug.pop +
              '"></i>1</span>',
            gold: () => 100,
            time: () => 50,
            citizen: 1,
            attack: () => 0,
            ranged: () => !1,
            siege: !1,
            defense: () => 0,
            speed: () => 1,
            capacity: 0,
            require: {
              science: "bronze_working",
              building: "lo",
            },
            special: !0,
            obsolete: "industrialization",
            upgradable: "engineer",
          },
          engineer: {
            id: "engineer",
            name: () => "Engineer",
            description:
              'Engineers can build advanced improvements. Cost <span class="text-pop"><i class="' +
              ug.pop +
              '"></i>1</span>',
            gold: () => 5e3,
            time: () => 600,
            citizen: 1,
            attack: () => 0,
            ranged: () => !1,
            siege: !1,
            defense: () => 0,
            speed: () => 2,
            capacity: 0,
            require: {
              science: "industrialization",
              building: "town_hall",
            },
            special: !0,
          },
          slaver: {
            id: "slaver",
            name: () => "Slaver",
            description:
              "Slaver can capture slave workers when they are part of a succesful attack.",
            gold: () => 500,
            time: () => 100,
            attack: () => 0,
            ranged: () => !1,
            siege: !1,
            defense: () => 0,
            speed: () => 1,
            capacity: 0,
            require: {
              science: "bronze_working",
              building: "lo",
            },
            special: !1,
          },
          archeologist: {
            id: "archeologist",
            name: () => "Archeologist",
            description:
              'Archeologists can retrieve <i class="' +
              ug.relics +
              ' text-relics"></i> relics from ruins',
            gold: () => 1e4,
            time: () => 900,
            attack: () => 0,
            ranged: () => !1,
            siege: !1,
            defense: () => 0,
            speed: () => 1,
            capacity: 0,
            require: {
              science: "archeology",
              building: "town_hall",
              tech: 100,
            },
            special: !0,
          },
          spy: {
            id: "spy",
            name: () => "Spy",
            description:
              "Spies are used to see the details of a city. They can also steal science. Use more spies for better chances of success",
            gold: () => 600,
            time: () => 100,
            attack: () => 0,
            ranged: () => !1,
            siege: !1,
            defense: () => 0,
            speed: () => 1,
            capacity: 0,
            require: {
              science: "monarchy",
              building: "town_hall",
            },
            special: !0,
          },
          caravan: {
            id: "caravan",
            name: () => "Caravan",
            description: "Caravans are used to create trade routes",
            gold: (l, n) =>
              400 * (l && l.hasPolicy("philantropy", n) ? 0.75 : 1),
            time: () => 300,
            attack: () => 0,
            ranged: () => !1,
            siege: !1,
            defense: () => 0,
            speed: () => 1,
            capacity: 0,
            require: {
              science: "navigation",
              building: "lo",
            },
            special: !0,
            noautorecruit: !0,
          },
          caravel: {
            id: "caravel",
            name: (l) => ("portuguese" == l.civ_id ? "Nau" : "Caravel"),
            description: "Caravels are used to create colonies",
            gold: (l, n) =>
              (0 == n ? 3e6 : 15e5) *
              ("portuguese" == l.player(n).civ_id ? 0.75 : 1) *
              (l && l.hasPolicy("philantropy", n) ? 0.75 : 1) *
              (l && l.hasPolicy("colonialism1", n) ? 0.5 : 1) *
              (l && l.hasWonder(n, "casa") ? 0.5 : 1),
            time: (l, n) =>
              1500 *
              (l && l.hasPolicy("colonialism1", n) ? 0.5 : 1) *
              (l && l.hasWonder(n, "casa") ? 0.5 : 1),
            attack: () => 0,
            ranged: () => !1,
            siege: !1,
            defense: () => 0,
            speed: () => 1,
            capacity: 0,
            require: {
              science: "astronomy",
              building: "seaport",
            },
            special: !0,
            noautorecruit: !0,
          },
          plague_doctor: {
            id: "plague_doctor",
            name: () => "Plague Doctor",
            description:
              "Plague Doctors are used to cure the plague and clear the city faster",
            gold: () => 500,
            time: () => 100,
            attack: () => 0,
            ranged: () => !1,
            siege: !1,
            defense: () => 0,
            speed: () => 1,
            capacity: 0,
            require: {
              science: "calendar",
              building: "lo",
            },
            special: !0,
            noautorecruit: !1,
          },
        },
        fg = {
          deity_selection: {
            name: "Deity",
            link: "/game/deity",
            check: (l) => l.hasScience("religion"),
            persistent: !1,
          },
          spells: {
            name: "Spells",
            link: "/game/help#spells",
            check: (l, n) =>
              l.hasScience("religion") && "" != n.players[0].deity,
            persistent: !1,
          },
          daily_bonus: {
            name: "Daily Bonus",
            link: "/game/daily",
            check: (l) => l.hasScience("spirituality"),
            persistent: !0,
          },
          reincarnation: {
            name: "Reincarnation",
            link: "/game/help#reincarnation",
            check: (l, n) =>
              l.hasScience("theology") && "" != n.players[0].deity,
            persistent: !1,
          },
          trade: {
            name: "Trade",
            link: "/game/help#trade",
            check: (l) => l.hasScience("navigation"),
            persistent: !1,
          },
          colonization: {
            name: "Colonization",
            link: "/game/help#colonization",
            check: (l) => l.hasScience("astronomy"),
            persistent: !1,
          },
          promotion: {
            name: "Cultural promotion",
            link: "/game/help#influence",
            check: (l) => l.hasScience("printing"),
            persistent: !1,
          },
          alliance: {
            name: "Alliance",
            link: "/game/help#diplomacy",
            check: (l) => l.hasScience("diplomacy"),
            persistent: !1,
          },
          diplo_global: {
            name: "Global diplomacy",
            link: "/game/diplomacy#tab_global",
            check: (l) => l.hasScience("diplomacy"),
            persistent: !1,
          },
          spy: {
            name: "Spying",
            link: "/game/help#spy",
            check: (l) => l.hasScience("monarchy"),
            persistent: !1,
          },
          queue_science: {
            name: "Science queue",
            link: "/game/science",
            check: (l, n) => n.rebirths > 0,
            persistent: !0,
          },
          empire_orders: {
            name: "Empire Orders",
            link: "/game/empire#tab_orders",
            check: (l) => l.player().cities.length > 2,
            persistent: !1,
          },
          citizen_builders: {
            name: "Builder",
            link: "/game/help#citizens",
            check: (l) => l.hasScience("tanning"),
            persistent: !1,
          },
          citizen_merchants: {
            name: "Merchant",
            link: "/game/help#citizens",
            check: (l) => l.hasScience("trade"),
            persistent: !1,
          },
          citizen_scientists: {
            name: "Scientist",
            link: "/game/help#citizens",
            check: (l) => l.hasScience("writing"),
            persistent: !1,
          },
          citizen_artists: {
            name: "Artist",
            link: "/game/help#citizens",
            check: (l) => l.hasScience("art"),
            persistent: !1,
          },
          citizen_priests: {
            name: "Priest",
            link: "/game/help#citizens",
            check: (l) => l.hasScience("religion"),
            persistent: !1,
          },
          troops: {
            name: "Troops",
            link: "/game/help#war",
            check: (l) => l.hasScience("tools"),
            persistent: !1,
          },
          buildings: {
            name: "Buildings",
            link: "/game/help#buildings",
            check: (l) => l.hasScience("tanning"),
            persistent: !1,
          },
          queue_buildings: {
            name: "Building queues",
            link: "/game/help#buildings",
            check: (l) => l.player().cities.length > 1,
            persistent: !0,
          },
          auto_building: {
            name: "Automatic building",
            link: "/game/help#buildings",
            check: (l, n) => n.rebirths > 1,
            persistent: !0,
          },
          queue_troops: {
            name: "Troop queues",
            link: "/game/help#war",
            check: (l) => l.hasScience("archery"),
            persistent: !0,
          },
          recruit_x10: {
            name: "Recruitment x10 & Auto",
            link: "/game/help#war",
            check: (l) => l.player().cities.length > 1,
            persistent: !0,
          },
          recruit_x100: {
            name: "Recruitment x100",
            link: "/game/help#war",
            check: (l, n) => n.rebirths && n.rebirths > 0,
            persistent: !0,
          },
          prod_purchase: {
            name: "Building & troops purchase",
            link: "/game/city",
            check: (l) => l.hasScience("writing"),
            persistent: !1,
          },
          menu_empire: {
            name: "Empire panel",
            link: "/game/empire",
            check: (l) => l.hasScience("state"),
            persistent: !1,
          },
          menu_world: {
            name: "World panel",
            link: "/game/world",
            check: (l) => l.hasScience("exploration"),
            persistent: !1,
          },
          menu_policies: {
            name: "Social Policies",
            link: "/game/policies",
            check: (l) => l.hasScience("art"),
            persistent: !1,
          },
          menu_powers: {
            name: "Powers",
            link: "/game/powers",
            check: (l, n) => l.isUnlocked("reincarnation") || n.rebirths > 0,
            persistent: !0,
          },
          menu_diplomacy: {
            name: "Diplomacy",
            link: "/game/diplomacy",
            check: (l) => l.hasScience("navigation"),
            persistent: !1,
          },
          menu_simulator: {
            name: "Battle Simulator",
            link: "/game/simulator",
            check: (l) => l.hasScience("tactics"),
            persistent: !1,
          },
          orientation: {
            name: "Technology",
            link: "/game/empire#tab_orientation",
            check: (l) => l.hasScienceRank(16),
            persistent: !1,
          },
          era_ancient: {
            name: "Ancient Era",
            link: "/game/science",
            check: (l) => l.hasScienceRank(3),
            persistent: !0,
          },
          era_classical: {
            name: "Classical Era",
            link: "/game/science",
            check: (l) => l.hasScienceRank(6),
            persistent: !0,
          },
          era_medieval: {
            name: "Medieval Era",
            link: "/game/science",
            check: (l) => l.hasScienceRank(9),
            persistent: !0,
          },
          era_renaissance: {
            name: "Renaissance Era",
            link: "/game/science",
            check: (l) => l.hasScienceRank(12),
            persistent: !0,
          },
          era_industrial: {
            name: "Industrial Era",
            link: "/game/science",
            check: (l) => l.hasScienceRank(15),
            persistent: !0,
          },
          era_future: {
            name: "Future Era",
            link: "/game/science",
            check: (l) => l.hasScienceRank(18),
            persistent: !0,
          },
          spell_newfire: {
            name: "Spell: New Fire",
            link: "/game/help#spells",
            check: (l) => "coatlicue" == l.player().deity && l.pop() >= 30,
            persistent: !0,
          },
          spell_sacrifice: {
            name: "Spell: Sacrifice",
            link: "/game/help#spells",
            check: (l, n) =>
              "coatlicue" == l.player().deity &&
              n.charging.newfire &&
              n.charging.newfire >= 50,
            persistent: !0,
          },
          spell_tradenode: {
            name: "Spell: Trade Node",
            link: "/game/help#spells",
            check: (l, n) =>
              "horus" == l.player().deity && l.goldTotal() >= 3e6,
            persistent: !0,
          },
          spell_seshat: {
            name: "Spell: Sechat's Wisdom",
            link: "/game/help#spells",
            check: (l, n) =>
              "horus" == l.player().deity && l.tradeRouteNb() >= 15,
            persistent: !0,
          },
          spell_berserker: {
            name: "Spell: Berserker",
            link: "/game/help#spells",
            check: (l, n) =>
              "odin" == l.player().deity && l.totalTroopNb() >= 500,
            persistent: !0,
          },
          spell_appropriation: {
            name: "Spell: Appropriation",
            link: "/game/help#spells",
            check: (l, n) => "odin" == l.player().deity && n.burnNb >= 5,
            persistent: !0,
          },
          spell_enlightment: {
            name: "Spell: Enlightment",
            link: "/game/help#spells",
            check: (l) =>
              "shiva" == l.player().deity && l.pop(l.capital()) >= 8,
            persistent: !0,
          },
          spell_maha: {
            name: "Spell: Maha Shivaratri",
            link: "/game/help#spells",
            check: (l) => "shiva" == l.player().deity && l.wondersNb() >= 10,
            persistent: !0,
          },
          spell_dionysia: {
            name: "Spell: Dionysia",
            link: "/game/help#spells",
            check: (l) =>
              "dionysus" == l.player().deity && l.player().culture >= 1e5,
            persistent: !0,
          },
          spell_bacchanalia: {
            name: "Spell: Bacchanalia",
            link: "/game/help#spells",
            check: (l) => "dionysus" == l.player().deity && l.colonyNb() >= 15,
            persistent: !0,
          },
          spell_punisher: {
            name: "Spell: The Punisher",
            link: "/game/help#spells",
            check: (l, n) => "batara" == l.player().deity && n.plagueNb >= 1,
            persistent: !0,
          },
          spell_devourer: {
            name: "Spell: Devourer of the Sun",
            link: "/game/help#spells",
            check: (l, n) =>
              "batara" == l.player().deity && n.plagueMaxCities >= 20,
            persistent: !0,
          },
          autocast: {
            name: "Autocast Spell",
            link: "/game/help#spells",
            check: (l) => l.player().orientation <= -100,
            persistent: !1,
          },
          improvements: {
            name: "Tile Improvements",
            link: "/game/help#improvements",
            check: (l) => l.hasScience("bronze_working"),
            persistent: !1,
          },
          improvements2: {
            name: "Advanced Tile Improvements",
            link: "/game/help#improvements",
            check: (l) =>
              l.hasScience("industrialization") && l.player().orientation >= 50,
            persistent: !1,
          },
          timetravel: {
            name: "Time Travel",
            link: "/game/help#technology",
            check: (l) => l.player().orientation > 0,
            persistent: !1,
          },
          indusbuildings: {
            name: "Industrial Buildings",
            link: "/game/help#technology",
            check: (l) => l.player().orientation >= 25,
            persistent: !1,
          },
          indusimpr: {
            name: "Industrial Improvements",
            link: "/game/help#technology",
            check: (l) => l.player().orientation >= 50,
            persistent: !1,
          },
          induswonders: {
            name: "Industrial Wonders",
            link: "/game/help#technology",
            check: (l) => l.player().orientation >= 75,
            persistent: !1,
          },
          archeology: {
            name: "Archeology",
            link: "/game/help#archeology",
            check: (l) =>
              l.hasScience("archeology", l.player()) &&
              l.player().orientation >= 100,
            persistent: !1,
          },
        },
        gg = {
          0: {
            name: "Peaceful",
            description:
              "- Barbarians attacks disabled<br/>- AI attacks disabled<br/>- Big penalties for barbarians<br/>- No bonuses for AI<br/>- No plague<br/>- Faith production -25%",
            ai_bonus: 1,
            ai_golden_bonus: 1.2,
            ai_recruit_bonus: 0.8,
            barbarian_battle_mult: 0.5,
            barbarian_science_mult: 0.1,
            barbarian_gold_prod_mult: 0.3,
            faith_mult: 0.75,
          },
          1: {
            name: "Relax",
            description:
              "- Barbarians attacks disabled<br />- AI attacks enabled but rare<br/>- Big penalties for barbarians<br/>- Small bonuses for AI",
            ai_bonus: 1.1,
            ai_golden_bonus: 1.3,
            ai_recruit_bonus: 1,
            barbarian_battle_mult: 0.7,
            barbarian_science_mult: 0.2,
            barbarian_gold_prod_mult: 0.4,
            faith_mult: 1,
          },
          2: {
            name: "Normal",
            description:
              "- Barbarians attacks enabled<br />- AI attacks enabled<br/>- Moderate penalties for barbarians<br/>- Moderate bonuses for AI<br/>- Faith production +25%",
            ai_bonus: 1.3,
            ai_golden_bonus: 1.6,
            ai_recruit_bonus: 1.2,
            barbarian_battle_mult: 0.8,
            barbarian_science_mult: 0.3,
            barbarian_gold_prod_mult: 0.5,
            faith_mult: 1.25,
          },
          3: {
            name: "Hardcore",
            description:
              "- Barbarians attacks more frequent<br />- AI attacks more frequent<br/>- No penalties for Barbarians (except science)<br/>- Big bonuses for AI<br/>- Faith production +50%",
            ai_bonus: 1.6,
            ai_golden_bonus: 2,
            ai_recruit_bonus: 1.5,
            barbarian_battle_mult: 1,
            barbarian_science_mult: 0.5,
            barbarian_gold_prod_mult: 1,
            faith_mult: 1.5,
          },
        };
      class mg {
        static capitalizeFirstLetter(l) {
          return l.charAt(0).toUpperCase() + l.slice(1);
        }
        static formatTime(l) {
          if (l == 1 / 0) return "Infinity";
          let n = Math.floor(l / 86400);
          l -= 86400 * n;
          let e = Math.floor(l / 3600);
          l -= 3600 * e;
          let t = Math.floor(l / 60),
            i = Math.floor(l) % 60;
          return (
            (n > 0 ? n + "d" : "") +
            (e > 0 ? this.str(e) + "h" : "") +
            (0 == n && (t > 0 || e > 0) ? this.str(t) + "m" : "") +
            (0 == n && 0 == e ? this.str(i) + "s" : "")
          );
        }
        static str(l) {
          return (l >= 10 ? "" : "0") + l;
        }
        static format(l, n = "") {
          let e = this.getConfig(n);
          e.percent && (l *= 100);
          let t = "";
          l >= 1e12
            ? ((t = "T"), (e.decimals = (l /= 1e12) < 10 ? 2 : l < 100 ? 1 : 0))
            : l >= 1e9
              ? ((t = "B"),
                (e.decimals = (l /= 1e9) < 10 ? 2 : l < 100 ? 1 : 0))
              : l >= 1e6
                ? ((t = "M"),
                  (e.decimals = (l /= 1e6) < 10 ? 2 : l < 100 ? 1 : 0))
                : l >= 1e3
                  ? ((t = "k"),
                    (e.decimals = (l /= 1e3) < 10 ? 2 : l < 100 ? 1 : 0))
                  : l >= 100
                    ? (e.decimals = 0)
                    : l >= 10 && 2 == e.decimals && (e.decimals = 1);
          let i = Math.pow(10, e.decimals);
          l = Math.floor(l * i) / i;
          let s = Number(l).toFixed(e.decimals);
          if (
            ((s = (e.withPlus && l >= 0 ? "+" : "") + s + t),
            e.percent && (s += " %"),
            e.coloration)
          ) {
            let n = "";
            (l > 0 ? (n = "text-success") : l < 0 && (n = "text-danger"),
              (s = '<span class="' + n + '">' + s + "</span>"));
          }
          return s;
        }
        static getConfig(l) {
          if ("" == l)
            return {
              withPlus: !1,
              decimals: 0,
              coloration: !1,
              percent: !1,
            };
          let n = l.startsWith("+"),
            e = l.endsWith("c"),
            t = l.replace(/[\+c]/g, "");
          if (!t.startsWith("."))
            throw "invalid format: " + l + '. Config should be "+.2%c"';
          let i = t.endsWith("%");
          return {
            withPlus: n,
            decimals: +(t = (t = t.replace(/[%]/g, "")).replace(/[\.]/g, "")),
            coloration: e,
            percent: i,
          };
        }
      }
      class yg {
        static get(l, n) {
          return (
            void 0 === n && ((n = l), (l = 0)),
            Math.floor(Math.random() * (1 + n - l)) + l
          );
        }
        static roll(l) {
          return Math.random() < l;
        }
        static fromArray(l) {
          return l[yg.get(0, l.length - 1)];
        }
        static randomVilBonus() {
          return yg.fromArray([
            "",
            "",
            "",
            "food",
            "prod",
            "science",
            "gold",
            "culture",
            "faith",
            "recruitment",
          ]);
        }
      }
      const vg = {
          coatlicue: {
            id: "coatlicue",
            name: "Coatlicue",
            description:
              "Coatlicue is a powerful goddess of the Aztec mythology. The creator and destroyer of world, the mother of gods and mortals, she is said to have given birth to the Moon and the stars.<br/>This deity will help <b>your civilization grow</b>",
            color: "#229954",
            icon: "fas fa-seedling",
          },
          horus: {
            id: "horus",
            name: "Horus",
            description:
              'Horus is "The One Far Above", protector of the Pharaoh. Originally the Sky God, he is also known as War God, Hunters God, God of Kingship and others.<br/>This deity will help <b>your civilization prosper</b>',
            color: "#F1C40F",
            icon: "fas fa-ankh",
          },
          odin: {
            id: "odin",
            name: "Odin",
            description:
              "Odin is a supreme God of Death, healing, knowledge and poetry.<br/>This deity will help you <b>crush your enemies</b>",
            color: "#3498DB",
            icon: "fas fa-bolt",
          },
          shiva: {
            id: "shiva",
            name: "Shiva",
            description:
              "Shiva is the form of Brahma, the creator of world and the infinite. The God of Yogis, destroyer of world, he holds the word \u2018destruction\u2019 in a positive sense, as destruction of ego, attachments and old habits.<br/>This deity will help <b>your civilization progress</b>",
            color: "#E74C3C",
            icon: "fas fa-balance-scale-right",
          },
          dionysus: {
            id: "dionysus",
            name: "Dionysus",
            description:
              "Dyonisus is the god of wine, winemaking, grape cultivation, fertility, ritual madness, theater, and religious ecstasy.<br/>This deity will help <b>your civilization happiness & culture</b>",
            color: "#8E44AD",
            icon: "fas fa-glass-cheers",
          },
          batara: {
            id: "batara",
            name: "Batara Kala",
            description:
              "Batara Kala is the god of the underworld, the creator of light and the earth and the god of time and destruction, who devours unlucky people.<br/>This deity will help <b>your opponents fall</b><br/>This deity is <b>NOT RECOMMENDED</b> on your first run.",
            color: "#85929E",
            icon: "fas fa-skull-crossbones",
          },
        },
        bg = {
          abundance: {
            id: "abundance",
            name: "Abundance",
            icon: ug.food,
            description: (l) =>
              '<i class="text-food ' +
              ug.food +
              '"></i> production increased by <span class="text-primary">' +
              Math.round(100 * l.abundanceBonus()) +
              "%</span> for 5min (based on Feathered Serpent level)",
            help:
              '<i class="text-food ' +
              ug.food +
              '"></i> production increased for 5min (based on Feathered Serpent level)',
            time: 300,
            cooldown: 480,
            deity: "coatlicue",
            level: 1,
          },
          newfire: {
            id: "newfire",
            name: "New Fire",
            icon: ug.happiness,
            description: (l) =>
              '<i class="text-happiness ' +
              ug.happiness +
              '"></i> happiness increased (incremental)<br/>Current level: <span class="text-primary">' +
              Math.round(100 * l.newfireBonus()) +
              "%</span>",
            help:
              '<i class="text-happiness ' +
              ug.happiness +
              '"></i> happiness increased (incremental)',
            lock: "spell_newfire",
            lockDesc: (l) => "Total population " + l.pop() + " / 30",
            charging: !0,
            cooldown: 240,
            deity: "coatlicue",
            level: 2,
          },
          sacrifice: {
            id: "sacrifice",
            name: "Human Sacrifice",
            icon: ug.science,
            description: (l) =>
              '<span class="text-primary">+ ' +
              mg.format(Math.round(l.sacrificeBonus())) +
              '</span> <i class="text-science ' +
              ug.science +
              '"></i> (based on food production & global happiness)',
            help:
              '<i class="text-science ' +
              ug.science +
              '"></i> boost (based on food production & global happiness)',
            run: (l) => {
              let n = l.player();
              if (!n.science_queue.length) return !1;
              let e = l.sacrificeBonus();
              return (
                n.sciences[n.science_queue[0]].progress ||
                  (n.sciences[n.science_queue[0]].progress = 0),
                (n.sciences[n.science_queue[0]].progress += e),
                n.sciences[n.science_queue[0]].progress >=
                  l.scienceCost(l.conf.sciences[n.science_queue[0]]) &&
                  (l.discoverScience(n.id),
                  l.data.autopause.science && (l.data.pause = !0)),
                !0
              );
            },
            lock: "spell_sacrifice",
            lockDesc: (l) =>
              "New Fire charge " + (l.data.charging.newfire || 0) + " / 50",
            cooldown: 600,
            deity: "coatlicue",
            level: 3,
          },
          negociation: {
            id: "negociation",
            name: "Negociation",
            icon: ug.gold,
            description: (l) =>
              '<span class="text-trade"><i class="' +
              ug.trade +
              '"></i> Trade routes</span> produce <span class="text-primary">' +
              Math.round(100 * l.negociationBonus()) +
              '%</span> more <i class="text-gold ' +
              ug.gold +
              '"></i> for 5 min (based on Eye of Horus level)',
            help:
              '<span class="text-trade"><i class="' +
              ug.trade +
              '"></i> Trade routes</span> produce more <i class="text-gold ' +
              ug.gold +
              '"></i> for 5 min (based on Eye of Horus level)',
            time: 300,
            cooldown: 480,
            deity: "horus",
            level: 1,
          },
          tradenode: {
            id: "tradenode",
            name: "Trade node",
            icon: ug.trade,
            description: (l) =>
              '<span class="text-trade"><i class="' +
              ug.trade +
              '"></i> Trade routes</span> max number increased (incremental)<br/>Current level: <span class="text-primary">' +
              Math.floor(l.tradeNodeBonus()) +
              "</span> (not rounded: " +
              Math.floor(10 * l.tradeNodeBonus()) / 10 +
              ")",
            help:
              '<span class="text-trade"><i class="' +
              ug.trade +
              '"></i> Trade routes</span> max number increased (incremental)',
            lock: "spell_tradenode",
            lockDesc: (l) => "Total gold " + mg.format(l.goldTotal()) + " / 3M",
            charging: !0,
            cooldown: 300,
            deity: "horus",
            level: 2,
          },
          seshat: {
            id: "seshat",
            name: "Sechat's wisdom",
            icon: ug.science,
            description: (l) =>
              '<i class="text-gold ' +
              ug.gold +
              '"></i> value of <span class="text-trade"><i class="' +
              ug.trade +
              '"></i> Trade routes</span> is added to <i class="text-science ' +
              ug.science +
              '"></i> value of trade route for 2 min',
            help:
              '<i class="text-gold ' +
              ug.gold +
              '"></i> value of <span class="text-trade"><i class="' +
              ug.trade +
              '"></i> Trade routes</span> is added to <i class="text-science ' +
              ug.science +
              '"></i> value of trade route for 2 min',
            lock: "spell_seshat",
            lockDesc: (l) => "Trade routes " + l.tradeRouteNb() + " / 15",
            time: 120,
            cooldown: 480,
            deity: "horus",
            level: 3,
          },
          warpath: {
            id: "warpath",
            name: "War path",
            icon: ug.recruitment,
            description: (l) =>
              '<i class="' +
              ug.attack +
              '"></i> Recruitment speed increased and troop maintenance reduced(incremental)<br/>Current value:  <span class="text-primary">' +
              Math.floor(100 * l.warpathBonus()) +
              '%</span> (speed) | <span class="text-primary">-' +
              Math.floor(100 * l.warpathMaintenanceBonus()) +
              "%</span> (maintenance)",
            help:
              '<i class="' +
              ug.attack +
              '"></i> Recruitment speed increased (incremental)<br/>',
            charging: !0,
            cooldown: 300,
            deity: "odin",
            level: 1,
          },
          berserker: {
            id: "berserker",
            name: "Berserker",
            icon: ug.attack,
            description: (l) =>
              '<i class="' +
              ug.attack +
              '"></i> Attack increased by <span class="text-primary">' +
              Math.round(100 * l.berserkerAttackBonus()) +
              '%</span><br/><i class="' +
              ug.speed +
              '"></i> Speed increased by <span class="text-primary">' +
              Math.round(100 * l.berserkerSpeedBonus()) +
              '%</span><br/>Troop <i class="' +
              ug.capacity +
              '"></i> capacity x10<br/>for 2min (only for attacks, based on Valhalla level)',
            help:
              '<i class="' +
              ug.attack +
              '"></i> Attack increased and <i class="' +
              ug.speed +
              '"></i> Speed increased for 2min (only for attacks, based on Valhalla level)',
            lock: "spell_berserker",
            lockDesc: (l) =>
              "Total troops " + mg.format(l.totalTroopNb()) + " / 500",
            time: 120,
            cooldown: 300,
            deity: "odin",
            level: 2,
          },
          appropriation: {
            id: "appropriation",
            name: "Appropriation",
            icon: ug.science,
            description: (l) =>
              '<span class="text-primary">+ ' +
              Math.round(l.appropriationBonus()) +
              '</span> <i class="text-science ' +
              ug.science +
              '"></i> and <i class="text-faith ' +
              ug.faith +
              '"></i> for each unit killed for 1 min (based on total army power)',
            help:
              '<i class="text-science ' +
              ug.science +
              '"></i> for each unit killed for 1 min (based on total army power)',
            lock: "spell_appropriation",
            lockDesc: (l) => "City burnt down " + l.data.burnNb + " / 5",
            time: 60,
            cooldown: 480,
            deity: "odin",
            level: 3,
          },
          timeshift: {
            id: "timeshift",
            name: "Timeshift",
            icon: ug.time,
            description: (l) =>
              'Advance in time for <span class="text-primary">+ ' +
              mg.formatTime(l.timeshiftBonus()) +
              "</span> (based on Third Eye level)",
            help: "Advance in time (based on Third Eye level)",
            run: (l, n) => (n.run(0, l.timeshiftBonus(), !0), !0),
            cooldown: 300,
            deity: "shiva",
            level: 1,
          },
          enlightment: {
            id: "enlightment",
            name: "Enlightment",
            icon: ug.science,
            description: (l) =>
              '<i class="text-science ' +
              ug.science +
              '"></i> production increased (incremental)<br/>Current value: <span class="text-primary">+' +
              Math.floor(100 * l.enlightmentBonus()) +
              "%</span>",
            help:
              '<i class="text-science ' +
              ug.science +
              '"></i> production increased (incremental)',
            lock: "spell_enlightment",
            lockDesc: (l) =>
              "Capital population " + l.pop(l.capital()) + " / 8",
            charging: !0,
            cooldown: 300,
            deity: "shiva",
            level: 2,
          },
          maha: {
            id: "maha",
            name: "Maha Shivaratri",
            icon: ug.faith,
            description: (l) =>
              '<span class="text-primary">+ ' +
              mg.format(Math.round(l.mahaBonus())) +
              '</span> <i class="text-faith ' +
              ug.faith +
              '"></i> (based on science and global food production)',
            help:
              '<i class="text-faith ' +
              ug.faith +
              '"></i> boost (based on science and global food production)',
            run: (l) => ((l.player().faith += l.mahaBonus()), !0),
            lock: "spell_maha",
            lockDesc: (l) => "Nb of wonders " + l.wondersNb() + " / 10",
            cooldown: 600,
            deity: "shiva",
            level: 3,
          },
          idlers: {
            id: "idlers",
            name: "God of idlers",
            icon: ug.sleep,
            description: (l) =>
              'Idle citizens produce <i class="text-food ' +
              ug.food +
              '"></i>, <i class="text-culture ' +
              ug.culture +
              '"></i> and <i class="text-happiness ' +
              ug.happiness +
              '"></i> (incremental)<br/>Current value: <span class="text-primary">+' +
              mg.format(l.idlersBonus(), ".1") +
              " | +" +
              mg.format(l.idlersBonus() / 2, ".1") +
              " | +" +
              mg.format(l.idlersBonus()) +
              "%</span>",
            help:
              'Idle citizens produce <i class="text-food ' +
              ug.food +
              '"></i>, <i class="text-culture ' +
              ug.culture +
              '"></i> and <i class="text-happiness ' +
              ug.happiness +
              '"></i> (incremental)',
            charging: !0,
            cooldown: 300,
            deity: "dionysus",
            level: 1,
          },
          dionysia: {
            id: "dionysia",
            name: "Dionysia",
            icon: ug.culture,
            description: (l) =>
              '<i class="text-culture ' +
              ug.culture +
              '"></i> production increased by <span class="text-primary">' +
              Math.round(100 * l.dionysiaBonus()) +
              "%</span> for 2min (based on happiness and Orphic Mysteries level)",
            help:
              '<i class="text-culture ' +
              ug.culture +
              '"></i> production increased for 2min (based on happiness and Orphic Mysteries level)',
            time: 120,
            cooldown: 300,
            lock: "spell_dionysia",
            lockDesc: (l) =>
              "Culture " + mg.format(l.player().culture) + " / 100k",
            deity: "dionysus",
            level: 2,
          },
          bacchanalia: {
            id: "bacchanalia",
            name: "Bacchanalia",
            icon: ug.faith,
            description: (l) =>
              '<i class="text-science ' +
              ug.science +
              '"></i> & <i class="text-faith ' +
              ug.faith +
              '"></i> production increased by <span class="text-primary">' +
              Math.round(100 * l.bacchanaliaBonus()) +
              "%</span> for 1min (based on happiness, culture production and nb of colonies)",
            help:
              '<i class="text-science ' +
              ug.science +
              '"></i> & <i class="text-faith ' +
              ug.faith +
              '"></i> production increased for 1min (based on happiness, culture production and nb of colonies)',
            time: 60,
            cooldown: 600,
            lock: "spell_bacchanalia",
            lockDesc: (l) => "Colonies " + l.colonyNb() + " / 15",
            deity: "dionysus",
            level: 3,
          },
          underworld: {
            id: "underworld",
            name: "Ruler of the Underworld",
            icon: ug.health,
            description: (l) =>
              'Reduce risks of losing citizens, troops and trade routes from disease & plague (incremental)<br/>Current value: <span class="text-primary">-' +
              mg.format(100 * l.underworldBonus(), ".1") +
              "%</span>",
            help: "Reduce risks of dying from disease (incremental)",
            charging: !0,
            cooldown: 300,
            deity: "batara",
            level: 1,
          },
          punisher: {
            id: "punisher",
            name: "The Punisher",
            icon: ug.faith,
            description: (l) =>
              '<i class="text-science ' +
              ug.science +
              '"></i> & <i class="text-faith ' +
              ug.faith +
              '"></i> production increased for each city suffering from the plague. Increase plague propagation risk. (incremental)<br/>Current value: <span class="text-primary">+' +
              mg.format(100 * l.punisherBonus(), ".1") +
              "% / city with plague</span>",
            help:
              '<i class="text-science ' +
              ug.science +
              '"></i> & <i class="text-faith ' +
              ug.faith +
              '"></i> production increased for each city suffering from the plague (incremental)',
            charging: !0,
            lock: "spell_punisher",
            lockDesc: (l) => "Survived a plague " + l.data.plagueNb + " / 1",
            cooldown: 420,
            deity: "batara",
            level: 2,
          },
          devourer: {
            id: "devourer",
            name: "Devourer of the Sun",
            icon: ug.plague,
            description: (l) =>
              'Start a <i class="' +
              ug.plague +
              '"></i> plague in a random location',
            help:
              'Start a <i class="' +
              ug.plague +
              '"></i> plague in a random location',
            run: (l) => {
              let n = yg.fromArray(l.allCities());
              return (l.initPlague(n), !0);
            },
            lock: "spell_devourer",
            lockDesc: (l) =>
              "Most spread plague " + l.data.plagueMaxCities + " / 20",
            cooldown: 600,
            deity: "batara",
            level: 3,
          },
        },
        _g = {
          clairvoyance: {
            id: "clairvoyance",
            name: "Clairvoyance",
            description: (l) =>
              '<span class="text-science"><i class="' +
              ug.science +
              '"></i></span> production increased.<br/>' +
              (l
                ? (l.players[0].powers.clairvoyance
                    ? 'Current: <span class="text-primary">+ ' +
                      10 * l.players[0].powers.clairvoyance +
                      " %</span><br/>"
                    : "") +
                  'Next level: <span class="text-primary">+ ' +
                  10 * ((l.players[0].powers.clairvoyance || 0) + 1) +
                  " %</span>"
                : ""),
            cost: {
              "": 1,
            },
          },
          stone: {
            id: "stone",
            name: "Stone Skin",
            description: (l) =>
              '<span class="text-defense"><i class="' +
              ug.defense +
              '"></i> Defense</span> increased.<br/>' +
              (l
                ? (l.players[0].powers.stone
                    ? 'Current: <span class="text-primary">+ ' +
                      5 * l.players[0].powers.stone +
                      " %</span><br/>"
                    : "") +
                  'Next level: <span class="text-primary">+ ' +
                  5 * ((l.players[0].powers.stone || 0) + 1) +
                  " %</span>"
                : ""),
            cost: {
              "": 1,
            },
          },
          serpent: {
            id: "serpent",
            name: "Feathered Serpent",
            description: (l) =>
              'City <span class="text-food"><i class="' +
              ug.food +
              '"></i></span> production increased for each building owned.<br/>' +
              (l
                ? (l.players[0].powers.serpent
                    ? 'Current: <span class="text-primary">+ ' +
                      l.players[0].powers.serpent +
                      " %</span> / building<br/>"
                    : "") +
                  'Next level: <span class="text-primary">+ ' +
                  ((l.players[0].powers.serpent || 0) + 1) +
                  " %</span> / building"
                : ""),
            cost: {
              coatlicue: 1,
            },
          },
          eye: {
            id: "eye",
            name: "Eye of Horus",
            description: (l) =>
              '<span class="text-trade"><i class="' +
              ug.trade +
              '"></i>Trade routes</span> increase <i class="text-happiness ' +
              ug.happiness +
              '"></i>.<br/>' +
              (l
                ? (l.players[0].powers.eye
                    ? 'Current: <span class="text-primary">+ ' +
                      mg.format(0.5 * l.players[0].powers.eye, ".2") +
                      "</span> / trade route<br/>"
                    : "") +
                  'Next level: <span class="text-primary">+ ' +
                  mg.format(0.5 * ((l.players[0].powers.eye || 0) + 1), ".2") +
                  "</span>  / trade route"
                : ""),
            cost: {
              horus: 1,
            },
          },
          valhalla: {
            id: "valhalla",
            name: "Valhalla",
            description: (l) =>
              "Happiness increased from garrisoned units.<br/>" +
              (l
                ? (l.players[0].powers.valhalla
                    ? 'Current: <span class="text-primary">+ ' +
                      mg.format(0.025 * l.players[0].powers.valhalla, ".2") +
                      " %</span> / unit<br/>"
                    : "") +
                  'Next level: <span class="text-primary">+ ' +
                  mg.format(
                    0.025 * ((l.players[0].powers.valhalla || 0) + 1),
                    ".2",
                  ) +
                  " %</span> / unit"
                : ""),
            cost: {
              odin: 1,
            },
          },
          thirdeye: {
            id: "thirdeye",
            name: "Third Eye",
            description: (l) =>
              '<span class="text-food"><i class="' +
              ug.food +
              '"></i></span> and <span class="text-prod"><i class="' +
              ug.prod +
              '"></i></span> production increased in the capital.<br/>' +
              (l
                ? (l.players[0].powers.thirdeye
                    ? 'Current: <span class="text-primary">+ ' +
                      10 * l.players[0].powers.thirdeye +
                      " %</span><br/>"
                    : "") +
                  'Next level: <span class="text-primary">+ ' +
                  10 * ((l.players[0].powers.thirdeye || 0) + 1) +
                  " %</span>"
                : ""),
            cost: {
              shiva: 1,
            },
          },
          sequencer: {
            id: "sequencer",
            name: "Sequencer",
            description: (l, n) =>
              'Incremental <span class="text-spells"><i class="' +
              ug.spells +
              '"></i> spells</span> cooldown reduced.<br/>' +
              (n
                ? (l.players[0].powers.sequencer
                    ? 'Current: <span class="text-primary">- ' +
                      mg.format(100 * n.sequencerBonus(0), ".1") +
                      " %</span><br/>"
                    : "") +
                  'Next level: <span class="text-primary">- ' +
                  mg.format(100 * n.sequencerBonus(0, 1), ".1") +
                  " %</span>"
                : ""),
            cost: {
              "": 1,
              batara: 1,
            },
          },
          orphic: {
            id: "orphic",
            name: "Orphic Mysteries",
            description: (l) =>
              'All citizens produce <span class="text-faith"><i class="' +
              ug.faith +
              '"></i></span>.<br/>' +
              (l
                ? (l.players[0].powers.orphic
                    ? 'Current: <span class="text-primary">+ ' +
                      mg.format(0.2 * l.players[0].powers.orphic, ".1") +
                      " / citizen</span><br/>"
                    : "") +
                  'Next level: <span class="text-primary">+ ' +
                  mg.format(
                    0.2 * ((l.players[0].powers.orphic || 0) + 1),
                    ".1",
                  ) +
                  " / citizen</span>"
                : ""),
            cost: {
              "": 1,
              dionysus: 1,
            },
          },
          haste: {
            id: "haste",
            name: "Haste",
            description: (l) =>
              'Increase troop <i class="' +
              ug.speed +
              '"></i> speed.<br/>' +
              (l
                ? (l.players[0].powers.haste
                    ? 'Current: <span class="text-primary">+ ' +
                      5 * l.players[0].powers.haste +
                      " %<br/>"
                    : "") +
                  'Next level: <span class="text-primary">+ ' +
                  5 * ((l.players[0].powers.haste || 0) + 1) +
                  " %</span>"
                : ""),
            cost: {
              odin: 1,
              batara: 1,
            },
          },
          eternity: {
            id: "eternity",
            name: "Gateway to Eternity",
            description: (l) =>
              '<span class="text-prod"><i class="' +
              ug.prod +
              '"></i></span> production increased for each <span class="text-trade"><i class="' +
              ug.trade +
              '"></i>Trade routes</span>.<br/>' +
              (l
                ? (l.players[0].powers.eternity
                    ? 'Current: <span class="text-primary">+ ' +
                      5 * l.players[0].powers.eternity +
                      " %</span> / trade route<br/>"
                    : "") +
                  'Next level: <span class="text-primary">+ ' +
                  5 * ((l.players[0].powers.eternity || 0) + 1) +
                  " %</span> / trade route"
                : ""),
            cost: {
              coatlicue: 1,
              horus: 1,
            },
          },
          ouroboros: {
            id: "ouroboros",
            name: "Ouroboros",
            description: (l) =>
              '<span class="text-culture"><i class="' +
              ug.culture +
              '"></i></span> production increased for each tech discovered.<br/>' +
              (l
                ? (l.players[0].powers.ouroboros
                    ? 'Current: <span class="text-primary">+ ' +
                      2 * l.players[0].powers.ouroboros +
                      " %</span> / tech discovered<br/>"
                    : "") +
                  'Next level: <span class="text-primary">+ ' +
                  2 * ((l.players[0].powers.ouroboros || 0) + 1) +
                  " %</span> / tech discovered"
                : ""),
            cost: {
              dionysus: 1,
              shiva: 1,
            },
          },
          bliss: {
            id: "bliss",
            name: "Bliss",
            description: (l) =>
              '<span class="text-happiness"><i class="' +
              ug.happiness +
              '"></i></span> increased.<br/>' +
              (l
                ? (l.players[0].powers.bliss
                    ? 'Current: <span class="text-primary">+ ' +
                      5 * l.players[0].powers.bliss +
                      " %</span><br/>"
                    : "") +
                  'Next level: <span class="text-primary">+ ' +
                  5 * ((l.players[0].powers.bliss || 0) + 1) +
                  " %</span>"
                : ""),
            cost: {
              "": 1,
              odin: 1,
              shiva: 1,
              coatlicue: 1,
              horus: 1,
              dionysus: 1,
              batara: 1,
            },
          },
        },
        wg = {
          balanced: {
            name: "Balanced",
            sort: (l, n) => {
              let e = Object.assign({}, l),
                t = n.player(e.ownerid),
                i = e.autoassign_options.nogrowth,
                s = e.autoassign_options.priority || "";
              n.data.emp_autoassign && 0 == t.id && (s = n.data.emp_priority);
              let u = e.autoassign_options.strong;
              n.data.emp_autoassign && 0 == t.id && (u = n.data.emp_strong);
              let r = n.pop(e),
                a = r;
              Object.keys(e.citizens).forEach((l) => (e.citizens[l] = 0));
              let o = "artists";
              ag.idle.happiness(n, t.id) >= ag.artists.happiness(n, t.id) &&
                (o = "idle");
              let c = "farmers";
              ag.idle.food(n, e) >= ag.farmers.food(n, e) && (c = "idle");
              let d = "artists";
              if (
                (ag.idle.culture(n, t.id) >= ag.artists.culture(n, t.id) &&
                  (d = "idle"),
                n.hasScience("art", t))
              ) {
                for (e.citizens.priests = r; n.happiness(e, !0) < 0.2 && a;)
                  (e.citizens[o]++, a--, e.citizens.priests--);
                e.citizens.priests = 0;
              }
              if (n.hasPolicy("who", t.id)) {
                for (e.citizens.priests = r; n.health(e) < 0.2 && a;)
                  (e.citizens.scientists++, a--, e.citizens.priests--);
                e.citizens.priests = 0;
              }
              for (
                e.citizens.priests = r - e.citizens.artists;
                n.foodDiff(e) < 0 && a;
              )
                (e.citizens[c]++, a--, e.citizens.priests--);
              if (((e.citizens.priests = 0), n.hasScience("trade", t)))
                for (; n.goldDiff(e) < 0 && a;) (e.citizens.merchants++, a--);
              if (u && s) {
                let l = s;
                ("farmers" == l && (l = c),
                  "artists" == l && (l = d),
                  (e.citizens[l] += a),
                  (a = 0));
              } else
                for (; a;) {
                  let l = a;
                  ("farmers" != s || i || (e.citizens[c]++, a--),
                    "builders" == s &&
                      a &&
                      n.hasScience("tanning", t) &&
                      e.building_queue.length &&
                      (e.citizens.builders++, a--),
                    "scientists" == s &&
                      a &&
                      n.hasScience("writing", t) &&
                      t.science_queue.length &&
                      (e.citizens.scientists++, a--),
                    "merchants" == s &&
                      a &&
                      n.hasScience("trade", t) &&
                      e.gold < n.maxGold(e) &&
                      (e.citizens.merchants++, a--),
                    "artists" == s &&
                      a &&
                      n.hasScience("art", t) &&
                      (e.citizens[d]++, a--),
                    "priests" == s &&
                      a &&
                      n.hasScience("religion", t) &&
                      t.orientation <= 0 &&
                      (e.citizens.priests++, a--),
                    a &&
                      n.hasScience("tanning", t) &&
                      e.building_queue.length &&
                      (e.citizens.builders++, a--),
                    a &&
                      n.hasScience("writing", t) &&
                      t.science_queue.length &&
                      (e.citizens.scientists++, a--),
                    a &&
                      n.hasScience("trade", t) &&
                      e.gold < n.maxGold(e) &&
                      (e.citizens.merchants++, a--),
                    a && n.hasScience("art", t) && (e.citizens[d]++, a--),
                    0 == e.ownerid &&
                      a &&
                      n.hasScience("religion", t) &&
                      t.orientation <= 0 &&
                      (e.citizens.priests++, a--),
                    a && !i && (e.citizens[c]++, a--),
                    l == a && ((e.citizens.idle += a), (a = 0)));
                }
              for (let h in e.citizens) l.citizens[h] = e.citizens[h];
            },
          },
        },
        xg = {
          americans: {
            id: "americans",
            name: "Americans",
            name2: "American",
            color: "#ffffff",
            color2: "#182a64",
            vil_names: [
              "Washington",
              "New York",
              "Boston",
              "Philadelphia",
              "Atlanta",
              "Chicago",
              "Seattle",
              "San Francisco",
              "Los Angeles",
              "Houston",
              "Portland",
              "St. Louis",
              "Miami",
              "Buffalo",
              "Detroit",
              "New Orleans",
              "Baltimore",
              "Denver",
              "Cincinnati",
              "Dallas",
              "Memphis",
              "Cleveland",
              "Kansas City",
              "San Diego",
              "Richmond",
              "Las Vegas",
              "Phoenix",
              "Albuquerque",
              "Minneapolis",
              "Pittsburgh",
              "Oakland",
              "Tampa Bay",
              "Orlando",
              "Tacoma",
              "Santa Fe",
              "Olympia",
              "Hunt Valley",
              "Springfield",
              "Palo Alto",
              "Centralia",
              "Spokane",
              "Jacksonville",
              "Savannah",
              "Charleston",
              "San Antonio",
              "Omaha",
              "Birmingham",
              "Honolulu",
              "Anchorage",
              "Sacramento",
              "Salt Lake City",
              "Reno",
              "Boise",
              "Milwaukee",
              "Santa Cruz",
              "Monterey",
              "Santa Monica",
              "Little Rock",
              "Columbus",
              "Lebam",
            ],
            starting_relations: 60,
            relation_decrease: 0.3,
            war_fatigue_ratio: 2e8,
            agressivity: 14,
            mult: {
              food: 1.3,
              gold: 1.5,
              science: 1.5,
              recruitment: 1.2,
              prod: 1.1,
              attack: 1.2,
              defense: 1.1,
              culture: 1.4,
            },
            burn_chances: 0,
            golden: "industrial",
            respawn: !0,
            description:
              'Special unit: <span class="text-special">Minuteman</span>. The Minuteman is a cheaper musketman with +10 attack.',
          },
          arabians: {
            id: "arabians",
            name: "Arabians",
            name2: "Arabian",
            color: "#b4e826",
            color2: "#2d552e",
            vil_names: [
              "Mecca",
              "Medina",
              "Damascus",
              "Baghdad",
              "Najran",
              "Kufah",
              "Basra",
              "Khurasan",
              "Anjar",
              "Fustat",
              "Aden",
              "Yamama",
              "Muscat",
              "Mansura",
              "Bukhara",
              "Fez",
              "Shiraz",
              "Merw",
              "Balkh",
              "Mosul",
              "Aydab",
              "Bayt Ras",
              "Suhar",
              "Taif",
              "Hama",
              "Tabuk",
              "Sana'a",
              "Shihr",
              "Tripoli",
              "Tunis",
              "Kairouan",
              "Algiers",
              "Oran",
              "Tangier",
              "Casablanca",
              "Marrakech",
            ],
            starting_relations: 50,
            relation_decrease: 0.2,
            war_fatigue_ratio: 3e8,
            agressivity: 13,
            mult: {
              food: 1,
              gold: 1.3,
              science: 1,
              recruitment: 1.1,
              prod: 1.1,
              attack: 1,
              defense: 1.2,
              culture: 1.2,
            },
            burn_chances: 0.02,
            golden: "renaissance",
            description:
              'Special ability: <span class="text-trade">+2 <i class="' +
              ug.trade +
              '"></i></span>.',
          },
          assyrians: {
            id: "assyrians",
            name: "Assyrians",
            name2: "Assyrian",
            color: "#ffae0f",
            color2: "#fffff6",
            vil_names: [
              "Assur",
              "Nineveh",
              "Nimrud",
              "Kar-Tukulti-Ninurta",
              "Dur-Sharrukin",
              "Halab",
              "Carchemish",
              "Kanesh",
              "Harran",
              "Imgur-Enlil",
              "Shubat-Enlil",
              "Qatna",
              "Sareisa",
              "Sam al",
              "Qarqar",
              "Til Barsip",
              "Sultantepe",
              "Erbil",
              "Hamath",
              "Guzana",
              "Turuspa",
              "Nasibina",
              "Arpad",
              "Kelashin",
              "Tadmor",
              "Urartu",
              "Sabata",
              "Hit",
            ],
            starting_relations: 49,
            relation_decrease: 0.5,
            war_fatigue_ratio: 4e8,
            agressivity: 14,
            mult: {
              food: 1,
              gold: 1,
              science: 1.1,
              recruitment: 1,
              prod: 1,
              attack: 1,
              defense: 1.4,
              culture: 1,
            },
            burn_chances: 0.01,
            golden: "ancient",
            description:
              'Special unit: <span class="text-special">Siege Tower</span>. The Siege Tower is a catapult with +4 attack',
          },
          australians: {
            id: "australians",
            name: "Australians",
            name2: "Australian",
            color: "#f8d902",
            color2: "#156c31",
            vil_names: [
              "Sydney",
              "Launceston",
              "Ballaarat",
              "Perth",
              "Brisbane",
              "Toowoomba",
              "Melbourne",
              "Townsville",
              "Geelong",
              "Adelaide",
              "Hobart",
              "Bendigo",
              "Broken Hill",
              "Cairns",
              "Newcastle",
              "Maitland",
              "Rockhampton",
              "Wagga Wagga",
              "Wollongong",
              "Albury",
              "Alice Springs",
              "Bathurst",
              "Queanbeyan",
              "Bundaberg",
              "Coffs Harbor",
              "Darwin",
              "Fremantle",
              "Gladstone",
              "Goulburn",
              "Hervey Bay",
              "Kalgoorlie",
              "Lismore",
              "Lithgow",
              "Maryborough",
              "Orange",
              "Port Macquarie",
              "Port Pirie",
              "Boomahnoomoonah",
              "Tweed Heads",
            ],
            starting_relations: 50,
            relation_decrease: 0.2,
            war_fatigue_ratio: 5e7,
            agressivity: 12,
            mult: {
              food: 1.5,
              gold: 1.3,
              science: 1.3,
              recruitment: 1.1,
              prod: 1.3,
              attack: 1.1,
              defense: 1.4,
              culture: 1.3,
            },
            burn_chances: 0.1,
            golden: "industrial",
            respawn: !0,
            description: "Special ability: Can build farms on Desert tiles.",
          },
          aztecs: {
            id: "aztecs",
            name: "Aztecs",
            name2: "Aztec",
            color: "#E74C3C",
            color2: "#74F4F2",
            vil_names: [
              "Tenochtitlan",
              "Teotihuacan",
              "Tlatelolco",
              "Texcoco",
              "Tlaxcala",
              "Calixtlahuaca",
              "Xochicalco",
              "Tlacopan",
              "Atzcapotzalco",
              "Tzintzuntzan",
              "Malinalco",
              "Tula",
              "Tamuin",
              "Teayo",
              "Cempoala",
              "Chalco",
              "Tlalmanalco",
              "Ixtapaluca",
              "Huexotla",
              "Tepexpan",
              "Tepetlaoxtoc",
              "Chiconautla",
              "Zitlaltepec",
              "Coyotepec",
              "Tequixquiac",
              "Jilotzingo",
              "Tlapanaloya",
              "Tultitan",
              "Ecatepec",
              "Coatepec",
              "Chalchiuites",
              "Chiauhita",
              "Chapultepec",
              "Itzapalapa",
              "Ayotzinco",
              "Iztapam",
            ],
            starting_relations: 60,
            relation_decrease: 1,
            war_fatigue_ratio: 5e8,
            agressivity: 15,
            mult: {
              food: 1,
              gold: 1,
              science: 1,
              recruitment: 1.2,
              prod: 1,
              attack: 1,
              defense: 1,
              culture: 1.1,
            },
            burn_chances: 0.05,
            golden: "classical",
            description:
              'Special unit: <span class="text-special">Eagle Warrior</span>. The Eagle Warrior is a warrior with +4 attack. Acts as a Slaver.',
          },
          brazilians: {
            id: "brazilians",
            name: "Brazilians",
            name2: "Brazilian",
            color: "#2a552d",
            color2: "#70d307",
            vil_names: [
              "Rio de Janeiro",
              "S\xe3o Paulo",
              "Salvador",
              "Bras\xedlia",
              "Fortaleza",
              "Belo Horizonte",
              "Manaus",
              "Curitiba",
              "Recife",
              "Porto Alegre",
              "Bel\xe9m",
              "Goi\xe2nia",
              "Guarulhos",
              "Campinas",
              "S\xe3o Luis",
              "Macei\xf3",
              "Duque de Caxias",
              "Natal",
              "Campo Grande",
              "Teresina",
              "Florian\xf3polis",
              "Nova Igua\xe7u",
              "Sao Bernardo do Campo",
              "Jo\xe3o Pessoa",
              "Osasco",
              "Jaboat\xe3o dos Guararapes",
              "S\xe3o Jos\xe9 dos Campos",
              "Contagem",
              "Uberl\xe2ndia",
              "Aracaju",
              "Cuiab\xe1",
              "Feira de Santana",
              "Juiz de Fora",
              "Joinville",
              "Macap\xe1",
              "Jundia\xed",
            ],
            starting_relations: 50,
            relation_decrease: 0.2,
            war_fatigue_ratio: 5e7,
            agressivity: 13,
            mult: {
              food: 1.5,
              gold: 1.1,
              science: 1.2,
              recruitment: 1.1,
              prod: 1.3,
              attack: 1.1,
              defense: 1.3,
              culture: 1.5,
            },
            burn_chances: 0,
            golden: "industrial",
            respawn: !0,
            description:
              'Special building: <span class="text-special">Carnival</span>. The Carnival is a zoo with +10 <i class="' +
              ug.culture +
              ' text-culture"></i>',
          },
          chinese: {
            id: "chinese",
            name: "Chinese",
            name2: "Chinese",
            color: "#ffffff",
            color2: "#008546",
            vil_names: [
              "Beijing",
              "Shanghai",
              "Guangzhou",
              "Nanjing",
              "Xian",
              "Chengdu",
              "Hangzhou",
              "Tianjin",
              "Macau",
              "Shandong",
              "Kaifeng",
              "Ningbo",
              "Baoding",
              "Yangzhou",
              "Harbin",
              "Chongqing",
              "Luoyang",
              "Kunming",
              "Taipei",
              "Shenyang",
              "Taiyuan",
              "Tainan",
              "Dalian",
              "Lijiang",
              "Wuxi",
              "Suzhou",
              "Maoming",
              "Shaoguan",
              "Yangjiang",
              "Heyuan",
              "Liaoning",
              "Hubei",
              "Gansu",
              "Huangshi",
              "Yichang",
              "Yingtan",
              "Xinyu",
              "Xinzheng",
              "Handan",
              "Dunhuang",
              "Gaoyu",
              "Nantong",
              "Weifang",
              "Xikang",
            ],
            starting_relations: 70,
            relation_decrease: 0.3,
            war_fatigue_ratio: 2e8,
            agressivity: 14,
            mult: {
              food: 1.1,
              gold: 1.1,
              science: 1.4,
              recruitment: 1,
              prod: 1.2,
              attack: 1,
              defense: 1.2,
              culture: 1.1,
            },
            burn_chances: 0,
            golden: "medieval",
            description:
              'Special building: <span class="text-special">Paper Maker</span>. The Paper Maker is a library with +5 <i class="' +
              ug.science +
              ' text-science"></i> ',
          },
          egyptians: {
            id: "egyptians",
            name: "Egyptians",
            name2: "Egyptian",
            color: "#680cda",
            color2: "#f8ef11",
            vil_names: [
              "Thebes",
              "Memphis",
              "Heliopolis",
              "Elephantine",
              "Alexandria",
              "Pi-Ramesses",
              "Giza",
              "Byblos",
              "Akhetaten",
              "Hieraconpolis",
              "Abydos",
              "Asyut",
              "Avaris",
              "Lisht",
              "Buto",
              "Edfu",
              "Pithom",
              "Busiris",
              "Kahun",
              "Athribis",
              "Mendes",
              "Elashmunein",
              "Tanis",
              "Bubastis",
              "Oryx",
              "Sebennytus",
              "Akhmin",
              "Karnak",
              "Luxor",
              "El Kab",
              "Armant",
              "Balat",
              "Ellahun",
              "Kom Medinet Ghurab",
              "Hawara",
              "Dashur",
              "Raqote",
              "Damanhur",
              "Merimde",
              "Abusir",
              "Herakleopolis",
              "Akoris",
              "Benihasan",
              "Tasa",
              "Badari",
              "Hermopolis",
              "Amrah",
              "Negade",
              "Koptos",
              "Hermonthis",
              "Ombos",
              "Aniba",
              "Soleb",
              "Semna",
              "Amara",
            ],
            starting_relations: 60,
            relation_decrease: 0.1,
            war_fatigue_ratio: 2e8,
            agressivity: 13,
            mult: {
              food: 1.1,
              gold: 1,
              science: 1.3,
              recruitment: 1,
              prod: 1.3,
              attack: 1,
              defense: 1.2,
              culture: 1.2,
            },
            burn_chances: 0,
            golden: "ancient",
            description:
              'Special building: <span class="text-special">Granite quarry</span>. The Granite quarry is a workshop with +5 <i class="' +
              ug.prod +
              ' text-prod"></i> ',
          },
          english: {
            id: "english",
            name: "English",
            name2: "English",
            color: "#fffdfe",
            color2: "#5b0300",
            vil_names: [
              "London",
              "York",
              "Nottingham",
              "Hastings",
              "Canterbury",
              "Coventry",
              "Warwick",
              "Newcastle",
              "Oxford",
              "Liverpool",
              "Dover",
              "Brighton",
              "Norwich",
              "Leeds",
              "Reading",
              "Birmingham",
              "Richmond",
              "Exeter",
              "Cambridge",
              "Gloucester",
              "Manchester",
              "Bristol",
              "Leicester",
              "Carlisle",
              "Ipswich",
              "Portsmouth",
              "Berwick",
              "Bath",
              "Mumbles",
              "Southampton",
              "Sheffield",
              "Salisbury",
              "Colchester",
              "Plymouth",
              "Lancaster",
              "Blackpool",
              "Winchester",
              "Hull",
            ],
            starting_relations: 50,
            relation_decrease: 0.4,
            war_fatigue_ratio: 6e8,
            agressivity: 14,
            mult: {
              food: 1.2,
              gold: 1.2,
              science: 1.3,
              recruitment: 1.1,
              prod: 1.2,
              attack: 1,
              defense: 1,
              culture: 1.1,
            },
            burn_chances: 0.01,
            golden: "industrial",
            description:
              'Special unit: <span class="text-special">Red coat</span>. The Red coat is a rifleman with +20 attack',
          },
          french: {
            id: "french",
            name: "French",
            name2: "French",
            color: "#f6f5c3",
            color2: "#4090ff",
            vil_names: [
              "Paris",
              "Orleans",
              "Lyon",
              "Troyes",
              "Tours",
              "Marseille",
              "Chartres",
              "Avignon",
              "Rouen",
              "Grenoble",
              "Dijon",
              "Amiens",
              "Cherbourg",
              "Poitiers",
              "Toulouse",
              "Bayonne",
              "Strasbourg",
              "Brest",
              "Bordeaux",
              "Rennes",
              "Nice",
              "Saint Etienne",
              "Nantes",
              "Reims",
              "Le Mans",
              "Montpellier",
              "Limoges",
              "Nancy",
              "Lille",
              "Caen",
              "Toulon",
              "N\xeemes",
              "Le Havre",
              "Lourdes",
              "Carcassone",
              "Cannes",
              "Aix-En-Provence",
              "La Rochelle",
              "Bourges",
              "Calais",
            ],
            starting_relations: 50,
            relation_decrease: 0.3,
            war_fatigue_ratio: 2e8,
            agressivity: 13,
            mult: {
              food: 1.3,
              gold: 1.1,
              science: 1.3,
              recruitment: 1.1,
              prod: 1.2,
              attack: 1,
              defense: 1,
              culture: 1.3,
            },
            burn_chances: 0.01,
            golden: "renaissance",
            description:
              'Special building: <span class="text-special">Chateau</span>. The Chateau is an castle with +10 <i class="' +
              ug.gold +
              ' text-gold"></i> and +10 <i class="' +
              ug.culture +
              ' text-culture"></i>',
          },
          germans: {
            id: "germans",
            name: "Germans",
            name2: "German",
            color: "#3c4237",
            color2: "#99979f",
            vil_names: [
              "Berlin",
              "Hamburg",
              "Munich",
              "Cologne",
              "Frankfurt",
              "Essen",
              "Dortmund",
              "Stuttgart",
              "D\xfcsseldorf",
              "Bremen",
              "Hannover",
              "Duisburg",
              "Leipzig",
              "Dresden",
              "Bonn",
              "Bochum",
              "Bielefeld",
              "Karlsruhe",
              "Gelsenkirchen",
              "Wiesbaden",
              "M\xfcnster",
              "Rostock",
              "Chemnitz",
              "Braunschweig",
              "Halle",
              "M\xf6nchengladbach",
              "Kiel",
              "Wuppertal",
              "Freiburg",
              "Hagen",
              "Erfurt",
              "Kaiserslautern",
              "Kassel",
              "Oberhausen",
              "Hamm",
              "Saarbr\xfccken",
              "Krefeld",
              "Pirmasens",
              "Potsdam",
              "Solingen",
              "Osnabr\xfcck",
              "Ludwigshafen",
              "Leverkusen",
              "Oldenburg",
              "Neuss",
              "M\xfclheim",
              "Darmstadt",
              "Herne",
              "W\xfcrzburg",
              "Recklinghausen",
              "G\xf6ttingen",
              "Wolfsburg",
              "Koblenz",
              "Hildesheim",
              "Erlangen",
            ],
            starting_relations: 50,
            relation_decrease: 0.7,
            war_fatigue_ratio: 6e8,
            agressivity: 15,
            mult: {
              food: 1.1,
              gold: 1.2,
              science: 1.4,
              recruitment: 1.2,
              prod: 1.3,
              attack: 1.3,
              defense: 1.1,
              culture: 1,
            },
            burn_chances: 0.02,
            golden: "industrial",
            description:
              'Special building: <span class="text-special">Hanse</span>. The Hanse is an ironworks with +15 <i class="' +
              ug.prod +
              ' text-prod"></i> ',
          },
          greeks: {
            id: "greeks",
            name: "Greeks",
            name2: "Greek",
            color: "#418efd",
            color2: "#fffeff",
            vil_names: [
              "Athens",
              "Sparta",
              "Corinth",
              "Argos",
              "Knossos",
              "Mycenae",
              "Pharsalos",
              "Ephesus",
              "Halicarnassus",
              "Rhodes",
              "Eretria",
              "Pergamon",
              "Miletos",
              "Megara",
              "Phocaea",
              "Sicyon",
              "Tiryns",
              "Samos",
              "Mytilene",
              "Chios",
              "Paros",
              "Tegea",
              "Elis",
              "Syracuse",
              "Herakleia",
              "Gortyn",
              "Chalkis",
              "Pylos",
              "Pella",
              "Naxos",
              "Sicyon",
              "Smyrna",
              "Larissa",
              "Apollonia",
              "Messene",
              "Orchomenos",
              "Ambracia",
              "Kos",
              "Knidos",
              "Amphipolis",
              "Patras",
              "Lamia",
              "Nafplion",
              "Apolyton",
            ],
            starting_relations: 75,
            relation_decrease: 0.2,
            war_fatigue_ratio: 2e7,
            agressivity: 13,
            mult: {
              food: 1,
              gold: 1,
              science: 1.2,
              recruitment: 1,
              prod: 1.1,
              attack: 1.1,
              defense: 1.1,
              culture: 1.2,
            },
            burn_chances: 0,
            golden: "ancient",
            description:
              'Special unit: <span class="text-special">Hoplite</span>. The Hoplite is a lancier with +6 attack',
          },
          incans: {
            id: "incans",
            name: "Incans",
            name2: "Incan",
            color: "#1f7d50",
            color2: "#ffa116",
            vil_names: [
              "Cusco",
              "Tiwanaku",
              "Machu",
              "Ollantaytambo",
              "Corihuayrachina",
              "Huamanga",
              "Vilcas",
              "Vilcabamba",
              "Vitcos",
              "Andahuaylas",
              "Ica",
              "Arequipa",
              "Nasca",
              "Atico",
              "Juli",
              "Chuito",
              "Chuquiapo",
              "Huanuco Pampa",
              "Tamboccocha",
              "Huaras",
              "Riobamba",
              "Caxamalca",
              "Sausa",
              "Tambo Colorado",
              "Huaca",
              "Tumbes",
              "Chan Chan",
              "Sipan",
              "Pachacamac",
              "Llactapata",
              "Pisac",
              "Kuelap",
              "Pajaten",
              "Chucuito",
            ],
            starting_relations: 75,
            relation_decrease: 0.2,
            war_fatigue_ratio: 2e7,
            agressivity: 13,
            mult: {
              food: 1.1,
              gold: 1.1,
              science: 1,
              recruitment: 1,
              prod: 1,
              attack: 1,
              defense: 1.1,
              culture: 1,
            },
            burn_chances: 0,
            golden: "classical",
            description:
              'Special building: <span class="text-special">Terrace</span>. The Terrace is a granary with +3 <i class="' +
              ug.food +
              ' text-food"></i>',
          },
          indians: {
            id: "indians",
            name: "Indians",
            name2: "Indian",
            color: "#ffb34b",
            color2: "#0d6707",
            vil_names: [
              "Delhi",
              "Mumbai",
              "Vijayanagara",
              "Pataliputra",
              "Varanasi",
              "Agra",
              "Calcutta",
              "Lahore",
              "Bangalore",
              "Hyderabad",
              "Madurai",
              "Ahmedabad",
              "Kolhapur",
              "Prayaga",
              "Ayodhya",
              "Indraprastha",
              "Mathura",
              "Ujjain",
              "Gulbarga",
              "Jaunpur",
              "Rajagriha",
              "Sravasti",
              "Tiruchirapalli",
              "Thanjavur",
              "Bodhgaya",
              "Kushinagar",
              "Amaravati",
              "Gaur",
              "Gwalior",
              "Jaipur",
              "Karachi",
            ],
            starting_relations: 75,
            relation_decrease: 0.1,
            war_fatigue_ratio: 1e7,
            agressivity: 12,
            mult: {
              food: 1.2,
              gold: 1,
              science: 1.2,
              recruitment: 1,
              prod: 1,
              attack: 1,
              defense: 1.1,
              culture: 1.1,
            },
            burn_chances: 0,
            golden: "classical",
            description:
              'Special unit: <span class="text-special">War elephant</span>. The War elephant is a horseman that act as a ranged unit.',
          },
          indonesians: {
            id: "indonesians",
            name: "Indonesians",
            name2: "Indonesian",
            color: "#b64436",
            color2: "#86d9e0",
            vil_names: [
              "Jakarta",
              "Surabaya",
              "Medan",
              "Makassar",
              "Batam",
              "Denpasar",
              "Samarinda",
              "Mataram",
              "Ambon",
              "Bandung",
              "Kupang",
              "Depok",
              "Palembang",
              "Trowulan",
              "Semarang",
              "Jayapura",
              "Tangerang",
              "Bogor",
              "Pekanbaru",
              "Bandar Lampung",
              "Malang",
              "Padang",
              "Ternate",
              "Banjarmasin",
              "Pontianak",
              "Cimahi",
              "Balikpapan",
              "Jambi",
              "Komodo",
              "Solo",
              "Biak",
              "Djawa",
              "Kudus",
              "Lombok",
              "Samosir",
              "Sragen",
              "Garut",
              "Gresik",
              "Nias",
              "Madiun",
              "Yogyakarta",
              "Bima",
              "Sorong",
            ],
            starting_relations: 50,
            relation_decrease: 0.3,
            war_fatigue_ratio: 2e8,
            agressivity: 13,
            mult: {
              food: 1.3,
              gold: 1.1,
              science: 1,
              recruitment: 1.1,
              prod: 1,
              attack: 1.1,
              defense: 1.2,
              culture: 1.1,
            },
            burn_chances: 0.02,
            golden: "medieval",
            description:
              'Special building: <span class="text-special">Candi</span>. The Candi is a garden with +5% <i class="' +
              ug.happiness +
              ' text-happiness"></i>',
          },
          japanese: {
            id: "japanese",
            name: "Japanese",
            name2: "Japanese",
            color: "#b80000",
            color2: "#e0e0e0",
            vil_names: [
              "Kyoto",
              "Osaka",
              "Tokyo",
              "Satsuma",
              "Kagoshima",
              "Nara",
              "Nagoya",
              "Izumo",
              "Nagasaki",
              "Yokohama",
              "Shimonoseki",
              "Matsuyama",
              "Sapporo",
              "Hakodate",
              "Ise",
              "Toyama",
              "Fukushima",
              "Suo",
              "Bizen",
              "Echizen",
              "Izumi",
              "Omi",
              "Echigo",
              "Kozuke",
              "Sado",
              "Kobe",
              "Nagano",
              "Hiroshima",
              "Takayama",
              "Akita",
              "Fukuoka",
              "Aomori",
              "Kamakura",
              "Kochi",
              "Naha",
            ],
            starting_relations: 50,
            relation_decrease: 0.3,
            war_fatigue_ratio: 6e8,
            agressivity: 14,
            mult: {
              food: 1,
              gold: 1.1,
              science: 1.3,
              recruitment: 1,
              prod: 1,
              attack: 1.1,
              defense: 1.4,
              culture: 1.1,
            },
            burn_chances: 0,
            golden: "renaissance",
            description:
              'Special unit: <span class="text-special">Samurai</span>. The Samurai is a longswordsman with +10 attack and +10 defense.',
          },
          mongols: {
            id: "mongols",
            name: "Mongols",
            name2: "Mongol",
            color: "#fd9514",
            color2: "#3f0008",
            vil_names: [
              "Karakorum",
              "Beshbalik",
              "Turfan",
              "Hsia",
              "Old Sarai",
              "New Sarai",
              "Tabriz",
              "Tiflis",
              "Otrar",
              "Sanchu",
              "Kazan",
              "Almarikh",
              "Ulaanbaatar",
              "Hovd",
              "Darhan",
              "Dalandzadgad",
              "Mandalgovi",
              "Choybalsan",
              "Erdenet",
              "Tsetserleg",
              "Baruun-Urt",
              "Ereen",
              "Batshireet",
              "Choyr",
              "Ulaangom",
              "Tosontsengel",
              "Atlay",
              "Uliastay",
              "Bayanhongor",
              "Har-Ayrag",
              "Nalayh",
              "Tes",
            ],
            starting_relations: 40,
            relation_decrease: 0.9,
            war_fatigue_ratio: 6e8,
            agressivity: 15,
            mult: {
              food: 1.1,
              gold: 1,
              science: 1,
              recruitment: 1.2,
              prod: 1,
              attack: 1.2,
              defense: 1,
              culture: 1,
            },
            burn_chances: 0.2,
            golden: "medieval",
            description:
              'Special unit: <span class="text-special">Keshik</span>. The Keshik is a knight that acts as a ranged unit.',
          },
          ottomans: {
            id: "ottomans",
            name: "Ottomans",
            name2: "Ottoman",
            color: "#30773d",
            color2: "#f2f7af",
            vil_names: [
              "Istanbul",
              "Edirne",
              "Ankara",
              "Bursa",
              "Konya",
              "Samsun",
              "Gaziantep",
              "Diyarbakir",
              "Izmir",
              "Kayseri",
              "Malatya",
              "Marsin",
              "Antalya",
              "Zonguldak",
              "Denizli",
              "Ordu",
              "Mugla",
              "Eski\u015fehir",
              "Inebolu",
              "Sinop",
              "Adana",
              "Tarsus",
              "Artuin",
              "Bodrum",
              "Ere\u011fli",
              "Silifke",
              "Sivas",
              "Amasya",
              "Marmaris",
              "Trabzon",
              "Erzurum",
              "Urfa",
              "Izmit",
              "Afyonkarhisar",
              "Bitlis",
              "Yalova",
            ],
            starting_relations: 50,
            relation_decrease: 0.3,
            war_fatigue_ratio: 3e8,
            agressivity: 14,
            mult: {
              food: 1.1,
              gold: 1.2,
              science: 1,
              recruitment: 1.1,
              prod: 1,
              attack: 1.1,
              defense: 1.1,
              culture: 1.2,
            },
            burn_chances: 0.02,
            golden: "medieval",
            description:
              'Special building: <span class="text-special">Bazaar</span>. The Bazaar is a bank with +5 <i class="' +
              ug.gold +
              ' text-gold"></i> / trade route',
          },
          persians: {
            id: "persians",
            name: "Persians",
            name2: "Persian",
            color: "#f4e73a",
            color2: "#ae0601",
            vil_names: [
              "Persepolis",
              "Pasargadae",
              "Susa",
              "Ecbatana",
              "Tarsus",
              "Gordium",
              "Bactra",
              "Sardis",
              "Ergili",
              "Dariushkabir",
              "Ghulaman",
              "Zohak",
              "Istakhr",
              "Jinjan",
              "Borazjan",
              "Herat",
              "Dakyanus",
              "Bampur",
              "Turengtepe",
              "Rey",
              "Shiraz",
              "Tushpa",
              "Hasanlu",
              "Gabae",
              "Merv",
              "Behistun",
              "Kandahar",
              "Altintepe",
              "Bunyan",
              "Charsadda",
              "Uratyube",
              "Dura Europos",
              "Aleppo",
              "Qatna",
              "Kabul",
              "Capisa",
              "Kyreskhata",
              "Marakanda",
              "Peshawar",
              "Van",
              "Pteira",
              "Arshada",
              "Artakaona",
              "Aspabota",
              "Autiyara",
              "Bagastana",
              "Baxtri",
              "Darmasa",
              "Daphnai",
              "Drapsaka",
              "Eion",
              "Gandutava",
              "Gaugamela",
              "Harmozeia",
              "Ekatompylos",
              "Izata",
              "Kampada",
              "Kapisa",
              "Karmana",
              "Kounaxa",
              "Kuganaka",
              "Nautaka",
              "Paishiyauvada",
              "Patigrbana",
              "Phrada",
            ],
            starting_relations: 49,
            relation_decrease: 0.5,
            war_fatigue_ratio: 4e8,
            agressivity: 14,
            mult: {
              food: 1,
              gold: 1.1,
              science: 1.2,
              recruitment: 1,
              prod: 1,
              attack: 1,
              defense: 1.1,
              culture: 1.1,
            },
            burn_chances: 0.01,
            golden: "ancient",
            description:
              'Special unit: <span class="text-special">Immortal</span>. The Immortal is a cheaper lancier with +4 attack.',
          },
          portuguese: {
            id: "portuguese",
            name: "Portuguese",
            name2: "Portuguese",
            color: "#202e96",
            color2: "#ffffff",
            vil_names: [
              "Lisbon",
              "Porto",
              "Braga",
              "Coimbra",
              "Funchal",
              "Leiria",
              "Goa",
              "Vila Nova de Gaia",
              "Aveiro",
              "Luanda",
              "Evora",
              "Faro",
              "Castelo Branco",
              "Bissau",
              "Guarda",
              "Viseu",
              "Praia",
              "Braganza",
              "Beja",
              "Tomar",
              "Maputo",
              "Tavira",
              "Figueira da Foz",
              "Viana do Castelo",
              "S\xe3o Tom\xe9 and Pr\xedncipe",
              "Silves",
              "Sintra",
              "Dili",
              "Lamego",
              "Ponta Delgada",
            ],
            starting_relations: 50,
            relation_decrease: 0.3,
            war_fatigue_ratio: 3e8,
            agressivity: 12,
            mult: {
              food: 1.2,
              gold: 1.2,
              science: 1.2,
              recruitment: 1.1,
              prod: 1,
              attack: 1,
              defense: 1.1,
              culture: 1.1,
            },
            burn_chances: 0,
            golden: "renaissance",
            description:
              'Special unit: <span class="text-special">Nau</span>. The Nau is a cheaper caravel that is available with Education.',
          },
          romans: {
            id: "romans",
            name: "Romans",
            name2: "Roman",
            color: "#f2cc00",
            color2: "#3b0064",
            vil_names: [
              "Rome",
              "Antium",
              "Cumae",
              "Neapolis",
              "Ravenna",
              "Arretium",
              "Mediolanum",
              "Arpinum",
              "Circei",
              "Setia",
              "Satricum",
              "Ardea",
              "Ostia",
              "Velitrae",
              "Viroconium",
              "Tarentum",
              "Brundisium",
              "Caesaraugusta",
              "Caesarea",
              "Palmyra",
              "Signia",
              "Aquileia",
              "Clusium",
              "Sutrium",
              "Cremona",
              "Placentia",
              "Hispalis",
              "Artaxata",
              "Aurelianorum",
              "Nicopolis",
              "Londinium",
              "Eburacum",
              "Gordion",
              "Agrippina",
              "Lugdunum",
              "Verona",
              "Corfinium",
              "Treveri",
              "Sirmium",
              "Augustadorum",
              "Bagacum",
              "Lauriacum",
              "Teurnia",
              "Curia",
              "Fregellae",
              "Alba Fucens",
              "Sora",
              "Interrama",
              "Suessa",
              "Saticula",
              "Luceria",
              "Arminium",
              "Senagallica",
              "Castrum Novum",
              "Hadria",
              "Padua",
            ],
            starting_relations: 70,
            relation_decrease: 0.5,
            war_fatigue_ratio: 2e8,
            agressivity: 14,
            mult: {
              food: 1.1,
              gold: 1.1,
              science: 1.2,
              recruitment: 1.1,
              prod: 1.1,
              attack: 1.1,
              defense: 1.1,
              culture: 1,
            },
            burn_chances: 0,
            golden: "classical",
            description:
              'Special unit: <span class="text-special">Legion</span>. The Legion is a swordsman with +10 attack and +10 defense.',
          },
          russians: {
            id: "russians",
            name: "Russians",
            name2: "Russian",
            color: "#0d0d0d",
            color2: "#eeb200",
            vil_names: [
              "Moscow",
              "St. Petersburg",
              "Novgorod",
              "Rostov",
              "Yaroslavl",
              "Yekaterinburg",
              "Yakutsk",
              "Vladivostok",
              "Smolensk",
              "Orenburg",
              "Krasnoyarsk",
              "Khabarovsk",
              "Bryansk",
              "Tver",
              "Novosibirsk",
              "Magadan",
              "Murmansk",
              "Irkutsk",
              "Chita",
              "Samara",
              "Arkhangelsk",
              "Chelyabinsk",
              "Tobolsk",
              "Vologda",
              "Omsk",
              "Astrakhan",
              "Kursk",
              "Saratov",
              "Tula",
              "Vladimir",
              "Perm",
              "Voronezh",
              "Pskov",
              "Starayarussa",
              "Kostroma",
              "Nizhniy Novgorod",
              "Suzdal",
              "Magnitogorsk",
            ],
            starting_relations: 40,
            relation_decrease: 0.4,
            war_fatigue_ratio: 6e8,
            agressivity: 14,
            mult: {
              food: 1.3,
              gold: 1,
              science: 1.2,
              recruitment: 1.2,
              prod: 1.2,
              attack: 1,
              defense: 1.3,
              culture: 1.1,
            },
            burn_chances: 0.05,
            golden: "industrial",
            description:
              'Special unit: <span class="text-special">Cossack</span>. The Cossack is a cheaper cavalry with +20 attack.',
          },
          spanish: {
            id: "spanish",
            name: "Spanish",
            name2: "Spanish",
            color: "#fcd2d0",
            color2: "#3f1412",
            vil_names: [
              "Madrid",
              "Barcelona",
              "Seville",
              "Cordoba",
              "Toledo",
              "Santiago",
              "Salamanca",
              "Murcia",
              "Valencia",
              "Zaragoza",
              "Pamplona",
              "Vitoria",
              "Santander",
              "Oviedo",
              "Jaen",
              "Logro\xf1o",
              "Valladolid",
              "Palma",
              "Teruel",
              "Almeria",
              "Leon",
              "Zamora",
              "Mida",
              "Lugo",
              "Alicante",
              "C\xe1diz",
              "Elche",
              "Alcorcon",
              "Burgos",
              "Vigo",
              "Badajoz",
              "La Coru\xf1a",
              "Guadalquivir",
              "Bilbao",
              "San Sebastian",
              "Granada",
              "M\xe9rida",
              "Huelva",
              "Ibiza",
              "Las Palmas",
              "Tenerife",
            ],
            starting_relations: 50,
            relation_decrease: 0.4,
            war_fatigue_ratio: 2e8,
            agressivity: 14,
            mult: {
              food: 1.1,
              gold: 1.2,
              science: 1.2,
              recruitment: 1.2,
              prod: 1.1,
              attack: 1,
              defense: 1,
              culture: 1.2,
            },
            burn_chances: 0.05,
            golden: "renaissance",
            description:
              'Special unit: <span class="text-special">Conquistador</span>. The Conquistador is a cavalry that act as a ranged unit.',
          },
          vikings: {
            id: "vikings",
            name: "Vikings",
            name2: "Viking",
            color: "#fe8113",
            color2: "#790002",
            vil_names: [
              "Nidaros",
              "Uppsala",
              "Haithabu",
              "Birka",
              "Bjorgvin",
              "Jelling",
              "Roskilde",
              "Tonsberg",
              "Sigtuna",
              "Lodose",
              "Odense",
              "Oslo",
              "Ribe",
              "Lindholm",
              "Vasteras",
              "Aarhus",
              "Lund",
              "Kaupang",
              "Reykjavik",
              "Thingvellir",
              "Jorvik",
              "Lincoln",
              "Deoraby",
              "Stamford",
              "Dyflin",
              "Vadrejford",
              "Limerick",
              "Rowane",
              "Konugard",
              "Holmgard",
              "Aldeigjuborg",
              "Kirkjuvagr",
              "Tynwald",
              "Leirvik",
              "Tinganes",
              "Kirkjubour",
              "Brattahlid",
              "Vinland",
              "Thunderfall",
            ],
            starting_relations: 52,
            relation_decrease: 0.9,
            war_fatigue_ratio: 6e8,
            agressivity: 15,
            mult: {
              food: 1,
              gold: 1.1,
              science: 1,
              recruitment: 1.1,
              prod: 1,
              attack: 1.2,
              defense: 1,
              culture: 1,
            },
            burn_chances: 0.2,
            golden: "medieval",
            description:
              'Special unit: <span class="text-special">Berserker</span>. The Berserker is a longswordsman with +15 attack and +1 speed.',
          },
          zulus: {
            id: "zulus",
            name: "Zulus",
            name2: "Zulu",
            color: "#feeedf",
            color2: "#6f331a",
            vil_names: [
              "Ulundi",
              "Umgungundlovu",
              "Nobamba",
              "Bulawayo",
              "KwaDukuza",
              "Nongoma",
              "oNdini",
              "Nodwengu",
              "Ndonakusuka",
              "Babanango",
              "Khangela",
              "KwaHlomendlini",
              "Hlobane",
              "eThekwini",
              "Mlambongwenya",
              "Eziqwaqweni",
              "eMangweni",
              "Isiphezi",
              "Masotsheni",
              "Mtunzini",
              "Nyakamubi",
              "Dumazulu",
              "Hlatikulu",
              "Mthonjaneni",
              "Empangeni",
              "Pongola",
              "Tugela",
              "Kwamashu",
              "Ingwavuma",
              "Hluhluwe",
              "Matubatuba",
              "Mhlahlandlela",
              "Mthatha",
              "Maseru",
              "Lobamba",
              "Qunu",
            ],
            starting_relations: 52,
            relation_decrease: 1,
            war_fatigue_ratio: 6e8,
            agressivity: 15,
            mult: {
              food: 1,
              gold: 1,
              science: 0.9,
              recruitment: 1.2,
              prod: 1,
              attack: 1,
              defense: 1,
              culture: 1,
            },
            burn_chances: 0.1,
            golden: "classical",
            description:
              'Special unit: <span class="text-special">Impi</span>. The Impi is a cheaper pikeman with +20 attack.',
          },
        },
        kg = {
          science1: {
            name: "Science 1",
            desc:
              '<span class="text-science"><i class="' +
              ug.science +
              '"></i> +20%</span>',
            cost: 100,
          },
          health1: {
            name: "Health 1",
            desc:
              '<span class="text-health"><i class="' +
              ug.health +
              '"></i> +10%</span>',
            cost: 200,
          },
          happiness1: {
            name: "Happiness 1",
            desc:
              '<span class="text-happiness"><i class="' +
              ug.happiness +
              '"></i> +10%</span>',
            cost: 500,
          },
          gold1: {
            name: "Gold 1",
            desc:
              '<span class="text-gold"><i class="' +
              ug.gold +
              '"></i> +20%</span>',
            cost: 1e3,
          },
          speed1: {
            name: "Speed 1",
            desc: '<i class="' + ug.speed + '"></i>Speed +10%',
            cost: 2e3,
          },
          trade1: {
            name: "Trade 1",
            desc:
              '<span class="text-trade"><i class="' +
              ug.trade +
              '"></i> +1</span>',
            cost: 5e3,
          },
          tech1: {
            name: "Tech 1",
            desc: "Starts with Language & Dog Domestication",
            cost: 5e3,
          },
          science2: {
            name: "Science 2",
            desc:
              '<span class="text-science"><i class="' +
              ug.science +
              '"></i> +20%</span>',
            cost: 1e4,
          },
          health2: {
            name: "Health 2",
            desc:
              '<span class="text-health"><i class="' +
              ug.health +
              '"></i> +10%</span>',
            cost: 2e4,
          },
          happiness2: {
            name: "Happiness 2",
            desc:
              '<span class="text-happiness"><i class="' +
              ug.happiness +
              '"></i> +10%</span>',
            cost: 5e4,
          },
          gold2: {
            name: "Gold 2",
            desc:
              '<span class="text-gold"><i class="' +
              ug.gold +
              '"></i> +20%</span>',
            cost: 1e5,
          },
          speed2: {
            name: "Speed 2",
            desc: '<i class="' + ug.speed + '"></i>Speed +10%',
            cost: 2e5,
          },
          trade2: {
            name: "Trade 2",
            desc:
              '<span class="text-trade"><i class="' +
              ug.trade +
              '"></i> +1</span>',
            cost: 5e5,
          },
          tech2: {
            name: "Tech 2",
            desc: "Starts with Tanning & Pottery",
            cost: 5e5,
          },
        },
        Sg = [
          {
            name: "Drylands",
            terrains: [6, 3, 3, 4],
          },
          {
            name: "Grasslands",
            terrains: [3, 1, 1, 1, 4, 5],
          },
          {
            name: "Forests",
            terrains: [1, 2, 5, 5, 5],
          },
          {
            name: "Hills",
            terrains: [1, 5, 2, 2, 2],
          },
        ],
        Cg = {
          0: {
            id: 0,
            name: "Water",
            color: "#2c4f4a",
          },
          1: {
            id: 1,
            name: "Grassland",
            color: "#6a7535",
          },
          2: {
            id: 2,
            name: "Grassland Hills",
            color: "#6a7535",
          },
          3: {
            id: 3,
            name: "Plains",
            color: "#bda956",
          },
          4: {
            id: 4,
            name: "Plains Hills",
            color: "#bda956",
          },
          5: {
            id: 5,
            name: "Forest",
            color: "#394518",
          },
          6: {
            id: 6,
            name: "Desert",
            color: "#aa9368",
          },
        },
        Ig = {
          1: {
            id: 1,
            name: "Farm",
            description:
              '<span class="text-food"><i class="' +
              ug.food +
              '"></i> +1</span> / farmer',
            description2: "Can only be built on Grasslands & Plains (no hills)",
            terrains: [1, 3],
            require: "crop_rotation",
            time: 60,
            cost: 200,
            level: 1,
          },
          2: {
            id: 2,
            name: "Mechanized Farm",
            description:
              '<span class="text-food"><i class="' +
              ug.food +
              '"></i> +2</span> / farmer',
            description2: "Can only be built on Grasslands & Plains (no hills)",
            terrains: [1, 3],
            require: "sanitation",
            time: 300,
            cost: 2e5,
            level: 2,
          },
          3: {
            id: 3,
            name: "Mine",
            description:
              '<span class="text-prod"><i class="' +
              ug.prod +
              '"></i> +1</span> / builder',
            description2: "Can only be built on Hills",
            terrains: [2, 4],
            require: "bronze_working",
            time: 90,
            cost: 300,
            level: 1,
          },
          4: {
            id: 4,
            name: "Industrial Park",
            description:
              '<span class="text-prod"><i class="' +
              ug.prod +
              '"></i> +2</span> / builder',
            description2: "Can only be built on Hills",
            terrains: [2, 4],
            require: "electricity",
            time: 600,
            cost: 3e5,
            level: 2,
          },
          5: {
            id: 5,
            name: "Road",
            description:
              "Increase movements speed & trade route value when 2 cities are connected.<br/>Increase gold if city is connected to the capital.",
            terrains: [],
            require: "wheel",
            time: 60,
            cost: 50,
            road: !0,
            level: 1,
          },
          6: {
            id: 6,
            name: "Railroad",
            description:
              "Increase movements speed & trade route value when 2 cities are connected.<br/>Increase production if city is connected to the capital.",
            terrains: [],
            require: "railroad",
            time: 180,
            cost: 1e5,
            road: !0,
            level: 2,
          },
          7: {
            id: 7,
            name: "Trading Post",
            description:
              '<span class="text-gold"><i class="' +
              ug.gold +
              '"></i> +1</span> / merchant',
            description2: "Cannot be built on desert",
            terrains: [1, 2, 3, 4, 5],
            require: "mathematics",
            time: 150,
            cost: 1e4,
            level: 1,
          },
          8: {
            id: 8,
            name: "Forest Camp",
            description:
              '<span class="text-science"><i class="' +
              ug.science +
              '"></i> +1</span> / scholar',
            description2: "Can only be built on Forests",
            terrains: [5],
            require: "iron_working",
            time: 180,
            cost: 2e4,
            level: 1,
          },
        };
