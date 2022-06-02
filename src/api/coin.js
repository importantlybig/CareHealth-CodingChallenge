export const CoinList = () =>
	`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&=&sparkline=false`

export const Coin = (id) => `https://api.coingecko.com/api/v3/coins/${id}`
