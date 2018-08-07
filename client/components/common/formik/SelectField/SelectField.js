import React, { Fragment } from 'react'
import classNames from 'classnames'

const SelectField = ({ field, form, ...props}) => {

	return (
		<Fragment>
		<div>
			<select
				{...field}
				{...props}
				className={classNames('form-control', form.touched[field.name] && form.errors[field.name] && 'error')}
			>
			{props.children}
			</select>
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


export default SelectField