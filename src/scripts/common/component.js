/**
 * Component
 */

import { $, $$ } from './dom'

export default class Component {
  getElement (ele) {
    if (typeof ele === 'string') {
      return $(ele)
    }
    return ele
  }

  getElements (ele) {
    if (typeof ele === 'string') {
      return $$(ele)
    }
    return ele
  }

  merge (def, opts) {
    this.opts = Object.assign({}, def, opts)
  }
}
