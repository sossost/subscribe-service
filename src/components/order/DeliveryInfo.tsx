import classes from "./DeliveryInfo.module.css";

const DeliveryInfo = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <span>배송정보</span>
        <a href="">배송지변경</a>
      </div>
      <div className={classes.content}>
        <span>집|배송지</span>
        <p>상세주소</p>
      </div>
    </div>
  );
};

export default DeliveryInfo;
