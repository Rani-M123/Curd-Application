
import TextFieldForm from "./TextFieldForm";

// import  { ChoiceGroupForm } from './ChoiceGroupForm';


export const DynamicFieldLoad = (fieldName: string, item: any) => {
    switch (fieldName) {  
       case "TextFieldForm":
            return <TextFieldForm {...item} />;
      
            
        default:
            return 'Component Missing';
    }
};
export default DynamicFieldLoad;
