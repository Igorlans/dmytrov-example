import MainLayout from "@/components/MainLayout";
import { useEffect } from "react";
import sendTelegram from "@/utils/sendTelegram";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import prisma from "@/prisma/client";
import SeoBlock from "@/components/SeoBlock/SeoBlock";

import { NextSeo } from 'next-seo';

import type { LocalBusiness, WithContext } from "schema-dts"
import SchemaBlock from "@/components/SeoBlock/SchemaBlock";

interface IFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
    agreement: boolean;
}

export async function getStaticProps( { locale } : { locale: any} ) {

    const seo = await prisma.seo.findFirst({
        where: {
            page: '/contactspage'
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
            services,
            seo,
            ...(await serverSideTranslations(locale, ['contacts', 'common', "validation"])),
        },
        revalidate: 50
    };
}

const schema: WithContext<LocalBusiness> = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "name": "dmytrov.com.ua",
    "image": "https://www.dmytrov.com.ua/assets/images/header-img/logo-mob.svg",
    "@id": "",
    "url": "https://www.dmytrov.com.ua/",
    "telephone": "+38 (099) 252 13 29",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "UA"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://www.instagram.com/dmytrov.com.ua/",
      "https://www.facebook.com/dmytrov.com.ua/"
    ] 
}

export const ContactsPage = ({seo, services} : any) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IFormData>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
            agreement: false,
        },
    });

    const submitHandler = async (data: IFormData) => {
        console.log("FORM DATA", data);
        if (!data.agreement)
            return toast.error("Узгодьте умови політики конфіденційності");
        reset();
        const projectRequest = `
Є питання

Ім'я: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Повідомлення: ${data.message}

`;
        sendTelegram(projectRequest, "backCall");
        toast.success("Заявка відправлена");
    };
    const { t } = useTranslation();

    useEffect(() => {
        var eventCalllback = function (e: any) {
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
            e.target.value = matrix.replace(/./g, function (a: any) {
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
    }, []);

    return (
        <>
        
        <SchemaBlock schema={schema} />

        <MainLayout services={services}>
            <section className="contacts">
                <div className="container">
                </div>
                <div className="container contacts__container">
                    <div className="contacts__wrapper">
                        <div className="contacts__box-text">
                            <h1 className="main-title contacts__title">
                                { t("contacts:h1ContactsTitle") }
                            </h1>
                            <div className="contacts__block">
                                <div className="contacts__block-subtitle">
                                    { t("contacts:workHours") }
                                </div>
                                <div className="contacts__block-title">
                                    ПН-СБ: 9:00-20:00
                                </div>
                                <div className="contacts__block-title">
                                    НД: { t("contacts:sunday") }
                                </div>
                            </div>
                            <div className="contacts__block">
                                <div className="contacts__block-subtitle">
                                    Email
                                </div>
                                <a
                                    className="contacts__block-title"
                                    href="mailto:dmytrovproject@gmail.com"
                                >
                                    dmytrovproject@gmail.com
                                </a>
                            </div>
                            <div className="contacts__block">
                                <div className="contacts__block-subtitle">
                                    Телефон | Viber | Telegram
                                </div>
                                <a
                                    className="contacts__block-title"
                                    href="tel:0992521329"
                                >
                                    +38 (099) 252 13 29
                                </a>
                            </div>
                            <div className="contacts__socials">
                                <Link
                                    target="_blank"
                                    href="viber://chat?number=380992521329"
                                >
                                    <div className="contacts__social">
                                        <svg
                                            width="31"
                                            height="33"
                                            viewBox="0 0 31 33"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M19.2565 13.9652H17.8913C17.8913 12.455 17.3539 11.9176 15.8437 11.9176V10.5526C18.1048 10.5526 19.2565 11.7044 19.2565 13.9652Z"
                                                fill="#353535"
                                            />
                                            <path
                                                d="M21.9865 13.9652H20.6215C20.6215 10.9281 18.8811 9.1874 15.8437 9.1874V7.82242C19.632 7.82242 21.9865 10.1772 21.9865 13.9652Z"
                                                fill="#353535"
                                            />
                                            <path
                                                d="M24.7167 13.9652H23.3517C23.3517 9.4776 20.3313 6.45744 15.8437 6.45744V5.0922C21.1504 5.0922 24.7167 8.65851 24.7167 13.9652Z"
                                                fill="#353535"
                                            />
                                            <path
                                                d="M9.01853 32.6666V27.9572L7.55956 27.7865C4.06999 27.3599 1.34003 24.4934 1.06683 20.9699C0.913358 18.888 0.828125 16.7552 0.828125 14.6478C0.828125 12.5405 0.913358 10.4162 1.06683 8.32582C1.34003 4.80226 4.12123 1.92707 7.67904 1.4919C13.0967 0.836032 18.5737 0.836032 23.9916 1.4919C27.5577 1.92707 30.3391 4.80226 30.6121 8.32582C30.7743 10.4074 30.851 12.5405 30.851 14.6478C30.851 16.7552 30.7658 18.888 30.6121 20.9699C30.3476 24.4847 27.6174 27.3514 24.1366 27.7865C21.6991 28.088 19.2468 28.2559 16.7908 28.2899L9.01853 32.6666ZM15.8437 2.36223C13.1717 2.36273 10.502 2.5252 7.84951 2.84839C4.93183 3.20682 2.65377 5.55311 2.43206 8.4368C2.26984 10.4844 2.19311 12.5745 2.19311 14.6478C2.19311 16.7209 2.26984 18.8198 2.43206 20.8674C2.65502 23.7451 4.86734 26.0711 7.73028 26.4385C8.4069 26.5238 9.08677 26.5978 9.76913 26.6602L10.392 26.72V30.3375L16.4326 26.9334H16.6031C19.0676 26.906 21.5286 26.7407 23.9744 26.4385C26.8156 26.0889 29.0336 23.7426 29.2556 20.8759C29.4176 18.8283 29.4945 16.7294 29.4945 14.6563C29.4945 12.583 29.4176 10.4929 29.2556 8.4368C29.0336 5.55311 26.7558 3.20682 23.8294 2.84839C21.1797 2.52595 18.5129 2.36348 15.8437 2.36223Z"
                                                fill="#353535"
                                            />
                                            <path
                                                d="M18.5227 23.5206H17.8913C11.4925 23.5206 6.28831 18.3164 6.28831 11.9176V11.2862C6.28506 10.1975 6.71823 9.15266 7.49133 8.38556L8.05447 7.82242C8.93305 6.94359 10.4687 6.94359 11.3476 7.82242L13.1137 9.58858C13.5521 10.024 13.7978 10.6171 13.7961 11.235C13.7941 11.8524 13.5489 12.444 13.1137 12.8817L12.9515 13.0439C12.6173 13.3791 12.4301 13.8332 12.4311 14.3064C12.4329 14.7793 12.6198 15.2325 12.9515 15.5692L14.2313 16.8489C14.8969 17.5145 16.0996 17.5145 16.7653 16.8489L16.9272 16.6869C17.8061 15.8081 19.3418 15.8081 20.2206 16.6869L21.9865 18.4613C22.8958 19.3709 22.8958 20.8451 21.9865 21.7547L21.4236 22.3178C20.6565 23.0907 19.6117 23.5239 18.5227 23.5206ZM9.7009 8.50504C9.4452 8.50454 9.19949 8.60577 9.01853 8.78648L8.45539 9.34962C7.93949 9.86177 7.65055 10.5594 7.6533 11.2862V11.9176C7.65804 17.57 12.2392 22.1509 17.8913 22.1556H18.5227C19.2468 22.1564 19.9409 21.8674 20.4508 21.3538L21.0139 20.7906C21.1954 20.6097 21.2971 20.3642 21.2971 20.108C21.2971 19.8518 21.1954 19.6064 21.0139 19.4254L19.2565 17.6595C18.8741 17.2953 18.2737 17.2953 17.8913 17.6595L17.7293 17.8215C16.4968 19.053 14.4997 19.053 13.2672 17.8215L11.9875 16.5417C11.3973 15.9473 11.0661 15.144 11.0661 14.3064C11.0649 13.4713 11.3963 12.67 11.9875 12.0798L12.1497 11.9176C12.3294 11.7359 12.4306 11.4907 12.4311 11.235C12.4316 10.9793 12.3304 10.7336 12.1497 10.5526L10.3835 8.78648C10.2023 8.60577 9.95685 8.50454 9.7009 8.50504Z"
                                                fill="#353535"
                                            />
                                            <path
                                                d="M19.2565 13.9652H17.8913C17.8913 12.455 17.3539 11.9176 15.8437 11.9176V10.5526C18.1048 10.5526 19.2565 11.7044 19.2565 13.9652Z"
                                                stroke="#353535"
                                                strokeWidth="0.2"
                                            />
                                            <path
                                                d="M21.9865 13.9652H20.6215C20.6215 10.9281 18.8811 9.1874 15.8437 9.1874V7.82242C19.632 7.82242 21.9865 10.1772 21.9865 13.9652Z"
                                                stroke="#353535"
                                                strokeWidth="0.2"
                                            />
                                            <path
                                                d="M24.7167 13.9652H23.3517C23.3517 9.4776 20.3313 6.45744 15.8437 6.45744V5.0922C21.1504 5.0922 24.7167 8.65851 24.7167 13.9652Z"
                                                stroke="#353535"
                                                strokeWidth="0.2"
                                            />
                                            <path
                                                d="M9.01853 32.6666V27.9572L7.55956 27.7865C4.06999 27.3599 1.34003 24.4934 1.06683 20.9699C0.913358 18.888 0.828125 16.7552 0.828125 14.6478C0.828125 12.5405 0.913358 10.4162 1.06683 8.32582C1.34003 4.80226 4.12123 1.92707 7.67904 1.4919C13.0967 0.836032 18.5737 0.836032 23.9916 1.4919C27.5577 1.92707 30.3391 4.80226 30.6121 8.32582C30.7743 10.4074 30.851 12.5405 30.851 14.6478C30.851 16.7552 30.7658 18.888 30.6121 20.9699C30.3476 24.4847 27.6174 27.3514 24.1366 27.7865C21.6991 28.088 19.2468 28.2559 16.7908 28.2899L9.01853 32.6666ZM15.8437 2.36223C13.1717 2.36273 10.502 2.5252 7.84951 2.84839C4.93183 3.20682 2.65377 5.55311 2.43206 8.4368C2.26984 10.4844 2.19311 12.5745 2.19311 14.6478C2.19311 16.7209 2.26984 18.8198 2.43206 20.8674C2.65502 23.7451 4.86734 26.0711 7.73028 26.4385C8.4069 26.5238 9.08677 26.5978 9.76913 26.6602L10.392 26.72V30.3375L16.4326 26.9334H16.6031C19.0676 26.906 21.5286 26.7407 23.9744 26.4385C26.8156 26.0889 29.0336 23.7426 29.2556 20.8759C29.4176 18.8283 29.4945 16.7294 29.4945 14.6563C29.4945 12.583 29.4176 10.4929 29.2556 8.4368C29.0336 5.55311 26.7558 3.20682 23.8294 2.84839C21.1797 2.52595 18.5129 2.36348 15.8437 2.36223Z"
                                                stroke="#353535"
                                                strokeWidth="0.2"
                                            />
                                            <path
                                                d="M18.5227 23.5206H17.8913C11.4925 23.5206 6.28831 18.3164 6.28831 11.9176V11.2862C6.28506 10.1975 6.71823 9.15266 7.49133 8.38556L8.05447 7.82242C8.93305 6.94359 10.4687 6.94359 11.3476 7.82242L13.1137 9.58858C13.5521 10.024 13.7978 10.6171 13.7961 11.235C13.7941 11.8524 13.5489 12.444 13.1137 12.8817L12.9515 13.0439C12.6173 13.3791 12.4301 13.8332 12.4311 14.3064C12.4329 14.7793 12.6198 15.2325 12.9515 15.5692L14.2313 16.8489C14.8969 17.5145 16.0996 17.5145 16.7653 16.8489L16.9272 16.6869C17.8061 15.8081 19.3418 15.8081 20.2206 16.6869L21.9865 18.4613C22.8958 19.3709 22.8958 20.8451 21.9865 21.7547L21.4236 22.3178C20.6565 23.0907 19.6117 23.5239 18.5227 23.5206ZM9.7009 8.50504C9.4452 8.50454 9.19949 8.60577 9.01853 8.78648L8.45539 9.34962C7.93949 9.86177 7.65055 10.5594 7.6533 11.2862V11.9176C7.65804 17.57 12.2392 22.1509 17.8913 22.1556H18.5227C19.2468 22.1564 19.9409 21.8674 20.4508 21.3538L21.0139 20.7906C21.1954 20.6097 21.2971 20.3642 21.2971 20.108C21.2971 19.8518 21.1954 19.6064 21.0139 19.4254L19.2565 17.6595C18.8741 17.2953 18.2737 17.2953 17.8913 17.6595L17.7293 17.8215C16.4968 19.053 14.4997 19.053 13.2672 17.8215L11.9875 16.5417C11.3973 15.9473 11.0661 15.144 11.0661 14.3064C11.0649 13.4713 11.3963 12.67 11.9875 12.0798L12.1497 11.9176C12.3294 11.7359 12.4306 11.4907 12.4311 11.235C12.4316 10.9793 12.3304 10.7336 12.1497 10.5526L10.3835 8.78648C10.2023 8.60577 9.95685 8.50454 9.7009 8.50504Z"
                                                stroke="#353535"
                                                strokeWidth="0.2"
                                            />
                                        </svg>
                                    </div>
                                </Link>
                                <Link
                                    target="_blank"
                                    href="https://t.me/dmytrov_com_ua"
                                >
                                    <div className="contacts__social">
                                        <svg
                                            width="33"
                                            height="28"
                                            viewBox="0 0 33 28"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M29.3996 1.86402L2.59515 12.0961C1.23553 12.6151 1.25791 13.4005 2.64469 13.8417L8.66662 15.5648L11.832 24.6166C12.3123 25.9904 13.5812 26.3077 14.6517 25.3221L18.6789 21.6141L24.3382 26.1712C25.4882 27.0631 26.6653 26.6257 26.9541 25.1996L31.346 3.51353C31.6348 2.08742 30.759 1.34523 29.3996 1.86402Z"
                                                stroke="#353535"
                                                strokeWidth="1.7"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M8.74219 15.5237L24.8729 7.28272L14.5272 18.2758L12.6969 25.689"
                                                stroke="#353535"
                                                strokeWidth="1.7"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M14.5781 18.3164L24.2859 26.1333"
                                                stroke="#353535"
                                                strokeWidth="1.7"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </Link>
                                <Link
                                    target="_blank"
                                    href="https://www.instagram.com/dmytrov.com.ua/"
                                >
                                    <div className="contacts__social">
                                        <svg
                                            width="28"
                                            height="28"
                                            viewBox="0 0 28 28"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g clipPath="url(#clip0_541_10089)">
                                                <path
                                                    d="M14.0063 7.15332C10.2252 7.15332 7.16406 10.2178 7.16406 13.9955C7.16406 17.7767 10.2285 20.8378 14.0063 20.8378C17.7874 20.8378 20.8485 17.7733 20.8485 13.9955C20.8485 10.2144 17.7841 7.15332 14.0063 7.15332ZM14.0063 18.4367C11.5518 18.4367 9.56517 16.4489 9.56517 13.9955C9.56517 11.5422 11.553 9.55443 14.0063 9.55443C16.4596 9.55443 18.4474 11.5422 18.4474 13.9955C18.4485 16.4489 16.4607 18.4367 14.0063 18.4367Z"
                                                    fill="#353535"
                                                />
                                                <path
                                                    d="M19.4993 0.751243C17.046 0.636799 10.9693 0.642355 8.51378 0.751243C6.356 0.852355 4.45267 1.37347 2.91822 2.90791C0.353777 5.47235 0.681555 8.92791 0.681555 13.9957C0.681555 19.1824 0.392666 22.5579 2.91822 25.0835C5.49267 27.6568 8.99822 27.3201 14.006 27.3201C19.1438 27.3201 20.9171 27.3235 22.7338 26.6201C25.2038 25.6612 27.0682 23.4535 27.2504 19.4879C27.366 17.0335 27.3593 10.9579 27.2504 8.50236C27.0304 3.82124 24.5182 0.982355 19.4993 0.751243ZM23.3827 23.3868C21.7016 25.0679 19.3693 24.9179 13.9738 24.9179C8.41822 24.9179 6.19044 25.0001 4.56489 23.3701C2.69267 21.5068 3.03155 18.5146 3.03155 13.9779C3.03155 7.83902 2.40155 3.41791 8.56267 3.10235C9.97822 3.05235 10.3949 3.03569 13.9582 3.03569L14.0082 3.06902C19.9293 3.06902 24.5749 2.44902 24.8538 8.60902C24.9171 10.0146 24.9316 10.4368 24.9316 13.9946C24.9304 19.4857 25.0349 21.7268 23.3827 23.3868Z"
                                                    fill="#353535"
                                                />
                                                <path
                                                    d="M21.1184 8.48196C22.0015 8.48196 22.7173 7.76611 22.7173 6.88307C22.7173 6.00003 22.0015 5.28418 21.1184 5.28418C20.2354 5.28418 19.5195 6.00003 19.5195 6.88307C19.5195 7.76611 20.2354 8.48196 21.1184 8.48196Z"
                                                    fill="#353535"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_541_10089">
                                                    <rect
                                                        width="26.6667"
                                                        height="26.6667"
                                                        fill="white"
                                                        transform="translate(0.667969 0.666504)"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                </Link>
                                <Link
                                    target="_blank"
                                    href="https://www.facebook.com/dmytrov.com.ua/"
                                >
                                    <div className="contacts__social">
                                        <svg
                                            width="19"
                                            height="32"
                                            viewBox="0 0 19 32"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M11.3033 31.9382H6.22225C5.37355 31.9382 4.68316 31.2491 4.68316 30.4021V18.9639H1.71877C0.870072 18.9639 0.179688 18.2746 0.179688 17.4278V12.5265C0.179688 11.6795 0.870072 10.9904 1.71877 10.9904H4.68316V8.53605C4.68316 6.10244 5.44883 4.03195 6.89714 2.54878C8.35198 1.05885 10.3851 0.271484 12.7768 0.271484L16.6518 0.277766C17.4991 0.279215 18.1883 0.968252 18.1883 1.81384V6.36457C18.1883 7.21161 17.4981 7.90065 16.6497 7.90065L14.0406 7.90162C13.2449 7.90162 13.0423 8.06083 12.999 8.10963C12.9276 8.19057 12.8426 8.41936 12.8426 9.05114V10.9902H16.4536C16.7254 10.9902 16.9888 11.0571 17.2151 11.1832C17.7034 11.4555 18.007 11.9704 18.007 12.5268L18.005 17.428C18.005 18.2746 17.3146 18.9636 16.4659 18.9636H12.8426V30.4021C12.8426 31.2491 12.152 31.9382 11.3033 31.9382ZM6.54323 30.0817H10.9823V18.1328C10.9823 17.5672 11.4435 17.1072 12.0099 17.1072H16.1449L16.1466 12.8469H12.0097C11.4432 12.8469 10.9823 12.3869 10.9823 11.8213V9.05114C10.9823 8.32586 11.0561 7.50105 11.6047 6.88111C12.2675 6.13167 13.312 6.04518 14.0401 6.04518L16.3282 6.04422V2.13372L12.7753 2.12792C8.93174 2.12792 6.54323 4.58352 6.54323 8.53605V11.8213C6.54323 12.3866 6.08233 12.8469 5.51588 12.8469H2.03976V17.1072H5.51588C6.08233 17.1072 6.54323 17.5672 6.54323 18.1328V30.0817Z"
                                                fill="#353535"
                                            />
                                        </svg>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <form className="contacts__box-form">
                            <h3
                                className="contacts__form-title"
                                style={{ marginBottom: "20px" }}
                            >
                                { t("contacts:contactFormCaption")}
                            </h3>
                            <div className="aside-popup__form-item">
                                <input
                                    {...register("name", {
                                        required: `${ t("validation:requiredLine") }`,
                                    })}
                                    className="input"
                                    id="form-conname"
                                ></input>
                                <label
                                    className="label labelOnGrayBg"
                                    htmlFor="form-conname"
                                >
                                    { t("contacts:formInputName") }
                                </label>
                                {errors.name && (
                                    <span className="error-message">
                                        {errors.name?.message}
                                    </span>
                                )}
                            </div>
                            <div className="aside-popup__form-item">
                                <input
                                    {...register("email", {
                                        required: `${ t("validation:requiredLine") }`,
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message:
                                                "Неправильний формат email",
                                        },
                                    })}
                                    className="input"
                                    id="form-conemail"
                                ></input>
                                <label
                                    className="label labelOnGrayBg"
                                    htmlFor="form-conemail"
                                >
                                    Email
                                </label>
                                {errors.email && (
                                    <span className="error-message">
                                        {errors.email?.message}
                                    </span>
                                )}
                            </div>
                            <div className="aside-popup__form-item">
                                <ReactInputMask
                                    mask="+38 (099) 999-99-99"
                                    type="text"
                                    className={`input ${
                                        errors?.phone && "error"
                                    }`}
                                    id="form-num"
                                    {...register("phone", {
                                        required: `${ t("validation:requiredLine") }`,
                                        pattern: {
                                            value: /^\+38\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
                                            message:
                                                "Введіть коректний номер телефону",
                                        },
                                    })}
                                />
                                <label
                                    className="label labelOnGrayBg"
                                    htmlFor="form-num"
                                >
                                    { t("contacts:formInputPhone") }
                                </label>
                                {errors.phone && (
                                    <span className="error-message">
                                        {errors.phone?.message}
                                    </span>
                                )}
                            </div>
                            <div className="aside-popup__form-item aside-popup__textarea">
                                <textarea
                                    {...register("message", {
                                        required: `${ t("validation:requiredLine") }`,
                                    })}
                                    className="input"
                                    id="form-context"
                                ></textarea>
                                <label
                                    className="label labelOnGrayBg"
                                    htmlFor="form-context"
                                >
                                    { t("contacts:formInputMessage") }
                                </label>
                                {errors.message && (
                                    <span className="error-message">
                                        {errors.message?.message}
                                    </span>
                                )}
                            </div>
                            <label className="aside-popup__check-box-label create__item-label">
                                <input
                                    {...register("agreement")}
                                    className="aside-popup__check-box-input"
                                    type="checkbox"
                                />
                                <span className="aside-popup__check-box-style"></span>
                                { t("contacts:fomIAgree") }{" "}
                                <a style={{color: "#e55733"}} href="/politic" target="_blank">{ t("contacts:fomIPrivacy") }</a>
                                { t("contacts:fomIAllow") }
                            </label>
                            <div
                                className="button contacts__btn"
                                onClick={handleSubmit(submitHandler)}
                            >
                                { t("common:sendButton") }
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <SeoBlock seo={seo} />
        </MainLayout>
        </>
    );
};

export default ContactsPage;
