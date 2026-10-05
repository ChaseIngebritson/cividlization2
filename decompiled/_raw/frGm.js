// webpack module: frGm
// size: 5804
function (l, n, e) {
                "use strict";
                l.exports = function (l, n) {
                    var e, t, i, s, u, r, a, o, c, d, h, p, f, g, m, y, v, b, _, w, x, k, S, C, I;
                    C = l.input, i = (t = l.next_in) + (l.avail_in - 5), I = l.output, u = (s = l.next_out) - (n - l.avail_out), r = s + (l.avail_out - 257), a = (e = l.state).dmax, o = e.wsize, c = e.whave, d = e.wnext, h = e.window, p = e.hold, f = e.bits, g = e.lencode, m = e.distcode, y = (1 << e.lenbits) - 1, v = (1 << e.distbits) - 1;
                    l: do {
                        f < 15 && (p += C[t++] << f, p += C[t++] << (f += 8), f += 8), b = g[p & y];
                        n: for (;;) {
                            if (p >>>= _ = b >>> 24, f -= _, 0 == (_ = b >>> 16 & 255)) I[s++] = 65535 & b;
                            else {
                                if (!(16 & _)) {
                                    if (0 == (64 & _)) {
                                        b = g[(65535 & b) + (p & (1 << _) - 1)];
                                        continue n
                                    }
                                    if (32 & _) {
                                        e.mode = 12;
                                        break l
                                    }
                                    l.msg = "invalid literal/length code", e.mode = 30;
                                    break l
                                }
                                w = 65535 & b, (_ &= 15) && (f < _ && (p += C[t++] << f, f += 8), w += p & (1 << _) - 1, p >>>= _, f -= _), f < 15 && (p += C[t++] << f, p += C[t++] << (f += 8), f += 8), b = m[p & v];
                                e: for (;;) {
                                    if (p >>>= _ = b >>> 24, f -= _, !(16 & (_ = b >>> 16 & 255))) {
                                        if (0 == (64 & _)) {
                                            b = m[(65535 & b) + (p & (1 << _) - 1)];
                                            continue e
                                        }
                                        l.msg = "invalid distance code", e.mode = 30;
                                        break l
                                    }
                                    if (x = 65535 & b, f < (_ &= 15) && (p += C[t++] << f, (f += 8) < _ && (p += C[t++] << f, f += 8)), (x += p & (1 << _) - 1) > a) {
                                        l.msg = "invalid distance too far back", e.mode = 30;
                                        break l
                                    }
                                    if (p >>>= _, f -= _, x > (_ = s - u)) {
                                        if ((_ = x - _) > c && e.sane) {
                                            l.msg = "invalid distance too far back", e.mode = 30;
                                            break l
                                        }
                                        if (k = 0, S = h, 0 === d) {
                                            if (k += o - _, _ < w) {
                                                w -= _;
                                                do {
                                                    I[s++] = h[k++]
                                                } while (--_);
                                                k = s - x, S = I
                                            }
                                        } else if (d < _) {
                                            if (k += o + d - _, (_ -= d) < w) {
                                                w -= _;
                                                do {
                                                    I[s++] = h[k++]
                                                } while (--_);
                                                if (k = 0, d < w) {
                                                    w -= _ = d;
                                                    do {
                                                        I[s++] = h[k++]
                                                    } while (--_);
                                                    k = s - x, S = I
                                                }
                                            }
                                        } else if (k += d - _, _ < w) {
                                            w -= _;
                                            do {
                                                I[s++] = h[k++]
                                            } while (--_);
                                            k = s - x, S = I
                                        }
                                        for (; w > 2;) I[s++] = S[k++], I[s++] = S[k++], I[s++] = S[k++], w -= 3;
                                        w && (I[s++] = S[k++], w > 1 && (I[s++] = S[k++]))
                                    } else {
                                        k = s - x;
                                        do {
                                            I[s++] = I[k++], I[s++] = I[k++], I[s++] = I[k++], w -= 3
                                        } while (w > 2);
                                        w && (I[s++] = I[k++], w > 1 && (I[s++] = I[k++]))
                                    }
                                    break
                                }
                            }
                            break
                        }
                    } while (t < i && s < r);
                    p &= (1 << (f -= (w = f >> 3) << 3)) - 1, l.next_in = t -= w, l.next_out = s, l.avail_in = t < i ? i - t + 5 : 5 - (t - i), l.avail_out = s < r ? r - s + 257 : 257 - (s - r), e.hold = p, e.bits = f
                }
            }
