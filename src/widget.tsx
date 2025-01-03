import React from 'react';
import { ReactWidget } from '@jupyterlab/apputils';
import { Paper } from '@mui/material';

import BandHighLight from './components/BandHighLight';
import ElementHighlights from './components/ElementHighlights';

const styles: Record<string, React.CSSProperties> = {
  main: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    flexWrap: 'wrap',
    boxSizing: 'border-box'
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '0 1 50%',
    width: '50%'
    // border: '1px solid green',
    // boxSizing: 'border-box',
  }
};

function GridContent({ index }: { index: number }) {
  let returnValue: React.JSX.Element | null = null;
  switch (index) {
    case 1:
      returnValue = <BandHighLight />;
      break;
    case 2:
      returnValue = <ElementHighlights />;
      break;
    case 3:
      returnValue = <BandHighLight />;
      break;
    default:
      returnValue = <span>{'Grid element ' + String(index)}</span>;
      break;
  }
  return returnValue;
}

/**
 * React component for a counter.
 *
 * @returns The React component
 */
const App = (): JSX.Element => {
  const gridElements = Array.from(new Array(4)).map((_, index) => index + 1);

  return (
    <div style={styles.main}>
      {gridElements.map(value => {
        return (
          <Paper key={`grid-element-${value}`} style={styles.grid}>
            <GridContent index={value} />
          </Paper>
        );
      })}
    </div>
  );
};

/**
 * A Counter Lumino Widget that wraps a CounterComponent.
 */
export class MainWidget extends ReactWidget {
  /**
   * Constructs a new CounterWidget.
   */
  constructor() {
    super();
    this.addClass('jp-ReactWidget');
  }

  render(): JSX.Element {
    return <App />;
  }
}
