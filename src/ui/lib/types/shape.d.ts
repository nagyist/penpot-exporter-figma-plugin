import { Export } from './utils/export';
import { Fill } from './utils/fill';
import { Grid } from './utils/grid';
import { Matrix } from './utils/matrix';
import { Point } from './utils/point';
import { Selrect } from './utils/selrect';
import { Stroke } from './utils/stroke';

export type Shape = {
  name?: string;
  componentId?: string;
  componentFile?: string;
  componentRoot?: boolean;
  shapeRef?: string;
  selrect?: Selrect;
  points?: Point[];
  blocked?: boolean;
  collapsed?: boolean;
  locked?: boolean;
  hidden?: boolean;
  maskedGroup?: boolean;
  fills?: Fill[];
  hideFillOnExport?: boolean;
  proportion?: number;
  proportionLock?: boolean;
  constraintsH?: 'left' | 'right' | 'leftright' | 'center' | 'scale';
  constraintsV?: 'top' | 'bottom' | 'topbottom' | 'center' | 'scale';
  fixedScroll?: boolean;
  rx?: number;
  ry?: number;
  r1?: number;
  r2?: number;
  r3?: number;
  r4?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  opacity?: number;
  grids?: Grid[];
  exports?: Export[];
  strokes?: Stroke[];
  transform?: Matrix;
  transformInverse?: Matrix;
  blendMode?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interactions?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shadow?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blur?: any;
  growType?: 'auto-width' | 'auto-height' | 'fixed';
};
