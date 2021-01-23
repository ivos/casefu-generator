import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Select } from 'react-functional-select'
import { Form } from 'react-bootstrap'
import { useField } from 'formik'
import { useMount, useMountedState } from 'react-use'
import { typingDebounceDelay } from '../../constants'
import { useFormField } from '../utils'

const Base = ({ id, name, isValidCustom, searchFn, getOptionValue, getOptionLabel, restoredValue, ...rest }) => {
  const selectRef = useRef(null)
  const isMounted = useMountedState()

  const [{ value }, , { setValue, setTouched }] = useField({ name, ...rest })
  const { isValid: isValidComputed, isInvalid } = useFormField(name)
  const isValid = isValidCustom === undefined ? isValidComputed : isValidCustom

  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState([])

  const handleInputChange = useCallback(() => {
    setIsLoading(true)
  }, [])

  const handleSearchChange = useCallback(async query => {
    const data = await searchFn(query)
    if (isMounted()) {
      setOptions(data)
      setIsLoading(false)
    }
    return data
  }, [searchFn, isMounted])

  const handleOptionChange = useCallback(async option => {
    if (option === null) {
      option = ''
    }
    if (value !== option) {
      await setValue(option)
    }
  }, [value, setValue])

  const preload = async () => {
    const data = await searchFn('')
    if (isMounted()) {
      setOptions(data)
    }
  }

  useMount(() => {
    preload()
  })

  useEffect(() => {
    if (restoredValue !== null && restoredValue !== undefined) {
      selectRef.current.setValue(restoredValue)
    }
  })

  return <>
    <div className={isInvalid ? 'is-invalid' : ''}>
      <Select ref={selectRef}
              inputId={id}
              async
              isClearable
              inputDelay={typingDebounceDelay}
              options={options}
              initialValue={value}
              isLoading={isLoading}
              getOptionValue={getOptionValue}
              getOptionLabel={getOptionLabel}
              onInputChange={handleInputChange}
              onSearchChange={handleSearchChange}
              onOptionChange={handleOptionChange}
              onInputBlur={() => setTouched()}
              themeConfig={{
                color: {
                  border: isInvalid ? '#dc3545' : (isValid ? '#28a745' : '#ced4da')
                },
                control: {
                  boxShadowColor: isInvalid ? '#dc354540' : (isValid ? '#28a74540' : '#007bff40'),
                  focusedBorderColor: isInvalid ? '#dc3545' : (isValid ? '#28a745' : '#007bff')
                }
              }}
              name={name}
              {...rest}/>
    </div>
  </>
}

export default ({ isValid, ...rest }) =>
  <Form.Control as={Base}
                isValidCustom={isValid}
                {...rest}/>
