import { Box } from "@mui/material"
import { useContext, useEffect } from "react"
import StepperProgressContext from "../context/stepperProgressContext";
import PartialStepsContext from "../context/partialStepsContext";
import GeneralStepsContext from "../context/generalStepsContext";
import { Results } from "../../api/api";

export default function HubspotEmailInput({setCompleted}){

    const { setCurrentStep, currentStep } = useContext(StepperProgressContext);
    const { partialAnswers } = useContext(PartialStepsContext);
    const { generalAnswers } = useContext(GeneralStepsContext);
    const portalId = process.env.REACT_APP_HUBSPOT_PORTAL_ID;
    const formId = process.env.REACT_APP_HUBSPOT_FORM_ID;


    useEffect(() => {
        // Crée le script et l'injecte dans la page
        const script = document.createElement('script');
        script.src = '//js.hsforms.net/forms/embed/v2.js';
        script.charset = 'utf-8';
        script.type = 'text/javascript';
        script.async = true; // Assure que le script est chargé de façon asynchrone
    
        // Une fois le script chargé, il faut appeler la fonction hbspt.forms.create()
        script.onload = () => {
          if (window.hbspt) {
            window.hbspt.forms.create({
              portalId: portalId, // Remplace par ton Portal ID HubSpot
              formId: formId, // Remplace par ton Form ID HubSpot
              target: '#hubspotForm', // Cible l'élément où le formulaire sera injecté
              onFormSubmit: () => {
                //Results([partialAnswers, generalAnswers]);
                console.log([partialAnswers, generalAnswers]);
                setCurrentStep(currentStep + 1);
                setCompleted(true);
              }
            });
          }
        };
    
        // Ajoute le script au body
        document.body.appendChild(script);
    
        // Nettoyage : Supprime le script lorsque le composant est démonté
        return () => {
          document.body.removeChild(script);
        };
    }, []); // Utilise un tableau vide pour ne l'exécuter qu'une fois au montage
    
    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Box sx={{padding: "20px", background: "#fff", borderRadius: "10px"}}>
                <Box id="hubspotForm"></Box>
            </Box>
        </Box>
      );
}