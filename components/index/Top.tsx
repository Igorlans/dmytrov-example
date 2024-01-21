import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
export const Top = () => {
    const { t } = useTranslation();
    return (
        <section className="top">
            <div className="container">
                <div className="top__wrapper">
                    <div className="top__box">
                        <Link href={"/createpage"}
                              className="button top__mob-btn">Замовити проєкт
                        </Link>
                        <h1 className="top__title">
                            {t("main:h1mainPage")}
                        </h1>
                        <p className="top__text">
                            {t("main:h1mainDescr")}
                        </p>
                    </div>
                    <div className="top__box-link">
                        <div className="sideImgCont">
                            <Image 
                                src={"/assets/images/top-image/desc-link.jpg"} 
                                fill={true}
                                style={{objectFit: "cover"}}
                                // width={400}
                                // height={190}
                                alt="Projects examples" 
                            />
                        </div>
                        <Link className="top__link" href="/tariffs/basic">
                            {t("main:viewExamples")}
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container top__container-image">
                <div className="top__image">
                    <Image
                        src={"/assets/images/top-image/bg.jpg"}
                        width={1296}
                        height={693}
                        alt="interior design"
                    />
                </div>
            </div>
        </section>
    );
};
