// Reverse-engineered Angular routes from zUnb
// Component identifiers are minified class names from the bundle

export const ROUTES_SNIPPET = `
forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead.");
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
                l.logGroup(\`Router Event: ${n.constructor.name}\`), l.log(n.toString()), l.log(n), l.logGroupEnd()
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
                    if ("enabled" !== t.initialNavigation) throw new Error(\`Invalid initialNavigation options: '${t.initialNavigation}'\`);
                    e.hooks.afterPreactivation = () => this.initNavigation ? Za(null) : (this.initNavigation = !0, l(!0), this.resultOfPreactivationDone), e.initialNavigation()
                }
                return n
            })
        }
        bootstrapListener(l) {
            const n = this.injector.get(Np),
                e = this.injector.get(Mp),
                t = this.injector.get(Op),
                i = this.inj
`;

export const ROUTE_MAP = {
  "": "redirect -> home",
  home: "HomeComponent (rg)",
  game: "GameShellComponent (Aw) [canActivate]",
  "game/empire": "EmpireComponent (sx)",
  "game/city/:id": "CityComponent (vT)",
  "game/city": "CityComponent (vT)",
  "game/science": "ScienceComponent (uE)",
  "game/world": "WorldMapComponent (kE)",
  "game/attacks": "AttacksComponent (_A)",
  "game/simulator": "SimulatorComponent (ZA)",
  "game/reports/:id": "ReportsComponent (tP)",
  "game/reports": "ReportsComponent (tP)",
  "game/policies": "PoliciesComponent",
  "game/notifications": "NotificationsComponent",
  "game/help": "HelpComponent",
  "game/support": "SupportComponent",
  "game/options": "OptionsComponent",
  "game/diplomacy": "DiplomacyComponent",
  "game/powers": "PowersComponent",
  "game/daily": "DailyComponent",
  "game/deity": "DeityComponent",
};
