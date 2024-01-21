import prisma from '@/prisma/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MainLayout from '@/components/MainLayout'
import { useTranslation } from 'next-i18next';
import { Privacy } from '@prisma/client';
import { useDynamicTranslate } from '@/utils/useDynamicTranslate';

export async function getStaticProps( { locale } : { locale: any} ) {
    let services = await prisma.services.findMany({
        orderBy: {
            order: "asc"
        }
    });

    let privacy = await prisma.privacy.findMany({})
    services = JSON.parse(JSON.stringify(services));
    privacy = JSON.parse(JSON.stringify(privacy));
    return {
        props: {
            dataServices: services,
            privacy,
            ...(await serverSideTranslations(locale, ['politic', 'common', "validation"])),
        },
        revalidate: 50
    };
}
const politic = ({ dataServices, privacy } : { dataServices: any, privacy: Privacy[] }) => {
    const { t } = useTranslation();
    const translate = useDynamicTranslate()
    const dbPrivacy = privacy[0];

  return (
    <MainLayout services={dataServices}>
        <div className='container'>

        <section className="allservices politicList"
            // style={{textAlign: "center"}}
        >
            <h1 style={{paddingBottom: "12px"}}>{translate(dbPrivacy, "title")}</h1>

            <div
                dangerouslySetInnerHTML={{ __html: translate(dbPrivacy, 'descr') }}
            >

            </div>
        </section>
        </div>
    </MainLayout>
  )
}

export default politic