const SEED_KEY = 'SEEDS'
const SHELL_KEY = 'SHELLS'
export default class SyncStorage {
  async get(key) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get([key], (item) => {
        resolve(item[key])
      })
    })
  }

  async set(obj) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set(obj, function () {
        resolve(true)
      })
    })
  }

  async setSeed(n, {seed, tags}) {
    let seeds = await this.getSeed()
    seeds[n] = {seed, tags}

    let obj = {}
    obj[SEED_KEY] = seeds
    return await this.set(obj)
  }

  async addSeed({seed, tags}) {
    let seeds = await this.getSeed()
    const index = seeds.findIndex(x => x.seed === seed)
    if (~index) {
      seeds[index] = {seed, tags}
    } else {
      seeds.push({seed, tags})
    }

    let obj = {}
    obj[SEED_KEY] = seeds
    return await this.set(obj)
  }

  async getSeed() {
    return await this.get(SEED_KEY) || []
  }

  async removeSeedOfIndex(n) {
    let seeds = await this.getSeed()

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

  async setShell(n, {name, serverAddr, identifier, seed, tags}) {
    let shells = await this.getShell()
    shells[n] = ({name, serverAddr, identifier, seed, tags})
    let obj = {}
    obj[SHELL_KEY] = shells
    return await this.set(obj)
  }
  async addShell({name, serverAddr, identifier, seed, tags}) {
    let shells = await this.getShell()
    shells.push({name, serverAddr, identifier, seed, tags})
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
