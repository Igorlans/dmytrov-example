import MainLayout from "@/components/MainLayout";
import { useSession } from "next-auth/react";
import { Skeleton, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSideProps, NextPage } from "next";
import prisma from "@/prisma/client";
import { IClientSideService } from "@/types/types";
import React, { useEffect, useState } from "react";
import AccountRequestsList from "@/components/account/Requests/AccountRequestsList";
import AccountServicesRequestList from "@/components/account/Services/AccountServicesRequestList";
import { Request } from "@prisma/client";
import PersonalData from "@/components/account/PersonalData/PersonalData";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import Image from "next/image"

import SchemaBlock from "@/components/SeoBlock/SchemaBlock";
import type { Person, WithContext } from "schema-dts"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    if (!session?.user) return { redirect: { permanent: false, destination: "/" } };
    let leads = await prisma.request.findMany({
        orderBy: {
            createdAt: "desc"
        },
        where: {
            userId: session?.user.id
        }
    });
    let footerServises = await prisma.services.findMany({
        orderBy: {
            order: "asc"
        }
    });
    footerServises = JSON.parse(JSON.stringify(footerServises));
    let services = await prisma.servicesRequest.findMany({
        orderBy: {
            createdAt: "desc"
        },
        where: {
            userId: session?.user.id
        },
        select: {
            Services: {
                select: {
                    id: true,
                    title: true,
                    price: true
                }
            }
        }
    });
    console.log("LEADSSS", leads);
    leads = JSON.parse(JSON.stringify(leads));
    return {
        props: {
            footerServises,
            leads: leads,
            services: services,
            ...(await serverSideTranslations(ctx.locale as any, ['account', 'common', 'validation'])),
        }
    };
};

interface AccountPageProps {
    leads: Request[],
    services: IClientSideService[],
    footerServises: any
}


const AccountPage: NextPage<AccountPageProps> = ({ leads, services, footerServises }) => {
    const { data, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(0);
    const { t } = useTranslation();

    const ordersLabel = t('account:orders')
    const servicesLabel = t('account:services')

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const schema: WithContext<Person> = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": `${data?.user.name} ${data?.user.fatherName} ${data?.user.surname}`,
        "image": data?.user.image || "https://www.dmytrov.com.ua/assets/images/account-img/logo.jpg",
    }

    return (
        <>
        <SchemaBlock schema={schema} />
        <MainLayout  services={footerServises}>
            <section className="account">
                <div className="container">
                    <Link href={"/createpage"} className="button top__mob-btn button top__mob-btn-mb12">
                        Замовити проєкт
                    </Link>
                    <div className="account__wrapper">
                        <div className="account__box-image">
                            <div className="account__title-box">
                                <div className="account__logo">
                                    <Image 
                                        src="/assets/images/account-img/logo.jpg" 
                                        alt="user acc" 
                                        width={52}
                                        height={52}
                                    />
                                </div>
                                {status === "loading"
                                    ?
                                    <Skeleton style={{ marginLeft: 20 }} width={300} height={70} />
                                    // @ts-ignore
                                    : <h1
                                        className="account__name">{`${data?.user?.surname || ""} ${data?.user?.name || ""} ${data?.user?.fatherName || ""}`}</h1>
                                }
                            </div>
                            <div className="account__subtitle">
                                {isClient &&
                                    <Tabs
                                        style={{
                                            margin: "20px 0"
                                        }}
                                        value={activeTab}
                                        onChange={(e: React.SyntheticEvent, newValue: number) => setActiveTab(newValue)}
                                        textColor="primary"
                                        indicatorColor="primary"
                                    >
                                        <Tab value={0} label={ordersLabel} />
                                        <Tab value={1} label={servicesLabel} />
                                    </Tabs>
                                }

                            </div>
                            <AccountRequestsList leads={leads} activeTab={activeTab} isMobile={false} />
                            <AccountServicesRequestList services={services} activeTab={activeTab} isMobile={false} />
                        </div>

                        <div className="account__subtitle account__subtitle-mob">
                            {isClient &&
                                <Tabs
                                    style={{
                                        margin: "20px 0"
                                    }}
                                    value={activeTab}
                                    onChange={(e: React.SyntheticEvent, newValue: number) => setActiveTab(newValue)}
                                    textColor="primary"
                                    indicatorColor="primary"
                                >
                                    <Tab value={0} label={ordersLabel} />
                                    <Tab value={1} label={servicesLabel} />
                                </Tabs>
                            }

                            <AccountRequestsList leads={leads} activeTab={activeTab} isMobile={true} />
                            <AccountServicesRequestList services={services} activeTab={activeTab} isMobile={true} />

                        </div>
                        {isClient &&
                            <PersonalData />
                        }
                    </div>
                </div>
            </section>
        </MainLayout>
        </>
    );
};

export default AccountPage;