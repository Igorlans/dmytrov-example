import { GetServerSidePropsContext } from "next";
import prisma from "@/prisma/client";

const SITE_URL = "https://dmytrov.com.ua";

const staticPages = [
    `${SITE_URL}`,
    `${SITE_URL}/allservices`,
    `${SITE_URL}/contactspage`,
    `${SITE_URL}/forgotPassword`,
    `${SITE_URL}/questions`,
    `${SITE_URL}/register`,
    `${SITE_URL}/tariffs/basic`,
    `${SITE_URL}/tariffs/standard`,
    `${SITE_URL}/tariffs/premium`,
    `${SITE_URL}/blog`,
    `${SITE_URL}/politic`,

    `${SITE_URL}/ru`,
    `${SITE_URL}/ru/allservices`,
    `${SITE_URL}/ru/contactspage`,
    `${SITE_URL}/ru/forgotPassword`,
    `${SITE_URL}/ru/questions`,
    `${SITE_URL}/ru/register`,
    `${SITE_URL}/ru/tariffs/basic`,
    `${SITE_URL}/ru/tariffs/standard`,
    `${SITE_URL}/ru/tariffs/premium`,
    `${SITE_URL}/ru/blog`,
    `${SITE_URL}/ru/politic`,
]

function generateSiteMap(posts: { slug: string }[], services: { slug: string }[]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${
            staticPages
                .map((page) => {
                    return `
                           <url>
                               <loc>${page}</loc>
                           </url>
                        `;}).join("")
        }
        ${
            posts
                .map(({ slug }) => {
                    return `
                       <url>
                           <loc>${`${SITE_URL}/blog/${slug}`}</loc>
                       </url>
                    `;}).join("")
        }
        ${
        posts
            .map(({ slug }) => {
                return `
                       <url>
                           <loc>${`${SITE_URL}/ru/blog/${slug}`}</loc>
                       </url>
                    `;}).join("")
    }
        ${
        services
            .map(({ slug }) => {
                return `
                   <url>
                       <loc>${`${SITE_URL}/additional/${slug}`}</loc>
                   </url>
                `;}).join("")
        }
        ${
        services
            .map(({ slug }) => {
                return `
                   <url>
                       <loc>${`${SITE_URL}/ru/additional/${slug}`}</loc>
                   </url>
                `;}).join("")
    }
   </urlset>
 `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res } : GetServerSidePropsContext) {
    // We make an API call to gather the URLs for our site
    const posts = await prisma.post.findMany({
        select: {
            slug: true
        }
    })

    const services = await prisma.services.findMany({
        select: {
            slug: true
        }
    })
    const sitemap = generateSiteMap(posts, services);

    res.setHeader("Content-Type", "text/xml");
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {}
    };
}

export default SiteMap;