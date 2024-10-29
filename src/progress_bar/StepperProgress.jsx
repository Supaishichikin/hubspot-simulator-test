import { Stepper, Box } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import PartialStepsContext from "../form/context/partialStepsContext";
import GeneralStepsContext from "../form/context/generalStepsContext";
import CustomStep from "./CustomStep";

export default function StepperProgress({hubMcq}) {
    
    const { currentPartialStep, partialSteps,
    partialAnswers } = useContext(PartialStepsContext);

    const {currentGeneralStep, generalSteps,
        generalAnswers } = useContext(GeneralStepsContext);

    const [currentStep, setCurrentStep] = useState(0)
    const [steps, setSteps] = useState();
    const [answers, setAnswers] = useState();
    const [progress, setProgress] = useState("");

    useEffect(() => {
        if(hubMcq){
            setCurrentStep(currentPartialStep);
            setSteps(partialSteps);
            setAnswers(partialAnswers)
        }else{
            setCurrentStep(currentGeneralStep);
            setSteps(generalSteps);
            setAnswers(generalAnswers)
        }
        setProgress(steps && steps.length > 0 ?
            (Math.round( Object.keys(answers).length  * 100 / steps.length)) + " %" : "0 %")

    }, [partialAnswers, partialSteps, generalSteps, currentPartialStep,
        currentGeneralStep, generalAnswers, partialAnswers, answers]);

    return (<>
        {steps && steps?.length > 0 && (Math.round( (currentStep + 1) * 100 / steps.length)) <= 100 && <>
        <Box sx={{display: "flex",  width: "100%", justifyContent: "center", marginTop: "50px"}}>
            
            <Stepper sx={{display: "flex",width: "60%", height: "fit-content"}} alternativeLabel 
                activeStep={currentStep}
            >
                {steps && steps?.map((step, index) => (
                    <CustomStep step={step} index={index} hubMcq={hubMcq} />
                ))}
            </Stepper>
            <div style={{textAlign: "left", fontSize: '24px', color: "#FFF" }}>
            {progress}
            </div>
        </Box>

            </>}
        
    </>);
}