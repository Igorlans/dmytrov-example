//@ts-nocheck
import { FC, useEffect, useState } from "react";
import ServicesDialog from "@/components/ServicesDialog";
import { useSession } from "next-auth/react";
import useLoginAside from "@/context/useLoginAside";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useDynamicTranslate } from "@/utils/useDynamicTranslate";
import Image from "next/image";
import Button from "../UI/Buttons/Button";
import useMobile from "@/hooks/useMobile";

type PropsType = {
    item: {
        title: string;
        id: string;
        slug: string;
        text: string;
        price: string;
        img: any;
    };
};

export const AllServicesItem: FC<PropsType> = ({ item }: any) => {
    const [open, setOpen] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const { data: session } = useSession();
    const { setIsOpen } = useLoginAside();

    const isMobile = useMobile(960)

    useEffect(() => {
        if (isMobile) setOpen(false)
        else setOpen(true)
    }, [isMobile])

    const {t} = useTranslation()

    const dbTranslate = useDynamicTranslate()
    const handleOpen = () => {
        if (!isMobile) return
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    };

    const clickHandler = () => {
        if (!session?.user) return setIsOpen(true);
        setModalVisible(true);
    };

    return (
        <div
            className={
                open
                    ? "questions__item questions__item-all questions__item-all--active"
                    : "questions__item questions__item-all"
            }
            onClick={() => handleOpen()}
        >
            <div
                className={
                    open
                        ? "questions__item-line questions__item-line--active"
                        : "questions__item-line"
                }
            >
                <h3 className="questions__item-title questions__item-title-all">
                    {dbTranslate(item, 'title')}
                </h3>
            </div>
            <div className="questions__item-text-box">
                <div className="allservices__question-inner">
                    <div className="allservices__question-img">
                        <Image
                            src={item.image?.url}
                            width={550}
                            height={412}
                            alt={dbTranslate(item?.image, 'alt') || `Картинка "${item?.title}"`}
                            title={dbTranslate(item?.image, 'alt') || `Картинка "${item?.title}"`}
                        />
                    </div>
                    <div className="allservices__question-box">
                        <div className="questions__item-text questions__item-text-noml"
                           style={{ wordBreak: "break-word" }} dangerouslySetInnerHTML={{ __html: dbTranslate(item, 'descr') }}></div>
                        <div className="allservices__question-price">
                            <span>Вартість:</span>
                            {`${item.price} ${item.label}`}
                        </div>

                        <div className="accordionButton">
                            <Button onClick={clickHandler}>{t("common:getService")}</Button>
                            <Button href={`/additional/${item.slug}`}>{ t("common:more") }</Button>
                        </div>

                        <ServicesDialog userId={session?.user?.id} tarrifsName={item.title} userData={session?.user}
                                        servicesId={item.id} open={modalVisible}
                                        handleClose={() => setModalVisible(false)} />
                    </div>
                </div>
            </div>
        </div>
    );
};
