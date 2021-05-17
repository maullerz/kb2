import BaseAPI from './BaseAPI'

class KillmailService extends BaseAPI {
  getKillmails(params) {
    return this.call({
      method: 'post',
      url: '/v1/killmails',
      data: {
        ...params,
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
}

export default new KillmailService()
