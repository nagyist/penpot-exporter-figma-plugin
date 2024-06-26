import { TextVerticalAlign } from '@ui/lib/types/text/textContent';

export const translateVerticalAlign = (align: 'TOP' | 'CENTER' | 'BOTTOM'): TextVerticalAlign => {
  switch (align) {
    case 'BOTTOM':
      return 'bottom';
    case 'CENTER':
      return 'center';
    default:
      return 'top';
  }
};
