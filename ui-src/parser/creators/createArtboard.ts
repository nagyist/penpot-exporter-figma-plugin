import { PenpotFile } from '@ui/lib/types/penpotFile';
import { FrameShape } from '@ui/lib/types/shapes/frameShape';
import { symbolBlendMode, symbolFillGradients } from '@ui/parser/creators/symbols';

import { createItems } from '.';

export const createArtboard = (
  file: PenpotFile,
  { type, fills, blendMode, children = [], ...rest }: FrameShape
) => {
  file.addArtboard({
    fills: symbolFillGradients(fills),
    blendMode: symbolBlendMode(blendMode),
    ...rest
  });

  createItems(file, children);

  file.closeArtboard();
};