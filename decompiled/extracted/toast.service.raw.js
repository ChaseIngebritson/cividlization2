      let Rg = (() => {
          class l {
            constructor(l, n) {
              ((this.conf = l), (this.data = n), (this.toasts = []));
            }
            success(l, n = "", e = "") {
              this.show(l, "bg-success text-light", n, e);
            }
            info(l, n = "", e = "") {
              this.show(l, "bg-info text-light", n, e);
            }
            danger(l, n = "", e = "") {
              this.show(l, "bg-danger text-light", n, e);
            }
            black(l, n = "", e = "") {
              this.show(l, "bg-dark text-light border border-light", n, e);
            }
            warning(l, n = "", e = "") {
              this.show(l, "bg-warning text-light", n, e);
            }
            show(l, n = "", e = "", t = "") {
              let i = {
                text: l,
                delay: this.conf.toast_delay,
                classname: n + (t ? " cursor-pointer" : ""),
                link: t,
                icon: e,
                date: new Date(),
              };
              (this.data.notifications.push(i), this.toasts.unshift(i));
            }
            remove(l) {
              this.toasts = this.toasts.filter((n) => n !== l);
            }
          }
          return (
            (l.ngInjectableDef = gl({
              factory: function () {
                return new l(ql(Tg), ql(Pg));
              },
              token: l,
              providedIn: "root",
            })),
            l
          );
        })(),
