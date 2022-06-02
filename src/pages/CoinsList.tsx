import axios from 'axios'
import { useEffect, useState, ChangeEvent } from 'react'
import { Container, Table } from 'react-bootstrap'
import { CoinList } from '../api/coin'
import { useHistory } from 'react-router-dom'
import { CoinTypes } from '../interface'

const CoinsList: React.FC = () => {
	const [coinsList, setCoinsList] = useState<CoinTypes[]>([])
	const [search, setSearch] = useState<string>('')
	const [sort, setSort] = useState('DSC')

	const history = useHistory()

	const getCoins = async () => {
		const { data } = await axios.get(CoinList())

		setCoinsList(data)
	}

	useEffect(() => {
		getCoins()
	}, [])

	const onSearchChange = (e: ChangeEvent<{ value: unknown }>) => {
		setSearch(e.target.value as string)
	}

	const handleSort = (sortField: any) => {
		if (sort === 'DSC') {
			const sorted = [...coinsList].sort((a, b) =>
				a[sortField as keyof CoinTypes] < b[sortField as keyof CoinTypes]
					? 1
					: -1
			)
			setCoinsList(sorted)
			setSort('ASC')
		}
		if (sort === 'ASC') {
			const sorted = [...coinsList].sort((a, b) =>
				a[sortField as keyof CoinTypes] > b[sortField as keyof CoinTypes]
					? 1
					: -1
			)
			setCoinsList(sorted)
			setSort('DSC')
		}
	}

	return (
		<Container>
			<h1 className='text-center text-white mt-5'>
				Coding Challenge - Cryptocurrency
			</h1>
			<input
				type='text'
				className='form-control text-white mt-4'
				placeholder='Search your favourite coins'
				style={{ backgroundColor: 'transparent' }}
				onChange={onSearchChange}
			></input>
			<Table responsive className='mt-2'>
				<thead style={{ backgroundColor: '#eb6864' }}>
					<tr className='text-white '>
						<th>Coin Name</th>
						<th>Coin Symbol</th>
						<th>Coin Logo</th>
						<th
							onClick={() => handleSort('current_price')}
							style={{ cursor: 'pointer' }}
						>
							Current Price {sort === 'DSC' ? '▼' : '▲'}
						</th>
						<th
							onClick={() => handleSort('current_price')}
							style={{ cursor: 'pointer' }}
						>
							Total Market Cap {sort === 'DSC' ? '▼' : '▲'}
						</th>
						<th
							onClick={() => handleSort('current_price')}
							style={{ cursor: 'pointer' }}
						>
							{' '}
							Price Changes in 24h {sort === 'DSC' ? '▼' : '▲'}
						</th>
					</tr>
				</thead>
				<tbody>
					{coinsList
						.filter((c) => c.name.toLocaleLowerCase().includes(search))
						.map((coin) => (
							<tr
								className='text-white'
								key={coin.id}
								style={{ cursor: 'pointer' }}
								onClick={() => history.push(`/single-coin/${coin.id}`)}
							>
								<td className='py-4 fw-bold'>{coin.name.toUpperCase()}</td>

								<td className='py-4 fw-bold'>{coin.symbol.toUpperCase()}</td>

								<td className='py-3'>
									<img src={coin.image} height='50px' className='me-2' />{' '}
								</td>

								<td className='py-4'>$ {coin.current_price}</td>

								<td className='py-4'>$ {coin.market_cap}</td>
								<td
									className='py-4'
									style={{
										color: coin.price_change_24h > 0 ? 'green' : 'red',
										fontWeight: 500,
									}}
								>
									{coin.price_change_24h > 0 && '+'}
									{coin.price_change_24h}
								</td>
							</tr>
						))}
				</tbody>
			</Table>
		</Container>
	)
}

export default CoinsList
