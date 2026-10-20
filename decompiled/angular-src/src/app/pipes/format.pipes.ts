import { Pipe, PipeTransform } from '@angular/core';
import { FormatUtil } from '../legacy/game-kernel';

@Pipe({ name: 'cvFormat' })
export class FormatNumberPipe implements PipeTransform {
  transform(value: number, config = ''): string {
    if (value === undefined || value === null) return '';
    return FormatUtil.format(value, config);
  }
}

@Pipe({ name: 'cvTime' })
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    return FormatUtil.formatTime(value);
  }
}

@Pipe({ name: 'cvPercent' })
export class FormatPercentPipe implements PipeTransform {
  transform(value: number): string {
    if (value === undefined || value === null) return '';
    if (value === Infinity) return 'Infinity';
    return Math.round(100 * value) + ' %';
  }
}
