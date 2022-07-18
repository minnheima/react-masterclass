import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(["history", coinId], () => fetchCoinHistory(coinId), {
    refetchInterval: 10000,
  });
  const historyData = data?.map((history) => ({
    x: new Date(history.time_open * 1000),
    y: [history.open, history.close, history.high, history.low],
  }));

  // console.log(data?.map((price) => price.close));

  // ---------- ApexChart series 에 data값을 넣어줌 ---------
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "price",
              data: historyData as [],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              type: "datetime",
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#ff009d",
                  downward: "#0be881",
                },
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(3)}`,
              },
            },
          }}
        />

        // <ApexChart
        //   type="line"
        //   series={[
        //     {
        //       name: "price",
        //       data: data?.map((price) => price.close) as number[],
        //     },
        //   ]}
        //   options={{
        //     theme: {
        //       mode: "dark",
        //     },
        //     chart: {
        //       height: 500,
        //       width: 500,
        //       toolbar: {
        //         show: false,
        //       },
        //       background: "transparent",
        //     },
        //     grid: {
        //       show: false,
        //     },
        //     stroke: {
        //       curve: "smooth",
        //       width: 3,
        //     },
        //     yaxis: {
        //       show: false,
        //     },
        //     xaxis: {
        //       axisBorder: { show: false },
        //       labels: {
        //         show: false,
        //       },
        //       type: "datetime",
        //       axisTicks: {
        //         show: false,
        //       },
        //       categories: data?.map((price) => (price.time_close as any) * 1000 ?? []), // API의 날짜는 Unix형식이라 JS 형식으로 바꿔줘야함
        //     },
        //     fill: {
        //       type: "gradient",
        //       gradient: {
        //         gradientToColors: ["#0be881"],
        //         stops: [0, 100],
        //       },
        //     },
        //     colors: ["#0fbcf9"],
        //     tooltip: {
        //       y: {
        //         formatter: (value) => `$ ${value.toFixed(2)}`, // 소수점 두자리까지만
        //       },
        //     },
        //   }}
        // />
      )}
    </div>
  );
}

export default Chart;
