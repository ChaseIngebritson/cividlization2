// webpack module: K3mO
// size: 1216
function (l, n, e) {
                var t, i, s, u, r, a, o;
                l.exports = (o = e("Ib8C"), e("3y9D"), e("WYAk"), u = (i = (t = o).lib).WordArray, a = (r = t.algo).EvpKDF = (s = i.Base).extend({
                    cfg: s.extend({
                        keySize: 4,
                        hasher: r.MD5,
                        iterations: 1
                    }),
                    init: function (l) {
                        this.cfg = this.cfg.extend(l)
                    },
                    compute: function (l, n) {
                        for (var e = this.cfg, t = e.hasher.create(), i = u.create(), s = i.words, r = e.keySize, a = e.iterations; s.length < r;) {
                            o && t.update(o);
                            var o = t.update(l).finalize(n);
                            t.reset();
                            for (var c = 1; c < a; c++) o = t.finalize(o), t.reset();
                            i.concat(o)
                        }
                        return i.sigBytes = 4 * r, i
                    }
                }), t.EvpKDF = function (l, n, e) {
                    return a.create(e).compute(l, n)
                }, o.EvpKDF)
            }
