import { Control, Controller, FieldValues, Path } from "react-hook-form";
import Textarea from "@/components/UI/Textarea/Textarea";
import React from "react";

interface IFormTextAreaProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    style?: React.CSSProperties;
    placeholder?: string;
}

const FormTextarea = <T extends FieldValues>({
                                                 name,
                                                 control,
                                                 style,
                                                 label,
                                                 placeholder
                                             }: IFormTextAreaProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <>
                    <Textarea
                        value={field.value}
                        style={style}
                        onChange={field.onChange}
                        label={label}
                        placeholder={placeholder}
                    />
                    {error && <div>{error?.message}</div>}
                </>
            )}
        />
    );
};

export default FormTextarea;
