        $g = (() => {
          class l {
            constructor(l, n, e) {
              ((this.conf = l), (this.data = n), (this.dataService = e));
            }
            encryptData(l = !0) {
              let n = JSON.parse(JSON.stringify(this.data));
              (delete n.conf,
                delete n.observableSciences,
                delete n.spelltime,
                delete n.connections,
                delete n.citiespos,
                delete n.citiesids,
                [].concat(...n.players.map((l) => l.cities)).forEach((l) => {
                  (delete l.happiness,
                    delete l.tradeGains,
                    delete l.cultureDiff);
                }),
                this.data.autopause.save && (n.pause = !0));
              let e = JSON.stringify(n);
              return (
                l &&
                  (e =
                    "z|" +
                    Object(Mg.gzip)(e, {
                      to: "string",
                    })),
                Dg.AES.encrypt(e, this.conf.aes_key).toString()
              );
            }
            decryptData(l) {
              let n = Dg.AES.decrypt(l.toString(), this.conf.aes_key).toString(
                Dg.enc.Utf8,
              );
              return (
                n.startsWith("z|") &&
                  (n = Object(Mg.ungzip)(n.substring(2), {
                    to: "string",
                  })),
                JSON.parse(n)
              );
            }
            save(l = !0) {
              try {
                this.data.savetime = Date.now();
                let n = new Og(
                  this.data.name,
                  Date.now(),
                  this.dataService.era(),
                  this.data.players[0].orientation <= 0
                    ? this.data.players[0].deity
                    : "tech",
                  this.data.rebirths,
                  this.dataService.player().civ_id,
                  this.encryptData(l),
                );
                return (
                  localStorage.setItem(
                    this.conf.save.prefix + n.name,
                    JSON.stringify(n),
                  ),
                  !0
                );
              } catch (n) {
                return ((this.data.noautosave = !0), !1);
              }
            }
            delete(l) {
              delete localStorage[this.conf.save.prefix + l];
            }
            extractSave(l) {
              return JSON.parse(
                localStorage.getItem(this.conf.save.prefix + l),
              );
            }
            load(l) {
              (this.data.load(this.decryptData(l)),
                delete this.data.noautosave,
                this.dataService.updateVersion(),
                this.dataService.cityCache(),
                this.dataService.checkLocks(),
                this.dataService.updateStats());
            }
          }
          return (
            (l.ngInjectableDef = gl({
              factory: function () {
                return new l(ql(Tg), ql(Pg), ql(zg));
              },
              token: l,
              providedIn: "root",
            })),
            l
          );
        })();
