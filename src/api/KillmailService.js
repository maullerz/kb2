import BaseAPI from './BaseAPI'

class KillmailService extends BaseAPI {
  getKillmails() {
    return this.call({
      method: 'get',
      url: '/v1/killmails',
    })
  }

  getKillmailsSkip(skipCount) {
    return this.call({
      method: 'get',
      url: `/v1/killmails/skip/${skipCount}`,
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
