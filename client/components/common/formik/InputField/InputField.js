import React, { Component, Fragment } from 'react'
import classNames from 'classnames'

const InputField = ({ field, form, ...props}) => {
	return (
		<Fragment>
		<div>
			<input
				type={props.type || 'text'}
				{...field}
				{...props}
				className={classNames('form-control', form.touched[field.name] && form.errors[field.name] && 'error')}
			/>
		</div>
		{
			form.touched[field.name] && form.errors[field.name] &&
			<div className='field-error'>
				<span className='error'>{form.errors[field.name]}</span>
			</div>
		}
		</Fragment>
	)
}


export default InputField