import { useRouter } from "next/router";

export const useDynamicTranslate = () => {
    const { locale } = useRouter()

    const translate = (object: any, keyString: string ) => {
        return locale === 'ru' ? object[`${keyString}_ru`] || object[keyString] : object[keyString]
    }

    return translate;
}