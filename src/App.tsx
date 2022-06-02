import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import CoinsList from './pages/CoinsList'
import SingleCoin from './pages/SingleCoin'

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Route path='/' component={CoinsList} exact></Route>
			<Route path='/single-coin/:id' component={SingleCoin} exact></Route>
		</BrowserRouter>
	)
}

export default App
