import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularWithValueLabel from './progress/CircularWithValueLabel';
import {
  FormControl,
  FormControlLabel,
  // FormLabel,
  Grid2,
  Radio,
  RadioGroup
} from '@mui/material';
import CollapsibleTable from './table/CollapsibleTable';

type Content = { label: string; hasButtons?: boolean };
interface ILoadProps {
  handleFinish: () => void;
  label: string;
}

const steps: Array<Content> = [
  {
    label: 'Approach'
  },
  {
    label: 'Fetch/compute',
    hasButtons: false
  },
  {
    label: 'Visualisation options'
  },
  {
    label: 'Deployment',
    hasButtons: false
  }
];

function StepOne() {
  return (
    <Grid2>
      <FormControl>
        {/* <FormLabel id="demo-radio-buttons-group-label">
          Methodology/approac
        </FormLabel> */}
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="pre-compute"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="pre-compute"
            control={<Radio />}
            label="Pre-Compute"
          />
          <FormControlLabel
            value="sample"
            control={<Radio />}
            label="Sample Computation"
          />
          <FormControlLabel
            value="simulation-pred"
            control={<Radio />}
            label="Simulation/Prediction"
          />
        </RadioGroup>
      </FormControl>
    </Grid2>
  );
}

function StepTwo({ handleFinish, label }: ILoadProps) {
  return (
    <Grid2>
      <Typography>{label}</Typography>
      <CircularWithValueLabel onFinish={handleFinish} />
    </Grid2>
  );
}

function StepThree() {
  return <div />;
}

function StepFour({ handleFinish, label }: ILoadProps) {
  return (
    <Grid2>
      <Button onClick={handleFinish} title="Reset" />
    </Grid2>
  );
}

interface IContentHandlerProps {
  step: number;
  triggerNextStep: () => void;
  handleLastStep: () => void;
}

function ContentHandler({
  step,
  triggerNextStep,
  handleLastStep
}: IContentHandlerProps) {
  switch (step) {
    default:
    case 0:
      return <StepOne />;
    case 1:
      return (
        <StepTwo handleFinish={triggerNextStep} label="Predicting results..." />
      );
    case 2:
      return <StepThree />;
    case 3:
      return (
        <StepFour
          handleFinish={handleLastStep}
          label="Deploying application..."
        />
      );
  }
}

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(2);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(
      prevActiveStep => prevActiveStep - (prevActiveStep === 2 ? 2 : 1)
    );
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === steps.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <ContentHandler
                step={activeStep}
                triggerNextStep={handleNext}
                handleLastStep={handleReset}
              />
              {step.hasButtons !== false && (
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </Box>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === 2 && (
        <Paper square elevation={0} sx={{ p: 3, width: '100%' }}>
          <CollapsibleTable />
        </Paper>
      )}
    </Box>
  );
}
