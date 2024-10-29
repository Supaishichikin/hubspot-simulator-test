import React from 'react';
import ProgressBar from '../progress_bar/ProgressBar.jsx';
import { Box } from '@mui/material';
import FormPath from './path/FormPath.jsx';

const MultiStepForm = () => {
  
  return (
    <>
      <Box sx={{display: "flex", height: "100%",background: "#000"}}>
        <ProgressBar />
        <FormPath />
      </Box>
    </>
  );
};

export default MultiStepForm;
