// webpack module: qBft
// size: 631
function (l, n, e) {
                var t;
                l.exports = (t = e("Ib8C"), e("OLod"), t.pad.AnsiX923 = {
                    pad: function (l, n) {
                        var e = l.sigBytes,
                            t = 4 * n,
                            i = t - e % t,
                            s = e + i - 1;
                        l.clamp(), l.words[s >>> 2] |= i << 24 - s % 4 * 8, l.sigBytes += i
                    },
                    unpad: function (l) {
                        l.sigBytes -= 255 & l.words[l.sigBytes - 1 >>> 2]
                    }
                }, t.pad.Ansix923)
            }
