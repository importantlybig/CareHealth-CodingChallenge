import React, { useState, useEffect } from 'react'
import { Coin } from '../api/coin'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Container, Spinner } from 'react-bootstrap'

interface ParamType {
	id: string
}

const SingleCoin: React.FC = () => {
	const { id } = useParams<ParamType>()
	const [singleCoin, setSingleCoin] = useState<any>([])

	const fetchSingleCoin = async () => {
		const { data } = await axios.get(Coin(id))

		setSingleCoin(data)
	}

	useEffect(() => {
		fetchSingleCoin()
	}, [])

	if (!singleCoin)
		return (
			<div className='text-center'>
				<Spinner animation='border' variant='primary' />
			</div>
		)

	return (
		<Container>
			<div className='text-center d-flex min-vh-100 align-items-center justify-content-center'>
				<img src={singleCoin?.image?.large} alt={singleCoin?.name} />
				<div className='ms-3'>
					<h4 className='fw-bold text-white mt-3'>Name: {singleCoin?.name}</h4>
					<h4 className='fw-bold text-white'>
						Category: {singleCoin?.categories?.[0]}
					</h4>
					<h4 className='fw-bold text-white'>
						Rank in Market Cap: {singleCoin?.market_cap_rank}
					</h4>
					<h4 className='fw-bold text-white'>
						Current Price: $ {singleCoin?.market_data?.current_price?.usd}
					</h4>
					<h4 className='fw-bold text-white'>
						Market Cap: $ {singleCoin?.market_data?.market_cap?.usd}
					</h4>
				</div>
			</div>
		</Container>
	)
}

export default SingleCoin
