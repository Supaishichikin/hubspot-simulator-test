import React, {useContext} from 'react';
import { Box, Typography } from '@mui/material';
import StepperProgressContext from "../form/context/stepperProgressContext"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ProgressBar = () => {
  const { currentStep } = useContext(StepperProgressContext);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '20%',
        backgroundColor: '#18181A',
        padding: '20px',
        borderRight: '1px solid #fff',
      }}
    >
      <Typography
        sx={{ color: '#fff', fontSize: '20px', marginBottom: '20px' }}
      >
        Hubspot Simulator
      </Typography>
      
      <Box
        sx={{
          position: 'relative',
          height: `${4 * 150}px`, // Adjust the height based on steps
          width: '10px',
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => {
          const isCompleted = index < currentStep ;
          return (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                top: `${index * 150}px`,
                display: 'flex',
                alignItems: 'center',
                left: '-15px',
                justifyContent: 'center',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: isCompleted ?' 2px solid #f58b00' : ' 2px solid #fff',
                backgroundColor: '#000',
                color: '#fff',
                zIndex: 1,
              }}
            >
              {isCompleted ? <CheckCircleIcon style={{ color: '#000', background: "#F57C00" }}/> :
               null}
            </Box>
          );
        })}

        {/* The line */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            width: '5px',
            backgroundColor: '#fff',
            height: '100%',
            zIndex: 0,
          }}
        >
          {/* Highlight progress */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '5px',
              height: currentStep != 1 ?`${(currentStep) * 25}%` : '0%',
              backgroundColor: '#f58b00',
              zIndex: 0,
            }}
          />
        </Box>
      </Box>

      {/* Display percentage */}
      <Typography
        sx={{
          color: '#fff',
          fontSize: '30px',
          marginTop: '20px',
        }}
      >
        {currentStep/4*100}%
      </Typography>
    </Box>
  );
};

export default ProgressBar;