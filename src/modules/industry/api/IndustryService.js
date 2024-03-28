import BaseAPI from 'api/BaseAPI'

const esiPath = 'https://esi.evetech.net/latest'
// const src = 'datasource=tranquility'

class IndustryService extends BaseAPI {
  getSomething() {
    const esiUrl = `${esiPath}/...`
    return this.call({
      method: 'get',
      url: esiUrl,
    })
  }
}

export default new IndustryService()
