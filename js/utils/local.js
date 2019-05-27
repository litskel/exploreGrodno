import { nope } from '../utils/index.js'

const cache = {}
const storage = window.localStorage
const parse = s => s ? JSON.parse(s) : undefined
const service = {
  get: (key) => cache[key] || (cache[key] = parse(storage.getItem(key))),
  assign: (delta, cb = nope) => {
    for (let key in delta) {
      const val = delta[key] || null
      cache[key] = val
      storage.setItem(key, JSON.stringify(val))
    }
    cb()
  },
  toggleItemProperty(key, item, cb) {
    return service.transform(key, (items = {}) => {
      if (items[item.id]) {
        delete items[item.id]
      } else {
        items[item.id] = item
      }
      return items
    }, cb)
  },
  toggleArrayElement(key, item, cb) {
    return service.transform(key, (items = []) => {
      const elt = items.find(e => e.id === item.id)
      return elt ? items.reduce((r, e) => e === elt ? r : r.concat([e]), []) : items.concat([item])
    }, cb)
  },
  arrangeArrayElement(key, id, dir, cb) {
    return service.transform(key, (items = []) => {
      const index = items.indexOf(items.find(e => e.id == id))
      if (index > -1) {
        const from = index + (dir === 'up' ? -1 : 1)
        if (from >= 0 && from < items.length) {
          const r = items[index];
          items[index] = items[from]
          items[from] = r
        }
      }
      return items;
    }, cb)
  },
  transform(key, fn, cb) {
    const e = service.get(key)
    return service.assign({ [key]: fn(e) }, cb)
  }
}

export default service;