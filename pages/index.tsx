// @ts-nocheck
import { IndexSlide } from "@/components/index/Slider/IndexSlider";
import { Questions } from "@/components/index/Questions";
import { Rates } from "@/components/index/Rates";
import { Top } from "@/components/index/Top";
import MainLayout from "@/components/MainLayout";
import { Services } from "@/components/Services";
import prisma from "@/prisma/client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRouter as useAppRouter } from "next/navigation";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";
import SeoBlock from "@/components/SeoBlock/SeoBlock";
import { useTranslation } from "next-i18next";

import SchemaBlock from "@/components/SeoBlock/SchemaBlock";
import type { LocalBusiness, WithContext } from "schema-dts"


export async function getStaticProps( { locale, resolvedUrl }: GetStaticPropsContext ) {
    const resData1 = await prisma.tariffes.findMany({
        orderBy: {
            order: "asc"
        }
    });
    let services = await prisma.services.findMany({
        orderBy: {
            order: "asc"
        }
    });

    services = JSON.parse(JSON.stringify(services));

    const resData2 = await prisma.question.findMany({
        orderBy: {
            order: "asc"
        }
    });

    const seo = await prisma.seo.findFirst({
        where: {
            page: '/'
        }
    })

    return {
        props: {
            services,
            data1: resData1,
            data2: resData2,
            seo,
            ...(await serverSideTranslations(locale as any, ['main', 'common', 'drover', 'validation'])),
        },
        revalidate: 50,
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

export default function Home({ data1, data2, seo, services }: any) {
    const router = useRouter();
    const { t } = useTranslation();
    useEffect(() => {
        const isScroll = router.query?.checkPrice === "scroll";
        if (isScroll) {
            const section = document.querySelector(".services__inner");
            section?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, []);

    // const handleEmail = async () => {
    //     try {
    //         const mailBody: IMailOptions = {
    //             to: "onishchukmaks05@gmail.com",
    //             subject: "SBU",
    //             html: `<div>hui sosi</div>`
    //         };
    //         await toast.promise(
    //             apiRequest({ url: "/api/sendMail", data: mailBody, method: "POST" }), {
    //                 loading: "Відправлення email...",
    //                 success: (data) => {
    //                     console.log("info", data);
    //                     return "Email відправлено";
    //                 },
    //                 error: "Помилка відправлення емейлу"
    //             }
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };

    const appRotuer = useAppRouter();

    useEffect(() => {
        appRotuer.push(router.asPath.split('/?')[0])
    }, []);

    return (
        <>
            <SchemaBlock schema={schema}/>
            <MainLayout services={services} >
                {/*<ScrollToTopOnMount />*/}
                <Top />
                <IndexSlide />
                <Rates data={data1} />
                <Services data={data1} />
                <Questions data={data2} />
                <SeoBlock seo={seo} />
            </MainLayout>
        </>
    );
}
