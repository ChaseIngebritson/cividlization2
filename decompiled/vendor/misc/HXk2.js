// webpack module: HXk2
// size: 4837
function (l, n, e) {
                var t, i;
                void 0 === (i = "function" == typeof (t = function () {
                    "use strict";
                    var n = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof global && global.global === global ? global : void 0;

                    function e(l, n, e) {
                        var t = new XMLHttpRequest;
                        t.open("GET", l), t.responseType = "blob", t.onload = function () {
                            s(t.response, n, e)
                        }, t.onerror = function () {
                            console.error("could not download file")
                        }, t.send()
                    }

                    function t(l) {
                        var n = new XMLHttpRequest;
                        n.open("HEAD", l, !1);
                        try {
                            n.send()
                        } catch (e) {}
                        return n.status >= 200 && n.status <= 299
                    }

                    function i(l) {
                        try {
                            l.dispatchEvent(new MouseEvent("click"))
                        } catch (e) {
                            var n = document.createEvent("MouseEvents");
                            n.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), l.dispatchEvent(n)
                        }
                    }
                    var s = n.saveAs || ("object" != typeof window || window !== n ? function () {} : "download" in HTMLAnchorElement.prototype ? function (l, s, u) {
                        var r = n.URL || n.webkitURL,
                            a = document.createElement("a");
                        a.download = s = s || l.name || "download", a.rel = "noopener", "string" == typeof l ? (a.href = l, a.origin !== location.origin ? t(a.href) ? e(l, s, u) : i(a, a.target = "_blank") : i(a)) : (a.href = r.createObjectURL(l), setTimeout((function () {
                            r.revokeObjectURL(a.href)
                        }), 4e4), setTimeout((function () {
                            i(a)
                        }), 0))
                    } : "msSaveOrOpenBlob" in navigator ? function (l, n, s) {
                        if (n = n || l.name || "download", "string" == typeof l)
                            if (t(l)) e(l, n, s);
                            else {
                                var u = document.createElement("a");
                                u.href = l, u.target = "_blank", setTimeout((function () {
                                    i(u)
                                }))
                            }
                        else navigator.msSaveOrOpenBlob(function (l, n) {
                            return void 0 === n ? n = {
                                autoBom: !1
                            } : "object" != typeof n && (console.warn("Deprecated: Expected third argument to be a object"), n = {
                                autoBom: !n
                            }), n.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(l.type) ? new Blob([String.fromCharCode(65279), l], {
                                type: l.type
                            }) : l
                        }(l, s), n)
                    } : function (l, t, i, s) {
                        if ((s = s || open("", "_blank")) && (s.document.title = s.document.body.innerText = "downloading..."), "string" == typeof l) return e(l, t, i);
                        var u = "application/octet-stream" === l.type,
                            r = /constructor/i.test(n.HTMLElement) || n.safari,
                            a = /CriOS\/[\d]+/.test(navigator.userAgent);
                        if ((a || u && r) && "object" == typeof FileReader) {
                            var o = new FileReader;
                            o.onloadend = function () {
                                var l = o.result;
                                l = a ? l : l.replace(/^data:[^;]*;/, "data:attachment/file;"), s ? s.location.href = l : location = l, s = null
                            }, o.readAsDataURL(l)
                        } else {
                            var c = n.URL || n.webkitURL,
                                d = c.createObjectURL(l);
                            s ? s.location = d : location.href = d, s = null, setTimeout((function () {
                                c.revokeObjectURL(d)
                            }), 4e4)
                        }
                    });
                    n.saveAs = s.saveAs = s, l.exports = s
                }) ? t.apply(n, []) : t) || (l.exports = i)
            }
