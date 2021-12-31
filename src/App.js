import './App.css'
import axios from 'axios'
import React from 'react'
import './style.css'
import data from './data.json'

class App extends React.Component {
	state = {
		apiData: []
	}
	productNames = []

	async componentDidMount() {

	}

	async componentDidMount2() {
		return
		let API_URL = 'http://192.168.225.9:5000/'
		this.productNames = (await axios.get(`${API_URL}/getProductNames`)).data
		console.log(this.productNames)
		for (let productName of [this.productNames[0], this.productNames[1]]) {
			let _apiData = (await axios.get(`${API_URL}/getProductData/${productName}`)).data

			this.setState({
				apiData: [...this.state.apiData, _apiData]
			}, () => {
				console.log(this.state.apiData)
			})
		}
	}

	render() {
		return (
			<div className="App">
				<table className="tg">
					<thead>
						<tr>
							<th className="tg-baqh">Ürün</th>
							<th className="tg-baqh">Site</th>
							<th className="tg-baqh">Ürün Tam Ad</th>
							<th className="tg-baqh">Fiyat</th>
						</tr>
					</thead>
					<tbody>
						{
							data.map(_data => {
								let _product = _data[0]
								let _productName = _product.productName
								return _product.values.map(_site => {
									let _siteName = _site.siteName
									return _site.values.map(_productDetail => {
										let _productDesc = _productDetail.name
										let _productPrice = _productDetail.price
										console.log([_productName, _siteName, _productDesc, _productPrice])
										return (
											<>
												<tr>
													<td className="tg-baqh">{ _productName }</td>
													<td className="tg-baqh">{ _siteName }</td>
													<td className="tg-baqh">{ _productDesc }</td>
													<td className="tg-baqh">{ _productPrice }</td>
												</tr>
											</>
										)
									})
								})
							})
						}
					</tbody>
				</table>
			</div>
		)
	}
}

export default App
