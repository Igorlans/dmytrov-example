import { useState, useEffect } from "react";
import { Rates } from "../RequestForm/Rates";
import { Slider } from "@mui/material";
import useLoginAside from "@/context/useLoginAside";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { gtmService } from "@/services/gtmService";
export const zServices = () => {
    const [openAside, setOpenAside] = useState(false);
    const { t } = useTranslation();
    useEffect(() => {
        var eventCalllback = function(e: any) {
            var el = e.target,
                clearVal = el.dataset.phoneClear,
                pattern = el.dataset.phonePattern,
                matrix_def = "+38(___) ___--",
                matrix = pattern ? pattern : matrix_def,
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = e.target.value.replace(/\D/g, "");

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
        var phone_inputs = document.querySelectorAll("[data-phone-pattern]");
        // @ts-ignore
        for (let elem of phone_inputs) {
            for (let ev of ["input", "blur", "focus"]) {
                elem.addEventListener(ev, eventCalllback);
            }
        }
    }, [openAside]);

    if (openAside) {
        document.addEventListener("click", function(event) {
            var asidePopup = document.querySelector(".aside-popup");
            var clickedElement = event.target;

            if (
                // @ts-ignore
                asidePopup.contains(clickedElement) &&
                // @ts-ignore
                !clickedElement.closest(
                    ".aside-popup__content, .aside-popup__form, .aside-popup__title, .aside-popup__form-item, .aside-popup__input, .aside-popup__label, .aside-popup__check-box-label, .aside-popup__check-box-input, .aside-popup__check-box-style, .aside-popup__btn, .button"
                )
            ) {
                setOpenAside(false);
            }
        });
    }
    if (!openAside) {
        document.removeEventListener("click", function(event) {
            var asidePopup = document.querySelector(".aside-popup");
            var clickedElement = event.target;

            if (
                // @ts-ignore
                asidePopup.contains(clickedElement) &&
                // @ts-ignore
                !clickedElement.closest(
                    ".aside-popup__content, .aside-popup__form, .aside-popup__title, .aside-popup__form-item, .aside-popup__input, .aside-popup__label, .aside-popup__check-box-label, .aside-popup__check-box-input, .aside-popup__check-box-style, .aside-popup__btn, .button"
                )
            ) {
                setOpenAside(false);
            }
        });
    }

    const [valueRage, setValueRage] = useState<any>(75);

    const handleInput = (event: any) => {
        const inputValue = event.target.value;
        if (!isNaN(inputValue)) {
            setValueRage(inputValue);
        }
    };

    const { data: session } = useSession();
    const router = useRouter();
    const { setIsOpen } = useLoginAside();

    return (
        <>
            <section className="services">
                <div className="container">
                    <div className="services__wrapper">
                        <div className="services__title-box">
                            <div className="services__title services__title-mob">
                                Переглянути всi послуги
                            </div>
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
                            </div>
                            <div className="button services__title-btn">
                                Переглянути
                            </div>
                            <div
                                className="button services__title-btn services__title-btn-mob"
                            >
                                Переглянути всi послуги
                            </div>
                        </div>
                        <div className="services__inner">
                            <div className="services__boxtext">
                                <h4 className="services__box-title">Прорахунок вартості</h4>
                                <div className="services__box-text">
                                    Ця форма призначена для прорахунку орієнтовної вартості
                                    проєкту. Якщо Вас не влаштовує вартість або ж ви бажаєте
                                    прорахувати індивідуальну вартість проєкту під ваші потреби,
                                    ви можете заповнити заявку "не влаштовує вартість" і наш
                                    менеджер з вами зв'яжеться.
                                </div>
                            </div>
                            <div className="services__box">
                                <div className="services__range-title">Вибір площі:</div>
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
                                            placeholder="Email"
                                            value={valueRage}
                                            onChange={handleInput}
                                        ></input>
                                        <label className="label" htmlFor="form-rage">
                                            Площа об'єкту
                                        </label>
                                    </div>
                                </div>
                                <div className="services__range-title services__range-title-mb">
                                    Вибір тарифа проєкту:
                                </div>
                                <Rates />
                                <div className="services__priceproject">
                                    <div className="services__priceproject-box">
                                        <div className="services__priceproject-subtitle">
                                            Вартість проєкту:
                                        </div>
                                        <div className="services__priceproject-title">
                                            37 500
                                            <span>грн</span>
                                        </div>
                                    </div>
                                    <div className="services__priceproject-btns">
                                        <div
                                            onClick={() => {
                                                if (session?.user) {
                                                    router.push("/createpage")
                                                } else {
                                                    setIsOpen(true);
                                                    gtmService.unregisteredOrderClick()
                                                }
                                            }}
                                            className="services__priceproject-btn button">
                                            { t("common:orderProjectButton") }
                                        </div>
                                        <div
                                            className="services__priceproject-btn-link"
                                            onClick={() => setOpenAside(true)}
                                        >
                                           
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
                            Заповніть форму і ми розглянемо Ваш запит на прорахунок
                            оптимальної вартості
                        </div>
                        <div className="aside-popup__form-item">
                            <input
                                name=""
                                className="input"
                                id="form-text"
                            ></input>
                            <label className="aside-popup__label" htmlFor="form-text">
                                Ваше iм’я
                            </label>
                        </div>
                        <div className="aside-popup__form-item">
                            <input
                                name=""
                                className="input"
                                id="form-email"
                            ></input>
                            <label className="aside-popup__label" htmlFor="form-email">
                                Email
                            </label>
                        </div>
                        <div className="aside-popup__form-item">
                            <input
                                name=""
                                data-phone
                                data-phone-pattern="+38 (___) ___-__-__"
                                className="input"
                                id="form-num"
                            ></input>
                            <label className="aside-popup__label" htmlFor="form-num">
                                Номер телефону
                            </label>
                        </div>
                        <label className="aside-popup__check-box-label">
                            <input className="aside-popup__check-box-input" type="checkbox" />
                            <span className="aside-popup__check-box-style"></span>Я погоджуюсь
                            з умовами <a style={{ color: "#e55733" }} href="/politic.pdf" target="_blank">політики
                            конфіденційності</a> і дозволяю обробляти мої
                            персональні дані
                        </label>
                        <div
                            className="aside-popup__btn button"
                            style={{ marginTop: "20px" }}
                            onClick={() => setOpenAside(false)}
                        >
                            Прорахувати оптимальну вартість
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
