import {
    Control,
    Controller,
    FieldValues,
    Path,
    PathValue,
} from "react-hook-form";
import Checkbox, {
    CheckboxChangeEvent,
} from "@/components/UI/Checkbox/Checkbox";

interface IFormCheckboxProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    defaultValue?: PathValue<T, Path<T>>;
    label: string;
    onChange?: (e: CheckboxChangeEvent<HTMLInputElement>) => void;
}

const FormCheckbox = <T extends FieldValues>({
    control,
    name,
    label,
    defaultValue,
    onChange,
}: IFormCheckboxProps<T>) => {
    return (
        <Controller
            defaultValue={defaultValue}
            name={name}
            control={control}
            render={({ field }) => (
                <Checkbox
                    onChange={(event) => {
                        if (onChange) {
                            onChange(event);
                        }
                        field.onChange(event);
                    }}
                    label={label}
                    value={field.value}
                />
            )}
        />
    );
};

export default FormCheckbox;
