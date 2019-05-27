import { humanize, pipes, capitalize, grodnify } from './utils/index.js'
import R from './meta.js'
import { urlStringify } from './utils/url.js';
import localStore from './utils/local.js';

/**
 * The Application class.
 */
export class Application {
  TEMPLATE() {
    return /* html */`<ui:mode/>`
  }
  get mode() {
    return window.location.href.includes('admin') ? 'AdminApp' : 'ClientApp'
  }

  pipes = pipes

  // observers
  subscribers = new Set();
  notify = () => this.subscribers.forEach(fn => fn());

  // emit actions from "-> url"
  emit(key, data) {
    const method = this['on' + capitalize(key)] || ((x) => {
      console.error('Not found', x);
    });
    const r = method.call(this, data);
    if (r && r.then) {
      r.then(this.notify, err => window.console.error(err));
    } else {
      this.notify();
    }
  }
  // data access from "<- url"
  fetch(key, cb) {
    const fn = () => this.load(key, cb);
    fn();
    this.subscribers.add(fn);
    return () => {
      this.subscribers.delete(fn);
    };
  }

  // resolves resources from ":key"
  resource(key, def) {
    const all = window.meta ? window.meta.result : R.result || {};
    return all[key] || def || (all[key] = humanize(key))
  }

  load(key, cb) {
    const method = this['get' + capitalize(key)] || notFoundMethod;
    const val = method.call(this);
    if (val && val.then) {
      val.then(r => cb(null, r), cb);
    } else {
      cb(null, val);
    }
  }

  getRoutes() {
    return this._routes || (this._routes = this.resource('routes').map(e => ({
      ...e,
      id: '' + e.id,
      title: '' + e.title,
      places: e.places.split(','),
      photo: e.photo || 'assets/placeholder.png',
      link: e.link || '//google.com/search?q=' + grodnify(e.title)
    })))
  }
  getPlaces() {
    // adapt and memoize
    return this._places || (this._places = this.resource('places').map(e => ({
      ...e,
      id: '' + e.id,
      title: '' + e.title,
      tags: [e.tags, e.tags2, e.tags3].filter(Boolean),
      photo: e.photo || 'assets/placeholder.png',
      link: e.link || '//google.com/search?q=' + grodnify(e.title)
    })))
  }

  onToggleTag(tag, cb) {
    return localStore.toggleItemProperty('selectedTags', tag, cb)
  }

  onSelectRoute(data, cb) {
    return localStore.assign({
      selectedRoute: data,
      'selectedPlaces': data.places.map(id => ({ id }))
    }, cb)
  }

  onTogglePlace(data, cb) {
    return localStore.toggleArrayElement('selectedPlaces', data, cb)
  }

  onArrangePlace({ id, dir }, cb) {
    return localStore.arrangeArrayElement('selectedPlaces', id, dir, cb)
  }

  getSelectedRoute() {
    return localStore.get('selectedRoute') || this.getRoutes()[0] || {}
  }

  getSelectedPlaces() {
    const places = this.getPlaces();
    const selectedPlaces = localStore.get('selectedPlaces') || []
    return selectedPlaces.map(({ id }) => places.find(e => e.id === id)).filter(Boolean)
  }

  getSelectedPlacesIds() {
    const selectedPlaces = localStore.get('selectedPlaces') || []
    return selectedPlaces.map(({ id }) => id).join(',')
  }

  getSuggestedPhoto() {
    const places = this.getPlaces();
    const selectedPlaces = localStore.get('selectedPlaces') || []
    const fisrt = selectedPlaces.map(({ id }) => places.find(e => e.id === id))[0];
    return fisrt ? fisrt.photo : 'https://postim.by/post_photo/19370/xbfblucF1518108503.jpg';
  }

  getFilteredPlaces() {
    const selectedTags = localStore.get('selectedTags') || {}
    const selectedPlaces = localStore.get('selectedPlaces') || []
    const selectionIds = Object.keys(selectedTags)
    const places = this.getPlaces();
    const filtered = !selectionIds.length ? places : places
      .filter(e => selectionIds.reduce((r, tag) => r && e.tags.includes(tag), true))

    return filtered.map(e => ({
      ...e,
      selected: selectedPlaces.some(ee => ee.id === e.id)
    }))
  }
  getFilteredTags() {
    const selectedTags = localStore.get('selectedTags') || {}
    return Object.values(this.getFilteredPlaces().reduce((tags, e) => {
      e.tags.forEach(t => {
        if (!tags[t]) {
          tags[t] = {
            id: t,
            name: t,
            selected: !!selectedTags[t],
            count: 0
          }
        }
        tags[t].count++;
      })

      return tags
    }, {}))
  }
  getRouteMapUrl() {
    const places = this.getSelectedPlaces();
    const count = places.length
    return urlStringify({
      target: 'https://www.google.com/maps/embed/v1/directions',
      params: {
        mode: 'walking',
        origin: grodnify(count > 0 ? places[0].address : 'Драматический театр'),
        destination: grodnify(count > 1 ? places[count - 1].address : 'Жилибера парк'),
        waypoints: count > 2 ? `${(places.slice(1, count - 1) || []).map(({ address }) => grodnify(address)).join('|')}` || null : null,
        key: `AIzaSyBqTz8FtKj2ghZxmxNnJVicYCpcuHUNRiM`
      }
    })
  }

}