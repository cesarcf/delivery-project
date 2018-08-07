import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { signUp, cleanError } from 'actions/auth'
import { Formik, Field, Form} from 'formik'
import * as yup from 'yup'
import InputField from 'components/common/formik/InputField'
import SelectField from 'components/common/formik/SelectField'
import CheckBoxField from 'components/common/formik/CheckBoxField'
import classNames from 'classnames'



const SignUp = (props) => {

		return (
			<div className='signup'>
				<h2>Create an account</h2>
				<Formik
					enableReinitialize={true}

					initialValues={{
						role: '',
						firstName: '',
						email: '',
						password: '',
						terminos: false
					}}

					validationSchema={yup.object().shape({
						role: yup.string().required('You have to select an option'),
						firstName : yup.string().required('Name is Required'),
						email: yup.string().email('Invalid Email format').required('Email is Required'),
						password: yup.string().min(6,'Min 6 characters').max(12, 'Max 12 characters').required('Password is Required'),
						terminos: yup.boolean().oneOf([true], 'You have to accept the Use and Privacy Policy').required('This field is Required')
					})}

					onSubmit={(values, { resetForm, setErrors, setSubmitting }) => {
						props.signUp(values, props.history)
							.then(() => {
								resetForm()
								setSubmitting(false)
							})
							.catch(arrayErrors => {
								const errors = arrayErrors.reduce((previus, error) => ({ ...previus, ...error }), {})
								setErrors(errors)
								setSubmitting(false)
							})
					}}

					render={({ isSubmitting, dirty, values }) => (
						<Form>
							<Field component={SelectField} name='role'>
								<option value=''>Select an option...</option>
								<option value='SHIPPER'>SHIPPER</option>
								<option value='CARRIER'>CARRIER</option>
								{/* <option value='MANAGER'>MANAGER</option> */}
							</Field>
							<Field component={InputField} name='firstName' placeholder='Nombre' />
							<Field component={InputField} name='email' placeholder='Email' />
							<Field component={InputField} name='password' type='password' placeholder='Password' />
							<Field component={CheckBoxField} name='terminos' label='Acepto Uso y Politica de Privacidad' />
							<button type='submit' className={classNames('btn-primary', 'btn-block')} disabled={!dirty || isSubmitting }>Submit!</button>
							{ props.errorMessage &&
								<div className='form-error' onClick={ props.cleanError }>
									<span className='error'>{props.errorMessage}</span>
								</div>
							}
						</Form>
					)}
				/>
			</div>
		)


}


const mapStateToProps = ({ auth: { errorMessage } }) => {
	return {
		errorMessage
	}
}

export default compose(
	connect(mapStateToProps, { signUp, cleanError })
)(SignUp)
