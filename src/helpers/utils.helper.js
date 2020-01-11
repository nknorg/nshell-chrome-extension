export function parseKeystore(json) {
  try {
    let keystore = JSON.parse(json)
    return keystore
  } catch (e) {
    return undefined
  }
}
