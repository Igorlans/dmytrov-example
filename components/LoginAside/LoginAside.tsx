import React, { FC, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
interface ILoginAsideProps {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
}

interface ILoginFormData {
    login: string;
    password: string;
}


const LoginAside: FC<ILoginAsideProps> = ({ open, setOpen }) => {
    const router = useRouter();
    const { data } = useSession();
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginFormData>({
        defaultValues: {
            login: "",
            password: ""
        }
    });

    const onClose = () => {
        setOpen(false);
    };

    const submitHandler = async (data: ILoginFormData) => {
        console.log(data);
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: data.login,
                password: data.password
            });
            if (!res?.ok) {
                if (res?.error) throw new Error(res?.error);
                throw new Error('Помилка входу')
            }
            toast.success(t("validation:loginSuccess"));
            onClose();
        } catch (e: any) {
            toast.error(e.message);
        }
    };


    return (
        <div
            className={
                open ? "aside-popup aside-popup--active" : "aside-popup"
            }
        >
            <form className="aside-popup__content" onSubmit={handleSubmit(submitHandler)}>
                <div
                    className="aside-popup__close"
                    onClick={onClose}
                >
                    <svg
                        width="52"
                        height="52"
                        viewBox="0 0 52 52"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_116_3458)">
                            <path
                                d="M28.8728 26.0001L51.4051 3.46767C52.1984 2.67436 52.1984 1.38818 51.4051 0.594977C50.6118 -0.198224 49.3256 -0.198326 48.5324 0.594977L26 23.1274L3.46767 0.594977C2.67436 -0.198326 1.38818 -0.198326 0.594977 0.594977C-0.198224 1.38828 -0.198326 2.67447 0.594977 3.46767L23.1273 26L0.594977 48.5324C-0.198326 49.3257 -0.198326 50.6119 0.594977 51.4051C0.991578 51.8017 1.51148 51.9999 2.03137 51.9999C2.55127 51.9999 3.07107 51.8017 3.46777 51.4051L26 28.8728L48.5323 51.4051C48.9289 51.8017 49.4488 51.9999 49.9687 51.9999C50.4886 51.9999 51.0084 51.8017 51.4051 51.4051C52.1984 50.6118 52.1984 49.3256 51.4051 48.5324L28.8728 26.0001Z"
                                fill="#353535"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_116_3458">
                                <rect width="52" height="52" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <div className="aside-popup__form">
                    <div className="aside-popup__title">{ t("common:droverTitle") }</div>
                    <div className="aside-popup__form-item">
                        <input
                            {...register("login", {
                                required: "Поле обов'язкове"
                            })}
                            className="input"
                            id="form-loin"
                        ></input>
                        <label className="label" htmlFor="form-loin">
                            Email
                        </label>
                        {errors.login && <span className="error-message">{errors.login?.message}</span>}
                    </div>
                    <div className="aside-popup__form-item">
                        <input
                            {...register("password", {
                                required: "Поле обов'язкове"
                            })}
                            className="input"
                            id="form-password"
                        ></input>
                        <label className="label" htmlFor="form-password">
                            Пароль
                        </label>
                        {errors.password && <span className="error-message">{errors.password?.message}</span>}
                    </div>
                    <div className="aside-popup__links">
                        <div
                            className="aside-popup__link"
                            onClick={onClose}
                        >
                            <Link href="/register" style={{ color: "#e55733" }}>
                                { t("common:droverCreateAccount")}
                            </Link>
                        </div>
                        <div
                            className="aside-popup__link"
                            onClick={() => {
                                onClose();
                                router.push("/forgotPassword");
                            }}>
                            { t("common:droverForgotPassword")}
                        </div>
                    </div>
                    {/*<label className="aside-popup__check-box-label aside-popup__check-box-label-account">*/}
                    {/*    <input className="aside-popup__check-box-input" type="checkbox" />*/}
                    {/*    <span className="aside-popup__check-box-style"></span>*/}
                    {/*    Запам’ятати мене*/}
                    {/*</label>*/}
                    <div
                        className="aside-popup__btn button"
                        onClick={handleSubmit(submitHandler)}
                    >
                        { t("common:droverLogin") }
                    </div>
                </div>
            </form>


        </div>
    );
};

export default LoginAside;