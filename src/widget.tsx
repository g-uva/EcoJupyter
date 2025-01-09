import React from 'react';
import { ReactWidget } from '@jupyterlab/apputils';
import { Paper } from '@mui/material';

// import BandHighLight from './components/BandHighLight';
// import ElementHighlights from './components/ElementHighlights';
// import MapComponent from './components/map/MapComponent';

const styles: Record<string, React.CSSProperties> = {
  main: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    padding: '3px',
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
  switch (index) {
    // case 1:
    //   return <BandHighLight />;
    // case 2:
    //   return <ElementHighlights />;
    // case 3:
    //   return <BandHighLight />;
    // case 4:
    //   return <MapComponent />;
    default:
      return <span>{'Grid element ' + String(index)}</span>;
  }
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
