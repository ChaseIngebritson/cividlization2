      class Eg {
        constructor(l, n) {
          ((this.cities = []),
            (this.science_queue = []),
            (this.civ_cities = 1),
            (this.id = l++),
            (this.name = n),
            (this.civ_id = ""),
            (this.culture = 0),
            (this.faith = 0),
            (this.progress = 0),
            (this.sciences = {}),
            (this.policies = {
              groups: [],
              policies: [],
            }),
            (this.orientation = -75),
            (this.powers = {}),
            (this.deity = ""),
            (this.appreciation = {}),
            (this.influence = {}),
            (this.promotion_cooldown = {}),
            (this.discovered = []));
        }
      }
