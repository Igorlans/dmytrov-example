import Button from "@/components/UI/Buttons/Button";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps( { locale } : { locale: any} ) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', "validation"])),
        },
    };
}

const PageNotFound = () => {
    const { t } = useTranslation()
    return (
        <div style={{
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            gap: 40,
        }}>
            <Image 
                src={'/assets/404.svg'} 
                alt={'404'} 
                style={{width: 400}} 
                width={400} 
                height={315}
            />
            <h1
                style={{
                    fontWeight: 500,
                    fontSize: 22,
                    letterSpacing: 2,
                    textTransform: 'uppercase'
                }}
            >
                Сторінку не знайдено
            </h1>
            <Button href="/">{t("common:toHomePage")}</Button>
        </div>
    )
}

export default PageNotFound;