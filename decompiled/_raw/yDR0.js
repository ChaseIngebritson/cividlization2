// webpack module: yDR0
// size: 520
function (l, n, e) {
                "use strict";
                l.exports = function (l, n, e, t) {
                    for (var i = 65535 & l | 0, s = l >>> 16 & 65535 | 0, u = 0; 0 !== e;) {
                        e -= u = e > 2e3 ? 2e3 : e;
                        do {
                            s = s + (i = i + n[t++] | 0) | 0
                        } while (--u);
                        i %= 65521, s %= 65521
                    }
                    return i | s << 16 | 0
                }
            }
