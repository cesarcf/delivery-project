import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


export default (ChildComponent) => {

	class RequireAuth extends Component {

		shouldNavigateAway = () => {
			if(!this.props.authenticated){
				this.props.history.push('/signin')
			}
		}

		render(){
			return <ChildComponent {...this.props} />
		}

		componentWillMount(){
			this.shouldNavigateAway()
		}


		componentDidMount(){
			this.shouldNavigateAway()
		}

		componentDidUpdate(prevProps, prevState){
			this.shouldNavigateAway()
		}

	}


	function mapStateToProps({ auth }){
		return { authenticated: auth.authenticated }
	}

	return connect(mapStateToProps)(RequireAuth)
}