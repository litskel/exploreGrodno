import * as elements from './elements.js'
import * as fields from './fields.js'
import { Form } from './Form.js'
import { Modal } from './Modal.js'

const toList = o => Object.keys(o).map(k => typeof o[k] === 'function' ? o[k] : { NAME: k, TEMPLATE: o[k] })

export default [
  ...toList({
    Form,
    Modal
  }),
  ...toList(elements),
  ...toList(fields),
]