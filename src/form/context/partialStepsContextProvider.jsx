import PartialStepsContext from "./partialStepsContext";
import { useState, useEffect } from "react";

const PartialStepsContextProvider = ({ children }) => {
    const [partialSteps, setPartialSteps] = useState([]);
    const [partialAnswers, setPartialAnswers] = useState([]);
    const [currentPartialStep, setCurrentPartialStep] = useState(0);

    return (
        <PartialStepsContext.Provider value={{
            partialSteps: partialSteps, 
            setPartialSteps: setPartialSteps,
            partialAnswers: partialAnswers,
            setPartialAnswers: setPartialAnswers,
            currentPartialStep: currentPartialStep,
            setCurrentPartialStep: setCurrentPartialStep
        }}>
            {children}
        </PartialStepsContext.Provider>
    )
}

export default PartialStepsContextProvider;