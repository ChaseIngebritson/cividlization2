// webpack module: S6kV
// size: 680
function (l, n, e) {
                var t, i, s;
                l.exports = (s = e("Ib8C"), e("OLod"), s.mode.OFB = (i = (t = s.lib.BlockCipherMode.extend()).Encryptor = t.extend({
                    processBlock: function (l, n) {
                        var e = this._cipher,
                            t = e.blockSize,
                            i = this._iv,
                            s = this._keystream;
                        i && (s = this._keystream = i.slice(0), this._iv = void 0), e.encryptBlock(s, 0);
                        for (var u = 0; u < t; u++) l[n + u] ^= s[u]
                    }
                }), t.Decryptor = i, t), s.mode.OFB)
            }
