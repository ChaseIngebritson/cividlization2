// webpack module: vn/o
// size: 2274
function (l, n, e) {
                "use strict";
                var t = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;

                function i(l, n) {
                    return Object.prototype.hasOwnProperty.call(l, n)
                }
                n.assign = function (l) {
                    for (var n = Array.prototype.slice.call(arguments, 1); n.length;) {
                        var e = n.shift();
                        if (e) {
                            if ("object" != typeof e) throw new TypeError(e + "must be non-object");
                            for (var t in e) i(e, t) && (l[t] = e[t])
                        }
                    }
                    return l
                }, n.shrinkBuf = function (l, n) {
                    return l.length === n ? l : l.subarray ? l.subarray(0, n) : (l.length = n, l)
                };
                var s = {
                        arraySet: function (l, n, e, t, i) {
                            if (n.subarray && l.subarray) l.set(n.subarray(e, e + t), i);
                            else
                                for (var s = 0; s < t; s++) l[i + s] = n[e + s]
                        },
                        flattenChunks: function (l) {
                            var n, e, t, i, s, u;
                            for (t = 0, n = 0, e = l.length; n < e; n++) t += l[n].length;
                            for (u = new Uint8Array(t), i = 0, n = 0, e = l.length; n < e; n++) u.set(s = l[n], i), i += s.length;
                            return u
                        }
                    },
                    u = {
                        arraySet: function (l, n, e, t, i) {
                            for (var s = 0; s < t; s++) l[i + s] = n[e + s]
                        },
                        flattenChunks: function (l) {
                            return [].concat.apply([], l)
                        }
                    };
                n.setTyped = function (l) {
                    l ? (n.Buf8 = Uint8Array, n.Buf16 = Uint16Array, n.Buf32 = Int32Array, n.assign(n, s)) : (n.Buf8 = Array, n.Buf16 = Array, n.Buf32 = Array, n.assign(n, u))
                }, n.setTyped(t)
            }
