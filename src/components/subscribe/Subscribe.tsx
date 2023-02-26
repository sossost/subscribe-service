import { useState } from "react";
import Label from "../Layout/Label";
import Calendar from "./Calendar";
import ProductList from "./ProductList";
import SubscribeBtn from "./SubscribeBtn";
import styled from "styled-components";

interface SubscribeProps {
  menu: {
    id: number;
    title: string;
    description: string;
    date: number;
    img: string;
    price: number;
  }[];
}

const Subscribe = (props: SubscribeProps) => {
  const { menu } = props;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const menuForSelectedDate = menu.filter((menu) => {
    return +new Date(menu.date) === +selectedDate;
  });

  const selectedDateHandler = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <SubsCribeWrap>
      <Label label="구독신청"></Label>
      <Calendar selectedDate={selectedDateHandler} />
      <ProductList menu={menuForSelectedDate} selectedDate={selectedDate} />
      <SubscribeBtn />
    </SubsCribeWrap>
  );
};

export default Subscribe;

const SubsCribeWrap = styled.div`
  padding: 20px;
  max-width: 768px;
  width: 100%;
  justify-content: center;
  margin-bottom: 100px;
`;
