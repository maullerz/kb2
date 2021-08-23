import BaseAPI from 'api/BaseAPI'

const esiPath = 'https://esi.evetech.net/latest'
const src = 'datasource=tranquility'

const TARY_NIGHT_ID = 92316178
const JZ_LOCATION = 1031787606461

class MarketService extends BaseAPI {
  getCharMarketOrders() {
    const token = localStorage.getItem('access_token')
    const esiUrl = `${esiPath}/characters/${TARY_NIGHT_ID}/orders/?${src}&token=${token}`
    return this.call({
      method: 'get',
      url: esiUrl,
    })
  }

  getStructureMarketOrders(page = 1) {
    const token = localStorage.getItem('access_token')
    const esiUrl = `${esiPath}/markets/structures/${JZ_LOCATION}/?${src}&page=${page}&token=${token}`
    return this.call({
      method: 'get',
      url: esiUrl,
    })
  }
}

export default new MarketService()
