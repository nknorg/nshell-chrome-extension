const SEED_KEY = 'SEEDS'
const SHELL_KEY = 'SHELLS'

export default class SyncStorage {
  async get(key) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([key], (item) => {
        resolve(item[key])
      })
    })
  }

  async set(obj) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set(obj, function () {
        resolve(true)
      })
    })
  }

  async setSeed(n, {seed, keystore, tags}) {
    let seeds = await this.getSeeds()
    seeds[n] = {seed, keystore, tags}

    let obj = {}
    obj[SEED_KEY] = seeds
    return await this.set(obj)
  }

  async addSeed({seed, keystore, tags}) {
    let seeds = await this.getSeeds()
    seeds.push({seed, keystore, tags})

    let obj = {}
    obj[SEED_KEY] = seeds
    return await this.set(obj)
  }

  async getSeeds() {
    return await this.get(SEED_KEY) || []
  }

  async removeSeedOfIndex(n) {
    let seeds = await this.getSeeds()

    if (n > -1) {
      seeds.splice(n, 1)
    }
    let obj = {}
    obj[SEED_KEY] = seeds
    return await this.set(obj)
  }

  async getShell() {
    return await this.get(SHELL_KEY) || []
  }

  async setShell(n, {name, remoteAddr, identifier, seed, keystore, tags}) {
    let shells = await this.getShell()
    shells[n] = ({name, remoteAddr, identifier, seed, keystore, tags})
    let obj = {}
    obj[SHELL_KEY] = shells
    return await this.set(obj)
  }

  async addShell({name, remoteAddr, identifier, seed, keystore, tags}) {
    let shells = await this.getShell()
    shells.push({name, remoteAddr, identifier, seed, keystore, tags})
    let obj = {}
    obj[SHELL_KEY] = shells
    return await this.set(obj)
  }

  async removeShellOfIndex(n) {
    let shells = await this.getShell()

    if (n > -1) {
      shells.splice(n, 1)
    }
    let obj = {}
    obj[SHELL_KEY] = shells
    return await this.set(obj)
  }

}
