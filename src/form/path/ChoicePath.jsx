import { useContext, useEffect } from "react";
import dataOperations from "../../questions_data/operations.json";
import dataMarketing from "../../questions_data/marketing.json";
import dataSales from "../../questions_data/sales.json";
import dataService from "../../questions_data/service.json";
import dataCommerce from "../../questions_data/commerce.json";
import dataContent from "../../questions_data/content.json";
import general from "../../questions_data/general.json"
import PartialStepsContext from "../context/partialStepsContext";
import GeneralStepsContext from "../context/generalStepsContext";
import StepperProgressContext from "../context/stepperProgressContext";
import StepperProgress from "../../progress_bar/StepperProgress";
import { useState } from "react";
import { Box, Button } from "@mui/material";

export default function ChoicePath({choice, setHubMcqCompleted, setGeneralMcqCompleted,
    hubMcq, setSelectedHub, setConfirmed}) {

    const { setPartialSteps, partialSteps, partialAnswers,
    currentPartialStep, setCurrentPartialStep, setPartialAnswers,
    } = useContext(PartialStepsContext);

    const { setGeneralSteps, generalSteps, generalAnswers,
    currentGeneralStep, setCurrentGeneralStep, setGeneralAnswers,
    } = useContext(GeneralStepsContext);

    const {setCurrentStep: setProgressStep, currentStep: currentProgressStep
    } = useContext(StepperProgressContext)

    const [selected, setSelected] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState([])
    const [answers, setAnswers] = useState();

    function handleSelected(name) {
        return () => {
            setSelected(name);
        }
    }

    useEffect(() => {
        let newPartialSteps;
        if(hubMcq){
            if(partialSteps.length === 0){
                switch(choice) {
                    case "operations":
                        newPartialSteps = dataOperations.groups.map(group => {
                            return {
                                name: group.name,
                                label: group.label,
                                questions: group.options
                            }
                        });
                        break;
                    case "marketing":
                        newPartialSteps = dataMarketing.groups.map(group => {
                            return {
                                name: group.name,
                                label: group.label,
                                questions: group.options
                            }
                        });
                        break;
                    case "sales":
                        newPartialSteps = dataSales.groups.map(group => {
                            return {
                                name: group.name,
                                label: group.label,
                                questions: group.options
                            }
                        });
                        break;
                    case "service":
                        newPartialSteps = dataService.groups.map(group => {
                            return {
                                name: group.name,
                                label: group.label,
                                questions: group.options
                            }
                        });
                        break;
                    case "commerce":
                        newPartialSteps = dataCommerce.groups.map(group => {
                            return {
                                name: group.name,
                                label: group.label,
                                questions: group.options
                            }
                        });
                        break;
                    case "content":
                        newPartialSteps = dataContent.groups.map(group => {
                            return {
                                name: group.name,
                                label: group.label,
                                questions: group.options
                            }
                        });
                        break;
                    default:
                        break;
                }
                setPartialSteps(newPartialSteps);
                setCurrentPartialStep(0);
                setSteps(newPartialSteps);
            }else{
                setSteps(partialSteps);
                setAnswers(partialAnswers);
                setCurrentStep(currentPartialStep);
            }
        }else{
            if(generalSteps.length === 0){
                newPartialSteps = general.groups.map(group => {
                    return {
                        name: group.name,
                        label: group.label,
                        questions: group.options
                    }
                });
                setGeneralSteps(newPartialSteps);
                setCurrentGeneralStep(0);
                setSteps(newPartialSteps);
            }else{
                setSteps(generalSteps);
                setAnswers(generalAnswers);
                setCurrentStep(currentGeneralStep);
            }
        }
        
    }, [partialSteps, dataOperations, dataMarketing, dataSales,
        dataService, dataCommerce, choice, currentGeneralStep,
        currentPartialStep, generalSteps, general]);
    
    return (
        <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
            <Box sx={{display: "flex", height: "fit-content", flexDirection: "column", width: "100%"}}>
                <Box sx={{background: "#18181A", paddingBottom: "30px", paddingTop: "20px"}}>
                    <StepperProgress hubMcq={hubMcq} />
                </Box>
            </Box>
            <Box component={"span"} sx={{color: "#FFF", textAlign: "center", mt:"40px", fontSize: "20px", fontWeight: "Bold"}}>{steps[currentStep]?.label}</Box>
            <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center",
                alignItems: "center", width: "100%", gap: "40px", margin: "auto 0"}}>
                {steps?.length > 0 && steps[currentStep]?.questions?.map((question, index) => {
                    return (
                    <Box sx={{
                        flexBasis: "calc(40% - 40px)", height: "130px", textAlign: "center",
                        cursor: "pointer",backgroundColor: selected == question.value ? "#F57C00" : "#18181A",
                        color: "#fff", display: "flex", justifyContent: "center", cursor: "pointer",
                        borderRadius: "10px", alignItems: "center", padding: "15px"
                    }} onClick={handleSelected(question.value)} key={question.value} component={"div"}>
                        {question.label}
                    </Box>
                )})}
            </Box>
            <Box sx={{display: "flex", justifyContent: "space-around", width: "100%"}}>
                <Button onClick={() =>{
                    if(currentStep > 0) {
                        const values = Object.values(answers);
                        setSelected(values[currentStep - 1])
                        const keys = Object.keys(answers);
                        const lastKey = keys[keys.length - 1];
                        delete answers[lastKey];
                        if(hubMcq){
                            setCurrentPartialStep(currentPartialStep - 1)
                        }else{
                            setCurrentGeneralStep(currentGeneralStep - 1)
                        }
                        setCurrentStep(currentStep - 1);
                    }else{
                        if(hubMcq){
                            setPartialAnswers({}); setPartialSteps([]); setCurrentStep(0); setProgressStep(currentProgressStep - 1);
                            setCurrentPartialStep(0); setSelectedHub(false); setConfirmed(false);
                        }else{
                            setGeneralAnswers({}); setGeneralSteps([]); setCurrentStep(0); setCurrentPartialStep(currentPartialStep -1);
                            setCurrentGeneralStep(0); setHubMcqCompleted(false); setProgressStep(currentProgressStep - 1);
                            
                        }
                    }
                }} sx={{ margin: "20px", border: "1px solid #FFF",
                    background: "#18181A", color: "#FFF"}}>
                    Précédent
                </Button>
                <Button onClick={() =>{
                    if(selected) {
                        if(hubMcq){
                            setPartialAnswers(prev => {
                                return {
                                    ...prev,
                                    [steps[currentStep].name]: selected
                                }
                            });
                        }else{
                            setGeneralAnswers(prev => {
                                return {
                                    ...prev,
                                    [steps[currentStep].name]: selected
                                }
                            });
                        }
                        setAnswers(prev => {
                            return {
                                ...prev,
                                [steps[currentStep].name]: selected
                            }
                        });
                        if(currentStep +1 == steps?.length){
                            if(hubMcq){
                                setHubMcqCompleted(true)
                            }else{
                                setGeneralMcqCompleted(true)
                            }
                            setProgressStep(currentProgressStep + 1)
                        }
                        if(currentStep < steps.length){ 
                            setCurrentStep(currentStep + 1);
                            if(hubMcq){
                                setCurrentPartialStep(currentStep + 1)
                            }else{
                                setCurrentGeneralStep(currentStep + 1)
                            }
                        }
                        setSelected(null);
                    }
                }} sx={{ margin: "20px", border: "1px solid #FFF",
                    background: "#18181A", color: "#FFF"}}>
                    Suivant
                </Button>
            </Box>
        </Box>
    );
}