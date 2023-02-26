import classes from "./SubscribeBtn.module.css";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { subsCtx } from "../store/SubscribeContext";
import { useSession } from "next-auth/react";
import Router from "next/router";

const SubscribeBtn = () => {
  const { subsInfo, totalPrice, subsDays, setTotalQuantity } =
    useContext(subsCtx);

  const { status } = useSession();

  useEffect(() => {
    let totalQuantity = 0;

    for (let i = 0; i < subsInfo.length; i++) {
      totalQuantity = totalQuantity + subsInfo[i].amount;
    }

    setTotalQuantity(totalQuantity);
  }, [subsInfo, setTotalQuantity]);

  const btnDisabled = () => {};

  const SubsbtnHandler = () => {
    if (status === "authenticated") {
      Router.push("/order");
    } else {
      alert("먼저 로그인 해주세요.");
      Router.push("/auth/login");
    }
  };

  return (
    <>
      <button
        className={classes.SubsBtn}
        onClick={SubsbtnHandler}
        disabled={subsDays === 0 && totalPrice === 0 ? true : false}
      >
        <div>
          <h3>
            {subsDays}일 | {totalPrice}원 구독신청
          </h3>
        </div>
      </button>
    </>
  );
};

export default SubscribeBtn;
