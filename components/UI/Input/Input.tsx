import { FC } from "react";
import ReactInputMask from "react-input-mask";

interface IInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    style?: React.CSSProperties,
    mask?: string;
    disabled?: boolean;
}

const Input: FC<IInputProps> = ({ value, onChange, disabled, style, mask, placeholder, label }) => {
    return (
        <div className="aside-popup__form-item">
            {mask ?
                <ReactInputMask
                    mask={mask}
                    disabled={disabled}
                    value={value}
                    style={style}
                    onChange={onChange}
                    className="input"
                    placeholder={placeholder}
                />
                : <input
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                    style={style}
                    className="input"
                    placeholder={placeholder}
                ></input>
            }

            {label && <label className="label">{label}</label>}
        </div>
    );
};

export default Input;
