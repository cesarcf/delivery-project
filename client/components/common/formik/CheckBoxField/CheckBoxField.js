import React, { Fragment } from 'react'
import classNames from 'classnames'


const CheckBoxField = ({ field, form, label, ...props }) => {

	return (
		<Fragment>
		<div className='checkbox'>
			<label className={classNames(props.disabled)}>
				<input
					{...field}
					{...props}
					type='checkbox'
					checked={field.value}
				/>
				<span>{label}</span>
			</label>
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

CheckBoxField.defaultProps = {
	disabled:''
}

export default CheckBoxField