import { format, parseISO } from 'date-fns'
import { cs, de } from 'date-fns/locale'
import { setLocale as yupSetLocale } from 'yup'
import { registerLocale } from 'react-datepicker'

registerLocale('de', de)
registerLocale('cs', cs)
// setDefaultLocale('cs') - bug in 'react-datepicker' when deleting the value
export const defaultDateFnsLocale = cs

yupSetLocale({
  mixed: {
    required: 'Required.'
  },
  date: {
    min: ({ min }) => `Should be after ${formatDateTime(min)}.`,
    max: ({ max }) => `Should be before ${formatDateTime(max)}.`
  }
})

export const formatTemporal = (value, formatStr) => {
  if (value) {
    if (typeof value === 'string') {
      value = parseISO(value)
    }
    return format(value, formatStr, { locale: defaultDateFnsLocale })
  }
  return null
}
export const formatDate = value => formatTemporal(value, 'PP')
export const formatDateTime = value => formatTemporal(value, 'PPp')
