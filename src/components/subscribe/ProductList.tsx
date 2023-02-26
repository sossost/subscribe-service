import Product from "./Product";

interface SubscribePageProps {
  menu: {
    id: number;
    title: string;
    description: string;
    date: number;
    img: string;
    price: number;
  }[];
  selectedDate: Date;
}

const ProductList = (props: SubscribePageProps) => {
  const { menu, selectedDate } = props;

  return (
    <>
      {menu.map((data: any) => {
        return (
          <Product
            key={data.id}
            id={data.id}
            img={data.img}
            title={data.title}
            price={data.price}
            date={data.date}
            description={data.description}
            selectedDate={selectedDate}
          />
        );
      })}
    </>
  );
};

export default ProductList;
