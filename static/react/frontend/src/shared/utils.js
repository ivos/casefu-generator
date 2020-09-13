import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import pickBy from 'lodash.pickby'
import qs from 'qs'
import { formatISO, parseISO } from 'date-fns'
import { useFormikContext } from 'formik'
import { usePrevious } from 'react-use'

export const identity = data => data

export const onEnter = fn => event => event.key === 'Enter' && fn()

const mapValues = (values, fn) =>
  Object.fromEntries(
    Object.entries(values)
      .map(([key, value]) => [key, fn(value)])
  )

export const nullValuesToEmpty = values =>
  mapValues(values, value => value === null || value === undefined ? '' : value)

export const emptyValuesToNulls = values =>
  mapValues(values, value => value === '' ? null : value)

const urlParamsPredicate = value => (value !== undefined && value !== '' && value !== false && value !== null)
export const toUrlParams = values => qs.stringify(pickBy(values, urlParamsPredicate))

export const useUrlParams = () => ({ ...qs.parse(useLocation().search.substring(1)) })

export const usePaging = () => {
  const [pagesCount, setPagesCount] = useState(1)
  const [isLastPage, setIsLastPage] = useState(false)

  const resetPages = () => {
    setPagesCount(1)
    setIsLastPage(false)
  }
  const loadNextPage = () => {
    setPagesCount(pagesCount + 1)
  }
  const setLastPage = () => {
    setIsLastPage(true)
  }

  return { pagesCount, isLastPage, loadNextPage, setLastPage, resetPages }
}

export const collapse = (entity, from, id, to) => {
  if (entity.hasOwnProperty(from)) {
    const result = { ...entity }
    const value = entity[from]
    result[to] = (typeof value === 'object' && value !== null) ? value[id] : null
    delete result[from]
    return result
  }
  return entity
}

export const restore = (entity, from, to, id) => {
  if (entity.hasOwnProperty(from)) {
    const result = { ...entity }
    const value = entity[from]
    result[to] = { [id]: value }
    delete result[from]
    return result
  }
  return entity
}

const transformAttributeValue = (attribute, values, fn) => {
  if (values.hasOwnProperty(attribute)) {
    return {
      ...values,
      [attribute]: values[attribute] ? fn(values[attribute]) : null
    }
  }
  return values
}

export const dateToApi = (attribute, values) =>
  transformAttributeValue(attribute, values, value => formatISO(value, { representation: 'date' }))
export const dateTimeToApi = (attribute, values) =>
  transformAttributeValue(attribute, values, value => formatISO(value))

export const temporalFromApi = (attribute, values) =>
  transformAttributeValue(attribute, values, parseISO)

export const useRestored = (urlParam, useGet) => {
  const urlParams = useUrlParams()
  const [isRestoring, setIsRestoring] = useState(true)

  const id = isRestoring ? urlParams[urlParam] : null
  const { data } = useGet(id)

  useEffect(() => {
    if (isRestoring) {
      setIsRestoring(false)
    }
  }, [isRestoring, setIsRestoring])

  return isRestoring ? data : null
}

export const useFormField = name => {
  const { touched, values, errors, status, submitCount } = useFormikContext()
  const blurred = touched[name]
  const error = errors[name]
  const serverError = status.serverErrors[name]
  const value = values[name]
  const submitted = submitCount > 0
  const prevValue = usePrevious(value)
  const changedValue = value !== prevValue && prevValue !== undefined
  const changed = changedValue || status.changed[name]

  const isValid = !!((changed || submitted) && !error && !serverError)
  const isInvalid = !!(((changed && blurred) || submitted) && (error || serverError))

  return { isValid, isInvalid, changedValue, serverError }
}
