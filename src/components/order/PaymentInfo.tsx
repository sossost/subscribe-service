import React, { useEffect, useState } from "react";
import Divider from "../Layout/Divider";
import classes from "./PaymentInfo.module.css";

const PaymentInfo = (props: { totalPrice: number }) => {
  const { totalPrice } = props;

  const [couponDiscount, setCouponDiscount] = useState(0);
  const [pointDiscount, setPointDiscount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(
    totalPrice - pointDiscount
  );

  const pointChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPointDiscount(+event.target.value);
  };

  useEffect(() => {
    setPaymentAmount(totalPrice - pointDiscount);
  }, [pointDiscount, totalPrice]);

  return (
    <>
      <div>
        <div className={classes.title}>
          <span>할인정보</span>
          <a href="">ㅇ</a>
        </div>
        <div className={classes.coupon}>
          <span>쿠폰</span>
          <span>0개 보유</span>
        </div>
        <div className={classes.point}>
          <span>포인트</span>
          <div>
            <input type="number" min="0" onChange={pointChangeHandler} />
            <button>최대사용</button>
          </div>
        </div>
      </div>
      <Divider />
      <div>
        <div className={classes.title}>
          <span>결제정보</span>
          <a href="">ㅇ</a>
        </div>
        <div className={classes.coupon}>
          <span>주문금액</span>
          <span>{totalPrice}</span>
        </div>
        <div className={classes.discount}>
          <span>할인</span>
          <div>
            <div className={classes.discount_detail}>
              <span>쿠폰</span>
              <span>0원</span>
            </div>
            <div className={classes.discount_detail}>
              <span>포인트</span>
              <span>-{pointDiscount}P</span>
            </div>
          </div>
        </div>
        <div className={classes.payment_amount}>
          <span>총 결제금액</span>
          <span>{paymentAmount}원</span>
        </div>
      </div>
      <Divider />
      <div>
        <div className={classes.title}>
          <span>적립 예정 포인트</span>
          <a href="">{Math.floor(paymentAmount * 0.06)}원</a>
        </div>
      </div>
      <Divider />
      <div>
        <div className={classes.title}>
          <div>
            <span>결제수단</span>
            <span>o</span>
          </div>
        </div>
        <div className={classes.payment_option}>
          <div className={classes.option_box}>
            <div>신용카드</div>
          </div>
          <div className={classes.option_box}>
            <div>가상계좌</div>
          </div>
        </div>
        <div>
          <span>ㅇ주문내용 확인 및 결제 동의</span>
        </div>
      </div>
      <div>
        <button>구독 결제</button>
      </div>
    </>
  );
};

export default PaymentInfo;
