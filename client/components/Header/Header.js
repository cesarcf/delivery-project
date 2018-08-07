import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import socketio from 'socket.io-client'
import logo from './logo.jpg'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { signOut } from 'actions/auth'
import { fetchCountries } from 'actions/countries'
import { setStatusToOrder } from 'actions/orders'
import _ from 'lodash'


class Header extends Component {

	state = {
		toogleAccount: false
	}

	onClickLogout = (event) => {
		event.preventDefault()
		this.props.signOut(this.props.history)
	}

	renderButtons = (authenticated) => {

		if (authenticated) {
			return (
				<Fragment>
				<li>
					<p><span className="icon-awesome-dashboard"></span>Go to my account!</p>
					<Link to={{ pathname:'/dashboard' }}>Dashboard</Link>
				</li>
				<li>
					<p><span className="icon-awesome-sign-out"></span>Sign out of my account!</p>
					<Link to={{ pathname:'/' }} onClick={this.onClickLogout}>Logout</Link>
				</li>
				</Fragment>
			)
		} else {
			return (
				<Fragment>
					<li>
						<p><span className="icon-awesome-user"></span>Create an account!</p>
						<Link to={{ pathname:'/signup' }}>SignUp</Link>
					</li>
					<li>
						<p><span className="icon-awesome-sign-in"></span>Log in into your account!</p>
						<Link to={{ pathname:'/signin' }}>SignIn</Link>
					</li>
				</Fragment>
			)
		}

	}

	onToogleAccount = () => {
		this.setState(prevState => ({
			toogleAccount: !prevState.toogleAccount
		}));
	}


	render(){
		const { authenticated, user, setStatusToOrder } = this.props

		let socket = socketio()
		socket.on('NEW_STATUS', (data) => {
			setStatusToOrder(data.orderId, data.status)
		})

		return (
			<Fragment>
				<div className={`header`}>
					<div className='logo'>
						<Link to='/' className='links'><img src={logo} /></Link>
					</div>

					<div className='account' onClick={this.onToogleAccount} onMouseEnter={this.onToogleAccount} onMouseLeave={this.onToogleAccount}>
						<p className='account-user'>{authenticated && user ? `Bienvenido, ${user.firstName}` : 'Hola, Identificate!' }</p>
						<Link to='#' className={authenticated && user ? 'open' : 'close'}>MY ACCOUNT <span className="icon-awesome-caret-down"></span></Link>
						{
							this.state.toogleAccount &&
							<ul className='nav-links'>
								{this.renderButtons(authenticated)}
							</ul>
						}

					</div>

				</div>
			</Fragment>
		)
	}

	componentWillMount(){
		if (_.isEmpty(this.props.countries.byId) || _.size(this.props.countries.byId) == 0) {
			this.props.fetchCountries()
		}
	}

}

const mapStateToProps = (state) => {
	return {
		authenticated: state.auth.authenticated,
		user: state.auth.user,
		countries: state.countries
	}
}

export default compose(
	connect(mapStateToProps, { signOut, fetchCountries, setStatusToOrder })
)(withRouter(Header))


