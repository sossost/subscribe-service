import { useCallback, useState, useRef } from "react";
import classes from "./Calendar.module.css";

const Calendar = (props: any) => {
  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDay(),
    date: new Date().getDate(),
  };

  const [selectedYear, setSelectedYear] = useState(today.year);
  const [selectedMonth, setSelectedMonth] = useState(today.month);
  const totalDays = new Date(selectedYear, selectedMonth, 0).getDate();
  const day = new Date(selectedYear, selectedMonth, 1).getDay();
  const weeks = (totalDays + day) / 7 + 1;

  const prevMonthHandler = useCallback(() => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }, [selectedMonth, selectedYear]);

  const nextMonthHandler = useCallback(() => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }, [selectedMonth, selectedYear]);

  const dateSelectHandler = useCallback(
    (event: any) => {
      props.selectedDate(
        new Date(selectedYear, selectedMonth, +event.target.textContent)
      );
    },
    [selectedYear, selectedMonth, props]
  );

  const returnDay = useCallback(
    (week: number) => {
      let dayArr = [];

      for (let i = (week - 1) * 7 - day; i < 7 * week - day; i++) {
        let date = i + 1;
        const sat = 7 * week - day;
        const sun = 7 * week - day - 6;

        if (i < 0 || i >= totalDays) {
          dayArr.push(<td key={date}></td>);
        } else {
          dayArr.push(
            <td key={date}>
              {new Date(selectedYear, selectedMonth, date) <
                new Date(today.year, today.month, today.date) ||
              date === sat ||
              date === sun ? (
                <div className={classes.unsubscribeable}>
                  <div className={classes.date}>
                    <span>{date}</span>
                  </div>
                  <div className={classes.btnless}></div>
                </div>
              ) : (
                <div
                  className={classes.subscribable}
                  onClick={dateSelectHandler}
                >
                  <div className={classes.date}>
                    <span>{date}</span>
                  </div>
                  <div className={classes.btn}></div>
                </div>
              )}
            </td>
          );
        }
      }
      return dayArr;
    },
    [
      selectedYear,
      selectedMonth,
      totalDays,
      day,
      today.year,
      today.month,
      today.date,
      dateSelectHandler,
    ]
  );

  const returnRow = useCallback(() => {
    let weekArr: any = [];

    for (let i = 1; i < weeks; i++) {
      weekArr.push(i);
    }

    return (
      <>
        {weekArr.map((index: any) => {
          return <tr key={index}>{returnDay(index)}</tr>;
        })}
      </>
    );
  }, [weeks, returnDay]);

  return (
    <div className={classes.calendar}>
      <div className={classes.year_month}>
        <span onClick={prevMonthHandler} className={classes.month_btn}>
          &lt;
        </span>
        <span>
          {selectedYear}년 {selectedMonth + 1}월
        </span>
        <span onClick={nextMonthHandler} className={classes.month_btn}>
          &gt;
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
          </tr>
        </thead>
        <tbody>{returnRow()}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
