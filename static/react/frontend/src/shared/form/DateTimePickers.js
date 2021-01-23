import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { useField } from 'formik'
import { Form } from 'react-bootstrap'
import { defaultDateFnsLocale } from '../../i18n'
import { isValid as isDateValid, parse } from 'date-fns'
import { useFormField } from '../utils'

const Base = ({ name, placeholder, dateFormat, ...rest }) => {
  const [{ value }, , { setTouched, setValue }] = useField({ name, ...rest })
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

export const DatePicker = props =>
  <Form.Control as={Base}
                dateFormat="PP"
                {...props}/>

export const DateTimePicker = props =>
  <Form.Control as={Base}
                showTimeSelect
                dateFormat="PPp"
                {...props}/>

const RangePicker = ({ pickerType, name, ...rest }) => {
  const Picker = pickerType
  const [{ value: startDate }] = useField({ name: `${name}From` })
  const [{ value: endDate }] = useField({ name: `${name}To` })

  return <>
    <div className="d-flex">
      <Picker name={`${name}From`}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              {...rest}/>
      <span style={{ paddingTop: 6 }}>&nbsp;&ndash;&nbsp;</span>
      <Picker name={`${name}To`}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              {...rest}/>
    </div>
  </>
}

export const DateRangePicker = props =>
  <RangePicker pickerType={DatePicker} {...props}/>

export const DateTimeRangePicker = props =>
  <RangePicker pickerType={DateTimePicker} {...props}/>
