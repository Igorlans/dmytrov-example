import EnterEmail from "@/components/forgotPassword/EnterEmail";
import ConfirmCode from "@/components/forgotPassword/ConfirmCode";
import ChangePassword from "@/components/forgotPassword/ChangePassword";
import React, { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { emailString } from "@/services/mailService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import prisma from "@/prisma/client";
import SeoBlock from "@/components/SeoBlock/SeoBlock";

export type ChangePasswordStep = "ENTER_EMAIL" | "CONFIRM_CODE" | "CHANGE_PASSWORD" | null

export async function getServerSideProps( { locale } : { locale: any} ) {

    const seo = await prisma.seo.findFirst({
        where: {
            page: '/forgotPassword'
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
            ...(await serverSideTranslations(locale, ['passworRestore', 'validation', 'common'])),
        }
    };
}

const ResetPassword = ({seo, services}: any) => {
    const { t } = useTranslation(); 

    const [changePasswordStep, setChangePasswordStep] = useState<ChangePasswordStep>("ENTER_EMAIL");
    const [hash, setHash] = useState<string | null>(null);
    const [email, setEmail] = useState<emailString | null>(null);
    console.log(hash);
    const renderChangePasswordStep = () => {
        switch (changePasswordStep) {
            case "ENTER_EMAIL":
                return <EnterEmail setStep={setChangePasswordStep} setHash={setHash} setEmail={setEmail} />;
            case "CONFIRM_CODE":
                return <ConfirmCode setStep={setChangePasswordStep} hash={hash as string} />;
            case "CHANGE_PASSWORD":
                return <ChangePassword email={email as emailString} />;
            case null:
                return null;
        }
    };

    return (
        <MainLayout services={services}>
            <section className={"forgotPassword"}
                     style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className={"container"}>
                    <h1 className={"forgotPassword__title"}>{ t("passworRestore:title") }</h1>
                    {renderChangePasswordStep()}
                </div>

            </section>
            <SeoBlock seo={seo} />
        </MainLayout>
    );
};

export default ResetPassword;