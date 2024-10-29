import { Box, Button } from "@mui/material"
import { useContext, useState } from "react";
import ChoicePath from "./ChoicePath";
import HubspotEmailInput from "../inputs/HubspotEmailInput";
import StepperProgressContext from "../context/stepperProgressContext";
import FinalPath from "./FinalPath";

const formPathMapping = [
    {"name":"marketing", "label":"Marketing Hub"},
    {"name":"sales", "label":"Sales Hub"},
    {"name":"operations", "label":"Operations Hub"},
    {"name":"content", "label":"Content Hub"},
    {"name":"service", "label":"Service Hub"},
    {"name":"commerce", "label":"Commerce Hub"}
]


export default function FormPath() {
    const [selected, setSelected] = useState(null);
    const [confirmed, setConfirmed] = useState(false);
    const [choicePathCompleted, setChoicePathCompleted] = useState(false);
    const [choicePathGeneralCompleted, setChoicePathGeneralCompleted] = useState(false);
    const [emailCompleted, setEmailCompleted] = useState(false)
    const {currentStep, setCurrentStep} = useContext(StepperProgressContext)
    

    function handleSelected(name) {
        return () => {
            setSelected(name);
        }
    }

    return (
        <>
            {confirmed === false && 
                <Box sx={{display: "flex", flexDirection: "column", width: "100%", margin: "auto 10px"}}>
                    <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center",
                        alignItems: "center", width: "100%", gap: "20px"}}>
                        {formPathMapping.map((path, index) => {
                            return (
                                <Box onClick={handleSelected(path.name)} key={path.name} 
                                sx={{
                                    flexBasis: "calc(33.333% - 20px)", height: "130px",
                                    cursor: "pointer",backgroundColor: selected == path.name ? "#F57C00" : "#18181A",
                                    color: "#fff", display: "flex", justifyContent: "center", 
                                    borderRadius: "10px", alignItems: "center",cursor: "pointer"
                                }}>
                                    {path.label}
                                </Box>
                            )})
                        }
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                        <Button onClick={() => {
                            setConfirmed(true);
                            setCurrentStep(currentStep + 1)
                        }} sx={{ margin: "20px", border: "1px solid #FFF",
                            background: "#18181A", color: "#FFF"}}>
                            Suivant
                        </Button> 
                    </Box>
                </Box>
            }
            {confirmed && !choicePathCompleted && 
                <ChoicePath hubMcq={true} setConfirmed={setConfirmed} setSelectedHub={setSelected}
                setHubMcqCompleted={setChoicePathCompleted} choice={selected} setGeneralMcqCompleted={setChoicePathGeneralCompleted} />
            }
            {choicePathCompleted && !choicePathGeneralCompleted &&
                <ChoicePath hubMcq={false} setConfirmed={setConfirmed} setSelectedHub={setSelected}
                setGeneralMcqCompleted={setChoicePathGeneralCompleted} choice={selected} setHubMcqCompleted={setChoicePathCompleted} />
            }
            {choicePathGeneralCompleted && choicePathCompleted && !emailCompleted &&
                <Box sx={{display: "flex", flexDirection: "column", margin: "auto"}}>
                    <Box component={"h2"} sx={{color: "#fff", mb: "45px"}}>Veuillez entrer votre email pour recevoir les résultats : </Box>
                    <Box sx={{width: "70%"}}>
                        <HubspotEmailInput setCompleted={setEmailCompleted} />
                    </Box>
                </Box>
            }
            {emailCompleted &&
                <FinalPath />
            }
        </>
    )
}