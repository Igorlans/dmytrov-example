import React, { ChangeEvent, FC, useRef } from "react";
import useAutosizeTextArea from "@/components/UI/Textarea/useAutoSizeTextArea";

interface ITextareaProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    label?: string;
    style?: React.CSSProperties;
    placeholder?: string;
}

const Textarea: FC<ITextareaProps> = ({ value, onChange, label, placeholder, style }) => {

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useAutosizeTextArea(textAreaRef.current, value);

    return (
        <div className="aside-popup__form-item">
            <textarea
                ref={textAreaRef}
                value={value}
                onChange={onChange}
                placeholder={placeholder || ""}
                className="input aside-popup__input-textarea worksheet__item-textarea"
                style={{ ...style, marginBottom: "10px" }}
                // placeholder={label || ""}
            ></textarea>
            {label &&
                <label className="label">{label}</label>
            }
        </div>
    );
};

export default Textarea;
