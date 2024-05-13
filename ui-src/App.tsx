import { useEffect } from 'react';
import useResizeObserver from 'use-resize-observer';

import Penpot from '@ui/assets/penpot.svg?react';
import { PenpotExporter } from '@ui/components/PenpotExporter';
import { Stack } from '@ui/components/Stack';

import { Wrapper } from './components/Wrapper/Wrapper';

// Safe default value to avoid overflowing from the screen
const MAX_HEIGHT = 800;

export const App = () => {
  const { ref, height } = useResizeObserver<HTMLDivElement>({ box: 'border-box' });

  useEffect(() => {
    if (height === undefined) return;

    const capHeight = Math.min(height, MAX_HEIGHT);

    parent.postMessage({ pluginMessage: { type: 'resize', height: capHeight } }, '*');
  }, [height]);

  return (
    <Wrapper ref={ref} overflowing={(height ?? 0) > MAX_HEIGHT}>
      <Stack space="medium">
        <Penpot
          style={{
            alignSelf: 'center',
            height: 'auto',
            width: '8.125rem',
            fill: 'var(--figma-color-icon)'
          }}
        />
        <PenpotExporter />
      </Stack>
    </Wrapper>
  );
};
