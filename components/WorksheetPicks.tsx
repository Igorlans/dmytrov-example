import { FC, useState } from "react";
// import { dataCkecks } from "../data/worksheet";

type PropsType = {
  picks: {
    id: number;
  }[];
};

export const WorksheetPicks: FC<PropsType> = (props) => {
  const [checkPick, setCheckPick] = useState<number | null>(null);
  const handlePick = (pickId: number) => {
    if (checkPick === pickId) {
      setCheckPick(null);
    } else {
      setCheckPick(pickId);
    }
  };

  return (
    <div className="worksheet__pick-item-box">
      <div className="worksheet__pick-item-checks">
        {props.picks.map((item) => (
          <div
            className={
              checkPick === item.id
                ? "worksheet__pick-item-check worksheet__pick-item-check--active"
                : "worksheet__pick-item-check"
            }
            key={item.id}
            onClick={() => handlePick(item.id)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.27321 2.74809C7.94729e-08 4.50053 0 7.00036 0 12C0 16.9996 7.94729e-08 19.4995 1.27321 21.2519C1.68441 21.8179 2.18213 22.3156 2.74809 22.7268C4.50053 24 7.00036 24 12 24C16.9996 24 19.4995 24 21.2519 22.7268C21.8179 22.3156 22.3156 21.8179 22.7268 21.2519C24 19.4995 24 16.9996 24 12C24 7.00036 24 4.50053 22.7268 2.74809C22.3156 2.18213 21.8179 1.68441 21.2519 1.27321C19.4995 7.94729e-08 16.9996 0 12 0C7.00036 0 4.50053 7.94729e-08 2.74809 1.27321C2.18213 1.68441 1.68441 2.18213 1.27321 2.74809ZM19.4117 8.66703C19.7801 8.25556 19.7452 7.62336 19.3337 7.25497C18.9223 6.88657 18.29 6.92151 17.9216 7.33297L13.4295 12.3505C12.5192 13.3672 11.9061 14.0484 11.382 14.4889C10.8828 14.9085 10.5895 15 10.3333 15C10.0772 15 9.78387 14.9085 9.28464 14.4889C8.76053 14.0484 8.14752 13.3672 7.23725 12.3505L6.07836 11.0561C5.70997 10.6447 5.07777 10.6097 4.66631 10.9781C4.25484 11.3465 4.21991 11.9787 4.58831 12.3901L5.79671 13.7399C6.64449 14.6869 7.35165 15.4768 7.9978 16.0199C8.68132 16.5944 9.41853 17 10.3333 17C11.2481 17 11.9853 16.5944 12.6688 16.0199C13.3151 15.4768 14.0221 14.6869 14.87 13.7399L19.4117 8.66703Z"
                fill="#E55733"
              />
            </svg>
            <span></span>
          </div>
        ))}
      </div>
    </div>
  );
};
