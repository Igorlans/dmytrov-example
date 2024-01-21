import { useState, useEffect, useRef } from "react";
import { Rates } from "../data/Rates_plosha";
import { Slider } from "@mui/material";
import Link from "next/link";
import sendTelegram from "@/utils/sendTelegram";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactInputMask from "react-input-mask";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { useDynamicTranslate } from "@/utils/useDynamicTranslate";
import { gtmService } from "@/services/gtmService";

interface IFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
    agreement: boolean;
}

export const Services = ({ data }: any) => {
    const [valueRage, setValueRage] = useState<any>(75);
    const [price, setPrice] = useState(37500);
    const [openAside, setOpenAside] = useState(false);
    const [activeItem, setActiveItem] = useState<any>(0);
    const phoneInputsRef = useRef([]);
    const asidePopupRef = useRef(null);
    const { status } = useSession();
    const isAuthorized = status === "authenticated";
    const router = useRouter();
    const { t } = useTranslation();

    const dbTranslate = useDynamicTranslate()

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormData>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
            agreement: false

        }
    });


    useEffect(() => {
        const eventCallback = (e: any) => {
            const el = e.target;
            const clearVal = el.dataset.phoneClear;
            const pattern = el.dataset.phonePattern;
            const matrixDef = "+38(___) ___--";
            const matrix = pattern ? pattern : matrixDef;
            let i = 0;
            const def = matrix.replace(/\D/g, "");
            let val = e.target.value.replace(/\D/g, "");

            if (clearVal !== "false" && e.type === "blur") {
                if (val.length < matrix.match(/([\_\d])/g).length) {
                    e.target.value = "";
                    return;
                }
            }
            if (def.length >= val.length) val = def;
            e.target.value = matrix.replace(/./g, function(a: any) {
                return /[_\d]/.test(a) && i < val.length
                    ? val.charAt(i++)
                    : i >= val.length
                        ? ""
                        : a;
            });
        };

        phoneInputsRef.current.forEach((elem: any) => {
            ["input", "blur", "focus"].forEach((ev) => {
                elem.addEventListener(ev, eventCallback);
            });
        });

        return () => {
            phoneInputsRef.current.forEach((elem: any) => {
                ["input", "blur", "focus"].forEach((ev) => {
                    elem.removeEventListener(ev, eventCallback);
                });
            });
        };
    }, [phoneInputsRef]);


    const submitHandler = async (data: IFormData) => {
        console.log("FORM DATA", data);
        if (!data.agreement) return toast.error("Узгодьте умови політики і конфіденційності");
        reset();
        const projectRequest =
            `
Не влаштовує вартість

Ім'я: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Повідомлення: ${data.message}

`;
        sendTelegram(projectRequest, "backCall");
        setOpenAside(false);
        toast.success("Заявку створено");
    };


    useEffect(() => {
        const handleClick = (event: any) => {
            const clickedElement = event.target;

            if (
                //@ts-ignore
                asidePopupRef.current?.contains(clickedElement) &&
                !clickedElement.closest(
                    ".aside-popup__content, .aside-popup__form, .aside-popup__title, .aside-popup__form-item, .aside-popup__input, .aside-popup__label, .aside-popup__check-box-label, .aside-popup__check-box-input, .aside-popup__check-box-style, .aside-popup__btn, .button"
                )
            ) {
                setOpenAside(false);
            }
        };

        if (openAside) {
            document.addEventListener("click", handleClick);
        } else {
            document.removeEventListener("click", handleClick);
        }

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [openAside]);

    const handleInput = (event: any) => {
        const inputValue = event.target.value;
        if (!isNaN(inputValue)) {
            setValueRage(inputValue);
        }
    };

    const handler = (idx: number, price: any) => {
        setActiveItem(idx);
        setPrice(price);
    };

    useEffect(() => {
        setPrice(data[activeItem]?.price);
        console.log(price);
    }, []);

    return (
        <>
            <section className="services" id="calculate">
                <div className="container">
                    <div className="services__wrapper">
                        <div className="services__title-box">
                            <h2 className="services__title services__title-mob">

                                {t("main:seeAllServicesTitle")}
                                
                            </h2>
                            <div className="services__title-img services__title-img-mob">
                                <svg
                                    width="80"
                                    height="60"
                                    viewBox="0 0 80 60"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M47.44 0.00585938L44.3355 3.51789L71.6428 27.6568H0V32.3443H71.6428L44.3355 56.4832L47.44 59.9952L80 31.2132V28.7879L47.44 0.00585938Z"
                                        fill="#353535"
                                    />
                                </svg>
                                {/* <Link className="button services__title-btn" href={'/'}>
                Переглянути
              </Link> */}
                            </div>
                            <Link className="button services__title-btn" href={"/allservices"}>{ t("common:viewButton") }</Link>
                            {/* <Link className="button services__title-btn" to="../tariffs/all">
                Переглянути
              </Link>
              <Link
                className="button services__title-btn services__title-btn-mob"
                to="../tariffs/all"
              >
                Переглянути всi послуги
              </Link> */}
                        </div>
                        <div className="services__inner" id="square">
                            <div className="services__boxtext">
                                <h2 className="services__box-title">{ t("main:costTitle") }</h2>
                                <p className="services__box-text">

                                    { t("main:costDescr") }

                                </p>
                            </div>
                            <div className="services__box">
                                <div className="services__range-title">{ t("main:costFormArea")}:</div>
                                <div className="create__item-content-box">
                                    <div className="services__range-slider">
                                        <div className="services__range-slider-title">5</div>
                                        <Slider
                                            valueLabelDisplay="on"
                                            aria-label="Volume"
                                            value={valueRage}
                                            min={0}
                                            max={175}
                                            onChange={(e) => handleInput(e)}
                                            sx={{
                                                color: "#E55733",
                                                "& .MuiSlider-thumb": {
                                                    "&:hover, &.Mui-focusVisible": {
                                                        boxShadow: "none"
                                                    },
                                                    "&.Mui-active": {
                                                        boxShadow: "none"
                                                    }
                                                },
                                                "& .MuiSlider-valueLabelOpen": {
                                                    background: "#E55733",
                                                    borderRadius: "4px",
                                                    padding: "1px 7px",
                                                    fontSize: "16px",
                                                    lineHeight: "150%"
                                                }
                                            }}
                                        />
                                        <div className="services__range-slider-title">175+ м2</div>
                                    </div>
                                    <div className="aside-popup__form-item">
                                        <input
                                            name=""
                                            type="text"
                                            className="input"
                                            id="form-rage"
                                            value={valueRage}
                                            onChange={handleInput}
                                        ></input>
                                        <label className="label" htmlFor="form-rage">

                                            { t("main:costFormAreaInput") }

                                        </label>
                                    </div>
                                </div>
                                <div className="services__range-title services__range-title-mb">
                                    { t("main:costFormTariff") }:
                                </div>
                                <Rates handler={handler} activeItem={activeItem} setActiveItem={setActiveItem}
                                       price={price} setPrice={setPrice} data={data} />
                                <div className="services__priceproject">
                                    <div className="services__priceproject-box">
                                        <div className="services__priceproject-subtitle">
                                            <div className="services__project_price">{ t("main:costFormEstimated") }</div>
                                            { t("main:costFormProjectCost") }:
                                        </div>
                                        <div className="services__priceproject-title">
                                            {(valueRage * price).toFixed(0)}
                                            <span>грн</span>
                                        </div>
                                    </div>
                                    <div className="services__priceproject-btns">
                                        <div className="services__priceproject-btn button">
                                            {
                                                !isAuthorized ?
                                                    <div onClick={() => {
                                                         router.push("/register")
                                                        gtmService.unregisteredOrderClick()
                                                        }
                                                    }>{t("common:orderProjectButton")}</div>
                                                    :
                                                    <Link href={"/createpage"}>
                                                        {t("common:orderProjectButton")}
                                                    </Link>
                                            }

                                        </div>
                                        <div
                                            className="services__priceproject-btn-link"
                                            onClick={() => setOpenAside(true)}
                                        >
                                            { t("main:priceSatisfied") }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div
                className={
                    openAside ? "aside-popup aside-popup--active" : "aside-popup"
                }
            >
                <div className="aside-popup__content">
                    <div
                        className="aside-popup__close"
                        onClick={() => setOpenAside(false)}
                    >
                        <svg
                            width="52"
                            height="52"
                            viewBox="0 0 52 52"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M28.8728 26.0001L51.4051 3.46767C52.1984 2.67436 52.1984 1.38818 51.4051 0.594977C50.6118 -0.198224 49.3256 -0.198326 48.5324 0.594977L26 23.1274L3.46767 0.594977C2.67436 -0.198326 1.38818 -0.198326 0.594977 0.594977C-0.198224 1.38828 -0.198326 2.67447 0.594977 3.46767L23.1273 26L0.594977 48.5324C-0.198326 49.3257 -0.198326 50.6119 0.594977 51.4051C0.991578 51.8017 1.51148 51.9999 2.03137 51.9999C2.55127 51.9999 3.07107 51.8017 3.46777 51.4051L26 28.8728L48.5323 51.4051C48.9289 51.8017 49.4488 51.9999 49.9687 51.9999C50.4886 51.9999 51.0084 51.8017 51.4051 51.4051C52.1984 50.6118 52.1984 49.3256 51.4051 48.5324L28.8728 26.0001Z"
                                fill="#353535"
                            />
                        </svg>
                    </div>
                    <div className="aside-popup__form">
                        <div className="aside-popup__title">
                            { t("drover:title") }
                        </div>
                        <div className="aside-popup__form-item">
                            <input
                                {...register("name", {
                                    required: "Поле обов'язкове"
                                })}
                                className="input"
                                id="form-text"
                            ></input>
                            <label className="label" htmlFor="form-text">

                                { t("drover:inputName") }

                            </label>
                            {errors.name && <span className="error-message">{errors.name?.message}</span>}
                        </div>
                        <div className="aside-popup__form-item">
                            <input
                                {...register("email", {
                                    required: "Поле обов'язкове",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Неправильний формат email"
                                    }
                                })}
                                className="input"
                                id="form-email"
                            ></input>
                            <label className="label" htmlFor="form-email">
                                Email
                            </label>
                            {errors.email && <span className="error-message">{errors.email?.message}</span>}
                        </div>
                        <div className="aside-popup__form-item">
                            <ReactInputMask
                                mask="+38 (099) 999-99-99"
                                type="text"
                                className={`input ${errors?.phone && "error"}`}
                                id="form-num"
                                {...register("phone", {
                                    required: "Поле обов'язкове",
                                    pattern: {
                                        value: /^\+38\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
                                        message: "Введіть коректний номер телефону"
                                    }
                                })}
                            />
                            <label className="label" htmlFor="form-num">

                                { t("drover:inputPhone") }

                            </label>
                            {errors.phone && <span className="error-message">{errors.phone?.message}</span>}

                        </div>
                        <div className="aside-popup__form-item aside-popup__textarea">
                            <textarea
                                {...register("message", {
                                    required: "Поле обов'язкове"
                                })}
                                className="input aside-popup__input-textarea"
                                id="form-context"
                            ></textarea>
                            <label className="label" htmlFor="form-context">
                                { t("drover:message") }
                            </label>
                            {errors.message && <span className="error-message">{errors.message?.message}</span>}
                        </div>
                        <label className="aside-popup__check-box-label">
                            <input
                                {...register("agreement")}
                                className="aside-popup__check-box-input"
                                type="checkbox"
                            />
                            <span className="aside-popup__check-box-style"></span>{ t("drover:fomIAgree") }
                            <a style={{color: "#e55733"}} href="/politic" target="_blank">{ t("drover:fomIPrivacy") }</a> { t("drover:fomIAllow") }
                        </label>
                        <div
                            className="aside-popup__btn button"
                            onClick={handleSubmit(submitHandler)}
                            style={{marginTop: '20px'}}
                        >
                            { t("common:calculateTrueCost") }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
