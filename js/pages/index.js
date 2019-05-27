import * as client from './client.js'
import * as commons from './commons.js'
import * as admin from './admin.js'

const toList = o => Object.keys(o).map(k => typeof o[k] === 'function' ? o[k] : { NAME: k, TEMPLATE: o[k] })

export default [
  ...toList(commons),
  ...toList(client),
  ...toList(admin)
]
