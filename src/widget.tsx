import React from 'react';
import { ReactWidget } from '@jupyterlab/apputils';
import { Grid2, Paper } from '@mui/material';
import ChartsPage from './pages/ChartsPage';
import WelcomePage from './pages/WelcomePage';

// import BandHighLight from './components/BandHighLight';
// import ElementHighlights from './components/ElementHighlights';
// import MapComponent from './components/map/MapComponent';
import VerticalLinearStepper from './components/VerticalLinearStepper';

const styles: Record<string, React.CSSProperties> = {
  main: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    padding: '3px'
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    whiteSpace: 'wrap',
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: '0 1 100%',
    width: '100%'
  }
};

function Prediction() {
  return (
    <Grid2 sx={{ width: '100%', px: 3, py: 5 }}>
      <VerticalLinearStepper />
    </Grid2>
  );
}

export enum Page {
  WelcomePage,
  ChartsPage,
  Prediction
}

/**
 * React component for a counter.
 *
 * @returns The React component
 */
const App = (): JSX.Element => {
  const [activePageState, setActivePageState] = React.useState<Page>(
    Page.WelcomePage
  );

  function handleRealTimeClick() {
    setActivePageState(Page.ChartsPage);
  }

  const ActivePage: Record<Page, React.JSX.Element> = {
    [Page.WelcomePage]: (
      <WelcomePage handleRealTimeClick={handleRealTimeClick} />
    ),
    [Page.ChartsPage]: <ChartsPage />,
    [Page.Prediction]: <Prediction />
  };

  return (
    <div style={styles.main}>
      <Paper style={styles.grid}>{ActivePage[activePageState]}</Paper>
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
