import MainLayout from "@/components/MainLayout";
import prisma from "@/prisma/client";
import { Post, Prisma, Review, Seo } from "@prisma/client";
import { ScrollToTopOnMount } from "@/helpers/routerup";
import dayjs from "dayjs";
import Link from "next/link";
import Pagination from "@/components/pagination/Pagination";
import QueryMode = Prisma.QueryMode;
import Input from "@/components/UI/Input/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, IconButton } from "@mui/material";
import { BiSearch } from "react-icons/bi";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useDynamicTranslate } from "@/utils/useDynamicTranslate";
import SeoBlock from "@/components/SeoBlock/SeoBlock";
import BasicRating from "@/components/UI/Buttons/Rating";
import { NextSeo } from 'next-seo';
import Image from "next/image";

import type { BreadcrumbList, WithContext } from "schema-dts"
import SchemaBlock from "@/components/SeoBlock/SchemaBlock";

export const PAGE_SIZE = 10;
export const getServerSideProps = async ({ query, locale }: any) => {
    const currentPage = query.page ? parseInt(query.page) : 1;
    const offset = (currentPage - 1) * PAGE_SIZE;
    const searchQuery = query.search || "";

    let services = await prisma.services.findMany({
        orderBy: {
            order: "asc"
        }
    });
    services = JSON.parse(JSON.stringify(services));



    const where = {
        OR: [
            { title: { contains: searchQuery, mode: "insensitive" as QueryMode } },
            { description: { contains: searchQuery, mode: "insensitive" as QueryMode } }
        ]
    };


    const postsPromise = prisma.post.findMany({
        skip: offset,
        take: PAGE_SIZE,
        where: where,
        orderBy: {
            createdAt: "desc"
        },
        include: {
            Review: true
        }
    });



    const totalCountPromise = prisma.post.count({ where });

    const [posts, totalCount] = await prisma.$transaction([postsPromise, totalCountPromise]);

    const seo = await prisma.seo.findFirst({
        where: {
            page: `/blog`
        }
    })

    return {
        props: {
            services,
            posts,
            totalCount,
            currentPage,
            searchQuery,
            seo,
            ...(await serverSideTranslations(locale, ['blog', 'common', "validation"])),
        }
    };
};

interface PostWithReviews extends Post {
    Review: Review[]
}


export const Blog = ({ posts, totalCount, currentPage, searchQuery, seo, services }: {
    posts: PostWithReviews[],

    totalCount: number,
    currentPage: number
    searchQuery: string
    seo: Seo,
    services: any
}) => {
    const router = useRouter();
    const [search, setSearch] = useState(searchQuery || "");
    const { t } = useTranslation();
    const dbTranslate = useDynamicTranslate()
    const handleSearch = () => {
        router.push(`/blog${search ? `?search=${search}&page=1` : ""}`);
    };

    const resetSearch = () => {
        setSearch("");
        router.push(`/blog`);
    };

    const schema: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": posts.map((item: Post, i: number) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": dbTranslate(item, 'title'),
            "item": `https://www.dmytrov.com.ua/blog/${item.slug}`
        }))
    }

    
    return (
        <>
            <SchemaBlock schema={schema} />
            
            <MainLayout services={services}>
                <ScrollToTopOnMount />
                <section className="blog">
                    <div className="container">
                        <Link href={"/createpage"} className="button top__mob-btn">Замовити проєкт</Link>
                        <div className="blog__wrapper">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: 'wrap' }}>
                                <div>
                                    <h1 className="blog__title">{ t("blog:h1BlogTitle") }</h1>
                                    <p className="blog__text">
                                        { t("blog:h1BlogDescr")}
                                    </p>
                                </div>
                                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <Input label={"Пошук"} value={search}
                                            onChange={(e) => setSearch(e.target.value)} />
                                        {
                                            searchQuery &&
                                            <Button onClick={resetSearch} style={{ fontSize: 12, alignSelf: "flex-end" }}
                                                    size={"small"}>Очистити</Button>

                                        }

                                    </div>
                                    <IconButton onClick={handleSearch} size={"medium"} sx={{ color: "#e55733" }}>
                                        <BiSearch size={30} />
                                    </IconButton>

                                </div>
                            </div>

                            <div className="blog__items">
                                {posts?.map((item, index) => (
                                    <div className="blog__item">
                                        <div className="blog__item-data">
                                            {dayjs(Number(item.createdAt)).format(
                                                "DD.MM.YYYY"
                                            )}
                                        </div>
                                        <div className="blog__item-image">
                                            <Image
                                                style={{
                                                    maxWidth: 520,
                                                    width: "100%",
                                                    height: "auto"
                                                }}
                                                width={520}
                                                height={325}
                                                //@ts-ignore
                                                src={item?.image?.url as any}
                                                alt={dbTranslate(item?.image, 'alt') || `Картинка "${item.title}"`}
                                            title={dbTranslate(item?.image, 'alt') || `Картинка "${item.title}"`}
                                            />
                                        </div>
                                        <div className="blog__item-box">
                                            <Link
                                                href={`/blog/${item.slug}`}
                                            >
                                                <h2 className="blog__box-title">
                                                    {dbTranslate(item, 'title')}
                                                </h2>
                                            </Link>

                                            <p className="blog__box-text">
                                                {dbTranslate(item, 'description')}
                                            </p>
                                            <BasicRating
                                                item={item}
                                                readOnly={true}
                                            />
                                            <Link
                                                href={`/blog/${item.slug}`}
                                                className="blog__box-link"
                                            >
                                                { t("common:readMore") }
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {totalCount ?
                                <Pagination search={searchQuery} currentPage={currentPage} totalCount={totalCount} />
                                : <div style={{
                                    minHeight: "50vh",
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: 32,
                                    justifyContent: "center"
                                }}>
                                    {searchQuery ? `${t('common:onRequest')} "${searchQuery}" ${t('common:nothingFound')}` : t('common:nothingFound')}
                                </div>

                            }

                    </div>
                </div>
            </section>

            <SeoBlock seo={seo}  />
        </MainLayout></>
    );
};

export default Blog;
