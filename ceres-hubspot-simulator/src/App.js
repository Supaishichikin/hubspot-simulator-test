import logo from './logo.svg';
import MultiStepForm from './form/MultiStepForm';
import PartialStepsContextProvider from './form/context/partialStepsContextProvider';
import GeneralStepsContextProvider from "./form/context/generalStepsContextProvider";
import StepperProgressContextProvider from './form/context/stepperProgressContextProvider';

function App() {
  return (
    <StepperProgressContextProvider>
      <GeneralStepsContextProvider>
        <PartialStepsContextProvider> 
          <MultiStepForm/>
        </PartialStepsContextProvider>
      </GeneralStepsContextProvider>
    </StepperProgressContextProvider>
  );
}

export default App;
