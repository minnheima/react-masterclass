import { fetchTickers } from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 10px 20px;
  border-radius: 10px;
  margin: 10px 0;
  span.data-title {
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
  }
`;

interface ChartProps {
  coinId: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price({ coinId }: ChartProps) {
  const { isLoading: tickersLoading, data: coinTicker } = useQuery<IPriceData>(["priceData", coinId], () => fetchTickers(coinId));
  return (
    <div>
      {tickersLoading ? (
        "Loading price..."
      ) : (
        <div>
          <Overview>
            <span className="data-title">등락률:</span>
            <span>{coinTicker?.quotes.USD.percent_from_price_ath}%</span>
          </Overview>
          <Overview>
            <span className="data-title">시가총액:</span>
            <span>${coinTicker?.quotes.USD.market_cap.toFixed(3)}</span>
          </Overview>
          <Overview>
            <span className="data-title">거래량(24h):</span>
            <span>{coinTicker?.quotes.USD.volume_24h_change_24h}</span>
          </Overview>
        </div>
      )}
    </div>
  );
}

export default Price;
