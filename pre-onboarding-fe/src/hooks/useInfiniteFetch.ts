import { useState } from "react";
import { getMockData } from "../apis/getProductList";

export type FetchState = "idle" | "loading" | "fetched" | "error";
export type Data<T> = T[];

export const useInfinitefetch = <T>() => {
  const [state, setState] = useState<FetchState>("idle");
  const [data, setData] = useState<Data<T>>([]);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  let page = 0;

  const fetchNextPage = async () => {
    setState("loading");
    try {
      const nextPageResponse = await getMockData(page);
      if (state === "loading") return;
      if (nextPageResponse.isEnd) {
        setState("idle");
        setIsEnd(true);
      } else {
        setState("fetched");
        setData((data) => [...data, ...(nextPageResponse.datas as T[])]);
        page += 1;
      }
    } catch (e) {
      console.error("[Data Fetch Failed]");
      setState("error");
    }
  };

  return {
    state,
    data,
    isEnd,
    fetchNextPage,
  };
};
