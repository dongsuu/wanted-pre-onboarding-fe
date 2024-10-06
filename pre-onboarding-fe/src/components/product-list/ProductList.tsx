import { useEffect, useRef } from "react";
import { Product } from "../product/Product";
import { useInfinitefetch } from "../../hooks/useInfiniteFetch";
import { ProductType } from "../product/types";

export function ProductList() {
  const moreRef = useRef<HTMLDivElement>(null);
  const {
    state,
    data: productList,
    isEnd,
    fetchNextPage,
  } = useInfinitefetch<ProductType>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isEnd && state !== "loading") {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (moreRef.current) {
      observer.observe(moreRef.current);
    }

    return () => {
      if (moreRef.current) {
        observer.disconnect();
      }
    };
  }, [isEnd]);

  return (
    <div className="flex flex-col gap-6 justify-center items-center overflow-scroll">
      {productList.map((product) => (
        <Product
          key={`${product.productId}-${product.productName}-${
            product.boughtDate
          }-${Math.random()}`}
          productName={product.productName}
          price={product.price}
          boughtDate={product.boughtDate}
        />
      ))}
      {state === "loading" && <div>Loading...</div>}
      {isEnd && <div>All data Loaded.</div>}
      <div ref={moreRef} />
    </div>
  );
}
