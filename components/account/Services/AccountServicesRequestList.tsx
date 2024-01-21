import {FC} from "react";
import {IClientSideService} from "@/types/types";
import AccountServicesRequestItem from "@/components/account/Services/AccountServicesRequestItem";

interface AccountRequestsListProps {
    services: IClientSideService[];
    activeTab: number;
    isMobile: boolean;
}
const AccountServicesRequestList: FC<AccountRequestsListProps> = ({services, activeTab, isMobile}) => {
    if (activeTab !== 1) return null;
    return (
        <>
            {services.map(service =>
                <AccountServicesRequestItem service={service} isMobile={isMobile} />
            )}
        </>
    );
};

export default AccountServicesRequestList;