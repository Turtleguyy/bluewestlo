import { helper } from '@ember/component/helper'

export function numberShortener(number) {
  number = parseInt(number, 10)
  if (isNaN(number)) return

  if (number > 1000000) {
    return `${round((number / 1000000), 1)}M`
  } else if (number > 1000) {
    return `${round((number / 1000), 1)}K`
  } else {
    return `${number}`
  }
}

function round(value, precision) {
  let multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export default helper(numberShortener)
