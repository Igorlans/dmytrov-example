import MainLayout from "@/components/MainLayout";
import { AllServicesItem } from "@/components/allservices/AllservicesQuestion";
import { RatesItem } from "@/components/index/RatesItem";
import prisma from "@/prisma/client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useLoginAside from "@/context/useLoginAside";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import SeoBlock from "@/components/SeoBlock/SeoBlock";
import Image from "next/image"
import { gtmService } from "@/services/gtmService";
import Link from "next/link";

import type { BreadcrumbList, WithContext } from "schema-dts"
import SchemaBlock from "@/components/SeoBlock/SchemaBlock";

export async function getStaticProps( { locale } : { locale: any} ) {
    let tariffes = await prisma.tariffes.findMany({
        orderBy: {
            order: "asc"
        }
    });
    let services = await prisma.services.findMany({
        orderBy: {
            order: "asc"
        }
    });

    const seo = await prisma.seo.findFirst({
        where: {
            page: '/allservices'
        }
    })

    tariffes = JSON.parse(JSON.stringify(tariffes));
    services = JSON.parse(JSON.stringify(services));
    return {
        props: {
            dataTariffs: tariffes,
            dataServices: services,
            seo,
            ...(await serverSideTranslations(locale, ['services', 'common', "validation"])),
        },
        revalidate: 50
    };
}

export const AllServices = ({ dataTariffs, dataServices, seo }: any) => {
    const { data: session } = useSession();
    const router = useRouter();
    const { setIsOpen } = useLoginAside();
    const { t } = useTranslation();
    const schema: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": dataTariffs.map((item: any) => {
            return {
                "@type": "ListItem",
                "position": item.order,
                "url": `https://www.dmytrov.com.ua/allservices#${item.id}`,
                "name": item.title,
                "item": {
                    "@id": `https://www.dmytrov.com.ua/allservices#${item.id}`,
                    "name": item.title
                  }
            }
        })
    }


    return (
        <>
            

            <SchemaBlock schema={schema} />

            <MainLayout services={dataServices}>
                {/* <ScrollToTopOnMount /> */}
                <section className="allservices">
                    <div className="container">
                        <div
                            onClick={() => {
                                session?.user ? router.push("/createpage") : setIsOpen(true);
                            }}
                            className="button top__mob-btn">
                            Замовити проєкт
                        </div>
                        <div className="allservices__wrapper">
                            <div className="allservicess__top"
                                // style={{height: "30vw"}}
                            >
                                <h1 className="main-title allservices__title">{ t("services:allServices") }</h1>
                                <div
                                    style={{position: "relative", width: "100%", height: "100%"}}
                                >
                                    <Image
                                        src={"/assets/images/allservices-img/topbg.jpg"}
                                        className="allservices__img"
                                        // style={{minWidth: "432px", minHeight: "320px"}}
                                        fill={true}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="rates">
                                <h3 className="rates__title title">{ t("services:tariffs") }</h3>
                                <div className="rates__items">
                                    {dataTariffs.map((item: any, idx: any) => (
                                        <RatesItem item={item} key={idx} />
                                    ))}
                                </div>
                            </div>
                            <div className="button header__face-btn">
                                {
                                    !session?.user ?
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
                        </div>
                    </div>
                </section>
                <section className="questions questions-all">
                    <div className="container">
                        <div className="questions__wrapper">
                            <h2 className="questions__allsubtitle">{ t("services:additionServices") }:</h2>
                            <div className="questions__items">
                                {dataServices.map((item: any) => (
                                    <AllServicesItem key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <SeoBlock
                    seo={seo}
                    img={[
                        {url: "https://dmytrov.com.ua/assets/images/allservices-img/topbg.jpg"}
                    ]}
                />
            </MainLayout>
        </>
    );
};

export default AllServices