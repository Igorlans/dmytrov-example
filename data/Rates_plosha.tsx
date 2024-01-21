// @ts-nocheck

import { useDynamicTranslate } from "@/utils/useDynamicTranslate";

export const Rates = ({ data, price, setPrice, activeItem, setActiveItem, handler }) => {
  const dbTranslate = useDynamicTranslate()
  // const [activeItem, setActiveItem] = useState<number | null>(0);

  // const handler = (idx, price) => {
  //   setActiveItem(idx);
  //   setPrice(price)
  // }

  return (
    <div className="services__range-items">
      {data.map((item, idx) => (
        <div
          className={
            activeItem === idx
              ? "services__range-item services__range-item--active"
              : "services__range-item"
          }
          key={idx}
          onClick={() => handler(idx, item.price)}
        >
          <div className="services__range-item-title">{dbTranslate(item, 'title')}</div>
          <div className="services__range-item-text">{dbTranslate(item, 'subTitle')}</div>
          <div className="services__range-item-text">{item.price}</div>
        </div>
      ))}
    </div>
  );
};
