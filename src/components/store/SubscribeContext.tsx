import { createContext, useEffect, useState } from "react";

interface subsCtxType {
  subsInfo: {
    title: string;
    price: number;
    amount: number;
    date: Date;
  };
  totalPrice: number;
  subsDay: number;
  totalQuantity: number;
}

export const storage = (props: string) => {
  if (typeof window !== "undefined") {
    const saved = window.sessionStorage.getItem(props);
    if (saved !== null) {
      return JSON.parse(saved);
    } else {
      if (props === "subsInfo") {
        return [];
      } else if (
        props === "totalPrice" ||
        props === "subsDays" ||
        props === "totalQuantity"
      ) {
        return 0;
      }
    }
  } else {
    if (props === "subsInfo") {
      return [];
    } else if (
      props === "totalPrice" ||
      props === "subsDays" ||
      props === "totalQuantity"
    ) {
      return 0;
    }
  }
};

export const subsCtx = createContext<subsCtxType | null>(null);

const SubscribeContext = (props: any) => {
  const [subsInfo, setSubsInfo] = useState<
    {
      title: string;
      price: number;
      amount: number;
      date: Date;
    }[]
  >(storage("subsInfo"));

  const [totalPrice, setTotalPrice] = useState(storage("totalPrice"));
  const [subsDays, setSubsDays] = useState(storage("subsDays"));
  const [totalQuantity, setTotalQuantity] = useState(storage("totalQuantity"));

  return (
    <subsCtx.Provider
      value={{
        subsInfo,
        setSubsInfo,
        totalPrice,
        setTotalPrice,
        subsDays,
        setSubsDays,
        totalQuantity,
        setTotalQuantity,
      }}
    >
      {props.children}
    </subsCtx.Provider>
  );
};

export default SubscribeContext;
