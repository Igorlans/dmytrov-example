import {IComparisonRow} from "@/types/types";
import classes from './comparisonTable.module.scss';
import {FC} from "react";
import ComparisonCheckbox from "@/components/ComparisonTable/ComparisonCheckbox";
import {Tariffes} from "@prisma/client";
import { useTranslation } from "next-i18next";
import { useDynamicTranslate } from "@/utils/useDynamicTranslate";

interface ComparisonTableProps {
    rows: IComparisonRow[];
    tariffs: Tariffes[]
}

const ComparisonTable: FC<ComparisonTableProps> = ({rows, tariffs}) => {

    const {t} = useTranslation()
    const dbTranslate = useDynamicTranslate();

    return (
        <div className={classes.comparison}>
            <div className="container">
                <h2 className={classes.comparison_title}>{t('services:servicesComparison')}</h2>
                <div className={classes.table}>
                    <div className={classes.header}>
                        <div className={classes.header_title}>{t('services:nameOfTariffOrService')}</div>
                        {tariffs.map((tariff, index) =>
                            <div key={index} className={classes.header_title}>{dbTranslate(tariff, 'title')}</div>
                        )}
                    </div>
                    <div className={classes.rows}>
                        {rows.map((row, index) =>
                            <div key={index} className={classes.rows_item}>
                                <div className={classes.rows_title}>{dbTranslate(row, 'text')}</div>
                                <div className={classes.rows_checkbox}>
                                    <ComparisonCheckbox checked={row.isCheckedFirst} />
                                </div>
                                <div className={classes.rows_checkbox}>
                                    <ComparisonCheckbox checked={row.isCheckedSecond} />
                                </div>
                                <div className={classes.rows_checkbox}>
                                    <ComparisonCheckbox checked={row.isCheckedThird} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComparisonTable;