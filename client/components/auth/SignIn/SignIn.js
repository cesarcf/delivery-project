import React, { Component, Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { signIn, cleanError } from 'actions/auth'
import { Formik, Field, Form } from 'formik'
import InputField from 'components/common/formik/InputField'
import classNames from 'classnames'
import * as yup from 'yup'

class SingIn extends Component {

	render(){
		return (
			<div className='login'>
				<h2>Access my Account</h2>
				<Formik
					enableReinitialize={true}

					initialValues={{
						email: '',
						password: ''
					}}

					validationSchema={yup.object().shape({
						email: yup.string().email('Invalid Email format').required('Email is required'),
						password: yup.string().min(6,'Min 6 characters').max(12, 'Max 12 characters').required('Password is required'),
					})}

					onSubmit={(values, { setErrors, resetForm, setSubmitting }) => {
						this.props.signIn(values, this.props.history)
						setSubmitting(false)
					}}

					render={({ dirty, isSubmitting }) => (
						<Form>
							<Field component={InputField} name='email' placeholder='Email' />
							<Field component={InputField} name='password' type='password' placeholder='Password' />
							<button type='submit' className={classNames('btn-primary', 'btn-block')} disabled={!dirty || isSubmitting }>Submit!</button>
							{ this.props.errorMessage &&
							<div className='form-error' onClick={ this.props.cleanError }>
								<span className='error'>{this.props.errorMessage}</span>
							</div> }
						</Form>
					)}

				/>

			</div>
		)
	}

}



const mapStateToProps = ({ auth: { errorMessage } }) => {
	return {
		errorMessage
	}
}


export default compose(
	connect(mapStateToProps, { signIn, cleanError })
)(SingIn)
