import GeneralStepsContext from "./generalStepsContext";
import { useState, useEffect } from "react";

const GeneralStepsContextProvider = ({ children }) => {
    const [generalSteps, setGeneralSteps] = useState([]);
    const [generalAnswers, setGeneralAnswers] = useState([]);
    const [currentGeneralStep, setCurrentGeneralStep] = useState(0);

    return (
        <GeneralStepsContext.Provider value={{
            generalSteps: generalSteps, 
            setGeneralSteps: setGeneralSteps,
            generalAnswers: generalAnswers,
            setGeneralAnswers: setGeneralAnswers,
            currentGeneralStep: currentGeneralStep,
            setCurrentGeneralStep: setCurrentGeneralStep
        }}>
            {children}
        </GeneralStepsContext.Provider>
    )
}

export default GeneralStepsContextProvider;