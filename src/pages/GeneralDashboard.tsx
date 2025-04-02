import { Paper } from '@mui/material';
import React from 'react';

import BandHighLight from '../components/BandHighLight';
import ElementHighlights from '../components/ElementHighlights';
import MapComponent from '../components/map/MapComponent';

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
    justifyContent: 'center',
    alignItems: 'center'
    // flex: '0 1 50%'
    // width: '50%'
    // border: '1px solid green',
    // boxSizing: 'border-box',
  }
};

export default function GeneralDashboard() {
  function GridContent({ index }: { index: number }) {
    switch (index) {
      case 1:
        return <BandHighLight />;
      case 2:
        return <ElementHighlights />;
      case 3:
        return <MapComponent />;
      default:
        return <span>{'Grid element ' + String(index)}</span>;
    }
  }

  const gridElements = Array.from(new Array(3)).map((_, index) => index + 1);

  return (
    <div style={styles.main}>
      {gridElements.map(value => {
        return (
          <Paper
            key={`grid-element-${value}`}
            style={{
              ...styles.grid,
              minWidth: value === 3 ? '100%' : '50%',
              flex: value === 3 ? '0 1 100%' : '0 1 50%'
            }}
          >
            <GridContent index={value} />
          </Paper>
        );
      })}
    </div>
  );
}
