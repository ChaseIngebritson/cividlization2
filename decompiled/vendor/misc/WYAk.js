// webpack module: WYAk
// size: 1276
function (l, n, e) {
                var t, i;
                l.exports = (t = e("Ib8C"), i = t.enc.Utf8, void(t.algo.HMAC = t.lib.Base.extend({
                    init: function (l, n) {
                        l = this._hasher = new l.init, "string" == typeof n && (n = i.parse(n));
                        var e = l.blockSize,
                            t = 4 * e;
                        n.sigBytes > t && (n = l.finalize(n)), n.clamp();
                        for (var s = this._oKey = n.clone(), u = this._iKey = n.clone(), r = s.words, a = u.words, o = 0; o < e; o++) r[o] ^= 1549556828, a[o] ^= 909522486;
                        s.sigBytes = u.sigBytes = t, this.reset()
                    },
                    reset: function () {
                        var l = this._hasher;
                        l.reset(), l.update(this._iKey)
                    },
                    update: function (l) {
                        return this._hasher.update(l), this
                    },
                    finalize: function (l) {
                        var n = this._hasher,
                            e = n.finalize(l);
                        return n.reset(), n.finalize(this._oKey.clone().concat(e))
                    }
                })))
            }
