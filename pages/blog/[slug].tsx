import prisma from "../../prisma/client";
import { Post, Seo, Review } from "@prisma/client";
import { ScrollToTopOnMount } from "@/helpers/routerup";
import MainLayout from "@/components/MainLayout";
import dayjs from "dayjs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useDynamicTranslate } from "@/utils/useDynamicTranslate";
import SeoBlock from "@/components/SeoBlock/SeoBlock";
import React from "react";
import Image from "next/image";
import BasicRating from "@/components/UI/Buttons/Rating";
import { useTranslation } from "next-i18next";

import type { Review as SchemaReview, WithContext } from "schema-dts"
import SchemaBlock from "@/components/SeoBlock/SchemaBlock";

export const getServerSideProps = async (ctx: any, locale: any) => {
    const { slug } = ctx.query;

    if (!slug) return { notFound: true };

    const post = await prisma.post.findFirst({
        where: {
            //@ts-ignore
            slug
        },
        include: {
            Review: true
        }
    });

    let services = await prisma.services.findMany({
        orderBy: {
            order: "asc"
        }
    });
    services = JSON.parse(JSON.stringify(services));

    if (!post) return { notFound: true };


    const seo = await prisma.seo.findFirst({
        where: {
            page: `/blog/${slug}`
        }
    })




    return {
        props: {
            services,
            post: post || null,
            seo,
            ...(await serverSideTranslations(ctx.locale as string, ['common', "validation"])),
        }
    };
};
interface PostWithReviews extends Post {
    Review: Review[]
}
const ArticlePage = ({ post, seo, services }: { post: PostWithReviews, seo: Seo, services: any }) => {
    const router = useRouter();
    const dbTranslate = useDynamicTranslate()

    const schema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": dbTranslate(post, 'title'),
        "description": dbTranslate(post, 'description'),
        "review": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": post?.Review[0]?.rating.toFixed(0),
            "bestRating": 5
          },
          "author": {
            "@type": "Person",
            "name": "Fred Benson"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": (post?.Review?.reduce((acc, item) => acc + item?.rating, 0) / post?.Review?.length).toFixed(1),
          "reviewCount": post?.Review?.length
        }
    }

    return (
        <>

            <SchemaBlock schema={schema} />

            <MainLayout services={services}>
                <ScrollToTopOnMount />
                <section className="blognew">
                    <div className="container">
                        <Link href={"/createpage"} className="button top__mob-btn">Замовити проєкт</Link>
                        <div className="blognew__wrapper">
                            <div className="blognew__content">
                                <AiOutlineArrowLeft size={30}
                                                    className={"arrow_mob"}
                                                    onClick={() => router.push('/blog')}
                                                    style={{
                                                        cursor: "pointer",
                                                        marginBottom: 20,
                                                        alignSelf: "flex-start"
                                                    }} />
                                <div style={{ position: "relative", alignSelf: "flex-start" }}>
                                    <AiOutlineArrowLeft size={50}
                                                        onClick={() => router.back()}
                                                        style={{
                                                            position: "absolute",
                                                            left: "-80px",
                                                            top: "10%",
                                                            cursor: "pointer"
                                                        }} />
                                    <h1 className="blognew__title">{dbTranslate(post, 'title')}</h1>
                                </div>
                                <BasicRating 
                                    readOnly={false}
                                    item={post}
                                />
                                <div className="blognew__data">
                                    {dayjs(Number(post.createdAt)).format(
                                        "DD.MM.YYYY"
                                    )}
                                </div>
                                {
                                    //@ts-ignore
                                    post?.content?.items?.map((item, index) =>
                                        <div key={index} style={{width: '100%'}}>
                                            {
                                                item?.image?.url &&
                                                <div className={"post__image"}>
                                                    <img src={item?.image?.url}
                                                           style={{width: '100%', height: 'auto'}}
                                
                                                        alt={dbTranslate(item?.image, 'alt') || `Картинка ${index + 1}"`}
                                                        title={dbTranslate(item?.image, 'alt') || `Картинка ${index + 1}"`}
                                                    />
                                                </div>
                                            }
                                            {
                                                item?.text &&
                                                <div
                                                    className={"post__text"}
                                                    style={{
                                                        wordWrap: "break-word",
                                                        maxWidth: 1326,
                                                        lineHeight: 1.6,
                                                        fontWeight: 400,
                                                        display: "flex",
                                                        flexDirection: 'column',
                                                        gap: 20
                                                    }}

                                                    dangerouslySetInnerHTML={{
                                                        //@ts-ignore
                                                        __html: dbTranslate(item, 'text')
                                                    }}
                                                ></div>
                                            }
                                        </div>
                                    )}

                            </div>
                        </div>
                    </div>
                </section>
                <SeoBlock seo={seo} img={[
                    //@ts-ignore
                    {url: post?.image?.url}
                ]} />
            </MainLayout>
        </>
    );
};

export default ArticlePage;
