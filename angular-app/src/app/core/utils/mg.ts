/** Number / time format helpers recovered from production (`mg`). */
export const mg = {
  capitalizeFirstLetter(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  },

  formatTime(seconds: number): string {
    if (seconds === Infinity) return 'Infinity';
    let l = seconds;
    const d = Math.floor(l / 86400);
    l -= 86400 * d;
    const h = Math.floor(l / 3600);
    l -= 3600 * h;
    const m = Math.floor(l / 60);
    const s = Math.floor(l) % 60;
    return (
      (d > 0 ? d + 'd' : '') +
      (h > 0 ? this.str(h) + 'h' : '') +
      (d === 0 && (m > 0 || h > 0) ? this.str(m) + 'm' : '') +
      (d === 0 && h === 0 ? this.str(s) + 's' : '')
    );
  },

  str(n: number): string {
    return (n >= 10 ? '' : '0') + n;
  },

  format(value: number, config = ''): string {
    const e = this.getConfig(config);
    let l = value;
    if (e.percent) l *= 100;
    let suffix = '';
    if (l >= 1e12) {
      suffix = 'T';
      l /= 1e12;
      e.decimals = l < 10 ? 2 : l < 100 ? 1 : 0;
    } else if (l >= 1e9) {
      suffix = 'B';
      l /= 1e9;
      e.decimals = l < 10 ? 2 : l < 100 ? 1 : 0;
    } else if (l >= 1e6) {
      suffix = 'M';
      l /= 1e6;
      e.decimals = l < 10 ? 2 : l < 100 ? 1 : 0;
    } else if (l >= 1e3) {
      suffix = 'k';
      l /= 1e3;
      e.decimals = l < 10 ? 2 : l < 100 ? 1 : 0;
    } else if (l >= 100) {
      e.decimals = 0;
    } else if (l >= 10 && e.decimals === 2) {
      e.decimals = 1;
    }
    const pow = Math.pow(10, e.decimals);
    l = Math.floor(l * pow) / pow;
    let s = Number(l).toFixed(e.decimals);
    s = (e.withPlus && l >= 0 ? '+' : '') + s + suffix;
    if (e.percent) s += ' %';
    if (e.coloration) {
      const cls = l > 0 ? 'text-success' : l < 0 ? 'text-danger' : '';
      s = `<span class="${cls}">${s}</span>`;
    }
    return s;
  },

  getConfig(spec: string): {
    withPlus: boolean;
    decimals: number;
    coloration: boolean;
    percent: boolean;
  } {
    if (!spec) {
      return { withPlus: false, decimals: 0, coloration: false, percent: false };
    }
    const withPlus = spec.startsWith('+');
    const coloration = spec.endsWith('c');
    let t = spec.replace(/[+c]/g, '');
    let decimals = 0;
    let percent = false;
    if (t.startsWith('.')) {
      decimals = Number(t.slice(1)) || 0;
    } else if (t.includes('.')) {
      const [a, b] = t.split('.');
      decimals = Number(b) || 0;
      percent = a.includes('%') || t.includes('%');
    } else if (t.includes('%')) {
      percent = true;
    }
    return { withPlus, decimals, coloration, percent };
  },
};
