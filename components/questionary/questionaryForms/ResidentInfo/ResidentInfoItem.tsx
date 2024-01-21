import {
    Control,
    FormState,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form";
import { IResidentInfoAnswer } from "@/types/questionary/residentInfo";
import { FC } from "react";
import FormInput from "@/components/UI/Input/FormInput";

interface IResidentInfoItemProps {
    register: UseFormRegister<IResidentInfoAnswer>;
    setValue: UseFormSetValue<IResidentInfoAnswer>;
    formState: FormState<IResidentInfoAnswer>;
    control: Control<IResidentInfoAnswer>;
    watch: UseFormWatch<IResidentInfoAnswer>;
    index: number;
}

const ResidentInfoItem: FC<IResidentInfoItemProps> = ({
    register,
    index,
    setValue,
    formState,
    control,
    watch,
}) => {
    const dominantHand = watch(`residents.${index}.dominantHand`);
    const sex = watch(`residents.${index}.sex`);

    return (
        <div>
            <FormInput
                name={`residents.${index}.name` as const}
                control={control}
                label={"Ім'я*"}
            />
            <div className="worksheet__item-forabouts">
                <input
                    type={"hidden"}
                    {...register(`residents.${index}.sex` as const)}
                />
                <div
                    className={
                        sex === "MALE"
                            ? "worksheet__item-forabout worksheet__item-forabout--active"
                            : "worksheet__item-forabout"
                    }
                    onClick={() => setValue(`residents.${index}.sex`, "MALE")}
                >
                    <div className="worksheet__item-forabout-dot">
                        <span></span>
                    </div>
                    <div className="worksheet__item-forabout-text">Чоловік</div>
                </div>
                <div
                    className={
                        sex === "FEMALE"
                            ? "worksheet__item-forabout worksheet__item-forabout--active"
                            : "worksheet__item-forabout"
                    }
                    onClick={() => setValue(`residents.${index}.sex`, "FEMALE")}
                >
                    <div className="worksheet__item-forabout-dot">
                        <span></span>
                    </div>
                    <div className="worksheet__item-forabout-text">Жінка</div>
                </div>
            </div>
            <div className="worksheet__inputs-grid3">
                <FormInput
                    name={`residents.${index}.age` as const}
                    control={control}
                    label={"Вік"}
                />
                <FormInput
                    name={`residents.${index}.height` as const}
                    control={control}
                    label={"Зріст см (орієнтовно)"}
                />
                <FormInput
                    name={`residents.${index}.weight` as const}
                    control={control}
                    label={"Вага кг (орієнтовно)"}
                />
            </div>
            <div className="worksheet__item-forabouts">
                <input
                    type={"hidden"}
                    {...register(`residents.${index}.dominantHand` as const)}
                />
                <div
                    className={
                        dominantHand === "LEFT"
                            ? "worksheet__item-forabout worksheet__item-forabout--active"
                            : "worksheet__item-forabout"
                    }
                    onClick={() =>
                        setValue(`residents.${index}.dominantHand`, "LEFT")
                    }
                >
                    <div className="worksheet__item-forabout-dot">
                        <span></span>
                    </div>
                    <div className="worksheet__item-forabout-text">Лівша</div>
                </div>
                <div
                    className={
                        dominantHand === "RIGHT"
                            ? "worksheet__item-forabout worksheet__item-forabout--active"
                            : "worksheet__item-forabout"
                    }
                    onClick={() =>
                        setValue(`residents.${index}.dominantHand`, "RIGHT")
                    }
                >
                    <div className="worksheet__item-forabout-dot">
                        <span></span>
                    </div>
                    <div className="worksheet__item-forabout-text">Правша</div>
                </div>
            </div>
            <FormInput
                name={`residents.${index}.preferences` as const}
                control={control}
                label={"Фізичні особливості (Якщо є)"}
            />
        </div>
    );
};

export default ResidentInfoItem;
