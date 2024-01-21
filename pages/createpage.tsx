import "dayjs/locale/uk";
import MainLayout from "@/components/MainLayout";
import prisma from "@/prisma/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import SeoBlock from "@/components/SeoBlock/SeoBlock";
import RequestForm from "@/components/RequestForm/RequestForm";

export async function getStaticProps(ctx: GetServerSidePropsContext) {
    const tariffs = await prisma.tariffes.findMany({
        orderBy: {
            order: "asc"
        }
    });

    const seo = await prisma.seo.findFirst({
        where: {
            page: '/createpage'
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
            tariffs,
            seo,
            services,
            ...(await serverSideTranslations(ctx.locale as string, ['common', 'create', 'validation'])),
        },
        revalidate: 50
    };
}



export const CreatePage = ({ tariffs, seo, services }: any) => {

    const {t} = useTranslation()

    return (
        <MainLayout services={services}>
            <RequestForm tariffes={tariffs} />
            <SeoBlock seo={seo} />
        </MainLayout>
    );
};

export default CreatePage;

// handleSubmit(activeItem, valueRage, activeHome, cityValue, street, numHome, selectedDate, comment)}


// () => handleSubmit(activeItem, valueRage, activeHome, cityValue, street, numHome, value)

