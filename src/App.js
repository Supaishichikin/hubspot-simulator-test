import logo from './logo.svg';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import MultiStepForm from './form/MultiStepForm';
import PartialStepsContextProvider from './form/context/partialStepsContextProvider';
import GeneralStepsContextProvider from "./form/context/generalStepsContextProvider";
import StepperProgressContextProvider from './form/context/stepperProgressContextProvider';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StepperProgressContextProvider>
            <GeneralStepsContextProvider>
              <PartialStepsContextProvider> 
                <MultiStepForm/>
              </PartialStepsContextProvider>
            </GeneralStepsContextProvider>
          </StepperProgressContextProvider>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
