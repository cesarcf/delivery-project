import React, { Component, Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'

import { getUsers, getCarriers, getShippers } from 'selectors/users'
import { getOrders } from 'selectors/orders'
import { assignCarrierToOrder } from 'actions/orders'
import Shipment from 'components/Shipment'
import Discount from 'components/Discount'

import _ from 'lodash'

class Dashboard extends Component {


	renderCarriers = (order) => {
		const { carriers, assignCarrierToOrder } = this.props
		const carrier = carriers[order.carrierId]

		return (
			<select onChange={ (event) => assignCarrierToOrder(order._id, event.target.value) }>
				<option value=''>Assign a Carrier...</option>
				{
					_.map(carriers, carrier => (
						<option key={carrier._id} value={carrier._id} selected={ carrier._id == order.carrierId ? 'selected' : '' }>{carrier.firstName}</option>
					))
				}
			</select>
		)
	}


	render(){
		const { user, orders, shippers } = this.props
		if(!user || !orders || !shippers) return <div />

		return (
			<div className='dashboard'>
				<div className='customers-container'>
				{
					_.map(shippers, shipper => (
						<div className='customer'>
							<p>{ `Customer: ${shipper.firstName}` }</p>

							<div className='customer-orders'>
							{ shipper.orders.map(orderId => {
								let order = orders[orderId]

								if(user.role == 'CARRIER' && order.carrierId != user._id){
									return null
								}

								return (
									<div className='order'>
										<div className='order-data'>{`Order: ${order._id} Type: ${order.type} - Status: ${order.status}`}</div>
										{ user.role == 'MANAGER' && <div className='order-carrier'>{this.renderCarriers(order)}</div> }
										<div className='order-shipments'>
											<h6>Shipments:</h6>
											<div className='shipments'>
											{order.shipments.map(shipmentId => (
												<Shipment shipmentId={shipmentId} />
											))}
											</div>
										</div>


										<h6>Price:</h6>
										<div className='order-price'>{order.price || 0}€</div>
										{user.role == 'MANAGER' && <Discount orderId={order._id} />}
									</div>
								)
							})}
							</div>

						</div>
					))

				}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		orders: getOrders(state),
		carriers: getCarriers(state),
		shippers: getShippers(state)

	}
}

export default compose(
	connect(mapStateToProps, {assignCarrierToOrder})
)(Dashboard)


