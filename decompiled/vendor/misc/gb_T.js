// webpack module: gb/T
// size: 530
function (l, n, e) {
                var t, i;
                l.exports = (i = e("Ib8C"), e("OLod"), i.mode.ECB = ((t = i.lib.BlockCipherMode.extend()).Encryptor = t.extend({
                    processBlock: function (l, n) {
                        this._cipher.encryptBlock(l, n)
                    }
                }), t.Decryptor = t.extend({
                    processBlock: function (l, n) {
                        this._cipher.decryptBlock(l, n)
                    }
                }), t), i.mode.ECB)
            }
