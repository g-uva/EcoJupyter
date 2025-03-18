import { TextField } from '@mui/material';
import React from 'react';

interface INumberInput {
  currentRefreshValue: number;
  handleRefreshNumberChange: (newValue: string) => void;
}

export default function NumberInput({
  currentRefreshValue,
  handleRefreshNumberChange
}: INumberInput) {
  return (
    <TextField
      id="outlined-number"
      label="Refresh(S)"
      type="number"
      slotProps={{
        inputLabel: {
          shrink: true
        }
      }}
      onChange={event => handleRefreshNumberChange(event.target.value)}
      value={currentRefreshValue}
      size="small"
      sx={{ maxWidth: 90 }}
    />
  );
}
