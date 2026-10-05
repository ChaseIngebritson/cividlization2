// @ts-nocheck
// Reverse-engineered from webpack module zUnb
// Original variable: wg
// City auto-assignment strategies
// Entries (~): 1
// Source range: 712147-715356
/** Reconstructed game data table (`autoassign`). Values may include runtime functions. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const autoassign: any = {
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
        for (e.citizens.priests = r; n.happiness(e, !0) < 0.2 && a; )
          e.citizens[o]++, a--, e.citizens.priests--;
        e.citizens.priests = 0;
      }
      if (n.hasPolicy("who", t.id)) {
        for (e.citizens.priests = r; n.health(e) < 0.2 && a; )
          e.citizens.scientists++, a--, e.citizens.priests--;
        e.citizens.priests = 0;
      }
      for (
        e.citizens.priests = r - e.citizens.artists;
        n.foodDiff(e) < 0 && a;

      )
        e.citizens[c]++, a--, e.citizens.priests--;
      if (((e.citizens.priests = 0), n.hasScience("trade", t)))
        for (; n.goldDiff(e) < 0 && a; ) e.citizens.merchants++, a--;
      if (u && s) {
        let l = s;
        "farmers" == l && (l = c),
          "artists" == l && (l = d),
          (e.citizens[l] += a),
          (a = 0);
      } else
        for (; a; ) {
          let l = a;
          "farmers" != s || i || (e.citizens[c]++, a--),
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
            l == a && ((e.citizens.idle += a), (a = 0));
        }
      for (let h in e.citizens) l.citizens[h] = e.citizens[h];
    },
  },
};
