import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { useField } from 'formik'
import { Form } from 'react-bootstrap'
import { defaultDateFnsLocale } from '../../i18n'
import { isValid as isDateValid, parse } from 'date-fns'
import { useFormField } from '../utils'

const Base = ({ name, value, placeholder, dateFormat, ...rest }) => {
  const [, , { setTouched, setValue }] = useField({ name, ...rest })
  const { isInvalid } = useFormField(name)

  const handleChange = newValue => {
    if (value !== newValue) {
      setValue(newValue)
    }
  }

  const handleOnBlur = async event => {
    const { value } = event.target
    const date = parse(value, dateFormat, new Date(), { locale: defaultDateFnsLocale })
    if (isDateValid(date)) {
      await setValue(date)
    }
    setTouched()
  }

  return <>
    <div className={isInvalid ? 'is-invalid' : ''}>
      <ReactDatePicker
        dateFormat={dateFormat}
        name={name}
        {...rest}
        selected={(value !== null && value !== undefined && value !== '') ? new Date(value) : null}
        onChange={handleChange}
        locale={defaultDateFnsLocale}
        placeholderText={placeholder}
        onBlur={handleOnBlur}
      />
    </div>
  </>
}

export const DatePicker = ({ ...rest }) =>
  <Form.Control as={Base}
                dateFormat="PP"
                {...rest}/>

export const DateTimePicker = ({ ...rest }) =>
  <Form.Control as={Base}
                showTimeSelect
                dateFormat="PPp"
                {...rest}/>
