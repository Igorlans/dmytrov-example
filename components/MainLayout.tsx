// @ts-nocheck

import React, { useState, useEffect, useCallback, useRef } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { Services } from "@prisma/client";
import { ITariffes } from "./Footer"; 

type MainLayoutProps = {
  children: React.ReactNode;
  services: Services[];
}

const tariffes: ITariffes = [
  {id: "sdu8vy9s8vy", title: "Базовий", title_ru: "Базовый", slug: "basic"},
  {id: "sdu8a8654as", title: "Стандарт", title_ru: "Стандарт", slug: "standard"},
  {id: "asd7u8a865q", title: "Преміум", title_ru: "Премиум", slug: "premium"},
]

const MainLayout = ({ children, services }: MainLayoutProps) => {

  return (
    <>
      <Header />
      <main>
          {children}
      </main>
      <div>
        <Footer services={services} tariffes={tariffes}/>
      </div>
    </>
  );
}

export default MainLayout


