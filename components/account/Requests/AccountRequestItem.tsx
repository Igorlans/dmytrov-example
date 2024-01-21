import { FC } from "react";
import { Request } from "@prisma/client";
import StatusBadge from "@/components/StatusBadge";
import Link from "next/link";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
interface IAccountRequestItemProps {
    isMobile: boolean;
    lead: Request;
}

const AccountRequestItem: FC<IAccountRequestItemProps> = ({
                                                              lead,
                                                              isMobile
                                                          }) => {
    // @ts-ignore
    const isQuestionaryCompleted = lead?.questionary?.answers;
    //@ts-ignore
    const percent = ((lead?.persisted?.step / lead?.persisted?.tours?.length) * 100).toFixed(0);
    console.log("PERCENT =====", percent);
    const { t } = useTranslation();

    return (
        <div
            className={`account__item ${isMobile ? "account__item-mob" : ""}`}
            style={{ position: "relative" }}
        >
            <StatusBadge
                status={lead?.status}
                style={{ position: "absolute", top: "15px", right: "15px" }}
            />
            <div className="account__item-subtitle"
                 style={{ marginBottom: 5 }}>{dayjs(lead?.createdAt).format("DD.MM.YYYY")}</div>
            <div className="account__item-subtitle">Заявка</div>
            <div className="account__item-title">{`${lead.address}, ${lead.street}, ${lead.homeNumber}`}</div>
            <div className="account__item-inner">
                {!isQuestionaryCompleted ?
                    <div className="account__item-box">
                        <div className="account__item-box-top">
                            <div className="account__item-box-title">{ t("account:formFilledProgres")}</div>
                            <div className="account__item-box-num">{isNaN(Number(percent)) ? 0 : percent}%</div>
                        </div>
                        <div
                            className="account__item-box-line"
                            style={{ width: `${isNaN(Number(percent)) ? 0 : percent}%` }}
                        >
                            <span></span>
                        </div>
                    </div>
                    :

                    <div className="account__item-box">
                        <div className="account__item-box-top">
                            <div className="account__item-box-title">{ t("account:formFilledProgres")}</div>
                            <div className="account__item-box-num">100%</div>
                        </div>
                        <div
                            className="account__item-box-line"
                            style={{ width: "100%" }}
                        >
                            <span></span>
                        </div>
                    </div>
                }

                <div className="account__item-box">
                    {
                        !isQuestionaryCompleted ? (
                                <Link
                                    className="button account__item-box-btn"
                                    href={`/questionary/${lead.id}`}
                                >
                                    {percent !== "100" && !isNaN(Number(percent)) ? `${t("account:continue")}` : `${t("account:formFill")}`}
                                </Link>
                            ) :
                            <div
                                className="button account__item-box-btn"
                            >
                                {t("account:formFilled")}
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default AccountRequestItem;
