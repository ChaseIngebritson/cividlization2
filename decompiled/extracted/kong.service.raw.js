        Bg = (() => {
          class l {
            constructor() {
              ((this.username = ""),
                window.kongregateAPI &&
                  window.kongregateAPI.loadAPI(this.apiLoaded.bind(this)));
            }
            apiLoaded() {
              ((this.kong = window.kongregateAPI.getAPI()),
                this.updateFields(),
                this.kong.services.addEventListener("login", function () {
                  this.updateFields();
                }));
            }
            updateFields() {
              ((this.username = this.kong.services.getUsername()),
                console.log("User is : " + this.username),
                "Guest" == this.username && (this.username = ""));
            }
            getUsername() {
              return this.username;
            }
            buy(l, n) {
              if (this.kong)
                return this.kong.mtx.purchaseItems(["gift-" + l], n);
              n(!0);
            }
            submmitStat(l, n) {
              this.kong && this.kong.stats.submit(l, n);
            }
          }
          return (
            (l.ngInjectableDef = gl({
              factory: function () {
                return new l();
              },
              token: l,
              providedIn: "root",
            })),
            l
          );
        })(),
