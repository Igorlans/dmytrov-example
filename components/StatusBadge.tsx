import React, {FC} from 'react';
import CSS from 'csstype';
import {RequestStatus} from "@prisma/client";
import {useTranslation} from "react-i18next";
interface StatusBadgeProps {
    status: RequestStatus,
    style?: CSS.Properties
}

const StatusBadge: FC<StatusBadgeProps> = ({status, style}) => {
    const {t} = useTranslation();
    const badgeStyles = (color: string): CSS.Properties => {
        return {
            ...style,
            fontSize: "12px",
            display: 'inline-block',
            top: "15px",
            padding: "5px",
            whiteSpace: 'nowrap',
            lineHeight: 1,
            background: color,
            color: "white",
            borderRadius: '10px',
            right: "15px"
        }
    }
    switch (status) {
        case "NEW":
            return (
                <div style={badgeStyles('#e55733')}>
                    {t("account:formStatusNew")}
                </div>
            )
        case "PAUSED":
            return (
                <div
                    style={badgeStyles('#fbbd23')}
                >
                    {t("account:formStatusPaused")}
                </div>
            )
        case "IN_ORDER":
            return (
                <div
                    style={badgeStyles('#abcc38')}
                >
                    {t("account:formStatusQueue")}
                </div>
            )
        case "REJECTED":
            return (
                <div
                    style={badgeStyles('#f87272')}
                >
                    {t("account:formStatusNull")}
                </div>
            )
        case "DONE":
            return (
                <div
                    style={badgeStyles('#36d399')}
                >
                    {t("account:formStatusDone")}
                </div>
            )
        case "AWAIT_MEASURE":
            return (
                <div
                    style={badgeStyles('#5392e7')}
                >
                    {t("account:formStatusPending")}
                </div>
            )
        case "IN_WORK":
            return (
                <div
                    style={badgeStyles('#3abff8')}
                >
                    {t("account:formStatusWork")}
                </div>
            )
        default:
            return null;
    }
};

export default StatusBadge;