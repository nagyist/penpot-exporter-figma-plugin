import { calculateRadialGradient, detectMimeType, rgbToHex } from '@plugin/utils';
import { calculateLinearGradient } from '@plugin/utils/calculateLinearGradient';

import { Fill } from '@ui/lib/types/utils/fill';
import { ImageColor } from '@ui/lib/types/utils/imageColor';

export const translateFill = async (fill: Paint): Promise<Fill | undefined> => {
  switch (fill.type) {
    case 'SOLID':
      return translateSolidFill(fill);
    case 'GRADIENT_LINEAR':
      return translateGradientLinearFill(fill);
    case 'GRADIENT_RADIAL':
      return translateGradientRadialFill(fill);
    case 'IMAGE':
      return await translateImageFill(fill);
  }

  console.error(`Unsupported fill type: ${fill.type}`);
};

export const translateFills = async (
  fills: readonly Paint[] | typeof figma.mixed
): Promise<Fill[]> => {
  const figmaFills = fills === figma.mixed ? [] : fills;
  const penpotFills: Fill[] = [];

  for (const fill of figmaFills) {
    const penpotFill = await translateFill(fill);
    if (penpotFill) {
      // fills are applied in reverse order in Figma, that's why we unshift
      penpotFills.unshift(penpotFill);
    }
  }

  return penpotFills;
};

export const translatePageFill = (fill: Paint): string | undefined => {
  switch (fill.type) {
    case 'SOLID':
      return rgbToHex(fill.color);
  }

  console.error(`Unsupported page fill type: ${fill.type}`);
};

const translateImage = async (imageHash: string | null): Promise<ImageColor | undefined> => {
  if (!imageHash) return;

  const image = figma.getImageByHash(imageHash);
  if (!image) return;

  const bytes = await image.getBytesAsync();
  const size = await image.getSizeAsync();
  const b64 = figma.base64Encode(bytes);
  const mimeType = detectMimeType(b64);
  const dataUri = `data:${mimeType};base64,${b64}`;

  return {
    width: size.width,
    height: size.height,
    mtype: mimeType,
    keepAspectRatio: true,
    dataUri: dataUri,
    id: '00000000-0000-0000-0000-000000000000'
  };
};

const translateImageFill = async (fill: ImagePaint): Promise<Fill | undefined> => {
  const fillImage = await translateImage(fill.imageHash);
  if (!fillImage) return;

  return {
    fillOpacity: !fill.visible ? 0 : fill.opacity,
    fillImage: fillImage
  };
};

const translateSolidFill = (fill: SolidPaint): Fill => {
  return {
    fillColor: rgbToHex(fill.color),
    fillOpacity: !fill.visible ? 0 : fill.opacity
  };
};

const translateGradientLinearFill = (fill: GradientPaint): Fill => {
  const points = calculateLinearGradient(fill.gradientTransform);

  return {
    fillColorGradient: {
      type: 'linear',
      startX: points.start[0],
      startY: points.start[1],
      endX: points.end[0],
      endY: points.end[1],
      width: 1,
      stops: fill.gradientStops.map(stop => ({
        color: rgbToHex(stop.color),
        offset: stop.position,
        opacity: stop.color.a * (fill.opacity ?? 1)
      }))
    },
    fillOpacity: !fill.visible ? 0 : fill.opacity
  };
};

const translateGradientRadialFill = (fill: GradientPaint): Fill => {
  const points = calculateRadialGradient(fill.gradientTransform);

  return {
    fillColorGradient: {
      type: 'radial',
      startX: points.start[0],
      startY: points.start[1],
      endX: points.end[0],
      endY: points.end[1],
      width: 1,
      stops: fill.gradientStops.map(stop => ({
        color: rgbToHex(stop.color),
        offset: stop.position,
        opacity: stop.color.a * (fill.opacity ?? 1)
      }))
    },
    fillOpacity: !fill.visible ? 0 : fill.opacity
  };
};
