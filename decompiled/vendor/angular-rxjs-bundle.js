// Angular + RxJS runtime extracted from zUnb (before game data)
// Size: 553003
// This is framework vendor code, not game logic.

// webpack module: zUnb
// size: 2081920
function (l, n, e) {
                "use strict";

                function t(l) {
                    return "function" == typeof l
                }
                e.r(n);
                let i = !1;
                const s = {
                    Promise: void 0,
                    set useDeprecatedSynchronousErrorHandling(l) {
                        if (l) {
                            const l = new Error;
                            console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" + l.stack)
                        } else i && console.log("RxJS: Back to a better error behavior. Thank you. <3");
                        i = l
                    },
                    get useDeprecatedSynchronousErrorHandling() {
                        return i
                    }
                };

                function u(l) {
                    setTimeout(() => {
                        throw l
                    })
                }
                const r = {
                        closed: !0,
                        next(l) {},
                        error(l) {
                            if (s.useDeprecatedSynchronousErrorHandling) throw l;
                            u(l)
                        },
                        complete() {}
                    },
                    a = Array.isArray || (l => l && "number" == typeof l.length);

                function o(l) {
                    return null !== l && "object" == typeof l
                }

                function c(l) {
                    return Error.call(this), this.message = l ? `${l.length} errors occurred during unsubscription:\n${l.map((l,n)=>`${n+1}) ${l.toString()}`).join("\n  ")}` : "", this.name = "UnsubscriptionError", this.errors = l, this
                }
                c.prototype = Object.create(Error.prototype);
                const d = c;
                let h = (() => {
                    class l {
                        constructor(l) {
                            this.closed = !1, this._parent = null, this._parents = null, this._subscriptions = null, l && (this._unsubscribe = l)
                        }
                        unsubscribe() {
                            let l, n = !1;
                            if (this.closed) return;
                            let {
                                _parent: e,
                                _parents: i,
                                _unsubscribe: s,
                                _subscriptions: u
                            } = this;
                            this.closed = !0, this._parent = null, this._parents = null, this._subscriptions = null;
                            let r = -1,
                                c = i ? i.length : 0;
                            for (; e;) e.remove(this), e = ++r < c && i[r] || null;
                            if (t(s)) try {
                                s.call(this)
                            } catch (h) {
                                n = !0, l = h instanceof d ? p(h.errors) : [h]
                            }
                            if (a(u))
                                for (r = -1, c = u.length; ++r < c;) {
                                    const e = u[r];
                                    if (o(e)) try {
                                        e.unsubscribe()
                                    } catch (h) {
                                        n = !0, l = l || [], h instanceof d ? l = l.concat(p(h.errors)) : l.push(h)
                                    }
                                }
                            if (n) throw new d(l)
                        }
                        add(n) {
                            let e = n;
                            switch (typeof n) {
                                case "function":
                                    e = new l(n);
                                case "object":
                                    if (e === this || e.closed || "function" != typeof e.unsubscribe) return e;
                                    if (this.closed) return e.unsubscribe(), e;
                                    if (!(e instanceof l)) {
                                        const n = e;
                                        (e = new l)._subscriptions = [n]
                                    }
                                    break;
                                default:
                                    if (!n) return l.EMPTY;
                                    throw new Error("unrecognized teardown " + n + " added to Subscription.")
                            }
                            if (e._addParent(this)) {
                                const l = this._subscriptions;
                                l ? l.push(e) : this._subscriptions = [e]
                            }
                            return e
                        }
                        remove(l) {
                            const n = this._subscriptions;
                            if (n) {
                                const e = n.indexOf(l); - 1 !== e && n.splice(e, 1)
                            }
                        }
                        _addParent(l) {
                            let {
                                _parent: n,
                                _parents: e
                            } = this;
                            return n !== l && (n ? e ? -1 === e.indexOf(l) && (e.push(l), !0) : (this._parents = [l], !0) : (this._parent = l, !0))
                        }
                    }
                    return l.EMPTY = function (l) {
                        return l.closed = !0, l
                    }(new l), l
                })();

                function p(l) {
                    return l.reduce((l, n) => l.concat(n instanceof d ? n.errors : n), [])
                }
                const f = "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random();
                class g extends h {
                    constructor(l, n, e) {
                        switch (super(), this.syncErrorValue = null, this.syncErrorThrown = !1, this.syncErrorThrowable = !1, this.isStopped = !1, arguments.length) {
                            case 0:
                                this.destination = r;
                                break;
                            case 1:
                                if (!l) {
                                    this.destination = r;
                                    break
                                }
                                if ("object" == typeof l) {
                                    l instanceof g ? (this.syncErrorThrowable = l.syncErrorThrowable, this.destination = l, l.add(this)) : (this.syncErrorThrowable = !0, this.destination = new m(this, l));
                                    break
                                }
                            default:
                                this.syncErrorThrowable = !0, this.destination = new m(this, l, n, e)
                        }
                    } [f]() {
                        return this
                    }
                    static create(l, n, e) {
                        const t = new g(l, n, e);
                        return t.syncErrorThrowable = !1, t
                    }
                    next(l) {
                        this.isStopped || this._next(l)
                    }
                    error(l) {
                        this.isStopped || (this.isStopped = !0, this._error(l))
                    }
                    complete() {
                        this.isStopped || (this.isStopped = !0, this._complete())
                    }
                    unsubscribe() {
                        this.closed || (this.isStopped = !0, super.unsubscribe())
                    }
                    _next(l) {
                        this.destination.next(l)
                    }
                    _error(l) {
                        this.destination.error(l), this.unsubscribe()
                    }
                    _complete() {
                        this.destination.complete(), this.unsubscribe()
                    }
                    _unsubscribeAndRecycle() {
                        const {
                            _parent: l,
                            _parents: n
                        } = this;
                        return this._parent = null, this._parents = null, this.unsubscribe(), this.closed = !1, this.isStopped = !1, this._parent = l, this._parents = n, this
                    }
                }
                class m extends g {
                    constructor(l, n, e, i) {
                        let s;
                        super(), this._parentSubscriber = l;
                        let u = this;
                        t(n) ? s = n : n && (s = n.next, e = n.error, i = n.complete, n !== r && (t((u = Object.create(n)).unsubscribe) && this.add(u.unsubscribe.bind(u)), u.unsubscribe = this.unsubscribe.bind(this))), this._context = u, this._next = s, this._error = e, this._complete = i
                    }
                    next(l) {
                        if (!this.isStopped && this._next) {
                            const {
                                _parentSubscriber: n
                            } = this;
                            s.useDeprecatedSynchronousErrorHandling && n.syncErrorThrowable ? this.__tryOrSetError(n, this._next, l) && this.unsubscribe() : this.__tryOrUnsub(this._next, l)
                        }
                    }
                    error(l) {
                        if (!this.isStopped) {
                            const {
                                _parentSubscriber: n
                            } = this, {
                                useDeprecatedSynchronousErrorHandling: e
                            } = s;
                            if (this._error) e && n.syncErrorThrowable ? (this.__tryOrSetError(n, this._error, l), this.unsubscribe()) : (this.__tryOrUnsub(this._error, l), this.unsubscribe());
                            else if (n.syncErrorThrowable) e ? (n.syncErrorValue = l, n.syncErrorThrown = !0) : u(l), this.unsubscribe();
                            else {
                                if (this.unsubscribe(), e) throw l;
                                u(l)
                            }
                        }
                    }
                    complete() {
                        if (!this.isStopped) {
                            const {
                                _parentSubscriber: l
                            } = this;
                            if (this._complete) {
                                const n = () => this._complete.call(this._context);
                                s.useDeprecatedSynchronousErrorHandling && l.syncErrorThrowable ? (this.__tryOrSetError(l, n), this.unsubscribe()) : (this.__tryOrUnsub(n), this.unsubscribe())
                            } else this.unsubscribe()
                        }
                    }
                    __tryOrUnsub(l, n) {
                        try {
                            l.call(this._context, n)
                        } catch (e) {
                            if (this.unsubscribe(), s.useDeprecatedSynchronousErrorHandling) throw e;
                            u(e)
                        }
                    }
                    __tryOrSetError(l, n, e) {
                        if (!s.useDeprecatedSynchronousErrorHandling) throw new Error("bad call");
                        try {
                            n.call(this._context, e)
                        } catch (t) {
                            return s.useDeprecatedSynchronousErrorHandling ? (l.syncErrorValue = t, l.syncErrorThrown = !0, !0) : (u(t), !0)
                        }
                        return !1
                    }
                    _unsubscribe() {
                        const {
                            _parentSubscriber: l
                        } = this;
                        this._context = null, this._parentSubscriber = null, l.unsubscribe()
                    }
                }
                const y = "function" == typeof Symbol && Symbol.observable || "@@observable";

                function v() {}

                function b(...l) {
                    return _(l)
                }

                function _(l) {
                    return l ? 1 === l.length ? l[0] : function (n) {
                        return l.reduce((l, n) => n(l), n)
                    } : v
                }
                let w = (() => {
                    class l {
                        constructor(l) {
                            this._isScalar = !1, l && (this._subscribe = l)
                        }
                        lift(n) {
                            const e = new l;
                            return e.source = this, e.operator = n, e
                        }
                        subscribe(l, n, e) {
                            const {
                                operator: t
                            } = this, i = function (l, n, e) {
                                if (l) {
                                    if (l instanceof g) return l;
                                    if (l[f]) return l[f]()
                                }
                                return l || n || e ? new g(l, n, e) : new g(r)
                            }(l, n, e);
                            if (i.add(t ? t.call(i, this.source) : this.source || s.useDeprecatedSynchronousErrorHandling && !i.syncErrorThrowable ? this._subscribe(i) : this._trySubscribe(i)), s.useDeprecatedSynchronousErrorHandling && i.syncErrorThrowable && (i.syncErrorThrowable = !1, i.syncErrorThrown)) throw i.syncErrorValue;
                            return i
                        }
                        _trySubscribe(l) {
                            try {
                                return this._subscribe(l)
                            } catch (n) {
                                s.useDeprecatedSynchronousErrorHandling && (l.syncErrorThrown = !0, l.syncErrorValue = n),
                                    function (l) {
                                        for (; l;) {
                                            const {
                                                closed: n,
                                                destination: e,
                                                isStopped: t
                                            } = l;
                                            if (n || t) return !1;
                                            l = e && e instanceof g ? e : null
                                        }
                                        return !0
                                    }(l) ? l.error(n) : console.warn(n)
                            }
                        }
                        forEach(l, n) {
                            return new(n = x(n))((n, e) => {
                                let t;
                                t = this.subscribe(n => {
                                    try {
                                        l(n)
                                    } catch (i) {
                                        e(i), t && t.unsubscribe()
                                    }
                                }, e, n)
                            })
                        }
                        _subscribe(l) {
                            const {
                                source: n
                            } = this;
                            return n && n.subscribe(l)
                        } [y]() {
                            return this
                        }
                        pipe(...l) {
                            return 0 === l.length ? this : _(l)(this)
                        }
                        toPromise(l) {
                            return new(l = x(l))((l, n) => {
                                let e;
                                this.subscribe(l => e = l, l => n(l), () => l(e))
                            })
                        }
                    }
                    return l.create = n => new l(n), l
                })();

                function x(l) {
                    if (l || (l = s.Promise || Promise), !l) throw new Error("no Promise impl found");
                    return l
                }

                function k() {
                    return Error.call(this), this.message = "object unsubscribed", this.name = "ObjectUnsubscribedError", this
                }
                k.prototype = Object.create(Error.prototype);
                const S = k;
                class C extends h {
                    constructor(l, n) {
                        super(), this.subject = l, this.subscriber = n, this.closed = !1
                    }
                    unsubscribe() {
                        if (this.closed) return;
                        this.closed = !0;
                        const l = this.subject,
                            n = l.observers;
                        if (this.subject = null, !n || 0 === n.length || l.isStopped || l.closed) return;
                        const e = n.indexOf(this.subscriber); - 1 !== e && n.splice(e, 1)
                    }
                }
                class I extends g {
                    constructor(l) {
                        super(l), this.destination = l
                    }
                }
                let T = (() => {
                    class l extends w {
                        constructor() {
                            super(), this.observers = [], this.closed = !1, this.isStopped = !1, this.hasError = !1, this.thrownError = null
                        } [f]() {
                            return new I(this)
                        }
                        lift(l) {
                            const n = new E(this, this);
                            return n.operator = l, n
                        }
                        next(l) {
                            if (this.closed) throw new S;
                            if (!this.isStopped) {
                                const {
                                    observers: n
                                } = this, e = n.length, t = n.slice();
                                for (let i = 0; i < e; i++) t[i].next(l)
                            }
                        }
                        error(l) {
                            if (this.closed) throw new S;
                            this.hasError = !0, this.thrownError = l, this.isStopped = !0;
                            const {
                                observers: n
                            } = this, e = n.length, t = n.slice();
                            for (let i = 0; i < e; i++) t[i].error(l);
                            this.observers.length = 0
                        }
                        complete() {
                            if (this.closed) throw new S;
                            this.isStopped = !0;
                            const {
                                observers: l
                            } = this, n = l.length, e = l.slice();
                            for (let t = 0; t < n; t++) e[t].complete();
                            this.observers.length = 0
                        }
                        unsubscribe() {
                            this.isStopped = !0, this.closed = !0, this.observers = null
                        }
                        _trySubscribe(l) {
                            if (this.closed) throw new S;
                            return super._trySubscribe(l)
                        }
                        _subscribe(l) {
                            if (this.closed) throw new S;
                            return this.hasError ? (l.error(this.thrownError), h.EMPTY) : this.isStopped ? (l.complete(), h.EMPTY) : (this.observers.push(l), new C(this, l))
                        }
                        asObservable() {
                            const l = new w;
                            return l.source = this, l
                        }
                    }
                    return l.create = (l, n) => new E(l, n), l
                })();
                class E extends T {
                    constructor(l, n) {
                        super(), this.destination = l, this.source = n
                    }
                    next(l) {
                        const {
                            destination: n
                        } = this;
                        n && n.next && n.next(l)
                    }
                    error(l) {
                        const {
                            destination: n
                        } = this;
                        n && n.error && this.destination.error(l)
                    }
                    complete() {
                        const {
                            destination: l
                        } = this;
                        l && l.complete && this.destination.complete()
                    }
                    _subscribe(l) {
                        const {
                            source: n
                        } = this;
                        return n ? this.source.subscribe(l) : h.EMPTY
                    }
                }

                function A(l) {
                    return l && "function" == typeof l.schedule
                }
                class P extends g {
                    constructor(l, n, e) {
                        super(), this.parent = l, this.outerValue = n, this.outerIndex = e, this.index = 0
                    }
                    _next(l) {
                        this.parent.notifyNext(this.outerValue, l, this.outerIndex, this.index++, this)
                    }
                    _error(l) {
                        this.parent.notifyError(l, this), this.unsubscribe()
                    }
                    _complete() {
                        this.parent.notifyComplete(this), this.unsubscribe()
                    }
                }
                const D = l => n => {
                        for (let e = 0, t = l.length; e < t && !n.closed; e++) n.next(l[e]);
                        n.closed || n.complete()
                    },
                    M = l => n => (l.then(l => {
                        n.closed || (n.next(l), n.complete())
                    }, l => n.error(l)).then(null, u), n);

                function O() {
                    return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
                }
                const N = O(),
                    R = l => n => {
                        const e = l[N]();
                        for (;;) {
                            const l = e.next();
                            if (l.done) {
                                n.complete();
                                break
                            }
                            if (n.next(l.value), n.closed) break
                        }
                        return "function" == typeof e.return && n.add(() => {
                            e.return && e.return()
                        }), n
                    },
                    B = l => n => {
                        const e = l[y]();
                        if ("function" != typeof e.subscribe) throw new TypeError("Provided object does not correctly implement Symbol.observable");
                        return e.subscribe(n)
                    },
                    z = l => l && "number" == typeof l.length && "function" != typeof l;

                function $(l) {
                    return !!l && "function" != typeof l.subscribe && "function" == typeof l.then
                }
                const L = l => {
                    if (l instanceof w) return n => l._isScalar ? (n.next(l.value), void n.complete()) : l.subscribe(n);
                    if (l && "function" == typeof l[y]) return B(l);
                    if (z(l)) return D(l);
                    if ($(l)) return M(l);
                    if (l && "function" == typeof l[N]) return R(l); {
                        const n = o(l) ? "an invalid object" : `'${l}'`;
                        throw new TypeError(`You provided ${n} where a stream was expected.` + " You can provide an Observable, Promise, Array, or Iterable.")
                    }
                };

                function F(l, n, e, t, i = new P(l, e, t)) {
                    if (!i.closed) return L(n)(i)
                }
                class q extends g {
                    notifyNext(l, n, e, t, i) {
                        this.destination.next(n)
                    }
                    notifyError(l, n) {
                        this.destination.error(l)
                    }
                    notifyComplete(l) {
                        this.destination.complete()
                    }
                }

                function U(l, n) {
                    return function (e) {
                        if ("function" != typeof l) throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
                        return e.lift(new H(l, n))
                    }
                }
                class H {
                    constructor(l, n) {
                        this.project = l, this.thisArg = n
                    }
                    call(l, n) {
                        return n.subscribe(new V(l, this.project, this.thisArg))
                    }
                }
                class V extends g {
                    constructor(l, n, e) {
                        super(l), this.project = n, this.count = 0, this.thisArg = e || this
                    }
                    _next(l) {
                        let n;
                        try {
                            n = this.project.call(this.thisArg, l, this.count++)
                        } catch (e) {
                            return void this.destination.error(e)
                        }
                        this.destination.next(n)
                    }
                }

                function j(l, n) {
                    return new w(n ? e => {
                        const t = new h;
                        let i = 0;
                        return t.add(n.schedule((function () {
                            i !== l.length ? (e.next(l[i++]), e.closed || t.add(this.schedule())) : e.complete()
                        }))), t
                    } : D(l))
                }

                function G(l, n) {
                    if (!n) return l instanceof w ? l : new w(L(l));
                    if (null != l) {
                        if (function (l) {
                                return l && "function" == typeof l[y]
                            }(l)) return function (l, n) {
                            return new w(n ? e => {
                                const t = new h;
                                return t.add(n.schedule(() => {
                                    const i = l[y]();
                                    t.add(i.subscribe({
                                        next(l) {
                                            t.add(n.schedule(() => e.next(l)))
                                        },
                                        error(l) {
                                            t.add(n.schedule(() => e.error(l)))
                                        },
                                        complete() {
                                            t.add(n.schedule(() => e.complete()))
                                        }
                                    }))
                                })), t
                            } : B(l))
                        }(l, n);
                        if ($(l)) return function (l, n) {
                            return new w(n ? e => {
                                const t = new h;
                                return t.add(n.schedule(() => l.then(l => {
                                    t.add(n.schedule(() => {
                                        e.next(l), t.add(n.schedule(() => e.complete()))
                                    }))
                                }, l => {
                                    t.add(n.schedule(() => e.error(l)))
                                }))), t
                            } : M(l))
                        }(l, n);
                        if (z(l)) return j(l, n);
                        if (function (l) {
                                return l && "function" == typeof l[N]
                            }(l) || "string" == typeof l) return function (l, n) {
                            if (!l) throw new Error("Iterable cannot be null");
                            return new w(n ? e => {
                                const t = new h;
                                let i;
                                return t.add(() => {
                                    i && "function" == typeof i.return && i.return()
                                }), t.add(n.schedule(() => {
                                    i = l[N](), t.add(n.schedule((function () {
                                        if (e.closed) return;
                                        let l, n;
                                        try {
                                            const e = i.next();
                                            l = e.value, n = e.done
                                        } catch (t) {
                                            return void e.error(t)
                                        }
                                        n ? e.complete() : (e.next(l), this.schedule())
                                    })))
                                })), t
                            } : R(l))
                        }(l, n)
                    }
                    throw new TypeError((null !== l && typeof l || l) + " is not observable")
                }

                function W(l, n, e = Number.POSITIVE_INFINITY) {
                    return "function" == typeof n ? t => t.pipe(W((e, t) => G(l(e, t)).pipe(U((l, i) => n(e, l, t, i))), e)) : ("number" == typeof n && (e = n), n => n.lift(new K(l, e)))
                }
                class K {
                    constructor(l, n = Number.POSITIVE_INFINITY) {
                        this.project = l, this.concurrent = n
                    }
                    call(l, n) {
                        return n.subscribe(new Z(l, this.project, this.concurrent))
                    }
                }
                class Z extends q {
                    constructor(l, n, e = Number.POSITIVE_INFINITY) {
                        super(l), this.project = n, this.concurrent = e, this.hasCompleted = !1, this.buffer = [], this.active = 0, this.index = 0
                    }
                    _next(l) {
                        this.active < this.concurrent ? this._tryNext(l) : this.buffer.push(l)
                    }
                    _tryNext(l) {
                        let n;
                        const e = this.index++;
                        try {
                            n = this.project(l, e)
                        } catch (t) {
                            return void this.destination.error(t)
                        }
                        this.active++, this._innerSub(n, l, e)
                    }
                    _innerSub(l, n, e) {
                        const t = new P(this, void 0, void 0);
                        this.destination.add(t), F(this, l, n, e, t)
                    }
                    _complete() {
                        this.hasCompleted = !0, 0 === this.active && 0 === this.buffer.length && this.destination.complete(), this.unsubscribe()
                    }
                    notifyNext(l, n, e, t, i) {
                        this.destination.next(n)
                    }
                    notifyComplete(l) {
                        const n = this.buffer;
                        this.remove(l), this.active--, n.length > 0 ? this._next(n.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete()
                    }
                }

                function Q(l) {
                    return l
                }

                function Y(l = Number.POSITIVE_INFINITY) {
                    return W(Q, l)
                }

                function X(...l) {
                    let n = Number.POSITIVE_INFINITY,
                        e = null,
                        t = l[l.length - 1];
                    return A(t) ? (e = l.pop(), l.length > 1 && "number" == typeof l[l.length - 1] && (n = l.pop())) : "number" == typeof t && (n = l.pop()), null === e && 1 === l.length && l[0] instanceof w ? l[0] : Y(n)(j(l, e))
                }

                function J() {
                    return function (l) {
                        return l.lift(new ll(l))
                    }
                }
                class ll {
                    constructor(l) {
                        this.connectable = l
                    }
                    call(l, n) {
                        const {
                            connectable: e
                        } = this;
                        e._refCount++;
                        const t = new nl(l, e),
                            i = n.subscribe(t);
                        return t.closed || (t.connection = e.connect()), i
                    }
                }
                class nl extends g {
                    constructor(l, n) {
                        super(l), this.connectable = n
                    }
                    _unsubscribe() {
                        const {
                            connectable: l
                        } = this;
                        if (!l) return void(this.connection = null);
                        this.connectable = null;
                        const n = l._refCount;
                        if (n <= 0) return void(this.connection = null);
                        if (l._refCount = n - 1, n > 1) return void(this.connection = null);
                        const {
                            connection: e
                        } = this, t = l._connection;
                        this.connection = null, !t || e && t !== e || t.unsubscribe()
                    }
                }
                const el = class extends w {
                        constructor(l, n) {
                            super(), this.source = l, this.subjectFactory = n, this._refCount = 0, this._isComplete = !1
                        }
                        _subscribe(l) {
                            return this.getSubject().subscribe(l)
                        }
                        getSubject() {
                            const l = this._subject;
                            return l && !l.isStopped || (this._subject = this.subjectFactory()), this._subject
                        }
                        connect() {
                            let l = this._connection;
                            return l || (this._isComplete = !1, (l = this._connection = new h).add(this.source.subscribe(new il(this.getSubject(), this))), l.closed ? (this._connection = null, l = h.EMPTY) : this._connection = l), l
                        }
                        refCount() {
                            return J()(this)
                        }
                    }.prototype,
                    tl = {
                        operator: {
                            value: null
                        },
                        _refCount: {
                            value: 0,
                            writable: !0
                        },
                        _subject: {
                            value: null,
                            writable: !0
                        },
                        _connection: {
                            value: null,
                            writable: !0
                        },
                        _subscribe: {
                            value: el._subscribe
                        },
                        _isComplete: {
                            value: el._isComplete,
                            writable: !0
                        },
                        getSubject: {
                            value: el.getSubject
                        },
                        connect: {
                            value: el.connect
                        },
                        refCount: {
                            value: el.refCount
                        }
                    };
                class il extends I {
                    constructor(l, n) {
                        super(l), this.connectable = n
                    }
                    _error(l) {
                        this._unsubscribe(), super._error(l)
                    }
                    _complete() {
                        this.connectable._isComplete = !0, this._unsubscribe(), super._complete()
                    }
                    _unsubscribe() {
                        const l = this.connectable;
                        if (l) {
                            this.connectable = null;
                            const n = l._connection;
                            l._refCount = 0, l._subject = null, l._connection = null, n && n.unsubscribe()
                        }
                    }
                }

                function sl() {
                    return new T
                }

                function ul() {
                    return l => J()(function (l, n) {
                        return function (n) {
                            let e;
                            e = "function" == typeof l ? l : function () {
                                return l
                            };
                            const t = Object.create(n, tl);
                            return t.source = n, t.subjectFactory = e, t
                        }
                    }(sl)(l))
                }
                const rl = "__parameters__";

                function al(l, n, e) {
                    const t = function (l) {
                        return function (...n) {
                            if (l) {
                                const e = l(...n);
                                for (const l in e) this[l] = e[l]
                            }
                        }
                    }(n);

                    function i(...l) {
                        if (this instanceof i) return t.apply(this, l), this;
                        const n = new i(...l);
                        return e.annotation = n, e;

                        function e(l, e, t) {
                            const i = l.hasOwnProperty(rl) ? l[rl] : Object.defineProperty(l, rl, {
                                value: []
                            })[rl];
                            for (; i.length <= t;) i.push(null);
                            return (i[t] = i[t] || []).push(n), l
                        }
                    }
                    return e && (i.prototype = Object.create(e.prototype)), i.prototype.ngMetadataName = l, i.annotationCls = i, i
                }
                const ol = al("Inject", l => ({
                        token: l
                    })),
                    cl = al("Optional"),
                    dl = al("Self"),
                    hl = al("SkipSelf");
                var pl = function (l) {
                    return l[l.Default = 0] = "Default", l[l.Host = 1] = "Host", l[l.Self = 2] = "Self", l[l.SkipSelf = 4] = "SkipSelf", l[l.Optional = 8] = "Optional", l
                }({});

                function fl(l) {
                    for (let n in l)
                        if (l[n] === fl) return n;
                    throw Error("Could not find renamed property on target object.")
                }

                function gl(l) {
                    return {
                        token: l.token,
                        providedIn: l.providedIn || null,
                        factory: l.factory,
                        value: void 0
                    }
                }
                const ml = gl;

                function yl(l) {
                    const n = l[vl];
                    return n && n.token === l ? n : null
                }
                const vl = fl({
                    ngInjectableDef: fl
                });

                function bl(l) {
                    if ("string" == typeof l) return l;
                    if (l instanceof Array) return "[" + l.map(bl).join(", ") + "]";
                    if (null == l) return "" + l;
                    if (l.overriddenName) return `${l.overriddenName}`;
                    if (l.name) return `${l.name}`;
                    const n = l.toString();
                    if (null == n) return "" + n;
                    const e = n.indexOf("\n");
                    return -1 === e ? n : n.substring(0, e)
                }
                const _l = fl({
                    __forward_ref__: fl
                });

                function wl(l) {
                    return l.__forward_ref__ = wl, l.toString = function () {
                        return bl(this())
                    }, l
                }

                function xl(l) {
                    const n = l;
                    return "function" == typeof n && n.hasOwnProperty(_l) && n.__forward_ref__ === wl ? n() : l
                }
                const kl = "undefined" != typeof globalThis && globalThis,
                    Sl = "undefined" != typeof window && window,
                    Cl = "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self,
                    Il = "undefined" != typeof global && global,
                    Tl = kl || Il || Sl || Cl;
                class El {
                    constructor(l, n) {
                        this._desc = l, this.ngMetadataName = "InjectionToken", this.ngInjectableDef = void 0, "number" == typeof n ? this.__NG_ELEMENT_ID__ = n : void 0 !== n && (this.ngInjectableDef = gl({
                            token: this,
                            providedIn: n.providedIn || "root",
                            factory: n.factory
                        }))
                    }
                    toString() {
                        return `InjectionToken ${this._desc}`
                    }
                }
                const Al = new El("INJECTOR", -1),
                    Pl = new Object,
                    Dl = "ngTempTokenPath",
                    Ml = "ngTokenPath",
                    Ol = /\n/gm,
                    Nl = "\u0275",
                    Rl = "__source",
                    Bl = fl({
                        provide: String,
                        useValue: fl
                    });
                let zl, $l = void 0;

                function Ll(l) {
                    const n = $l;
                    return $l = l, n
                }

                function Fl(l, n = pl.Default) {
                    if (void 0 === $l) throw new Error("inject() must be called from an injection context");
                    return null === $l ? function (l, n, e) {
                        const t = yl(l);
                        if (t && "root" == t.providedIn) return void 0 === t.value ? t.value = t.factory() : t.value;
                        if (e & pl.Optional) return null;
                        throw new Error(`Injector: NOT_FOUND [${bl(l)}]`)
                    }(l, 0, n) : $l.get(l, n & pl.Optional ? null : void 0, n)
                }

                function ql(l, n = pl.Default) {
                    return (zl || Fl)(l, n)
                }
                const Ul = ql;
                class Hl {
                    get(l, n = Pl) {
                        if (n === Pl) {
                            const n = new Error(`NullInjectorError: No provider for ${bl(l)}!`);
                            throw n.name = "NullInjectorError", n
                        }
                        return n
                    }
                }

                function Vl(l, n, e, t = null) {
                    l = l && "\n" === l.charAt(0) && l.charAt(1) == Nl ? l.substr(2) : l;
                    let i = bl(n);
                    if (n instanceof Array) i = n.map(bl).join(" -> ");
                    else if ("object" == typeof n) {
                        let l = [];
                        for (let e in n)
                            if (n.hasOwnProperty(e)) {
                                let t = n[e];
                                l.push(e + ":" + ("string" == typeof t ? JSON.stringify(t) : bl(t)))
                            } i = `{${l.join(", ")}}`
                    }
                    return `${e}${t?"("+t+")":""}[${i}]: ${l.replace(Ol,"\n  ")}`
                }
                class jl {}
                class Gl {}

                function Wl(l, n, e) {
                    n >= l.length ? l.push(e) : l.splice(n, 0, e)
                }

                function Kl(l, n) {
                    return n >= l.length - 1 ? l.pop() : l.splice(n, 1)[0]
                }
                const Zl = function () {
                        var l = {
                            Emulated: 0,
                            Native: 1,
                            None: 2,
                            ShadowDom: 3
                        };
                        return l[l.Emulated] = "Emulated", l[l.Native] = "Native", l[l.None] = "None", l[l.ShadowDom] = "ShadowDom", l
                    }(),
                    Ql = (() => ("undefined" != typeof requestAnimationFrame && requestAnimationFrame || setTimeout).bind(Tl))(),
                    Yl = "ngDebugContext",
                    Xl = "ngOriginalError",
                    Jl = "ngErrorLogger";

                function ln(l) {
                    return l[Yl]
                }

                function nn(l) {
                    return l[Xl]
                }

                function en(l, ...n) {
                    l.error(...n)
                }
                class tn {
                    constructor() {
                        this._console = console
                    }
                    handleError(l) {
                        const n = this._findOriginalError(l),
                            e = this._findContext(l),
                            t = function (l) {
                                return l[Jl] || en
                            }(l);
                        t(this._console, "ERROR", l), n && t(this._console, "ORIGINAL ERROR", n), e && t(this._console, "ERROR CONTEXT", e)
                    }
                    _findContext(l) {
                        return l ? ln(l) ? ln(l) : this._findContext(nn(l)) : null
                    }
                    _findOriginalError(l) {
                        let n = nn(l);
                        for (; n && nn(n);) n = nn(n);
                        return n
                    }
                }
                let sn = !0,
                    un = !1;

                function rn() {
                    return un = !0, sn
                }
                class an {
                    constructor(l) {
                        if (this.defaultDoc = l, this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert"), this.inertBodyElement = this.inertDocument.body, null == this.inertBodyElement) {
                            const l = this.inertDocument.createElement("html");
                            this.inertDocument.appendChild(l), this.inertBodyElement = this.inertDocument.createElement("body"), l.appendChild(this.inertBodyElement)
                        }
                        this.inertBodyElement.innerHTML = '<svg><g onload="this.parentNode.remove()"></g></svg>', !this.inertBodyElement.querySelector || this.inertBodyElement.querySelector("svg") ? (this.inertBodyElement.innerHTML = '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">', this.getInertBodyElement = this.inertBodyElement.querySelector && this.inertBodyElement.querySelector("svg img") && function () {
                            try {
                                return !!window.DOMParser
                            } catch (l) {
                                return !1
                            }
                        }() ? this.getInertBodyElement_DOMParser : this.getInertBodyElement_InertDocument) : this.getInertBodyElement = this.getInertBodyElement_XHR
                    }
                    getInertBodyElement_XHR(l) {
                        l = "<body><remove></remove>" + l + "</body>";
                        try {
                            l = encodeURI(l)
                        } catch (t) {
                            return null
                        }
                        const n = new XMLHttpRequest;
                        n.responseType = "document", n.open("GET", "data:text/html;charset=utf-8," + l, !1), n.send(void 0);
                        const e = n.response.body;
                        return e.removeChild(e.firstChild), e
                    }
                    getInertBodyElement_DOMParser(l) {
                        l = "<body><remove></remove>" + l + "</body>";
                        try {
                            const n = (new window.DOMParser).parseFromString(l, "text/html").body;
                            return n.removeChild(n.firstChild), n
                        } catch (n) {
                            return null
                        }
                    }
                    getInertBodyElement_InertDocument(l) {
                        const n = this.inertDocument.createElement("template");
                        return "content" in n ? (n.innerHTML = l, n) : (this.inertBodyElement.innerHTML = l, this.defaultDoc.documentMode && this.stripCustomNsAttrs(this.inertBodyElement), this.inertBodyElement)
                    }
                    stripCustomNsAttrs(l) {
                        const n = l.attributes;
                        for (let t = n.length - 1; 0 < t; t--) {
                            const e = n.item(t).name;
                            "xmlns:ns1" !== e && 0 !== e.indexOf("ns1:") || l.removeAttribute(e)
                        }
                        let e = l.firstChild;
                        for (; e;) e.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(e), e = e.nextSibling
                    }
                }
                const on = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
                    cn = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;

                function dn(l) {
                    return (l = String(l)).match(on) || l.match(cn) ? l : (rn() && console.warn(`WARNING: sanitizing unsafe URL value ${l} (see http://g.co/ng/security#xss)`), "unsafe:" + l)
                }

                function hn(l) {
                    const n = {};
                    for (const e of l.split(",")) n[e] = !0;
                    return n
                }

                function pn(...l) {
                    const n = {};
                    for (const e of l)
                        for (const l in e) e.hasOwnProperty(l) && (n[l] = !0);
                    return n
                }
                const fn = hn("area,br,col,hr,img,wbr"),
                    gn = hn("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
                    mn = hn("rp,rt"),
                    yn = pn(mn, gn),
                    vn = pn(fn, pn(gn, hn("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")), pn(mn, hn("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")), yn),
                    bn = hn("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
                    _n = hn("srcset"),
                    wn = pn(bn, _n, hn("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"), hn("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext")),
                    xn = hn("script,style,template");
                class kn {
                    constructor() {
                        this.sanitizedSomething = !1, this.buf = []
                    }
                    sanitizeChildren(l) {
                        let n = l.firstChild,
                            e = !0;
                        for (; n;)
                            if (n.nodeType === Node.ELEMENT_NODE ? e = this.startElement(n) : n.nodeType === Node.TEXT_NODE ? this.chars(n.nodeValue) : this.sanitizedSomething = !0, e && n.firstChild) n = n.firstChild;
                            else
                                for (; n;) {
                                    n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
                                    let l = this.checkClobberedElement(n, n.nextSibling);
                                    if (l) {
                                        n = l;
                                        break
                                    }
                                    n = this.checkClobberedElement(n, n.parentNode)
                                }
                        return this.buf.join("")
                    }
                    startElement(l) {
                        const n = l.nodeName.toLowerCase();
                        if (!vn.hasOwnProperty(n)) return this.sanitizedSomething = !0, !xn.hasOwnProperty(n);
                        this.buf.push("<"), this.buf.push(n);
                        const e = l.attributes;
                        for (let i = 0; i < e.length; i++) {
                            const l = e.item(i),
                                n = l.name,
                                s = n.toLowerCase();
                            if (!wn.hasOwnProperty(s)) {
                                this.sanitizedSomething = !0;
                                continue
                            }
                            let u = l.value;
                            bn[s] && (u = dn(u)), _n[s] && (t = u, u = (t = String(t)).split(",").map(l => dn(l.trim())).join(", ")), this.buf.push(" ", n, '="', In(u), '"')
                        }
                        var t;
                        return this.buf.push(">"), !0
                    }
                    endElement(l) {
                        const n = l.nodeName.toLowerCase();
                        vn.hasOwnProperty(n) && !fn.hasOwnProperty(n) && (this.buf.push("</"), this.buf.push(n), this.buf.push(">"))
                    }
                    chars(l) {
                        this.buf.push(In(l))
                    }
                    checkClobberedElement(l, n) {
                        if (n && (l.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY) === Node.DOCUMENT_POSITION_CONTAINED_BY) throw new Error(`Failed to sanitize html because the element is clobbered: ${l.outerHTML}`);
                        return n
                    }
                }
                const Sn = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
                    Cn = /([^\#-~ |!])/g;

                function In(l) {
                    return l.replace(/&/g, "&amp;").replace(Sn, (function (l) {
                        return "&#" + (1024 * (l.charCodeAt(0) - 55296) + (l.charCodeAt(1) - 56320) + 65536) + ";"
                    })).replace(Cn, (function (l) {
                        return "&#" + l.charCodeAt(0) + ";"
                    })).replace(/</g, "&lt;").replace(/>/g, "&gt;")
                }
                let Tn;

                function En(l) {
                    return "content" in l && function (l) {
                        return l.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === l.nodeName
                    }(l) ? l.content : null
                }
                const An = function () {
                    var l = {
                        NONE: 0,
                        HTML: 1,
                        STYLE: 2,
                        SCRIPT: 3,
                        URL: 4,
                        RESOURCE_URL: 5
                    };
                    return l[l.NONE] = "NONE", l[l.HTML] = "HTML", l[l.STYLE] = "STYLE", l[l.SCRIPT] = "SCRIPT", l[l.URL] = "URL", l[l.RESOURCE_URL] = "RESOURCE_URL", l
                }();
                class Pn {}
                const Dn = new RegExp("^([-,.\"'%_!# a-zA-Z0-9]+|(?:(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|Z|3d)?|(?:rgb|hsl)a?|(?:repeating-)?(?:linear|radial)-gradient|(?:calc|attr))\\([-0-9.%, #a-zA-Z]+\\))$", "g"),
                    Mn = /^url\(([^)]+)\)$/,
                    On = /([A-Z])/g;

                function Nn(l) {
                    try {
                        return null != l ? l.toString().slice(0, 30) : l
                    } catch (n) {
                        return "[ERROR] Exception while trying to serialize the value"
                    }
                }
                let Rn = (() => {
                    class l {}
                    return l.__NG_ELEMENT_ID__ = () => Bn(), l
                })();
                const Bn = (...l) => {},
                    zn = new El("The presence of this token marks an injector as being the root injector."),
                    $n = function (l, n, e) {
                        return new jn(l, n, e)
                    };
                let Ln = (() => {
                    class l {
                        static create(l, n) {
                            return Array.isArray(l) ? $n(l, n, "") : $n(l.providers, l.parent, l.name || "")
                        }
                    }
                    return l.THROW_IF_NOT_FOUND = Pl, l.NULL = new Hl, l.ngInjectableDef = gl({
                        token: l,
                        providedIn: "any",
                        factory: () => ql(Al)
                    }), l.__NG_ELEMENT_ID__ = -1, l
                })();
                const Fn = function (l) {
                        return l
                    },
                    qn = [],
                    Un = Fn,
                    Hn = function () {
                        return Array.prototype.slice.call(arguments)
                    },
                    Vn = "\u0275";
                class jn {
                    constructor(l, n = Ln.NULL, e = null) {
                        this.parent = n, this.source = e;
                        const t = this._records = new Map;
                        t.set(Ln, {
                                token: Ln,
                                fn: Fn,
                                deps: qn,
                                value: this,
                                useNew: !1
                            }), t.set(Al, {
                                token: Al,
                                fn: Fn,
                                deps: qn,
                                value: this,
                                useNew: !1
                            }),
                            function l(n, e) {
                                if (e)
                                    if ((e = xl(e)) instanceof Array)
                                        for (let t = 0; t < e.length; t++) l(n, e[t]);
                                    else {
                                        if ("function" == typeof e) throw Wn("Function/Class not supported", e);
                                        if (!e || "object" != typeof e || !e.provide) throw Wn("Unexpected provider", e); {
                                            let l = xl(e.provide);
                                            const t = function (l) {
                                                const n = function (l) {
                                                    let n = qn;
                                                    const e = l.deps;
                                                    if (e && e.length) {
                                                        n = [];
                                                        for (let l = 0; l < e.length; l++) {
                                                            let t = 6,
                                                                i = xl(e[l]);
                                                            if (i instanceof Array)
                                                                for (let l = 0, n = i; l < n.length; l++) {
                                                                    const e = n[l];
                                                                    e instanceof cl || e == cl ? t |= 1 : e instanceof hl || e == hl ? t &= -3 : e instanceof dl || e == dl ? t &= -5 : i = e instanceof ol ? e.token : xl(e)
                                                                }
                                                            n.push({
                                                                token: i,
                                                                options: t
                                                            })
                                                        }
                                                    } else if (l.useExisting) n = [{
                                                        token: xl(l.useExisting),
                                                        options: 6
                                                    }];
                                                    else if (!(e || Bl in l)) throw Wn("'deps' required", l);
                                                    return n
                                                }(l);
                                                let e = Fn,
                                                    t = qn,
                                                    i = !1,
                                                    s = xl(l.provide);
                                                if (Bl in l) t = l.useValue;
                                                else if (l.useFactory) e = l.useFactory;
                                                else if (l.useExisting);
                                                else if (l.useClass) i = !0, e = xl(l.useClass);
                                                else {
                                                    if ("function" != typeof s) throw Wn("StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable", l);
                                                    i = !0, e = s
                                                }
                                                return {
                                                    deps: n,
                                                    fn: e,
                                                    useNew: i,
                                                    value: t
                                                }
                                            }(e);
                                            if (!0 === e.multi) {
                                                let t = n.get(l);
                                                if (t) {
                                                    if (t.fn !== Hn) throw Gn(l)
                                                } else n.set(l, t = {
                                                    token: e.provide,
                                                    deps: [],
                                                    useNew: !1,
                                                    fn: Hn,
                                                    value: qn
                                                });
                                                t.deps.push({
                                                    token: l = e,
                                                    options: 6
                                                })
                                            }
                                            const i = n.get(l);
                                            if (i && i.fn == Hn) throw Gn(l);
                                            n.set(l, t)
                                        }
                                    }
                            }(t, l)
                    }
                    get(l, n, e = pl.Default) {
                        const t = this._records.get(l);
                        try {
                            return function l(n, e, t, i, s, u) {
                                try {
                                    return function (n, e, t, i, s, u) {
                                        let r;
                                        if (!e || u & pl.SkipSelf) u & pl.Self || (r = i.get(n, s, pl.Default));
                                        else {
                                            if ((r = e.value) == Un) throw Error(Vn + "Circular dependency");
                                            if (r === qn) {
                                                e.value = Un;
                                                let n = void 0,
                                                    s = e.useNew,
                                                    u = e.fn,
                                                    a = e.deps,
                                                    o = qn;
                                                if (a.length) {
                                                    o = [];
                                                    for (let n = 0; n < a.length; n++) {
                                                        const e = a[n],
                                                            s = e.options,
                                                            u = 2 & s ? t.get(e.token) : void 0;
                                                        o.push(l(e.token, u, t, u || 4 & s ? i : Ln.NULL, 1 & s ? null : Ln.THROW_IF_NOT_FOUND, pl.Default))
                                                    }
                                                }
                                                e.value = r = s ? new u(...o) : u.apply(n, o)
                                            }
                                        }
                                        return r
                                    }(n, e, t, i, s, u)
                                } catch (r) {
                                    throw r instanceof Error || (r = new Error(r)), (r[Dl] = r[Dl] || []).unshift(n), e && e.value == Un && (e.value = qn), r
                                }
                            }(l, t, this._records, this.parent, n, e)
                        } catch (i) {
                            return function (l, n, e, t) {
                                const i = l[Dl];
                                throw n[Rl] && i.unshift(n[Rl]), l.message = Vl("\n" + l.message, i, "StaticInjectorError", t), l[Ml] = i, l[Dl] = null, l
                            }(i, l, 0, this.source)
                        }
                    }
                    toString() {
                        const l = [];
                        return this._records.forEach((n, e) => l.push(bl(e))), `StaticInjector[${l.join(", ")}]`
                    }
                }

                function Gn(l) {
                    return Wn("Cannot mix multi providers and regular providers", l)
                }

                function Wn(l, n) {
                    return new Error(Vl(l, n, "StaticInjectorError"))
                }
                const Kn = new El("AnalyzeForEntryComponents");
                let Zn = null;

                function Qn() {
                    if (!Zn) {
                        const l = Tl.Symbol;
                        if (l && l.iterator) Zn = l.iterator;
                        else {
                            const l = Object.getOwnPropertyNames(Map.prototype);
                            for (let n = 0; n < l.length; ++n) {
                                const e = l[n];
                                "entries" !== e && "size" !== e && Map.prototype[e] === Map.prototype.entries && (Zn = e)
                            }
                        }
                    }
                    return Zn
                }

                function Yn(l, n) {
                    return l === n || "number" == typeof l && "number" == typeof n && isNaN(l) && isNaN(n)
                }

                function Xn(l, n) {
                    const e = le(l),
                        t = le(n);
                    if (e && t) return function (l, n, e) {
                        const t = l[Qn()](),
                            i = n[Qn()]();
                        for (;;) {
                            const l = t.next(),
                                n = i.next();
                            if (l.done && n.done) return !0;
                            if (l.done || n.done) return !1;
                            if (!e(l.value, n.value)) return !1
                        }
                    }(l, n, Xn); {
                        const i = l && ("object" == typeof l || "function" == typeof l),
                            s = n && ("object" == typeof n || "function" == typeof n);
                        return !(e || !i || t || !s) || Yn(l, n)
                    }
                }
                class Jn {
                    constructor(l) {
                        this.wrapped = l
                    }
                    static wrap(l) {
                        return new Jn(l)
                    }
                    static unwrap(l) {
                        return Jn.isWrapped(l) ? l.wrapped : l
                    }
                    static isWrapped(l) {
                        return l instanceof Jn
                    }
                }

                function le(l) {
                    return !!ne(l) && (Array.isArray(l) || !(l instanceof Map) && Qn() in l)
                }

                function ne(l) {
                    return null !== l && ("function" == typeof l || "object" == typeof l)
                }

                function ee(l) {
                    return !!l && "function" == typeof l.then
                }

                function te(l) {
                    return !!l && "function" == typeof l.subscribe
                }
                class ie {
                    constructor(l, n, e) {
                        this.previousValue = l, this.currentValue = n, this.firstChange = e
                    }
                    isFirstChange() {
                        return this.firstChange
                    }
                }
                class se {}
                class ue {}

                function re(l) {
                    const n = Error(`No component factory found for ${bl(l)}. Did you add it to @NgModule.entryComponents?`);
                    return n[ae] = l, n
                }
                const ae = "ngComponent";
                class oe {
                    resolveComponentFactory(l) {
                        throw re(l)
                    }
                }
                let ce = (() => {
                    class l {}
                    return l.NULL = new oe, l
                })();
                class de {
                    constructor(l, n, e) {
                        this._parent = n, this._ngModule = e, this._factories = new Map;
                        for (let t = 0; t < l.length; t++) {
                            const n = l[t];
                            this._factories.set(n.componentType, n)
                        }
                    }
                    resolveComponentFactory(l) {
                        let n = this._factories.get(l);
                        if (!n && this._parent && (n = this._parent.resolveComponentFactory(l)), !n) throw re(l);
                        return new he(n, this._ngModule)
                    }
                }
                class he extends ue {
                    constructor(l, n) {
                        super(), this.factory = l, this.ngModule = n, this.selector = l.selector, this.componentType = l.componentType, this.ngContentSelectors = l.ngContentSelectors, this.inputs = l.inputs, this.outputs = l.outputs
                    }
                    create(l, n, e, t) {
                        return this.factory.create(l, n, e, t || this.ngModule)
                    }
                }

                function pe(...l) {}
                let fe = (() => {
                    class l {
                        constructor(l) {
                            this.nativeElement = l
                        }
                    }
                    return l.__NG_ELEMENT_ID__ = () => ge(l), l
                })();
                const ge = pe;
                class me {}
                class ye {}
                const ve = function () {
                    var l = {
                        Important: 1,
                        DashCase: 2
                    };
                    return l[l.Important] = "Important", l[l.DashCase] = "DashCase", l
                }();
                let be = (() => {
                    class l {}
                    return l.__NG_ELEMENT_ID__ = () => _e(), l
                })();
                const _e = pe;
                class we {
                    constructor(l) {
                        this.full = l, this.major = l.split(".")[0], this.minor = l.split(".")[1], this.patch = l.split(".").slice(2).join(".")
                    }
                }
                const xe = new we("8.2.14");
                class ke {
                    constructor() {}
                    supports(l) {
                        return le(l)
                    }
                    create(l) {
                        return new Ce(l)
                    }
                }
                const Se = (l, n) => n;
                class Ce {
                    constructor(l) {
                        this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = l || Se
                    }
                    forEachItem(l) {
                        let n;
                        for (n = this._itHead; null !== n; n = n._next) l(n)
                    }
                    forEachOperation(l) {
                        let n = this._itHead,
                            e = this._removalsHead,
                            t = 0,
                            i = null;
                        for (; n || e;) {
                            const s = !e || n && n.currentIndex < Ae(e, t, i) ? n : e,
                                u = Ae(s, t, i),
                                r = s.currentIndex;
                            if (s === e) t--, e = e._nextRemoved;
                            else if (n = n._next, null == s.previousIndex) t++;
                            else {
                                i || (i = []);
                                const l = u - t,
                                    n = r - t;
                                if (l != n) {
                                    for (let e = 0; e < l; e++) {
                                        const t = e < i.length ? i[e] : i[e] = 0,
                                            s = t + e;
                                        n <= s && s < l && (i[e] = t + 1)
                                    }
                                    i[s.previousIndex] = n - l
                                }
                            }
                            u !== r && l(s, u, r)
                        }
                    }
                    forEachPreviousItem(l) {
                        let n;
                        for (n = this._previousItHead; null !== n; n = n._nextPrevious) l(n)
                    }
                    forEachAddedItem(l) {
                        let n;
                        for (n = this._additionsHead; null !== n; n = n._nextAdded) l(n)
                    }
                    forEachMovedItem(l) {
                        let n;
                        for (n = this._movesHead; null !== n; n = n._nextMoved) l(n)
                    }
                    forEachRemovedItem(l) {
                        let n;
                        for (n = this._removalsHead; null !== n; n = n._nextRemoved) l(n)
                    }
                    forEachIdentityChange(l) {
                        let n;
                        for (n = this._identityChangesHead; null !== n; n = n._nextIdentityChange) l(n)
                    }
                    diff(l) {
                        if (null == l && (l = []), !le(l)) throw new Error(`Error trying to diff '${bl(l)}'. Only arrays and iterables are allowed`);
                        return this.check(l) ? this : null
                    }
                    onDestroy() {}
                    check(l) {
                        this._reset();
                        let n, e, t, i = this._itHead,
                            s = !1;
                        if (Array.isArray(l)) {
                            this.length = l.length;
                            for (let n = 0; n < this.length; n++) t = this._trackByFn(n, e = l[n]), null !== i && Yn(i.trackById, t) ? (s && (i = this._verifyReinsertion(i, e, t, n)), Yn(i.item, e) || this._addIdentityChange(i, e)) : (i = this._mismatch(i, e, t, n), s = !0), i = i._next
                        } else n = 0,
                            function (l, n) {
                                if (Array.isArray(l))
                                    for (let e = 0; e < l.length; e++) n(l[e]);
                                else {
                                    const e = l[Qn()]();
                                    let t;
                                    for (; !(t = e.next()).done;) n(t.value)
                                }
                            }(l, l => {
                                t = this._trackByFn(n, l), null !== i && Yn(i.trackById, t) ? (s && (i = this._verifyReinsertion(i, l, t, n)), Yn(i.item, l) || this._addIdentityChange(i, l)) : (i = this._mismatch(i, l, t, n), s = !0), i = i._next, n++
                            }), this.length = n;
                        return this._truncate(i), this.collection = l, this.isDirty
                    }
                    get isDirty() {
                        return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
                    }
                    _reset() {
                        if (this.isDirty) {
                            let l, n;
                            for (l = this._previousItHead = this._itHead; null !== l; l = l._next) l._nextPrevious = l._next;
                            for (l = this._additionsHead; null !== l; l = l._nextAdded) l.previousIndex = l.currentIndex;
                            for (this._additionsHead = this._additionsTail = null, l = this._movesHead; null !== l; l = n) l.previousIndex = l.currentIndex, n = l._nextMoved;
                            this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null
                        }
                    }
                    _mismatch(l, n, e, t) {
                        let i;
                        return null === l ? i = this._itTail : (i = l._prev, this._remove(l)), null !== (l = null === this._linkedRecords ? null : this._linkedRecords.get(e, t)) ? (Yn(l.item, n) || this._addIdentityChange(l, n), this._moveAfter(l, i, t)) : null !== (l = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(e, null)) ? (Yn(l.item, n) || this._addIdentityChange(l, n), this._reinsertAfter(l, i, t)) : l = this._addAfter(new Ie(n, e), i, t), l
                    }
                    _verifyReinsertion(l, n, e, t) {
                        let i = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(e, null);
                        return null !== i ? l = this._reinsertAfter(i, l._prev, t) : l.currentIndex != t && (l.currentIndex = t, this._addToMoves(l, t)), l
                    }
                    _truncate(l) {
                        for (; null !== l;) {
                            const n = l._next;
                            this._addToRemovals(this._unlink(l)), l = n
                        }
                        null !== this._unlinkedRecords && this._unlinkedRecords.clear(), null !== this._additionsTail && (this._additionsTail._nextAdded = null), null !== this._movesTail && (this._movesTail._nextMoved = null), null !== this._itTail && (this._itTail._next = null), null !== this._removalsTail && (this._removalsTail._nextRemoved = null), null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
                    }
                    _reinsertAfter(l, n, e) {
                        null !== this._unlinkedRecords && this._unlinkedRecords.remove(l);
                        const t = l._prevRemoved,
                            i = l._nextRemoved;
                        return null === t ? this._removalsHead = i : t._nextRemoved = i, null === i ? this._removalsTail = t : i._prevRemoved = t, this._insertAfter(l, n, e), this._addToMoves(l, e), l
                    }
                    _moveAfter(l, n, e) {
                        return this._unlink(l), this._insertAfter(l, n, e), this._addToMoves(l, e), l
                    }
                    _addAfter(l, n, e) {
                        return this._insertAfter(l, n, e), this._additionsTail = null === this._additionsTail ? this._additionsHead = l : this._additionsTail._nextAdded = l, l
                    }
                    _insertAfter(l, n, e) {
                        const t = null === n ? this._itHead : n._next;
                        return l._next = t, l._prev = n, null === t ? this._itTail = l : t._prev = l, null === n ? this._itHead = l : n._next = l, null === this._linkedRecords && (this._linkedRecords = new Ee), this._linkedRecords.put(l), l.currentIndex = e, l
                    }
                    _remove(l) {
                        return this._addToRemovals(this._unlink(l))
                    }
                    _unlink(l) {
                        null !== this._linkedRecords && this._linkedRecords.remove(l);
                        const n = l._prev,
                            e = l._next;
                        return null === n ? this._itHead = e : n._next = e, null === e ? this._itTail = n : e._prev = n, l
                    }
                    _addToMoves(l, n) {
                        return l.previousIndex === n ? l : (this._movesTail = null === this._movesTail ? this._movesHead = l : this._movesTail._nextMoved = l, l)
                    }
                    _addToRemovals(l) {
                        return null === this._unlinkedRecords && (this._unlinkedRecords = new Ee), this._unlinkedRecords.put(l), l.currentIndex = null, l._nextRemoved = null, null === this._removalsTail ? (this._removalsTail = this._removalsHead = l, l._prevRemoved = null) : (l._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = l), l
                    }
                    _addIdentityChange(l, n) {
                        return l.item = n, this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = l : this._identityChangesTail._nextIdentityChange = l, l
                    }
                }
                class Ie {
                    constructor(l, n) {
                        this.item = l, this.trackById = n, this.currentIndex = null, this.previousIndex = null, this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, this._nextMoved = null, this._nextIdentityChange = null
                    }
                }
                class Te {
                    constructor() {
                        this._head = null, this._tail = null
                    }
                    add(l) {
                        null === this._head ? (this._head = this._tail = l, l._nextDup = null, l._prevDup = null) : (this._tail._nextDup = l, l._prevDup = this._tail, l._nextDup = null, this._tail = l)
                    }
                    get(l, n) {
                        let e;
                        for (e = this._head; null !== e; e = e._nextDup)
                            if ((null === n || n <= e.currentIndex) && Yn(e.trackById, l)) return e;
                        return null
                    }
                    remove(l) {
                        const n = l._prevDup,
                            e = l._nextDup;
                        return null === n ? this._head = e : n._nextDup = e, null === e ? this._tail = n : e._prevDup = n, null === this._head
                    }
                }
                class Ee {
                    constructor() {
                        this.map = new Map
                    }
                    put(l) {
                        const n = l.trackById;
                        let e = this.map.get(n);
                        e || (e = new Te, this.map.set(n, e)), e.add(l)
                    }
                    get(l, n) {
                        const e = this.map.get(l);
                        return e ? e.get(l, n) : null
                    }
                    remove(l) {
                        const n = l.trackById;
                        return this.map.get(n).remove(l) && this.map.delete(n), l
                    }
                    get isEmpty() {
                        return 0 === this.map.size
                    }
                    clear() {
                        this.map.clear()
                    }
                }

                function Ae(l, n, e) {
                    const t = l.previousIndex;
                    if (null === t) return t;
                    let i = 0;
                    return e && t < e.length && (i = e[t]), t + n + i
                }
                class Pe {
                    constructor() {}
                    supports(l) {
                        return l instanceof Map || ne(l)
                    }
                    create() {
                        return new De
                    }
                }
                class De {
                    constructor() {
                        this._records = new Map, this._mapHead = null, this._appendAfter = null, this._previousMapHead = null, this._changesHead = null, this._changesTail = null, this._additionsHead = null, this._additionsTail = null, this._removalsHead = null, this._removalsTail = null
                    }
                    get isDirty() {
                        return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead
                    }
                    forEachItem(l) {
                        let n;
                        for (n = this._mapHead; null !== n; n = n._next) l(n)
                    }
                    forEachPreviousItem(l) {
                        let n;
                        for (n = this._previousMapHead; null !== n; n = n._nextPrevious) l(n)
                    }
                    forEachChangedItem(l) {
                        let n;
                        for (n = this._changesHead; null !== n; n = n._nextChanged) l(n)
                    }
                    forEachAddedItem(l) {
                        let n;
                        for (n = this._additionsHead; null !== n; n = n._nextAdded) l(n)
                    }
                    forEachRemovedItem(l) {
                        let n;
                        for (n = this._removalsHead; null !== n; n = n._nextRemoved) l(n)
                    }
                    diff(l) {
                        if (l) {
                            if (!(l instanceof Map || ne(l))) throw new Error(`Error trying to diff '${bl(l)}'. Only maps and objects are allowed`)
                        } else l = new Map;
                        return this.check(l) ? this : null
                    }
                    onDestroy() {}
                    check(l) {
                        this._reset();
                        let n = this._mapHead;
                        if (this._appendAfter = null, this._forEach(l, (l, e) => {
                                if (n && n.key === e) this._maybeAddToChanges(n, l), this._appendAfter = n, n = n._next;
                                else {
                                    const t = this._getOrCreateRecordForKey(e, l);
                                    n = this._insertBeforeOrAppend(n, t)
                                }
                            }), n) {
                            n._prev && (n._prev._next = null), this._removalsHead = n;
                            for (let l = n; null !== l; l = l._nextRemoved) l === this._mapHead && (this._mapHead = null), this._records.delete(l.key), l._nextRemoved = l._next, l.previousValue = l.currentValue, l.currentValue = null, l._prev = null, l._next = null
                        }
                        return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty
                    }
                    _insertBeforeOrAppend(l, n) {
                        if (l) {
                            const e = l._prev;
                            return n._next = l, n._prev = e, l._prev = n, e && (e._next = n), l === this._mapHead && (this._mapHead = n), this._appendAfter = l, l
                        }
                        return this._appendAfter ? (this._appendAfter._next = n, n._prev = this._appendAfter) : this._mapHead = n, this._appendAfter = n, null
                    }
                    _getOrCreateRecordForKey(l, n) {
                        if (this._records.has(l)) {
                            const e = this._records.get(l);
                            this._maybeAddToChanges(e, n);
                            const t = e._prev,
                                i = e._next;
                            return t && (t._next = i), i && (i._prev = t), e._next = null, e._prev = null, e
                        }
                        const e = new Me(l);
                        return this._records.set(l, e), e.currentValue = n, this._addToAdditions(e), e
                    }
                    _reset() {
                        if (this.isDirty) {
                            let l;
                            for (this._previousMapHead = this._mapHead, l = this._previousMapHead; null !== l; l = l._next) l._nextPrevious = l._next;
                            for (l = this._changesHead; null !== l; l = l._nextChanged) l.previousValue = l.currentValue;
                            for (l = this._additionsHead; null != l; l = l._nextAdded) l.previousValue = l.currentValue;
                            this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, this._removalsHead = null
                        }
                    }
                    _maybeAddToChanges(l, n) {
                        Yn(n, l.currentValue) || (l.previousValue = l.currentValue, l.currentValue = n, this._addToChanges(l))
                    }
                    _addToAdditions(l) {
                        null === this._additionsHead ? this._additionsHead = this._additionsTail = l : (this._additionsTail._nextAdded = l, this._additionsTail = l)
                    }
                    _addToChanges(l) {
                        null === this._changesHead ? this._changesHead = this._changesTail = l : (this._changesTail._nextChanged = l, this._changesTail = l)
                    }
                    _forEach(l, n) {
                        l instanceof Map ? l.forEach(n) : Object.keys(l).forEach(e => n(l[e], e))
                    }
                }
                class Me {
                    constructor(l) {
                        this.key = l, this.previousValue = null, this.currentValue = null, this._nextPrevious = null, this._next = null, this._prev = null, this._nextAdded = null, this._nextRemoved = null, this._nextChanged = null
                    }
                }
                let Oe = (() => {
                        class l {
                            constructor(l) {
                                this.factories = l
                            }
                            static create(n, e) {
                                if (null != e) {
                                    const l = e.factories.slice();
                                    n = n.concat(l)
                                }
                                return new l(n)
                            }
                            static extend(n) {
                                return {
                                    provide: l,
                                    useFactory: e => {
                                        if (!e) throw new Error("Cannot extend IterableDiffers without a parent injector");
                                        return l.create(n, e)
                                    },
                                    deps: [[l, new hl, new cl]]
                                }
                            }
                            find(l) {
                                const n = this.factories.find(n => n.supports(l));
                                if (null != n) return n;
                                throw new Error(`Cannot find a differ supporting object '${l}' of type '${e=l,e.name||typeof e}'`);
                                var e
                            }
                        }
                        return l.ngInjectableDef = gl({
                            token: l,
                            providedIn: "root",
                            factory: () => new l([new ke])
                        }), l
                    })(),
                    Ne = (() => {
                        class l {
                            constructor(l) {
                                this.factories = l
                            }
                            static create(n, e) {
                                if (e) {
                                    const l = e.factories.slice();
                                    n = n.concat(l)
                                }
                                return new l(n)
                            }
                            static extend(n) {
                                return {
                                    provide: l,
                                    useFactory: e => {
                                        if (!e) throw new Error("Cannot extend KeyValueDiffers without a parent injector");
                                        return l.create(n, e)
                                    },
                                    deps: [[l, new hl, new cl]]
                                }
                            }
                            find(l) {
                                const n = this.factories.find(n => n.supports(l));
                                if (n) return n;
                                throw new Error(`Cannot find a differ supporting object '${l}'`)
                            }
                        }
                        return l.ngInjectableDef = gl({
                            token: l,
                            providedIn: "root",
                            factory: () => new l([new Pe])
                        }), l
                    })();
                const Re = [new Pe],
                    Be = new Oe([new ke]),
                    ze = new Ne(Re);
                let $e = (() => {
                    class l {}
                    return l.__NG_ELEMENT_ID__ = () => Le(l, fe), l
                })();
                const Le = pe;
                let Fe = (() => {
                    class l {}
                    return l.__NG_ELEMENT_ID__ = () => qe(l, fe), l
                })();
                const qe = pe;

                function Ue(l, n, e, t) {
                    let i = `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '${n}'. Current value: '${e}'.`;
                    return t && (i += " It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook ?"),
                        function (l, n) {
                            const e = new Error(l);
                            return He(e, n), e
                        }(i, l)
                }

                function He(l, n) {
                    l[Yl] = n, l[Jl] = n.logError.bind(n)
                }

                function Ve(l) {
                    return new Error(`ViewDestroyedError: Attempt to use a destroyed view: ${l}`)
                }

                function je(l, n, e) {
                    const t = l.state,
                        i = 1792 & t;
                    return i === n ? (l.state = -1793 & t | e, l.initIndex = -1, !0) : i === e
                }

                function Ge(l, n, e) {
                    return (1792 & l.state) === n && l.initIndex <= e && (l.initIndex = e + 1, !0)
                }

                function We(l, n) {
                    return l.nodes[n]
                }

                function Ke(l, n) {
                    return l.nodes[n]
                }

                function Ze(l, n) {
                    return l.nodes[n]
                }

                function Qe(l, n) {
                    return l.nodes[n]
                }

                function Ye(l, n) {
                    return l.nodes[n]
                }
                const Xe = {
                        setCurrentNode: void 0,
                        createRootView: void 0,
                        createEmbeddedView: void 0,
                        createComponentView: void 0,
                        createNgModuleRef: void 0,
                        overrideProvider: void 0,
                        overrideComponentView: void 0,
                        clearOverrides: void 0,
                        checkAndUpdateView: void 0,
                        checkNoChangesView: void 0,
                        destroyView: void 0,
                        resolveDep: void 0,
                        createDebugContext: void 0,
                        handleEvent: void 0,
                        updateDirectives: void 0,
                        updateRenderer: void 0,
                        dirtyParentQueries: void 0
                    },
                    Je = () => {},
                    lt = new Map;

                function nt(l) {
                    let n = lt.get(l);
                    return n || (n = bl(l) + "_" + lt.size, lt.set(l, n)), n
                }

                function et(l, n, e, t) {
                    if (Jn.isWrapped(t)) {
                        t = Jn.unwrap(t);
                        const i = l.def.nodes[n].bindingIndex + e,
                            s = Jn.unwrap(l.oldValues[i]);
                        l.oldValues[i] = new Jn(s)
                    }
                    return t
                }
                const tt = "$$undefined",
                    it = "$$empty";

                function st(l) {
                    return {
                        id: tt,
                        styles: l.styles,
                        encapsulation: l.encapsulation,
                        data: l.data
                    }
                }
                let ut = 0;

                function rt(l, n, e, t) {
                    return !(!(2 & l.state) && Yn(l.oldValues[n.bindingIndex + e], t))
                }

                function at(l, n, e, t) {
                    return !!rt(l, n, e, t) && (l.oldValues[n.bindingIndex + e] = t, !0)
                }

                function ot(l, n, e, t) {
                    const i = l.oldValues[n.bindingIndex + e];
                    if (1 & l.state || !Xn(i, t)) {
                        const s = n.bindings[e].name;
                        throw Ue(Xe.createDebugContext(l, n.nodeIndex), `${s}: ${i}`, `${s}: ${t}`, 0 != (1 & l.state))
                    }
                }

                function ct(l) {
                    let n = l;
                    for (; n;) 2 & n.def.flags && (n.state |= 8), n = n.viewContainerParent || n.parent
                }

                function dt(l, n) {
                    let e = l;
                    for (; e && e !== n;) e.state |= 64, e = e.viewContainerParent || e.parent
                }

                function ht(l, n, e, t) {
                    try {
                        return ct(33554432 & l.def.nodes[n].flags ? Ke(l, n).componentView : l), Xe.handleEvent(l, n, e, t)
                    } catch (i) {
                        l.root.errorHandler.handleError(i)
                    }
                }

                function pt(l) {
                    return l.parent ? Ke(l.parent, l.parentNodeDef.nodeIndex) : null
                }

                function ft(l) {
                    return l.parent ? l.parentNodeDef.parent : null
                }

                function gt(l, n) {
                    switch (201347067 & n.flags) {
                        case 1:
                            return Ke(l, n.nodeIndex).renderElement;
                        case 2:
                            return We(l, n.nodeIndex).renderText
                    }
                }

                function mt(l) {
                    return !!l.parent && !!(32768 & l.parentNodeDef.flags)
                }

                function yt(l) {
                    return !(!l.parent || 32768 & l.parentNodeDef.flags)
                }

                function vt(l) {
                    return 1 << l % 32
                }

                function bt(l) {
                    const n = {};
                    let e = 0;
                    const t = {};
                    return l && l.forEach(([l, i]) => {
                        "number" == typeof l ? (n[l] = i, e |= vt(l)) : t[l] = i
                    }), {
                        matchedQueries: n,
                        references: t,
                        matchedQueryIds: e
                    }
                }

                function _t(l, n) {
                    return l.map(l => {
                        let e, t;
                        return Array.isArray(l) ? [t, e] = l : (t = 0, e = l), e && ("function" == typeof e || "object" == typeof e) && n && Object.defineProperty(e, Rl, {
                            value: n,
                            configurable: !0
                        }), {
                            flags: t,
                            token: e,
                            tokenKey: nt(e)
                        }
                    })
                }

                function wt(l, n, e) {
                    let t = e.renderParent;
                    return t ? 0 == (1 & t.flags) || 0 == (33554432 & t.flags) || t.element.componentRendererType && t.element.componentRendererType.encapsulation === Zl.Native ? Ke(l, e.renderParent.nodeIndex).renderElement : void 0 : n
                }
                const xt = new WeakMap;

                function kt(l) {
                    let n = xt.get(l);
                    return n || ((n = l(() => Je)).factory = l, xt.set(l, n)), n
                }

                function St(l, n, e, t, i) {
                    3 === n && (e = l.renderer.parentNode(gt(l, l.def.lastRenderRootNode))), Ct(l, n, 0, l.def.nodes.length - 1, e, t, i)
                }

                function Ct(l, n, e, t, i, s, u) {
                    for (let r = e; r <= t; r++) {
                        const e = l.def.nodes[r];
                        11 & e.flags && Tt(l, e, n, i, s, u), r += e.childCount
                    }
                }

                function It(l, n, e, t, i, s) {
                    let u = l;
                    for (; u && !mt(u);) u = u.parent;
                    const r = u.parent,
                        a = ft(u),
                        o = a.nodeIndex + a.childCount;
                    for (let c = a.nodeIndex + 1; c <= o; c++) {
                        const l = r.def.nodes[c];
                        l.ngContentIndex === n && Tt(r, l, e, t, i, s), c += l.childCount
                    }
                    if (!r.parent) {
                        const u = l.root.projectableNodes[n];
                        if (u)
                            for (let n = 0; n < u.length; n++) Et(l, u[n], e, t, i, s)
                    }
                }

                function Tt(l, n, e, t, i, s) {
                    if (8 & n.flags) It(l, n.ngContent.index, e, t, i, s);
                    else {
                        const u = gt(l, n);
                        if (3 === e && 33554432 & n.flags && 48 & n.bindingFlags ? (16 & n.bindingFlags && Et(l, u, e, t, i, s), 32 & n.bindingFlags && Et(Ke(l, n.nodeIndex).componentView, u, e, t, i, s)) : Et(l, u, e, t, i, s), 16777216 & n.flags) {
                            const u = Ke(l, n.nodeIndex).viewContainer._embeddedViews;
                            for (let l = 0; l < u.length; l++) St(u[l], e, t, i, s)
                        }
                        1 & n.flags && !n.element.name && Ct(l, e, n.nodeIndex + 1, n.nodeIndex + n.childCount, t, i, s)
                    }
                }

                function Et(l, n, e, t, i, s) {
                    const u = l.renderer;
                    switch (e) {
                        case 1:
                            u.appendChild(t, n);
                            break;
                        case 2:
                            u.insertBefore(t, n, i);
                            break;
                        case 3:
                            u.removeChild(t, n);
                            break;
                        case 0:
                            s.push(n)
                    }
                }
                const At = /^:([^:]+):(.+)$/;

                function Pt(l) {
                    if (":" === l[0]) {
                        const n = l.match(At);
                        return [n[1], n[2]]
                    }
                    return ["", l]
                }

                function Dt(l) {
                    let n = 0;
                    for (let e = 0; e < l.length; e++) n |= l[e].flags;
                    return n
                }

                function Mt(l, n, e, t, i, s, u, r, a, o, c, d, h, p, f, g, m, y, v, b) {
                    switch (l) {
                        case 1:
                            return n + Ot(e) + t;
                        case 2:
                            return n + Ot(e) + t + Ot(i) + s;
                        case 3:
                            return n + Ot(e) + t + Ot(i) + s + Ot(u) + r;
                        case 4:
                            return n + Ot(e) + t + Ot(i) + s + Ot(u) + r + Ot(a) + o;
                        case 5:
                            return n + Ot(e) + t + Ot(i) + s + Ot(u) + r + Ot(a) + o + Ot(c) + d;
                        case 6:
                            return n + Ot(e) + t + Ot(i) + s + Ot(u) + r + Ot(a) + o + Ot(c) + d + Ot(h) + p;
                        case 7:
                            return n + Ot(e) + t + Ot(i) + s + Ot(u) + r + Ot(a) + o + Ot(c) + d + Ot(h) + p + Ot(f) + g;
                        case 8:
                            return n + Ot(e) + t + Ot(i) + s + Ot(u) + r + Ot(a) + o + Ot(c) + d + Ot(h) + p + Ot(f) + g + Ot(m) + y;
                        case 9:
                            return n + Ot(e) + t + Ot(i) + s + Ot(u) + r + Ot(a) + o + Ot(c) + d + Ot(h) + p + Ot(f) + g + Ot(m) + y + Ot(v) + b;
                        default:
                            throw new Error("Does not support more than 9 expressions")
                    }
                }

                function Ot(l) {
                    return null != l ? l.toString() : ""
                }
                const Nt = new Object,
                    Rt = nt(Ln),
                    Bt = nt(Al),
                    zt = nt(jl);

                function $t(l, n, e, t) {
                    return e = xl(e), {
                        index: -1,
                        deps: _t(t, bl(n)),
                        flags: l,
                        token: n,
                        value: e
                    }
                }

                function Lt(l, n, e = Ln.THROW_IF_NOT_FOUND) {
                    const t = Ll(l);
                    try {
                        if (8 & n.flags) return n.token;
                        if (2 & n.flags && (e = null), 1 & n.flags) return l._parent.get(n.token, e);
                        const u = n.tokenKey;
                        switch (u) {
                            case Rt:
                            case Bt:
                            case zt:
                                return l
                        }
                        const r = l._def.providersByKey[u];
                        let a;
                        if (r) {
                            let n = l._providers[r.index];
                            return void 0 === n && (n = l._providers[r.index] = Ft(l, r)), n === Nt ? void 0 : n
                        }
                        if ((a = yl(n.token)) && (i = l, null != (s = a).providedIn && (function (l, n) {
                                return l._def.modules.indexOf(n) > -1
                            }(i, s.providedIn) || "root" === s.providedIn && i._def.isRoot))) {
                            const e = l._providers.length;
                            return l._def.providers[e] = l._def.providersByKey[n.tokenKey] = {
                                flags: 5120,
                                value: a.factory,
                                deps: [],
                                index: e,
                                token: n.token
                            }, l._providers[e] = Nt, l._providers[e] = Ft(l, l._def.providersByKey[n.tokenKey])
                        }
                        return 4 & n.flags ? e : l._parent.get(n.token, e)
                    } finally {
                        Ll(t)
                    }
                    var i, s
                }

                function Ft(l, n) {
                    let e;
                    switch (201347067 & n.flags) {
                        case 512:
                            e = function (l, n, e) {
                                const t = e.length;
                                switch (t) {
                                    case 0:
                                        return new n;
                                    case 1:
                                        return new n(Lt(l, e[0]));
                                    case 2:
                                        return new n(Lt(l, e[0]), Lt(l, e[1]));
                                    case 3:
                                        return new n(Lt(l, e[0]), Lt(l, e[1]), Lt(l, e[2]));
                                    default:
                                        const i = new Array(t);
                                        for (let n = 0; n < t; n++) i[n] = Lt(l, e[n]);
                                        return new n(...i)
                                }
                            }(l, n.value, n.deps);
                            break;
                        case 1024:
                            e = function (l, n, e) {
                                const t = e.length;
                                switch (t) {
                                    case 0:
                                        return n();
                                    case 1:
                                        return n(Lt(l, e[0]));
                                    case 2:
                                        return n(Lt(l, e[0]), Lt(l, e[1]));
                                    case 3:
                                        return n(Lt(l, e[0]), Lt(l, e[1]), Lt(l, e[2]));
                                    default:
                                        const i = Array(t);
                                        for (let n = 0; n < t; n++) i[n] = Lt(l, e[n]);
                                        return n(...i)
                                }
                            }(l, n.value, n.deps);
                            break;
                        case 2048:
                            e = Lt(l, n.deps[0]);
                            break;
                        case 256:
                            e = n.value
                    }
                    return e === Nt || null === e || "object" != typeof e || 131072 & n.flags || "function" != typeof e.ngOnDestroy || (n.flags |= 131072), void 0 === e ? Nt : e
                }

                function qt(l, n) {
                    const e = l.viewContainer._embeddedViews;
                    if ((null == n || n >= e.length) && (n = e.length - 1), n < 0) return null;
                    const t = e[n];
                    return t.viewContainerParent = null, Kl(e, n), Xe.dirtyParentQueries(t), Ht(t), t
                }

                function Ut(l, n, e) {
                    const t = n ? gt(n, n.def.lastRenderRootNode) : l.renderElement,
                        i = e.renderer.parentNode(t),
                        s = e.renderer.nextSibling(t);
                    St(e, 2, i, s, void 0)
                }

                function Ht(l) {
                    St(l, 3, null, null, void 0)
                }
                const Vt = new Object;

                function jt(l, n, e, t, i, s) {
                    return new Gt(l, n, e, t, i, s)
                }
                class Gt extends ue {
                    constructor(l, n, e, t, i, s) {
                        super(), this.selector = l, this.componentType = n, this._inputs = t, this._outputs = i, this.ngContentSelectors = s, this.viewDefFactory = e
                    }
                    get inputs() {
                        const l = [],
                            n = this._inputs;
                        for (let e in n) l.push({
                            propName: e,
                            templateName: n[e]
                        });
                        return l
                    }
                    get outputs() {
                        const l = [];
                        for (let n in this._outputs) l.push({
                            propName: n,
                            templateName: this._outputs[n]
                        });
                        return l
                    }
                    create(l, n, e, t) {
                        if (!t) throw new Error("ngModule should be provided");
                        const i = kt(this.viewDefFactory),
                            s = i.nodes[0].element.componentProvider.nodeIndex,
                            u = Xe.createRootView(l, n || [], e, i, t, Vt),
                            r = Ze(u, s).instance;
                        return e && u.renderer.setAttribute(Ke(u, 0).renderElement, "ng-version", xe.full), new Wt(u, new Yt(u), r)
                    }
                }
                class Wt extends se {
                    constructor(l, n, e) {
                        super(), this._view = l, this._viewRef = n, this._component = e, this._elDef = this._view.def.nodes[0], this.hostView = n, this.changeDetectorRef = n, this.instance = e
                    }
                    get location() {
                        return new fe(Ke(this._view, this._elDef.nodeIndex).renderElement)
                    }
                    get injector() {
                        return new ni(this._view, this._elDef)
                    }
                    get componentType() {
                        return this._component.constructor
                    }
                    destroy() {
                        this._viewRef.destroy()
                    }
                    onDestroy(l) {
                        this._viewRef.onDestroy(l)
                    }
                }

                function Kt(l, n, e) {
                    return new Zt(l, n, e)
                }
                class Zt {
                    constructor(l, n, e) {
                        this._view = l, this._elDef = n, this._data = e, this._embeddedViews = []
                    }
                    get element() {
                        return new fe(this._data.renderElement)
                    }
                    get injector() {
                        return new ni(this._view, this._elDef)
                    }
                    get parentInjector() {
                        let l = this._view,
                            n = this._elDef.parent;
                        for (; !n && l;) n = ft(l), l = l.parent;
                        return l ? new ni(l, n) : new ni(this._view, null)
                    }
                    clear() {
                        for (let l = this._embeddedViews.length - 1; l >= 0; l--) {
                            const n = qt(this._data, l);
                            Xe.destroyView(n)
                        }
                    }
                    get(l) {
                        const n = this._embeddedViews[l];
                        if (n) {
                            const l = new Yt(n);
                            return l.attachToViewContainerRef(this), l
                        }
                        return null
                    }
                    get length() {
                        return this._embeddedViews.length
                    }
                    createEmbeddedView(l, n, e) {
                        const t = l.createEmbeddedView(n || {});
                        return this.insert(t, e), t
                    }
                    createComponent(l, n, e, t, i) {
                        const s = e || this.parentInjector;
                        i || l instanceof he || (i = s.get(jl));
                        const u = l.create(s, t, void 0, i);
                        return this.insert(u.hostView, n), u
                    }
                    insert(l, n) {
                        if (l.destroyed) throw new Error("Cannot insert a destroyed View in a ViewContainer!");
                        const e = l;
                        return function (l, n, e, t) {
                            let i = n.viewContainer._embeddedViews;
                            null == e && (e = i.length), t.viewContainerParent = l, Wl(i, e, t),
                                function (l, n) {
                                    const e = pt(n);
                                    if (!e || e === l || 16 & n.state) return;
                                    n.state |= 16;
                                    let t = e.template._projectedViews;
                                    t || (t = e.template._projectedViews = []), t.push(n),
                                        function (l, n) {
                                            if (4 & n.flags) return;
                                            l.nodeFlags |= 4, n.flags |= 4;
                                            let e = n.parent;
                                            for (; e;) e.childFlags |= 4, e = e.parent
                                        }(n.parent.def, n.parentNodeDef)
                                }(n, t), Xe.dirtyParentQueries(t), Ut(n, e > 0 ? i[e - 1] : null, t)
                        }(this._view, this._data, n, e._view), e.attachToViewContainerRef(this), l
                    }
                    move(l, n) {
                        if (l.destroyed) throw new Error("Cannot move a destroyed View in a ViewContainer!");
                        const e = this._embeddedViews.indexOf(l._view);
                        return function (l, n, e) {
                            const t = l.viewContainer._embeddedViews,
                                i = t[n];
                            Kl(t, n), null == e && (e = t.length), Wl(t, e, i), Xe.dirtyParentQueries(i), Ht(i), Ut(l, e > 0 ? t[e - 1] : null, i)
                        }(this._data, e, n), l
                    }
                    indexOf(l) {
                        return this._embeddedViews.indexOf(l._view)
                    }
                    remove(l) {
                        const n = qt(this._data, l);
                        n && Xe.destroyView(n)
                    }
                    detach(l) {
                        const n = qt(this._data, l);
                        return n ? new Yt(n) : null
                    }
                }

                function Qt(l) {
                    return new Yt(l)
                }
                class Yt {
                    constructor(l) {
                        this._view = l, this._viewContainerRef = null, this._appRef = null
                    }
                    get rootNodes() {
                        return function (l) {
                            const n = [];
                            return St(l, 0, void 0, void 0, n), n
                        }(this._view)
                    }
                    get context() {
                        return this._view.context
                    }
                    get destroyed() {
                        return 0 != (128 & this._view.state)
                    }
                    markForCheck() {
                        ct(this._view)
                    }
                    detach() {
                        this._view.state &= -5
                    }
                    detectChanges() {
                        const l = this._view.root.rendererFactory;
                        l.begin && l.begin();
                        try {
                            Xe.checkAndUpdateView(this._view)
                        } finally {
                            l.end && l.end()
                        }
                    }
                    checkNoChanges() {
                        Xe.checkNoChangesView(this._view)
                    }
                    reattach() {
                        this._view.state |= 4
                    }
                    onDestroy(l) {
                        this._view.disposables || (this._view.disposables = []), this._view.disposables.push(l)
                    }
                    destroy() {
                        this._appRef ? this._appRef.detachView(this) : this._viewContainerRef && this._viewContainerRef.detach(this._viewContainerRef.indexOf(this)), Xe.destroyView(this._view)
                    }
                    detachFromAppRef() {
                        this._appRef = null, Ht(this._view), Xe.dirtyParentQueries(this._view)
                    }
                    attachToAppRef(l) {
                        if (this._viewContainerRef) throw new Error("This view is already attached to a ViewContainer!");
                        this._appRef = l
                    }
                    attachToViewContainerRef(l) {
                        if (this._appRef) throw new Error("This view is already attached directly to the ApplicationRef!");
                        this._viewContainerRef = l
                    }
                }

                function Xt(l, n) {
                    return new Jt(l, n)
                }
                class Jt extends $e {
                    constructor(l, n) {
                        super(), this._parentView = l, this._def = n
                    }
                    createEmbeddedView(l) {
                        return new Yt(Xe.createEmbeddedView(this._parentView, this._def, this._def.element.template, l))
                    }
                    get elementRef() {
                        return new fe(Ke(this._parentView, this._def.nodeIndex).renderElement)
                    }
                }

                function li(l, n) {
                    return new ni(l, n)
                }
                class ni {
                    constructor(l, n) {
                        this.view = l, this.elDef = n
                    }
                    get(l, n = Ln.THROW_IF_NOT_FOUND) {
                        return Xe.resolveDep(this.view, this.elDef, !!this.elDef && 0 != (33554432 & this.elDef.flags), {
                            flags: 0,
                            token: l,
                            tokenKey: nt(l)
                        }, n)
                    }
                }

                function ei(l, n) {
                    const e = l.def.nodes[n];
                    if (1 & e.flags) {
                        const n = Ke(l, e.nodeIndex);
                        return e.element.template ? n.template : n.renderElement
                    }
                    if (2 & e.flags) return We(l, e.nodeIndex).renderText;
                    if (20240 & e.flags) return Ze(l, e.nodeIndex).instance;
                    throw new Error(`Illegal state: read nodeValue for node index ${n}`)
                }

                function ti(l) {
                    return new ii(l.renderer)
                }
                class ii {
                    constructor(l) {
                        this.delegate = l
                    }
                    selectRootElement(l) {
                        return this.delegate.selectRootElement(l)
                    }
                    createElement(l, n) {
                        const [e, t] = Pt(n), i = this.delegate.createElement(t, e);
                        return l && this.delegate.appendChild(l, i), i
                    }
                    createViewRoot(l) {
                        return l
                    }
                    createTemplateAnchor(l) {
                        const n = this.delegate.createComment("");
                        return l && this.delegate.appendChild(l, n), n
                    }
                    createText(l, n) {
                        const e = this.delegate.createText(n);
                        return l && this.delegate.appendChild(l, e), e
                    }
                    projectNodes(l, n) {
                        for (let e = 0; e < n.length; e++) this.delegate.appendChild(l, n[e])
                    }
                    attachViewAfter(l, n) {
                        const e = this.delegate.parentNode(l),
                            t = this.delegate.nextSibling(l);
                        for (let i = 0; i < n.length; i++) this.delegate.insertBefore(e, n[i], t)
                    }
                    detachView(l) {
                        for (let n = 0; n < l.length; n++) {
                            const e = l[n],
                                t = this.delegate.parentNode(e);
                            this.delegate.removeChild(t, e)
                        }
                    }
                    destroyView(l, n) {
                        for (let e = 0; e < n.length; e++) this.delegate.destroyNode(n[e])
                    }
                    listen(l, n, e) {
                        return this.delegate.listen(l, n, e)
                    }
                    listenGlobal(l, n, e) {
                        return this.delegate.listen(l, n, e)
                    }
                    setElementProperty(l, n, e) {
                        this.delegate.setProperty(l, n, e)
                    }
                    setElementAttribute(l, n, e) {
                        const [t, i] = Pt(n);
                        null != e ? this.delegate.setAttribute(l, i, e, t) : this.delegate.removeAttribute(l, i, t)
                    }
                    setBindingDebugInfo(l, n, e) {}
                    setElementClass(l, n, e) {
                        e ? this.delegate.addClass(l, n) : this.delegate.removeClass(l, n)
                    }
                    setElementStyle(l, n, e) {
                        null != e ? this.delegate.setStyle(l, n, e) : this.delegate.removeStyle(l, n)
                    }
                    invokeElementMethod(l, n, e) {
                        l[n].apply(l, e)
                    }
                    setText(l, n) {
                        this.delegate.setValue(l, n)
                    }
                    animate() {
                        throw new Error("Renderer.animate is no longer supported!")
                    }
                }

                function si(l, n, e, t) {
                    return new ui(l, n, e, t)
                }
                class ui {
                    constructor(l, n, e, t) {
                        this._moduleType = l, this._parent = n, this._bootstrapComponents = e, this._def = t, this._destroyListeners = [], this._destroyed = !1, this.injector = this,
                            function (l) {
                                const n = l._def,
                                    e = l._providers = new Array(n.providers.length);
                                for (let t = 0; t < n.providers.length; t++) {
                                    const i = n.providers[t];
                                    4096 & i.flags || void 0 === e[t] && (e[t] = Ft(l, i))
                                }
                            }(this)
                    }
                    get(l, n = Ln.THROW_IF_NOT_FOUND, e = pl.Default) {
                        let t = 0;
                        return e & pl.SkipSelf ? t |= 1 : e & pl.Self && (t |= 4), Lt(this, {
                            token: l,
                            tokenKey: nt(l),
                            flags: t
                        }, n)
                    }
                    get instance() {
                        return this.get(this._moduleType)
                    }
                    get componentFactoryResolver() {
                        return this.get(ce)
                    }
                    destroy() {
                        if (this._destroyed) throw new Error(`The ng module ${bl(this.instance.constructor)} has already been destroyed.`);
                        this._destroyed = !0,
                            function (l, n) {
                                const e = l._def,
                                    t = new Set;
                                for (let i = 0; i < e.providers.length; i++)
                                    if (131072 & e.providers[i].flags) {
                                        const n = l._providers[i];
                                        if (n && n !== Nt) {
                                            const l = n.ngOnDestroy;
                                            "function" != typeof l || t.has(n) || (l.apply(n), t.add(n))
                                        }
                                    }
                            }(this), this._destroyListeners.forEach(l => l())
                    }
                    onDestroy(l) {
                        this._destroyListeners.push(l)
                    }
                }
                const ri = nt(me),
                    ai = nt(be),
                    oi = nt(fe),
                    ci = nt(Fe),
                    di = nt($e),
                    hi = nt(Rn),
                    pi = nt(Ln),
                    fi = nt(Al);

                function gi(l, n, e, t, i, s, u, r) {
                    const a = [];
                    if (u)
                        for (let c in u) {
                            const [l, n] = u[c];
                            a[l] = {
                                flags: 8,
                                name: c,
                                nonMinifiedName: n,
                                ns: null,
                                securityContext: null,
                                suffix: null
                            }
                        }
                    const o = [];
                    if (r)
                        for (let c in r) o.push({
                            type: 1,
                            propName: c,
                            target: null,
                            eventName: r[c]
                        });
                    return vi(l, n |= 16384, e, t, i, i, s, a, o)
                }

                function mi(l, n, e) {
                    return vi(-1, l |= 16, null, 0, n, n, e)
                }

                function yi(l, n, e, t, i) {
                    return vi(-1, l, n, 0, e, t, i)
                }

                function vi(l, n, e, t, i, s, u, r, a) {
                    const {
                        matchedQueries: o,
                        references: c,
                        matchedQueryIds: d
                    } = bt(e);
                    a || (a = []), r || (r = []), s = xl(s);
                    const h = _t(u, bl(i));
                    return {
                        nodeIndex: -1,
                        parent: null,
                        renderParent: null,
                        bindingIndex: -1,
                        outputIndex: -1,
                        checkIndex: l,
                        flags: n,
                        childFlags: 0,
                        directChildFlags: 0,
                        childMatchedQueries: 0,
                        matchedQueries: o,
                        matchedQueryIds: d,
                        references: c,
                        ngContentIndex: -1,
                        childCount: t,
                        bindings: r,
                        bindingFlags: Dt(r),
                        outputs: a,
                        element: null,
                        provider: {
                            token: i,
                            value: s,
                            deps: h
                        },
                        text: null,
                        query: null,
                        ngContent: null
                    }
                }

                function bi(l, n) {
                    return ki(l, n)
                }

                function _i(l, n) {
                    let e = l;
                    for (; e.parent && !mt(e);) e = e.parent;
                    return Si(e.parent, ft(e), !0, n.provider.value, n.provider.deps)
                }

                function wi(l, n) {
                    const e = Si(l, n.parent, (32768 & n.flags) > 0, n.provider.value, n.provider.deps);
                    if (n.outputs.length)
                        for (let t = 0; t < n.outputs.length; t++) {
                            const i = n.outputs[t],
                                s = e[i.propName];
                            if (!te(s)) throw new Error(`@Output ${i.propName} not initialized in '${e.constructor.name}'.`); {
                                const e = s.subscribe(xi(l, n.parent.nodeIndex, i.eventName));
                                l.disposables[n.outputIndex + t] = e.unsubscribe.bind(e)
                            }
                        }
                    return e
                }

                function xi(l, n, e) {
                    return t => ht(l, n, e, t)
                }

                function ki(l, n) {
                    const e = (8192 & n.flags) > 0,
                        t = n.provider;
                    switch (201347067 & n.flags) {
                        case 512:
                            return Si(l, n.parent, e, t.value, t.deps);
                        case 1024:
                            return function (l, n, e, t, i) {
                                const s = i.length;
                                switch (s) {
                                    case 0:
                                        return t();
                                    case 1:
                                        return t(Ii(l, n, e, i[0]));
                                    case 2:
                                        return t(Ii(l, n, e, i[0]), Ii(l, n, e, i[1]));
                                    case 3:
                                        return t(Ii(l, n, e, i[0]), Ii(l, n, e, i[1]), Ii(l, n, e, i[2]));
                                    default:
                                        const u = Array(s);
                                        for (let t = 0; t < s; t++) u[t] = Ii(l, n, e, i[t]);
                                        return t(...u)
                                }
                            }(l, n.parent, e, t.value, t.deps);
                        case 2048:
                            return Ii(l, n.parent, e, t.deps[0]);
                        case 256:
                            return t.value
                    }
                }

                function Si(l, n, e, t, i) {
                    const s = i.length;
                    switch (s) {
                        case 0:
                            return new t;
                        case 1:
                            return new t(Ii(l, n, e, i[0]));
                        case 2:
                            return new t(Ii(l, n, e, i[0]), Ii(l, n, e, i[1]));
                        case 3:
                            return new t(Ii(l, n, e, i[0]), Ii(l, n, e, i[1]), Ii(l, n, e, i[2]));
                        default:
                            const u = new Array(s);
                            for (let t = 0; t < s; t++) u[t] = Ii(l, n, e, i[t]);
                            return new t(...u)
                    }
                }
                const Ci = {};

                function Ii(l, n, e, t, i = Ln.THROW_IF_NOT_FOUND) {
                    if (8 & t.flags) return t.token;
                    const s = l;
                    2 & t.flags && (i = null);
                    const u = t.tokenKey;
                    u === hi && (e = !(!n || !n.element.componentView)), n && 1 & t.flags && (e = !1, n = n.parent);
                    let r = l;
                    for (; r;) {
                        if (n) switch (u) {
                            case ri:
                                return ti(Ti(r, n, e));
                            case ai:
                                return Ti(r, n, e).renderer;
                            case oi:
                                return new fe(Ke(r, n.nodeIndex).renderElement);
                            case ci:
                                return Ke(r, n.nodeIndex).viewContainer;
                            case di:
                                if (n.element.template) return Ke(r, n.nodeIndex).template;
                                break;
                            case hi:
                                return Qt(Ti(r, n, e));
                            case pi:
                            case fi:
                                return li(r, n);
                            default:
                                const l = (e ? n.element.allProviders : n.element.publicProviders)[u];
                                if (l) {
                                    let n = Ze(r, l.nodeIndex);
                                    return n || (n = {
                                        instance: ki(r, l)
                                    }, r.nodes[l.nodeIndex] = n), n.instance
                                }
                        }
                        e = mt(r), n = ft(r), r = r.parent, 4 & t.flags && (r = null)
                    }
                    const a = s.root.injector.get(t.token, Ci);
                    return a !== Ci || i === Ci ? a : s.root.ngModule.injector.get(t.token, i)
                }

                function Ti(l, n, e) {
                    let t;
                    if (e) t = Ke(l, n.nodeIndex).componentView;
                    else
                        for (t = l; t.parent && !mt(t);) t = t.parent;
                    return t
                }

                function Ei(l, n, e, t, i, s) {
                    if (32768 & e.flags) {
                        const n = Ke(l, e.parent.nodeIndex).componentView;
                        2 & n.def.flags && (n.state |= 8)
                    }
                    if (n.instance[e.bindings[t].name] = i, 524288 & e.flags) {
                        s = s || {};
                        const n = Jn.unwrap(l.oldValues[e.bindingIndex + t]);
                        s[e.bindings[t].nonMinifiedName] = new ie(n, i, 0 != (2 & l.state))
                    }
                    return l.oldValues[e.bindingIndex + t] = i, s
                }

                function Ai(l, n) {
                    if (!(l.def.nodeFlags & n)) return;
                    const e = l.def.nodes;
                    let t = 0;
                    for (let i = 0; i < e.length; i++) {
                        const s = e[i];
                        let u = s.parent;
                        for (!u && s.flags & n && Di(l, i, s.flags & n, t++), 0 == (s.childFlags & n) && (i += s.childCount); u && 1 & u.flags && i === u.nodeIndex + u.childCount;) u.directChildFlags & n && (t = Pi(l, u, n, t)), u = u.parent
                    }
                }

                function Pi(l, n, e, t) {
                    for (let i = n.nodeIndex + 1; i <= n.nodeIndex + n.childCount; i++) {
                        const n = l.def.nodes[i];
                        n.flags & e && Di(l, i, n.flags & e, t++), i += n.childCount
                    }
                    return t
                }

                function Di(l, n, e, t) {
                    const i = Ze(l, n);
                    if (!i) return;
                    const s = i.instance;
                    s && (Xe.setCurrentNode(l, n), 1048576 & e && Ge(l, 512, t) && s.ngAfterContentInit(), 2097152 & e && s.ngAfterContentChecked(), 4194304 & e && Ge(l, 768, t) && s.ngAfterViewInit(), 8388608 & e && s.ngAfterViewChecked(), 131072 & e && s.ngOnDestroy())
                }
                const Mi = new El("SCHEDULER_TOKEN", {
                        providedIn: "root",
                        factory: () => Ql
                    }),
                    Oi = {},
                    Ni = function () {
                        var l = {
                            LocaleId: 0,
                            DayPeriodsFormat: 1,
                            DayPeriodsStandalone: 2,
                            DaysFormat: 3,
                            DaysStandalone: 4,
                            MonthsFormat: 5,
                            MonthsStandalone: 6,
                            Eras: 7,
                            FirstDayOfWeek: 8,
                            WeekendRange: 9,
                            DateFormat: 10,
                            TimeFormat: 11,
                            DateTimeFormat: 12,
                            NumberSymbols: 13,
                            NumberFormats: 14,
                            CurrencySymbol: 15,
                            CurrencyName: 16,
                            Currencies: 17,
                            PluralCase: 18,
                            ExtraData: 19
                        };
                        return l[l.LocaleId] = "LocaleId", l[l.DayPeriodsFormat] = "DayPeriodsFormat", l[l.DayPeriodsStandalone] = "DayPeriodsStandalone", l[l.DaysFormat] = "DaysFormat", l[l.DaysStandalone] = "DaysStandalone", l[l.MonthsFormat] = "MonthsFormat", l[l.MonthsStandalone] = "MonthsStandalone", l[l.Eras] = "Eras", l[l.FirstDayOfWeek] = "FirstDayOfWeek", l[l.WeekendRange] = "WeekendRange", l[l.DateFormat] = "DateFormat", l[l.TimeFormat] = "TimeFormat", l[l.DateTimeFormat] = "DateTimeFormat", l[l.NumberSymbols] = "NumberSymbols", l[l.NumberFormats] = "NumberFormats", l[l.CurrencySymbol] = "CurrencySymbol", l[l.CurrencyName] = "CurrencyName", l[l.Currencies] = "Currencies", l[l.PluralCase] = "PluralCase", l[l.ExtraData] = "ExtraData", l
                    }(),
                    Ri = void 0;
                var Bi = ["en", [["a", "p"], ["AM", "PM"], Ri], [["AM", "PM"], Ri, Ri], [["S", "M", "T", "W", "T", "F", "S"], ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]], Ri, [["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]], Ri, [["B", "A"], ["BC", "AD"], ["Before Christ", "Anno Domini"]], 0, [6, 0], ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"], ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"], ["{1}, {0}", Ri, "{1} 'at' {0}", Ri], [".", ",", ";", "%", "+", "-", "E", "\xd7", "\u2030", "\u221e", "NaN", ":"], ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"], "$", "US Dollar", {}, function (l) {
                    let n = Math.floor(Math.abs(l)),
                        e = l.toString().replace(/^[^.]*\.?/, "").length;
                    return 1 === n && 0 === e ? 1 : 5
                }];

                function zi(l) {
                    const n = l.toLowerCase().replace(/_/g, "-");
                    let e = Oi[n];
                    if (e) return e;
                    const t = n.split("-")[0];
                    if (e = Oi[t]) return e;
                    if ("en" === t) return Bi;
                    throw new Error(`Missing locale data for the locale "${l}".`)
                }
                const $i = "en-US";
                let Li = $i;

                function Fi(l) {
                    var n;
                    n = "Expected localeId to be defined", null == l && function (l) {
                        throw new Error(`ASSERTION ERROR: ${l}`)
                    }(n), "string" == typeof l && (Li = l.toLowerCase().replace(/_/g, "-"))
                }
                class qi extends T {
                    constructor(l = !1) {
                        super(), this.__isAsync = l
                    }
                    emit(l) {
                        super.next(l)
                    }
                    subscribe(l, n, e) {
                        let t, i = l => null,
                            s = () => null;
                        l && "object" == typeof l ? (t = this.__isAsync ? n => {
                            setTimeout(() => l.next(n))
                        } : n => {
                            l.next(n)
                        }, l.error && (i = this.__isAsync ? n => {
                            setTimeout(() => l.error(n))
                        } : n => {
                            l.error(n)
                        }), l.complete && (s = this.__isAsync ? () => {
                            setTimeout(() => l.complete())
                        } : () => {
                            l.complete()
                        })) : (t = this.__isAsync ? n => {
                            setTimeout(() => l(n))
                        } : n => {
                            l(n)
                        }, n && (i = this.__isAsync ? l => {
                            setTimeout(() => n(l))
                        } : l => {
                            n(l)
                        }), e && (s = this.__isAsync ? () => {
                            setTimeout(() => e())
                        } : () => {
                            e()
                        }));
                        const u = super.subscribe(t, i, s);
                        return l instanceof h && l.add(u), u
                    }
                }

                function Ui() {
                    return this._results[Qn()]()
                }
                class Hi {
                    constructor() {
                        this.dirty = !0, this._results = [], this.changes = new qi, this.length = 0;
                        const l = Qn(),
                            n = Hi.prototype;
                        n[l] || (n[l] = Ui)
                    }
                    map(l) {
                        return this._results.map(l)
                    }
                    filter(l) {
                        return this._results.filter(l)
                    }
                    find(l) {
                        return this._results.find(l)
                    }
                    reduce(l, n) {
                        return this._results.reduce(l, n)
                    }
                    forEach(l) {
                        this._results.forEach(l)
                    }
                    some(l) {
                        return this._results.some(l)
                    }
                    toArray() {
                        return this._results.slice()
                    }
                    toString() {
                        return this._results.toString()
                    }
                    reset(l) {
                        this._results = function l(n, e) {
                            void 0 === e && (e = n);
                            for (let t = 0; t < n.length; t++) {
                                let i = n[t];
                                Array.isArray(i) ? (e === n && (e = n.slice(0, t)), l(i, e)) : e !== n && e.push(i)
                            }
                            return e
                        }(l), this.dirty = !1, this.length = this._results.length, this.last = this._results[this.length - 1], this.first = this._results[0]
                    }
                    notifyOnChanges() {
                        this.changes.emit(this)
                    }
                    setDirty() {
                        this.dirty = !0
                    }
                    destroy() {
                        this.changes.complete(), this.changes.unsubscribe()
                    }
                }
                const Vi = new El("Application Initializer");
                class ji {
                    constructor(l) {
                        this.appInits = l, this.initialized = !1, this.done = !1, this.donePromise = new Promise((l, n) => {
                            this.resolve = l, this.reject = n
                        })
                    }
                    runInitializers() {
                        if (this.initialized) return;
                        const l = [],
                            n = () => {
                                this.done = !0, this.resolve()
                            };
                        if (this.appInits)
                            for (let e = 0; e < this.appInits.length; e++) {
                                const n = this.appInits[e]();
                                ee(n) && l.push(n)
                            }
                        Promise.all(l).then(() => {
                            n()
                        }).catch(l => {
                            this.reject(l)
                        }), 0 === l.length && n(), this.initialized = !0
                    }
                }
                const Gi = new El("AppId");

                function Wi() {
                    return `${Ki()}${Ki()}${Ki()}`
                }

                function Ki() {
                    return String.fromCharCode(97 + Math.floor(25 * Math.random()))
                }
                const Zi = new El("Platform Initializer"),
                    Qi = new El("Platform ID"),
                    Yi = new El("appBootstrapListener");
                class Xi {
                    log(l) {
                        console.log(l)
                    }
                    warn(l) {
                        console.warn(l)
                    }
                }
                const Ji = new El("LocaleId"),
                    ls = !1;

                function ns() {
                    throw new Error("Runtime compiler is not loaded")
                }
                const es = ns,
                    ts = ns,
                    is = ns,
                    ss = ns;
                class us {
                    constructor() {
                        this.compileModuleSync = es, this.compileModuleAsync = ts, this.compileModuleAndAllComponentsSync = is, this.compileModuleAndAllComponentsAsync = ss
                    }
                    clearCache() {}
                    clearCacheFor(l) {}
                    getModuleId(l) {}
                }
                class rs {}
                let as, os;

                function cs() {
                    const l = Tl.wtf;
                    return !(!l || !(as = l.trace) || (os = as.events, 0))
                }
                const ds = cs();

                function hs(l, n) {
                    return null
                }
                const ps = ds ? function (l, n = null) {
                        return os.createScope(l, n)
                    } : (l, n) => hs,
                    fs = ds ? function (l, n) {
                        return as.leaveScope(l, n), n
                    } : (l, n) => n,
                    gs = (() => Promise.resolve(0))();

                function ms(l) {
                    "undefined" == typeof Zone ? gs.then(() => {
                        l && l.apply(null, null)
                    }) : Zone.current.scheduleMicroTask("scheduleMicrotask", l)
                }
                class ys {
                    constructor({
                        enableLongStackTrace: l = !1
                    }) {
                        if (this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new qi(!1), this.onMicrotaskEmpty = new qi(!1), this.onStable = new qi(!1), this.onError = new qi(!1), "undefined" == typeof Zone) throw new Error("In this configuration Angular requires Zone.js");
                        var n;
                        Zone.assertZonePatched(), this._nesting = 0, this._outer = this._inner = Zone.current, Zone.wtfZoneSpec && (this._inner = this._inner.fork(Zone.wtfZoneSpec)), Zone.TaskTrackingZoneSpec && (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec)), l && Zone.longStackTraceZoneSpec && (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)), (n = this)._inner = n._inner.fork({
                            name: "angular",
                            properties: {
                                isAngularZone: !0
                            },
                            onInvokeTask: (l, e, t, i, s, u) => {
                                try {
                                    return ws(n), l.invokeTask(t, i, s, u)
                                } finally {
                                    xs(n)
                                }
                            },
                            onInvoke: (l, e, t, i, s, u, r) => {
                                try {
                                    return ws(n), l.invoke(t, i, s, u, r)
                                } finally {
                                    xs(n)
                                }
                            },
                            onHasTask: (l, e, t, i) => {
                                l.hasTask(t, i), e === t && ("microTask" == i.change ? (n.hasPendingMicrotasks = i.microTask, _s(n)) : "macroTask" == i.change && (n.hasPendingMacrotasks = i.macroTask))
                            },
                            onHandleError: (l, e, t, i) => (l.handleError(t, i), n.runOutsideAngular(() => n.onError.emit(i)), !1)
                        })
                    }
                    static isInAngularZone() {
                        return !0 === Zone.current.get("isAngularZone")
                    }
                    static assertInAngularZone() {
                        if (!ys.isInAngularZone()) throw new Error("Expected to be in Angular Zone, but it is not!")
                    }
                    static assertNotInAngularZone() {
                        if (ys.isInAngularZone()) throw new Error("Expected to not be in Angular Zone, but it is!")
                    }
                    run(l, n, e) {
                        return this._inner.run(l, n, e)
                    }
                    runTask(l, n, e, t) {
                        const i = this._inner,
                            s = i.scheduleEventTask("NgZoneEvent: " + t, l, bs, vs, vs);
                        try {
                            return i.runTask(s, n, e)
                        } finally {
                            i.cancelTask(s)
                        }
                    }
                    runGuarded(l, n, e) {
                        return this._inner.runGuarded(l, n, e)
                    }
                    runOutsideAngular(l) {
                        return this._outer.run(l)
                    }
                }

                function vs() {}
                const bs = {};

                function _s(l) {
                    if (0 == l._nesting && !l.hasPendingMicrotasks && !l.isStable) try {
                        l._nesting++, l.onMicrotaskEmpty.emit(null)
                    } finally {
                        if (l._nesting--, !l.hasPendingMicrotasks) try {
                            l.runOutsideAngular(() => l.onStable.emit(null))
                        } finally {
                            l.isStable = !0
                        }
                    }
                }

                function ws(l) {
                    l._nesting++, l.isStable && (l.isStable = !1, l.onUnstable.emit(null))
                }

                function xs(l) {
                    l._nesting--, _s(l)
                }
                class ks {
                    constructor() {
                        this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new qi, this.onMicrotaskEmpty = new qi, this.onStable = new qi, this.onError = new qi
                    }
                    run(l) {
                        return l()
                    }
                    runGuarded(l) {
                        return l()
                    }
                    runOutsideAngular(l) {
                        return l()
                    }
                    runTask(l) {
                        return l()
                    }
                }
                class Ss {
                    constructor(l) {
                        this._ngZone = l, this._pendingCount = 0, this._isZoneStable = !0, this._didWork = !1, this._callbacks = [], this.taskTrackingZone = null, this._watchAngularEvents(), l.run(() => {
                            this.taskTrackingZone = "undefined" == typeof Zone ? null : Zone.current.get("TaskTrackingZone")
                        })
                    }
                    _watchAngularEvents() {
                        this._ngZone.onUnstable.subscribe({
                            next: () => {
                                this._didWork = !0, this._isZoneStable = !1
                            }
                        }), this._ngZone.runOutsideAngular(() => {
                            this._ngZone.onStable.subscribe({
                                next: () => {
                                    ys.assertNotInAngularZone(), ms(() => {
                                        this._isZoneStable = !0, this._runCallbacksIfReady()
                                    })
                                }
                            })
                        })
                    }
                    increasePendingRequestCount() {
                        return this._pendingCount += 1, this._didWork = !0, this._pendingCount
                    }
                    decreasePendingRequestCount() {
                        if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
                        return this._runCallbacksIfReady(), this._pendingCount
                    }
                    isStable() {
                        return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
                    }
                    _runCallbacksIfReady() {
                        if (this.isStable()) ms(() => {
                            for (; 0 !== this._callbacks.length;) {
                                let l = this._callbacks.pop();
                                clearTimeout(l.timeoutId), l.doneCb(this._didWork)
                            }
                            this._didWork = !1
                        });
                        else {
                            let l = this.getPendingTasks();
                            this._callbacks = this._callbacks.filter(n => !n.updateCb || !n.updateCb(l) || (clearTimeout(n.timeoutId), !1)), this._didWork = !0
                        }
                    }
                    getPendingTasks() {
                        return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(l => ({
                            source: l.source,
                            creationLocation: l.creationLocation,
                            data: l.data
                        })) : []
                    }
                    addCallback(l, n, e) {
                        let t = -1;
                        n && n > 0 && (t = setTimeout(() => {
                            this._callbacks = this._callbacks.filter(l => l.timeoutId !== t), l(this._didWork, this.getPendingTasks())
                        }, n)), this._callbacks.push({
                            doneCb: l,
                            timeoutId: t,
                            updateCb: e
                        })
                    }
                    whenStable(l, n, e) {
                        if (e && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?');
                        this.addCallback(l, n, e), this._runCallbacksIfReady()
                    }
                    getPendingRequestCount() {
                        return this._pendingCount
                    }
                    findProviders(l, n, e) {
                        return []
                    }
                }
                class Cs {
                    constructor() {
                        this._applications = new Map, Es.addToWindow(this)
                    }
                    registerApplication(l, n) {
                        this._applications.set(l, n)
                    }
                    unregisterApplication(l) {
                        this._applications.delete(l)
                    }
                    unregisterAllApplications() {
                        this._applications.clear()
                    }
                    getTestability(l) {
                        return this._applications.get(l) || null
                    }
                    getAllTestabilities() {
                        return Array.from(this._applications.values())
                    }
                    getAllRootElements() {
                        return Array.from(this._applications.keys())
                    }
                    findTestabilityInTree(l, n = !0) {
                        return Es.findTestabilityInTree(this, l, n)
                    }
                }
                class Is {
                    addToWindow(l) {}
                    findTestabilityInTree(l, n, e) {
                        return null
                    }
                }
                let Ts, Es = new Is,
                    As = function (l, n, e) {
                        return l.get(rs).createCompiler([n]).compileModuleAsync(e)
                    },
                    Ps = function (l) {
                        return l instanceof he
                    };
                const Ds = new El("AllowMultipleToken");
                class Ms {
                    constructor(l, n) {
                        this.name = l, this.token = n
                    }
                }

                function Os(l, n, e = []) {
                    const t = `Platform: ${n}`,
                        i = new El(t);
                    return (n = []) => {
                        let s = Ns();
                        if (!s || s.injector.get(Ds, !1))
                            if (l) l(e.concat(n).concat({
                                provide: i,
                                useValue: !0
                            }));
                            else {
                                const l = e.concat(n).concat({
                                    provide: i,
                                    useValue: !0
                                });
                                ! function (l) {
                                    if (Ts && !Ts.destroyed && !Ts.injector.get(Ds, !1)) throw new Error("There can be only one platform. Destroy the previous one to create a new one.");
                                    Ts = l.get(Rs);
                                    const n = l.get(Zi, null);
                                    n && n.forEach(l => l())
                                }(Ln.create({
                                    providers: l,
                                    name: t
                                }))
                            } return function (l) {
                            const n = Ns();
                            if (!n) throw new Error("No platform exists!");
                            if (!n.injector.get(l, null)) throw new Error("A platform with a different configuration has been created. Please destroy it first.");
                            return n
                        }(i)
                    }
                }

                function Ns() {
                    return Ts && !Ts.destroyed ? Ts : null
                }
                class Rs {
                    constructor(l) {
                        this._injector = l, this._modules = [], this._destroyListeners = [], this._destroyed = !1
                    }
                    bootstrapModuleFactory(l, n) {
                        const e = "noop" === (i = n ? n.ngZone : void 0) ? new ks : ("zone.js" === i ? void 0 : i) || new ys({
                                enableLongStackTrace: rn()
                            }),
                            t = [{
                                provide: ys,
                                useValue: e
                            }];
                        var i;
                        return e.run(() => {
                            const n = Ln.create({
                                    providers: t,
                                    parent: this.injector,
                                    name: l.moduleType.name
                                }),
                                i = l.create(n),
                                s = i.injector.get(tn, null);
                            if (!s) throw new Error("No ErrorHandler. Is platform module (BrowserModule) included?");
                            return ls && Fi(i.injector.get(Ji, $i) || $i), i.onDestroy(() => $s(this._modules, i)), e.runOutsideAngular(() => e.onError.subscribe({
                                    next: l => {
                                        s.handleError(l)
                                    }
                                })),
                                function (l, n, e) {
                                    try {
                                        const t = e();
                                        return ee(t) ? t.catch(e => {
                                            throw n.runOutsideAngular(() => l.handleError(e)), e
                                        }) : t
                                    } catch (t) {
                                        throw n.runOutsideAngular(() => l.handleError(t)), t
                                    }
                                }(s, e, () => {
                                    const l = i.injector.get(ji);
                                    return l.runInitializers(), l.donePromise.then(() => (this._moduleDoBootstrap(i), i))
                                })
                        })
                    }
                    bootstrapModule(l, n = []) {
                        const e = Bs({}, n);
                        return As(this.injector, e, l).then(l => this.bootstrapModuleFactory(l, e))
                    }
                    _moduleDoBootstrap(l) {
                        const n = l.injector.get(zs);
                        if (l._bootstrapComponents.length > 0) l._bootstrapComponents.forEach(l => n.bootstrap(l));
                        else {
                            if (!l.instance.ngDoBootstrap) throw new Error(`The module ${bl(l.instance.constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` + "Please define one of these.");
                            l.instance.ngDoBootstrap(n)
                        }
                        this._modules.push(l)
                    }
                    onDestroy(l) {
                        this._destroyListeners.push(l)
                    }
                    get injector() {
                        return this._injector
                    }
                    destroy() {
                        if (this._destroyed) throw new Error("The platform has already been destroyed!");
                        this._modules.slice().forEach(l => l.destroy()), this._destroyListeners.forEach(l => l()), this._destroyed = !0
                    }
                    get destroyed() {
                        return this._destroyed
                    }
                }

                function Bs(l, n) {
                    return Array.isArray(n) ? n.reduce(Bs, l) : Object.assign({}, l, n)
                }
                let zs = (() => {
                    class l {
                        constructor(l, n, e, t, i, s) {
                            this._zone = l, this._console = n, this._injector = e, this._exceptionHandler = t, this._componentFactoryResolver = i, this._initStatus = s, this._bootstrapListeners = [], this._views = [], this._runningTick = !1, this._enforceNoNewChanges = !1, this._stable = !0, this.componentTypes = [], this.components = [], this._enforceNoNewChanges = rn(), this._zone.onMicrotaskEmpty.subscribe({
                                next: () => {
                                    this._zone.run(() => {
                                        this.tick()
                                    })
                                }
                            });
                            const u = new w(l => {
                                    this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks, this._zone.runOutsideAngular(() => {
                                        l.next(this._stable), l.complete()
                                    })
                                }),
                                r = new w(l => {
                                    let n;
                                    this._zone.runOutsideAngular(() => {
                                        n = this._zone.onStable.subscribe(() => {
                                            ys.assertNotInAngularZone(), ms(() => {
                                                this._stable || this._zone.hasPendingMacrotasks || this._zone.hasPendingMicrotasks || (this._stable = !0, l.next(!0))
                                            })
                                        })
                                    });
                                    const e = this._zone.onUnstable.subscribe(() => {
                                        ys.assertInAngularZone(), this._stable && (this._stable = !1, this._zone.runOutsideAngular(() => {
                                            l.next(!1)
                                        }))
                                    });
                                    return () => {
                                        n.unsubscribe(), e.unsubscribe()
                                    }
                                });
                            this.isStable = X(u, r.pipe(ul()))
                        }
                        bootstrap(l, n) {
                            if (!this._initStatus.done) throw new Error("Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.");
                            let e;
                            e = l instanceof ue ? l : this._componentFactoryResolver.resolveComponentFactory(l), this.componentTypes.push(e.componentType);
                            const t = Ps(e) ? null : this._injector.get(jl),
                                i = e.create(Ln.NULL, [], n || e.selector, t);
                            i.onDestroy(() => {
                                this._unloadComponent(i)
                            });
                            const s = i.injector.get(Ss, null);
                            return s && i.injector.get(Cs).registerApplication(i.location.nativeElement, s), this._loadComponent(i), rn() && this._console.log("Angular is running in the development mode. Call enableProdMode() to enable the production mode."), i
                        }
                        tick() {
                            if (this._runningTick) throw new Error("ApplicationRef.tick is called recursively");
                            const n = l._tickScope();
                            try {
                                this._runningTick = !0;
                                for (let l of this._views) l.detectChanges();
                                if (this._enforceNoNewChanges)
                                    for (let l of this._views) l.checkNoChanges()
                            } catch (e) {
                                this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(e))
                            } finally {
                                this._runningTick = !1, fs(n)
                            }
                        }
                        attachView(l) {
                            const n = l;
                            this._views.push(n), n.attachToAppRef(this)
                        }
                        detachView(l) {
                            const n = l;
                            $s(this._views, n), n.detachFromAppRef()
                        }
                        _loadComponent(l) {
                            this.attachView(l.hostView), this.tick(), this.components.push(l), this._injector.get(Yi, []).concat(this._bootstrapListeners).forEach(n => n(l))
                        }
                        _unloadComponent(l) {
                            this.detachView(l.hostView), $s(this.components, l)
                        }
                        ngOnDestroy() {
                            this._views.slice().forEach(l => l.destroy())
                        }
                        get viewCount() {
                            return this._views.length
                        }
                    }
                    return l._tickScope = ps("ApplicationRef#tick()"), l
                })();

                function $s(l, n) {
                    const e = l.indexOf(n);
                    e > -1 && l.splice(e, 1)
                }
                class Ls {}
                const Fs = "#",
                    qs = "NgFactory";
                class Us {}
                const Hs = {
                    factoryPathPrefix: "",
                    factoryPathSuffix: ".ngfactory"
                };
                class Vs {
                    constructor(l, n) {
                        this._compiler = l, this._config = n || Hs
                    }
                    load(l) {
                        return !ls && this._compiler instanceof us ? this.loadFactory(l) : this.loadAndCompile(l)
                    }
                    loadAndCompile(l) {
                        let [n, t] = l.split(Fs);
                        return void 0 === t && (t = "default"), e("zn8P")(n).then(l => l[t]).then(l => js(l, n, t)).then(l => this._compiler.compileModuleAsync(l))
                    }
                    loadFactory(l) {
                        let [n, t] = l.split(Fs), i = qs;
                        return void 0 === t && (t = "default", i = ""), e("zn8P")(this._config.factoryPathPrefix + n + this._config.factoryPathSuffix).then(l => l[t + i]).then(l => js(l, n, t))
                    }
                }

                function js(l, n, e) {
                    if (!l) throw new Error(`Cannot find '${e}' in '${n}'`);
                    return l
                }
                class Gs {
                    constructor(l, n) {
                        this.name = l, this.callback = n
                    }
                }
                class Ws {
                    constructor(l, n, e) {
                        this.listeners = [], this.parent = null, this._debugContext = e, this.nativeNode = l, n && n instanceof Ks && n.addChild(this)
                    }
                    get injector() {
                        return this._debugContext.injector
                    }
                    get componentInstance() {
                        return this._debugContext.component
                    }
                    get context() {
                        return this._debugContext.context
                    }
                    get references() {
                        return this._debugContext.references
                    }
                    get providerTokens() {
                        return this._debugContext.providerTokens
                    }
                }
                class Ks extends Ws {
                    constructor(l, n, e) {
                        super(l, n, e), this.properties = {}, this.attributes = {}, this.classes = {}, this.styles = {}, this.childNodes = [], this.nativeElement = l
                    }
                    addChild(l) {
                        l && (this.childNodes.push(l), l.parent = this)
                    }
                    removeChild(l) {
                        const n = this.childNodes.indexOf(l); - 1 !== n && (l.parent = null, this.childNodes.splice(n, 1))
                    }
                    insertChildrenAfter(l, n) {
                        const e = this.childNodes.indexOf(l); - 1 !== e && (this.childNodes.splice(e + 1, 0, ...n), n.forEach(n => {
                            n.parent && n.parent.removeChild(n), l.parent = this
                        }))
                    }
                    insertBefore(l, n) {
                        const e = this.childNodes.indexOf(l); - 1 === e ? this.addChild(n) : (n.parent && n.parent.removeChild(n), n.parent = this, this.childNodes.splice(e, 0, n))
                    }
                    query(l) {
                        return this.queryAll(l)[0] || null
                    }
                    queryAll(l) {
                        const n = [];
                        return function l(n, e, t) {
                            n.childNodes.forEach(n => {
                                n instanceof Ks && (e(n) && t.push(n), l(n, e, t))
                            })
                        }(this, l, n), n
                    }
                    queryAllNodes(l) {
                        const n = [];
                        return function l(n, e, t) {
                            n instanceof Ks && n.childNodes.forEach(n => {
                                e(n) && t.push(n), n instanceof Ks && l(n, e, t)
                            })
                        }(this, l, n), n
                    }
                    get children() {
                        return this.childNodes.filter(l => l instanceof Ks)
                    }
                    triggerEventHandler(l, n) {
                        this.listeners.forEach(e => {
                            e.name == l && e.callback(n)
                        })
                    }
                }
                const Zs = new Map,
                    Qs = function (l) {
                        return Zs.get(l) || null
                    };

                function Ys(l) {
                    Zs.set(l.nativeNode, l)
                }
                const Xs = Os(null, "core", [{
                    provide: Qi,
                    useValue: "unknown"
                }, {
                    provide: Rs,
                    deps: [Ln]
                }, {
                    provide: Cs,
                    deps: []
                }, {
                    provide: Xi,
                    deps: []
                }]);

                function Js() {
                    return Be
                }

                function lu() {
                    return ze
                }

                function nu(l) {
                    return l ? (ls && Fi(l), l) : $i
                }

                function eu(l) {
                    let n = [];
                    return l.onStable.subscribe(() => {
                            for (; n.length;) n.pop()()
                        }),
                        function (l) {
                            n.push(l)
                        }
                }
                class tu {
                    constructor(l) {}
                }

                function iu(l, n, e, t, i, s) {
                    l |= 1;
                    const {
                        matchedQueries: u,
                        references: r,
                        matchedQueryIds: a
                    } = bt(n);
                    return {
                        nodeIndex: -1,
                        parent: null,
                        renderParent: null,
                        bindingIndex: -1,
                        outputIndex: -1,
                        flags: l,
                        checkIndex: -1,
                        childFlags: 0,
                        directChildFlags: 0,
                        childMatchedQueries: 0,
                        matchedQueries: u,
                        matchedQueryIds: a,
                        references: r,
                        ngContentIndex: e,
                        childCount: t,
                        bindings: [],
                        bindingFlags: 0,
                        outputs: [],
                        element: {
                            ns: null,
                            name: null,
                            attrs: null,
                            template: s ? kt(s) : null,
                            componentProvider: null,
                            componentView: null,
                            componentRendererType: null,
                            publicProviders: null,
                            allProviders: null,
                            handleEvent: i || Je
                        },
                        provider: null,
                        text: null,
                        query: null,
                        ngContent: null
                    }
                }

                function su(l, n, e, t, i, s, u = [], r, a, o, c, d) {
                    o || (o = Je);
                    const {
                        matchedQueries: h,
                        references: p,
                        matchedQueryIds: f
                    } = bt(e);
                    let g = null,
                        m = null;
                    s && ([g, m] = Pt(s)), r = r || [];
                    const y = new Array(r.length);
                    for (let _ = 0; _ < r.length; _++) {
                        const [l, n, e] = r[_], [t, i] = Pt(n);
                        let s = void 0,
                            u = void 0;
                        switch (15 & l) {
                            case 4:
                                u = e;
                                break;
                            case 1:
                            case 8:
                                s = e
                        }
                        y[_] = {
                            flags: l,
                            ns: t,
                            name: i,
                            nonMinifiedName: i,
                            securityContext: s,
                            suffix: u
                        }
                    }
                    a = a || [];
                    const v = new Array(a.length);
                    for (let _ = 0; _ < a.length; _++) {
                        const [l, n] = a[_];
                        v[_] = {
                            type: 0,
                            target: l,
                            eventName: n,
                            propName: null
                        }
                    }
                    const b = (u = u || []).map(([l, n]) => {
                        const [e, t] = Pt(l);
                        return [e, t, n]
                    });
                    return d = function (l) {
                        if (l && l.id === tt) {
                            const n = null != l.encapsulation && l.encapsulation !== Zl.None || l.styles.length || Object.keys(l.data).length;
                            l.id = n ? `c${ut++}` : it
                        }
                        return l && l.id === it && (l = null), l || null
                    }(d), c && (n |= 33554432), {
                        nodeIndex: -1,
                        parent: null,
                        renderParent: null,
                        bindingIndex: -1,
                        outputIndex: -1,
                        checkIndex: l,
                        flags: n |= 1,
                        childFlags: 0,
                        directChildFlags: 0,
                        childMatchedQueries: 0,
                        matchedQueries: h,
                        matchedQueryIds: f,
                        references: p,
                        ngContentIndex: t,
                        childCount: i,
                        bindings: y,
                        bindingFlags: Dt(y),
                        outputs: v,
                        element: {
                            ns: g,
                            name: m,
                            attrs: b,
                            template: null,
                            componentProvider: null,
                            componentView: c || null,
                            componentRendererType: d,
                            publicProviders: null,
                            allProviders: null,
                            handleEvent: o || Je
                        },
                        provider: null,
                        text: null,
                        query: null,
                        ngContent: null
                    }
                }

                function uu(l, n, e) {
                    const t = e.element,
                        i = l.root.selectorOrNode,
                        s = l.renderer;
                    let u;
                    if (l.parent || !i) {
                        u = t.name ? s.createElement(t.name, t.ns) : s.createComment("");
                        const i = wt(l, n, e);
                        i && s.appendChild(i, u)
                    } else u = s.selectRootElement(i, !!t.componentRendererType && t.componentRendererType.encapsulation === Zl.ShadowDom);
                    if (t.attrs)
                        for (let r = 0; r < t.attrs.length; r++) {
                            const [l, n, e] = t.attrs[r];
                            s.setAttribute(u, n, e, l)
                        }
                    return u
                }

                function ru(l, n, e, t) {
                    for (let u = 0; u < e.outputs.length; u++) {
                        const r = e.outputs[u],
                            a = au(l, e.nodeIndex, (s = r.eventName, (i = r.target) ? `${i}:${s}` : s));
                        let o = r.target,
                            c = l;
                        "component" === r.target && (o = null, c = n);
                        const d = c.renderer.listen(o || t, r.eventName, a);
                        l.disposables[e.outputIndex + u] = d
                    }
                    var i, s
                }

                function au(l, n, e) {
                    return t => ht(l, n, e, t)
                }

                function ou(l, n, e, t) {
                    if (!at(l, n, e, t)) return !1;
                    const i = n.bindings[e],
                        s = Ke(l, n.nodeIndex),
                        u = s.renderElement,
                        r = i.name;
                    switch (15 & i.flags) {
                        case 1:
                            ! function (l, n, e, t, i, s) {
                                const u = n.securityContext;
                                let r = u ? l.root.sanitizer.sanitize(u, s) : s;
                                r = null != r ? r.toString() : null;
                                const a = l.renderer;
                                null != s ? a.setAttribute(e, i, r, t) : a.removeAttribute(e, i, t)
                            }(l, i, u, i.ns, r, t);
                            break;
                        case 2:
                            ! function (l, n, e, t) {
                                const i = l.renderer;
                                t ? i.addClass(n, e) : i.removeClass(n, e)
                            }(l, u, r, t);
                            break;
                        case 4:
                            ! function (l, n, e, t, i) {
                                let s = l.root.sanitizer.sanitize(An.STYLE, i);
                                if (null != s) {
                                    s = s.toString();
                                    const l = n.suffix;
                                    null != l && (s += l)
                                } else s = null;
                                const u = l.renderer;
                                null != s ? u.setStyle(e, t, s) : u.removeStyle(e, t)
                            }(l, i, u, r, t);
                            break;
                        case 8:
                            ! function (l, n, e, t, i) {
                                const s = n.securityContext;
                                let u = s ? l.root.sanitizer.sanitize(s, i) : i;
                                l.renderer.setProperty(e, t, u)
                            }(33554432 & n.flags && 32 & i.flags ? s.componentView : l, i, u, r, t)
                    }
                    return !0
                }

                function cu(l, n, e) {
                    let t = [];
                    for (let i in e) t.push({
                        propName: i,
                        bindingType: e[i]
                    });
                    return {
                        nodeIndex: -1,
                        parent: null,
                        renderParent: null,
                        bindingIndex: -1,
                        outputIndex: -1,
                        checkIndex: -1,
                        flags: l,
                        childFlags: 0,
                        directChildFlags: 0,
                        childMatchedQueries: 0,
                        ngContentIndex: -1,
                        matchedQueries: {},
                        matchedQueryIds: 0,
                        references: {},
                        childCount: 0,
                        bindings: [],
                        bindingFlags: 0,
                        outputs: [],
                        element: null,
                        provider: null,
                        text: null,
                        query: {
                            id: n,
                            filterId: vt(n),
                            bindings: t
                        },
                        ngContent: null
                    }
                }

                function du(l) {
                    const n = l.def.nodeMatchedQueries;
                    for (; l.parent && yt(l);) {
                        let e = l.parentNodeDef;
                        l = l.parent;
                        const t = e.nodeIndex + e.childCount;
                        for (let i = 0; i <= t; i++) {
                            const t = l.def.nodes[i];
                            67108864 & t.flags && 536870912 & t.flags && (t.query.filterId & n) === t.query.filterId && Ye(l, i).setDirty(), !(1 & t.flags && i + t.childCount < e.nodeIndex) && 67108864 & t.childFlags && 536870912 & t.childFlags || (i += t.childCount)
                        }
                    }
                    if (134217728 & l.def.nodeFlags)
                        for (let e = 0; e < l.def.nodes.length; e++) {
                            const n = l.def.nodes[e];
                            134217728 & n.flags && 536870912 & n.flags && Ye(l, e).setDirty(), e += n.childCount
                        }
                }

                function hu(l, n) {
                    const e = Ye(l, n.nodeIndex);
                    if (!e.dirty) return;
                    let t, i = void 0;
                    if (67108864 & n.flags) {
                        const e = n.parent.parent;
                        i = pu(l, e.nodeIndex, e.nodeIndex + e.childCount, n.query, []), t = Ze(l, n.parent.nodeIndex).instance
                    } else 134217728 & n.flags && (i = pu(l, 0, l.def.nodes.length - 1, n.query, []), t = l.component);
                    e.reset(i);
                    const s = n.query.bindings;
                    let u = !1;
                    for (let r = 0; r < s.length; r++) {
                        const l = s[r];
                        let n;
                        switch (l.bindingType) {
                            case 0:
                                n = e.first;
                                break;
                            case 1:
                                n = e, u = !0
                        }
                        t[l.propName] = n
                    }
                    u && e.notifyOnChanges()
                }

                function pu(l, n, e, t, i) {
                    for (let s = n; s <= e; s++) {
                        const n = l.def.nodes[s],
                            e = n.matchedQueries[t.id];
                        if (null != e && i.push(fu(l, n, e)), 1 & n.flags && n.element.template && (n.element.template.nodeMatchedQueries & t.filterId) === t.filterId) {
                            const e = Ke(l, s);
                            if ((n.childMatchedQueries & t.filterId) === t.filterId && (pu(l, s + 1, s + n.childCount, t, i), s += n.childCount), 16777216 & n.flags) {
                                const l = e.viewContainer._embeddedViews;
                                for (let n = 0; n < l.length; n++) {
                                    const s = l[n],
                                        u = pt(s);
                                    u && u === e && pu(s, 0, s.def.nodes.length - 1, t, i)
                                }
                            }
                            const u = e.template._projectedViews;
                            if (u)
                                for (let l = 0; l < u.length; l++) {
                                    const n = u[l];
                                    pu(n, 0, n.def.nodes.length - 1, t, i)
                                }
                        }(n.childMatchedQueries & t.filterId) !== t.filterId && (s += n.childCount)
                    }
                    return i
                }

                function fu(l, n, e) {
                    if (null != e) switch (e) {
                        case 1:
                            return Ke(l, n.nodeIndex).renderElement;
                        case 0:
                            return new fe(Ke(l, n.nodeIndex).renderElement);
                        case 2:
                            return Ke(l, n.nodeIndex).template;
                        case 3:
                            return Ke(l, n.nodeIndex).viewContainer;
                        case 4:
                            return Ze(l, n.nodeIndex).instance
                    }
                }

                function gu(l, n) {
                    return {
                        nodeIndex: -1,
                        parent: null,
                        renderParent: null,
                        bindingIndex: -1,
                        outputIndex: -1,
                        checkIndex: -1,
                        flags: 8,
                        childFlags: 0,
                        directChildFlags: 0,
                        childMatchedQueries: 0,
                        matchedQueries: {},
                        matchedQueryIds: 0,
                        references: {},
                        ngContentIndex: l,
                        childCount: 0,
                        bindings: [],
                        bindingFlags: 0,
                        outputs: [],
                        element: null,
                        provider: null,
                        text: null,
                        query: null,
                        ngContent: {
                            index: n
                        }
                    }
                }

                function mu(l, n, e) {
                    const t = wt(l, n, e);
                    t && It(l, e.ngContent.index, 1, t, null, void 0)
                }

                function yu(l, n) {
                    return bu(128, l, new Array(n + 1))
                }

                function vu(l, n) {
                    const e = Object.keys(n),
                        t = e.length,
                        i = new Array(t);
                    for (let s = 0; s < t; s++) {
                        const l = e[s];
                        i[n[l]] = l
                    }
                    return bu(64, l, i)
                }

                function bu(l, n, e) {
                    const t = new Array(e.length);
                    for (let i = 0; i < e.length; i++) {
                        const l = e[i];
                        t[i] = {
                            flags: 8,
                            name: l,
                            ns: null,
                            nonMinifiedName: l,
                            securityContext: null,
                            suffix: null
                        }
                    }
                    return {
                        nodeIndex: -1,
                        parent: null,
                        renderParent: null,
                        bindingIndex: -1,
                        outputIndex: -1,
                        checkIndex: n,
                        flags: l,
                        childFlags: 0,
                        directChildFlags: 0,
                        childMatchedQueries: 0,
                        matchedQueries: {},
                        matchedQueryIds: 0,
                        references: {},
                        ngContentIndex: -1,
                        childCount: 0,
                        bindings: t,
                        bindingFlags: Dt(t),
                        outputs: [],
                        element: null,
                        provider: null,
                        text: null,
                        query: null,
                        ngContent: null
                    }
                }

                function _u(l, n, e) {
                    const t = new Array(e.length - 1);
                    for (let i = 1; i < e.length; i++) t[i - 1] = {
                        flags: 8,
                        name: null,
                        ns: null,
                        nonMinifiedName: null,
                        securityContext: null,
                        suffix: e[i]
                    };
                    return {
                        nodeIndex: -1,
                        parent: null,
                        renderParent: null,
                        bindingIndex: -1,
                        outputIndex: -1,
                        checkIndex: l,
                        flags: 2,
                        childFlags: 0,
                        directChildFlags: 0,
                        childMatchedQueries: 0,
                        matchedQueries: {},
                        matchedQueryIds: 0,
                        references: {},
                        ngContentIndex: n,
                        childCount: 0,
                        bindings: t,
                        bindingFlags: 8,
                        outputs: [],
                        element: null,
                        provider: null,
                        text: {
                            prefix: e[0]
                        },
                        query: null,
                        ngContent: null
                    }
                }

                function wu(l, n, e) {
                    let t;
                    const i = l.renderer;
                    t = i.createText(e.text.prefix);
                    const s = wt(l, n, e);
                    return s && i.appendChild(s, t), {
                        renderText: t
                    }
                }

                function xu(l, n) {
                    return (null != l ? l.toString() : "") + n.suffix
                }

                function ku(l, n, e, t) {
                    let i = 0,
                        s = 0,
                        u = 0,
                        r = 0,
                        a = 0,
                        o = null,
                        c = null,
                        d = !1,
                        h = !1,
                        p = null;
                    for (let f = 0; f < n.length; f++) {
                        const l = n[f];
                        if (l.nodeIndex = f, l.parent = o, l.bindingIndex = i, l.outputIndex = s, l.renderParent = c, u |= l.flags, a |= l.matchedQueryIds, l.element) {
                            const n = l.element;
                            n.publicProviders = o ? o.element.publicProviders : Object.create(null), n.allProviders = n.publicProviders, d = !1, h = !1, l.element.template && (a |= l.element.template.nodeMatchedQueries)
                        }
                        if (Cu(o, l, n.length), i += l.bindings.length, s += l.outputs.length, !c && 3 & l.flags && (p = l), 20224 & l.flags) {
                            d || (d = !0, o.element.publicProviders = Object.create(o.element.publicProviders), o.element.allProviders = o.element.publicProviders);
                            const n = 0 != (32768 & l.flags);
                            0 == (8192 & l.flags) || n ? o.element.publicProviders[nt(l.provider.token)] = l : (h || (h = !0, o.element.allProviders = Object.create(o.element.publicProviders)), o.element.allProviders[nt(l.provider.token)] = l), n && (o.element.componentProvider = l)
                        }
                        if (o ? (o.childFlags |= l.flags, o.directChildFlags |= l.flags, o.childMatchedQueries |= l.matchedQueryIds, l.element && l.element.template && (o.childMatchedQueries |= l.element.template.nodeMatchedQueries)) : r |= l.flags, l.childCount > 0) o = l, Su(l) || (c = l);
                        else
                            for (; o && f === o.nodeIndex + o.childCount;) {
                                const l = o.parent;
                                l && (l.childFlags |= o.childFlags, l.childMatchedQueries |= o.childMatchedQueries), c = (o = l) && Su(o) ? o.renderParent : o
                            }
                    }
                    return {
                        factory: null,
                        nodeFlags: u,
                        rootNodeFlags: r,
                        nodeMatchedQueries: a,
                        flags: l,
                        nodes: n,
                        updateDirectives: e || Je,
                        updateRenderer: t || Je,
                        handleEvent: (l, e, t, i) => n[e].element.handleEvent(l, t, i),
                        bindingCount: i,
                        outputCount: s,
                        lastRenderRootNode: p
                    }
                }

                function Su(l) {
                    return 0 != (1 & l.flags) && null === l.element.name
                }

                function Cu(l, n, e) {
                    const t = n.element && n.element.template;
                    if (t) {
                        if (!t.lastRenderRootNode) throw new Error("Illegal State: Embedded templates without nodes are not allowed!");
                        if (t.lastRenderRootNode && 16777216 & t.lastRenderRootNode.flags) throw new Error(`Illegal State: Last root node of a template can't have embedded views, at index ${n.nodeIndex}!`)
                    }
                    if (20224 & n.flags && 0 == (1 & (l ? l.flags : 0))) throw new Error(`Illegal State: StaticProvider/Directive nodes need to be children of elements or anchors, at index ${n.nodeIndex}!`);
                    if (n.query) {
                        if (67108864 & n.flags && (!l || 0 == (16384 & l.flags))) throw new Error(`Illegal State: Content Query nodes need to be children of directives, at index ${n.nodeIndex}!`);
                        if (134217728 & n.flags && l) throw new Error(`Illegal State: View Query nodes have to be top level nodes, at index ${n.nodeIndex}!`)
                    }
                    if (n.childCount) {
                        const t = l ? l.nodeIndex + l.childCount : e - 1;
                        if (n.nodeIndex <= t && n.nodeIndex + n.childCount > t) throw new Error(`Illegal State: childCount of node leads outside of parent, at index ${n.nodeIndex}!`)
                    }
                }

                function Iu(l, n, e, t) {
                    const i = Au(l.root, l.renderer, l, n, e);
                    return Pu(i, l.component, t), Du(i), i
                }

                function Tu(l, n, e) {
                    const t = Au(l, l.renderer, null, null, n);
                    return Pu(t, e, e), Du(t), t
                }

                function Eu(l, n, e, t) {
                    const i = n.element.componentRendererType;
                    let s;
                    return s = i ? l.root.rendererFactory.createRenderer(t, i) : l.root.renderer, Au(l.root, s, l, n.element.componentProvider, e)
                }

                function Au(l, n, e, t, i) {
                    const s = new Array(i.nodes.length),
                        u = i.outputCount ? new Array(i.outputCount) : null;
                    return {
                        def: i,
                        parent: e,
                        viewContainerParent: null,
                        parentNodeDef: t,
                        context: null,
                        component: null,
                        nodes: s,
                        state: 13,
                        root: l,
                        renderer: n,
                        oldValues: new Array(i.bindingCount),
                        disposables: u,
                        initIndex: -1
                    }
                }

                function Pu(l, n, e) {
                    l.component = n, l.context = e
                }

                function Du(l) {
                    let n;
                    mt(l) && (n = Ke(l.parent, l.parentNodeDef.parent.nodeIndex).renderElement);
                    const e = l.def,
                        t = l.nodes;
                    for (let i = 0; i < e.nodes.length; i++) {
                        const s = e.nodes[i];
                        let u;
                        switch (Xe.setCurrentNode(l, i), 201347067 & s.flags) {
                            case 1:
                                const e = uu(l, n, s);
                                let r = void 0;
                                if (33554432 & s.flags) {
                                    const n = kt(s.element.componentView);
                                    r = Xe.createComponentView(l, s, n, e)
                                }
                                ru(l, r, s, e), u = {
                                    renderElement: e,
                                    componentView: r,
                                    viewContainer: null,
                                    template: s.element.template ? Xt(l, s) : void 0
                                }, 16777216 & s.flags && (u.viewContainer = Kt(l, s, u));
                                break;
                            case 2:
                                u = wu(l, n, s);
                                break;
                            case 512:
                            case 1024:
                            case 2048:
                            case 256:
                                (u = t[i]) || 4096 & s.flags || (u = {
                                    instance: bi(l, s)
                                });
                                break;
                            case 16:
                                u = {
                                    instance: _i(l, s)
                                };
                                break;
                            case 16384:
                                (u = t[i]) || (u = {
                                    instance: wi(l, s)
                                }), 32768 & s.flags && Pu(Ke(l, s.parent.nodeIndex).componentView, u.instance, u.instance);
                                break;
                            case 32:
                            case 64:
                            case 128:
                                u = {
                                    value: void 0
                                };
                                break;
                            case 67108864:
                            case 134217728:
                                u = new Hi;
                                break;
                            case 8:
                                mu(l, n, s), u = void 0
                        }
                        t[i] = u
                    }
                    Fu(l, Lu.CreateViewNodes), Vu(l, 201326592, 268435456, 0)
                }

                function Mu(l) {
                    Ru(l), Xe.updateDirectives(l, 1), qu(l, Lu.CheckNoChanges), Xe.updateRenderer(l, 1), Fu(l, Lu.CheckNoChanges), l.state &= -97
                }

                function Ou(l) {
                    1 & l.state ? (l.state &= -2, l.state |= 2) : l.state &= -3, je(l, 0, 256), Ru(l), Xe.updateDirectives(l, 0), qu(l, Lu.CheckAndUpdate), Vu(l, 67108864, 536870912, 0);
                    let n = je(l, 256, 512);
                    Ai(l, 2097152 | (n ? 1048576 : 0)), Xe.updateRenderer(l, 0), Fu(l, Lu.CheckAndUpdate), Vu(l, 134217728, 536870912, 0), Ai(l, 8388608 | ((n = je(l, 512, 768)) ? 4194304 : 0)), 2 & l.def.flags && (l.state &= -9), l.state &= -97, je(l, 768, 1024)
                }

                function Nu(l, n, e, t, i, s, u, r, a, o, c, d, h) {
                    return 0 === e ? function (l, n, e, t, i, s, u, r, a, o, c, d) {
                        switch (201347067 & n.flags) {
                            case 1:
                                return function (l, n, e, t, i, s, u, r, a, o, c, d) {
                                    const h = n.bindings.length;
                                    let p = !1;
                                    return h > 0 && ou(l, n, 0, e) && (p = !0), h > 1 && ou(l, n, 1, t) && (p = !0), h > 2 && ou(l, n, 2, i) && (p = !0), h > 3 && ou(l, n, 3, s) && (p = !0), h > 4 && ou(l, n, 4, u) && (p = !0), h > 5 && ou(l, n, 5, r) && (p = !0), h > 6 && ou(l, n, 6, a) && (p = !0), h > 7 && ou(l, n, 7, o) && (p = !0), h > 8 && ou(l, n, 8, c) && (p = !0), h > 9 && ou(l, n, 9, d) && (p = !0), p
                                }(l, n, e, t, i, s, u, r, a, o, c, d);
                            case 2:
                                return function (l, n, e, t, i, s, u, r, a, o, c, d) {
                                    let h = !1;
                                    const p = n.bindings,
                                        f = p.length;
                                    if (f > 0 && at(l, n, 0, e) && (h = !0), f > 1 && at(l, n, 1, t) && (h = !0), f > 2 && at(l, n, 2, i) && (h = !0), f > 3 && at(l, n, 3, s) && (h = !0), f > 4 && at(l, n, 4, u) && (h = !0), f > 5 && at(l, n, 5, r) && (h = !0), f > 6 && at(l, n, 6, a) && (h = !0), f > 7 && at(l, n, 7, o) && (h = !0), f > 8 && at(l, n, 8, c) && (h = !0), f > 9 && at(l, n, 9, d) && (h = !0), h) {
                                        let h = n.text.prefix;
                                        f > 0 && (h += xu(e, p[0])), f > 1 && (h += xu(t, p[1])), f > 2 && (h += xu(i, p[2])), f > 3 && (h += xu(s, p[3])), f > 4 && (h += xu(u, p[4])), f > 5 && (h += xu(r, p[5])), f > 6 && (h += xu(a, p[6])), f > 7 && (h += xu(o, p[7])), f > 8 && (h += xu(c, p[8])), f > 9 && (h += xu(d, p[9]));
                                        const g = We(l, n.nodeIndex).renderText;
                                        l.renderer.setValue(g, h)
                                    }
                                    return h
                                }(l, n, e, t, i, s, u, r, a, o, c, d);
                            case 16384:
                                return function (l, n, e, t, i, s, u, r, a, o, c, d) {
                                    const h = Ze(l, n.nodeIndex),
                                        p = h.instance;
                                    let f = !1,
                                        g = void 0;
                                    const m = n.bindings.length;
                                    return m > 0 && rt(l, n, 0, e) && (f = !0, g = Ei(l, h, n, 0, e, g)), m > 1 && rt(l, n, 1, t) && (f = !0, g = Ei(l, h, n, 1, t, g)), m > 2 && rt(l, n, 2, i) && (f = !0, g = Ei(l, h, n, 2, i, g)), m > 3 && rt(l, n, 3, s) && (f = !0, g = Ei(l, h, n, 3, s, g)), m > 4 && rt(l, n, 4, u) && (f = !0, g = Ei(l, h, n, 4, u, g)), m > 5 && rt(l, n, 5, r) && (f = !0, g = Ei(l, h, n, 5, r, g)), m > 6 && rt(l, n, 6, a) && (f = !0, g = Ei(l, h, n, 6, a, g)), m > 7 && rt(l, n, 7, o) && (f = !0, g = Ei(l, h, n, 7, o, g)), m > 8 && rt(l, n, 8, c) && (f = !0, g = Ei(l, h, n, 8, c, g)), m > 9 && rt(l, n, 9, d) && (f = !0, g = Ei(l, h, n, 9, d, g)), g && p.ngOnChanges(g), 65536 & n.flags && Ge(l, 256, n.nodeIndex) && p.ngOnInit(), 262144 & n.flags && p.ngDoCheck(), f
                                }(l, n, e, t, i, s, u, r, a, o, c, d);
                            case 32:
                            case 64:
                            case 128:
                                return function (l, n, e, t, i, s, u, r, a, o, c, d) {
                                    const h = n.bindings;
                                    let p = !1;
                                    const f = h.length;
                                    if (f > 0 && at(l, n, 0, e) && (p = !0), f > 1 && at(l, n, 1, t) && (p = !0), f > 2 && at(l, n, 2, i) && (p = !0), f > 3 && at(l, n, 3, s) && (p = !0), f > 4 && at(l, n, 4, u) && (p = !0), f > 5 && at(l, n, 5, r) && (p = !0), f > 6 && at(l, n, 6, a) && (p = !0), f > 7 && at(l, n, 7, o) && (p = !0), f > 8 && at(l, n, 8, c) && (p = !0), f > 9 && at(l, n, 9, d) && (p = !0), p) {
                                        const p = Qe(l, n.nodeIndex);
                                        let g;
                                        switch (201347067 & n.flags) {
                                            case 32:
                                                g = new Array(h.length), f > 0 && (g[0] = e), f > 1 && (g[1] = t), f > 2 && (g[2] = i), f > 3 && (g[3] = s), f > 4 && (g[4] = u), f > 5 && (g[5] = r), f > 6 && (g[6] = a), f > 7 && (g[7] = o), f > 8 && (g[8] = c), f > 9 && (g[9] = d);
                                                break;
                                            case 64:
                                                g = {}, f > 0 && (g[h[0].name] = e), f > 1 && (g[h[1].name] = t), f > 2 && (g[h[2].name] = i), f > 3 && (g[h[3].name] = s), f > 4 && (g[h[4].name] = u), f > 5 && (g[h[5].name] = r), f > 6 && (g[h[6].name] = a), f > 7 && (g[h[7].name] = o), f > 8 && (g[h[8].name] = c), f > 9 && (g[h[9].name] = d);
                                                break;
                                            case 128:
                                                const l = e;
                                                switch (f) {
                                                    case 1:
                                                        g = l.transform(e);
                                                        break;
                                                    case 2:
                                                        g = l.transform(t);
                                                        break;
                                                    case 3:
                                                        g = l.transform(t, i);
                                                        break;
                                                    case 4:
                                                        g = l.transform(t, i, s);
                                                        break;
                                                    case 5:
                                                        g = l.transform(t, i, s, u);
                                                        break;
                                                    case 6:
                                                        g = l.transform(t, i, s, u, r);
                                                        break;
                                                    case 7:
                                                        g = l.transform(t, i, s, u, r, a);
                                                        break;
                                                    case 8:
                                                        g = l.transform(t, i, s, u, r, a, o);
                                                        break;
                                                    case 9:
                                                        g = l.transform(t, i, s, u, r, a, o, c);
                                                        break;
                                                    case 10:
                                                        g = l.transform(t, i, s, u, r, a, o, c, d)
                                                }
                                        }
                                        p.value = g
                                    }
                                    return p
                                }(l, n, e, t, i, s, u, r, a, o, c, d);
                            default:
                                throw "unreachable"
                        }
                    }(l, n, t, i, s, u, r, a, o, c, d, h) : function (l, n, e) {
                        switch (201347067 & n.flags) {
                            case 1:
                                return function (l, n, e) {
                                    let t = !1;
                                    for (let i = 0; i < e.length; i++) ou(l, n, i, e[i]) && (t = !0);
                                    return t
                                }(l, n, e);
                            case 2:
                                return function (l, n, e) {
                                    const t = n.bindings;
                                    let i = !1;
                                    for (let s = 0; s < e.length; s++) at(l, n, s, e[s]) && (i = !0);
                                    if (i) {
                                        let i = "";
                                        for (let l = 0; l < e.length; l++) i += xu(e[l], t[l]);
                                        i = n.text.prefix + i;
                                        const s = We(l, n.nodeIndex).renderText;
                                        l.renderer.setValue(s, i)
                                    }
                                    return i
                                }(l, n, e);
                            case 16384:
                                return function (l, n, e) {
                                    const t = Ze(l, n.nodeIndex),
                                        i = t.instance;
                                    let s = !1,
                                        u = void 0;
                                    for (let r = 0; r < e.length; r++) rt(l, n, r, e[r]) && (s = !0, u = Ei(l, t, n, r, e[r], u));
                                    return u && i.ngOnChanges(u), 65536 & n.flags && Ge(l, 256, n.nodeIndex) && i.ngOnInit(), 262144 & n.flags && i.ngDoCheck(), s
                                }(l, n, e);
                            case 32:
                            case 64:
                            case 128:
                                return function (l, n, e) {
                                    const t = n.bindings;
                                    let i = !1;
                                    for (let s = 0; s < e.length; s++) at(l, n, s, e[s]) && (i = !0);
                                    if (i) {
                                        const i = Qe(l, n.nodeIndex);
                                        let s;
                                        switch (201347067 & n.flags) {
                                            case 32:
                                                s = e;
                                                break;
                                            case 64:
                                                s = {};
                                                for (let i = 0; i < e.length; i++) s[t[i].name] = e[i];
                                                break;
                                            case 128:
                                                const l = e[0],
                                                    n = e.slice(1);
                                                s = l.transform(...n)
                                        }
                                        i.value = s
                                    }
                                    return i
                                }(l, n, e);
                            default:
                                throw "unreachable"
                        }
                    }(l, n, t)
                }

                function Ru(l) {
                    const n = l.def;
                    if (4 & n.nodeFlags)
                        for (let e = 0; e < n.nodes.length; e++) {
                            const t = n.nodes[e];
                            if (4 & t.flags) {
                                const n = Ke(l, e).template._projectedViews;
                                if (n)
                                    for (let e = 0; e < n.length; e++) {
                                        const t = n[e];
                                        t.state |= 32, dt(t, l)
                                    }
                            } else 0 == (4 & t.childFlags) && (e += t.childCount)
                        }
                }

                function Bu(l, n, e, t, i, s, u, r, a, o, c, d, h) {
                    return 0 === e ? function (l, n, e, t, i, s, u, r, a, o, c, d) {
                        const h = n.bindings.length;
                        h > 0 && ot(l, n, 0, e), h > 1 && ot(l, n, 1, t), h > 2 && ot(l, n, 2, i), h > 3 && ot(l, n, 3, s), h > 4 && ot(l, n, 4, u), h > 5 && ot(l, n, 5, r), h > 6 && ot(l, n, 6, a), h > 7 && ot(l, n, 7, o), h > 8 && ot(l, n, 8, c), h > 9 && ot(l, n, 9, d)
                    }(l, n, t, i, s, u, r, a, o, c, d, h) : function (l, n, e) {
                        for (let t = 0; t < e.length; t++) ot(l, n, t, e[t])
                    }(l, n, t), !1
                }

                function zu(l, n) {
                    if (Ye(l, n.nodeIndex).dirty) throw Ue(Xe.createDebugContext(l, n.nodeIndex), `Query ${n.query.id} not dirty`, `Query ${n.query.id} dirty`, 0 != (1 & l.state))
                }

                function $u(l) {
                    if (!(128 & l.state)) {
                        if (qu(l, Lu.Destroy), Fu(l, Lu.Destroy), Ai(l, 131072), l.disposables)
                            for (let n = 0; n < l.disposables.length; n++) l.disposables[n]();
                        ! function (l) {
                            if (!(16 & l.state)) return;
                            const n = pt(l);
                            if (n) {
                                const e = n.template._projectedViews;
                                e && (Kl(e, e.indexOf(l)), Xe.dirtyParentQueries(l))
                            }
                        }(l), l.renderer.destroyNode && function (l) {
                            const n = l.def.nodes.length;
                            for (let e = 0; e < n; e++) {
                                const n = l.def.nodes[e];
                                1 & n.flags ? l.renderer.destroyNode(Ke(l, e).renderElement) : 2 & n.flags ? l.renderer.destroyNode(We(l, e).renderText) : (67108864 & n.flags || 134217728 & n.flags) && Ye(l, e).destroy()
                            }
                        }(l), mt(l) && l.renderer.destroy(), l.state |= 128
                    }
                }
                const Lu = function () {
                    var l = {
                        CreateViewNodes: 0,
                        CheckNoChanges: 1,
                        CheckNoChangesProjectedViews: 2,
                        CheckAndUpdate: 3,
                        CheckAndUpdateProjectedViews: 4,
                        Destroy: 5
                    };
                    return l[l.CreateViewNodes] = "CreateViewNodes", l[l.CheckNoChanges] = "CheckNoChanges", l[l.CheckNoChangesProjectedViews] = "CheckNoChangesProjectedViews", l[l.CheckAndUpdate] = "CheckAndUpdate", l[l.CheckAndUpdateProjectedViews] = "CheckAndUpdateProjectedViews", l[l.Destroy] = "Destroy", l
                }();

                function Fu(l, n) {
                    const e = l.def;
                    if (33554432 & e.nodeFlags)
                        for (let t = 0; t < e.nodes.length; t++) {
                            const i = e.nodes[t];
                            33554432 & i.flags ? Uu(Ke(l, t).componentView, n) : 0 == (33554432 & i.childFlags) && (t += i.childCount)
                        }
                }

                function qu(l, n) {
                    const e = l.def;
                    if (16777216 & e.nodeFlags)
                        for (let t = 0; t < e.nodes.length; t++) {
                            const i = e.nodes[t];
                            if (16777216 & i.flags) {
                                const e = Ke(l, t).viewContainer._embeddedViews;
                                for (let l = 0; l < e.length; l++) Uu(e[l], n)
                            } else 0 == (16777216 & i.childFlags) && (t += i.childCount)
                        }
                }

                function Uu(l, n) {
                    const e = l.state;
                    switch (n) {
                        case Lu.CheckNoChanges:
                            0 == (128 & e) && (12 == (12 & e) ? Mu(l) : 64 & e && Hu(l, Lu.CheckNoChangesProjectedViews));
                            break;
                        case Lu.CheckNoChangesProjectedViews:
                            0 == (128 & e) && (32 & e ? Mu(l) : 64 & e && Hu(l, n));
                            break;
                        case Lu.CheckAndUpdate:
                            0 == (128 & e) && (12 == (12 & e) ? Ou(l) : 64 & e && Hu(l, Lu.CheckAndUpdateProjectedViews));
                            break;
                        case Lu.CheckAndUpdateProjectedViews:
                            0 == (128 & e) && (32 & e ? Ou(l) : 64 & e && Hu(l, n));
                            break;
                        case Lu.Destroy:
                            $u(l);
                            break;
                        case Lu.CreateViewNodes:
                            Du(l)
                    }
                }

                function Hu(l, n) {
                    qu(l, n), Fu(l, n)
                }

                function Vu(l, n, e, t) {
                    if (!(l.def.nodeFlags & n && l.def.nodeFlags & e)) return;
                    const i = l.def.nodes.length;
                    for (let s = 0; s < i; s++) {
                        const i = l.def.nodes[s];
                        if (i.flags & n && i.flags & e) switch (Xe.setCurrentNode(l, i.nodeIndex), t) {
                            case 0:
                                hu(l, i);
                                break;
                            case 1:
                                zu(l, i)
                        }
                        i.childFlags & n && i.childFlags & e || (s += i.childCount)
                    }
                }
                let ju = !1;

                function Gu(l, n, e, t, i, s) {
                    const u = i.injector.get(ye);
                    return Tu(Ku(l, i, u, n, e), t, s)
                }

                function Wu(l, n, e, t, i, s) {
                    const u = i.injector.get(ye),
                        r = Ku(l, i, new Ir(u), n, e),
                        a = ir(t);
                    return Sr(cr.create, Tu, null, [r, a, s])
                }

                function Ku(l, n, e, t, i) {
                    const s = n.injector.get(Pn),
                        u = n.injector.get(tn),
                        r = e.createRenderer(null, null);
                    return {
                        ngModule: n,
                        injector: l,
                        projectableNodes: t,
                        selectorOrNode: i,
                        sanitizer: s,
                        rendererFactory: e,
                        renderer: r,
                        errorHandler: u
                    }
                }

                function Zu(l, n, e, t) {
                    const i = ir(e);
                    return Sr(cr.create, Iu, null, [l, n, i, t])
                }

                function Qu(l, n, e, t) {
                    return e = lr.get(n.element.componentProvider.provider.token) || ir(e), Sr(cr.create, Eu, null, [l, n, e, t])
                }

                function Yu(l, n, e, t) {
                    return si(l, n, e, function (l) {
                        const {
                            hasOverrides: n,
                            hasDeprecatedOverrides: e
                        } = function (l) {
                            let n = !1,
                                e = !1;
                            return 0 === Xu.size ? {
                                hasOverrides: n,
                                hasDeprecatedOverrides: e
                            } : (l.providers.forEach(l => {
                                const t = Xu.get(l.token);
                                3840 & l.flags && t && (n = !0, e = e || t.deprecatedBehavior)
                            }), l.modules.forEach(l => {
                                Ju.forEach((t, i) => {
                                    yl(i).providedIn === l && (n = !0, e = e || t.deprecatedBehavior)
                                })
                            }), {
                                hasOverrides: n,
                                hasDeprecatedOverrides: e
                            })
                        }(l);
                        return n ? (function (l) {
                            for (let n = 0; n < l.providers.length; n++) {
                                const t = l.providers[n];
                                e && (t.flags |= 4096);
                                const i = Xu.get(t.token);
                                i && (t.flags = -3841 & t.flags | i.flags, t.deps = _t(i.deps), t.value = i.value)
                            }
                            if (Ju.size > 0) {
                                let n = new Set(l.modules);
                                Ju.forEach((t, i) => {
                                    if (n.has(yl(i).providedIn)) {
                                        let n = {
                                            token: i,
                                            flags: t.flags | (e ? 4096 : 0),
                                            deps: _t(t.deps),
                                            value: t.value,
                                            index: l.providers.length
                                        };
                                        l.providers.push(n), l.providersByKey[nt(i)] = n
                                    }
                                })
                            }
                        }(l = l.factory(() => Je)), l) : l
                    }(t))
                }
                const Xu = new Map,
                    Ju = new Map,
                    lr = new Map;

                function nr(l) {
                    let n;
                    Xu.set(l.token, l), "function" == typeof l.token && (n = yl(l.token)) && "function" == typeof n.providedIn && Ju.set(l.token, l)
                }

                function er(l, n) {
                    const e = kt(n.viewDefFactory),
                        t = kt(e.nodes[0].element.componentView);
                    lr.set(l, t)
                }

                function tr() {
                    Xu.clear(), Ju.clear(), lr.clear()
                }

                function ir(l) {
                    if (0 === Xu.size) return l;
                    const n = function (l) {
                        const n = [];
                        let e = null;
                        for (let t = 0; t < l.nodes.length; t++) {
                            const i = l.nodes[t];
                            1 & i.flags && (e = i), e && 3840 & i.flags && Xu.has(i.provider.token) && (n.push(e.nodeIndex), e = null)
                        }
                        return n
                    }(l);
                    if (0 === n.length) return l;
                    l = l.factory(() => Je);
                    for (let t = 0; t < n.length; t++) e(l, n[t]);
                    return l;

                    function e(l, n) {
                        for (let e = n + 1; e < l.nodes.length; e++) {
                            const n = l.nodes[e];
                            if (1 & n.flags) return;
                            if (3840 & n.flags) {
                                const l = n.provider,
                                    e = Xu.get(l.token);
                                e && (n.flags = -3841 & n.flags | e.flags, l.deps = _t(e.deps), l.value = e.value)
                            }
                        }
                    }
                }

                function sr(l, n, e, t, i, s, u, r, a, o, c, d, h) {
                    const p = l.def.nodes[n];
                    return Nu(l, p, e, t, i, s, u, r, a, o, c, d, h), 224 & p.flags ? Qe(l, n).value : void 0
                }

                function ur(l, n, e, t, i, s, u, r, a, o, c, d, h) {
                    const p = l.def.nodes[n];
                    return Bu(l, p, e, t, i, s, u, r, a, o, c, d, h), 224 & p.flags ? Qe(l, n).value : void 0
                }

                function rr(l) {
                    return Sr(cr.detectChanges, Ou, null, [l])
                }

                function ar(l) {
                    return Sr(cr.checkNoChanges, Mu, null, [l])
                }

                function or(l) {
                    return Sr(cr.destroy, $u, null, [l])
                }
                const cr = function () {
                    var l = {
                        create: 0,
                        detectChanges: 1,
                        checkNoChanges: 2,
                        destroy: 3,
                        handleEvent: 4
                    };
                    return l[l.create] = "create", l[l.detectChanges] = "detectChanges", l[l.checkNoChanges] = "checkNoChanges", l[l.destroy] = "destroy", l[l.handleEvent] = "handleEvent", l
                }();
                let dr, hr, pr;

                function fr(l, n) {
                    hr = l, pr = n
                }

                function gr(l, n, e, t) {
                    return fr(l, n), Sr(cr.handleEvent, l.def.handleEvent, null, [l, n, e, t])
                }

                function mr(l, n) {
                    if (128 & l.state) throw Ve(cr[dr]);
                    return fr(l, _r(l, 0)), l.def.updateDirectives((function (l, e, t, ...i) {
                        const s = l.def.nodes[e];
                        return 0 === n ? vr(l, s, t, i) : br(l, s, t, i), 16384 & s.flags && fr(l, _r(l, e)), 224 & s.flags ? Qe(l, s.nodeIndex).value : void 0
                    }), l)
                }

                function yr(l, n) {
                    if (128 & l.state) throw Ve(cr[dr]);
                    return fr(l, wr(l, 0)), l.def.updateRenderer((function (l, e, t, ...i) {
                        const s = l.def.nodes[e];
                        return 0 === n ? vr(l, s, t, i) : br(l, s, t, i), 3 & s.flags && fr(l, wr(l, e)), 224 & s.flags ? Qe(l, s.nodeIndex).value : void 0
                    }), l)
                }

                function vr(l, n, e, t) {
                    if (Nu(l, n, e, ...t)) {
                        const u = 1 === e ? t[0] : t;
                        if (16384 & n.flags) {
                            const e = {};
                            for (let l = 0; l < n.bindings.length; l++) {
                                const t = n.bindings[l],
                                    r = u[l];
                                8 & t.flags && (e[(i = t.nonMinifiedName, s = void 0, s = i.replace(/[$@]/g, "_"), `ng-reflect-${i=s.replace(On,(...l)=>"-"+l[1].toLowerCase())}`)] = Nn(r))
                            }
                            const t = n.parent,
                                r = Ke(l, t.nodeIndex).renderElement;
                            if (t.element.name)
                                for (let n in e) {
                                    const t = e[n];
                                    null != t ? l.renderer.setAttribute(r, n, t) : l.renderer.removeAttribute(r, n)
                                } else l.renderer.setValue(r, `bindings=${JSON.stringify(e,null,2)}`)
                        }
                    }
                    var i, s
                }

                function br(l, n, e, t) {
                    Bu(l, n, e, ...t)
                }

                function _r(l, n) {
                    for (let e = n; e < l.def.nodes.length; e++) {
                        const n = l.def.nodes[e];
                        if (16384 & n.flags && n.bindings && n.bindings.length) return e
                    }
                    return null
                }

                function wr(l, n) {
                    for (let e = n; e < l.def.nodes.length; e++) {
                        const n = l.def.nodes[e];
                        if (3 & n.flags && n.bindings && n.bindings.length) return e
                    }
                    return null
                }
                class xr {
                    constructor(l, n) {
                        this.view = l, this.nodeIndex = n, null == n && (this.nodeIndex = n = 0), this.nodeDef = l.def.nodes[n];
                        let e = this.nodeDef,
                            t = l;
                        for (; e && 0 == (1 & e.flags);) e = e.parent;
                        if (!e)
                            for (; !e && t;) e = ft(t), t = t.parent;
                        this.elDef = e, this.elView = t
                    }
                    get elOrCompView() {
                        return Ke(this.elView, this.elDef.nodeIndex).componentView || this.view
                    }
                    get injector() {
                        return li(this.elView, this.elDef)
                    }
                    get component() {
                        return this.elOrCompView.component
                    }
                    get context() {
                        return this.elOrCompView.context
                    }
                    get providerTokens() {
                        const l = [];
                        if (this.elDef)
                            for (let n = this.elDef.nodeIndex + 1; n <= this.elDef.nodeIndex + this.elDef.childCount; n++) {
                                const e = this.elView.def.nodes[n];
                                20224 & e.flags && l.push(e.provider.token), n += e.childCount
                            }
                        return l
                    }
                    get references() {
                        const l = {};
                        if (this.elDef) {
                            kr(this.elView, this.elDef, l);
                            for (let n = this.elDef.nodeIndex + 1; n <= this.elDef.nodeIndex + this.elDef.childCount; n++) {
                                const e = this.elView.def.nodes[n];
                                20224 & e.flags && kr(this.elView, e, l), n += e.childCount
                            }
                        }
                        return l
                    }
                    get componentRenderElement() {
                        const l = function (l) {
                            for (; l && !mt(l);) l = l.parent;
                            return l.parent ? Ke(l.parent, ft(l).nodeIndex) : null
                        }(this.elOrCompView);
                        return l ? l.renderElement : void 0
                    }
                    get renderNode() {
                        return 2 & this.nodeDef.flags ? gt(this.view, this.nodeDef) : gt(this.elView, this.elDef)
                    }
                    logError(l, ...n) {
                        let e, t;
                        2 & this.nodeDef.flags ? (e = this.view.def, t = this.nodeDef.nodeIndex) : (e = this.elView.def, t = this.elDef.nodeIndex);
                        const i = function (l, n) {
                            let e = -1;
                            for (let t = 0; t <= n; t++) 3 & l.nodes[t].flags && e++;
                            return e
                        }(e, t);
                        let s = -1;
                        e.factory(() => ++s === i ? l.error.bind(l, ...n) : Je), s < i && (l.error("Illegal state: the ViewDefinitionFactory did not call the logger!"), l.error(...n))
                    }
                }

                function kr(l, n, e) {
                    for (let t in n.references) e[t] = fu(l, n, n.references[t])
                }

                function Sr(l, n, e, t) {
                    const i = dr,
                        s = hr,
                        u = pr;
                    try {
                        dr = l;
                        const r = n.apply(e, t);
                        return hr = s, pr = u, dr = i, r
                    } catch (o) {
                        if (ln(o) || !hr) throw o;
                        throw r = o, a = Cr(), r instanceof Error || (r = new Error(r.toString())), He(r, a), r
                    }
                    var r, a
                }

                function Cr() {
                    return hr ? new xr(hr, pr) : null
                }
                class Ir {
                    constructor(l) {
                        this.delegate = l
                    }
                    createRenderer(l, n) {
                        return new Tr(this.delegate.createRenderer(l, n))
                    }
                    begin() {
                        this.delegate.begin && this.delegate.begin()
                    }
                    end() {
                        this.delegate.end && this.delegate.end()
                    }
                    whenRenderingDone() {
                        return this.delegate.whenRenderingDone ? this.delegate.whenRenderingDone() : Promise.resolve(null)
                    }
                }
                class Tr {
                    constructor(l) {
                        this.delegate = l, this.debugContextFactory = Cr, this.data = this.delegate.data
                    }
                    createDebugContext(l) {
                        return this.debugContextFactory(l)
                    }
                    destroyNode(l) {
                        const n = Qs(l);
                        ! function (l) {
                            Zs.delete(l.nativeNode)
                        }(n), n instanceof Ws && (n.listeners.length = 0), this.delegate.destroyNode && this.delegate.destroyNode(l)
                    }
                    destroy() {
                        this.delegate.destroy()
                    }
                    createElement(l, n) {
                        const e = this.delegate.createElement(l, n),
                            t = this.createDebugContext(e);
                        if (t) {
                            const n = new Ks(e, null, t);
                            n.name = l, Ys(n)
                        }
                        return e
                    }
                    createComment(l) {
                        const n = this.delegate.createComment(l),
                            e = this.createDebugContext(n);
                        return e && Ys(new Ws(n, null, e)), n
                    }
                    createText(l) {
                        const n = this.delegate.createText(l),
                            e = this.createDebugContext(n);
                        return e && Ys(new Ws(n, null, e)), n
                    }
                    appendChild(l, n) {
                        const e = Qs(l),
                            t = Qs(n);
                        e && t && e instanceof Ks && e.addChild(t), this.delegate.appendChild(l, n)
                    }
                    insertBefore(l, n, e) {
                        const t = Qs(l),
                            i = Qs(n),
                            s = Qs(e);
                        t && i && t instanceof Ks && t.insertBefore(s, i), this.delegate.insertBefore(l, n, e)
                    }
                    removeChild(l, n) {
                        const e = Qs(l),
                            t = Qs(n);
                        e && t && e instanceof Ks && e.removeChild(t), this.delegate.removeChild(l, n)
                    }
                    selectRootElement(l, n) {
                        const e = this.delegate.selectRootElement(l, n),
                            t = Cr();
                        return t && Ys(new Ks(e, null, t)), e
                    }
                    setAttribute(l, n, e, t) {
                        const i = Qs(l);
                        i && i instanceof Ks && (i.attributes[t ? t + ":" + n : n] = e), this.delegate.setAttribute(l, n, e, t)
                    }
                    removeAttribute(l, n, e) {
                        const t = Qs(l);
                        t && t instanceof Ks && (t.attributes[e ? e + ":" + n : n] = null), this.delegate.removeAttribute(l, n, e)
                    }
                    addClass(l, n) {
                        const e = Qs(l);
                        e && e instanceof Ks && (e.classes[n] = !0), this.delegate.addClass(l, n)
                    }
                    removeClass(l, n) {
                        const e = Qs(l);
                        e && e instanceof Ks && (e.classes[n] = !1), this.delegate.removeClass(l, n)
                    }
                    setStyle(l, n, e, t) {
                        const i = Qs(l);
                        i && i instanceof Ks && (i.styles[n] = e), this.delegate.setStyle(l, n, e, t)
                    }
                    removeStyle(l, n, e) {
                        const t = Qs(l);
                        t && t instanceof Ks && (t.styles[n] = null), this.delegate.removeStyle(l, n, e)
                    }
                    setProperty(l, n, e) {
                        const t = Qs(l);
                        t && t instanceof Ks && (t.properties[n] = e), this.delegate.setProperty(l, n, e)
                    }
                    listen(l, n, e) {
                        if ("string" != typeof l) {
                            const t = Qs(l);
                            t && t.listeners.push(new Gs(n, e))
                        }
                        return this.delegate.listen(l, n, e)
                    }
                    parentNode(l) {
                        return this.delegate.parentNode(l)
                    }
                    nextSibling(l) {
                        return this.delegate.nextSibling(l)
                    }
                    setValue(l, n) {
                        return this.delegate.setValue(l, n)
                    }
                }

                function Er(l, n, e) {
                    return new Ar(l, n, e)
                }
                class Ar extends Gl {
                    constructor(l, n, e) {
                        super(), this.moduleType = l, this._bootstrapComponents = n, this._ngModuleDefFactory = e
                    }
                    create(l) {
                        ! function () {
                            if (ju) return;
                            ju = !0;
                            const l = rn() ? {
                                setCurrentNode: fr,
                                createRootView: Wu,
                                createEmbeddedView: Zu,
                                createComponentView: Qu,
                                createNgModuleRef: Yu,
                                overrideProvider: nr,
                                overrideComponentView: er,
                                clearOverrides: tr,
                                checkAndUpdateView: rr,
                                checkNoChangesView: ar,
                                destroyView: or,
                                createDebugContext: (l, n) => new xr(l, n),
                                handleEvent: gr,
                                updateDirectives: mr,
                                updateRenderer: yr
                            } : {
                                setCurrentNode: () => {},
                                createRootView: Gu,
                                createEmbeddedView: Iu,
                                createComponentView: Eu,
                                createNgModuleRef: si,
                                overrideProvider: Je,
                                overrideComponentView: Je,
                                clearOverrides: Je,
                                checkAndUpdateView: Ou,
                                checkNoChangesView: Mu,
                                destroyView: $u,
                                createDebugContext: (l, n) => new xr(l, n),
                                handleEvent: (l, n, e, t) => l.def.handleEvent(l, n, e, t),
                                updateDirectives: (l, n) => l.def.updateDirectives(0 === n ? sr : ur, l),
                                updateRenderer: (l, n) => l.def.updateRenderer(0 === n ? sr : ur, l)
                            };
                            Xe.setCurrentNode = l.setCurrentNode, Xe.createRootView = l.createRootView, Xe.createEmbeddedView = l.createEmbeddedView, Xe.createComponentView = l.createComponentView, Xe.createNgModuleRef = l.createNgModuleRef, Xe.overrideProvider = l.overrideProvider, Xe.overrideComponentView = l.overrideComponentView, Xe.clearOverrides = l.clearOverrides, Xe.checkAndUpdateView = l.checkAndUpdateView, Xe.checkNoChangesView = l.checkNoChangesView, Xe.destroyView = l.destroyView, Xe.resolveDep = Ii, Xe.createDebugContext = l.createDebugContext, Xe.handleEvent = l.handleEvent, Xe.updateDirectives = l.updateDirectives, Xe.updateRenderer = l.updateRenderer, Xe.dirtyParentQueries = du
                        }();
                        const n = function (l) {
                            const n = Array.from(l.providers),
                                e = Array.from(l.modules),
                                t = {};
                            for (const i in l.providersByKey) t[i] = l.providersByKey[i];
                            return {
                                factory: l.factory,
                                isRoot: l.isRoot,
                                providers: n,
                                modules: e,
                                providersByKey: t
                            }
                        }(kt(this._ngModuleDefFactory));
                        return Xe.createNgModuleRef(this.moduleType, l || Ln.NULL, this._bootstrapComponents, n)
                    }
                }
                const Pr = {
                    production: !0
                };
                class Dr {}
                class Mr {
                    constructor(l) {
                        this.kongService = l
                    }
                    ngOnInit() {
//                        !Pr.production || document.domain.endsWith("netlify.com") || document.domain.endsWith("netlify.app") || (this.baddomain = !0);
                        let l = !1;
                        try {
                            localStorage && localStorage.fsa && (localStorage.removeItem("fsa"), l = !0)
                        } catch (n) {}!Pr.production || this.inIframe() || l || "festive-perlman-5fad70.netlify.com" != document.location.host || (document.location.href = "https://www.kongregate.com/games/to_change_later/cividlization-2", this.baddomain = !0);
                        try {
                            localStorage.openpages = Date.now(), window.addEventListener("storage", (function (l) {
                                "openpages" == l.key && (localStorage.page_available = Date.now()), "page_available" == l.key && (this.error = "Game is already running in another tab")
                            }).bind(this), !1)
                        } catch (n) {}
                        this.kongService.submmitStat("initialized", 1)
                    }
                    inIframe() {
                        return window.self !== window.top
                    }
                }
                class Or {}
                const Nr = new El("Location Initialized");
                class Rr {}
                const Br = new El("appBaseHref");
                class zr {
                    constructor(l, n) {
                        this._subject = new qi, this._urlChangeListeners = [], this._platformStrategy = l;
                        const e = this._platformStrategy.getBaseHref();
                        this._platformLocation = n, this._baseHref = zr.stripTrailingSlash($r(e)), this._platformStrategy.onPopState(l => {
                            this._subject.emit({
                                url: this.path(!0),
                                pop: !0,
                                state: l.state,
                                type: l.type
                            })
                        })
                    }
                    path(l = !1) {
                        return this.normalize(this._platformStrategy.path(l))
                    }
                    getState() {
                        return this._platformLocation.getState()
                    }
                    isCurrentPathEqualTo(l, n = "") {
                        return this.path() == this.normalize(l + zr.normalizeQueryParams(n))
                    }
                    normalize(l) {
                        return zr.stripTrailingSlash(function (l, n) {
                            return l && n.startsWith(l) ? n.substring(l.length) : n
                        }(this._baseHref, $r(l)))
                    }
                    prepareExternalUrl(l) {
                        return l && "/" !== l[0] && (l = "/" + l), this._platformStrategy.prepareExternalUrl(l)
                    }
                    go(l, n = "", e = null) {
                        this._platformStrategy.pushState(e, "", l, n), this._notifyUrlChangeListeners(this.prepareExternalUrl(l + zr.normalizeQueryParams(n)), e)
                    }
                    replaceState(l, n = "", e = null) {
                        this._platformStrategy.replaceState(e, "", l, n), this._notifyUrlChangeListeners(this.prepareExternalUrl(l + zr.normalizeQueryParams(n)), e)
                    }
                    forward() {
                        this._platformStrategy.forward()
                    }
                    back() {
                        this._platformStrategy.back()
                    }
                    onUrlChange(l) {
                        this._urlChangeListeners.push(l), this.subscribe(l => {
                            this._notifyUrlChangeListeners(l.url, l.state)
                        })
                    }
                    _notifyUrlChangeListeners(l = "", n) {
                        this._urlChangeListeners.forEach(e => e(l, n))
                    }
                    subscribe(l, n, e) {
                        return this._subject.subscribe({
                            next: l,
                            error: n,
                            complete: e
                        })
                    }
                    static normalizeQueryParams(l) {
                        return l && "?" !== l[0] ? "?" + l : l
                    }
                    static joinWithSlash(l, n) {
                        if (0 == l.length) return n;
                        if (0 == n.length) return l;
                        let e = 0;
                        return l.endsWith("/") && e++, n.startsWith("/") && e++, 2 == e ? l + n.substring(1) : 1 == e ? l + n : l + "/" + n
                    }
                    static stripTrailingSlash(l) {
                        const n = l.match(/#|\?|$/),
                            e = n && n.index || l.length;
                        return l.slice(0, e - ("/" === l[e - 1] ? 1 : 0)) + l.slice(e)
                    }
                }

                function $r(l) {
                    return l.replace(/\/index.html$/, "")
                }
                class Lr extends Rr {
                    constructor(l, n) {
                        super(), this._platformLocation = l, this._baseHref = "", null != n && (this._baseHref = n)
                    }
                    onPopState(l) {
                        this._platformLocation.onPopState(l), this._platformLocation.onHashChange(l)
                    }
                    getBaseHref() {
                        return this._baseHref
                    }
                    path(l = !1) {
                        let n = this._platformLocation.hash;
                        return null == n && (n = "#"), n.length > 0 ? n.substring(1) : n
                    }
                    prepareExternalUrl(l) {
                        const n = zr.joinWithSlash(this._baseHref, l);
                        return n.length > 0 ? "#" + n : n
                    }
                    pushState(l, n, e, t) {
                        let i = this.prepareExternalUrl(e + zr.normalizeQueryParams(t));
                        0 == i.length && (i = this._platformLocation.pathname), this._platformLocation.pushState(l, n, i)
                    }
                    replaceState(l, n, e, t) {
                        let i = this.prepareExternalUrl(e + zr.normalizeQueryParams(t));
                        0 == i.length && (i = this._platformLocation.pathname), this._platformLocation.replaceState(l, n, i)
                    }
                    forward() {
                        this._platformLocation.forward()
                    }
                    back() {
                        this._platformLocation.back()
                    }
                }
                class Fr extends Rr {
                    constructor(l, n) {
                        if (super(), this._platformLocation = l, null == n && (n = this._platformLocation.getBaseHrefFromDOM()), null == n) throw new Error("No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.");
                        this._baseHref = n
                    }
                    onPopState(l) {
                        this._platformLocation.onPopState(l), this._platformLocation.onHashChange(l)
                    }
                    getBaseHref() {
                        return this._baseHref
                    }
                    prepareExternalUrl(l) {
                        return zr.joinWithSlash(this._baseHref, l)
                    }
                    path(l = !1) {
                        const n = this._platformLocation.pathname + zr.normalizeQueryParams(this._platformLocation.search),
                            e = this._platformLocation.hash;
                        return e && l ? `${n}${e}` : n
                    }
                    pushState(l, n, e, t) {
                        const i = this.prepareExternalUrl(e + zr.normalizeQueryParams(t));
                        this._platformLocation.pushState(l, n, i)
                    }
                    replaceState(l, n, e, t) {
                        const i = this.prepareExternalUrl(e + zr.normalizeQueryParams(t));
                        this._platformLocation.replaceState(l, n, i)
                    }
                    forward() {
                        this._platformLocation.forward()
                    }
                    back() {
                        this._platformLocation.back()
                    }
                }
                const qr = function () {
                        var l = {
                            Zero: 0,
                            One: 1,
                            Two: 2,
                            Few: 3,
                            Many: 4,
                            Other: 5
                        };
                        return l[l.Zero] = "Zero", l[l.One] = "One", l[l.Two] = "Two", l[l.Few] = "Few", l[l.Many] = "Many", l[l.Other] = "Other", l
                    }(),
                    Ur = function () {
                        var l = {
                            Format: 0,
                            Standalone: 1
                        };
                        return l[l.Format] = "Format", l[l.Standalone] = "Standalone", l
                    }(),
                    Hr = function () {
                        var l = {
                            Narrow: 0,
                            Abbreviated: 1,
                            Wide: 2,
                            Short: 3
                        };
                        return l[l.Narrow] = "Narrow", l[l.Abbreviated] = "Abbreviated", l[l.Wide] = "Wide", l[l.Short] = "Short", l
                    }(),
                    Vr = function () {
                        var l = {
                            Short: 0,
                            Medium: 1,
                            Long: 2,
                            Full: 3
                        };
                        return l[l.Short] = "Short", l[l.Medium] = "Medium", l[l.Long] = "Long", l[l.Full] = "Full", l
                    }(),
                    jr = function () {
                        var l = {
                            Decimal: 0,
                            Group: 1,
                            List: 2,
                            PercentSign: 3,
                            PlusSign: 4,
                            MinusSign: 5,
                            Exponential: 6,
                            SuperscriptingExponent: 7,
                            PerMille: 8,
                            Infinity: 9,
                            NaN: 10,
                            TimeSeparator: 11,
                            CurrencyDecimal: 12,
                            CurrencyGroup: 13
                        };
                        return l[l.Decimal] = "Decimal", l[l.Group] = "Group", l[l.List] = "List", l[l.PercentSign] = "PercentSign", l[l.PlusSign] = "PlusSign", l[l.MinusSign] = "MinusSign", l[l.Exponential] = "Exponential", l[l.SuperscriptingExponent] = "SuperscriptingExponent", l[l.PerMille] = "PerMille", l[l.Infinity] = "Infinity", l[l.NaN] = "NaN", l[l.TimeSeparator] = "TimeSeparator", l[l.CurrencyDecimal] = "CurrencyDecimal", l[l.CurrencyGroup] = "CurrencyGroup", l
                    }();

                function Gr(l, n, e) {
                    const t = zi(l),
                        i = la([t[Ni.DaysFormat], t[Ni.DaysStandalone]], n);
                    return la(i, e)
                }

                function Wr(l, n, e) {
                    const t = zi(l),
                        i = la([t[Ni.MonthsFormat], t[Ni.MonthsStandalone]], n);
                    return la(i, e)
                }

                function Kr(l, n) {
                    return la(zi(l)[Ni.DateFormat], n)
                }

                function Zr(l, n) {
                    return la(zi(l)[Ni.TimeFormat], n)
                }

                function Qr(l, n) {
                    return la(zi(l)[Ni.DateTimeFormat], n)
                }

                function Yr(l, n) {
                    const e = zi(l),
                        t = e[Ni.NumberSymbols][n];
                    if (void 0 === t) {
                        if (n === jr.CurrencyDecimal) return e[Ni.NumberSymbols][jr.Decimal];
                        if (n === jr.CurrencyGroup) return e[Ni.NumberSymbols][jr.Group]
                    }
                    return t
                }
                const Xr = function (l) {
                    return zi(l)[Ni.PluralCase]
                };

                function Jr(l) {
                    if (!l[Ni.ExtraData]) throw new Error(`Missing extra locale data for the locale "${l[Ni.LocaleId]}". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`)
                }

                function la(l, n) {
                    for (let e = n; e > -1; e--)
                        if (void 0 !== l[e]) return l[e];
                    throw new Error("Locale data API: locale data undefined")
                }

                function na(l) {
                    const [n, e] = l.split(":");
                    return {
                        hours: +n,
                        minutes: +e
                    }
                }
                const ea = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,
                    ta = {},
                    ia = /((?:[^GyMLwWdEabBhHmsSzZO']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/,
                    sa = function () {
                        var l = {
                            Short: 0,
                            ShortGMT: 1,
                            Long: 2,
                            Extended: 3
                        };
                        return l[l.Short] = "Short", l[l.ShortGMT] = "ShortGMT", l[l.Long] = "Long", l[l.Extended] = "Extended", l
                    }(),
                    ua = function () {
                        var l = {
                            FullYear: 0,
                            Month: 1,
                            Date: 2,
                            Hours: 3,
                            Minutes: 4,
                            Seconds: 5,
                            FractionalSeconds: 6,
                            Day: 7
                        };
                        return l[l.FullYear] = "FullYear", l[l.Month] = "Month", l[l.Date] = "Date", l[l.Hours] = "Hours", l[l.Minutes] = "Minutes", l[l.Seconds] = "Seconds", l[l.FractionalSeconds] = "FractionalSeconds", l[l.Day] = "Day", l
                    }(),
                    ra = function () {
                        var l = {
                            DayPeriods: 0,
                            Days: 1,
                            Months: 2,
                            Eras: 3
                        };
                        return l[l.DayPeriods] = "DayPeriods", l[l.Days] = "Days", l[l.Months] = "Months", l[l.Eras] = "Eras", l
                    }();

                function aa(l, n, e, t) {
                    let i = function (l) {
                        if (ba(l)) return l;
                        if ("number" == typeof l && !isNaN(l)) return new Date(l);
                        if ("string" == typeof l) {
                            l = l.trim();
                            const n = parseFloat(l);
                            if (!isNaN(l - n)) return new Date(n);
                            if (/^(\d{4}-\d{1,2}-\d{1,2})$/.test(l)) {
                                const [n, e, t] = l.split("-").map(l => +l);
                                return new Date(n, e - 1, t)
                            }
                            let e;
                            if (e = l.match(ea)) return function (l) {
                                const n = new Date(0);
                                let e = 0,
                                    t = 0;
                                const i = l[8] ? n.setUTCFullYear : n.setFullYear,
                                    s = l[8] ? n.setUTCHours : n.setHours;
                                l[9] && (e = Number(l[9] + l[10]), t = Number(l[9] + l[11])), i.call(n, Number(l[1]), Number(l[2]) - 1, Number(l[3]));
                                const u = Number(l[4] || 0) - e,
                                    r = Number(l[5] || 0) - t,
                                    a = Number(l[6] || 0),
                                    o = Math.round(1e3 * parseFloat("0." + (l[7] || 0)));
                                return s.call(n, u, r, a, o), n
                            }(e)
                        }
                        const n = new Date(l);
                        if (!ba(n)) throw new Error(`Unable to convert "${l}" into a date`);
                        return n
                    }(l);
                    n = function l(n, e) {
                        const t = function (l) {
                            return zi(l)[Ni.LocaleId]
                        }(n);
                        if (ta[t] = ta[t] || {}, ta[t][e]) return ta[t][e];
                        let i = "";
                        switch (e) {
                            case "shortDate":
                                i = Kr(n, Vr.Short);
                                break;
                            case "mediumDate":
                                i = Kr(n, Vr.Medium);
                                break;
                            case "longDate":
                                i = Kr(n, Vr.Long);
                                break;
                            case "fullDate":
                                i = Kr(n, Vr.Full);
                                break;
                            case "shortTime":
                                i = Zr(n, Vr.Short);
                                break;
                            case "mediumTime":
                                i = Zr(n, Vr.Medium);
                                break;
                            case "longTime":
                                i = Zr(n, Vr.Long);
                                break;
                            case "fullTime":
                                i = Zr(n, Vr.Full);
                                break;
                            case "short":
                                const e = l(n, "shortTime"),
                                    t = l(n, "shortDate");
                                i = oa(Qr(n, Vr.Short), [e, t]);
                                break;
                            case "medium":
                                const s = l(n, "mediumTime"),
                                    u = l(n, "mediumDate");
                                i = oa(Qr(n, Vr.Medium), [s, u]);
                                break;
                            case "long":
                                const r = l(n, "longTime"),
                                    a = l(n, "longDate");
                                i = oa(Qr(n, Vr.Long), [r, a]);
                                break;
                            case "full":
                                const o = l(n, "fullTime"),
                                    c = l(n, "fullDate");
                                i = oa(Qr(n, Vr.Full), [o, c])
                        }
                        return i && (ta[t][e] = i), i
                    }(e, n) || n;
                    let s, u = [];
                    for (; n;) {
                        if (!(s = ia.exec(n))) {
                            u.push(n);
                            break
                        } {
                            const l = (u = u.concat(s.slice(1))).pop();
                            if (!l) break;
                            n = l
                        }
                    }
                    let r = i.getTimezoneOffset();
                    t && (r = va(t, r), i = function (l, n, e) {
                        const t = l.getTimezoneOffset();
                        return function (l, n) {
                            return (l = new Date(l.getTime())).setMinutes(l.getMinutes() + n), l
                        }(l, -1 * (va(n, t) - t))
                    }(i, t));
                    let a = "";
                    return u.forEach(l => {
                        const n = function (l) {
                            if (ya[l]) return ya[l];
                            let n;
                            switch (l) {
                                case "G":
                                case "GG":
                                case "GGG":
                                    n = ha(ra.Eras, Hr.Abbreviated);
                                    break;
                                case "GGGG":
                                    n = ha(ra.Eras, Hr.Wide);
                                    break;
                                case "GGGGG":
                                    n = ha(ra.Eras, Hr.Narrow);
                                    break;
                                case "y":
                                    n = da(ua.FullYear, 1, 0, !1, !0);
                                    break;
                                case "yy":
                                    n = da(ua.FullYear, 2, 0, !0, !0);
                                    break;
                                case "yyy":
                                    n = da(ua.FullYear, 3, 0, !1, !0);
                                    break;
                                case "yyyy":
                                    n = da(ua.FullYear, 4, 0, !1, !0);
                                    break;
                                case "M":
                                case "L":
                                    n = da(ua.Month, 1, 1);
                                    break;
                                case "MM":
                                case "LL":
                                    n = da(ua.Month, 2, 1);
                                    break;
                                case "MMM":
                                    n = ha(ra.Months, Hr.Abbreviated);
                                    break;
                                case "MMMM":
                                    n = ha(ra.Months, Hr.Wide);
                                    break;
                                case "MMMMM":
                                    n = ha(ra.Months, Hr.Narrow);
                                    break;
                                case "LLL":
                                    n = ha(ra.Months, Hr.Abbreviated, Ur.Standalone);
                                    break;
                                case "LLLL":
                                    n = ha(ra.Months, Hr.Wide, Ur.Standalone);
                                    break;
                                case "LLLLL":
                                    n = ha(ra.Months, Hr.Narrow, Ur.Standalone);
                                    break;
                                case "w":
                                    n = ma(1);
                                    break;
                                case "ww":
                                    n = ma(2);
                                    break;
                                case "W":
                                    n = ma(1, !0);
                                    break;
                                case "d":
                                    n = da(ua.Date, 1);
                                    break;
                                case "dd":
                                    n = da(ua.Date, 2);
                                    break;
                                case "E":
                                case "EE":
                                case "EEE":
                                    n = ha(ra.Days, Hr.Abbreviated);
                                    break;
                                case "EEEE":
                                    n = ha(ra.Days, Hr.Wide);
                                    break;
                                case "EEEEE":
                                    n = ha(ra.Days, Hr.Narrow);
                                    break;
                                case "EEEEEE":
                                    n = ha(ra.Days, Hr.Short);
                                    break;
                                case "a":
                                case "aa":
                                case "aaa":
                                    n = ha(ra.DayPeriods, Hr.Abbreviated);
                                    break;
                                case "aaaa":
                                    n = ha(ra.DayPeriods, Hr.Wide);
                                    break;
                                case "aaaaa":
                                    n = ha(ra.DayPeriods, Hr.Narrow);
                                    break;
                                case "b":
                                case "bb":
                                case "bbb":
                                    n = ha(ra.DayPeriods, Hr.Abbreviated, Ur.Standalone, !0);
                                    break;
                                case "bbbb":
                                    n = ha(ra.DayPeriods, Hr.Wide, Ur.Standalone, !0);
                                    break;
                                case "bbbbb":
                                    n = ha(ra.DayPeriods, Hr.Narrow, Ur.Standalone, !0);
                                    break;
                                case "B":
                                case "BB":
                                case "BBB":
                                    n = ha(ra.DayPeriods, Hr.Abbreviated, Ur.Format, !0);
                                    break;
                                case "BBBB":
                                    n = ha(ra.DayPeriods, Hr.Wide, Ur.Format, !0);
                                    break;
                                case "BBBBB":
                                    n = ha(ra.DayPeriods, Hr.Narrow, Ur.Format, !0);
                                    break;
                                case "h":
                                    n = da(ua.Hours, 1, -12);
                                    break;
                                case "hh":
                                    n = da(ua.Hours, 2, -12);
                                    break;
                                case "H":
                                    n = da(ua.Hours, 1);
                                    break;
                                case "HH":
                                    n = da(ua.Hours, 2);
                                    break;
                                case "m":
                                    n = da(ua.Minutes, 1);
                                    break;
                                case "mm":
                                    n = da(ua.Minutes, 2);
                                    break;
                                case "s":
                                    n = da(ua.Seconds, 1);
                                    break;
                                case "ss":
                                    n = da(ua.Seconds, 2);
                                    break;
                                case "S":
                                    n = da(ua.FractionalSeconds, 1);
                                    break;
                                case "SS":
                                    n = da(ua.FractionalSeconds, 2);
                                    break;
                                case "SSS":
                                    n = da(ua.FractionalSeconds, 3);
                                    break;
                                case "Z":
                                case "ZZ":
                                case "ZZZ":
                                    n = pa(sa.Short);
                                    break;
                                case "ZZZZZ":
                                    n = pa(sa.Extended);
                                    break;
                                case "O":
                                case "OO":
                                case "OOO":
                                case "z":
                                case "zz":
                                case "zzz":
                                    n = pa(sa.ShortGMT);
                                    break;
                                case "OOOO":
                                case "ZZZZ":
                                case "zzzz":
                                    n = pa(sa.Long);
                                    break;
                                default:
                                    return null
                            }
                            return ya[l] = n, n
                        }(l);
                        a += n ? n(i, e, r) : "''" === l ? "'" : l.replace(/(^'|'$)/g, "").replace(/''/g, "'")
                    }), a
                }

                function oa(l, n) {
                    return n && (l = l.replace(/\{([^}]+)}/g, (function (l, e) {
                        return null != n && e in n ? n[e] : l
                    }))), l
                }

                function ca(l, n, e = "-", t, i) {
                    let s = "";
                    (l < 0 || i && l <= 0) && (i ? l = 1 - l : (l = -l, s = e));
                    let u = String(l);
                    for (; u.length < n;) u = "0" + u;
                    return t && (u = u.substr(u.length - n)), s + u
                }

                function da(l, n, e = 0, t = !1, i = !1) {
                    return function (s, u) {
                        let r = function (l, n) {
                            switch (l) {
                                case ua.FullYear:
                                    return n.getFullYear();
                                case ua.Month:
                                    return n.getMonth();
                                case ua.Date:
                                    return n.getDate();
                                case ua.Hours:
                                    return n.getHours();
                                case ua.Minutes:
                                    return n.getMinutes();
                                case ua.Seconds:
                                    return n.getSeconds();
                                case ua.FractionalSeconds:
                                    return n.getMilliseconds();
                                case ua.Day:
                                    return n.getDay();
                                default:
                                    throw new Error(`Unknown DateType value "${l}".`)
                            }
                        }(l, s);
                        if ((e > 0 || r > -e) && (r += e), l === ua.Hours) 0 === r && -12 === e && (r = 12);
                        else if (l === ua.FractionalSeconds) return a = n, ca(r, 3).substr(0, a);
                        var a;
                        const o = Yr(u, jr.MinusSign);
                        return ca(r, n, o, t, i)
                    }
                }

                function ha(l, n, e = Ur.Format, t = !1) {
                    return function (i, s) {
                        return function (l, n, e, t, i, s) {
                            switch (e) {
                                case ra.Months:
                                    return Wr(n, i, t)[l.getMonth()];
                                case ra.Days:
                                    return Gr(n, i, t)[l.getDay()];
                                case ra.DayPeriods:
                                    const u = l.getHours(),
                                        r = l.getMinutes();
                                    if (s) {
                                        const l = function (l) {
                                                const n = zi(l);
                                                return Jr(n), (n[Ni.ExtraData][2] || []).map(l => "string" == typeof l ? na(l) : [na(l[0]), na(l[1])])
                                            }(n),
                                            e = function (l, n, e) {
                                                const t = zi(l);
                                                Jr(t);
                                                const i = la([t[Ni.ExtraData][0], t[Ni.ExtraData][1]], n) || [];
                                                return la(i, e) || []
                                            }(n, i, t);
                                        let s;
                                        if (l.forEach((l, n) => {
                                                if (Array.isArray(l)) {
                                                    const {
                                                        hours: t,
                                                        minutes: i
                                                    } = l[0], {
                                                        hours: a,
                                                        minutes: o
                                                    } = l[1];
                                                    u >= t && r >= i && (u < a || u === a && r < o) && (s = e[n])
                                                } else {
                                                    const {
                                                        hours: t,
                                                        minutes: i
                                                    } = l;
                                                    t === u && i === r && (s = e[n])
                                                }
                                            }), s) return s
                                    }
                                    return function (l, n, e) {
                                        const t = zi(l),
                                            i = la([t[Ni.DayPeriodsFormat], t[Ni.DayPeriodsStandalone]], n);
                                        return la(i, e)
                                    }(n, i, t)[u < 12 ? 0 : 1];
                                case ra.Eras:
                                    return function (l, n) {
                                        return la(zi(l)[Ni.Eras], n)
                                    }(n, t)[l.getFullYear() <= 0 ? 0 : 1];
                                default:
                                    throw new Error(`unexpected translation type ${e}`)
                            }
                        }(i, s, l, n, e, t)
                    }
                }

                function pa(l) {
                    return function (n, e, t) {
                        const i = -1 * t,
                            s = Yr(e, jr.MinusSign),
                            u = i > 0 ? Math.floor(i / 60) : Math.ceil(i / 60);
                        switch (l) {
                            case sa.Short:
                                return (i >= 0 ? "+" : "") + ca(u, 2, s) + ca(Math.abs(i % 60), 2, s);
                            case sa.ShortGMT:
                                return "GMT" + (i >= 0 ? "+" : "") + ca(u, 1, s);
                            case sa.Long:
                                return "GMT" + (i >= 0 ? "+" : "") + ca(u, 2, s) + ":" + ca(Math.abs(i % 60), 2, s);
                            case sa.Extended:
                                return 0 === t ? "Z" : (i >= 0 ? "+" : "") + ca(u, 2, s) + ":" + ca(Math.abs(i % 60), 2, s);
                            default:
                                throw new Error(`Unknown zone width "${l}"`)
                        }
                    }
                }
                const fa = 0,
                    ga = 4;

                function ma(l, n = !1) {
                    return function (e, t) {
                        let i;
                        if (n) {
                            const l = new Date(e.getFullYear(), e.getMonth(), 1).getDay() - 1,
                                n = e.getDate();
                            i = 1 + Math.floor((n + l) / 7)
                        } else {
                            const l = function (l) {
                                    const n = new Date(l, fa, 1).getDay();
                                    return new Date(l, 0, 1 + (n <= ga ? ga : ga + 7) - n)
                                }(e.getFullYear()),
                                n = (s = e, new Date(s.getFullYear(), s.getMonth(), s.getDate() + (ga - s.getDay()))).getTime() - l.getTime();
                            i = 1 + Math.round(n / 6048e5)
                        }
                        var s;
                        return ca(i, l, Yr(t, jr.MinusSign))
                    }
                }
                const ya = {};

                function va(l, n) {
                    l = l.replace(/:/g, "");
                    const e = Date.parse("Jan 01, 1970 00:00:00 " + l) / 6e4;
                    return isNaN(e) ? n : e
                }

                function ba(l) {
                    return l instanceof Date && !isNaN(l.valueOf())
                }
                const _a = new El("UseV4Plurals");
                class wa {}
                class xa extends wa {
                    constructor(l, n) {
                        super(), this.locale = l, this.deprecatedPluralFn = n
                    }
                    getPluralCategory(l, n) {
                        switch (this.deprecatedPluralFn ? this.deprecatedPluralFn(n || this.locale, l) : Xr(n || this.locale)(l)) {
                            case qr.Zero:
                                return "zero";
                            case qr.One:
                                return "one";
                            case qr.Two:
                                return "two";
                            case qr.Few:
                                return "few";
                            case qr.Many:
                                return "many";
                            default:
                                return "other"
                        }
                    }
                }
                class ka {}
                class Sa {
                    constructor(l, n, e, t) {
                        this._iterableDiffers = l, this._keyValueDiffers = n, this._ngEl = e, this._renderer = t, this._initialClasses = []
                    }
                    getValue() {
                        return null
                    }
                    setClass(l) {
                        this._removeClasses(this._initialClasses), this._initialClasses = "string" == typeof l ? l.split(/\s+/) : [], this._applyClasses(this._initialClasses), this._applyClasses(this._rawClass)
                    }
                    setNgClass(l) {
                        this._removeClasses(this._rawClass), this._applyClasses(this._initialClasses), this._iterableDiffer = null, this._keyValueDiffer = null, this._rawClass = "string" == typeof l ? l.split(/\s+/) : l, this._rawClass && (le(this._rawClass) ? this._iterableDiffer = this._iterableDiffers.find(this._rawClass).create() : this._keyValueDiffer = this._keyValueDiffers.find(this._rawClass).create())
                    }
                    applyChanges() {
                        if (this._iterableDiffer) {
                            const l = this._iterableDiffer.diff(this._rawClass);
                            l && this._applyIterableChanges(l)
                        } else if (this._keyValueDiffer) {
                            const l = this._keyValueDiffer.diff(this._rawClass);
                            l && this._applyKeyValueChanges(l)
                        }
                    }
                    _applyKeyValueChanges(l) {
                        l.forEachAddedItem(l => this._toggleClass(l.key, l.currentValue)), l.forEachChangedItem(l => this._toggleClass(l.key, l.currentValue)), l.forEachRemovedItem(l => {
                            l.previousValue && this._toggleClass(l.key, !1)
                        })
                    }
                    _applyIterableChanges(l) {
                        l.forEachAddedItem(l => {
                            if ("string" != typeof l.item) throw new Error(`NgClass can only toggle CSS classes expressed as strings, got ${bl(l.item)}`);
                            this._toggleClass(l.item, !0)
                        }), l.forEachRemovedItem(l => this._toggleClass(l.item, !1))
                    }
                    _applyClasses(l) {
                        l && (Array.isArray(l) || l instanceof Set ? l.forEach(l => this._toggleClass(l, !0)) : Object.keys(l).forEach(n => this._toggleClass(n, !!l[n])))
                    }
                    _removeClasses(l) {
                        l && (Array.isArray(l) || l instanceof Set ? l.forEach(l => this._toggleClass(l, !1)) : Object.keys(l).forEach(l => this._toggleClass(l, !1)))
                    }
                    _toggleClass(l, n) {
                        (l = l.trim()) && l.split(/\s+/g).forEach(l => {
                            n ? this._renderer.addClass(this._ngEl.nativeElement, l) : this._renderer.removeClass(this._ngEl.nativeElement, l)
                        })
                    }
                }
                let Ca = (() => {
                    class l {
                        constructor(l) {
                            this._delegate = l
                        }
                        getValue() {
                            return this._delegate.getValue()
                        }
                    }
                    return l.ngDirectiveDef = void 0, l
                })();
                class Ia extends Ca {
                    constructor(l) {
                        super(l)
                    }
                    set klass(l) {
                        this._delegate.setClass(l)
                    }
                    set ngClass(l) {
                        this._delegate.setNgClass(l)
                    }
                    ngDoCheck() {
                        this._delegate.applyChanges()
                    }
                }
                class Ta {
                    constructor(l, n, e, t) {
                        this.$implicit = l, this.ngForOf = n, this.index = e, this.count = t
                    }
                    get first() {
                        return 0 === this.index
                    }
                    get last() {
                        return this.index === this.count - 1
                    }
                    get even() {
                        return this.index % 2 == 0
                    }
                    get odd() {
                        return !this.even
                    }
                }
                class Ea {
                    constructor(l, n, e) {
                        this._viewContainer = l, this._template = n, this._differs = e, this._ngForOfDirty = !0, this._differ = null
                    }
                    set ngForOf(l) {
                        this._ngForOf = l, this._ngForOfDirty = !0
                    }
                    set ngForTrackBy(l) {
                        rn() && null != l && "function" != typeof l && console && console.warn && console.warn(`trackBy must be a function, but received ${JSON.stringify(l)}. ` + "See https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html#!#change-propagation for more information."), this._trackByFn = l
                    }
                    get ngForTrackBy() {
                        return this._trackByFn
                    }
                    set ngForTemplate(l) {
                        l && (this._template = l)
                    }
                    ngDoCheck() {
                        if (this._ngForOfDirty) {
                            this._ngForOfDirty = !1;
                            const e = this._ngForOf;
                            if (!this._differ && e) try {
                                this._differ = this._differs.find(e).create(this.ngForTrackBy)
                            } catch (n) {
                                throw new Error(`Cannot find a differ supporting object '${e}' of type '${l=e,l.name||typeof l}'. NgFor only supports binding to Iterables such as Arrays.`)
                            }
                        }
                        var l;
                        if (this._differ) {
                            const l = this._differ.diff(this._ngForOf);
                            l && this._applyChanges(l)
                        }
                    }
                    _applyChanges(l) {
                        const n = [];
                        l.forEachOperation((l, e, t) => {
                            if (null == l.previousIndex) {
                                const e = this._viewContainer.createEmbeddedView(this._template, new Ta(null, this._ngForOf, -1, -1), null === t ? void 0 : t),
                                    i = new Aa(l, e);
                                n.push(i)
                            } else if (null == t) this._viewContainer.remove(null === e ? void 0 : e);
                            else if (null !== e) {
                                const i = this._viewContainer.get(e);
                                this._viewContainer.move(i, t);
                                const s = new Aa(l, i);
                                n.push(s)
                            }
                        });
                        for (let e = 0; e < n.length; e++) this._perViewChange(n[e].view, n[e].record);
                        for (let e = 0, t = this._viewContainer.length; e < t; e++) {
                            const l = this._viewContainer.get(e);
                            l.context.index = e, l.context.count = t, l.context.ngForOf = this._ngForOf
                        }
                        l.forEachIdentityChange(l => {
                            this._viewContainer.get(l.currentIndex).context.$implicit = l.item
                        })
                    }
                    _perViewChange(l, n) {
                        l.context.$implicit = n.item
                    }
                    static ngTemplateContextGuard(l, n) {
                        return !0
                    }
                }
                class Aa {
                    constructor(l, n) {
                        this.record = l, this.view = n
                    }
                }
                class Pa {
                    constructor(l, n) {
                        this._viewContainer = l, this._context = new Da, this._thenTemplateRef = null, this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, this._thenTemplateRef = n
                    }
                    set ngIf(l) {
                        this._context.$implicit = this._context.ngIf = l, this._updateView()
                    }
                    set ngIfThen(l) {
                        Ma("ngIfThen", l), this._thenTemplateRef = l, this._thenViewRef = null, this._updateView()
                    }
                    set ngIfElse(l) {
                        Ma("ngIfElse", l), this._elseTemplateRef = l, this._elseViewRef = null, this._updateView()
                    }
                    _updateView() {
                        this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
                    }
                }
                class Da {
                    constructor() {
                        this.$implicit = null, this.ngIf = null
                    }
                }

                function Ma(l, n) {
                    if (n && !n.createEmbeddedView) throw new Error(`${l} must be a TemplateRef, but received '${bl(n)}'.`)
                }
                class Oa {}
                class Na {
                    constructor(l, n, e) {
                        this._ngEl = l, this._differs = n, this._renderer = e
                    }
                    getValue() {
                        return null
                    }
                    setNgStyle(l) {
                        this._ngStyle = l, !this._differ && l && (this._differ = this._differs.find(l).create())
                    }
                    applyChanges() {
                        if (this._differ) {
                            const l = this._differ.diff(this._ngStyle);
                            l && this._applyChanges(l)
                        }
                    }
                    _applyChanges(l) {
                        l.forEachRemovedItem(l => this._setStyle(l.key, null)), l.forEachAddedItem(l => this._setStyle(l.key, l.currentValue)), l.forEachChangedItem(l => this._setStyle(l.key, l.currentValue))
                    }
                    _setStyle(l, n) {
                        const [e, t] = l.split(".");
                        null != (n = null != n && t ? `${n}${t}` : n) ? this._renderer.setStyle(this._ngEl.nativeElement, e, n) : this._renderer.removeStyle(this._ngEl.nativeElement, e)
                    }
                }
                let Ra = (() => {
                    class l {
                        constructor(l) {
                            this._delegate = l
                        }
                        getValue() {
                            return this._delegate.getValue()
                        }
                    }
                    return l.ngDirectiveDef = void 0, l
                })();
                class Ba extends Ra {
                    constructor(l) {
                        super(l)
                    }
                    set ngStyle(l) {
                        this._delegate.setNgStyle(l)
                    }
                    ngDoCheck() {
                        this._delegate.applyChanges()
                    }
                }
                class za {
                    constructor(l) {
                        this._viewContainerRef = l, this._viewRef = null, this.ngTemplateOutletContext = null, this.ngTemplateOutlet = null
                    }
                    ngOnChanges(l) {
                        this._shouldRecreateView(l) ? (this._viewRef && this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._viewRef)), this.ngTemplateOutlet && (this._viewRef = this._viewContainerRef.createEmbeddedView(this.ngTemplateOutlet, this.ngTemplateOutletContext))) : this._viewRef && this.ngTemplateOutletContext && this._updateExistingContext(this.ngTemplateOutletContext)
                    }
                    _shouldRecreateView(l) {
                        const n = l.ngTemplateOutletContext;
                        return !!l.ngTemplateOutlet || n && this._hasContextShapeChanged(n)
                    }
                    _hasContextShapeChanged(l) {
                        const n = Object.keys(l.previousValue || {}),
                            e = Object.keys(l.currentValue || {});
                        if (n.length === e.length) {
                            for (let l of e)
                                if (-1 === n.indexOf(l)) return !0;
                            return !1
                        }
                        return !0
                    }
                    _updateExistingContext(l) {
                        for (let n of Object.keys(l)) this._viewRef.context[n] = this.ngTemplateOutletContext[n]
                    }
                }
                class $a {
                    constructor(l) {
                        this.locale = l
                    }
                    transform(l, n = "mediumDate", e, t) {
                        if (null == l || "" === l || l != l) return null;
                        try {
                            return aa(l, n, t || this.locale, e)
                        } catch (i) {
                            throw function (l, n) {
                                return Error(`InvalidPipeArgument: '${n}' for pipe '${bl(l)}'`)
                            }($a, i.message)
                        }
                    }
                }
                class La {
                    constructor(l) {
                        this.differs = l, this.keyValues = []
                    }
                    transform(l, n = Fa) {
                        if (!l || !(l instanceof Map) && "object" != typeof l) return null;
                        this.differ || (this.differ = this.differs.find(l).create());
                        const e = this.differ.diff(l);
                        return e && (this.keyValues = [], e.forEachItem(l => {
                            this.keyValues.push(function (l, n) {
                                return {
                                    key: l,
                                    value: n
                                }
                            }(l.key, l.currentValue))
                        }), this.keyValues.sort(n)), this.keyValues
                    }
                }

                function Fa(l, n) {
                    const e = l.key,
                        t = n.key;
                    if (e === t) return 0;
                    if (void 0 === e) return 1;
                    if (void 0 === t) return -1;
                    if (null === e) return 1;
                    if (null === t) return -1;
                    if ("string" == typeof e && "string" == typeof t) return e < t ? -1 : 1;
                    if ("number" == typeof e && "number" == typeof t) return e - t;
                    if ("boolean" == typeof e && "boolean" == typeof t) return e < t ? -1 : 1;
                    const i = String(e),
                        s = String(t);
                    return i == s ? 0 : i < s ? -1 : 1
                }
                class qa {}
                const Ua = new El("DocumentToken"),
                    Ha = "server";
                let Va = (() => {
                    class l {}
                    return l.ngInjectableDef = gl({
                        token: l,
                        providedIn: "root",
                        factory: () => new ja(ql(Ua), window, ql(tn))
                    }), l
                })();
                class ja {
                    constructor(l, n, e) {
                        this.document = l, this.window = n, this.errorHandler = e, this.offset = () => [0, 0]
                    }
                    setOffset(l) {
                        this.offset = Array.isArray(l) ? () => l : l
                    }
                    getScrollPosition() {
                        return this.supportScrollRestoration() ? [this.window.scrollX, this.window.scrollY] : [0, 0]
                    }
                    scrollToPosition(l) {
                        this.supportScrollRestoration() && this.window.scrollTo(l[0], l[1])
                    }
                    scrollToAnchor(l) {
                        if (this.supportScrollRestoration()) {
                            l = this.window.CSS && this.window.CSS.escape ? this.window.CSS.escape(l) : l.replace(/(\"|\'\ |:|\.|\[|\]|,|=)/g, "\\$1");
                            try {
                                const n = this.document.querySelector(`#${l}`);
                                if (n) return void this.scrollToElement(n);
                                const e = this.document.querySelector(`[name='${l}']`);
                                if (e) return void this.scrollToElement(e)
                            } catch (n) {
                                this.errorHandler.handleError(n)
                            }
                        }
                    }
                    setHistoryScrollRestoration(l) {
                        if (this.supportScrollRestoration()) {
                            const n = this.window.history;
                            n && n.scrollRestoration && (n.scrollRestoration = l)
                        }
                    }
                    scrollToElement(l) {
                        const n = l.getBoundingClientRect(),
                            e = n.left + this.window.pageXOffset,
                            t = n.top + this.window.pageYOffset,
                            i = this.offset();
                        this.window.scrollTo(e - i[0], t - i[1])
                    }
                    supportScrollRestoration() {
                        try {
                            return !!this.window && !!this.window.scrollTo
                        } catch (l) {
                            return !1
                        }
                    }
                }
                const Ga = new w(l => l.complete());

                function Wa(l) {
                    return l ? function (l) {
                        return new w(n => l.schedule(() => n.complete()))
                    }(l) : Ga
                }

                function Ka(l) {
                    const n = new w(n => {
                        n.next(l), n.complete()
                    });
                    return n._isScalar = !0, n.value = l, n
                }

                function Za(...l) {
                    let n = l[l.length - 1];
                    switch (A(n) ? l.pop() : n = void 0, l.length) {
                        case 0:
                            return Wa(n);
                        case 1:
                            return n ? j(l, n) : Ka(l[0]);
                        default:
                            return j(l, n)
                    }
                }
                class Qa extends T {
                    constructor(l) {
                        super(), this._value = l
                    }
                    get value() {
                        return this.getValue()
                    }
                    _subscribe(l) {
                        const n = super._subscribe(l);
                        return n && !n.closed && l.next(this._value), n
                    }
                    getValue() {
                        if (this.hasError) throw this.thrownError;
                        if (this.closed) throw new S;
                        return this._value
                    }
                    next(l) {
                        super.next(this._value = l)
                    }
                }

                function Ya() {
                    return Error.call(this), this.message = "no elements in sequence", this.name = "EmptyError", this
                }
                Ya.prototype = Object.create(Error.prototype);
                const Xa = Ya,
                    Ja = {};
                class lo {
                    constructor(l) {
                        this.resultSelector = l
                    }
                    call(l, n) {
                        return n.subscribe(new no(l, this.resultSelector))
                    }
                }
                class no extends q {
                    constructor(l, n) {
                        super(l), this.resultSelector = n, this.active = 0, this.values = [], this.observables = []
                    }
                    _next(l) {
                        this.values.push(Ja), this.observables.push(l)
                    }
                    _complete() {
                        const l = this.observables,
                            n = l.length;
                        if (0 === n) this.destination.complete();
                        else {
                            this.active = n, this.toRespond = n;
                            for (let e = 0; e < n; e++) {
                                const n = l[e];
                                this.add(F(this, n, n, e))
                            }
                        }
                    }
                    notifyComplete(l) {
                        0 == (this.active -= 1) && this.destination.complete()
                    }
                    notifyNext(l, n, e, t, i) {
                        const s = this.values,
                            u = this.toRespond ? s[e] === Ja ? --this.toRespond : this.toRespond : 0;
                        s[e] = n, 0 === u && (this.resultSelector ? this._tryResultSelector(s) : this.destination.next(s.slice()))
                    }
                    _tryResultSelector(l) {
                        let n;
                        try {
                            n = this.resultSelector.apply(this, l)
                        } catch (e) {
                            return void this.destination.error(e)
                        }
                        this.destination.next(n)
                    }
                }

                function eo(l) {
                    return new w(n => {
                        let e;
                        try {
                            e = l()
                        } catch (t) {
                            return void n.error(t)
                        }
                        return (e ? G(e) : Wa()).subscribe(n)
                    })
                }

                function to() {
                    return Y(1)
                }

                function io(l, n) {
                    return function (e) {
                        return e.lift(new so(l, n))
                    }
                }
                class so {
                    constructor(l, n) {
                        this.predicate = l, this.thisArg = n
                    }
                    call(l, n) {
                        return n.subscribe(new uo(l, this.predicate, this.thisArg))
                    }
                }
                class uo extends g {
                    constructor(l, n, e) {
                        super(l), this.predicate = n, this.thisArg = e, this.count = 0
                    }
                    _next(l) {
                        let n;
                        try {
                            n = this.predicate.call(this.thisArg, l, this.count++)
                        } catch (e) {
                            return void this.destination.error(e)
                        }
                        n && this.destination.next(l)
                    }
                }

                function ro() {
                    return Error.call(this), this.message = "argument out of range", this.name = "ArgumentOutOfRangeError", this
                }
                ro.prototype = Object.create(Error.prototype);
                const ao = ro;

                function oo(l) {
                    return function (n) {
                        return 0 === l ? Wa() : n.lift(new co(l))
                    }
                }
                class co {
                    constructor(l) {
                        if (this.total = l, this.total < 0) throw new ao
                    }
                    call(l, n) {
                        return n.subscribe(new ho(l, this.total))
                    }
                }
                class ho extends g {
                    constructor(l, n) {
                        super(l), this.total = n, this.ring = new Array, this.count = 0
                    }
                    _next(l) {
                        const n = this.ring,
                            e = this.total,
                            t = this.count++;
                        n.length < e ? n.push(l) : n[t % e] = l
                    }
                    _complete() {
                        const l = this.destination;
                        let n = this.count;
                        if (n > 0) {
                            const e = this.count >= this.total ? this.total : this.count,
                                t = this.ring;
                            for (let i = 0; i < e; i++) {
                                const i = n++ % e;
                                l.next(t[i])
                            }
                        }
                        l.complete()
                    }
                }

                function po(l, n, e) {
                    return function (t) {
                        return t.lift(new fo(l, n, e))
                    }
                }
                class fo {
                    constructor(l, n, e) {
                        this.nextOrObserver = l, this.error = n, this.complete = e
                    }
                    call(l, n) {
                        return n.subscribe(new go(l, this.nextOrObserver, this.error, this.complete))
                    }
                }
                class go extends g {
                    constructor(l, n, e, i) {
                        super(l), this._tapNext = v, this._tapError = v, this._tapComplete = v, this._tapError = e || v, this._tapComplete = i || v, t(n) ? (this._context = this, this._tapNext = n) : n && (this._context = n, this._tapNext = n.next || v, this._tapError = n.error || v, this._tapComplete = n.complete || v)
                    }
                    _next(l) {
                        try {
                            this._tapNext.call(this._context, l)
                        } catch (n) {
                            return void this.destination.error(n)
                        }
                        this.destination.next(l)
                    }
                    _error(l) {
                        try {
                            this._tapError.call(this._context, l)
                        } catch (l) {
                            return void this.destination.error(l)
                        }
                        this.destination.error(l)
                    }
                    _complete() {
                        try {
                            this._tapComplete.call(this._context)
                        } catch (l) {
                            return void this.destination.error(l)
                        }
                        return this.destination.complete()
                    }
                }
                const mo = (l = yo) => po({
                    hasValue: !1,
                    next() {
                        this.hasValue = !0
                    },
                    complete() {
                        if (!this.hasValue) throw l()
                    }
                });

                function yo() {
                    return new Xa
                }

                function vo(l = null) {
                    return n => n.lift(new bo(l))
                }
                class bo {
                    constructor(l) {
                        this.defaultValue = l
                    }
                    call(l, n) {
                        return n.subscribe(new _o(l, this.defaultValue))
                    }
                }
                class _o extends g {
                    constructor(l, n) {
                        super(l), this.defaultValue = n, this.isEmpty = !0
                    }
                    _next(l) {
                        this.isEmpty = !1, this.destination.next(l)
                    }
                    _complete() {
                        this.isEmpty && this.destination.next(this.defaultValue), this.destination.complete()
                    }
                }

                function wo(l, n) {
                    const e = arguments.length >= 2;
                    return t => t.pipe(l ? io((n, e) => l(n, e, t)) : Q, oo(1), e ? vo(n) : mo(() => new Xa))
                }

                function xo(l) {
                    return function (n) {
                        const e = new ko(l),
                            t = n.lift(e);
                        return e.caught = t
                    }
                }
                class ko {
                    constructor(l) {
                        this.selector = l
                    }
                    call(l, n) {
                        return n.subscribe(new So(l, this.selector, this.caught))
                    }
                }
                class So extends q {
                    constructor(l, n, e) {
                        super(l), this.selector = n, this.caught = e
                    }
                    error(l) {
                        if (!this.isStopped) {
                            let e;
                            try {
                                e = this.selector(l, this.caught)
                            } catch (n) {
                                return void super.error(n)
                            }
                            this._unsubscribeAndRecycle();
                            const t = new P(this, void 0, void 0);
                            this.add(t), F(this, e, void 0, void 0, t)
                        }
                    }
                }

                function Co(l) {
                    return n => 0 === l ? Wa() : n.lift(new Io(l))
                }
                class Io {
                    constructor(l) {
                        if (this.total = l, this.total < 0) throw new ao
                    }
                    call(l, n) {
                        return n.subscribe(new To(l, this.total))
                    }
                }
                class To extends g {
                    constructor(l, n) {
                        super(l), this.total = n, this.count = 0
                    }
                    _next(l) {
                        const n = this.total,
                            e = ++this.count;
                        e <= n && (this.destination.next(l), e === n && (this.destination.complete(), this.unsubscribe()))
                    }
                }

                function Eo(l, n) {
                    const e = arguments.length >= 2;
                    return t => t.pipe(l ? io((n, e) => l(n, e, t)) : Q, Co(1), e ? vo(n) : mo(() => new Xa))
                }
                class Ao {
                    constructor(l, n, e) {
                        this.predicate = l, this.thisArg = n, this.source = e
                    }
                    call(l, n) {
                        return n.subscribe(new Po(l, this.predicate, this.thisArg, this.source))
                    }
                }
                class Po extends g {
                    constructor(l, n, e, t) {
                        super(l), this.predicate = n, this.thisArg = e, this.source = t, this.index = 0, this.thisArg = e || this
                    }
                    notifyComplete(l) {
                        this.destination.next(l), this.destination.complete()
                    }
                    _next(l) {
                        let n = !1;
                        try {
                            n = this.predicate.call(this.thisArg, l, this.index++, this.source)
                        } catch (e) {
                            return void this.destination.error(e)
                        }
                        n || this.notifyComplete(!1)
                    }
                    _complete() {
                        this.notifyComplete(!0)
                    }
                }

                function Do(l, n) {
                    return "function" == typeof n ? e => e.pipe(Do((e, t) => G(l(e, t)).pipe(U((l, i) => n(e, l, t, i))))) : n => n.lift(new Mo(l))
                }
                class Mo {
                    constructor(l) {
                        this.project = l
                    }
                    call(l, n) {
                        return n.subscribe(new Oo(l, this.project))
                    }
                }
                class Oo extends q {
                    constructor(l, n) {
                        super(l), this.project = n, this.index = 0
                    }
                    _next(l) {
                        let n;
                        const e = this.index++;
                        try {
                            n = this.project(l, e)
                        } catch (t) {
                            return void this.destination.error(t)
                        }
                        this._innerSub(n, l, e)
                    }
                    _innerSub(l, n, e) {
                        const t = this.innerSubscription;
                        t && t.unsubscribe();
                        const i = new P(this, void 0, void 0);
                        this.destination.add(i), this.innerSubscription = F(this, l, n, e, i)
                    }
                    _complete() {
                        const {
                            innerSubscription: l
                        } = this;
                        l && !l.closed || super._complete(), this.unsubscribe()
                    }
                    _unsubscribe() {
                        this.innerSubscription = null
                    }
                    notifyComplete(l) {
                        this.destination.remove(l), this.innerSubscription = null, this.isStopped && super._complete()
                    }
                    notifyNext(l, n, e, t, i) {
                        this.destination.next(n)
                    }
                }

                function No(l, n) {
                    let e = !1;
                    return arguments.length >= 2 && (e = !0),
                        function (t) {
                            return t.lift(new Ro(l, n, e))
                        }
                }
                class Ro {
                    constructor(l, n, e = !1) {
                        this.accumulator = l, this.seed = n, this.hasSeed = e
                    }
                    call(l, n) {
                        return n.subscribe(new Bo(l, this.accumulator, this.seed, this.hasSeed))
                    }
                }
                class Bo extends g {
                    constructor(l, n, e, t) {
                        super(l), this.accumulator = n, this._seed = e, this.hasSeed = t, this.index = 0
                    }
                    get seed() {
                        return this._seed
                    }
                    set seed(l) {
                        this.hasSeed = !0, this._seed = l
                    }
                    _next(l) {
                        if (this.hasSeed) return this._tryNext(l);
                        this.seed = l, this.destination.next(l)
                    }
                    _tryNext(l) {
                        const n = this.index++;
                        let e;
                        try {
                            e = this.accumulator(this.seed, l, n)
                        } catch (t) {
                            this.destination.error(t)
                        }
                        this.seed = e, this.destination.next(e)
                    }
                }

                function zo(l, n) {
                    return W(l, n, 1)
                }
                class $o {
                    constructor(l) {
                        this.callback = l
                    }
                    call(l, n) {
                        return n.subscribe(new Lo(l, this.callback))
                    }
                }
                class Lo extends g {
                    constructor(l, n) {
                        super(l), this.add(new h(n))
                    }
                }
                let Fo = null;

                function qo() {
                    return Fo
                }
                class Uo {
                    constructor() {
                        this.resourceLoaderType = null
                    }
                    get attrToPropMap() {
                        return this._attrToPropMap
                    }
                    set attrToPropMap(l) {
                        this._attrToPropMap = l
                    }
                }
                class Ho extends Uo {
                    constructor() {
                        super(), this._animationPrefix = null, this._transitionEnd = null;
                        try {
                            const l = this.createElement("div", document);
                            if (null != this.getStyle(l, "animationName")) this._animationPrefix = "";
                            else {
                                const n = ["Webkit", "Moz", "O", "ms"];
                                for (let e = 0; e < n.length; e++)
                                    if (null != this.getStyle(l, n[e] + "AnimationName")) {
                                        this._animationPrefix = "-" + n[e].toLowerCase() + "-";
                                        break
                                    }
                            }
                            const n = {
                                WebkitTransition: "webkitTransitionEnd",
                                MozTransition: "transitionend",
                                OTransition: "oTransitionEnd otransitionend",
                                transition: "transitionend"
                            };
                            Object.keys(n).forEach(e => {
                                null != this.getStyle(l, e) && (this._transitionEnd = n[e])
                            })
                        } catch (l) {
                            this._animationPrefix = null, this._transitionEnd = null
                        }
                    }
                    getDistributedNodes(l) {
                        return l.getDistributedNodes()
                    }
                    resolveAndSetHref(l, n, e) {
                        l.href = null == e ? n : n + "/../" + e
                    }
                    supportsDOMEvents() {
                        return !0
                    }
                    supportsNativeShadowDOM() {
                        return "function" == typeof document.body.createShadowRoot
                    }
                    getAnimationPrefix() {
                        return this._animationPrefix ? this._animationPrefix : ""
                    }
                    getTransitionEnd() {
                        return this._transitionEnd ? this._transitionEnd : ""
                    }
                    supportsAnimation() {
                        return null != this._animationPrefix && null != this._transitionEnd
                    }
                }
                const Vo = {
                        class: "className",
                        innerHtml: "innerHTML",
                        readonly: "readOnly",
                        tabindex: "tabIndex"
                    },
                    jo = 3,
                    Go = {
                        "\b": "Backspace",
                        "\t": "Tab",
                        "\x7f": "Delete",
                        "\x1b": "Escape",
                        Del: "Delete",
                        Esc: "Escape",
                        Left: "ArrowLeft",
                        Right: "ArrowRight",
                        Up: "ArrowUp",
                        Down: "ArrowDown",
                        Menu: "ContextMenu",
                        Scroll: "ScrollLock",
                        Win: "OS"
                    },
                    Wo = {
                        A: "1",
                        B: "2",
                        C: "3",
                        D: "4",
                        E: "5",
                        F: "6",
                        G: "7",
                        H: "8",
                        I: "9",
                        J: "*",
                        K: "+",
                        M: "-",
                        N: ".",
                        O: "/",
                        "`": "0",
                        "\x90": "NumLock"
                    },
                    Ko = (() => {
                        if (Tl.Node) return Tl.Node.prototype.contains || function (l) {
                            return !!(16 & this.compareDocumentPosition(l))
                        }
                    })();
                class Zo extends Ho {
                    parse(l) {
                        throw new Error("parse not implemented")
                    }
                    static makeCurrent() {
                        var l;
                        l = new Zo, Fo || (Fo = l)
                    }
                    hasProperty(l, n) {
                        return n in l
                    }
                    setProperty(l, n, e) {
                        l[n] = e
                    }
                    getProperty(l, n) {
                        return l[n]
                    }
                    invoke(l, n, e) {
                        l[n](...e)
                    }
                    logError(l) {
                        window.console && (console.error ? console.error(l) : console.log(l))
                    }
                    log(l) {
                        window.console && window.console.log && window.console.log(l)
                    }
                    logGroup(l) {
                        window.console && window.console.group && window.console.group(l)
                    }
                    logGroupEnd() {
                        window.console && window.console.groupEnd && window.console.groupEnd()
                    }
                    get attrToPropMap() {
                        return Vo
                    }
                    contains(l, n) {
                        return Ko.call(l, n)
                    }
                    querySelector(l, n) {
                        return l.querySelector(n)
                    }
                    querySelectorAll(l, n) {
                        return l.querySelectorAll(n)
                    }
                    on(l, n, e) {
                        l.addEventListener(n, e, !1)
                    }
                    onAndCancel(l, n, e) {
                        return l.addEventListener(n, e, !1), () => {
                            l.removeEventListener(n, e, !1)
                        }
                    }
                    dispatchEvent(l, n) {
                        l.dispatchEvent(n)
                    }
                    createMouseEvent(l) {
                        const n = this.getDefaultDocument().createEvent("MouseEvent");
                        return n.initEvent(l, !0, !0), n
                    }
                    createEvent(l) {
                        const n = this.getDefaultDocument().createEvent("Event");
                        return n.initEvent(l, !0, !0), n
                    }
                    preventDefault(l) {
                        l.preventDefault(), l.returnValue = !1
                    }
                    isPrevented(l) {
                        return l.defaultPrevented || null != l.returnValue && !l.returnValue
                    }
                    getInnerHTML(l) {
                        return l.innerHTML
                    }
                    getTemplateContent(l) {
                        return "content" in l && this.isTemplateElement(l) ? l.content : null
                    }
                    getOuterHTML(l) {
                        return l.outerHTML
                    }
                    nodeName(l) {
                        return l.nodeName
                    }
                    nodeValue(l) {
                        return l.nodeValue
                    }
                    type(l) {
                        return l.type
                    }
                    content(l) {
                        return this.hasProperty(l, "content") ? l.content : l
                    }
                    firstChild(l) {
                        return l.firstChild
                    }
                    nextSibling(l) {
                        return l.nextSibling
                    }
                    parentElement(l) {
                        return l.parentNode
                    }
                    childNodes(l) {
                        return l.childNodes
                    }
                    childNodesAsList(l) {
                        const n = l.childNodes,
                            e = new Array(n.length);
                        for (let t = 0; t < n.length; t++) e[t] = n[t];
                        return e
                    }
                    clearNodes(l) {
                        for (; l.firstChild;) l.removeChild(l.firstChild)
                    }
                    appendChild(l, n) {
                        l.appendChild(n)
                    }
                    removeChild(l, n) {
                        l.removeChild(n)
                    }
                    replaceChild(l, n, e) {
                        l.replaceChild(n, e)
                    }
                    remove(l) {
                        return l.parentNode && l.parentNode.removeChild(l), l
                    }
                    insertBefore(l, n, e) {
                        l.insertBefore(e, n)
                    }
                    insertAllBefore(l, n, e) {
                        e.forEach(e => l.insertBefore(e, n))
                    }
                    insertAfter(l, n, e) {
                        l.insertBefore(e, n.nextSibling)
                    }
                    setInnerHTML(l, n) {
                        l.innerHTML = n
                    }
                    getText(l) {
                        return l.textContent
                    }
                    setText(l, n) {
                        l.textContent = n
                    }
                    getValue(l) {
                        return l.value
                    }
                    setValue(l, n) {
                        l.value = n
                    }
                    getChecked(l) {
                        return l.checked
                    }
                    setChecked(l, n) {
                        l.checked = n
                    }
                    createComment(l) {
                        return this.getDefaultDocument().createComment(l)
                    }
                    createTemplate(l) {
                        const n = this.getDefaultDocument().createElement("template");
                        return n.innerHTML = l, n
                    }
                    createElement(l, n) {
                        return (n = n || this.getDefaultDocument()).createElement(l)
                    }
                    createElementNS(l, n, e) {
                        return (e = e || this.getDefaultDocument()).createElementNS(l, n)
                    }
                    createTextNode(l, n) {
                        return (n = n || this.getDefaultDocument()).createTextNode(l)
                    }
                    createScriptTag(l, n, e) {
                        const t = (e = e || this.getDefaultDocument()).createElement("SCRIPT");
                        return t.setAttribute(l, n), t
                    }
                    createStyleElement(l, n) {
                        const e = (n = n || this.getDefaultDocument()).createElement("style");
                        return this.appendChild(e, this.createTextNode(l, n)), e
                    }
                    createShadowRoot(l) {
                        return l.createShadowRoot()
                    }
                    getShadowRoot(l) {
                        return l.shadowRoot
                    }
                    getHost(l) {
                        return l.host
                    }
                    clone(l) {
                        return l.cloneNode(!0)
                    }
                    getElementsByClassName(l, n) {
                        return l.getElementsByClassName(n)
                    }
                    getElementsByTagName(l, n) {
                        return l.getElementsByTagName(n)
                    }
                    classList(l) {
                        return Array.prototype.slice.call(l.classList, 0)
                    }
                    addClass(l, n) {
                        l.classList.add(n)
                    }
                    removeClass(l, n) {
                        l.classList.remove(n)
                    }
                    hasClass(l, n) {
                        return l.classList.contains(n)
                    }
                    setStyle(l, n, e) {
                        l.style[n] = e
                    }
                    removeStyle(l, n) {
                        l.style[n] = ""
                    }
                    getStyle(l, n) {
                        return l.style[n]
                    }
                    hasStyle(l, n, e) {
                        const t = this.getStyle(l, n) || "";
                        return e ? t == e : t.length > 0
                    }
                    tagName(l) {
                        return l.tagName
                    }
                    attributeMap(l) {
                        const n = new Map,
                            e = l.attributes;
                        for (let t = 0; t < e.length; t++) {
                            const l = e.item(t);
                            n.set(l.name, l.value)
                        }
                        return n
                    }
                    hasAttribute(l, n) {
                        return l.hasAttribute(n)
                    }
                    hasAttributeNS(l, n, e) {
                        return l.hasAttributeNS(n, e)
                    }
                    getAttribute(l, n) {
                        return l.getAttribute(n)
                    }
                    getAttributeNS(l, n, e) {
                        return l.getAttributeNS(n, e)
                    }
                    setAttribute(l, n, e) {
                        l.setAttribute(n, e)
                    }
                    setAttributeNS(l, n, e, t) {
                        l.setAttributeNS(n, e, t)
                    }
                    removeAttribute(l, n) {
                        l.removeAttribute(n)
                    }
                    removeAttributeNS(l, n, e) {
                        l.removeAttributeNS(n, e)
                    }
                    templateAwareRoot(l) {
                        return this.isTemplateElement(l) ? this.content(l) : l
                    }
                    createHtmlDocument() {
                        return document.implementation.createHTMLDocument("fakeTitle")
                    }
                    getDefaultDocument() {
                        return document
                    }
                    getBoundingClientRect(l) {
                        try {
                            return l.getBoundingClientRect()
                        } catch (n) {
                            return {
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                width: 0,
                                height: 0
                            }
                        }
                    }
                    getTitle(l) {
                        return l.title
                    }
                    setTitle(l, n) {
                        l.title = n || ""
                    }
                    elementMatches(l, n) {
                        return !!this.isElementNode(l) && (l.matches && l.matches(n) || l.msMatchesSelector && l.msMatchesSelector(n) || l.webkitMatchesSelector && l.webkitMatchesSelector(n))
                    }
                    isTemplateElement(l) {
                        return this.isElementNode(l) && "TEMPLATE" === l.nodeName
                    }
                    isTextNode(l) {
                        return l.nodeType === Node.TEXT_NODE
                    }
                    isCommentNode(l) {
                        return l.nodeType === Node.COMMENT_NODE
                    }
                    isElementNode(l) {
                        return l.nodeType === Node.ELEMENT_NODE
                    }
                    hasShadowRoot(l) {
                        return null != l.shadowRoot && l instanceof HTMLElement
                    }
                    isShadowRoot(l) {
                        return l instanceof DocumentFragment
                    }
                    importIntoDoc(l) {
                        return document.importNode(this.templateAwareRoot(l), !0)
                    }
                    adoptNode(l) {
                        return document.adoptNode(l)
                    }
                    getHref(l) {
                        return l.getAttribute("href")
                    }
                    getEventKey(l) {
                        let n = l.key;
                        if (null == n) {
                            if (null == (n = l.keyIdentifier)) return "Unidentified";
                            n.startsWith("U+") && (n = String.fromCharCode(parseInt(n.substring(2), 16)), l.location === jo && Wo.hasOwnProperty(n) && (n = Wo[n]))
                        }
                        return Go[n] || n
                    }
                    getGlobalEventTarget(l, n) {
                        return "window" === n ? window : "document" === n ? l : "body" === n ? l.body : null
                    }
                    getHistory() {
                        return window.history
                    }
                    getLocation() {
                        return window.location
                    }
                    getBaseHref(l) {
                        const n = Yo || (Yo = document.querySelector("base")) ? Yo.getAttribute("href") : null;
                        return null == n ? null : (e = n, Qo || (Qo = document.createElement("a")), Qo.setAttribute("href", e), "/" === Qo.pathname.charAt(0) ? Qo.pathname : "/" + Qo.pathname);
                        var e
                    }
                    resetBaseElement() {
                        Yo = null
                    }
                    getUserAgent() {
                        return window.navigator.userAgent
                    }
                    setData(l, n, e) {
                        this.setAttribute(l, "data-" + n, e)
                    }
                    getData(l, n) {
                        return this.getAttribute(l, "data-" + n)
                    }
                    getComputedStyle(l) {
                        return getComputedStyle(l)
                    }
                    supportsWebAnimation() {
                        return "function" == typeof Element.prototype.animate
                    }
                    performanceNow() {
                        return window.performance && window.performance.now ? window.performance.now() : (new Date).getTime()
                    }
                    supportsCookies() {
                        return !0
                    }
                    getCookie(l) {
                        return function (l, n) {
                            n = encodeURIComponent(n);
                            for (const e of l.split(";")) {
                                const l = e.indexOf("="),
                                    [t, i] = -1 == l ? [e, ""] : [e.slice(0, l), e.slice(l + 1)];
                                if (t.trim() === n) return decodeURIComponent(i)
                            }
                            return null
                        }(document.cookie, l)
                    }
                    setCookie(l, n) {
                        document.cookie = encodeURIComponent(l) + "=" + encodeURIComponent(n)
                    }
                }
                let Qo, Yo = null;

                function Xo() {
                    return !!window.history.pushState
                }
                const Jo = new El("TRANSITION_ID"),
                    lc = [{
                        provide: Vi,
                        useFactory: function (l, n, e) {
                            return () => {
                                e.get(ji).donePromise.then(() => {
                                    const e = qo();
                                    Array.prototype.slice.apply(e.querySelectorAll(n, "style[ng-transition]")).filter(n => e.getAttribute(n, "ng-transition") === l).forEach(l => e.remove(l))
                                })
                            }
                        },
                        deps: [Jo, Ua, Ln],
                        multi: !0
                    }];
                class nc {
                    static init() {
                        var l;
                        l = new nc, Es = l
                    }
                    addToWindow(l) {
                        Tl.getAngularTestability = (n, e = !0) => {
                            const t = l.findTestabilityInTree(n, e);
                            if (null == t) throw new Error("Could not find testability for element.");
                            return t
                        }, Tl.getAllAngularTestabilities = () => l.getAllTestabilities(), Tl.getAllAngularRootElements = () => l.getAllRootElements(), Tl.frameworkStabilizers || (Tl.frameworkStabilizers = []), Tl.frameworkStabilizers.push(l => {
                            const n = Tl.getAllAngularTestabilities();
                            let e = n.length,
                                t = !1;
                            const i = function (n) {
                                t = t || n, 0 == --e && l(t)
                            };
                            n.forEach((function (l) {
                                l.whenStable(i)
                            }))
                        })
                    }
                    findTestabilityInTree(l, n, e) {
                        if (null == n) return null;
                        const t = l.getTestability(n);
                        return null != t ? t : e ? qo().isShadowRoot(n) ? this.findTestabilityInTree(l, qo().getHost(n), !0) : this.findTestabilityInTree(l, qo().parentElement(n), !0) : null
                    }
                }

                function ec(l, n) {
                    "undefined" != typeof COMPILED && COMPILED || ((Tl.ng = Tl.ng || {})[l] = n)
                }
                const tc = (() => ({
                    ApplicationRef: zs,
                    NgZone: ys
                }))();

                function ic(l) {
                    return Qs(l)
                }
                const sc = new El("EventManagerPlugins");
                class uc {
                    constructor(l, n) {
                        this._zone = n, this._eventNameToPlugin = new Map, l.forEach(l => l.manager = this), this._plugins = l.slice().reverse()
                    }
                    addEventListener(l, n, e) {
                        return this._findPluginFor(n).addEventListener(l, n, e)
                    }
                    addGlobalEventListener(l, n, e) {
                        return this._findPluginFor(n).addGlobalEventListener(l, n, e)
                    }
                    getZone() {
                        return this._zone
                    }
                    _findPluginFor(l) {
                        const n = this._eventNameToPlugin.get(l);
                        if (n) return n;
                        const e = this._plugins;
                        for (let t = 0; t < e.length; t++) {
                            const n = e[t];
                            if (n.supports(l)) return this._eventNameToPlugin.set(l, n), n
                        }
                        throw new Error(`No event manager plugin found for event ${l}`)
                    }
                }
                class rc {
                    constructor(l) {
                        this._doc = l
                    }
                    addGlobalEventListener(l, n, e) {
                        const t = qo().getGlobalEventTarget(this._doc, l);
                        if (!t) throw new Error(`Unsupported event target ${t} for event ${n}`);
                        return this.addEventListener(t, n, e)
                    }
                }
                class ac {
                    constructor() {
                        this._stylesSet = new Set
                    }
                    addStyles(l) {
                        const n = new Set;
                        l.forEach(l => {
                            this._stylesSet.has(l) || (this._stylesSet.add(l), n.add(l))
                        }), this.onStylesAdded(n)
                    }
                    onStylesAdded(l) {}
                    getAllStyles() {
                        return Array.from(this._stylesSet)
                    }
                }
                class oc extends ac {
                    constructor(l) {
                        super(), this._doc = l, this._hostNodes = new Set, this._styleNodes = new Set, this._hostNodes.add(l.head)
                    }
                    _addStylesToHost(l, n) {
                        l.forEach(l => {
                            const e = this._doc.createElement("style");
                            e.textContent = l, this._styleNodes.add(n.appendChild(e))
                        })
                    }
                    addHost(l) {
                        this._addStylesToHost(this._stylesSet, l), this._hostNodes.add(l)
                    }
                    removeHost(l) {
                        this._hostNodes.delete(l)
                    }
                    onStylesAdded(l) {
                        this._hostNodes.forEach(n => this._addStylesToHost(l, n))
                    }
                    ngOnDestroy() {
                        this._styleNodes.forEach(l => qo().remove(l))
                    }
                }
                const cc = {
                        svg: "http://www.w3.org/2000/svg",
                        xhtml: "http://www.w3.org/1999/xhtml",
                        xlink: "http://www.w3.org/1999/xlink",
                        xml: "http://www.w3.org/XML/1998/namespace",
                        xmlns: "http://www.w3.org/2000/xmlns/"
                    },
                    dc = /%COMP%/g,
                    hc = "_nghost-%COMP%",
                    pc = "_ngcontent-%COMP%";

                function fc(l, n, e) {
                    for (let t = 0; t < n.length; t++) {
                        let i = n[t];
                        Array.isArray(i) ? fc(l, i, e) : (i = i.replace(dc, l), e.push(i))
                    }
                    return e
                }

                function gc(l) {
                    return n => {
                        !1 === l(n) && (n.preventDefault(), n.returnValue = !1)
                    }
                }
                class mc {
                    constructor(l, n, e) {
                        this.eventManager = l, this.sharedStylesHost = n, this.appId = e, this.rendererByCompId = new Map, this.defaultRenderer = new yc(l)
                    }
                    createRenderer(l, n) {
                        if (!l || !n) return this.defaultRenderer;
                        switch (n.encapsulation) {
                            case Zl.Emulated:
                                {
                                    let e = this.rendererByCompId.get(n.id);
                                    return e || (e = new _c(this.eventManager, this.sharedStylesHost, n, this.appId), this.rendererByCompId.set(n.id, e)),
                                    e.applyToHost(l),
                                    e
                                }
                            case Zl.Native:
                            case Zl.ShadowDom:
                                return new wc(this.eventManager, this.sharedStylesHost, l, n);
                            default:
                                if (!this.rendererByCompId.has(n.id)) {
                                    const l = fc(n.id, n.styles, []);
                                    this.sharedStylesHost.addStyles(l), this.rendererByCompId.set(n.id, this.defaultRenderer)
                                }
                                return this.defaultRenderer
                        }
                    }
                    begin() {}
                    end() {}
                }
                class yc {
                    constructor(l) {
                        this.eventManager = l, this.data = Object.create(null)
                    }
                    destroy() {}
                    createElement(l, n) {
                        return n ? document.createElementNS(cc[n] || n, l) : document.createElement(l)
                    }
                    createComment(l) {
                        return document.createComment(l)
                    }
                    createText(l) {
                        return document.createTextNode(l)
                    }
                    appendChild(l, n) {
                        l.appendChild(n)
                    }
                    insertBefore(l, n, e) {
                        l && l.insertBefore(n, e)
                    }
                    removeChild(l, n) {
                        l && l.removeChild(n)
                    }
                    selectRootElement(l, n) {
                        let e = "string" == typeof l ? document.querySelector(l) : l;
                        if (!e) throw new Error(`The selector "${l}" did not match any elements`);
                        return n || (e.textContent = ""), e
                    }
                    parentNode(l) {
                        return l.parentNode
                    }
                    nextSibling(l) {
                        return l.nextSibling
                    }
                    setAttribute(l, n, e, t) {
                        if (t) {
                            n = t + ":" + n;
                            const i = cc[t];
                            i ? l.setAttributeNS(i, n, e) : l.setAttribute(n, e)
                        } else l.setAttribute(n, e)
                    }
                    removeAttribute(l, n, e) {
                        if (e) {
                            const t = cc[e];
                            t ? l.removeAttributeNS(t, n) : l.removeAttribute(`${e}:${n}`)
                        } else l.removeAttribute(n)
                    }
                    addClass(l, n) {
                        l.classList.add(n)
                    }
                    removeClass(l, n) {
                        l.classList.remove(n)
                    }
                    setStyle(l, n, e, t) {
                        t & ve.DashCase ? l.style.setProperty(n, e, t & ve.Important ? "important" : "") : l.style[n] = e
                    }
                    removeStyle(l, n, e) {
                        e & ve.DashCase ? l.style.removeProperty(n) : l.style[n] = ""
                    }
                    setProperty(l, n, e) {
                        bc(n, "property"), l[n] = e
                    }
                    setValue(l, n) {
                        l.nodeValue = n
                    }
                    listen(l, n, e) {
                        return bc(n, "listener"), "string" == typeof l ? this.eventManager.addGlobalEventListener(l, n, gc(e)) : this.eventManager.addEventListener(l, n, gc(e))
                    }
                }
                const vc = (() => "@".charCodeAt(0))();

                function bc(l, n) {
                    if (l.charCodeAt(0) === vc) throw new Error(`Found the synthetic ${n} ${l}. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.`)
                }
                class _c extends yc {
                    constructor(l, n, e, t) {
                        super(l), this.component = e;
                        const i = fc(t + "-" + e.id, e.styles, []);
                        n.addStyles(i), this.contentAttr = pc.replace(dc, t + "-" + e.id), this.hostAttr = hc.replace(dc, t + "-" + e.id)
                    }
                    applyToHost(l) {
                        super.setAttribute(l, this.hostAttr, "")
                    }
                    createElement(l, n) {
                        const e = super.createElement(l, n);
                        return super.setAttribute(e, this.contentAttr, ""), e
                    }
                }
                class wc extends yc {
                    constructor(l, n, e, t) {
                        super(l), this.sharedStylesHost = n, this.hostEl = e, this.component = t, this.shadowRoot = t.encapsulation === Zl.ShadowDom ? e.attachShadow({
                            mode: "open"
                        }) : e.createShadowRoot(), this.sharedStylesHost.addHost(this.shadowRoot);
                        const i = fc(t.id, t.styles, []);
                        for (let s = 0; s < i.length; s++) {
                            const l = document.createElement("style");
                            l.textContent = i[s], this.shadowRoot.appendChild(l)
                        }
                    }
                    nodeOrShadowRoot(l) {
                        return l === this.hostEl ? this.shadowRoot : l
                    }
                    destroy() {
                        this.sharedStylesHost.removeHost(this.shadowRoot)
                    }
                    appendChild(l, n) {
                        return super.appendChild(this.nodeOrShadowRoot(l), n)
                    }
                    insertBefore(l, n, e) {
                        return super.insertBefore(this.nodeOrShadowRoot(l), n, e)
                    }
                    removeChild(l, n) {
                        return super.removeChild(this.nodeOrShadowRoot(l), n)
                    }
                    parentNode(l) {
                        return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(l)))
                    }
                }
                const xc = (() => "undefined" != typeof Zone && Zone.__symbol__ || function (l) {
                        return "__zone_symbol__" + l
                    })(),
                    kc = xc("addEventListener"),
                    Sc = xc("removeEventListener"),
                    Cc = {},
                    Ic = "FALSE",
                    Tc = "ANGULAR",
                    Ec = "addEventListener",
                    Ac = "removeEventListener",
                    Pc = "__zone_symbol__propagationStopped",
                    Dc = "__zone_symbol__stopImmediatePropagation",
                    Mc = (() => {
                        const l = "undefined" != typeof Zone && Zone[xc("BLACK_LISTED_EVENTS")];
                        if (l) {
                            const n = {};
                            return l.forEach(l => {
                                n[l] = l
                            }), n
                        }
                    })(),
                    Oc = function (l) {
                        return !!Mc && Mc.hasOwnProperty(l)
                    },
                    Nc = function (l) {
                        const n = Cc[l.type];
                        if (!n) return;
                        const e = this[n];
                        if (!e) return;
                        const t = [l];
                        if (1 === e.length) {
                            const l = e[0];
                            return l.zone !== Zone.current ? l.zone.run(l.handler, this, t) : l.handler.apply(this, t)
                        } {
                            const n = e.slice();
                            for (let e = 0; e < n.length && !0 !== l[Pc]; e++) {
                                const l = n[e];
                                l.zone !== Zone.current ? l.zone.run(l.handler, this, t) : l.handler.apply(this, t)
                            }
                        }
                    };
                class Rc extends rc {
                    constructor(l, n, e) {
                        super(l), this.ngZone = n, e && function (l) {
                            return l === Ha
                        }(e) || this.patchEvent()
                    }
                    patchEvent() {
                        if ("undefined" == typeof Event || !Event || !Event.prototype) return;
                        if (Event.prototype[Dc]) return;
                        const l = Event.prototype[Dc] = Event.prototype.stopImmediatePropagation;
                        Event.prototype.stopImmediatePropagation = function () {
                            this && (this[Pc] = !0), l && l.apply(this, arguments)
                        }
                    }
                    supports(l) {
                        return !0
                    }
                    addEventListener(l, n, e) {
                        let t = e;
                        if (!l[kc] || ys.isInAngularZone() && !Oc(n)) l[Ec](n, t, !1);
                        else {
                            let e = Cc[n];
                            e || (e = Cc[n] = xc(Tc + n + Ic));
                            let i = l[e];
                            const s = i && i.length > 0;
                            i || (i = l[e] = []);
                            const u = Oc(n) ? Zone.root : Zone.current;
                            if (0 === i.length) i.push({
                                zone: u,
                                handler: t
                            });
                            else {
                                let l = !1;
                                for (let n = 0; n < i.length; n++)
                                    if (i[n].handler === t) {
                                        l = !0;
                                        break
                                    } l || i.push({
                                    zone: u,
                                    handler: t
                                })
                            }
                            s || l[kc](n, Nc, !1)
                        }
                        return () => this.removeEventListener(l, n, t)
                    }
                    removeEventListener(l, n, e) {
                        let t = l[Sc];
                        if (!t) return l[Ac].apply(l, [n, e, !1]);
                        let i = Cc[n],
                            s = i && l[i];
                        if (!s) return l[Ac].apply(l, [n, e, !1]);
                        let u = !1;
                        for (let r = 0; r < s.length; r++)
                            if (s[r].handler === e) {
                                u = !0, s.splice(r, 1);
                                break
                            } u ? 0 === s.length && t.apply(l, [n, Nc, !1]) : l[Ac].apply(l, [n, e, !1])
                    }
                }
                const Bc = {
                        pan: !0,
                        panstart: !0,
                        panmove: !0,
                        panend: !0,
                        pancancel: !0,
                        panleft: !0,
                        panright: !0,
                        panup: !0,
                        pandown: !0,
                        pinch: !0,
                        pinchstart: !0,
                        pinchmove: !0,
                        pinchend: !0,
                        pinchcancel: !0,
                        pinchin: !0,
                        pinchout: !0,
                        press: !0,
                        pressup: !0,
                        rotate: !0,
                        rotatestart: !0,
                        rotatemove: !0,
                        rotateend: !0,
                        rotatecancel: !0,
                        swipe: !0,
                        swipeleft: !0,
                        swiperight: !0,
                        swipeup: !0,
                        swipedown: !0,
                        tap: !0
                    },
                    zc = new El("HammerGestureConfig"),
                    $c = new El("HammerLoader");
                class Lc {
                    constructor() {
                        this.events = [], this.overrides = {}
                    }
                    buildHammer(l) {
                        const n = new Hammer(l, this.options);
                        n.get("pinch").set({
                            enable: !0
                        }), n.get("rotate").set({
                            enable: !0
                        });
                        for (const e in this.overrides) n.get(e).set(this.overrides[e]);
                        return n
                    }
                }
                class Fc extends rc {
                    constructor(l, n, e, t) {
                        super(l), this._config = n, this.console = e, this.loader = t
                    }
                    supports(l) {
                        return !(!Bc.hasOwnProperty(l.toLowerCase()) && !this.isCustomEvent(l) || !window.Hammer && !this.loader && (this.console.warn(`The "${l}" event cannot be bound because Hammer.JS is not ` + "loaded and no custom loader has been specified."), 1))
                    }
                    addEventListener(l, n, e) {
                        const t = this.manager.getZone();
                        if (n = n.toLowerCase(), !window.Hammer && this.loader) {
                            let t = !1,
                                i = () => {
                                    t = !0
                                };
                            return this.loader().then(() => {
                                if (!window.Hammer) return this.console.warn("The custom HAMMER_LOADER completed, but Hammer.JS is not present."), void(i = () => {});
                                t || (i = this.addEventListener(l, n, e))
                            }).catch(() => {
                                this.console.warn(`The "${n}" event cannot be bound because the custom ` + "Hammer.JS loader failed."), i = () => {}
                            }), () => {
                                i()
                            }
                        }
                        return t.runOutsideAngular(() => {
                            const i = this._config.buildHammer(l),
                                s = function (l) {
                                    t.runGuarded((function () {
                                        e(l)
                                    }))
                                };
                            return i.on(n, s), () => {
                                i.off(n, s), "function" == typeof i.destroy && i.destroy()
                            }
                        })
                    }
                    isCustomEvent(l) {
                        return this._config.events.indexOf(l) > -1
                    }
                }
                const qc = ["alt", "control", "meta", "shift"],
                    Uc = {
                        alt: l => l.altKey,
                        control: l => l.ctrlKey,
                        meta: l => l.metaKey,
                        shift: l => l.shiftKey
                    };
                class Hc extends rc {
                    constructor(l) {
                        super(l)
                    }
                    supports(l) {
                        return null != Hc.parseEventName(l)
                    }
                    addEventListener(l, n, e) {
                        const t = Hc.parseEventName(n),
                            i = Hc.eventCallback(t.fullKey, e, this.manager.getZone());
                        return this.manager.getZone().runOutsideAngular(() => qo().onAndCancel(l, t.domEventName, i))
                    }
                    static parseEventName(l) {
                        const n = l.toLowerCase().split("."),
                            e = n.shift();
                        if (0 === n.length || "keydown" !== e && "keyup" !== e) return null;
                        const t = Hc._normalizeKey(n.pop());
                        let i = "";
                        if (qc.forEach(l => {
                                const e = n.indexOf(l);
                                e > -1 && (n.splice(e, 1), i += l + ".")
                            }), i += t, 0 != n.length || 0 === t.length) return null;
                        const s = {};
                        return s.domEventName = e, s.fullKey = i, s
                    }
                    static getEventFullKey(l) {
                        let n = "",
                            e = qo().getEventKey(l);
                        return " " === (e = e.toLowerCase()) ? e = "space" : "." === e && (e = "dot"), qc.forEach(t => {
                            t != e && (0, Uc[t])(l) && (n += t + ".")
                        }), n += e
                    }
                    static eventCallback(l, n, e) {
                        return t => {
                            Hc.getEventFullKey(t) === l && e.runGuarded(() => n(t))
                        }
                    }
                    static _normalizeKey(l) {
                        switch (l) {
                            case "esc":
                                return "escape";
                            default:
                                return l
                        }
                    }
                }
                class Vc {}
                class jc extends Vc {
                    constructor(l) {
                        super(), this._doc = l
                    }
                    sanitize(l, n) {
                        if (null == n) return null;
                        switch (l) {
                            case An.NONE:
                                return n;
                            case An.HTML:
                                return n instanceof Wc ? n.changingThisBreaksApplicationSecurity : (this.checkNotSafeValue(n, "HTML"), function (l, n) {
                                    let e = null;
                                    try {
                                        Tn = Tn || new an(l);
                                        let t = n ? String(n) : "";
                                        e = Tn.getInertBodyElement(t);
                                        let i = 5,
                                            s = t;
                                        do {
                                            if (0 === i) throw new Error("Failed to sanitize html because the input is unstable");
                                            i--, t = s, s = e.innerHTML, e = Tn.getInertBodyElement(t)
                                        } while (t !== s);
                                        const u = new kn,
                                            r = u.sanitizeChildren(En(e) || e);
                                        return rn() && u.sanitizedSomething && console.warn("WARNING: sanitizing HTML stripped some content, see http://g.co/ng/security#xss"), r
                                    } finally {
                                        if (e) {
                                            const l = En(e) || e;
                                            for (; l.firstChild;) l.removeChild(l.firstChild)
                                        }
                                    }
                                }(this._doc, String(n)));
                            case An.STYLE:
                                return n instanceof Kc ? n.changingThisBreaksApplicationSecurity : (this.checkNotSafeValue(n, "Style"), function (l) {
                                    if (!(l = String(l).trim())) return "";
                                    const n = l.match(Mn);
                                    return n && dn(n[1]) === n[1] || l.match(Dn) && function (l) {
                                        let n = !0,
                                            e = !0;
                                        for (let t = 0; t < l.length; t++) {
                                            const i = l.charAt(t);
                                            "'" === i && e ? n = !n : '"' === i && n && (e = !e)
                                        }
                                        return n && e
                                    }(l) ? l : (rn() && console.warn(`WARNING: sanitizing unsafe style value ${l} (see http://g.co/ng/security#xss).`), "unsafe")
                                }(n));
                            case An.SCRIPT:
                                if (n instanceof Zc) return n.changingThisBreaksApplicationSecurity;
                                throw this.checkNotSafeValue(n, "Script"), new Error("unsafe value used in a script context");
                            case An.URL:
                                return n instanceof Yc || n instanceof Qc ? n.changingThisBreaksApplicationSecurity : (this.checkNotSafeValue(n, "URL"), dn(String(n)));
                            case An.RESOURCE_URL:
                                if (n instanceof Yc) return n.changingThisBreaksApplicationSecurity;
                                throw this.checkNotSafeValue(n, "ResourceURL"), new Error("unsafe value used in a resource URL context (see http://g.co/ng/security#xss)");
                            default:
                                throw new Error(`Unexpected SecurityContext ${l} (see http://g.co/ng/security#xss)`)
                        }
                    }
                    checkNotSafeValue(l, n) {
                        if (l instanceof Gc) throw new Error(`Required a safe ${n}, got a ${l.getTypeName()} ` + "(see http://g.co/ng/security#xss)")
                    }
                    bypassSecurityTrustHtml(l) {
                        return new Wc(l)
                    }
                    bypassSecurityTrustStyle(l) {
                        return new Kc(l)
                    }
                    bypassSecurityTrustScript(l) {
                        return new Zc(l)
                    }
                    bypassSecurityTrustUrl(l) {
                        return new Qc(l)
                    }
                    bypassSecurityTrustResourceUrl(l) {
                        return new Yc(l)
                    }
                }
                class Gc {
                    constructor(l) {
                        this.changingThisBreaksApplicationSecurity = l
                    }
                    toString() {
                        return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}` + " (see http://g.co/ng/security#xss)"
                    }
                }
                class Wc extends Gc {
                    getTypeName() {
                        return "HTML"
                    }
                }
                class Kc extends Gc {
                    getTypeName() {
                        return "Style"
                    }
                }
                class Zc extends Gc {
                    getTypeName() {
                        return "Script"
                    }
                }
                class Qc extends Gc {
                    getTypeName() {
                        return "URL"
                    }
                }
                class Yc extends Gc {
                    getTypeName() {
                        return "ResourceURL"
                    }
                }
                const Xc = Os(Xs, "browser", [{
                    provide: Qi,
                    useValue: "browser"
                }, {
                    provide: Zi,
                    useValue: function () {
                        Zo.makeCurrent(), nc.init()
                    },
                    multi: !0
                }, {
                    provide: Or,
                    useClass: class extends Or {
                        constructor(l) {
                            super(), this._doc = l, this._init()
                        }
                        _init() {
                            this.location = qo().getLocation(), this._history = qo().getHistory()
                        }
                        getBaseHrefFromDOM() {
                            return qo().getBaseHref(this._doc)
                        }
                        onPopState(l) {
                            qo().getGlobalEventTarget(this._doc, "window").addEventListener("popstate", l, !1)
                        }
                        onHashChange(l) {
                            qo().getGlobalEventTarget(this._doc, "window").addEventListener("hashchange", l, !1)
                        }
                        get href() {
                            return this.location.href
                        }
                        get protocol() {
                            return this.location.protocol
                        }
                        get hostname() {
                            return this.location.hostname
                        }
                        get port() {
                            return this.location.port
                        }
                        get pathname() {
                            return this.location.pathname
                        }
                        get search() {
                            return this.location.search
                        }
                        get hash() {
                            return this.location.hash
                        }
                        set pathname(l) {
                            this.location.pathname = l
                        }
                        pushState(l, n, e) {
                            Xo() ? this._history.pushState(l, n, e) : this.location.hash = e
                        }
                        replaceState(l, n, e) {
                            Xo() ? this._history.replaceState(l, n, e) : this.location.hash = e
                        }
                        forward() {
                            this._history.forward()
                        }
                        back() {
                            this._history.back()
                        }
                        getState() {
                            return this._history.state
                        }
                    },
                    deps: [Ua]
                }, {
                    provide: Ua,
                    useFactory: function () {
                        return document
                    },
                    deps: []
                }]);

                function Jc() {
                    return new tn
                }
                class ld {
                    constructor(l) {
                        if (l) throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.")
                    }
                    static withServerTransition(l) {
                        return {
                            ngModule: ld,
                            providers: [{
                                provide: Gi,
                                useValue: l.appId
                            }, {
                                provide: Jo,
                                useExisting: Gi
                            }, lc]
                        }
                    }
                }
                "undefined" != typeof window && window;
                class nd {
                    constructor(l, n) {
                        this.id = l, this.url = n
                    }
                }
                class ed extends nd {
                    constructor(l, n, e = "imperative", t = null) {
                        super(l, n), this.navigationTrigger = e, this.restoredState = t
                    }
                    toString() {
                        return `NavigationStart(id: ${this.id}, url: '${this.url}')`
                    }
                }
                class td extends nd {
                    constructor(l, n, e) {
                        super(l, n), this.urlAfterRedirects = e
                    }
                    toString() {
                        return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
                    }
                }
                class id extends nd {
                    constructor(l, n, e) {
                        super(l, n), this.reason = e
                    }
                    toString() {
                        return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
                    }
                }
                class sd extends nd {
                    constructor(l, n, e) {
                        super(l, n), this.error = e
                    }
                    toString() {
                        return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
                    }
                }
                class ud extends nd {
                    constructor(l, n, e, t) {
                        super(l, n), this.urlAfterRedirects = e, this.state = t
                    }
                    toString() {
                        return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                    }
                }
                class rd extends nd {
                    constructor(l, n, e, t) {
                        super(l, n), this.urlAfterRedirects = e, this.state = t
                    }
                    toString() {
                        return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                    }
                }
                class ad extends nd {
                    constructor(l, n, e, t, i) {
                        super(l, n), this.urlAfterRedirects = e, this.state = t, this.shouldActivate = i
                    }
                    toString() {
                        return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
                    }
                }
                class od extends nd {
                    constructor(l, n, e, t) {
                        super(l, n), this.urlAfterRedirects = e, this.state = t
                    }
                    toString() {
                        return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                    }
                }
                class cd extends nd {
                    constructor(l, n, e, t) {
                        super(l, n), this.urlAfterRedirects = e, this.state = t
                    }
                    toString() {
                        return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                    }
                }
                class dd {
                    constructor(l) {
                        this.route = l
                    }
                    toString() {
                        return `RouteConfigLoadStart(path: ${this.route.path})`
                    }
                }
                class hd {
                    constructor(l) {
                        this.route = l
                    }
                    toString() {
                        return `RouteConfigLoadEnd(path: ${this.route.path})`
                    }
                }
                class pd {
                    constructor(l) {
                        this.snapshot = l
                    }
                    toString() {
                        return `ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                    }
                }
                class fd {
                    constructor(l) {
                        this.snapshot = l
                    }
                    toString() {
                        return `ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                    }
                }
                class gd {
                    constructor(l) {
                        this.snapshot = l
                    }
                    toString() {
                        return `ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                    }
                }
                class md {
                    constructor(l) {
                        this.snapshot = l
                    }
                    toString() {
                        return `ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                    }
                }
                class yd {
                    constructor(l, n, e) {
                        this.routerEvent = l, this.position = n, this.anchor = e
                    }
                    toString() {
                        return `Scroll(anchor: '${this.anchor}', position: '${this.position?`${this.position[0]}, ${this.position[1]}`:null}')`
                    }
                }
                class vd {}
                const bd = "primary";
                class _d {
                    constructor(l) {
                        this.params = l || {}
                    }
                    has(l) {
                        return this.params.hasOwnProperty(l)
                    }
                    get(l) {
                        if (this.has(l)) {
                            const n = this.params[l];
                            return Array.isArray(n) ? n[0] : n
                        }
                        return null
                    }
                    getAll(l) {
                        if (this.has(l)) {
                            const n = this.params[l];
                            return Array.isArray(n) ? n : [n]
                        }
                        return []
                    }
                    get keys() {
                        return Object.keys(this.params)
                    }
                }

                function wd(l) {
                    return new _d(l)
                }
                const xd = "ngNavigationCancelingError";

                function kd(l) {
                    const n = Error("NavigationCancelingError: " + l);
                    return n[xd] = !0, n
                }

                function Sd(l, n, e) {
                    const t = e.path.split("/");
                    if (t.length > l.length) return null;
                    if ("full" === e.pathMatch && (n.hasChildren() || t.length < l.length)) return null;
                    const i = {};
                    for (let s = 0; s < t.length; s++) {
                        const n = t[s],
                            e = l[s];
                        if (n.startsWith(":")) i[n.substring(1)] = e;
                        else if (n !== e.path) return null
                    }
                    return {
                        consumed: l.slice(0, t.length),
                        posParams: i
                    }
                }
                class Cd {
                    constructor(l, n) {
                        this.routes = l, this.module = n
                    }
                }

                function Id(l, n = "") {
                    for (let e = 0; e < l.length; e++) {
                        const t = l[e];
                        Td(t, Ed(n, t))
                    }
                }

                function Td(l, n) {
                    if (!l) throw new Error(`\n      Invalid configuration of route '${n}': Encountered undefined route.\n      The reason might be an extra comma.\n\n      Example:\n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    `);
                    if (Array.isArray(l)) throw new Error(`Invalid configuration of route '${n}': Array cannot be specified`);
                    if (!l.component && !l.children && !l.loadChildren && l.outlet && l.outlet !== bd) throw new Error(`Invalid configuration of route '${n}': a componentless route without children or loadChildren cannot have a named outlet set`);
                    if (l.redirectTo && l.children) throw new Error(`Invalid configuration of route '${n}': redirectTo and children cannot be used together`);
                    if (l.redirectTo && l.loadChildren) throw new Error(`Invalid configuration of route '${n}': redirectTo and loadChildren cannot be used together`);
                    if (l.children && l.loadChildren) throw new Error(`Invalid configuration of route '${n}': children and loadChildren cannot be used together`);
                    if (l.redirectTo && l.component) throw new Error(`Invalid configuration of route '${n}': redirectTo and component cannot be used together`);
                    if (l.path && l.matcher) throw new Error(`Invalid configuration of route '${n}': path and matcher cannot be used together`);
                    if (void 0 === l.redirectTo && !l.component && !l.children && !l.loadChildren) throw new Error(`Invalid configuration of route '${n}'. One of the following must be provided: component, redirectTo, children or loadChildren`);
                    if (void 0 === l.path && void 0 === l.matcher) throw new Error(`Invalid configuration of route '${n}': routes must have either a path or a matcher specified`);
                    if ("string" == typeof l.path && "/" === l.path.charAt(0)) throw new Error(`Invalid configuration of route '${n}': path cannot start with a slash`);
                    if ("" === l.path && void 0 !== l.redirectTo && void 0 === l.pathMatch) throw new Error(`Invalid configuration of route '{path: "${n}", redirectTo: "${l.redirectTo}"}': please provide 'pathMatch'. The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`);
                    if (void 0 !== l.pathMatch && "full" !== l.pathMatch && "prefix" !== l.pathMatch) throw new Error(`Invalid configuration of route '${n}': pathMatch can only be set to 'prefix' or 'full'`);
                    l.children && Id(l.children, n)
                }

                function Ed(l, n) {
                    return n ? l || n.path ? l && !n.path ? `${l}/` : !l && n.path ? n.path : `${l}/${n.path}` : "" : l
                }

                function Ad(l) {
                    const n = l.children && l.children.map(Ad),
                        e = n ? Object.assign({}, l, {
                            children: n
                        }) : Object.assign({}, l);
                    return !e.component && (n || e.loadChildren) && e.outlet && e.outlet !== bd && (e.component = vd), e
                }

                function Pd(l, n) {
                    const e = Object.keys(l),
                        t = Object.keys(n);
                    if (!e || !t || e.length != t.length) return !1;
                    let i;
                    for (let s = 0; s < e.length; s++)
                        if (l[i = e[s]] !== n[i]) return !1;
                    return !0
                }

                function Dd(l) {
                    return Array.prototype.concat.apply([], l)
                }

                function Md(l) {
                    return l.length > 0 ? l[l.length - 1] : null
                }

                function Od(l, n) {
                    for (const e in l) l.hasOwnProperty(e) && n(l[e], e)
                }

                function Nd(l) {
                    return te(l) ? l : ee(l) ? G(Promise.resolve(l)) : Za(l)
                }

                function Rd(l, n, e) {
                    return e ? function (l, n) {
                        return Pd(l, n)
                    }(l.queryParams, n.queryParams) && function l(n, e) {
                        if (!Ld(n.segments, e.segments)) return !1;
                        if (n.numberOfChildren !== e.numberOfChildren) return !1;
                        for (const t in e.children) {
                            if (!n.children[t]) return !1;
                            if (!l(n.children[t], e.children[t])) return !1
                        }
                        return !0
                    }(l.root, n.root) : function (l, n) {
                        return Object.keys(n).length <= Object.keys(l).length && Object.keys(n).every(e => n[e] === l[e])
                    }(l.queryParams, n.queryParams) && function l(n, e) {
                        return function n(e, t, i) {
                            if (e.segments.length > i.length) return !!Ld(e.segments.slice(0, i.length), i) && !t.hasChildren();
                            if (e.segments.length === i.length) {
                                if (!Ld(e.segments, i)) return !1;
                                for (const n in t.children) {
                                    if (!e.children[n]) return !1;
                                    if (!l(e.children[n], t.children[n])) return !1
                                }
                                return !0
                            } {
                                const l = i.slice(0, e.segments.length),
                                    s = i.slice(e.segments.length);
                                return !!Ld(e.segments, l) && !!e.children[bd] && n(e.children[bd], t, s)
                            }
                        }(n, e, e.segments)
                    }(l.root, n.root)
                }
                class Bd {
                    constructor(l, n, e) {
                        this.root = l, this.queryParams = n, this.fragment = e
                    }
                    get queryParamMap() {
                        return this._queryParamMap || (this._queryParamMap = wd(this.queryParams)), this._queryParamMap
                    }
                    toString() {
                        return Hd.serialize(this)
                    }
                }
                class zd {
                    constructor(l, n) {
                        this.segments = l, this.children = n, this.parent = null, Od(n, (l, n) => l.parent = this)
                    }
                    hasChildren() {
                        return this.numberOfChildren > 0
                    }
                    get numberOfChildren() {
                        return Object.keys(this.children).length
                    }
                    toString() {
                        return Vd(this)
                    }
                }
                class $d {
                    constructor(l, n) {
                        this.path = l, this.parameters = n
                    }
                    get parameterMap() {
                        return this._parameterMap || (this._parameterMap = wd(this.parameters)), this._parameterMap
                    }
                    toString() {
                        return Qd(this)
                    }
                }

                function Ld(l, n) {
                    return l.length === n.length && l.every((l, e) => l.path === n[e].path)
                }

                function Fd(l, n) {
                    let e = [];
                    return Od(l.children, (l, t) => {
                        t === bd && (e = e.concat(n(l, t)))
                    }), Od(l.children, (l, t) => {
                        t !== bd && (e = e.concat(n(l, t)))
                    }), e
                }
                class qd {}
                class Ud {
                    parse(l) {
                        const n = new nh(l);
                        return new Bd(n.parseRootSegment(), n.parseQueryParams(), n.parseFragment())
                    }
                    serialize(l) {
                        var n;
                        return `${`/${function l(n,e){if(!n.hasChildren())return Vd(n);if(e){const e=n.children[bd]?l(n.children[bd],!1):"",t=[];return Od(n.children,(n,e)=>{e!==bd&&t.push(`${e}:${l(n,!1)}`)}),t.length>0?`${e}(${t.join("//")})`: e
                    } {
                        const e = Fd(n, (e, t) => t === bd ? [l(n.children[bd], !1)] : [`${t}:${l(e,!1)}`]);
                        return `${Vd(n)}/(${e.join("//")})`
                    }
                }(l.root, !0)
            }
            `}${function(l){const n=Object.keys(l).map(n=>{const e=l[n];return Array.isArray(e)?e.map(l=>`${Gd(n)}=${Gd(l)}`).join("&"):`${Gd(n)}=${Gd(e)}`});return n.length?` ? $ {
                n.join("&")
            }
            `:""}(l.queryParams)}${"string"==typeof l.fragment?`#${n=l.fragment,encodeURI(n)}`:""}`
        }
    }
    const Hd = new Ud;

    function Vd(l) {
        return l.segments.map(l => Qd(l)).join("/")
    }

    function jd(l) {
        return encodeURIComponent(l).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",")
    }

    function Gd(l) {
        return jd(l).replace(/%3B/gi, ";")
    }

    function Wd(l) {
        return jd(l).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&")
    }

    function Kd(l) {
        return decodeURIComponent(l)
    }

    function Zd(l) {
        return Kd(l.replace(/\+/g, "%20"))
    }

    function Qd(l) {
        return `${Wd(l.path)}${n=l.parameters,Object.keys(n).map(l=>`;${Wd(l)}=${Wd(n[l])}`).join("")}`;
        var n
    }
    const Yd = /^[^\/()?;=#]+/;

    function Xd(l) {
        const n = l.match(Yd);
        return n ? n[0] : ""
    }
    const Jd = /^[^=?&#]+/, lh = /^[^?&#]+/; class nh {
        constructor(l) {
            this.url = l, this.remaining = l
        }
        parseRootSegment() {
            return this.consumeOptional("/"), "" === this.remaining || this.peekStartsWith("?") || this.peekStartsWith("#") ? new zd([], {}) : new zd([], this.parseChildren())
        }
        parseQueryParams() {
            const l = {};
            if (this.consumeOptional("?"))
                do {
                    this.parseQueryParam(l)
                } while (this.consumeOptional("&"));
            return l
        }
        parseFragment() {
            return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null
        }
        parseChildren() {
            if ("" === this.remaining) return {};
            this.consumeOptional("/");
            const l = [];
            for (this.peekStartsWith("(") || l.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(");) this.capture("/"), l.push(this.parseSegment());
            let n = {};
            this.peekStartsWith("/(") && (this.capture("/"), n = this.parseParens(!0));
            let e = {};
            return this.peekStartsWith("(") && (e = this.parseParens(!1)), (l.length > 0 || Object.keys(n).length > 0) && (e[bd] = new zd(l, n)), e
        }
        parseSegment() {
            const l = Xd(this.remaining);
            if ("" === l && this.peekStartsWith(";")) throw new Error(`Empty path url segment cannot have parameters: '${this.remaining}'.`);
            return this.capture(l), new $d(Kd(l), this.parseMatrixParams())
        }
        parseMatrixParams() {
            const l = {};
            for (; this.consumeOptional(";");) this.parseParam(l);
            return l
        }
        parseParam(l) {
            const n = Xd(this.remaining);
            if (!n) return;
            this.capture(n);
            let e = "";
            if (this.consumeOptional("=")) {
                const l = Xd(this.remaining);
                l && this.capture(e = l)
            }
            l[Kd(n)] = Kd(e)
        }
        parseQueryParam(l) {
            const n = function (l) {
                const n = l.match(Jd);
                return n ? n[0] : ""
            }(this.remaining);
            if (!n) return;
            this.capture(n);
            let e = "";
            if (this.consumeOptional("=")) {
                const l = function (l) {
                    const n = l.match(lh);
                    return n ? n[0] : ""
                }(this.remaining);
                l && this.capture(e = l)
            }
            const t = Zd(n),
                i = Zd(e);
            if (l.hasOwnProperty(t)) {
                let n = l[t];
                Array.isArray(n) || (l[t] = n = [n]), n.push(i)
            } else l[t] = i
        }
        parseParens(l) {
            const n = {};
            for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0;) {
                const e = Xd(this.remaining),
                    t = this.remaining[e.length];
                if ("/" !== t && ")" !== t && ";" !== t) throw new Error(`Cannot parse url '${this.url}'`);
                let i = void 0;
                e.indexOf(":") > -1 ? (i = e.substr(0, e.indexOf(":")), this.capture(i), this.capture(":")) : l && (i = bd);
                const s = this.parseChildren();
                n[i] = 1 === Object.keys(s).length ? s[bd] : new zd([], s), this.consumeOptional("//")
            }
            return n
        }
        peekStartsWith(l) {
            return this.remaining.startsWith(l)
        }
        consumeOptional(l) {
            return !!this.peekStartsWith(l) && (this.remaining = this.remaining.substring(l.length), !0)
        }
        capture(l) {
            if (!this.consumeOptional(l)) throw new Error(`Expected "${l}".`)
        }
    }
    class eh {
        constructor(l) {
            this._root = l
        }
        get root() {
            return this._root.value
        }
        parent(l) {
            const n = this.pathFromRoot(l);
            return n.length > 1 ? n[n.length - 2] : null
        }
        children(l) {
            const n = th(l, this._root);
            return n ? n.children.map(l => l.value) : []
        }
        firstChild(l) {
            const n = th(l, this._root);
            return n && n.children.length > 0 ? n.children[0].value : null
        }
        siblings(l) {
            const n = ih(l, this._root);
            return n.length < 2 ? [] : n[n.length - 2].children.map(l => l.value).filter(n => n !== l)
        }
        pathFromRoot(l) {
            return ih(l, this._root).map(l => l.value)
        }
    }

    function th(l, n) {
        if (l === n.value) return n;
        for (const e of n.children) {
            const n = th(l, e);
            if (n) return n
        }
        return null
    }

    function ih(l, n) {
        if (l === n.value) return [n];
        for (const e of n.children) {
            const t = ih(l, e);
            if (t.length) return t.unshift(n), t
        }
        return []
    }
    class sh {
        constructor(l, n) {
            this.value = l, this.children = n
        }
        toString() {
            return `TreeNode(${this.value})`
        }
    }

    function uh(l) {
        const n = {};
        return l && l.children.forEach(l => n[l.value.outlet] = l), n
    }
    class rh extends eh {
        constructor(l, n) {
            super(l), this.snapshot = n, ph(this, l)
        }
        toString() {
            return this.snapshot.toString()
        }
    }

    function ah(l, n) {
        const e = function (l, n) {
                const e = new dh([], {}, {}, "", {}, bd, n, null, l.root, -1, {});
                return new hh("", new sh(e, []))
            }(l, n),
            t = new Qa([new $d("", {})]),
            i = new Qa({}),
            s = new Qa({}),
            u = new Qa({}),
            r = new Qa(""),
            a = new oh(t, i, u, r, s, bd, n, e.root);
        return a.snapshot = e.root, new rh(new sh(a, []), e)
    }
    class oh {
        constructor(l, n, e, t, i, s, u, r) {
            this.url = l, this.params = n, this.queryParams = e, this.fragment = t, this.data = i, this.outlet = s, this.component = u, this._futureSnapshot = r
        }
        get routeConfig() {
            return this._futureSnapshot.routeConfig
        }
        get root() {
            return this._routerState.root
        }
        get parent() {
            return this._routerState.parent(this)
        }
        get firstChild() {
            return this._routerState.firstChild(this)
        }
        get children() {
            return this._routerState.children(this)
        }
        get pathFromRoot() {
            return this._routerState.pathFromRoot(this)
        }
        get paramMap() {
            return this._paramMap || (this._paramMap = this.params.pipe(U(l => wd(l)))), this._paramMap
        }
        get queryParamMap() {
            return this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(U(l => wd(l)))), this._queryParamMap
        }
        toString() {
            return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`
        }
    }

    function ch(l, n = "emptyOnly") {
        const e = l.pathFromRoot;
        let t = 0;
        if ("always" !== n)
            for (t = e.length - 1; t >= 1;) {
                const l = e[t],
                    n = e[t - 1];
                if (l.routeConfig && "" === l.routeConfig.path) t--;
                else {
                    if (n.component) break;
                    t--
                }
            }
        return function (l) {
            return l.reduce((l, n) => ({
                params: Object.assign({}, l.params, n.params),
                data: Object.assign({}, l.data, n.data),
                resolve: Object.assign({}, l.resolve, n._resolvedData)
            }), {
                params: {},
                data: {},
                resolve: {}
            })
        }(e.slice(t))
    }
    class dh {
        constructor(l, n, e, t, i, s, u, r, a, o, c) {
            this.url = l, this.params = n, this.queryParams = e, this.fragment = t, this.data = i, this.outlet = s, this.component = u, this.routeConfig = r, this._urlSegment = a, this._lastPathIndex = o, this._resolve = c
        }
        get root() {
            return this._routerState.root
        }
        get parent() {
            return this._routerState.parent(this)
        }
        get firstChild() {
            return this._routerState.firstChild(this)
        }
        get children() {
            return this._routerState.children(this)
        }
        get pathFromRoot() {
            return this._routerState.pathFromRoot(this)
        }
        get paramMap() {
            return this._paramMap || (this._paramMap = wd(this.params)), this._paramMap
        }
        get queryParamMap() {
            return this._queryParamMap || (this._queryParamMap = wd(this.queryParams)), this._queryParamMap
        }
        toString() {
            return `Route(url:'${this.url.map(l=>l.toString()).join("/")}', path:'${this.routeConfig?this.routeConfig.path:""}')`
        }
    }
    class hh extends eh {
        constructor(l, n) {
            super(n), this.url = l, ph(this, n)
        }
        toString() {
            return fh(this._root)
        }
    }

    function ph(l, n) {
        n.value._routerState = l, n.children.forEach(n => ph(l, n))
    }

    function fh(l) {
        const n = l.children.length > 0 ? ` { ${l.children.map(fh).join(", ")} } ` : "";
        return `${l.value}${n}`
    }

    function gh(l) {
        if (l.snapshot) {
            const n = l.snapshot,
                e = l._futureSnapshot;
            l.snapshot = e, Pd(n.queryParams, e.queryParams) || l.queryParams.next(e.queryParams), n.fragment !== e.fragment && l.fragment.next(e.fragment), Pd(n.params, e.params) || l.params.next(e.params),
                function (l, n) {
                    if (l.length !== n.length) return !1;
                    for (let e = 0; e < l.length; ++e)
                        if (!Pd(l[e], n[e])) return !1;
                    return !0
                }(n.url, e.url) || l.url.next(e.url), Pd(n.data, e.data) || l.data.next(e.data)
        } else l.snapshot = l._futureSnapshot, l.data.next(l._futureSnapshot.data)
    }

    function mh(l, n) {
        var e, t;
        return Pd(l.params, n.params) && Ld(e = l.url, t = n.url) && e.every((l, n) => Pd(l.parameters, t[n].parameters)) && !(!l.parent != !n.parent) && (!l.parent || mh(l.parent, n.parent))
    }

    function yh(l) {
        return "object" == typeof l && null != l && !l.outlets && !l.segmentPath
    }

    function vh(l, n, e, t, i) {
        let s = {};
        return t && Od(t, (l, n) => {
            s[n] = Array.isArray(l) ? l.map(l => `${l}`) : `${l}`
        }), new Bd(e.root === l ? n : function l(n, e, t) {
            const i = {};
            return Od(n.children, (n, s) => {
                i[s] = n === e ? t : l(n, e, t)
            }), new zd(n.segments, i)
        }(e.root, l, n), s, i)
    }
    class bh {
        constructor(l, n, e) {
            if (this.isAbsolute = l, this.numberOfDoubleDots = n, this.commands = e, l && e.length > 0 && yh(e[0])) throw new Error("Root segment cannot have matrix parameters");
            const t = e.find(l => "object" == typeof l && null != l && l.outlets);
            if (t && t !== Md(e)) throw new Error("{outlets:{}} has to be the last command")
        }
        toRoot() {
            return this.isAbsolute && 1 === this.commands.length && "/" == this.commands[0]
        }
    }
    class _h {
        constructor(l, n, e) {
            this.segmentGroup = l, this.processChildren = n, this.index = e
        }
    }

    function wh(l) {
        return "object" == typeof l && null != l && l.outlets ? l.outlets[bd] : `${l}`
    }

    function xh(l, n, e) {
        if (l || (l = new zd([], {})), 0 === l.segments.length && l.hasChildren()) return kh(l, n, e);
        const t = function (l, n, e) {
                let t = 0,
                    i = n;
                const s = {
                    match: !1,
                    pathIndex: 0,
                    commandIndex: 0
                };
                for (; i < l.segments.length;) {
                    if (t >= e.length) return s;
                    const n = l.segments[i],
                        u = wh(e[t]),
                        r = t < e.length - 1 ? e[t + 1] : null;
                    if (i > 0 && void 0 === u) break;
                    if (u && r && "object" == typeof r && void 0 === r.outlets) {
                        if (!Th(u, r, n)) return s;
                        t += 2
                    } else {
                        if (!Th(u, {}, n)) return s;
                        t++
                    }
                    i++
                }
                return {
                    match: !0,
                    pathIndex: i,
                    commandIndex: t
                }
            }(l, n, e),
            i = e.slice(t.commandIndex);
        if (t.match && t.pathIndex < l.segments.length) {
            const n = new zd(l.segments.slice(0, t.pathIndex), {});
            return n.children[bd] = new zd(l.segments.slice(t.pathIndex), l.children), kh(n, 0, i)
        }
        return t.match && 0 === i.length ? new zd(l.segments, {}) : t.match && !l.hasChildren() ? Sh(l, n, e) : t.match ? kh(l, 0, i) : Sh(l, n, e)
    }

    function kh(l, n, e) {
        if (0 === e.length) return new zd(l.segments, {}); {
            const t = function (l) {
                    return "object" != typeof l[0] ? {
                        [bd]: l
                    } : void 0 === l[0].outlets ? {
                        [bd]: l
                    } : l[0].outlets
                }(e),
                i = {};
            return Od(t, (e, t) => {
                null !== e && (i[t] = xh(l.children[t], n, e))
            }), Od(l.children, (l, n) => {
                void 0 === t[n] && (i[n] = l)
            }), new zd(l.segments, i)
        }
    }

    function Sh(l, n, e) {
        const t = l.segments.slice(0, n);
        let i = 0;
        for (; i < e.length;) {
            if ("object" == typeof e[i] && void 0 !== e[i].outlets) {
                const l = Ch(e[i].outlets);
                return new zd(t, l)
            }
            if (0 === i && yh(e[0])) {
                t.push(new $d(l.segments[n].path, e[0])), i++;
                continue
            }
            const s = wh(e[i]),
                u = i < e.length - 1 ? e[i + 1] : null;
            s && u && yh(u) ? (t.push(new $d(s, Ih(u))), i += 2) : (t.push(new $d(s, {})), i++)
        }
        return new zd(t, {})
    }

    function Ch(l) {
        const n = {};
        return Od(l, (l, e) => {
            null !== l && (n[e] = Sh(new zd([], {}), 0, l))
        }), n
    }

    function Ih(l) {
        const n = {};
        return Od(l, (l, e) => n[e] = `${l}`), n
    }

    function Th(l, n, e) {
        return l == e.path && Pd(n, e.parameters)
    }
    const Eh = (l, n, e) => U(t => (new Ah(n, t.targetRouterState, t.currentRouterState, e).activate(l), t)); class Ah {
        constructor(l, n, e, t) {
            this.routeReuseStrategy = l, this.futureState = n, this.currState = e, this.forwardEvent = t
        }
        activate(l) {
            const n = this.futureState._root,
                e = this.currState ? this.currState._root : null;
            this.deactivateChildRoutes(n, e, l), gh(this.futureState.root), this.activateChildRoutes(n, e, l)
        }
        deactivateChildRoutes(l, n, e) {
            const t = uh(n);
            l.children.forEach(l => {
                const n = l.value.outlet;
                this.deactivateRoutes(l, t[n], e), delete t[n]
            }), Od(t, (l, n) => {
                this.deactivateRouteAndItsChildren(l, e)
            })
        }
        deactivateRoutes(l, n, e) {
            const t = l.value,
                i = n ? n.value : null;
            if (t === i)
                if (t.component) {
                    const i = e.getContext(t.outlet);
                    i && this.deactivateChildRoutes(l, n, i.children)
                } else this.deactivateChildRoutes(l, n, e);
            else i && this.deactivateRouteAndItsChildren(n, e)
        }
        deactivateRouteAndItsChildren(l, n) {
            this.routeReuseStrategy.shouldDetach(l.value.snapshot) ? this.detachAndStoreRouteSubtree(l, n) : this.deactivateRouteAndOutlet(l, n)
        }
        detachAndStoreRouteSubtree(l, n) {
            const e = n.getContext(l.value.outlet);
            if (e && e.outlet) {
                const n = e.outlet.detach(),
                    t = e.children.onOutletDeactivated();
                this.routeReuseStrategy.store(l.value.snapshot, {
                    componentRef: n,
                    route: l,
                    contexts: t
                })
            }
        }
        deactivateRouteAndOutlet(l, n) {
            const e = n.getContext(l.value.outlet);
            if (e) {
                const t = uh(l),
                    i = l.value.component ? e.children : n;
                Od(t, (l, n) => this.deactivateRouteAndItsChildren(l, i)), e.outlet && (e.outlet.deactivate(), e.children.onOutletDeactivated())
            }
        }
        activateChildRoutes(l, n, e) {
            const t = uh(n);
            l.children.forEach(l => {
                this.activateRoutes(l, t[l.value.outlet], e), this.forwardEvent(new md(l.value.snapshot))
            }), l.children.length && this.forwardEvent(new fd(l.value.snapshot))
        }
        activateRoutes(l, n, e) {
            const t = l.value,
                i = n ? n.value : null;
            if (gh(t), t === i)
                if (t.component) {
                    const i = e.getOrCreateContext(t.outlet);
                    this.activateChildRoutes(l, n, i.children)
                } else this.activateChildRoutes(l, n, e);
            else if (t.component) {
                const n = e.getOrCreateContext(t.outlet);
                if (this.routeReuseStrategy.shouldAttach(t.snapshot)) {
                    const l = this.routeReuseStrategy.retrieve(t.snapshot);
                    this.routeReuseStrategy.store(t.snapshot, null), n.children.onOutletReAttached(l.contexts), n.attachRef = l.componentRef, n.route = l.route.value, n.outlet && n.outlet.attach(l.componentRef, l.route.value), Ph(l.route)
                } else {
                    const e = function (l) {
                            for (let n = l.parent; n; n = n.parent) {
                                const l = n.routeConfig;
                                if (l && l._loadedConfig) return l._loadedConfig;
                                if (l && l.component) return null
                            }
                            return null
                        }(t.snapshot),
                        i = e ? e.module.componentFactoryResolver : null;
                    n.attachRef = null, n.route = t, n.resolver = i, n.outlet && n.outlet.activateWith(t, i), this.activateChildRoutes(l, null, n.children)
                }
            } else this.activateChildRoutes(l, null, e)
        }
    }

    function Ph(l) {
        gh(l.value), l.children.forEach(Ph)
    }

    function Dh(l) {
        return "function" == typeof l
    }

    function Mh(l) {
        return l instanceof Bd
    }
    class Oh {
        constructor(l) {
            this.segmentGroup = l || null
        }
    }
    class Nh {
        constructor(l) {
            this.urlTree = l
        }
    }

    function Rh(l) {
        return new w(n => n.error(new Oh(l)))
    }

    function Bh(l) {
        return new w(n => n.error(new Nh(l)))
    }

    function zh(l) {
        return new w(n => n.error(new Error(`Only absolute redirects can have named outlets. redirectTo: '${l}'`)))
    }
    class $h {
        constructor(l, n, e, t, i) {
            this.configLoader = n, this.urlSerializer = e, this.urlTree = t, this.config = i, this.allowRedirects = !0, this.ngModule = l.get(jl)
        }
        apply() {
            return this.expandSegmentGroup(this.ngModule, this.config, this.urlTree.root, bd).pipe(U(l => this.createUrlTree(l, this.urlTree.queryParams, this.urlTree.fragment))).pipe(xo(l => {
                if (l instanceof Nh) return this.allowRedirects = !1, this.match(l.urlTree);
                if (l instanceof Oh) throw this.noMatchError(l);
                throw l
            }))
        }
        match(l) {
            return this.expandSegmentGroup(this.ngModule, this.config, l.root, bd).pipe(U(n => this.createUrlTree(n, l.queryParams, l.fragment))).pipe(xo(l => {
                if (l instanceof Oh) throw this.noMatchError(l);
                throw l
            }))
        }
        noMatchError(l) {
            return new Error(`Cannot match any routes. URL Segment: '${l.segmentGroup}'`)
        }
        createUrlTree(l, n, e) {
            const t = l.segments.length > 0 ? new zd([], {
                [bd]: l
            }) : l;
            return new Bd(t, n, e)
        }
        expandSegmentGroup(l, n, e, t) {
            return 0 === e.segments.length && e.hasChildren() ? this.expandChildren(l, n, e).pipe(U(l => new zd([], l))) : this.expandSegment(l, e, n, e.segments, t, !0)
        }
        expandChildren(l, n, e) {
            return function (l, n) {
                if (0 === Object.keys(l).length) return Za({});
                const e = [],
                    t = [],
                    i = {};
                return Od(l, (l, s) => {
                    const u = n(s, l).pipe(U(l => i[s] = l));
                    s === bd ? e.push(u) : t.push(u)
                }), Za.apply(null, e.concat(t)).pipe(to(), wo(), U(() => i))
            }(e.children, (e, t) => this.expandSegmentGroup(l, n, t, e))
        }
        expandSegment(l, n, e, t, i, s) {
            return Za(...e).pipe(U(u => this.expandSegmentAgainstRoute(l, n, e, u, t, i, s).pipe(xo(l => {
                if (l instanceof Oh) return Za(null);
                throw l
            }))), to(), Eo(l => !!l), xo((l, e) => {
                if (l instanceof Xa || "EmptyError" === l.name) {
                    if (this.noLeftoversInUrl(n, t, i)) return Za(new zd([], {}));
                    throw new Oh(n)
                }
                throw l
            }))
        }
        noLeftoversInUrl(l, n, e) {
            return 0 === n.length && !l.children[e]
        }
        expandSegmentAgainstRoute(l, n, e, t, i, s, u) {
            return Uh(t) !== s ? Rh(n) : void 0 === t.redirectTo ? this.matchSegmentAgainstRoute(l, n, t, i) : u && this.allowRedirects ? this.expandSegmentAgainstRouteUsingRedirect(l, n, e, t, i, s) : Rh(n)
        }
        expandSegmentAgainstRouteUsingRedirect(l, n, e, t, i, s) {
            return "**" === t.path ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(l, e, t, s) : this.expandRegularSegmentAgainstRouteUsingRedirect(l, n, e, t, i, s)
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(l, n, e, t) {
            const i = this.applyRedirectCommands([], e.redirectTo, {});
            return e.redirectTo.startsWith("/") ? Bh(i) : this.lineralizeSegments(e, i).pipe(W(e => {
                const i = new zd(e, {});
                return this.expandSegment(l, i, n, e, t, !1)
            }))
        }
        expandRegularSegmentAgainstRouteUsingRedirect(l, n, e, t, i, s) {
            const {
                matched: u,
                consumedSegments: r,
                lastChild: a,
                positionalParamSegments: o
            } = Lh(n, t, i);
            if (!u) return Rh(n);
            const c = this.applyRedirectCommands(r, t.redirectTo, o);
            return t.redirectTo.startsWith("/") ? Bh(c) : this.lineralizeSegments(t, c).pipe(W(t => this.expandSegment(l, n, e, t.concat(i.slice(a)), s, !1)))
        }
        matchSegmentAgainstRoute(l, n, e, t) {
            if ("**" === e.path) return e.loadChildren ? this.configLoader.load(l.injector, e).pipe(U(l => (e._loadedConfig = l, new zd(t, {})))) : Za(new zd(t, {}));
            const {
                matched: i,
                consumedSegments: s,
                lastChild: u
            } = Lh(n, e, t);
            if (!i) return Rh(n);
            const r = t.slice(u);
            return this.getChildConfig(l, e, t).pipe(W(l => {
                const e = l.module,
                    t = l.routes,
                    {
                        segmentGroup: i,
                        slicedSegments: u
                    } = function (l, n, e, t) {
                        return e.length > 0 && function (l, n, e) {
                            return e.some(e => qh(l, n, e) && Uh(e) !== bd)
                        }(l, e, t) ? {
                            segmentGroup: Fh(new zd(n, function (l, n) {
                                const e = {};
                                e[bd] = n;
                                for (const t of l) "" === t.path && Uh(t) !== bd && (e[Uh(t)] = new zd([], {}));
                                return e
                            }(t, new zd(e, l.children)))),
                            slicedSegments: []
                        } : 0 === e.length && function (l, n, e) {
                            return e.some(e => qh(l, n, e))
                        }(l, e, t) ? {
                            segmentGroup: Fh(new zd(l.segments, function (l, n, e, t) {
                                const i = {};
                                for (const s of e) qh(l, n, s) && !t[Uh(s)] && (i[Uh(s)] = new zd([], {}));
                                return Object.assign({}, t, i)
                            }(l, e, t, l.children))),
                            slicedSegments: e
                        } : {
                            segmentGroup: l,
                            slicedSegments: e
                        }
                    }(n, s, r, t);
                return 0 === u.length && i.hasChildren() ? this.expandChildren(e, t, i).pipe(U(l => new zd(s, l))) : 0 === t.length && 0 === u.length ? Za(new zd(s, {})) : this.expandSegment(e, i, t, u, bd, !0).pipe(U(l => new zd(s.concat(l.segments), l.children)))
            }))
        }
        getChildConfig(l, n, e) {
            return n.children ? Za(new Cd(n.children, l)) : n.loadChildren ? void 0 !== n._loadedConfig ? Za(n._loadedConfig) : function (l, n, e) {
                const t = n.canLoad;
                return t && 0 !== t.length ? G(t).pipe(U(t => {
                    const i = l.get(t);
                    let s;
                    if (function (l) {
                            return l && Dh(l.canLoad)
                        }(i)) s = i.canLoad(n, e);
                    else {
                        if (!Dh(i)) throw new Error("Invalid CanLoad guard");
                        s = i(n, e)
                    }
                    return Nd(s)
                })).pipe(to(), (i = l => !0 === l, l => l.lift(new Ao(i, void 0, l)))) : Za(!0);
                var i
            }(l.injector, n, e).pipe(W(e => e ? this.configLoader.load(l.injector, n).pipe(U(l => (n._loadedConfig = l, l))) : function (l) {
                return new w(n => n.error(kd(`Cannot load children because the guard of the route "path: '${l.path}'" returned false`)))
            }(n))) : Za(new Cd([], l))
        }
        lineralizeSegments(l, n) {
            let e = [],
                t = n.root;
            for (;;) {
                if (e = e.concat(t.segments), 0 === t.numberOfChildren) return Za(e);
                if (t.numberOfChildren > 1 || !t.children[bd]) return zh(l.redirectTo);
                t = t.children[bd]
            }
        }
        applyRedirectCommands(l, n, e) {
            return this.applyRedirectCreatreUrlTree(n, this.urlSerializer.parse(n), l, e)
        }
        applyRedirectCreatreUrlTree(l, n, e, t) {
            const i = this.createSegmentGroup(l, n.root, e, t);
            return new Bd(i, this.createQueryParams(n.queryParams, this.urlTree.queryParams), n.fragment)
        }
        createQueryParams(l, n) {
            const e = {};
            return Od(l, (l, t) => {
                if ("string" == typeof l && l.startsWith(":")) {
                    const i = l.substring(1);
                    e[t] = n[i]
                } else e[t] = l
            }), e
        }
        createSegmentGroup(l, n, e, t) {
            const i = this.createSegments(l, n.segments, e, t);
            let s = {};
            return Od(n.children, (n, i) => {
                s[i] = this.createSegmentGroup(l, n, e, t)
            }), new zd(i, s)
        }
        createSegments(l, n, e, t) {
            return n.map(n => n.path.startsWith(":") ? this.findPosParam(l, n, t) : this.findOrReturn(n, e))
        }
        findPosParam(l, n, e) {
            const t = e[n.path.substring(1)];
            if (!t) throw new Error(`Cannot redirect to '${l}'. Cannot find '${n.path}'.`);
            return t
        }
        findOrReturn(l, n) {
            let e = 0;
            for (const t of n) {
                if (t.path === l.path) return n.splice(e), t;
                e++
            }
            return l
        }
    }

    function Lh(l, n, e) {
        if ("" === n.path) return "full" === n.pathMatch && (l.hasChildren() || e.length > 0) ? {
            matched: !1,
            consumedSegments: [],
            lastChild: 0,
            positionalParamSegments: {}
        } : {
            matched: !0,
            consumedSegments: [],
            lastChild: 0,
            positionalParamSegments: {}
        };
        const t = (n.matcher || Sd)(e, l, n);
        return t ? {
            matched: !0,
            consumedSegments: t.consumed,
            lastChild: t.consumed.length,
            positionalParamSegments: t.posParams
        } : {
            matched: !1,
            consumedSegments: [],
            lastChild: 0,
            positionalParamSegments: {}
        }
    }

    function Fh(l) {
        if (1 === l.numberOfChildren && l.children[bd]) {
            const n = l.children[bd];
            return new zd(l.segments.concat(n.segments), n.children)
        }
        return l
    }

    function qh(l, n, e) {
        return (!(l.hasChildren() || n.length > 0) || "full" !== e.pathMatch) && "" === e.path && void 0 !== e.redirectTo
    }

    function Uh(l) {
        return l.outlet || bd
    }
    class Hh {
        constructor(l) {
            this.path = l, this.route = this.path[this.path.length - 1]
        }
    }
    class Vh {
        constructor(l, n) {
            this.component = l, this.route = n
        }
    }

    function jh(l, n, e) {
        const t = l._root;
        return function l(n, e, t, i, s = {
            canDeactivateChecks: [],
            canActivateChecks: []
        }) {
            const u = uh(e);
            return n.children.forEach(n => {
                ! function (n, e, t, i, s = {
                    canDeactivateChecks: [],
                    canActivateChecks: []
                }) {
                    const u = n.value,
                        r = e ? e.value : null,
                        a = t ? t.getContext(n.value.outlet) : null;
                    if (r && u.routeConfig === r.routeConfig) {
                        const o = function (l, n, e) {
                            if ("function" == typeof e) return e(l, n);
                            switch (e) {
                                case "pathParamsChange":
                                    return !Ld(l.url, n.url);
                                case "pathParamsOrQueryParamsChange":
                                    return !Ld(l.url, n.url) || !Pd(l.queryParams, n.queryParams);
                                case "always":
                                    return !0;
                                case "paramsOrQueryParamsChange":
                                    return !mh(l, n) || !Pd(l.queryParams, n.queryParams);
                                case "paramsChange":
                                default:
                                    return !mh(l, n)
                            }
                        }(r, u, u.routeConfig.runGuardsAndResolvers);
                        o ? s.canActivateChecks.push(new Hh(i)) : (u.data = r.data, u._resolvedData = r._resolvedData), l(n, e, u.component ? a ? a.children : null : t, i, s), o && s.canDeactivateChecks.push(new Vh(a && a.outlet && a.outlet.component || null, r))
                    } else r && Wh(e, a, s), s.canActivateChecks.push(new Hh(i)), l(n, null, u.component ? a ? a.children : null : t, i, s)
                }(n, u[n.value.outlet], t, i.concat([n.value]), s), delete u[n.value.outlet]
            }), Od(u, (l, n) => Wh(l, t.getContext(n), s)), s
        }(t, n ? n._root : null, e, [t.value])
    }

    function Gh(l, n, e) {
        const t = function (l) {
            if (!l) return null;
            for (let n = l.parent; n; n = n.parent) {
                const l = n.routeConfig;
                if (l && l._loadedConfig) return l._loadedConfig
            }
            return null
        }(n);
        return (t ? t.module.injector : e).get(l)
    }

    function Wh(l, n, e) {
        const t = uh(l),
            i = l.value;
        Od(t, (l, t) => {
            Wh(l, i.component ? n ? n.children.getContext(t) : null : n, e)
        }), e.canDeactivateChecks.push(new Vh(i.component && n && n.outlet && n.outlet.isActivated ? n.outlet.component : null, i))
    }
    const Kh = Symbol("INITIAL_VALUE");

    function Zh() {
        return Do(l => (function (...l) {
            let n = null,
                e = null;
            return A(l[l.length - 1]) && (e = l.pop()), "function" == typeof l[l.length - 1] && (n = l.pop()), 1 === l.length && a(l[0]) && (l = l[0]), j(l, e).lift(new lo(n))
        })(...l.map(l => l.pipe(Co(1), function (...l) {
            return n => {
                let e = l[l.length - 1];
                A(e) ? l.pop() : e = null;
                const t = l.length;
                return function (...l) {
                    return to()(Za(...l))
                }(1 !== t || e ? t > 0 ? j(l, e) : Wa(e) : Ka(l[0]), n)
            }
        }(Kh)))).pipe(No((l, n) => {
            let e = !1;
            return n.reduce((l, t, i) => {
                if (l !== Kh) return l;
                if (t === Kh && (e = !0), !e) {
                    if (!1 === t) return t;
                    if (i === n.length - 1 || Mh(t)) return t
                }
                return l
            }, l)
        }, Kh), io(l => l !== Kh), U(l => Mh(l) ? l : !0 === l), Co(1)))
    }

    function Qh(l, n) {
        return null !== l && n && n(new gd(l)), Za(!0)
    }

    function Yh(l, n) {
        return null !== l && n && n(new pd(l)), Za(!0)
    }

    function Xh(l, n, e) {
        const t = n.routeConfig ? n.routeConfig.canActivate : null;
        return t && 0 !== t.length ? Za(t.map(t => eo(() => {
            const i = Gh(t, n, e);
            let s;
            if (function (l) {
                    return l && Dh(l.canActivate)
                }(i)) s = Nd(i.canActivate(n, l));
            else {
                if (!Dh(i)) throw new Error("Invalid CanActivate guard");
                s = Nd(i(n, l))
            }
            return s.pipe(Eo())
        }))).pipe(Zh()) : Za(!0)
    }

    function Jh(l, n, e) {
        const t = n[n.length - 1],
            i = n.slice(0, n.length - 1).reverse().map(l => (function (l) {
                const n = l.routeConfig ? l.routeConfig.canActivateChild : null;
                return n && 0 !== n.length ? {
                    node: l,
                    guards: n
                } : null
            })(l)).filter(l => null !== l).map(n => eo(() => Za(n.guards.map(i => {
                const s = Gh(i, n.node, e);
                let u;
                if (function (l) {
                        return l && Dh(l.canActivateChild)
                    }(s)) u = Nd(s.canActivateChild(t, l));
                else {
                    if (!Dh(s)) throw new Error("Invalid CanActivateChild guard");
                    u = Nd(s(t, l))
                }
                return u.pipe(Eo())
            })).pipe(Zh())));
        return Za(i).pipe(Zh())
    }
    class lp {}
    class np {
        constructor(l, n, e, t, i, s) {
            this.rootComponentType = l, this.config = n, this.urlTree = e, this.url = t, this.paramsInheritanceStrategy = i, this.relativeLinkResolution = s
        }
        recognize() {
            try {
                const l = ip(this.urlTree.root, [], [], this.config, this.relativeLinkResolution).segmentGroup,
                    n = this.processSegmentGroup(this.config, l, bd),
                    e = new dh([], Object.freeze({}), Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, {}, bd, this.rootComponentType, null, this.urlTree.root, -1, {}),
                    t = new sh(e, n),
                    i = new hh(this.url, t);
                return this.inheritParamsAndData(i._root), Za(i)
            } catch (l) {
                return new w(n => n.error(l))
            }
        }
        inheritParamsAndData(l) {
            const n = l.value,
                e = ch(n, this.paramsInheritanceStrategy);
            n.params = Object.freeze(e.params), n.data = Object.freeze(e.data), l.children.forEach(l => this.inheritParamsAndData(l))
        }
        processSegmentGroup(l, n, e) {
            return 0 === n.segments.length && n.hasChildren() ? this.processChildren(l, n) : this.processSegment(l, n, n.segments, e)
        }
        processChildren(l, n) {
            const e = Fd(n, (n, e) => this.processSegmentGroup(l, n, e));
            return function (l) {
                const n = {};
                l.forEach(l => {
                    const e = n[l.value.outlet];
                    if (e) {
                        const n = e.url.map(l => l.toString()).join("/"),
                            t = l.value.url.map(l => l.toString()).join("/");
                        throw new Error(`Two segments cannot have the same outlet name: '${n}' and '${t}'.`)
                    }
                    n[l.value.outlet] = l.value
                })
            }(e), e.sort((l, n) => l.value.outlet === bd ? -1 : n.value.outlet === bd ? 1 : l.value.outlet.localeCompare(n.value.outlet)), e
        }
        processSegment(l, n, e, t) {
            for (const s of l) try {
                return this.processSegmentAgainstRoute(s, n, e, t)
            } catch (i) {
                if (!(i instanceof lp)) throw i
            }
            if (this.noLeftoversInUrl(n, e, t)) return [];
            throw new lp
        }
        noLeftoversInUrl(l, n, e) {
            return 0 === n.length && !l.children[e]
        }
        processSegmentAgainstRoute(l, n, e, t) {
            if (l.redirectTo) throw new lp;
            if ((l.outlet || bd) !== t) throw new lp;
            let i, s = [],
                u = [];
            if ("**" === l.path) {
                const s = e.length > 0 ? Md(e).parameters : {};
                i = new dh(e, s, Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, rp(l), t, l.component, l, ep(n), tp(n) + e.length, ap(l))
            } else {
                const r = function (l, n, e) {
                    if ("" === n.path) {
                        if ("full" === n.pathMatch && (l.hasChildren() || e.length > 0)) throw new lp;
                        return {
                            consumedSegments: [],
                            lastChild: 0,
                            parameters: {}
                        }
                    }
                    const t = (n.matcher || Sd)(e, l, n);
                    if (!t) throw new lp;
                    const i = {};
                    Od(t.posParams, (l, n) => {
                        i[n] = l.path
                    });
                    const s = t.consumed.length > 0 ? Object.assign({}, i, t.consumed[t.consumed.length - 1].parameters) : i;
                    return {
                        consumedSegments: t.consumed,
                        lastChild: t.consumed.length,
                        parameters: s
                    }
                }(n, l, e);
                s = r.consumedSegments, u = e.slice(r.lastChild), i = new dh(s, r.parameters, Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, rp(l), t, l.component, l, ep(n), tp(n) + s.length, ap(l))
            }
            const r = function (l) {
                    return l.children ? l.children : l.loadChildren ? l._loadedConfig.routes : []
                }(l),
                {
                    segmentGroup: a,
                    slicedSegments: o
                } = ip(n, s, u, r, this.relativeLinkResolution);
            if (0 === o.length && a.hasChildren()) {
                const l = this.processChildren(r, a);
                return [new sh(i, l)]
            }
            if (0 === r.length && 0 === o.length) return [new sh(i, [])];
            const c = this.processSegment(r, a, o, bd);
            return [new sh(i, c)]
        }
    }

    function ep(l) {
        let n = l;
        for (; n._sourceSegment;) n = n._sourceSegment;
        return n
    }

    function tp(l) {
        let n = l,
            e = n._segmentIndexShift ? n._segmentIndexShift : 0;
        for (; n._sourceSegment;) e += (n = n._sourceSegment)._segmentIndexShift ? n._segmentIndexShift : 0;
        return e - 1
    }

    function ip(l, n, e, t, i) {
        if (e.length > 0 && function (l, n, e) {
                return e.some(e => sp(l, n, e) && up(e) !== bd)
            }(l, e, t)) {
            const i = new zd(n, function (l, n, e, t) {
                const i = {};
                i[bd] = t, t._sourceSegment = l, t._segmentIndexShift = n.length;
                for (const s of e)
                    if ("" === s.path && up(s) !== bd) {
                        const e = new zd([], {});
                        e._sourceSegment = l, e._segmentIndexShift = n.length, i[up(s)] = e
                    } return i
            }(l, n, t, new zd(e, l.children)));
            return i._sourceSegment = l, i._segmentIndexShift = n.length, {
                segmentGroup: i,
                slicedSegments: []
            }
        }
        if (0 === e.length && function (l, n, e) {
                return e.some(e => sp(l, n, e))
            }(l, e, t)) {
            const s = new zd(l.segments, function (l, n, e, t, i, s) {
                const u = {};
                for (const r of t)
                    if (sp(l, e, r) && !i[up(r)]) {
                        const e = new zd([], {});
                        e._sourceSegment = l, e._segmentIndexShift = "legacy" === s ? l.segments.length : n.length, u[up(r)] = e
                    } return Object.assign({}, i, u)
            }(l, n, e, t, l.children, i));
            return s._sourceSegment = l, s._segmentIndexShift = n.length, {
                segmentGroup: s,
                slicedSegments: e
            }
        }
        const s = new zd(l.segments, l.children);
        return s._sourceSegment = l, s._segmentIndexShift = n.length, {
            segmentGroup: s,
            slicedSegments: e
        }
    }

    function sp(l, n, e) {
        return (!(l.hasChildren() || n.length > 0) || "full" !== e.pathMatch) && "" === e.path && void 0 === e.redirectTo
    }

    function up(l) {
        return l.outlet || bd
    }

    function rp(l) {
        return l.data || {}
    }

    function ap(l) {
        return l.resolve || {}
    }

    function op(l, n, e, t) {
        const i = Gh(l, n, t);
        return Nd(i.resolve ? i.resolve(n, e) : i(n, e))
    }

    function cp(l) {
        return function (n) {
            return n.pipe(Do(n => {
                const e = l(n);
                return e ? G(e).pipe(U(() => n)) : G([n])
            }))
        }
    }
    class dp {}
    class hp {
        shouldDetach(l) {
            return !1
        }
        store(l, n) {}
        shouldAttach(l) {
            return !1
        }
        retrieve(l) {
            return null
        }
        shouldReuseRoute(l, n) {
            return l.routeConfig === n.routeConfig
        }
    }
    const pp = new El("ROUTES"); class fp {
        constructor(l, n, e, t) {
            this.loader = l, this.compiler = n, this.onLoadStartListener = e, this.onLoadEndListener = t
        }
        load(l, n) {
            return this.onLoadStartListener && this.onLoadStartListener(n), this.loadModuleFactory(n.loadChildren).pipe(U(e => {
                this.onLoadEndListener && this.onLoadEndListener(n);
                const t = e.create(l);
                return new Cd(Dd(t.injector.get(pp)).map(Ad), t)
            }))
        }
        loadModuleFactory(l) {
            return "string" == typeof l ? G(this.loader.load(l)) : Nd(l()).pipe(W(l => l instanceof Gl ? Za(l) : G(this.compiler.compileModuleAsync(l))))
        }
    }
    class gp {}
    class mp {
        shouldProcessUrl(l) {
            return !0
        }
        extract(l) {
            return l
        }
        merge(l, n) {
            return l
        }
    }

    function yp(l) {
        throw l
    }

    function vp(l, n, e) {
        return n.parse("/")
    }

    function bp(l, n) {
        return Za(null)
    }
    class _p {
        constructor(l, n, e, t, i, s, u, r) {
            this.rootComponentType = l, this.urlSerializer = n, this.rootContexts = e, this.location = t, this.config = r, this.lastSuccessfulNavigation = null, this.currentNavigation = null, this.navigationId = 0, this.isNgZoneEnabled = !1, this.events = new T, this.errorHandler = yp, this.malformedUriErrorHandler = vp, this.navigated = !1, this.lastSuccessfulId = -1, this.hooks = {
                beforePreactivation: bp,
                afterPreactivation: bp
            }, this.urlHandlingStrategy = new mp, this.routeReuseStrategy = new hp, this.onSameUrlNavigation = "ignore", this.paramsInheritanceStrategy = "emptyOnly", this.urlUpdateStrategy = "deferred", this.relativeLinkResolution = "legacy", this.ngModule = i.get(jl), this.console = i.get(Xi);
            const a = i.get(ys);
            this.isNgZoneEnabled = a instanceof ys, this.resetConfig(r), this.currentUrlTree = new Bd(new zd([], {}), {}, null), this.rawUrlTree = this.currentUrlTree, this.browserUrlTree = this.currentUrlTree, this.configLoader = new fp(s, u, l => this.triggerEvent(new dd(l)), l => this.triggerEvent(new hd(l))), this.routerState = ah(this.currentUrlTree, this.rootComponentType), this.transitions = new Qa({
                id: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(this.currentUrlTree),
                urlAfterRedirects: this.urlHandlingStrategy.extract(this.currentUrlTree),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: {
                    canActivateChecks: [],
                    canDeactivateChecks: []
                },
                guardsResult: null
            }), this.navigations = this.setupNavigations(this.transitions), this.processNavigations()
        }
        setupNavigations(l) {
            const n = this.events;
            return l.pipe(io(l => 0 !== l.id), U(l => Object.assign({}, l, {
                extractedUrl: this.urlHandlingStrategy.extract(l.rawUrl)
            })), Do(l => {
                let e = !1,
                    t = !1;
                return Za(l).pipe(po(l => {
                    this.currentNavigation = {
                        id: l.id,
                        initialUrl: l.currentRawUrl,
                        extractedUrl: l.extractedUrl,
                        trigger: l.source,
                        extras: l.extras,
                        previousNavigation: this.lastSuccessfulNavigation ? Object.assign({}, this.lastSuccessfulNavigation, {
                            previousNavigation: null
                        }) : null
                    }
                }), Do(l => {
                    const e = !this.navigated || l.extractedUrl.toString() !== this.browserUrlTree.toString();
                    if (("reload" === this.onSameUrlNavigation || e) && this.urlHandlingStrategy.shouldProcessUrl(l.rawUrl)) return Za(l).pipe(Do(l => {
                        const e = this.transitions.getValue();
                        return n.next(new ed(l.id, this.serializeUrl(l.extractedUrl), l.source, l.restoredState)), e !== this.transitions.getValue() ? Ga : [l]
                    }), Do(l => Promise.resolve(l)), function (l, n, e, t) {
                        return function (i) {
                            return i.pipe(Do(i => (function (l, n, e, t, i) {
                                return new $h(l, n, e, t, i).apply()
                            })(l, n, e, i.extractedUrl, t).pipe(U(l => Object.assign({}, i, {
                                urlAfterRedirects: l
                            })))))
                        }
                    }(this.ngModule.injector, this.configLoader, this.urlSerializer, this.config), po(l => {
                        this.currentNavigation = Object.assign({}, this.currentNavigation, {
                            finalUrl: l.urlAfterRedirects
                        })
                    }), function (l, n, e, t, i) {
                        return function (s) {
                            return s.pipe(W(s => (function (l, n, e, t, i = "emptyOnly", s = "legacy") {
                                return new np(l, n, e, t, i, s).recognize()
                            })(l, n, s.urlAfterRedirects, e(s.urlAfterRedirects), t, i).pipe(U(l => Object.assign({}, s, {
                                targetSnapshot: l
                            })))))
                        }
                    }(this.rootComponentType, this.config, l => this.serializeUrl(l), this.paramsInheritanceStrategy, this.relativeLinkResolution), po(l => {
                        "eager" === this.urlUpdateStrategy && (l.extras.skipLocationChange || this.setBrowserUrl(l.urlAfterRedirects, !!l.extras.replaceUrl, l.id, l.extras.state), this.browserUrlTree = l.urlAfterRedirects)
                    }), po(l => {
                        const e = new ud(l.id, this.serializeUrl(l.extractedUrl), this.serializeUrl(l.urlAfterRedirects), l.targetSnapshot);
                        n.next(e)
                    }));
                    if (e && this.rawUrlTree && this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)) {
                        const {
                            id: e,
                            extractedUrl: t,
                            source: i,
                            restoredState: s,
                            extras: u
                        } = l, r = new ed(e, this.serializeUrl(t), i, s);
                        n.next(r);
                        const a = ah(t, this.rootComponentType).snapshot;
                        return Za(Object.assign({}, l, {
                            targetSnapshot: a,
                            urlAfterRedirects: t,
                            extras: Object.assign({}, u, {
                                skipLocationChange: !1,
                                replaceUrl: !1
                            })
                        }))
                    }
                    return this.rawUrlTree = l.rawUrl, this.browserUrlTree = l.urlAfterRedirects, l.resolve(null), Ga
                }), cp(l => {
                    const {
                        targetSnapshot: n,
                        id: e,
                        extractedUrl: t,
                        rawUrl: i,
                        extras: {
                            skipLocationChange: s,
                            replaceUrl: u
                        }
                    } = l;
                    return this.hooks.beforePreactivation(n, {
                        navigationId: e,
                        appliedUrlTree: t,
                        rawUrlTree: i,
                        skipLocationChange: !!s,
                        replaceUrl: !!u
                    })
                }), po(l => {
                    const n = new rd(l.id, this.serializeUrl(l.extractedUrl), this.serializeUrl(l.urlAfterRedirects), l.targetSnapshot);
                    this.triggerEvent(n)
                }), U(l => Object.assign({}, l, {
                    guards: jh(l.targetSnapshot, l.currentSnapshot, this.rootContexts)
                })), function (l, n) {
                    return function (e) {
                        return e.pipe(W(e => {
                            const {
                                targetSnapshot: t,
                                currentSnapshot: i,
                                guards: {
                                    canActivateChecks: s,
                                    canDeactivateChecks: u
                                }
                            } = e;
                            return 0 === u.length && 0 === s.length ? Za(Object.assign({}, e, {
                                guardsResult: !0
                            })) : function (l, n, e, t) {
                                return G(l).pipe(W(l => (function (l, n, e, t, i) {
                                    const s = n && n.routeConfig ? n.routeConfig.canDeactivate : null;
                                    return s && 0 !== s.length ? Za(s.map(s => {
                                        const u = Gh(s, n, i);
                                        let r;
                                        if (function (l) {
                                                return l && Dh(l.canDeactivate)
                                            }(u)) r = Nd(u.canDeactivate(l, n, e, t));
                                        else {
                                            if (!Dh(u)) throw new Error("Invalid CanDeactivate guard");
                                            r = Nd(u(l, n, e, t))
                                        }
                                        return r.pipe(Eo())
                                    })).pipe(Zh()) : Za(!0)
                                })(l.component, l.route, e, n, t)), Eo(l => !0 !== l, !0))
                            }(u, t, i, l).pipe(W(e => e && function (l) {
                                return "boolean" == typeof l
                            }(e) ? function (l, n, e, t) {
                                return G(n).pipe(zo(n => G([Yh(n.route.parent, t), Qh(n.route, t), Jh(l, n.path, e), Xh(l, n.route, e)]).pipe(to(), Eo(l => !0 !== l, !0))), Eo(l => !0 !== l, !0))
                            }(t, s, l, n) : Za(e)), U(l => Object.assign({}, e, {
                                guardsResult: l
                            })))
                        }))
                    }
                }(this.ngModule.injector, l => this.triggerEvent(l)), po(l => {
                    if (Mh(l.guardsResult)) {
                        const n = kd(`Redirecting to "${this.serializeUrl(l.guardsResult)}"`);
                        throw n.url = l.guardsResult, n
                    }
                }), po(l => {
                    const n = new ad(l.id, this.serializeUrl(l.extractedUrl), this.serializeUrl(l.urlAfterRedirects), l.targetSnapshot, !!l.guardsResult);
                    this.triggerEvent(n)
                }), io(l => {
                    if (!l.guardsResult) {
                        this.resetUrlToCurrentUrlTree();
                        const e = new id(l.id, this.serializeUrl(l.extractedUrl), "");
                        return n.next(e), l.resolve(!1), !1
                    }
                    return !0
                }), cp(l => {
                    if (l.guards.canActivateChecks.length) return Za(l).pipe(po(l => {
                        const n = new od(l.id, this.serializeUrl(l.extractedUrl), this.serializeUrl(l.urlAfterRedirects), l.targetSnapshot);
                        this.triggerEvent(n)
                    }), function (l, n) {
                        return function (e) {
                            return e.pipe(W(e => {
                                const {
                                    targetSnapshot: t,
                                    guards: {
                                        canActivateChecks: i
                                    }
                                } = e;
                                return i.length ? G(i).pipe(zo(e => (function (l, n, e, t) {
                                    return function (l, n, e, t) {
                                        const i = Object.keys(l);
                                        if (0 === i.length) return Za({});
                                        if (1 === i.length) {
                                            const s = i[0];
                                            return op(l[s], n, e, t).pipe(U(l => ({
                                                [s]: l
                                            })))
                                        }
                                        const s = {};
                                        return G(i).pipe(W(i => op(l[i], n, e, t).pipe(U(l => (s[i] = l, l))))).pipe(wo(), U(() => s))
                                    }(l._resolve, l, n, t).pipe(U(n => (l._resolvedData = n, l.data = Object.assign({}, l.data, ch(l, e).resolve), null)))
                                })(e.route, t, l, n)), function (l, n) {
                                    return arguments.length >= 2 ? function (e) {
                                        return b(No(l, n), oo(1), vo(n))(e)
                                    } : function (n) {
                                        return b(No((n, e, t) => l(n, e, t + 1)), oo(1))(n)
                                    }
                                }((l, n) => l), U(l => e)) : Za(e)
                            }))
                        }
                    }(this.paramsInheritanceStrategy, this.ngModule.injector), po(l => {
                        const n = new cd(l.id, this.serializeUrl(l.extractedUrl), this.serializeUrl(l.urlAfterRedirects), l.targetSnapshot);
                        this.triggerEvent(n)
                    }))
                }), cp(l => {
                    const {
                        targetSnapshot: n,
                        id: e,
                        extractedUrl: t,
                        rawUrl: i,
                        extras: {
                            skipLocationChange: s,
                            replaceUrl: u
                        }
                    } = l;
                    return this.hooks.afterPreactivation(n, {
                        navigationId: e,
                        appliedUrlTree: t,
                        rawUrlTree: i,
                        skipLocationChange: !!s,
                        replaceUrl: !!u
                    })
                }), U(l => {
                    const n = function (l, n, e) {
                        const t = function l(n, e, t) {
                            if (t && n.shouldReuseRoute(e.value, t.value.snapshot)) {
                                const i = t.value;
                                i._futureSnapshot = e.value;
                                const s = function (n, e, t) {
                                    return e.children.map(e => {
                                        for (const i of t.children)
                                            if (n.shouldReuseRoute(i.value.snapshot, e.value)) return l(n, e, i);
                                        return l(n, e)
                                    })
                                }(n, e, t);
                                return new sh(i, s)
                            } {
                                const t = n.retrieve(e.value);
                                if (t) {
                                    const l = t.route;
                                    return function l(n, e) {
                                        if (n.value.routeConfig !== e.value.routeConfig) throw new Error("Cannot reattach ActivatedRouteSnapshot created from a different route");
                                        if (n.children.length !== e.children.length) throw new Error("Cannot reattach ActivatedRouteSnapshot with a different number of children");
                                        e.value._futureSnapshot = n.value;
                                        for (let t = 0; t < n.children.length; ++t) l(n.children[t], e.children[t])
                                    }(e, l), l
                                } {
                                    const t = new oh(new Qa((i = e.value).url), new Qa(i.params), new Qa(i.queryParams), new Qa(i.fragment), new Qa(i.data), i.outlet, i.component, i),
                                        s = e.children.map(e => l(n, e));
                                    return new sh(t, s)
                                }
                            }
                            var i
                        }(l, n._root, e ? e._root : void 0);
                        return new rh(t, n)
                    }(this.routeReuseStrategy, l.targetSnapshot, l.currentRouterState);
                    return Object.assign({}, l, {
                        targetRouterState: n
                    })
                }), po(l => {
                    this.currentUrlTree = l.urlAfterRedirects, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, l.rawUrl), this.routerState = l.targetRouterState, "deferred" === this.urlUpdateStrategy && (l.extras.skipLocationChange || this.setBrowserUrl(this.rawUrlTree, !!l.extras.replaceUrl, l.id, l.extras.state), this.browserUrlTree = l.urlAfterRedirects)
                }), Eh(this.rootContexts, this.routeReuseStrategy, l => this.triggerEvent(l)), po({
                    next() {
                        e = !0
                    },
                    complete() {
                        e = !0
                    }
                }), function (l) {
                    return n => n.lift(new $o(l))
                }(() => {
                    if (!e && !t) {
                        this.resetUrlToCurrentUrlTree();
                        const e = new id(l.id, this.serializeUrl(l.extractedUrl), `Navigation ID ${l.id} is not equal to the current navigation id ${this.navigationId}`);
                        n.next(e), l.resolve(!1)
                    }
                    this.currentNavigation = null
                }), xo(e => {
                    if (t = !0, function (l) {
                            return l && l[xd]
                        }(e)) {
                        const t = Mh(e.url);
                        t || (this.navigated = !0, this.resetStateAndUrl(l.currentRouterState, l.currentUrlTree, l.rawUrl));
                        const i = new id(l.id, this.serializeUrl(l.extractedUrl), e.message);
                        n.next(i), l.resolve(!1), t && this.navigateByUrl(e.url)
                    } else {
                        this.resetStateAndUrl(l.currentRouterState, l.currentUrlTree, l.rawUrl);
                        const t = new sd(l.id, this.serializeUrl(l.extractedUrl), e);
                        n.next(t);
                        try {
                            l.resolve(this.errorHandler(e))
                        } catch (i) {
                            l.reject(i)
                        }
                    }
                    return Ga
                }))
            }))
        }
        resetRootComponentType(l) {
            this.rootComponentType = l, this.routerState.root.component = this.rootComponentType
        }
        getTransition() {
            const l = this.transitions.value;
            return l.urlAfterRedirects = this.browserUrlTree, l
        }
        setTransition(l) {
            this.transitions.next(Object.assign({}, this.getTransition(), l))
        }
        initialNavigation() {
            this.setUpLocationChangeListener(), 0 === this.navigationId && this.navigateByUrl(this.location.path(!0), {
                replaceUrl: !0
            })
        }
        setUpLocationChangeListener() {
            this.locationSubscription || (this.locationSubscription = this.location.subscribe(l => {
                let n = this.parseUrl(l.url);
                const e = "popstate" === l.type ? "popstate" : "hashchange",
                    t = l.state && l.state.navigationId ? l.state : null;
                setTimeout(() => {
                    this.scheduleNavigation(n, e, t, {
                        replaceUrl: !0
                    })
                }, 0)
            }))
        }
        get url() {
            return this.serializeUrl(this.currentUrlTree)
        }
        getCurrentNavigation() {
            return this.currentNavigation
        }
        triggerEvent(l) {
            this.events.next(l)
        }
        resetConfig(l) {
            Id(l), this.config = l.map(Ad), this.navigated = !1, this.lastSuccessfulId = -1
        }
        ngOnDestroy() {
            this.dispose()
        }
        dispose() {
            this.locationSubscription && (this.locationSubscription.unsubscribe(), this.locationSubscription = null)
        }
        createUrlTree(l, n = {}) {
            const {
                relativeTo: e,
                queryParams: t,
                fragment: i,
                preserveQueryParams: s,
                queryParamsHandling: u,
                preserveFragment: r
            } = n;
            rn() && s && console && console.warn && console.warn("preserveQueryParams is deprecated, use queryParamsHandling instead.");
            const a = e || this.routerState.root,
                o = r ? this.currentUrlTree.fragment : i;
            let c = null;
            if (u) switch (u) {
                case "merge":
                    c = Object.assign({}, this.currentUrlTree.queryParams, t);
                    break;
                case "preserve":
                    c = this.currentUrlTree.queryParams;
                    break;
                default:
                    c = t || null
            } else c = s ? this.currentUrlTree.queryParams : t || null;
            return null !== c && (c = this.removeEmptyProps(c)),
                function (l, n, e, t, i) {
                    if (0 === e.length) return vh(n.root, n.root, n, t, i);
                    const s = function (l) {
                        if ("string" == typeof l[0] && 1 === l.length && "/" === l[0]) return new bh(!0, 0, l);
                        let n = 0,
                            e = !1;
                        const t = l.reduce((l, t, i) => {
                            if ("object" == typeof t && null != t) {
                                if (t.outlets) {
                                    const n = {};
                                    return Od(t.outlets, (l, e) => {
                                        n[e] = "string" == typeof l ? l.split("/") : l
                                    }), [...l, {
                                        outlets: n
                                    }]
                                }
                                if (t.segmentPath) return [...l, t.segmentPath]
                            }
                            return "string" != typeof t ? [...l, t] : 0 === i ? (t.split("/").forEach((t, i) => {
                                0 == i && "." === t || (0 == i && "" === t ? e = !0 : ".." === t ? n++ : "" != t && l.push(t))
                            }), l) : [...l, t]
                        }, []);
                        return new bh(e, n, t)
                    }(e);
                    if (s.toRoot()) return vh(n.root, new zd([], {}), n, t, i);
                    const u = function (l, n, e) {
                            if (l.isAbsolute) return new _h(n.root, !0, 0);
                            if (-1 === e.snapshot._lastPathIndex) return new _h(e.snapshot._urlSegment, !0, 0);
                            const t = yh(l.commands[0]) ? 0 : 1;
                            return function (l, n, e) {
                                let t = l,
                                    i = n,
                                    s = e;
                                for (; s > i;) {
                                    if (s -= i, !(t = t.parent)) throw new Error("Invalid number of '../'");
                                    i = t.segments.length
                                }
                                return new _h(t, !1, i - s)
                            }(e.snapshot._urlSegment, e.snapshot._lastPathIndex + t, l.numberOfDoubleDots)
                        }(s, n, l),
                        r = u.processChildren ? kh(u.segmentGroup, u.index, s.commands) : xh(u.segmentGroup, u.index, s.commands);
                    return vh(u.segmentGroup, r, n, t, i)
                }(a, this.currentUrlTree, l, c, o)
        }
        navigateByUrl(l, n = {
            skipLocationChange: !1
        }) {
            rn() && this.isNgZoneEnabled && !ys.isInAngularZone() && this.console.warn("Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?");
            const e = Mh(l) ? l : this.parseUrl(l),
                t = this.urlHandlingStrategy.merge(e, this.rawUrlTree);
            return this.scheduleNavigation(t, "imperative", null, n)
        }
        navigate(l, n = {
            skipLocationChange: !1
        }) {
            return function (l) {
                for (let n = 0; n < l.length; n++) {
                    const e = l[n];
                    if (null == e) throw new Error(`The requested path contains ${e} segment at index ${n}`)
                }
            }(l), this.navigateByUrl(this.createUrlTree(l, n), n)
        }
        serializeUrl(l) {
            return this.urlSerializer.serialize(l)
        }
        parseUrl(l) {
            let n;
            try {
                n = this.urlSerializer.parse(l)
            } catch (e) {
                n = this.malformedUriErrorHandler(e, this.urlSerializer, l)
            }
            return n
        }
        isActive(l, n) {
            if (Mh(l)) return Rd(this.currentUrlTree, l, n);
            const e = this.parseUrl(l);
            return Rd(this.currentUrlTree, e, n)
        }
        removeEmptyProps(l) {
            return Object.keys(l).reduce((n, e) => {
                const t = l[e];
                return null != t && (n[e] = t), n
            }, {})
        }
        processNavigations() {
            this.navigations.subscribe(l => {
                this.navigated = !0, this.lastSuccessfulId = l.id, this.events.next(new td(l.id, this.serializeUrl(l.extractedUrl), this.serializeUrl(this.currentUrlTree))), this.lastSuccessfulNavigation = this.currentNavigation, this.currentNavigation = null, l.resolve(!0)
            }, l => {
                this.console.warn("Unhandled Navigation Error: ")
            })
        }
        scheduleNavigation(l, n, e, t) {
            const i = this.getTransition();
            if (i && "imperative" !== n && "imperative" === i.source && i.rawUrl.toString() === l.toString()) return Promise.resolve(!0);
            if (i && "hashchange" == n && "popstate" === i.source && i.rawUrl.toString() === l.toString()) return Promise.resolve(!0);
            if (i && "popstate" == n && "hashchange" === i.source && i.rawUrl.toString() === l.toString()) return Promise.resolve(!0);
            let s = null,
                u = null;
            const r = new Promise((l, n) => {
                    s = l, u = n
                }),
                a = ++this.navigationId;
            return this.setTransition({
                id: a,
                source: n,
                restoredState: e,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: l,
                extras: t,
                resolve: s,
                reject: u,
                promise: r,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState
            }), r.catch(l => Promise.reject(l))
        }
        setBrowserUrl(l, n, e, t) {
            const i = this.urlSerializer.serialize(l);
            t = t || {}, this.location.isCurrentPathEqualTo(i) || n ? this.location.replaceState(i, "", Object.assign({}, t, {
                navigationId: e
            })) : this.location.go(i, "", Object.assign({}, t, {
                navigationId: e
            }))
        }
        resetStateAndUrl(l, n, e) {
            this.routerState = l, this.currentUrlTree = n, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, e), this.resetUrlToCurrentUrlTree()
        }
        resetUrlToCurrentUrlTree() {
            this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), "", {
                navigationId: this.lastSuccessfulId
            })
        }
    }
    class wp {
        constructor(l, n, e, t, i) {
            this.router = l, this.route = n, this.commands = [], null == e && t.setAttribute(i.nativeElement, "tabindex", "0")
        }
        set routerLink(l) {
            this.commands = null != l ? Array.isArray(l) ? l : [l] : []
        }
        set preserveQueryParams(l) {
            rn() && console && console.warn && console.warn("preserveQueryParams is deprecated!, use queryParamsHandling instead."), this.preserve = l
        }
        onClick() {
            const l = {
                skipLocationChange: kp(this.skipLocationChange),
                replaceUrl: kp(this.replaceUrl)
            };
            return this.router.navigateByUrl(this.urlTree, l), !0
        }
        get urlTree() {
            return this.router.createUrlTree(this.commands, {
                relativeTo: this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                preserveQueryParams: kp(this.preserve),
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: kp(this.preserveFragment)
            })
        }
    }
    class xp {
        constructor(l, n, e) {
            this.router = l, this.route = n, this.locationStrategy = e, this.commands = [], this.subscription = l.events.subscribe(l => {
                l instanceof td && this.updateTargetUrlAndHref()
            })
        }
        set routerLink(l) {
            this.commands = null != l ? Array.isArray(l) ? l : [l] : []
        }
        set preserveQueryParams(l) {
            rn() && console && console.warn && console.warn("preserveQueryParams is deprecated, use queryParamsHandling instead."), this.preserve = l
        }
        ngOnChanges(l) {
            this.updateTargetUrlAndHref()
        }
        ngOnDestroy() {
            this.subscription.unsubscribe()
        }
        onClick(l, n, e, t) {
            if (0 !== l || n || e || t) return !0;
            if ("string" == typeof this.target && "_self" != this.target) return !0;
            const i = {
                skipLocationChange: kp(this.skipLocationChange),
                replaceUrl: kp(this.replaceUrl),
                state: this.state
            };
            return this.router.navigateByUrl(this.urlTree, i), !1
        }
        updateTargetUrlAndHref() {
            this.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.urlTree))
        }
        get urlTree() {
            return this.router.createUrlTree(this.commands, {
                relativeTo: this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                preserveQueryParams: kp(this.preserve),
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: kp(this.preserveFragment)
            })
        }
    }

    function kp(l) {
        return "" === l || !!l
    }
    class Sp {
        constructor(l, n, e, t, i) {
            this.router = l, this.element = n, this.renderer = e, this.link = t, this.linkWithHref = i, this.classes = [], this.isActive = !1, this.routerLinkActiveOptions = {
                exact: !1
            }, this.subscription = l.events.subscribe(l => {
                l instanceof td && this.update()
            })
        }
        ngAfterContentInit() {
            this.links.changes.subscribe(l => this.update()), this.linksWithHrefs.changes.subscribe(l => this.update()), this.update()
        }
        set routerLinkActive(l) {
            const n = Array.isArray(l) ? l : l.split(" ");
            this.classes = n.filter(l => !!l)
        }
        ngOnChanges(l) {
            this.update()
        }
        ngOnDestroy() {
            this.subscription.unsubscribe()
        }
        update() {
            this.links && this.linksWithHrefs && this.router.navigated && Promise.resolve().then(() => {
                const l = this.hasActiveLinks();
                this.isActive !== l && (this.isActive = l, this.classes.forEach(n => {
                    l ? this.renderer.addClass(this.element.nativeElement, n) : this.renderer.removeClass(this.element.nativeElement, n)
                }))
            })
        }
        isLinkActive(l) {
            return n => l.isActive(n.urlTree, this.routerLinkActiveOptions.exact)
        }
        hasActiveLinks() {
            const l = this.isLinkActive(this.router);
            return this.link && l(this.link) || this.linkWithHref && l(this.linkWithHref) || this.links.some(l) || this.linksWithHrefs.some(l)
        }
    }
    class Cp {
        constructor() {
            this.outlet = null, this.route = null, this.resolver = null, this.children = new Ip, this.attachRef = null
        }
    }
    class Ip {
        constructor() {
            this.contexts = new Map
        }
        onChildOutletCreated(l, n) {
            const e = this.getOrCreateContext(l);
            e.outlet = n, this.contexts.set(l, e)
        }
        onChildOutletDestroyed(l) {
            const n = this.getContext(l);
            n && (n.outlet = null)
        }
        onOutletDeactivated() {
            const l = this.contexts;
            return this.contexts = new Map, l
        }
        onOutletReAttached(l) {
            this.contexts = l
        }
        getOrCreateContext(l) {
            let n = this.getContext(l);
            return n || (n = new Cp, this.contexts.set(l, n)), n
        }
        getContext(l) {
            return this.contexts.get(l) || null
        }
    }
    class Tp {
        constructor(l, n, e, t, i) {
            this.parentContexts = l, this.location = n, this.resolver = e, this.changeDetector = i, this.activated = null, this._activatedRoute = null, this.activateEvents = new qi, this.deactivateEvents = new qi, this.name = t || bd, l.onChildOutletCreated(this.name, this)
        }
        ngOnDestroy() {
            this.parentContexts.onChildOutletDestroyed(this.name)
        }
        ngOnInit() {
            if (!this.activated) {
                const l = this.parentContexts.getContext(this.name);
                l && l.route && (l.attachRef ? this.attach(l.attachRef, l.route) : this.activateWith(l.route, l.resolver || null))
            }
        }
        get isActivated() {
            return !!this.activated
        }
        get component() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this.activated.instance
        }
        get activatedRoute() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this._activatedRoute
        }
        get activatedRouteData() {
            return this._activatedRoute ? this._activatedRoute.snapshot.data : {}
        }
        detach() {
            if (!this.activated) throw new Error("Outlet is not activated");
            this.location.detach();
            const l = this.activated;
            return this.activated = null, this._activatedRoute = null, l
        }
        attach(l, n) {
            this.activated = l, this._activatedRoute = n, this.location.insert(l.hostView)
        }
        deactivate() {
            if (this.activated) {
                const l = this.component;
                this.activated.destroy(), this.activated = null, this._activatedRoute = null, this.deactivateEvents.emit(l)
            }
        }
        activateWith(l, n) {
            if (this.isActivated) throw new Error("Cannot activate an already activated outlet");
            this._activatedRoute = l;
            const e = (n = n || this.resolver).resolveComponentFactory(l._futureSnapshot.routeConfig.component),
                t = this.parentContexts.getOrCreateContext(this.name).children,
                i = new Ep(l, t, this.location.injector);
            this.activated = this.location.createComponent(e, this.location.length, i), this.changeDetector.markForCheck(), this.activateEvents.emit(this.activated.instance)
        }
    }
    class Ep {
        constructor(l, n, e) {
            this.route = l, this.childContexts = n, this.parent = e
        }
        get(l, n) {
            return l === oh ? this.route : l === Ip ? this.childContexts : this.parent.get(l, n)
        }
    }
    class Ap {}
    class Pp {
        preload(l, n) {
            return n().pipe(xo(() => Za(null)))
        }
    }
    class Dp {
        preload(l, n) {
            return Za(null)
        }
    }
    class Mp {
        constructor(l, n, e, t, i) {
            this.router = l, this.injector = t, this.preloadingStrategy = i, this.loader = new fp(n, e, n => l.triggerEvent(new dd(n)), n => l.triggerEvent(new hd(n)))
        }
        setUpPreloading() {
            this.subscription = this.router.events.pipe(io(l => l instanceof td), zo(() => this.preload())).subscribe(() => {})
        }
        preload() {
            const l = this.injector.get(jl);
            return this.processRoutes(l, this.router.config)
        }
        ngOnDestroy() {
            this.subscription.unsubscribe()
        }
        processRoutes(l, n) {
            const e = [];
            for (const t of n)
                if (t.loadChildren && !t.canLoad && t._loadedConfig) {
                    const l = t._loadedConfig;
                    e.push(this.processRoutes(l.module, l.routes))
                } else t.loadChildren && !t.canLoad ? e.push(this.preloadConfig(l, t)) : t.children && e.push(this.processRoutes(l, t.children));
            return G(e).pipe(Y(), U(l => void 0))
        }
        preloadConfig(l, n) {
            return this.preloadingStrategy.preload(n, () => this.loader.load(l.injector, n).pipe(W(l => (n._loadedConfig = l, this.processRoutes(l.module, l.routes)))))
        }
    }
    class Op {
        constructor(l, n, e = {}) {
            this.router = l, this.viewportScroller = n, this.options = e, this.lastId = 0, this.lastSource = "imperative", this.restoredId = 0, this.store = {}, e.scrollPositionRestoration = e.scrollPositionRestoration || "disabled", e.anchorScrolling = e.anchorScrolling || "disabled"
        }
        init() {
            "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.setHistoryScrollRestoration("manual"), this.routerEventsSubscription = this.createScrollEvents(), this.scrollEventsSubscription = this.consumeScrollEvents()
        }
        createScrollEvents() {
            return this.router.events.subscribe(l => {
                l instanceof ed ? (this.store[this.lastId] = this.viewportScroller.getScrollPosition(), this.lastSource = l.navigationTrigger, this.restoredId = l.restoredState ? l.restoredState.navigationId : 0) : l instanceof td && (this.lastId = l.id, this.scheduleScrollEvent(l, this.router.parseUrl(l.urlAfterRedirects).fragment))
            })
        }
        consumeScrollEvents() {
            return this.router.events.subscribe(l => {
                l instanceof yd && (l.position ? "top" === this.options.scrollPositionRestoration ? this.viewportScroller.scrollToPosition([0, 0]) : "enabled" === this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition(l.position) : l.anchor && "enabled" === this.options.anchorScrolling ? this.viewportScroller.scrollToAnchor(l.anchor) : "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition([0, 0]))
            })
        }
        scheduleScrollEvent(l, n) {
            this.router.triggerEvent(new yd(l, "popstate" === this.lastSource ? this.store[this.restoredId] : null, n))
        }
        ngOnDestroy() {
            this.routerEventsSubscription && this.routerEventsSubscription.unsubscribe(), this.scrollEventsSubscription && this.scrollEventsSubscription.unsubscribe()
        }
    }
    const Np = new El("ROUTER_CONFIGURATION"), Rp = new El("ROUTER_FORROOT_GUARD"), Bp = [zr, {
        provide: qd,
        useClass: Ud
    }, {
        provide: _p,
        useFactory: Hp,
        deps: [zs, qd, Ip, zr, Ln, Ls, us, pp, Np, [gp, new cl], [dp, new cl]]
    }, Ip, {
        provide: oh,
        useFactory: Vp,
        deps: [_p]
    }, {
        provide: Ls,
        useClass: Vs
    }, Mp, Dp, Pp, {
        provide: Np,
        useValue: {
            enableTracing: !1
        }
    }];

    function zp() {
        return new Ms("Router", _p)
    }
    class $p {
        constructor(l, n) {}
        static forRoot(l, n) {
            return {
                ngModule: $p,
                providers: [Bp, Up(l), {
                    provide: Rp,
                    useFactory: qp,
                    deps: [[_p, new cl, new hl]]
                }, {
                    provide: Np,
                    useValue: n || {}
                }, {
                    provide: Rr,
                    useFactory: Fp,
                    deps: [Or, [new ol(Br), new cl], Np]
                }, {
                    provide: Op,
                    useFactory: Lp,
                    deps: [_p, Va, Np]
                }, {
                    provide: Ap,
                    useExisting: n && n.preloadingStrategy ? n.preloadingStrategy : Dp
                }, {
                    provide: Ms,
                    multi: !0,
                    useFactory: zp
                }, [jp, {
                    provide: Vi,
                    multi: !0,
                    useFactory: Gp,
                    deps: [jp]
                }, {
                    provide: Kp,
                    useFactory: Wp,
                    deps: [jp]
                }, {
                    provide: Yi,
                    multi: !0,
                    useExisting: Kp
                }]]
            }
        }
        static forChild(l) {
            return {
                ngModule: $p,
                providers: [Up(l)]
            }
        }
    }

    function Lp(l, n, e) {
        return e.scrollOffset && n.setOffset(e.scrollOffset), new Op(l, n, e)
    }

    function Fp(l, n, e = {}) {
        return e.useHash ? new Lr(l, n) : new Fr(l, n)
    }

    function qp(l) {
        if (l) throw new Error("RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead.");
        return "guarded"
    }

    function Up(l) {
        return [{
            provide: Kn,
            multi: !0,
            useValue: l
        }, {
            provide: pp,
            multi: !0,
            useValue: l
        }]
    }

    function Hp(l, n, e, t, i, s, u, r, a = {}, o, c) {
        const d = new _p(null, n, e, t, i, s, u, Dd(r));
        if (o && (d.urlHandlingStrategy = o), c && (d.routeReuseStrategy = c), a.errorHandler && (d.errorHandler = a.errorHandler), a.malformedUriErrorHandler && (d.malformedUriErrorHandler = a.malformedUriErrorHandler), a.enableTracing) {
            const l = qo();
            d.events.subscribe(n => {
                l.logGroup(`Router Event: ${n.constructor.name}`), l.log(n.toString()), l.log(n), l.logGroupEnd()
            })
        }
        return a.onSameUrlNavigation && (d.onSameUrlNavigation = a.onSameUrlNavigation), a.paramsInheritanceStrategy && (d.paramsInheritanceStrategy = a.paramsInheritanceStrategy), a.urlUpdateStrategy && (d.urlUpdateStrategy = a.urlUpdateStrategy), a.relativeLinkResolution && (d.relativeLinkResolution = a.relativeLinkResolution), d
    }

    function Vp(l) {
        return l.routerState.root
    }
    class jp {
        constructor(l) {
            this.injector = l, this.initNavigation = !1, this.resultOfPreactivationDone = new T
        }
        appInitializer() {
            return this.injector.get(Nr, Promise.resolve(null)).then(() => {
                let l = null;
                const n = new Promise(n => l = n),
                    e = this.injector.get(_p),
                    t = this.injector.get(Np);
                if (this.isLegacyDisabled(t) || this.isLegacyEnabled(t)) l(!0);
                else if ("disabled" === t.initialNavigation) e.setUpLocationChangeListener(), l(!0);
                else {
                    if ("enabled" !== t.initialNavigation) throw new Error(`Invalid initialNavigation options: '${t.initialNavigation}'`);
                    e.hooks.afterPreactivation = () => this.initNavigation ? Za(null) : (this.initNavigation = !0, l(!0), this.resultOfPreactivationDone), e.initialNavigation()
                }
                return n
            })
        }
        bootstrapListener(l) {
            const n = this.injector.get(Np),
                e = this.injector.get(Mp),
                t = this.injector.get(Op),
                i = this.injector.get(_p),
                s = this.injector.get(zs);
            l === s.components[0] && (this.isLegacyEnabled(n) ? i.initialNavigation() : this.isLegacyDisabled(n) && i.setUpLocationChangeListener(), e.setUpPreloading(), t.init(), i.resetRootComponentType(s.componentTypes[0]), this.resultOfPreactivationDone.next(null), this.resultOfPreactivationDone.complete())
        }
        isLegacyEnabled(l) {
            return "legacy_enabled" === l.initialNavigation || !0 === l.initialNavigation || void 0 === l.initialNavigation
        }
        isLegacyDisabled(l) {
            return "legacy_disabled" === l.initialNavigation || !1 === l.initialNavigation
        }
    }

    function Gp(l) {
        return l.appInitializer.bind(l)
    }

    function Wp(l) {
        return l.bootstrapListener.bind(l)
    }
    const Kp = new El("Router Initializer");
    var Zp = st({
        encapsulation: 2,
        styles: [],
        data: {}
    });

    function Qp(l) {
        return ku(0, [(l()(), su(0, 16777216, null, null, 1, "router-outlet", [], null, null, null, null, null)), gi(1, 212992, null, 0, Tp, [Ip, Fe, ce, [8, null], Rn], null, null)], (function (l, n) {
            l(n, 1, 0)
        }), null)
    }

    function Yp(l) {
        return ku(0, [(l()(), su(0, 0, null, null, 1, "ng-component", [], null, null, null, Qp, Zp)), gi(1, 49152, null, 0, vd, [], null, null)], null, null)
    }
    var Xp = jt("ng-component", vd, Yp, {}, {}, []); class Jp extends q {
        constructor(l, n) {
            super(l), this.sources = n, this.completed = 0, this.haveValues = 0;
            const e = n.length;
            this.values = new Array(e);
            for (let t = 0; t < e; t++) {
                const l = F(this, n[t], null, t);
                l && this.add(l)
            }
        }
        notifyNext(l, n, e, t, i) {
            this.values[e] = n, i._hasValue || (i._hasValue = !0, this.haveValues++)
        }
        notifyComplete(l) {
            const {
                destination: n,
                haveValues: e,
                values: t
            } = this, i = t.length;
            l._hasValue ? (this.completed++, this.completed === i && (e === i && n.next(t), n.complete())) : n.complete()
        }
    }
    const lf = new El("NgValueAccessor"); class nf {
        constructor(l, n) {
            this._renderer = l, this._elementRef = n, this.onChange = l => {}, this.onTouched = () => {}
        }
        writeValue(l) {
            this._renderer.setProperty(this._elementRef.nativeElement, "checked", l)
        }
        registerOnChange(l) {
            this.onChange = l
        }
        registerOnTouched(l) {
            this.onTouched = l
        }
        setDisabledState(l) {
            this._renderer.setProperty(this._elementRef.nativeElement, "disabled", l)
        }
    }
    const ef = new El("CompositionEventMode"); class tf {
        constructor(l, n, e) {
            this._renderer = l, this._elementRef = n, this._compositionMode = e, this.onChange = l => {}, this.onTouched = () => {}, this._composing = !1, null == this._compositionMode && (this._compositionMode = ! function () {
                const l = qo() ? qo().getUserAgent() : "";
                return /android (\d+)/.test(l.toLowerCase())
            }())
        }
        writeValue(l) {
            this._renderer.setProperty(this._elementRef.nativeElement, "value", null == l ? "" : l)
        }
        registerOnChange(l) {
            this.onChange = l
        }
        registerOnTouched(l) {
            this.onTouched = l
        }
        setDisabledState(l) {
            this._renderer.setProperty(this._elementRef.nativeElement, "disabled", l)
        }
        _handleInput(l) {
            (!this._compositionMode || this._compositionMode && !this._composing) && this.onChange(l)
        }
        _compositionStart() {
            this._composing = !0
        }
        _compositionEnd(l) {
            this._composing = !1, this._compositionMode && this.onChange(l)
        }
    }
    class sf {
        get value() {
            return this.control ? this.control.value : null
        }
        get valid() {
            return this.control ? this.control.valid : null
        }
        get invalid() {
            return this.control ? this.control.invalid : null
        }
        get pending() {
            return this.control ? this.control.pending : null
        }
        get disabled() {
            return this.control ? this.control.disabled : null
        }
        get enabled() {
            return this.control ? this.control.enabled : null
        }
        get errors() {
            return this.control ? this.control.errors : null
        }
        get pristine() {
            return this.control ? this.control.pristine : null
        }
        get dirty() {
            return this.control ? this.control.dirty : null
        }
        get touched() {
            return this.control ? this.control.touched : null
        }
        get status() {
            return this.control ? this.control.status : null
        }
        get untouched() {
            return this.control ? this.control.untouched : null
        }
        get statusChanges() {
            return this.control ? this.control.statusChanges : null
        }
        get valueChanges() {
            return this.control ? this.control.valueChanges : null
        }
        get path() {
            return null
        }
        reset(l) {
            this.control && this.control.reset(l)
        }
        hasError(l, n) {
            return !!this.control && this.control.hasError(l, n)
        }
        getError(l, n) {
            return this.control ? this.control.getError(l, n) : null
        }
    }
    class uf extends sf {
        get formDirective() {
            return null
        }
        get path() {
            return null
        }
    }

    function rf() {
        throw new Error("unimplemented")
    }
    class af extends sf {
        constructor() {
            super(...arguments), this._parent = null, this.name = null, this.valueAccessor = null, this._rawValidators = [], this._rawAsyncValidators = []
        }
        get validator() {
            return rf()
        }
        get asyncValidator() {
            return rf()
        }
    }
    class of {
        constructor(l) {
            this._cd = l
        }
        get ngClassUntouched() {
            return !!this._cd.control && this._cd.control.untouched
        }
        get ngClassTouched() {
            return !!this._cd.control && this._cd.control.touched
        }
        get ngClassPristine() {
            return !!this._cd.control && this._cd.control.pristine
        }
        get ngClassDirty() {
            return !!this._cd.control && this._cd.control.dirty
        }
        get ngClassValid() {
            return !!this._cd.control && this._cd.control.valid
        }
        get ngClassInvalid() {
            return !!this._cd.control && this._cd.control.invalid
        }
        get ngClassPending() {
            return !!this._cd.control && this._cd.control.pending
        }
    }
    class cf extends of {
        constructor(l) {
            super(l)
        }
    }

    function df(l) {
        return null == l || 0 === l.length
    }
    const hf = new El("NgValidators"), pf = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/; class ff {
        static min(l) {
            return n => {
                if (df(n.value) || df(l)) return null;
                const e = parseFloat(n.value);
                return !isNaN(e) && e < l ? {
                    min: {
                        min: l,
                        actual: n.value
                    }
                } : null
            }
        }
        static max(l) {
            return n => {
                if (df(n.value) || df(l)) return null;
                const e = parseFloat(n.value);
                return !isNaN(e) && e > l ? {
                    max: {
                        max: l,
                        actual: n.value
                    }
                } : null
            }
        }
        static required(l) {
            return df(l.value) ? {
                required: !0
            } : null
        }
        static requiredTrue(l) {
            return !0 === l.value ? null : {
                required: !0
            }
        }
        static email(l) {
            return df(l.value) ? null : pf.test(l.value) ? null : {
                email: !0
            }
        }
        static minLength(l) {
            return n => {
                if (df(n.value)) return null;
                const e = n.value ? n.value.length : 0;
                return e < l ? {
                    minlength: {
                        requiredLength: l,
                        actualLength: e
                    }
                } : null
            }
        }
        static maxLength(l) {
            return n => {
                const e = n.value ? n.value.length : 0;
                return e > l ? {
                    maxlength: {
                        requiredLength: l,
                        actualLength: e
                    }
                } : null
            }
        }
        static pattern(l) {
            if (!l) return ff.nullValidator;
            let n, e;
            return "string" == typeof l ? (e = "", "^" !== l.charAt(0) && (e += "^"), e += l, "$" !== l.charAt(l.length - 1) && (e += "$"), n = new RegExp(e)) : (e = l.toString(), n = l), l => {
                if (df(l.value)) return null;
                const t = l.value;
                return n.test(t) ? null : {
                    pattern: {
                        requiredPattern: e,
                        actualValue: t
                    }
                }
            }
        }
        static nullValidator(l) {
            return null
        }
        static compose(l) {
            if (!l) return null;
            const n = l.filter(gf);
            return 0 == n.length ? null : function (l) {
                return yf(function (l, n) {
                    return n.map(n => n(l))
                }(l, n))
            }
        }
        static composeAsync(l) {
            if (!l) return null;
            const n = l.filter(gf);
            return 0 == n.length ? null : function (l) {
                return function l(...n) {
                    let e;
                    return "function" == typeof n[n.length - 1] && (e = n.pop()), 1 === n.length && a(n[0]) && (n = n[0]), 0 === n.length ? Ga : e ? l(n).pipe(U(l => e(...l))) : new w(l => new Jp(l, n))
                }(function (l, n) {
                    return n.map(n => n(l))
                }(l, n).map(mf)).pipe(U(yf))
            }
        }
    }

    function gf(l) {
        return null != l
    }

    function mf(l) {
        const n = ee(l) ? G(l) : l;
        if (!te(n)) throw new Error("Expected validator to return Promise or Observable.");
        return n
    }

    function yf(l) {
        const n = l.reduce((l, n) => null != n ? Object.assign({}, l, n) : l, {});
        return 0 === Object.keys(n).length ? null : n
    }

    function vf(l) {
        return l.validate ? n => l.validate(n) : l
    }

    function bf(l) {
        return l.validate ? n => l.validate(n) : l
    }
    class _f {
        constructor(l, n) {
            this._renderer = l, this._elementRef = n, this.onChange = l => {}, this.onTouched = () => {}
        }
        writeValue(l) {
            this._renderer.setProperty(this._elementRef.nativeElement, "value", null == l ? "" : l)
        }
        registerOnChange(l) {
            this.onChange = n => {
                l("" == n ? null : parseFloat(n))
            }
        }
        registerOnTouched(l) {
            this.onTouched = l
        }
        setDisabledState(l) {
            this._renderer.setProperty(this._elementRef.nativeElement, "disabled", l)
        }
    }
    class wf {
        constructor() {
            this._accessors = []
        }
        add(l, n) {
            this._accessors.push([l, n])
        }
        remove(l) {
            for (let n = this._accessors.length - 1; n >= 0; --n)
                if (this._accessors[n][1] === l) return void this._accessors.splice(n, 1)
        }
        select(l) {
            this._accessors.forEach(n => {
                this._isSameGroup(n, l) && n[1] !== l && n[1].fireUncheck(l.value)
            })
        }
        _isSameGroup(l, n) {
            return !!l[0].control && l[0]._parent === n._control._parent && l[1].name === n.name
        }
    }
    class xf {
        constructor(l, n, e, t) {
            this._renderer = l, this._elementRef = n, this._registry = e, this._injector = t, this.onChange = () => {}, this.onTouched = () => {}
        }
        ngOnInit() {
            this._control = this._injector.get(af), this._checkName(), this._registry.add(this._control, this)
        }
        ngOnDestroy() {
            this._registry.remove(this)
        }
        writeValue(l) {
            this._state = l === this.value, this._renderer.setProperty(this._elementRef.nativeElement, "checked", this._state)
        }
        registerOnChange(l) {
            this._fn = l, this.onChange = () => {
                l(this.value), this._registry.select(this)
            }
        }
        fireUncheck(l) {
            this.writeValue(l)
        }
        registerOnTouched(l) {
            this.onTouched = l
        }
        setDisabledState(l) {
            this._renderer.setProperty(this._elementRef.nativeElement, "disabled", l)
        }
        _checkName() {
            this.name && this.formControlName && this.name !== this.formControlName && this._throwNameError(), !this.name && this.formControlName && (this.name = this.formControlName)
        }
        _throwNameError() {
            throw new Error('\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type="radio" formControlName="food" name="food">\n    ')
        }
    }
    const kf = {
        formControlName: '\n    <div [formGroup]="myGroup">\n      <input formControlName="firstName">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });',
        formGroupName: '\n    <div [formGroup]="myGroup">\n       <div formGroupName="person">\n          <input formControlName="firstName">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });',
        formArrayName: '\n    <div [formGroup]="myGroup">\n      <div formArrayName="cities">\n        <div *ngFor="let city of cityArray.controls; index as i">\n          <input [formControlName]="i">\n        </div>\n      </div>\n    </div>\n\n    In your class:\n\n    this.cityArray = new FormArray([new FormControl(\'SF\')]);\n    this.myGroup = new FormGroup({\n      cities: this.cityArray\n    });',
        ngModelGroup: '\n    <form>\n       <div ngModelGroup="person">\n          <input [(ngModel)]="person.name" name="firstName">\n       </div>\n    </form>',
        ngModelWithFormGroup: '\n    <div [formGroup]="myGroup">\n       <input formControlName="firstName">\n       <input [(ngModel)]="showMoreControls" [ngModelOptions]="{standalone: true}">\n    </div>\n  '
    };

    function Sf(l, n) {
        return null == l ? `${n}` : (n && "object" == typeof n && (n = "Object"), `${l}: ${n}`.slice(0, 50))
    }
    class Cf {
        constructor(l, n) {
            this._renderer = l, this._elementRef = n, this._optionMap = new Map, this._idCounter = 0, this.onChange = l => {}, this.onTouched = () => {}, this._compareWith = Yn
        }
        set compareWith(l) {
            if ("function" != typeof l) throw new Error(`compareWith must be a function, but received ${JSON.stringify(l)}`);
            this._compareWith = l
        }
        writeValue(l) {
            this.value = l;
            const n = this._getOptionId(l);
            null == n && this._renderer.setProperty(this._elementRef.nativeElement, "selectedIndex", -1);
            const e = Sf(n, l);
            this._renderer.setProperty(this._elementRef.nativeElement, "value", e)
        }
        registerOnChange(l) {
            this.onChange = n => {
                this.value = this._getOptionValue(n), l(this.value)
            }
        }
        registerOnTouched(l) {
            this.onTouched = l
        }
        setDisabledState(l) {
            this._renderer.setProperty(this._elementRef.nativeElement, "disabled", l)
        }
        _registerOption() {
            return (this._idCounter++).toString()
        }
        _getOptionId(l) {
            for (const n of Array.from(this._optionMap.keys()))
                if (this._compareWith(this._optionMap.get(n), l)) return n;
            return null
        }
        _getOptionValue(l) {
            const n = function (l) {
                return l.split(":")[0]
            }(l);
            return this._optionMap.has(n) ? this._optionMap.get(n) : l
        }
    }
    class If {
        constructor(l, n, e) {
            this._element = l, this._renderer = n, this._select = e, this._select && (this.id = this._select._registerOption())
        }
        set ngValue(l) {
            null != this._select && (this._select._optionMap.set(this.id, l), this._setElementValue(Sf(this.id, l)), this._select.writeValue(this._select.value))
        }
        set value(l) {
            this._setElementValue(l), this._select && this._select.writeValue(this._select.value)
        }
        _setElementValue(l) {
            this._renderer.setProperty(this._element.nativeElement, "value", l)
        }
        ngOnDestroy() {
            this._select && (this._select._optionMap.delete(this.id), this._select.writeValue(this._select.value))
        }
    }

    function Tf(l, n) {
        return null == l ? `${n}` : ("string" == typeof n && (n = `'${n}'`), n && "object" == typeof n && (n = "Object"), `${l}: ${n}`.slice(0, 50))
    }
    class Ef {
        constructor(l, n, e) {
            this._element = l, this._renderer = n, this._select = e, this._select && (this.id = this._select._registerOption(this))
        }
        set ngValue(l) {
            null != this._select && (this._value = l, this._setElementValue(Tf(this.id, l)), this._select.writeValue(this._select.value))
        }
        set value(l) {
            this._select ? (this._value = l, this._setElementValue(Tf(this.id, l)), this._select.writeValue(this._select.value)) : this._setElementValue(l)
        }
        _setElementValue(l) {
            this._renderer.setProperty(this._element.nativeElement, "value", l)
        }
        _setSelected(l) {
            this._renderer.setProperty(this._element.nativeElement, "selected", l)
        }
        ngOnDestroy() {
            this._select && (this._select._optionMap.delete(this.id), this._select.writeValue(this._select.value))
        }
    }

    function Af(l, n) {
        return [...n.path, l]
    }

    function Pf(l, n) {
        l || Mf(n, "Cannot find control with"), n.valueAccessor || Mf(n, "No value accessor for form control with"), l.validator = ff.compose([l.validator, n.validator]), l.asyncValidator = ff.composeAsync([l.asyncValidator, n.asyncValidator]), n.valueAccessor.writeValue(l.value),
            function (l, n) {
                n.valueAccessor.registerOnChange(e => {
                    l._pendingValue = e, l._pendingChange = !0, l._pendingDirty = !0, "change" === l.updateOn && Df(l, n)
                })
            }(l, n),
            function (l, n) {
                l.registerOnChange((l, e) => {
                    n.valueAccessor.writeValue(l), e && n.viewToModelUpdate(l)
                })
            }(l, n),
            function (l, n) {
                n.valueAccessor.registerOnTouched(() => {
                    l._pendingTouched = !0, "blur" === l.updateOn && l._pendingChange && Df(l, n), "submit" !== l.updateOn && l.markAsTouched()
                })
            }(l, n), n.valueAccessor.setDisabledState && l.registerOnDisabledChange(l => {
                n.valueAccessor.setDisabledState(l)
            }), n._rawValidators.forEach(n => {
                n.registerOnValidatorChange && n.registerOnValidatorChange(() => l.updateValueAndValidity())
            }), n._rawAsyncValidators.forEach(n => {
                n.registerOnValidatorChange && n.registerOnValidatorChange(() => l.updateValueAndValidity())
            })
    }

    function Df(l, n) {
        l._pendingDirty && l.markAsDirty(), l.setValue(l._pendingValue, {
            emitModelToViewChange: !1
        }), n.viewToModelUpdate(l._pendingValue), l._pendingChange = !1
    }

    function Mf(l, n) {
        let e;
        throw e = l.path.length > 1 ? `path: '${l.path.join(" -> ")}'` : l.path[0] ? `name: '${l.path}'` : "unspecified name attribute", new Error(`${n} ${e}`)
    }

    function Of(l) {
        return null != l ? ff.compose(l.map(vf)) : null
    }

    function Nf(l) {
        return null != l ? ff.composeAsync(l.map(bf)) : null
    }
    const Rf = [nf, class {
        constructor(l, n) {
            this._renderer = l, this._elementRef = n, this.onChange = l => {}, this.onTouched = () => {}
        }
        writeValue(l) {
            this._renderer.setProperty(this._elementRef.nativeElement, "value", parseFloat(l))
        }
        registerOnChange(l) {
            this.onChange = n => {
                l("" == n ? null : parseFloat(n))
            }
        }
        registerOnTouched(l) {
            this.onTouched = l
        }
        setDisabledState(l) {
            this._renderer.setProperty(this._elementRef.nativeElement, "disabled", l)
        }
    }, _f, Cf, class {
        constructor(l, n) {
            this._renderer = l, this._elementRef = n, this._optionMap = new Map, this._idCounter = 0, this.onChange = l => {}, this.onTouched = () => {}, this._compareWith = Yn
        }
        set compareWith(l) {
            if ("function" != typeof l) throw new Error(`compareWith must be a function, but received ${JSON.stringify(l)}`);
            this._compareWith = l
        }
        writeValue(l) {
            let n;
            if (this.value = l, Array.isArray(l)) {
                const e = l.map(l => this._getOptionId(l));
                n = (l, n) => {
                    l._setSelected(e.indexOf(n.toString()) > -1)
                }
            } else n = (l, n) => {
                l._setSelected(!1)
            };
            this._optionMap.forEach(n)
        }
        registerOnChange(l) {
            this.onChange = n => {
                const e = [];
                if (n.hasOwnProperty("selectedOptions")) {
                    const l = n.selectedOptions;
                    for (let n = 0; n < l.length; n++) {
                        const t = l.item(n),
                            i = this._getOptionValue(t.value);
                        e.push(i)
                    }
                } else {
                    const l = n.options;
                    for (let n = 0; n < l.length; n++) {
                        const t = l.item(n);
                        if (t.selected) {
                            const l = this._getOptionValue(t.value);
                            e.push(l)
                        }
                    }
                }
                this.value = e, l(e)
            }
        }
        registerOnTouched(l) {
            this.onTouched = l
        }
        setDisabledState(l) {
            this._renderer.setProperty(this._elementRef.nativeElement, "disabled", l)
        }
        _registerOption(l) {
            const n = (this._idCounter++).toString();
            return this._optionMap.set(n, l), n
        }
        _getOptionId(l) {
            for (const n of Array.from(this._optionMap.keys()))
                if (this._compareWith(this._optionMap.get(n)._value, l)) return n;
            return null
        }
        _getOptionValue(l) {
            const n = function (l) {
                return l.split(":")[0]
            }(l);
            return this._optionMap.has(n) ? this._optionMap.get(n)._value : l
        }
    }, xf], Bf = "VALID", zf = "INVALID", $f = "PENDING", Lf = "DISABLED";

    function Ff(l) {
        const n = Uf(l) ? l.validators : l;
        return Array.isArray(n) ? Of(n) : n || null
    }

    function qf(l, n) {
        const e = Uf(n) ? n.asyncValidators : l;
        return Array.isArray(e) ? Nf(e) : e || null
    }

    function Uf(l) {
        return null != l && !Array.isArray(l) && "object" == typeof l
    }
    class Hf {
        constructor(l, n) {
            this.validator = l, this.asyncValidator = n, this._onCollectionChange = () => {}, this.pristine = !0, this.touched = !1, this._onDisabledChange = []
        }
        get parent() {
            return this._parent
        }
        get valid() {
            return this.status === Bf
        }
        get invalid() {
            return this.status === zf
        }
        get pending() {
            return this.status == $f
        }
        get disabled() {
            return this.status === Lf
        }
        get enabled() {
            return this.status !== Lf
        }
        get dirty() {
            return !this.pristine
        }
        get untouched() {
            return !this.touched
        }
        get updateOn() {
            return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change"
        }
        setValidators(l) {
            this.validator = Ff(l)
        }
        setAsyncValidators(l) {
            this.asyncValidator = qf(l)
        }
        clearValidators() {
            this.validator = null
        }
        clearAsyncValidators() {
            this.asyncValidator = null
        }
        markAsTouched(l = {}) {
            this.touched = !0, this._parent && !l.onlySelf && this._parent.markAsTouched(l)
        }
        markAllAsTouched() {
            this.markAsTouched({
                onlySelf: !0
            }), this._forEachChild(l => l.markAllAsTouched())
        }
        markAsUntouched(l = {}) {
            this.touched = !1, this._pendingTouched = !1, this._forEachChild(l => {
                l.markAsUntouched({
                    onlySelf: !0
                })
            }), this._parent && !l.onlySelf && this._parent._updateTouched(l)
        }
        markAsDirty(l = {}) {
            this.pristine = !1, this._parent && !l.onlySelf && this._parent.markAsDirty(l)
        }
        markAsPristine(l = {}) {
            this.pristine = !0, this._pendingDirty = !1, this._forEachChild(l => {
                l.markAsPristine({
                    onlySelf: !0
                })
            }), this._parent && !l.onlySelf && this._parent._updatePristine(l)
        }
        markAsPending(l = {}) {
            this.status = $f, !1 !== l.emitEvent && this.statusChanges.emit(this.status), this._parent && !l.onlySelf && this._parent.markAsPending(l)
        }
        disable(l = {}) {
            const n = this._parentMarkedDirty(l.onlySelf);
            this.status = Lf, this.errors = null, this._forEachChild(n => {
                n.disable(Object.assign({}, l, {
                    onlySelf: !0
                }))
            }), this._updateValue(), !1 !== l.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._updateAncestors(Object.assign({}, l, {
                skipPristineCheck: n
            })), this._onDisabledChange.forEach(l => l(!0))
        }
        enable(l = {}) {
            const n = this._parentMarkedDirty(l.onlySelf);
            this.status = Bf, this._forEachChild(n => {
                n.enable(Object.assign({}, l, {
                    onlySelf: !0
                }))
            }), this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: l.emitEvent
            }), this._updateAncestors(Object.assign({}, l, {
                skipPristineCheck: n
            })), this._onDisabledChange.forEach(l => l(!1))
        }
        _updateAncestors(l) {
            this._parent && !l.onlySelf && (this._parent.updateValueAndValidity(l), l.skipPristineCheck || this._parent._updatePristine(), this._parent._updateTouched())
        }
        setParent(l) {
            this._parent = l
        }
        updateValueAndValidity(l = {}) {
            this._setInitialStatus(), this._updateValue(), this.enabled && (this._cancelExistingSubscription(), this.errors = this._runValidator(), this.status = this._calculateStatus(), this.status !== Bf && this.status !== $f || this._runAsyncValidator(l.emitEvent)), !1 !== l.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._parent && !l.onlySelf && this._parent.updateValueAndValidity(l)
        }
        _updateTreeValidity(l = {
            emitEvent: !0
        }) {
            this._forEachChild(n => n._updateTreeValidity(l)), this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: l.emitEvent
            })
        }
        _setInitialStatus() {
            this.status = this._allControlsDisabled() ? Lf : Bf
        }
        _runValidator() {
            return this.validator ? this.validator(this) : null
        }
        _runAsyncValidator(l) {
            if (this.asyncValidator) {
                this.status = $f;
                const n = mf(this.asyncValidator(this));
                this._asyncValidationSubscription = n.subscribe(n => this.setErrors(n, {
                    emitEvent: l
                }))
            }
        }
        _cancelExistingSubscription() {
            this._asyncValidationSubscription && this._asyncValidationSubscription.unsubscribe()
        }
        setErrors(l, n = {}) {
            this.errors = l, this._updateControlsErrors(!1 !== n.emitEvent)
        }
        get(l) {
            return function (l, n, e) {
                return null == n ? null : (n instanceof Array || (n = n.split(".")), n instanceof Array && 0 === n.length ? null : n.reduce((l, n) => l instanceof jf ? l.controls.hasOwnProperty(n) ? l.controls[n] : null : l instanceof Gf && l.at(n) || null, l))
            }(this, l)
        }
        getError(l, n) {
            const e = n ? this.get(n) : this;
            return e && e.errors ? e.errors[l] : null
        }
        hasError(l, n) {
            return !!this.getError(l, n)
        }
        get root() {
            let l = this;
            for (; l._parent;) l = l._parent;
            return l
        }
        _updateControlsErrors(l) {
            this.status = this._calculateStatus(), l && this.statusChanges.emit(this.status), this._parent && this._parent._updateControlsErrors(l)
        }
        _initObservables() {
            this.valueChanges = new qi, this.statusChanges = new qi
        }
        _calculateStatus() {
            return this._allControlsDisabled() ? Lf : this.errors ? zf : this._anyControlsHaveStatus($f) ? $f : this._anyControlsHaveStatus(zf) ? zf : Bf
        }
        _anyControlsHaveStatus(l) {
            return this._anyControls(n => n.status === l)
        }
        _anyControlsDirty() {
            return this._anyControls(l => l.dirty)
        }
        _anyControlsTouched() {
            return this._anyControls(l => l.touched)
        }
        _updatePristine(l = {}) {
            this.pristine = !this._anyControlsDirty(), this._parent && !l.onlySelf && this._parent._updatePristine(l)
        }
        _updateTouched(l = {}) {
            this.touched = this._anyControlsTouched(), this._parent && !l.onlySelf && this._parent._updateTouched(l)
        }
        _isBoxedValue(l) {
            return "object" == typeof l && null !== l && 2 === Object.keys(l).length && "value" in l && "disabled" in l
        }
        _registerOnCollectionChange(l) {
            this._onCollectionChange = l
        }
        _setUpdateStrategy(l) {
            Uf(l) && null != l.updateOn && (this._updateOn = l.updateOn)
        }
        _parentMarkedDirty(l) {
            return !l && this._parent && this._parent.dirty && !this._parent._anyControlsDirty()
        }
    }
    class Vf extends Hf {
        constructor(l = null, n, e) {
            super(Ff(n), qf(e, n)), this._onChange = [], this._applyFormState(l), this._setUpdateStrategy(n), this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: !1
            }), this._initObservables()
        }
        setValue(l, n = {}) {
            this.value = this._pendingValue = l, this._onChange.length && !1 !== n.emitModelToViewChange && this._onChange.forEach(l => l(this.value, !1 !== n.emitViewToModelChange)), this.updateValueAndValidity(n)
        }
        patchValue(l, n = {}) {
            this.setValue(l, n)
        }
        reset(l = null, n = {}) {
            this._applyFormState(l), this.markAsPristine(n), this.markAsUntouched(n), this.setValue(this.value, n), this._pendingChange = !1
        }
        _updateValue() {}
        _anyControls(l) {
            return !1
        }
        _allControlsDisabled() {
            return this.disabled
        }
        registerOnChange(l) {
            this._onChange.push(l)
        }
        _clearChangeFns() {
            this._onChange = [], this._onDisabledChange = [], this._onCollectionChange = () => {}
        }
        registerOnDisabledChange(l) {
            this._onDisabledChange.push(l)
        }
        _forEachChild(l) {}
        _syncPendingControls() {
            return !("submit" !== this.updateOn || (this._pendingDirty && this.markAsDirty(), this._pendingTouched && this.markAsTouched(), !this._pendingChange) || (this.setValue(this._pendingValue, {
                onlySelf: !0,
                emitModelToViewChange: !1
            }), 0))
        }
        _applyFormState(l) {
            this._isBoxedValue(l) ? (this.value = this._pendingValue = l.value, l.disabled ? this.disable({
                onlySelf: !0,
                emitEvent: !1
            }) : this.enable({
                onlySelf: !0,
                emitEvent: !1
            })) : this.value = this._pendingValue = l
        }
    }
    class jf extends Hf {
        constructor(l, n, e) {
            super(Ff(n), qf(e, n)), this.controls = l, this._initObservables(), this._setUpdateStrategy(n), this._setUpControls(), this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: !1
            })
        }
        registerControl(l, n) {
            return this.controls[l] ? this.controls[l] : (this.controls[l] = n, n.setParent(this), n._registerOnCollectionChange(this._onCollectionChange), n)
        }
        addControl(l, n) {
            this.registerControl(l, n), this.updateValueAndValidity(), this._onCollectionChange()
        }
        removeControl(l) {
            this.controls[l] && this.controls[l]._registerOnCollectionChange(() => {}), delete this.controls[l], this.updateValueAndValidity(), this._onCollectionChange()
        }
        setControl(l, n) {
            this.controls[l] && this.controls[l]._registerOnCollectionChange(() => {}), delete this.controls[l], n && this.registerControl(l, n), this.updateValueAndValidity(), this._onCollectionChange()
        }
        contains(l) {
            return this.controls.hasOwnProperty(l) && this.controls[l].enabled
        }
        setValue(l, n = {}) {
            this._checkAllValuesPresent(l), Object.keys(l).forEach(e => {
                this._throwIfControlMissing(e), this.controls[e].setValue(l[e], {
                    onlySelf: !0,
                    emitEvent: n.emitEvent
                })
            }), this.updateValueAndValidity(n)
        }
        patchValue(l, n = {}) {
            Object.keys(l).forEach(e => {
                this.controls[e] && this.controls[e].patchValue(l[e], {
                    onlySelf: !0,
                    emitEvent: n.emitEvent
                })
            }), this.updateValueAndValidity(n)
        }
        reset(l = {}, n = {}) {
            this._forEachChild((e, t) => {
                e.reset(l[t], {
                    onlySelf: !0,
                    emitEvent: n.emitEvent
                })
            }), this._updatePristine(n), this._updateTouched(n), this.updateValueAndValidity(n)
        }
        getRawValue() {
            return this._reduceChildren({}, (l, n, e) => (l[e] = n instanceof Vf ? n.value : n.getRawValue(), l))
        }
        _syncPendingControls() {
            let l = this._reduceChildren(!1, (l, n) => !!n._syncPendingControls() || l);
            return l && this.updateValueAndValidity({
                onlySelf: !0
            }), l
        }
        _throwIfControlMissing(l) {
            if (!Object.keys(this.controls).length) throw new Error("\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
            if (!this.controls[l]) throw new Error(`Cannot find form control with name: ${l}.`)
        }
        _forEachChild(l) {
            Object.keys(this.controls).forEach(n => l(this.controls[n], n))
        }
        _setUpControls() {
            this._forEachChild(l => {
                l.setParent(this), l._registerOnCollectionChange(this._onCollectionChange)
            })
        }
        _updateValue() {
            this.value = this._reduceValue()
        }
        _anyControls(l) {
            let n = !1;
            return this._forEachChild((e, t) => {
                n = n || this.contains(t) && l(e)
            }), n
        }
        _reduceValue() {
            return this._reduceChildren({}, (l, n, e) => ((n.enabled || this.disabled) && (l[e] = n.value), l))
        }
        _reduceChildren(l, n) {
            let e = l;
            return this._forEachChild((l, t) => {
                e = n(e, l, t)
            }), e
        }
        _allControlsDisabled() {
            for (const l of Object.keys(this.controls))
                if (this.controls[l].enabled) return !1;
            return Object.keys(this.controls).length > 0 || this.disabled
        }
        _checkAllValuesPresent(l) {
            this._forEachChild((n, e) => {
                if (void 0 === l[e]) throw new Error(`Must supply a value for form control with name: '${e}'.`)
            })
        }
    }
    class Gf extends Hf {
        constructor(l, n, e) {
            super(Ff(n), qf(e, n)), this.controls = l, this._initObservables(), this._setUpdateStrategy(n), this._setUpControls(), this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: !1
            })
        }
        at(l) {
            return this.controls[l]
        }
        push(l) {
            this.controls.push(l), this._registerControl(l), this.updateValueAndValidity(), this._onCollectionChange()
        }
        insert(l, n) {
            this.controls.splice(l, 0, n), this._registerControl(n), this.updateValueAndValidity()
        }
        removeAt(l) {
            this.controls[l] && this.controls[l]._registerOnCollectionChange(() => {}), this.controls.splice(l, 1), this.updateValueAndValidity()
        }
        setControl(l, n) {
            this.controls[l] && this.controls[l]._registerOnCollectionChange(() => {}), this.controls.splice(l, 1), n && (this.controls.splice(l, 0, n), this._registerControl(n)), this.updateValueAndValidity(), this._onCollectionChange()
        }
        get length() {
            return this.controls.length
        }
        setValue(l, n = {}) {
            this._checkAllValuesPresent(l), l.forEach((l, e) => {
                this._throwIfControlMissing(e), this.at(e).setValue(l, {
                    onlySelf: !0,
                    emitEvent: n.emitEvent
                })
            }), this.updateValueAndValidity(n)
        }
        patchValue(l, n = {}) {
            l.forEach((l, e) => {
                this.at(e) && this.at(e).patchValue(l, {
                    onlySelf: !0,
                    emitEvent: n.emitEvent
                })
            }), this.updateValueAndValidity(n)
        }
        reset(l = [], n = {}) {
            this._forEachChild((e, t) => {
                e.reset(l[t], {
                    onlySelf: !0,
                    emitEvent: n.emitEvent
                })
            }), this._updatePristine(n), this._updateTouched(n), this.updateValueAndValidity(n)
        }
        getRawValue() {
            return this.controls.map(l => l instanceof Vf ? l.value : l.getRawValue())
        }
        clear() {
            this.controls.length < 1 || (this._forEachChild(l => l._registerOnCollectionChange(() => {})), this.controls.splice(0), this.updateValueAndValidity())
        }
        _syncPendingControls() {
            let l = this.controls.reduce((l, n) => !!n._syncPendingControls() || l, !1);
            return l && this.updateValueAndValidity({
                onlySelf: !0
            }), l
        }
        _throwIfControlMissing(l) {
            if (!this.controls.length) throw new Error("\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
            if (!this.at(l)) throw new Error(`Cannot find form control at index ${l}`)
        }
        _forEachChild(l) {
            this.controls.forEach((n, e) => {
                l(n, e)
            })
        }
        _updateValue() {
            this.value = this.controls.filter(l => l.enabled || this.disabled).map(l => l.value)
        }
        _anyControls(l) {
            return this.controls.some(n => n.enabled && l(n))
        }
        _setUpControls() {
            this._forEachChild(l => this._registerControl(l))
        }
        _checkAllValuesPresent(l) {
            this._forEachChild((n, e) => {
                if (void 0 === l[e]) throw new Error(`Must supply a value for form control at index: ${e}.`)
            })
        }
        _allControlsDisabled() {
            for (const l of this.controls)
                if (l.enabled) return !1;
            return this.controls.length > 0 || this.disabled
        }
        _registerControl(l) {
            l.setParent(this), l._registerOnCollectionChange(this._onCollectionChange)
        }
    }
    const Wf = (() => Promise.resolve(null))(); class Kf extends uf {
        constructor(l, n) {
            super(), this.submitted = !1, this._directives = [], this.ngSubmit = new qi, this.form = new jf({}, Of(l), Nf(n))
        }
        ngAfterViewInit() {
            this._setUpdateStrategy()
        }
        get formDirective() {
            return this
        }
        get control() {
            return this.form
        }
        get path() {
            return []
        }
        get controls() {
            return this.form.controls
        }
        addControl(l) {
            Wf.then(() => {
                const n = this._findContainer(l.path);
                l.control = n.registerControl(l.name, l.control), Pf(l.control, l), l.control.updateValueAndValidity({
                    emitEvent: !1
                }), this._directives.push(l)
            })
        }
        getControl(l) {
            return this.form.get(l.path)
        }
        removeControl(l) {
            Wf.then(() => {
                const n = this._findContainer(l.path);
                n && n.removeControl(l.name),
                    function (l, n) {
                        const e = l.indexOf(n);
                        e > -1 && l.splice(e, 1)
                    }(this._directives, l)
            })
        }
        addFormGroup(l) {
            Wf.then(() => {
                const n = this._findContainer(l.path),
                    e = new jf({});
                (function (l, n) {
                    null == l && Mf(n, "Cannot find control with"), l.validator = ff.compose([l.validator, n.validator]), l.asyncValidator = ff.composeAsync([l.asyncValidator, n.asyncValidator])
                })(e, l), n.registerControl(l.name, e), e.updateValueAndValidity({
                    emitEvent: !1
                })
            })
        }
        removeFormGroup(l) {
            Wf.then(() => {
                const n = this._findContainer(l.path);
                n && n.removeControl(l.name)
            })
        }
        getFormGroup(l) {
            return this.form.get(l.path)
        }
        updateModel(l, n) {
            Wf.then(() => {
                this.form.get(l.path).setValue(n)
            })
        }
        setValue(l) {
            this.control.setValue(l)
        }
        onSubmit(l) {
            return this.submitted = !0, n = this._directives, this.form._syncPendingControls(), n.forEach(l => {
                const n = l.control;
                "submit" === n.updateOn && n._pendingChange && (l.viewToModelUpdate(n._pendingValue), n._pendingChange = !1)
            }), this.ngSubmit.emit(l), !1;
            var n
        }
        onReset() {
            this.resetForm()
        }
        resetForm(l) {
            this.form.reset(l), this.submitted = !1
        }
        _setUpdateStrategy() {
            this.options && null != this.options.updateOn && (this.form._updateOn = this.options.updateOn)
        }
        _findContainer(l) {
            return l.pop(), l.length ? this.form.get(l) : this.form
        }
    }
    class Zf {
        static modelParentException() {
            throw new Error(`\n      ngModel cannot be used to register form controls with a parent formGroup directive.  Try using\n      formGroup's partner directive "formControlName" instead.  Example:\n\n      ${kf.formControlName}\n\n      Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:\n\n      Example:\n\n      ${kf.ngModelWithFormGroup}`)
        }
        static formGroupNameException() {
            throw new Error(`\n      ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.\n\n      Option 1: Use formControlName instead of ngModel (reactive strategy):\n\n      ${kf.formGroupName}\n\n      Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):\n\n      ${kf.ngModelGroup}`)
        }
        static missingNameException() {
            throw new Error('If ngModel is used within a form tag, either the name attribute must be set or the form\n      control must be defined as \'standalone\' in ngModelOptions.\n\n      Example 1: <input [(ngModel)]="person.firstName" name="first">\n      Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">')
        }
        static modelGroupParentException() {
            throw new Error(`\n      ngModelGroup cannot be used with a parent formGroup directive.\n\n      Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):\n\n      ${kf.formGroupName}\n\n      Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):\n\n      ${kf.ngModelGroup}`)
        }
        static ngFormWarning() {
            console.warn("\n    It looks like you're using 'ngForm'.\n\n    Support for using the 'ngForm' element selector has been deprecated in Angular v6 and will be removed\n    in Angular v9.\n\n    Use 'ng-form' instead.\n\n    Before:\n    <ngForm #myForm=\"ngForm\">\n\n    After:\n    <ng-form #myForm=\"ngForm\">\n    ")
        }
    }
    const Qf = new El("NgFormSelectorWarning"); class Yf extends uf {
        ngOnInit() {
            this._checkParentType(), this.formDirective.addFormGroup(this)
        }
        ngOnDestroy() {
            this.formDirective && this.formDirective.removeFormGroup(this)
        }
        get control() {
            return this.formDirective.getFormGroup(this)
        }
        get path() {
            return Af(this.name, this._parent)
        }
        get formDirective() {
            return this._parent ? this._parent.formDirective : null
        }
        get validator() {
            return Of(this._validators)
        }
        get asyncValidator() {
            return Nf(this._asyncValidators)
        }
        _checkParentType() {}
    }
    class Xf extends Yf {
        constructor(l, n, e) {
            super(), this._parent = l, this._validators = n, this._asyncValidators = e
        }
        _checkParentType() {
            this._parent instanceof Xf || this._parent instanceof Kf || Zf.modelGroupParentException()
        }
    }
    const Jf = (() => Promise.resolve(null))(); class lg extends af {
        constructor(l, n, e, t) {
            super(), this.control = new Vf, this._registered = !1, this.update = new qi, this._parent = l, this._rawValidators = n || [], this._rawAsyncValidators = e || [], this.valueAccessor = function (l, n) {
                if (!n) return null;
                Array.isArray(n) || Mf(l, "Value accessor was not provided as an array for form control with");
                let e = void 0,
                    t = void 0,
                    i = void 0;
                return n.forEach(n => {
                    n.constructor === tf ? e = n : function (l) {
                        return Rf.some(n => l.constructor === n)
                    }(n) ? (t && Mf(l, "More than one built-in value accessor matches form control with"), t = n) : (i && Mf(l, "More than one custom value accessor matches form control with"), i = n)
                }), i || t || e || (Mf(l, "No valid value accessor for form control with"), null)
            }(this, t)
        }
        ngOnChanges(l) {
            this._checkForErrors(), this._registered || this._setUpControl(), "isDisabled" in l && this._updateDisabled(l),
                function (l, n) {
                    if (!l.hasOwnProperty("model")) return !1;
                    const e = l.model;
                    return !!e.isFirstChange() || !Yn(n, e.currentValue)
                }(l, this.viewModel) && (this._updateValue(this.model), this.viewModel = this.model)
        }
        ngOnDestroy() {
            this.formDirective && this.formDirective.removeControl(this)
        }
        get path() {
            return this._parent ? Af(this.name, this._parent) : [this.name]
        }
        get formDirective() {
            return this._parent ? this._parent.formDirective : null
        }
        get validator() {
            return Of(this._rawValidators)
        }
        get asyncValidator() {
            return Nf(this._rawAsyncValidators)
        }
        viewToModelUpdate(l) {
            this.viewModel = l, this.update.emit(l)
        }
        _setUpControl() {
            this._setUpdateStrategy(), this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this), this._registered = !0
        }
        _setUpdateStrategy() {
            this.options && null != this.options.updateOn && (this.control._updateOn = this.options.updateOn)
        }
        _isStandalone() {
            return !this._parent || !(!this.options || !this.options.standalone)
        }
        _setUpStandalone() {
            Pf(this.control, this), this.control.updateValueAndValidity({
                emitEvent: !1
            })
        }
        _checkForErrors() {
            this._isStandalone() || this._checkParentType(), this._checkName()
        }
        _checkParentType() {
            !(this._parent instanceof Xf) && this._parent instanceof Yf ? Zf.formGroupNameException() : this._parent instanceof Xf || this._parent instanceof Kf || Zf.modelParentException()
        }
        _checkName() {
            this.options && this.options.name && (this.name = this.options.name), this._isStandalone() || this.name || Zf.missingNameException()
        }
        _updateValue(l) {
            Jf.then(() => {
                this.control.setValue(l, {
                    emitViewToModelChange: !1
                })
            })
        }
        _updateDisabled(l) {
            const n = l.isDisabled.currentValue,
                e = "" === n || n && "false" !== n;
            Jf.then(() => {
                e && !this.control.disabled ? this.control.disable() : !e && this.control.disabled && this.control.enable()
            })
        }
    }
    class ng {
        get required() {
            return this._required
        }
        set required(l) {
            this._required = null != l && !1 !== l && "false" !== `${l}`, this._onChange && this._onChange()
        }
        validate(l) {
            return this.required ? ff.required(l) : null
        }
        registerOnValidatorChange(l) {
            this._onChange = l
        }
    }
    class eg {}
    class tg {
        static withConfig(l) {
            return {
                ngModule: tg,
                providers: [{
                    provide: Qf,
                    useValue: l.warnOnDeprecatedNgFormSelector
                }]
            }
        }
    }
    class ig extends La {
        constructor() {
            super(...arguments), this.keepOrder = (l, n) => 0
        }
        transform(l) {
            return super.transform(l, this.keepOrder)
        }
    }
    class sg {
        constructor(l) {
            this.elementRef = l
        }
        onMouseEnter() {
            this.hoverClass && this.elementRef.nativeElement.classList.add(...this.hoverClass.split(" "))
        }
        onMouseLeave() {
            this.hoverClass && this.elementRef.nativeElement.classList.remove(...this.hoverClass.split(" "))
        }
    }
    