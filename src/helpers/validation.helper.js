import i18n from './i18n.helper'
export const rules = {
  required:  v => !!v || i18n.getMessage('REQUIRED'),
  fieldRequired: field => v => !!v || i18n.getMessage('FIELD_REQUIRED', [field]),
  seed: v => /^\w{64}$/.test(v) || i18n.getMessage('INVALID_SEED'),
}


export function isSeed(seed) {
  let isSeed = rules.seed(seed)
  if (isSeed === true) {
   return true
  }
  return false
}
