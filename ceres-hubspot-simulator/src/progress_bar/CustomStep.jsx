import { useContext, useEffect, useState } from "react";
import PartialStepsContext from "../form/context/partialStepsContext";
import GeneralStepsContext from "../form/context/generalStepsContext";
import { Step, StepLabel, Box, StepContent } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function CustomStep({step, index, hubMcq}) {

    const { 
        currentPartialStep,
    } = useContext(PartialStepsContext);
    const {
        currentGeneralStep
    } = useContext(GeneralStepsContext);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if(hubMcq){
            setCurrentStep(currentPartialStep);
        }else{
            setCurrentStep(currentGeneralStep);
        }
    }, [currentPartialStep, currentGeneralStep])
    
    return <Step key={step.label} completed={index < currentStep}>
        <StepLabel
            key={step.label}
            StepIconComponent={() => (
                <Box
                    key={step.label}
                    sx={{
                        color: index < currentStep -1  ? '#F57C00' : '#FFF',
                        border: '2px solid',
                        borderColor: index < currentStep -1 || index === currentStep -1 ? '#F57C00' : '#fff',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: index < currentStep ? '#F57C00' : '#000',
                    }}
                >
                    {index <= currentStep -1 ? <CheckCircleIcon style={{ color: '#000', background: "#F57C00" }} /> : null}
                </Box>
            )}
        >
            <Box key={step.label} sx={{ color: "#FFF" }}>Étape {index + 1}</Box>
        </StepLabel>
    </Step>
}