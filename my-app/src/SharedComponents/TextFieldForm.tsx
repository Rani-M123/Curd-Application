
import { TextField } from "@fluentui/react";
import { Control, Controller, useFormContext } from "react-hook-form";

interface ITextFieldFormProps {
  name: string | number | any;
  typeOf?: string | number;
  label: string;
  isRequired?: boolean;
  isdisabled?: boolean;
  isReadyOnly?: boolean;
  defaultValue?: string;
  control?: Control<any>;
  register?: any;
  placeholder?: string;
}
 
const TextFieldForm = ({
  name,
  label,
  isRequired,
  isdisabled,
  isReadyOnly,
  defaultValue,
  placeholder,
  typeOf
}: //register,
ITextFieldFormProps) => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({
          field,
          fieldState: { error, invalid, isTouched, isDirty },
        }) => {
          return (
            <>
              <div
                className={
                  isRequired ? (error ? "errorGroup" : "errorGroupStar") : ""
                }
              > 
                <TextField
                  type={typeOf === 'number'?"number":'text'}
                  label={label}
                  styles={{fieldGroup:{background:"rgb(237,237,237)", border:0,borderRadius:8,}}}
                  disabled={isdisabled}
                  readOnly={isReadyOnly}
                  defaultValue={defaultValue}
                  placeholder={placeholder}
                  {...field}
                  errorMessage={error ? error.message : ""}
                  className={
                    isRequired ? (error ? "errorGroup" : "errorGroupStar") : ""
                  }
                />
              </div>
            </>
          );
        }}
      />
    </>
  );
};

export default TextFieldForm;
