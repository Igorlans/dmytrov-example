
import { RatesItem } from "./RatesItem";
import { useTranslation } from "next-i18next";


export const Rates = ({ data }: any) => {
  const { t } = useTranslation();
  return (
    <section className="rates">
      <div className="container">
        <div className="rates__wrapper">
          <h2 className="rates__title title">{ t("common:tariffsSectionTitle") }</h2>
          <div className="rates__items">
            {data.map((item: any, idx: any) => (
              <RatesItem item={item} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
