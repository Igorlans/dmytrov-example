// @ts-nocheck
import { useDynamicTranslate } from "@/utils/useDynamicTranslate";

export const Rates = ({ tariffes, methods}: any) => {
  const activeItem = methods.watch('tariffId');
  console.log('tarifes', tariffes);
  const handleClick = (value) => {
    methods.setValue('tariffId', value)
    methods.trigger('tariffId')

  }

  const dbTranslate = useDynamicTranslate();

  return (
  
    <div className="services__range-items">
      <input
        type="hidden"
        {...methods.register('tariffId', {
          required: 'Поле обов\'язкове',
        })}
      />
      {tariffes?.map((item: any, idx: any) => (
        <div
          className={`services__range-item ${activeItem === item.id ? 'services__range-item--active' : ''}`}
          key={idx}
          onClick={() => handleClick(item.id)}
        >
          
          <div className="services__range-item-title">{dbTranslate(item, 'title')}</div>
          <div className="services__range-item-text">{dbTranslate(item, 'subTitle')}</div>
        </div>
      ))}
      {methods.formState.errors?.tariff && <span className="error-message">{methods.formState?.errors?.tariff?.message}</span>}
    </div>
  );
};
