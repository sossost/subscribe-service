import classes from "./SubscriptionInfo.module.css";

interface SubscriptionInfoProps {
  totalQuantity: number;
}

const SubscriptionInfo = (props: SubscriptionInfoProps) => {
  const { totalQuantity } = props;

  //   let totalQuantity = 0;

  //   for (let i = 0; i < subsInfo.length; i++) {
  //     totalQuantity = totalQuantity + subsInfo[i].amount;
  //   }

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <span>구독정보</span>
        <a href="">ㅇ</a>
      </div>
      <div className={classes.content}>
        <div className={classes.info}>
          <span>구독 수량</span>
          <span>{totalQuantity}개</span>
        </div>
        <div className={classes.info}>
          <span>구독 기간</span>
          <span>2023-02-01 ~ 2023-02-28(총 28일)</span>
        </div>
        <div>
          <span>구독 일정</span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionInfo;
