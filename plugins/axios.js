import * as axios from 'axios'

let options = {}
// The server-side needs a full url to works
if (process.server) {
  options.baseURL = `${process.env.HOST || 'http://localhost'}:${process.env.PORT || 3000}`
}

export default axios.create(options)
