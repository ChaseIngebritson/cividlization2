      class Ag {
        constructor(l, n, e, t, i, s, u = !1) {
          ((this.buildings = {}),
            (this.building_queue = []),
            (this.troops = {}),
            (this.troops_progress = {}),
            (this.troop_queue = []),
            (this.id = l),
            (this.capital = u),
            (this.name = n),
            (this.x = e),
            (this.y = t),
            (this.food = 0),
            (this.gold = 0),
            (this.bonus = ""),
            (this.ownerid = i),
            (this.rightful_ownerid = i),
            (this.citizens = {
              idle: 1,
              farmers: 0,
              builders: 0,
              merchants: 0,
              scientists: 0,
              artists: 0,
              priests: 0,
            }),
            (this.autoassign = s),
            (this.autoassign_options = {}),
            0 != i &&
              s &&
              (this.autoassign_options.priority = yg.fromArray([
                "farmers",
                "builders",
                "scientists",
                "merchants",
                "artists",
              ])));
        }
      }
