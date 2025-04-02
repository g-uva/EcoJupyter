import React from 'react';
import { Button, Grid2, SxProps, Typography } from '@mui/material';

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
    }
  }
};

export default function WelcomePage() {
  return (
    <Grid2 sx={styles.main}>
      <Typography variant="h4" sx={styles.title}>
        Welcome to GreenDIGIT Dashboard
      </Typography>
      <Grid2 sx={styles.buttonGrid}>
        <Button variant="outlined">Real-time Tracking Monitor</Button>
        <Button variant="outlined" disabled>
          Resource Usage Prediction
        </Button>
      </Grid2>
    </Grid2>
  );
}
