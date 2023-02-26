import classes from "./MainNav.module.css";
import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Router from "next/router";

const MainNav = () => {
  const { data: session, status } = useSession();
  const [profileBoxOn, setProfileBoxOn] = useState(false);

  const profileBoxOnHandler = () => {
    setProfileBoxOn(true);
  };

  const profileBoxOffHandler = () => {
    setProfileBoxOn(false);
  };

  const logoutHandler = () => {
    signOut();
    sessionStorage.clear();
  };

  const checkAuth = (event: MouseEvent) => {
    event.preventDefault();
    if (status === "authenticated") {
      Router.push("/subscriberegister");
    } else {
      alert("먼저 로그인 해주세요.");
      Router.push("/auth/login");
    }
  };

  return (
    <nav className={classes.bar}>
      <div className={classes.bar2}>
        <div className={classes.logo}>
          <Link href="/">logo</Link>
        </div>
        <ul className={classes.menu}>
          <li>
            <Link href="/menu">메뉴표</Link>
          </li>
          <li>
            <Link href="/subscriberegister" onClick={checkAuth}>
              구독신청
            </Link>
          </li>
          <li>
            <Link href="/notice">공지사항</Link>
          </li>
          <li>
            <Link href="/event">이벤트</Link>
          </li>
          <li>
            <Link href="/faq">자주묻는질문</Link>
          </li>
        </ul>

        {status === "authenticated" ? (
          <div
            className={classes.profile}
            onMouseOver={profileBoxOnHandler}
            onMouseOut={profileBoxOffHandler}
          >
            <div className={classes.profile_thumbnail}>
              <span>{session?.user?.name}님</span>
              <span>
                <button className={classes.logout_btn} onClick={logoutHandler}>
                  로그아웃
                </button>
              </span>
            </div>
            <div
              className={classes.profile_box}
              style={profileBoxOn ? { display: "" } : { display: "none" }}
            >
              <div></div>
              <div className={classes.btn}>
                <Link href="">마이페이지</Link>
                <Link href="">로그아웃</Link>
              </div>
            </div>
          </div>
        ) : (
          <div className={classes.profile}>
            <div className={classes.profile_thumbnail}>
              <span>
                <Link href="/auth/login" className={classes.logout_btn}>
                  로그인
                </Link>
              </span>
              <span>
                <Link href="/auth/signup" className={classes.logout_btn}>
                  회원가입
                </Link>
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
