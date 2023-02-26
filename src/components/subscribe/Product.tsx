import classes from "./Product.module.css";
import { subsCtx } from "../store/SubscribeContext";
import Image from "next/image";
import { useContext, useState } from "react";

interface SubscribePageProps {
  id: number;
  title: string;
  description: string;
  date: number;
  img: string;
  price: number;
  selectedDate: Date;
}

const Product = (props: SubscribePageProps) => {
  const { img, id, title, price, date, description, selectedDate } = props;
  const {
    subsInfo,
    setSubsInfo,
    totalPrice,
    setTotalPrice,
    subsDays,
    setSubsDays,
  } = useContext(subsCtx);

  console.log(subsInfo);

  const findIndex = subsInfo.findIndex((e: any) => e.id === id);

  const [amount, setAmount] = useState(
    findIndex != -1 ? subsInfo[findIndex].amount : 0
  );

  const subsPlusHandler = () => {
    setAmount(amount + 1);

    let copySubsInfo = [...subsInfo];

    if (findIndex === -1) {
      copySubsInfo.push({
        id: id,
        title: title,
        price: price,
        amount: 1,
        date: date,
      });
    } else {
      copySubsInfo[findIndex] = {
        ...copySubsInfo[findIndex],
        amount: subsInfo[findIndex].amount + 1,
      };
    }

    const subsDate = subsInfo.filter((menu: any) => {
      return +new Date(menu.date) === +selectedDate;
    });

    setSubsInfo(copySubsInfo);

    setTotalPrice(totalPrice + price);

    if (subsDate.length === 0) {
      setSubsDays(subsDays + 1);
    }
  };

  const subsMinusHandler = () => {
    setAmount(amount - 1);

    let copySubsInfo = [...subsInfo];

    if (subsInfo[findIndex].amount === 1) {
      copySubsInfo.splice(findIndex, 1);
    } else {
      copySubsInfo[findIndex] = {
        ...copySubsInfo[findIndex],
        amount: subsInfo[findIndex].amount - 1,
      };
    }

    const subsDate = copySubsInfo.filter((menu: any) => {
      return +new Date(menu.date) === +selectedDate;
    });

    setSubsInfo(copySubsInfo);
    setTotalPrice(totalPrice - price);

    if (subsDate.length === 0) {
      setSubsDays(subsDays - 1);
    }
  };

  return (
    <div className={classes.content}>
      <div className={classes.img}>
        {/* <Image src={img} alt={title} width={100} height={200} /> */}
      </div>
      <div>
        <h3>
          {title} | {price}
        </h3>
        <p>{description}</p>
        <div>
          {amount === 0 ? (
            <button disabled>-</button>
          ) : (
            <button onClick={subsMinusHandler}>-</button>
          )}
          <span>{amount}</span>

          <button onClick={subsPlusHandler}>+</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
