import { ChangeEvent, FC, HTMLAttributes, useState } from "react";

export type CheckboxChangeEvent<T extends HTMLInputElement> = ChangeEvent<T> & {
    target: T & { type: "checkbox" };
};

type CheckboxVariants = "checked" | "filled";

interface ICheckboxProps extends HTMLAttributes<HTMLInputElement> {
    value: boolean;
    label?: string;
    variant?: CheckboxVariants;
    onChange: (e: CheckboxChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: FC<ICheckboxProps> = ({
    value,
    label,
    onChange,
    variant,
    ...props
}) => {
    return (
        <label className="aside-popup__check-box-label create__item-label">
            <input
                checked={value}
                onChange={onChange}
                className="aside-popup__check-box-input"
                type="checkbox"
                {...props}
            />
            <span className="aside-popup__check-box-style"></span>
            {label}
        </label>
    );
};

export default Checkbox;
