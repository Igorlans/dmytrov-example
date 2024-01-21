import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Services } from "@prisma/client";
import { useDynamicTranslate } from "@/utils/useDynamicTranslate";

export interface ITariffes {
    id: string;
    title: string;
    title_ru: string;
    slug: string
}

interface IFooterProps {
    services: Services[];
    tariffes: ITariffes[];
}

export const Footer: FC<IFooterProps> = ( { services, tariffes }) => {
    
    const { t } = useTranslation();
    const dbTranslate =  useDynamicTranslate()
    const images = [
        {
            img: (
                <svg
                    width="19"
                    height="21"
                    viewBox="0 0 19 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M11.5512 8.77913H10.732C10.732 7.87301 10.4096 7.55057 9.50349 7.55057V6.73158C10.8601 6.73158 11.5512 7.42265 11.5512 8.77913Z"
                        fill="#F6F4F1"
                    />
                    <path
                        d="M13.1892 8.77913H12.3702C12.3702 6.95684 11.3259 5.91244 9.50349 5.91244V5.09345C11.7764 5.09345 13.1892 6.50633 13.1892 8.77913Z"
                        fill="#F6F4F1"
                    />
                    <path
                        d="M14.8273 8.77913H14.0083C14.0083 6.08656 12.1961 4.27446 9.50349 4.27446V3.45532C12.6875 3.45532 14.8273 5.59511 14.8273 8.77913Z"
                        fill="#F6F4F1"
                    />
                    <path
                        d="M5.40838 19.9999V17.1743L4.533 17.0719C2.43926 16.8159 0.801281 15.0961 0.637363 12.9819C0.545281 11.7328 0.494141 10.4531 0.494141 9.1887C0.494141 7.9243 0.545281 6.6497 0.637363 5.39549C0.801281 3.28136 2.47001 1.55624 4.60469 1.29514C7.85531 0.901619 11.1415 0.901619 14.3922 1.29514C16.5319 1.55624 18.2007 3.28136 18.3645 5.39549C18.4618 6.64445 18.5079 7.9243 18.5079 9.1887C18.5079 10.4531 18.4567 11.7328 18.3645 12.9819C18.2058 15.0908 16.5677 16.8108 14.4792 17.0719C13.0167 17.2528 11.5453 17.3536 10.0717 17.374L5.40838 19.9999ZM9.50349 1.81734C7.9003 1.81764 6.29846 1.91512 4.70697 2.10903C2.95636 2.32409 1.58953 3.73187 1.4565 5.46208C1.35917 6.69064 1.31313 7.9447 1.31313 9.1887C1.31313 10.4326 1.35917 11.6919 1.4565 12.9204C1.59028 14.647 2.91767 16.0427 4.63543 16.2631C5.04141 16.3143 5.44933 16.3587 5.85875 16.3962L6.23247 16.432V18.6025L9.85682 16.5601H9.9591C11.4378 16.5436 12.9144 16.4444 14.3819 16.2631C16.0866 16.0533 17.4174 14.6455 17.5506 12.9255C17.6478 11.697 17.694 10.4377 17.694 9.1938C17.694 7.9498 17.6478 6.69574 17.5506 5.46208C17.4174 3.73187 16.0508 2.32409 14.2949 2.10903C12.7051 1.91557 11.105 1.81809 9.50349 1.81734Z"
                        fill="#F6F4F1"
                    />
                    <path
                        d="M11.1109 14.5124H10.732C6.89279 14.5124 3.77025 11.3898 3.77025 7.55057V7.17175C3.7683 6.51847 4.0282 5.8916 4.49206 5.43134L4.82995 5.09345C5.35709 4.56616 6.27851 4.56616 6.80581 5.09345L7.8655 6.15315C8.12855 6.41439 8.27597 6.77028 8.27492 7.141C8.27372 7.51143 8.1266 7.86641 7.8655 8.12901L7.76817 8.22634C7.56766 8.42745 7.45533 8.69995 7.45593 8.98384C7.45698 9.26759 7.56916 9.53948 7.76817 9.7415L8.53602 10.5093C8.9354 10.9087 9.65705 10.9087 10.0564 10.5093L10.1536 10.4122C10.6809 9.88487 11.6023 9.88487 12.1296 10.4122L13.1892 11.4768C13.7348 12.0226 13.7348 12.9071 13.1892 13.4528L12.8514 13.7907C12.3912 14.2544 11.7643 14.5143 11.1109 14.5124ZM5.8178 5.50302C5.66438 5.50272 5.51696 5.56346 5.40838 5.67189L5.0705 6.00977C4.76096 6.31706 4.58759 6.73563 4.58924 7.17175V7.55057C4.59209 10.942 7.34076 13.6905 10.732 13.6934H11.1109C11.5453 13.6938 11.9618 13.5205 12.2677 13.2123L12.6056 12.8744C12.7145 12.7658 12.7755 12.6185 12.7755 12.4648C12.7755 12.3111 12.7145 12.1638 12.6056 12.0552L11.5512 10.9957C11.3217 10.7772 10.9615 10.7772 10.732 10.9957L10.6349 11.0929C9.89536 11.8318 8.69709 11.8318 7.95759 11.0929L7.18974 10.325C6.83565 9.9684 6.63694 9.4864 6.63694 8.98384C6.63619 8.48279 6.83505 8.00199 7.18974 7.6479L7.28707 7.55057C7.3949 7.44154 7.45563 7.29442 7.45593 7.141C7.45623 6.98758 7.3955 6.84016 7.28707 6.73158L6.22737 5.67189C6.11864 5.56346 5.97137 5.50272 5.8178 5.50302Z"
                        fill="#F6F4F1"
                    />
                    <path
                        d="M11.5512 8.77913H10.732C10.732 7.87301 10.4096 7.55057 9.50349 7.55057V6.73158C10.8601 6.73158 11.5512 7.42265 11.5512 8.77913Z"
                        stroke="#F6F4F1"
                        strokeWidth="0.2"
                    />
                    <path
                        d="M13.1892 8.77913H12.3702C12.3702 6.95684 11.3259 5.91244 9.50349 5.91244V5.09345C11.7764 5.09345 13.1892 6.50633 13.1892 8.77913Z"
                        stroke="#F6F4F1"
                        strokeWidth="0.2"
                    />
                    <path
                        d="M14.8273 8.77913H14.0083C14.0083 6.08656 12.1961 4.27446 9.50349 4.27446V3.45532C12.6875 3.45532 14.8273 5.59511 14.8273 8.77913Z"
                        stroke="#F6F4F1"
                        strokeWidth="0.2"
                    />
                    <path
                        d="M5.40838 19.9999V17.1743L4.533 17.0719C2.43926 16.8159 0.801281 15.0961 0.637363 12.9819C0.545281 11.7328 0.494141 10.4531 0.494141 9.1887C0.494141 7.9243 0.545281 6.6497 0.637363 5.39549C0.801281 3.28136 2.47001 1.55624 4.60469 1.29514C7.85531 0.901619 11.1415 0.901619 14.3922 1.29514C16.5319 1.55624 18.2007 3.28136 18.3645 5.39549C18.4618 6.64445 18.5079 7.9243 18.5079 9.1887C18.5079 10.4531 18.4567 11.7328 18.3645 12.9819C18.2058 15.0908 16.5677 16.8108 14.4792 17.0719C13.0167 17.2528 11.5453 17.3536 10.0717 17.374L5.40838 19.9999ZM9.50349 1.81734C7.9003 1.81764 6.29846 1.91512 4.70697 2.10903C2.95636 2.32409 1.58953 3.73187 1.4565 5.46208C1.35917 6.69064 1.31313 7.9447 1.31313 9.1887C1.31313 10.4326 1.35917 11.6919 1.4565 12.9204C1.59028 14.647 2.91767 16.0427 4.63543 16.2631C5.04141 16.3143 5.44933 16.3587 5.85875 16.3962L6.23247 16.432V18.6025L9.85682 16.5601H9.9591C11.4378 16.5436 12.9144 16.4444 14.3819 16.2631C16.0866 16.0533 17.4174 14.6455 17.5506 12.9255C17.6478 11.697 17.694 10.4377 17.694 9.1938C17.694 7.9498 17.6478 6.69574 17.5506 5.46208C17.4174 3.73187 16.0508 2.32409 14.2949 2.10903C12.7051 1.91557 11.105 1.81809 9.50349 1.81734Z"
                        stroke="#F6F4F1"
                        strokeWidth="0.2"
                    />
                    <path
                        d="M11.1109 14.5124H10.732C6.89279 14.5124 3.77025 11.3898 3.77025 7.55057V7.17175C3.7683 6.51847 4.0282 5.8916 4.49206 5.43134L4.82995 5.09345C5.35709 4.56616 6.27851 4.56616 6.80581 5.09345L7.8655 6.15315C8.12855 6.41439 8.27597 6.77028 8.27492 7.141C8.27372 7.51143 8.1266 7.86641 7.8655 8.12901L7.76817 8.22634C7.56766 8.42745 7.45533 8.69995 7.45593 8.98384C7.45698 9.26759 7.56916 9.53948 7.76817 9.7415L8.53602 10.5093C8.9354 10.9087 9.65705 10.9087 10.0564 10.5093L10.1536 10.4122C10.6809 9.88487 11.6023 9.88487 12.1296 10.4122L13.1892 11.4768C13.7348 12.0226 13.7348 12.9071 13.1892 13.4528L12.8514 13.7907C12.3912 14.2544 11.7643 14.5143 11.1109 14.5124ZM5.8178 5.50302C5.66438 5.50272 5.51696 5.56346 5.40838 5.67189L5.0705 6.00977C4.76096 6.31706 4.58759 6.73563 4.58924 7.17175V7.55057C4.59209 10.942 7.34076 13.6905 10.732 13.6934H11.1109C11.5453 13.6938 11.9618 13.5205 12.2677 13.2123L12.6056 12.8744C12.7145 12.7658 12.7755 12.6185 12.7755 12.4648C12.7755 12.3111 12.7145 12.1638 12.6056 12.0552L11.5512 10.9957C11.3217 10.7772 10.9615 10.7772 10.732 10.9957L10.6349 11.0929C9.89536 11.8318 8.69709 11.8318 7.95759 11.0929L7.18974 10.325C6.83565 9.9684 6.63694 9.4864 6.63694 8.98384C6.63619 8.48279 6.83505 8.00199 7.18974 7.6479L7.28707 7.55057C7.3949 7.44154 7.45563 7.29442 7.45593 7.141C7.45623 6.98758 7.3955 6.84016 7.28707 6.73158L6.22737 5.67189C6.11864 5.56346 5.97137 5.50272 5.8178 5.50302Z"
                        stroke="#F6F4F1"
                        strokeWidth="0.2"
                    />
                </svg>
            ),
            link: "viber://add?number=+380992521329"
        },
        {
            img: (
                <svg
                    width="19"
                    height="17"
                    viewBox="0 0 19 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M17.2425 1.11861L1.15982 7.25787C0.34405 7.56925 0.357483 8.04051 1.18955 8.30521L4.8027 9.33907L6.70192 14.7702C6.99012 15.5944 7.75145 15.7848 8.39374 15.1934L10.8101 12.9687L14.2057 15.7029C14.8957 16.238 15.6019 15.9756 15.7752 15.12L18.4103 2.10831C18.5836 1.25264 18.0581 0.807333 17.2425 1.11861Z"
                        stroke="#F6F4F1"
                        strokeWidth="1.2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M4.85156 9.3139L14.53 4.36934L8.32259 10.9652L7.22437 15.4131"
                        stroke="#F6F4F1"
                        strokeWidth="1.2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8.35156 10.9895L14.1762 15.6797"
                        stroke="#F6F4F1"
                        strokeWidth="1.2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
            link: "https://t.me/dmytrov_com_ua"
        },
        {
            img: (
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clipPath="url(#clip0_501_3449)">
                        <path
                            d="M8.00377 3.8916C5.7351 3.8916 3.89844 5.73027 3.89844 7.99694C3.89844 10.2656 5.7371 12.1023 8.00377 12.1023C10.2724 12.1023 12.1091 10.2636 12.1091 7.99694C12.1091 5.72827 10.2704 3.8916 8.00377 3.8916ZM8.00377 10.6616C6.5311 10.6616 5.3391 9.46894 5.3391 7.99694C5.3391 6.52494 6.53177 5.33227 8.00377 5.33227C9.47577 5.33227 10.6684 6.52494 10.6684 7.99694C10.6691 9.46894 9.47644 10.6616 8.00377 10.6616Z"
                            fill="#F6F4F1"
                        />
                        <path
                            d="M11.2988 0.0512343C9.82682 -0.0174323 6.18082 -0.014099 4.70749 0.0512343C3.41282 0.111901 2.27082 0.424568 1.35015 1.34523C-0.188515 2.8839 0.00815151 4.95723 0.00815151 7.9979C0.00815151 11.1099 -0.165182 13.1352 1.35015 14.6506C2.89482 16.1946 4.99815 15.9926 8.00282 15.9926C11.0855 15.9926 12.1495 15.9946 13.2395 15.5726C14.7215 14.9972 15.8402 13.6726 15.9495 11.2932C16.0188 9.82057 16.0148 6.17523 15.9495 4.7019C15.8175 1.89323 14.3102 0.189901 11.2988 0.0512343ZM13.6288 13.6326C12.6202 14.6412 11.2208 14.5512 7.98349 14.5512C4.65015 14.5512 3.31348 14.6006 2.33815 13.6226C1.21482 12.5046 1.41815 10.7092 1.41815 7.98723C1.41815 4.3039 1.04015 1.65123 4.73682 1.4619C5.58615 1.4319 5.83615 1.4219 7.97415 1.4219L8.00415 1.4419C11.5568 1.4419 14.3442 1.0699 14.5115 4.7659C14.5495 5.60923 14.5582 5.86257 14.5582 7.99723C14.5575 11.2919 14.6202 12.6366 13.6288 13.6326Z"
                            fill="#F6F4F1"
                        />
                        <path
                            d="M12.2699 4.68917C12.7997 4.68917 13.2292 4.25967 13.2292 3.72984C13.2292 3.20002 12.7997 2.77051 12.2699 2.77051C11.7401 2.77051 11.3105 3.20002 11.3105 3.72984C11.3105 4.25967 11.7401 4.68917 12.2699 4.68917Z"
                            fill="#F6F4F1"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_501_3449">
                            <rect width="16" height="16" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            ),
            link: "https://www.instagram.com/dmytrov.com.ua/"
        },
        {
            img: (
                <svg
                    width="11"
                    height="19"
                    viewBox="0 0 11 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6.78354 18.9629H3.73491C3.22569 18.9629 2.81146 18.5495 2.81146 18.0412V11.1783H1.03282C0.523606 11.1783 0.109375 10.7648 0.109375 10.2567V7.31591C0.109375 6.80769 0.523606 6.39426 1.03282 6.39426H2.81146V4.92163C2.81146 3.46146 3.27086 2.21917 4.13985 1.32927C5.01275 0.43531 6.23264 -0.0371094 7.66763 -0.0371094L9.99267 -0.0333405C10.501 -0.0324707 10.9145 0.380951 10.9145 0.888306V3.61874C10.9145 4.12697 10.5004 4.54039 9.99136 4.54039L8.42594 4.54097C7.94853 4.54097 7.82696 4.6365 7.80096 4.66578C7.75812 4.71434 7.70714 4.85162 7.70714 5.23068V6.39412H9.87372C10.0368 6.39412 10.1948 6.43427 10.3306 6.50994C10.6236 6.67331 10.8057 6.98222 10.8057 7.31606L10.8046 10.2568C10.8046 10.7648 10.3903 11.1782 9.88112 11.1782H7.70714V18.0412C7.70714 18.5495 7.29276 18.9629 6.78354 18.9629ZM3.9275 17.849H6.59095V10.6797C6.59095 10.3403 6.86764 10.0643 7.20751 10.0643H9.68853L9.68955 7.50813H7.20736C6.86749 7.50813 6.59095 7.23213 6.59095 6.89278V5.23068C6.59095 4.79552 6.63525 4.30063 6.96437 3.92867C7.36204 3.479 7.98876 3.42711 8.42565 3.42711L9.79848 3.42653V1.08023L7.66676 1.07675C5.36061 1.07675 3.9275 2.55011 3.9275 4.92163V6.89278C3.9275 7.23198 3.65096 7.50813 3.31109 7.50813H1.22542V10.0643H3.31109C3.65096 10.0643 3.9275 10.3403 3.9275 10.6797V17.849Z"
                        fill="#F6F4F1"
                    />
                </svg>
            ),
            link: "https://www.facebook.com/dmytrov.com.ua/"
        }
    ];
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__wrapper">
                    <div className="footer___box">
                        <h5 className="footer__title">{ t("common:footerContact") }</h5>
                        <div className="footer__box-item">
                            <a
                                className="footer__box-link"
                                href="tel:0992521329"
                            >
                                +38 (099) 252 13 29
                            </a>
                        </div>
                        <div className="footer__box-item">
                            <a
                                className="footer__box-link footer__box-link-tdu"
                                href="mailto:dmytrovproject@gmail.com"
                            >
                                dmytrovproject@gmail.com
                            </a>
                        </div>
                        <div className="footer__socials">
                            {images.map((item, idx) => (
                                <Link
                                    target="_blank"
                                    className="footer__socials-link"
                                    href={item.link}
                                    key={idx}
                                >
                                    {item.img}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <nav className="footer__nav">
                        <ul className="footer__list">
                            <h5 className="footer__title">{ t("common:tariffsSectionTitle") }</h5>
                            {
                                tariffes?.map(item => (
                                    <li className="footer__item" key={item.id}>
                                        <Link
                                            className="footer__link"
                                            href={`/tariffs/${item.slug}`}
                                        >
                                            {dbTranslate(item, 'title')}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                        <ul className="footer__list">
                            <h5 className="footer__title">{ t("common:additionalServices") }</h5>
                            {
                                services?.map(item => (
                                    <li className="footer__item" key={item.id}>
                                        <Link
                                            className="footer__link"
                                            href={`/additional/${item.slug}`}
                                        >
                                            {dbTranslate(item, 'title')}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                        <ul className="footer__list">
                            <h5 className="footer__title">Dmytrov.com.ua</h5>
                            <li className="footer__item">
                                <Link
                                    className="footer__link"
                                    href={"/questions"}
                                >
                                    { t("common:questions") }
                                </Link>
                            </li>
                            <li className="footer__item">
                                <Link
                                    className="footer__link"
                                    href={"/allservices"}
                                >

                                    { t("common:services") }

                                </Link>
                            </li>
                            <li className="footer__item">
                                <Link className="footer__link" href={"/blog"}>

                                    { t("common:blog") }

                                </Link>
                            </li>
                            <li className="footer__item">
                                <Link
                                    className="footer__link"
                                    href={"/contactspage"}
                                >
                                    { t("common:footerContacts") }
                                </Link>
                            </li>
                            <li className="footer__item footer__item--active">
                                <Link
                                    className="footer__link"
                                    href={"/contactspage"}
                                >

                                    { t("common:calculateCost") }

                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="footer__copy">
                    <Link legacyBehavior href={"/politic"}>
                        <a className="politic" target="_blank">

                            { t("common:footerConfidentiality") }

                        </a>
                    </Link>
                    <div className="footer__copy-text">
                        Dmytrov.com.ua © 2023 { t("common:footerRightsReserved")}
                    </div>
                </div>
            </div>
        </footer>
    );
};
