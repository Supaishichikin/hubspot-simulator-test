import StepperProgressContext from "./stepperProgressContext";
import { useState } from "react";

const StepperProgressContextProvider = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(0);
    return (
        <StepperProgressContext.Provider value={{currentStep: currentStep, setCurrentStep: setCurrentStep}}>
            {children}
        </StepperProgressContext.Provider>
    )
}

export default StepperProgressContextProvider;