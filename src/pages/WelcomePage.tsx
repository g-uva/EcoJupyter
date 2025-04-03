import React from 'react';
import {
  Button, //Divider,
  Grid2,
  SxProps,
  Typography
} from '@mui/material';
import GeneralDashboard from './GeneralDashboard';

const styles: Record<string, SxProps> = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  title: {
    my: 2
  },
  buttonGrid: {
    display: 'flex',
    width: '100%',
    gap: 3,
    justifyContent: 'center',
    alignContent: 'center',
    '& .MuiButtonBase-root': {
      textTransform: 'none'
    },
    mb: 2
  }
};

interface IWelcomePage {
  handleRealTimeClick: () => void;
  handlePredictionClick: () => void;
}

export default function WelcomePage({
  handleRealTimeClick,
  handlePredictionClick
}: IWelcomePage) {
  return (
    <Grid2 sx={styles.main}>
      <Typography variant="h4" sx={styles.title}>
        Welcome to GreenDIGIT Dashboard
      </Typography>
      <Grid2 sx={styles.buttonGrid}>
        <Button variant="outlined" onClick={handleRealTimeClick}>
          Real-time Tracking Monitor
        </Button>
        <Button variant="outlined" onClick={handlePredictionClick}>
          Resource Usage Prediction
        </Button>
      </Grid2>

      {/* <Divider sx={{ width: '100%' }} /> */}
      <GeneralDashboard />
    </Grid2>
  );
}
