import React, { Component, Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import Header from 'components/Header'
import Dashboard from 'components/Dashboard'
import SignUp from 'components/auth/SignUp'
import SignIn from 'components/auth/SignIn'
import requireAuth from 'components/hoc/requireAuth'
import redirectDashboard from 'components/hoc/redirectDashboard'


import '../css/main.styl'

class App extends Component {
	render(){
		return (
			<Fragment>
				<Header />
				<Route path='/signin' component={redirectDashboard(SignIn)} />
				<Route path='/signup' component={redirectDashboard(SignUp)} />
				<Route path='/dashboard' component={requireAuth(Dashboard)} />
			</Fragment>
		)
	}
}


export default App
