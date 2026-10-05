// webpack module: 9OqN
// size: 773
function (l, n, e) {
                var t, i, s;
                l.exports = (s = e("Ib8C"), e("OLod"), s.mode.CTR = (i = (t = s.lib.BlockCipherMode.extend()).Encryptor = t.extend({
                    processBlock: function (l, n) {
                        var e = this._cipher,
                            t = e.blockSize,
                            i = this._iv,
                            s = this._counter;
                        i && (s = this._counter = i.slice(0), this._iv = void 0);
                        var u = s.slice(0);
                        e.encryptBlock(u, 0), s[t - 1] = s[t - 1] + 1 | 0;
                        for (var r = 0; r < t; r++) l[n + r] ^= u[r]
                    }
                }), t.Decryptor = i, t), s.mode.CTR)
            }
