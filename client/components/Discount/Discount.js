import React, { Component, Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Formik, Field, Form } from 'formik'
import * as yup from 'yup'
import InputField from 'components/common/formik/InputField'
import CheckBoxField from 'components/common/formik/CheckBoxField'
import { setDiscountToOrder } from 'actions/orders'

class Discount extends Component {

	render(){
		const { orderId, setDiscountToOrder } = this.props
		let discount;

		return (
			<div className={classNames('order-discount')}>
				{
					discount
					?
						(
							//TODO
							<div className='discount-remove'>
								<button type='button' >Remove Discount</button>
							</div>
						)
					:
						(
							<Formik
								enableReinitialize={true}

								initialValues={{
									discount: '',
									percentage: false
								}}

								validationSchema={yup.object().shape({
									discount: yup.number().required(),
									percentage: yup.boolean()
								})}

								onSubmit={(values, { setErrors, resetForm, setSubmitting }) => {
									setDiscountToOrder(orderId, values.discount, values.percentage)
										.then(() => {
											resetForm()
											setSubmitting(false)
										})
								}}

								render={({ dirty, isSubmitting }) => (
									<Form>
										<Field component={InputField} name='discount' placeholder='Discount' />
										<Field component={CheckBoxField} name='percentage' label='is percentage (%)' />

										<button type='submit' disabled={!dirty || isSubmitting }>Add Discount!</button>
									</Form>
								)}
							/>
						)


				}
			</div>
		)
	}
}



export default compose(
	connect(null, {setDiscountToOrder})
)(Discount)
