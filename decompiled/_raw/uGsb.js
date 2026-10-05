// webpack module: uGsb
// size: 919
function (l, n, e) {
                var t, i, s, u, r, a, o, c;
                l.exports = (c = e("Ib8C"), e("MlIO"), e("1uat"), s = (i = (t = c).x64).Word, u = i.WordArray, o = (r = t.algo).SHA384 = (a = r.SHA512).extend({
                    _doReset: function () {
                        this._hash = new u.init([new s.init(3418070365, 3238371032), new s.init(1654270250, 914150663), new s.init(2438529370, 812702999), new s.init(355462360, 4144912697), new s.init(1731405415, 4290775857), new s.init(2394180231, 1750603025), new s.init(3675008525, 1694076839), new s.init(1203062813, 3204075428)])
                    },
                    _doFinalize: function () {
                        var l = a._doFinalize.call(this);
                        return l.sigBytes -= 16, l
                    }
                }), t.SHA384 = a._createHelper(o), t.HmacSHA384 = a._createHmacHelper(o), c.SHA384)
            }
