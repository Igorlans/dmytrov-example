import MainLayout from "@/components/MainLayout";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { ISignUpForm } from "@/types/types";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signUpRequest } from "@/requests/userRequests";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import prisma from "@/prisma/client";
import SeoBlock from "@/components/SeoBlock/SeoBlock";
import { gtmService } from "@/services/gtmService";

export async function getStaticProps( { locale } : { locale: any } ) {

    const seo = await prisma.seo.findFirst({
        where: {
            page: '/register'
        }
    })

    let services = await prisma.services.findMany({
        orderBy: {
            order: "asc"
        }
    });
    services = JSON.parse(JSON.stringify(services));

    return {
        props: {
            seo,
            ...(await serverSideTranslations(locale, ['register', 'common', "validation"])),
        },
        revalidate: 50
    };
}

const Register = ({seo, services}: any) => {
    const router = useRouter();
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const { t } = useTranslation();
    
    const togglePasswordVisibility = (index: number) => {
        if (index === 1) {
            setShowPassword1(!showPassword1);
        } else if (index === 2) {
            setShowPassword2(!showPassword2);
        }
    };

    const { register, handleSubmit, formState: { errors }, watch, setError, setValue } = useForm<ISignUpForm>({
        defaultValues: {
            name: "",
            surname: "",
            skype: "",
            password: "",
            father_name: "",
            phone: "",
            email: "",
            confirmPassword: "",
            reemail: ""
        }
    });
    const password = useRef({});
    password.current = watch("password", "");
    const reemail = useRef({});
    reemail.current = watch("reemail", "");

    const hadlerSendForm = async (data: ISignUpForm) => {
        try {
            await toast.promise(
                signUpRequest(data),
                {
                    loading: "Створення користувача...",
                    success: (data) => {
                        (async () => {
                            const res = await signIn("credentials", {
                                redirect: false,
                                email: data?.email,
                                password: data?.password
                            });
                            if (!res?.ok) {
                                if (res?.error) throw new Error(res?.error);
                                throw new Error('Помилка входу')
                            }
                            gtmService.registrationCompleted();
                            // toast.success(t("validation:loginSuccess"));
                            router.push("/accountpage");
                        })();
                        return `Створено користувача ${data?.email}`;
                    },

                    error: (err) => err.message
                }
            );
            console.log(data);
        } catch (e) {
            console.error(e);
        }


        // if (data.email !== data.reemail) {
        //   setError('reemail', { type: 'manual', message: 'Email не співпадає' });
        //   return;
        // }

        // try {
        //   await fetch('http://localhost:3001/api/auth', {
        //     method: "POST",
        //     body: JSON.stringify(data)
        //   })
        //   .then(response => response.json())
        //   .then(data => console.log(data))
        //   .catch(error => console.error(error));
        //
        // } catch (error) {
        //   console.log(error)
        // }

    };  // TODO: handle form submission


    return (
        <MainLayout services={services}>
            {/* <ScrollToTopOnMount /> */}
            <section className="register">
                <div className="container">
                    <Link href={"/createpage"} className="button top__mob-btn">Замовити проєкт</Link>
                    <form onSubmit={handleSubmit(hadlerSendForm)}>
                        <div className="register__wrapper">
                            <h1 className="main-title register__title">{ t("register:title") }</h1>
                            <div className="register__inner">
                                <div className="register__box">
                                    <div className="register__box-title">{ t("register:personalInfo") }</div>
                                    <div className="register__box-grid">
                                        <div className="aside-popup__form-item register__box-item">
                                            <input
                                                type="text"
                                                className="input"
                                                id="form-surname"
                                                {...register("surname", {
                                                    required: `${ t("register:surname") } ${ t("register:required") }`,
                                                    pattern: {
                                                        value: /^[А-Яа-яІіЇїЄєҐґ']+$/u,
                                                        message: `${ t("register:surname") } ${ t("register:surnameErrorMsg") }`
                                                    }
                                                })}
                                            />
                                            <label className="label" htmlFor="form-surname">
                                                { t("register:surname") }<span>*</span>
                                            </label>
                                            {errors.surname && errors.surname.type === "pattern" && <span
                                                className="error-message">{ t("register:surname") } { t("register:surnameErrorMsg") }</span>}
                                            {errors.surname && errors.surname.type === "required" &&
                                                <span className="error-message">{ t("register:surname") } { t("register:required3") }</span>}
                                        </div>


                                        <div className="aside-popup__form-item register__box-item">
                                            <input
                                                type="text"
                                                className={`input ${errors.name && "error"}`}
                                                id="form-surname"
                                                {...register("name", {
                                                    required: `${ t("register:name") } ${ t("register:required3") }`,
                                                    pattern: {
                                                        value: /^[А-Яа-яІіЇїЄєҐґ']+$/u,
                                                        message: `${ t("register:surname") } ${ t("register:nameErrorMsg") }`
                                                    }
                                                })}
                                            />
                                            <label className="label" htmlFor="form-name">
                                            { t("register:name") }<span>*</span>
                                            </label>
                                            {errors.name && errors.name.type === "pattern" &&
                                                <span className="error-message">{ t("register:name") } { t("register:nameErrorMsg") }</span>}
                                            {errors.name && errors.name.type === "required" &&
                                                <span className="error-message">{ t("register:name") } { t("register:required") }</span>}
                                        </div>
                                        <div className="aside-popup__form-item register__box-item">
                                            <input
                                                type="text"
                                                className="input"
                                                id="form-nameth"
                                                {...register("father_name")}
                                            ></input>
                                            <label className="label" htmlFor="form-nameth">
                                                { t("register:byFuther") }
                                            </label>
                                        </div>
                                        <div className="aside-popup__form-item register__box-item">
                                            <InputMask
                                                mask="+38 (099) 999-99-99"
                                                maskChar="_"
                                                type="text"
                                                className={`input ${errors.phone && "error"}`}
                                                id="form-phone"
                                                {...register("phone", { required: true })}
                                            />
                                            <label className="label" htmlFor="form-phone">
                                                { t("register:phone") }<span>*</span>
                                            </label>
                                            {errors.phone &&
                                                <span className="error-message">{ t("register:phone") } { t("register:required2") }</span>}
                                        </div>
                                        <div className="aside-popup__form-item register__box-item">
                                            <input
                                                type="text"
                                                className="input"
                                                id="form-regemail"
                                                {...register("email", {
                                                    required: `Email ${ t("register:required2") }`,
                                                    pattern: {
                                                        value: /^\S+@\S+$/i,
                                                        message: `${ t("register:emailErrorMsg") }`
                                                    }
                                                })}
                                            ></input>
                                            <label
                                                className="label"
                                                htmlFor="form-regemail"
                                            >
                                                Email<span>*</span>
                                            </label>
                                            {errors.email &&
                                                <span className="error-message">{ t("register:emailErrorMsg") }</span>}
                                        </div>
                                        <div className="aside-popup__form-item register__box-item">
                                            <input
                                                type="text"
                                                className="input"
                                                id="form-reemail"
                                                {...register("reemail", {
                                                    required: true,
                                                    validate: (value) =>
                                                        value === reemail.current || `Email ${ t("register:notMatch") }`
                                                })}
                                            ></input>
                                            <label
                                                className="label"
                                                htmlFor="form-reemail"
                                            >
                                                { t("register:repeatEmail") } Email<span>*</span>
                                            </label>
                                            {errors.reemail &&
                                                <span className="error-message">{ t("register:needRepeat") } Email</span>}
                                        </div>
                                        <div className="aside-popup__form-item register__box-item">
                                            <input
                                                type="text"
                                                className="input"
                                                id="form-skype"

                                                {...register("skype")}
                                            ></input>
                                            <label className="label" htmlFor="form-skype">
                                                Skype
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="register__box">
                                    <div className="register__box-title">Пароль</div>
                                    <div
                                        className="aside-popup__form-item register__box-item register__box-item-mb register__box-item-imp">
                                        <input
                                            type={showPassword1 ? "text" : "password"}
                                            className={`input ${errors.password && "error"}`}
                                            id="form-pass"

                                            {...register("password", {
                                                required: `Пароль ${ t("register:required2") }`,
                                                minLength: {
                                                    value: 6,
                                                    message: `${ t("register:passordErrorMsg")}`
                                                }
                                            })}
                                        />
                                        <label className="label" htmlFor="form-pass">
                                            { t("register:passord") }
                                        </label>
                                        <div className="toggleVisible"
                                             onClick={() => togglePasswordVisibility(1)}>{showPassword1 ?
                                            <BsEyeSlash size="1.2em" /> : <BsEye size="1.2em" />}</div>
                                        {errors.password && (
                                            <span className="error-message">{errors.password.message}</span>
                                        )}
                                    </div>
                                    <div className="aside-popup__form-item register__box-item register__box-item-mt"
                                         style={{ marginTop: "10px" }}>
                                        <input
                                            type={showPassword2 ? "text" : "password"} // залежно від стану показуємо текст або символи замість паролю
                                            className={`input ${
                                                errors.confirmPassword && "error"
                                            }`}
                                            id="form-repass"
                                            {...register("confirmPassword", {
                                                validate: (value) =>
                                                    value === password.current || `${ t("register:passords") } ${ t("register:notMatch") }`
                                            })}
                                        />
                                        <label className="label" htmlFor="form-repass">
                                            { t("register:repeatPassord") }
                                        </label>
                                        <div className="toggleVisible"
                                             onClick={() => togglePasswordVisibility(2)}>{showPassword2 ?
                                            <BsEyeSlash size="1.2em" /> : <BsEye size="1.2em" />}</div>
                                        {errors.confirmPassword && (
                                            <span className="error-message">
                                                {errors.confirmPassword.message}
                                            </span>
                                        )}
                                    </div>
                                    {/* <Link className="button register__btn" href="/accountpage" onClick={onSubmit}>Реєстрація</Link> */}
                                    <button className="button register__btn" style={{ border: "0px" }}
                                            onClick={handleSubmit(hadlerSendForm)}>
                                        { t("register:title") }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            <SeoBlock seo={seo} />
        </MainLayout>
    );
};


export default Register;