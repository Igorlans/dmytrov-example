import { FC } from "react";
import Link from "next/link";
import { getTariffNameById } from "@/pages/tariffs/[tariff]";
import { useTranslation } from "next-i18next";
import { useDynamicTranslate } from "@/utils/useDynamicTranslate";
type PropsType = {
    item: {
        title: string;
        subtitle: string;
        price: string;
        text: string;
        link: string;
    };
};

export const RatesItem: FC<PropsType> = ({ item, data }: any) => {

    const { t } = useTranslation();

    const dbTranslate = useDynamicTranslate()

    return (
        <div className={item.activated ? "rates__item" : "rates__item_deactivate"}>
            <div className="rates__item-top">
                <h3 className="rates__item-title">{dbTranslate(item, 'title')}</h3>
                <h4 className="rates__item-text">{dbTranslate(item, 'subTitle')}</h4>
            </div>
            <div className="rates__item-content">
                <div className="rates__price">
                    {item.price}
                    <span>грн/м2</span>
                </div>
                <Link href={`/tariffs/${getTariffNameById(item.id)}`}>
                    <div className="rates__link">
                        {t("common:viewExampleButton")}
                    </div>
                </Link>
                <p className="rates__text">{dbTranslate(item, "text")}</p>
                <p className="rates__text rates__text-mob">
                    {dbTranslate(item, 'text')}
                    <a href="#" className="rates__text-more">
                        Читати далi
                    </a>
                </p>
            </div>
        </div>
    );
};
