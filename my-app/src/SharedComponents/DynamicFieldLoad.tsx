import { ChoiceGroup } from "@fluentui/react";
import TextFieldForm from "./TextFieldForm";

// import  { ChoiceGroupForm } from './ChoiceGroupForm';


export const DynamicFieldLoad = (fieldName: string, item: any) => {
    switch (fieldName) {  
       case "TextFieldForm":
            return <TextFieldForm {...item} />;
        case "ChoiceGroupForm":
            return <ChoiceGroup {...item}/>;
            
        default:
            return 'Component Missing';
    }
};
export default DynamicFieldLoad;
