//@ts-nocheck
import React, { FC } from "react";
import { Seo } from "@prisma/client";
import { useDynamicTranslate } from "@/utils/useDynamicTranslate";
import Head from "next/head";
import { NextSeo } from 'next-seo'
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

interface IImage {
    url: string;
    width?: number
    height?: number
    alt?: string;
    alt_ru?: string;
    name?: string
}
interface ISeoBlockProps {
    img?: IImage[] | JsonValue[],
    seo: Seo
}

const defaultSEO: Seo = {
    seoTitle: "dmytrov.com.ua",
    title: "dmytrov.com.ua",
    title_ru: "dmytrov.com.ua",
    seoTitle_ru: "dmytrov.com.ua",
    description: "Розробка технічного та дизайнерського проекту",
    description_ru: "Разработка технического и дизайн-проекта",
    keywords: "Замовити проект, купити квартиру, ремонт",
    seoText: "<p>Сайт дуже крутий, класна анкета</p>\n<p>Топ сайті</p>",
    seoText_ru: "<p>Сайт очень крутой, классная анкета</p>\n<p>Топ сайты</p>"
}


const SeoBlock: FC<ISeoBlockProps> = ( { seo, img } ) => {
    const mainSeo = seo || defaultSEO
    const dbTranslate = useDynamicTranslate()
    const pathname = usePathname()
    const {locale} = useRouter()

    console.log(img, 'afsdfasdf--=========');




    return (
        <div className={'container'} style={seo && {
            margin: '50px auto'
        }}>
            <Head>
                <title>{dbTranslate(mainSeo, 'title')}</title>
                <meta name="description" content={dbTranslate(mainSeo, 'description')} />
                <meta name="keywords" content={mainSeo.keywords || undefined} />
            </Head>
            <NextSeo
                openGraph={{
                    type: 'website',
                    locale: locale,
                    url: `https://www.dmytrov.com.ua${pathname}`,
                    title: `${dbTranslate(mainSeo, "title")}`,
                    description: `${dbTranslate(mainSeo, "description")}`,
                    site_name: 'dmytrov.com.ua',
                    images: img ? img.map(item => (
                        {
                            url: item.url,
                            width: 800,
                            height: 600,
                            alt: `${dbTranslate(item, "alt") || 'dmytrov.com.ua'}`,
                        }
                    )) : [
                        {
                            url: 'https://www.dmytrov.com.ua/assets/images/header-img/logo.svg',
                            width: 800,
                            height: 600,
                            alt: 'dmytrov.com.ua',
                        }
                    ]
                }}
            />
            {seo && !seo?.hideSeoText &&
                <>
                    <h3 style={{fontSize: 18, fontWeight: 700, marginBottom: 10}}>{dbTranslate(mainSeo, 'seoTitle')}</h3>
                    <div className="seoBlockDiv" style={{fontSize: 16, fontWeight: 400, lineHeight: 1.6}} dangerouslySetInnerHTML={{__html: dbTranslate(mainSeo, 'seoText') || mainSeo?.seoText}} />
                </>
            }

        </div>
    );
};

export default SeoBlock;