// webpack module: 7tol
// size: 679
function (l, n, e) {
                "use strict";
                var t = function () {
                    for (var l, n = [], e = 0; e < 256; e++) {
                        l = e;
                        for (var t = 0; t < 8; t++) l = 1 & l ? 3988292384 ^ l >>> 1 : l >>> 1;
                        n[e] = l
                    }
                    return n
                }();
                l.exports = function (l, n, e, i) {
                    var s = t,
                        u = i + e;
                    l ^= -1;
                    for (var r = i; r < u; r++) l = l >>> 8 ^ s[255 & (l ^ n[r])];
                    return -1 ^ l
                }
            }
