import MainLayout from "@/components/MainLayout";
import Link from "next/link";
import { QuestionItem } from "@/components/index/QuestionItem";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import prisma from "@/prisma/client";
import SeoBlock from "@/components/SeoBlock/SeoBlock";
import SchemaBlock from "@/components/SeoBlock/SchemaBlock";
import type { FAQPage, WithContext } from "schema-dts"
import { useDynamicTranslate } from "@/utils/useDynamicTranslate";
import { Question } from "@prisma/client";

export async function getStaticProps( { locale } : { locale: any} ) {
    let questions = await prisma.question.findMany({
        orderBy: {
            order: "asc"
        }
    })

    let services = await prisma.services.findMany({
        orderBy: {
            order: "asc"
        }
    });
    services = JSON.parse(JSON.stringify(services));

    const seo = await prisma.seo.findFirst({
        where: {
            page: '/questions'
        }
    })

    return {
        props: {
            services,
            data: questions,
            seo,
            ...(await serverSideTranslations(locale, ['question', 'common', "validation"])),
        },
        revalidate: 50,
    };
}



export const QuestionPage = ({ data, seo, services }: any) => {
    const { t } = useTranslation();

    const dbTranslate = useDynamicTranslate();

    const schema: WithContext<FAQPage> = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data.map((item: Question) => {
            return {
                "@type": "Question",
                "name": dbTranslate(item, 'title'),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": dbTranslate(item, 'descr')
                }
            }
        })
    };

    return (
        <>         
            <SchemaBlock schema={schema} />

            <MainLayout services={services} >
                {/* <ScrollToTopOnMount /> */}
                <section className="questions questions-page">
                    <div className="container">
                        <div className="questions__wrapper">
                            <h1 className="questions__title title">{ t("question:allQuestion") }</h1>
                            <div className="questions__items">
                                {data?.map((item: any, idx: any) => (
                                    <QuestionItem item={item} key={idx} line={false} />
                                ))}
                            </div>
                            <Link className="button questions__btn" href={"/contactspage"}>{ t("common:haveQuestionButton") }</Link>
                        </div>
                    </div>
                </section>
            <SeoBlock seo={seo} />
        </MainLayout>
        </>
    );
};

export default QuestionPage;
