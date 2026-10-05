// webpack module: KmYQ
// size: 571
function (l, n, e) {
                var t;
                l.exports = (t = e("Ib8C"), e("OLod"), t.pad.ZeroPadding = {
                    pad: function (l, n) {
                        var e = 4 * n;
                        l.clamp(), l.sigBytes += e - (l.sigBytes % e || e)
                    },
                    unpad: function (l) {
                        for (var n = l.words, e = l.sigBytes - 1; !(n[e >>> 2] >>> 24 - e % 4 * 8 & 255);) e--;
                        l.sigBytes = e + 1
                    }
                }, t.pad.ZeroPadding)
            }
