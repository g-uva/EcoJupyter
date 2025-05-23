import { Paper } from '@mui/material';
import React from 'react';

// import BandHighLight from '../components/BandHighLight';
import ScaphChart from '../components/ScaphChart';
// import MapComponent from '../components/map/MapComponent';

const styles: Record<string, React.CSSProperties> = {
  main: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    padding: '10px',
    whiteSpace: 'nowrap'
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default function GeneralDashboard() {
  return (
    <div style={styles.main}>
      <Paper key="grid-element-main" style={{ ...styles.grid }}>
        <ScaphChart />
      </Paper>
    </div>
  );
}
