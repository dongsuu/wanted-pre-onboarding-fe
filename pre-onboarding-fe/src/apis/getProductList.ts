import { MOCK_DATA, MockData } from "../mocks/data";

export interface Response {
  datas: MockData[];
  isEnd: boolean;
}

const PER_PAGE = 10;

export const getMockData = (pageNum: number) => {
  return new Promise<Response>((resolve) => {
    setTimeout(() => {
      const datas: MockData[] = MOCK_DATA.slice(
        PER_PAGE * pageNum,
        PER_PAGE * (pageNum + 1)
      );
      const isEnd = PER_PAGE * (pageNum + 1) >= MOCK_DATA.length;

      resolve({ datas, isEnd });
    }, 1500);
  });
};
