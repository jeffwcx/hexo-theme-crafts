/**
 * Mask
 */

import { addClass, removeClass } from '../common/dom'

let TRANSITIONEND = 'transitionend'

if (window.ontransitionend === undefined &&
  window.onwebkittransitionend !== undefined) {
  TRANSITIONEND = 'webkitTransitionEnd'
}

const Mask = {
  el: null,
  transition: {
    unactive: 'mask',
    active: 'is-mask-active',
    toActive: 'is-mask-visible',
    toUnactive: 'is-mask-unvisible'
  },
  state: 'unactive',
  openStack: {},
  closeStack: {},
  _init () {
    this.openStack.count = 0
    this.openStack.cbs = {}
    this.closeStack.count = 0
    this.closeStack.cbs = {}
  },
  open () {
    if (!this.el) {
      this.el = document.createElement('div')
      this.el.className = this.transition.unactive
      this.state = 'unactive'
      document.body.appendChild(this.el)
      this.el.addEventListener('click', () => {
        this.close()
      }, false)
    }
    Object.keys(this.openStack.cbs).forEach((id) => {
      this.openStack.cbs[id]()
    })
    addClass(this.el, this.transition.active)
    setTimeout(() => {
      addClass(this.el, this.transition.toActive)
    }, 0)
    return this
  },

  onopen (cb) {
    this.openStack.count += 1
    this.openStack.cbs[this.openStack.count] = cb
    return this.openStack.count
  },

  close () {
    if (!this.el) return
    Object.keys(this.closeStack.cbs).forEach((id) => {
      this.closeStack.cbs[id]()
    })
    const t = this
    function onEnd () {
      t._transitionEnd()
      this.removeEventListener(TRANSITIONEND, onEnd)
    }
    removeClass(this.el, this.transition.toActive)
    this.el.addEventListener(TRANSITIONEND, onEnd)
    addClass(this.el, this.transition.toUnactive)
    this.state = 'toUnactive'
    return this
  },

  onclose (cb) {
    this.closeStack.count += 1
    this.closeStack.cbs[this.closeStack.count] = cb
    return this.closeStack.count
  },

  _transitionEnd () {
    removeClass(this.el, this.transition.active)
    removeClass(this.el, this.transition.toUnactive)
    this.state = 'unactive'
  }
}

Mask._init()

export default Mask
