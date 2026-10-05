// webpack module: ALsQ
// size: 1344
function (l, n, e) {
                var t;
                l.exports = (t = e("Ib8C"), e("OLod"), t.mode.CFB = function () {
                    var l = t.lib.BlockCipherMode.extend();

                    function n(l, n, e, t) {
                        var i = this._iv;
                        if (i) {
                            var s = i.slice(0);
                            this._iv = void 0
                        } else s = this._prevBlock;
                        t.encryptBlock(s, 0);
                        for (var u = 0; u < e; u++) l[n + u] ^= s[u]
                    }
                    return l.Encryptor = l.extend({
                        processBlock: function (l, e) {
                            var t = this._cipher,
                                i = t.blockSize;
                            n.call(this, l, e, i, t), this._prevBlock = l.slice(e, e + i)
                        }
                    }), l.Decryptor = l.extend({
                        processBlock: function (l, e) {
                            var t = this._cipher,
                                i = t.blockSize,
                                s = l.slice(e, e + i);
                            n.call(this, l, e, i, t), this._prevBlock = s
                        }
                    }), l
                }(), t.mode.CFB)
            }
