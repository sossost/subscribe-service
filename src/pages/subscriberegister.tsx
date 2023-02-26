import Subscribe from "../components/subscribe/Subscribe";
import dynamic from "next/dynamic";
import path from "path";
import fs from "fs/promises";

const DynamicSubscriberegister = dynamic(
  () => import("../components/subscribe/Subscribe"),
  {
    ssr: false,
  }
);

interface menuProps {
  menu: {
    id: number;
    title: string;
    description: string;
    date: number;
    img: string;
    price: number;
  }[];
}

const SubscribeRegisterPage = (props: menuProps) => {
  const { menu } = props;

  return <DynamicSubscriberegister menu={menu} />;
};

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data", "MenuData.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  return {
    props: {
      menu: data.menu,
    },
  };
};
export default SubscribeRegisterPage;
