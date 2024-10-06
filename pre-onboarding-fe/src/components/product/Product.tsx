interface Props {
  productName: string;
  price: number;
  boughtDate: string;
}

export function Product({ productName, price, boughtDate }: Props) {
  return (
    <div className="flex flex-col gap-2 border border-black rounded-xl p-2">
      <div className="text-2xl">{productName}</div>
      <div>{price}</div>
      <div>{boughtDate}</div>
    </div>
  );
}
