interface Props {
  sum: number;
}

export function PriceSum({ sum }: Props) {
  return (
    <div className="fixed bg-green-300 top-0 right-1/3 m-4 p-4">
      물품 금액 합계 = {sum}
    </div>
  );
}
