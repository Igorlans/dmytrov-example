import {
    Control,
    Controller,
    FieldValues,
    Path,
    PathValue
} from "react-hook-form";
import Input from "@/components/UI/Input/Input";

interface IFormInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    defaultValue?: PathValue<T, Path<T>>;
    disabled?: boolean;
    mask?: string;
    onChange?: () => void;
}

const FormInput = <T extends FieldValues>({
                                              name,
                                              disabled,
                                              control,
                                              mask,
                                              label,
                                              defaultValue,
                                              onChange
                                          }: IFormInputProps<T>) => {
    return (
        <>
            <Controller
                name={name}
                defaultValue={defaultValue}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <Input
                            mask={mask}
                            disabled={disabled}
                            value={field.value}
                            onChange={(e) => {
                                onChange && onChange();
                                field.onChange(e);
                            }}
                            label={label}
                        />
                        {error && <div style={{
                            fontSize: 13,
                            margin: "5px 0",
                            paddingLeft: 8,
                            color: "#d22e2e"
                        }}>{error?.message}</div>}
                    </>
                )}
            />
        </>
    );
};

export default FormInput;
