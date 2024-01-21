import React, { FC } from "react";
import Prisma from "@prisma/client";
import AccountRequestItem from "@/components/account/Requests/AccountRequestItem";

interface AccountRequestsListProps {
    leads: Prisma.Request[];
    activeTab: number;
    isMobile: boolean;
}

const AccountRequestsList: FC<AccountRequestsListProps> = ({
    leads,
    activeTab,
    isMobile,
}) => {
    if (activeTab !== 0) return null;
    return (
        <>
            {leads.map((lead) => (
                <AccountRequestItem
                    key={lead.id}
                    lead={lead}
                    isMobile={isMobile}
                />
            ))}
        </>
    );
};

export default AccountRequestsList;
