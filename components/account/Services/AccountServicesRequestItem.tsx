import {FC} from "react";
import {IClientSideService} from "@/types/types";

interface IAccountServicesRequestItemProps {
    service: IClientSideService;
    isMobile: boolean;
}
const AccountServicesRequestItem: FC<IAccountServicesRequestItemProps> = ({service, isMobile}) => {
    return (
        <div className={`account__item ${isMobile ? 'account__item-mob' : ''}`} style={{position: 'relative'}}>
            <div className="account__item-subtitle">Додаткова послуга</div>
            <div className="account__item-title">{service.Services.title}</div>
            <div className="account__item-inner">
                <div className="account__item-box">
                    <div className="account__item-box-top">
                        <div style={{fontSize: 16, fontWeight: 500}} className="account__item-box-title">{service.Services.price + ' грн. за м2'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountServicesRequestItem;