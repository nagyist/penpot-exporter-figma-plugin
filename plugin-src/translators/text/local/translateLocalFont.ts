import { LocalFont, translateFontVariantId } from '@plugin/translators/text/local';

import { FontId } from '@ui/lib/types/text/textContent';

import { items as localFonts } from './localFonts.json';

export const translateLocalFont = (fontName: FontName, fontWeight: number): FontId | undefined => {
  const localFont = getLocalFont(fontName);

  if (localFont === undefined) return;

  return {
    fontId: localFont.id,
    fontVariantId: translateFontVariantId(localFont, fontName, fontWeight)
  };
};

const getLocalFont = (fontName: FontName): LocalFont | undefined => {
  return localFonts.find(localFont => localFont.name === fontName.family);
};
