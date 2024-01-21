import React, { useRef, useState } from "react";
import { dataQuestionsGrid, dataQuestionsLine } from "@/data/questions";
import { QuestionItem } from "./QuestionItem";
import Link from "next/link";
import { useTranslation } from "next-i18next";
export const Questions = ({ data }: any) => {
  const { t } = useTranslation();

  return (
    <section className="questions">
      <div className="container">
        <div className="questions__wrapper">
          <h2 className="questions__title title">{ t("main:oftenQuestion")}</h2>
          <div className="questions__items">
            {data.slice(0,5).map((item: any, idx: any) => (
              <QuestionItem item={item} key={idx} line={false} />
            ))}
          </div>
          <div className="questions__link button">
            <Link className="quest_mainpage" href={'/questions'}>{ t("common:allQuestionsButton") }</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
