import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

export interface FormInputProps {
    type?: string;
    name: string;
    control: any;
    label: string;
    setValue?: any;
}

export const FormInputText: React.FC<FormInputProps> = ({ type, name, control, label }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => (
                <TextField
                    type={type || "text"}
                    helperText={error ? error.message : null}
                    size="small"
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label={label}
                    margin="normal"
                />
            )}
        />
    );
};

export default FormInputText;