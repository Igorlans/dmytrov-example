import { useEffect, useState } from "react";
import "dayjs/locale/uk";
import { FormProvider, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Tariffes } from "@prisma/client";
import Link from "next/link";
import useLoginAside from "@/context/useLoginAside";
import ProgressBar from "@/components/RequestForm/ProgressBar";
import PickTariff from "@/components/RequestForm/PickTariff";
import PickSquare from "@/components/RequestForm/PickSquare";
import PickBuildingType from "@/components/RequestForm/PickBuildingType";
import PickAddress from "@/components/RequestForm/PickAddress";
import PickMeasurement from "@/components/RequestForm/PickMeasurement";

interface ICreatePageProps {
    tariffes: Tariffes[]
}


export const RequestForm = ({ tariffes }: ICreatePageProps) => {
    const { data: session, update: sessionUpdate } = useSession();
    const router = useRouter();
    const { setIsOpen } = useLoginAside();



    useEffect(() => {
        if (!session?.user) {
            setIsOpen(true);
            router.push("/");
        }
    }, [session]);

    const methods = useForm({
        defaultValues: {
            tariffId: "",
            comment: "",
            agreement: false,
            square: "5",
            type: "",
            address: "",
            street: "",
            homeNumber: "",
            date: dayjs(new Date()).valueOf()
        }
    });


    const [tour, setTour] = useState(1);

    const isLastTour = tour === 5;
    const isFirstTour = tour === 1;

    const handleBack = () => {
        setTour(tour - 1)
    }
    const handleNext = () => {
        setTour(tour + 1)
    }

    const renderTour = () => {
        switch (tour) {
            case 1:
                return (
                    <PickTariff
                        methods={methods}
                        tariffes={tariffes}
                        handleBack={handleBack}
                        handleNext={handleNext}
                        isLastTour={isLastTour}
                        isFirstTour={isFirstTour}
                    />
                )
            case 2:
                return (
                    <PickSquare
                        methods={methods}
                        handleBack={handleBack}
                        handleNext={handleNext}
                        isLastTour={isLastTour}
                        isFirstTour={isFirstTour}
                    />
                )
            case 3:
                return (
                    <PickBuildingType
                        methods={methods}
                        handleBack={handleBack}
                        handleNext={handleNext}
                        isLastTour={isLastTour}
                        isFirstTour={isFirstTour}
                    />
                )
            case 4:
                return (
                    <PickAddress
                        methods={methods}
                        handleBack={handleBack}
                        handleNext={handleNext}
                        isLastTour={isLastTour}
                        isFirstTour={isFirstTour}
                    />
                )
            case 5:
                return (
                    <PickMeasurement
                        tariffes={tariffes}
                        methods={methods}
                        handleBack={handleBack}
                        isLastTour={isLastTour}
                        isFirstTour={isFirstTour}
                    />
                )
        }
    }


    return (
        <>
                <FormProvider {...methods}>
                    {/* <ScrollToTopOnMount /> */}
                    <section className="create">
                        <div className="container">
                            <Link href={"/createpage"} className="button top__mob-btn">
                                Замовити проєкт
                            </Link>
                            <div className="create__wrapper">
                                <ProgressBar tour={tour} />
                                {renderTour()}
                            </div>
                        </div>
                    </section>
                </FormProvider>
        </>
    );
};

export default RequestForm;
