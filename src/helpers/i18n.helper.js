export default class I18nHelper {
  static getMessage(key, fields){
    if(!chrome || !chrome.i18n) return key
    return chrome.i18n.getMessage(key, fields)
  }
}
