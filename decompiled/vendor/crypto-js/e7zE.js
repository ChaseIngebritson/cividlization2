// webpack module: e7zE
// size: 1414
function (l, n, e) {
                var t, i, s, u, r, a, o, c;
                l.exports = (c = e("Ib8C"), e("3y9D"), e("WYAk"), u = (i = (t = c).lib).WordArray, a = (r = t.algo).HMAC, o = r.PBKDF2 = (s = i.Base).extend({
                    cfg: s.extend({
                        keySize: 4,
                        hasher: r.SHA1,
                        iterations: 1
                    }),
                    init: function (l) {
                        this.cfg = this.cfg.extend(l)
                    },
                    compute: function (l, n) {
                        for (var e = this.cfg, t = a.create(e.hasher, l), i = u.create(), s = u.create([1]), r = i.words, o = s.words, c = e.keySize, d = e.iterations; r.length < c;) {
                            var h = t.update(n).finalize(s);
                            t.reset();
                            for (var p = h.words, f = p.length, g = h, m = 1; m < d; m++) {
                                g = t.finalize(g), t.reset();
                                for (var y = g.words, v = 0; v < f; v++) p[v] ^= y[v]
                            }
                            i.concat(h), o[0]++
                        }
                        return i.sigBytes = 4 * c, i
                    }
                }), t.PBKDF2 = function (l, n, e) {
                    return o.create(e).compute(l, n)
                }, c.PBKDF2)
            }
