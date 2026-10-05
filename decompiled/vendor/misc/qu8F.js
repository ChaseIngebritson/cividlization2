// webpack module: qu8F
// size: 1553
function (l, n, e) {
                var t;
                l.exports = (t = e("Ib8C"), e("OLod"), t.mode.CTRGladman = function () {
                    var l = t.lib.BlockCipherMode.extend();

                    function n(l) {
                        if (255 == (l >> 24 & 255)) {
                            var n = l >> 16 & 255,
                                e = l >> 8 & 255,
                                t = 255 & l;
                            255 === n ? (n = 0, 255 === e ? (e = 0, 255 === t ? t = 0 : ++t) : ++e) : ++n, l = 0, l += n << 16, l += e << 8, l += t
                        } else l += 1 << 24;
                        return l
                    }
                    var e = l.Encryptor = l.extend({
                        processBlock: function (l, e) {
                            var t = this._cipher,
                                i = t.blockSize,
                                s = this._iv,
                                u = this._counter;
                            s && (u = this._counter = s.slice(0), this._iv = void 0),
                                function (l) {
                                    0 === (l[0] = n(l[0])) && (l[1] = n(l[1]))
                                }(u);
                            var r = u.slice(0);
                            t.encryptBlock(r, 0);
                            for (var a = 0; a < i; a++) l[e + a] ^= r[a]
                        }
                    });
                    return l.Decryptor = e, l
                }(), t.mode.CTRGladman)
            }
