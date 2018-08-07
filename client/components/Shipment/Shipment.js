import React, { Component, Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getShipments } from 'selectors/shipments'
import { getItems } from 'selectors/items'
import { getCountries } from 'selectors/countries'
import { getProvinces } from 'selectors/provinces'
import { setRouteDates } from 'actions/shipments'

class Shipment extends Component {

	render(){
		const { shipmentId, shipments, items, countries, provinces, setRouteDates } = this.props
		const shipment = shipments[shipmentId]

		return (
			<div className='shipment'>
				<div className='shipment-route'>
					<span>{`Shipment ID: ${shipmentId}`}</span><br />
					<span>Route: </span>
					<span className="icon-awesome-dot-circle-o"></span>{` ${shipment.pickUpAddress.street}, ${shipment.pickUpAddress.city } (${countries[shipment.pickUpAddress.countryId].isoA2}) ---> `}
					<span className="icon-awesome-map-marker"></span>{` ${shipment.deliveryAddress.street}, ${shipment.deliveryAddress.city } (${countries[shipment.deliveryAddress.countryId].isoA2})`}
				</div>
				<div className='shipment-timers'>
					{ shipment.pickUpAt ? `PickUpAt: ${shipment.pickUpAt}` : <button onClick={ () => setRouteDates(shipment, 'PICKED_UP') }>PickUp</button> }
					 ----
					{ shipment.deliveredAt ? `DeliveredAt: ${shipment.deliveredAt}` : <button onClick={ () => setRouteDates(shipment, 'DELIVERED') }>Delivered</button> }
				</div>
				<div className='shipment-cargo'>
					<span><b>Cargo:</b></span>
					{
						shipment.cargo.map(itemId => (
							<div className='cargo'>{`- ${items[itemId].type} - ${items[itemId].quantity}units x ${items[itemId].weight}kg`}</div>
						))
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		shipments: getShipments(state),
		items: getItems(state),
		countries: getCountries(state),
		provinces: getProvinces(state)
	}
}

export default compose(
	connect(mapStateToProps, { setRouteDates })
)(Shipment)
