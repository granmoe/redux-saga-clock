import superagent from 'superagent'

export class HTTP {
  static get (url, headers) {
    const request = superagent.get(url)

    for (let key in headers) {
      request.set(key, headers[key])
    }

    return this.__settleRequest(request)
  }

  static post (url, data, headers) {
    const request = superagent.post(url)
      .send(data)

    for (let key in headers) {
      request.set(key, headers[key])
    }

    return this.__settleRequest(request)
  }

  static __settleRequest (request) {
    return new Promise((resolve, reject) => {
      request.end((err, resp) => {
        if (err) {
          return reject(err.response)
        } else {
          return resolve(resp.body)
        }
      })
    })
  }

  static getAuthHeader (authType, token) {
    if (authType === 'anonymous') {
      return { AnonymousToken: token }
    }

    return { Authorization: `Bearer ${token}` }
  }
}
