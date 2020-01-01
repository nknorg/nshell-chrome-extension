const SEED_KEY = 'SEEDS'

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

  async setSeed(seed, tags) {
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

  async removeSeedOfIndex(n){
    let seeds = await this.getSeed()

    if (n > -1) {
      seeds.splice(n, 1)
    }
    let obj = {}
    obj[SEED_KEY] = seeds
    return await this.set(obj)
  }

}
