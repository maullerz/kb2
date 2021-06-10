import BaseAPI from './BaseAPI'

class KillmailService extends BaseAPI {
  getKillmails(params) {
    return this.call({
      method: 'post',
      url: '/v1/killmails',
      data: {
        ...params,
        isLosses: params.isLosses || undefined,
        isKills: params.isKills || undefined,
        page: params.page === 1 ? undefined : params.page,
      },
    })
  }

  getStats(params) {
    return this.call({
      method: 'post',
      url: '/v1/stats',
      data: {
        ...params,
      },
    })
  }

  getSingleKillmail(killmailId) {
    return this.call({
      method: 'get',
      url: `/v1/killmails/${killmailId}`,
    })
  }

  getAutocomplete(text) {
    return this.call({
      method: 'get',
      url: `/v1/search/kb/autocomplete/${text}`,
    })
  }
}

export default new KillmailService()
