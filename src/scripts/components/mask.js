/**
 * Mask
 */

import { addClass, removeClass } from '../common/dom'

let TRANSITIONEND = 'transitionend'

if (window.ontransitionend === undefined &&
  window.onwebkittransitionend !== undefined) {
  TRANSITIONEND = 'webkitTransitionEnd'
}

const UNACTIVE = 0
const TOACTIVE = 1
const ACTIVE = 2
const TOUNACTIVE = 3

const Mask = {
  el: null,
  transition: {
    unactive: 'mask',
    active: 'is-mask-active',
    toActive: 'is-mask-visible',
    toUnactive: 'is-mask-unvisible'
  },
  state: UNACTIVE,
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
      document.body.appendChild(this.el)
      this.el.addEventListener('click', () => {
        this.close()
      }, false)
      window.addEventListener('keydown', (evt) => {
        if (evt.keyCode === 27) {
          this.close()
        }
      }, false)
    }
    if (this.state === ACTIVE) return
    addClass(this.el, this.transition.active)
    this.state = TOACTIVE
    setTimeout(() => {
      addClass(this.el, this.transition.toActive)
      this.state = ACTIVE // todo
      Object.keys(this.openStack.cbs).forEach(id => this.openStack.cbs[id]())
    }, 0)
    return this
  },

  onopen (cb) {
    this.openStack.count += 1
    this.openStack.cbs[this.openStack.count] = cb
    return this.openStack.count
  },

  close () {
    if (!this.el || (this.state === UNACTIVE || this.state === TOUNACTIVE)) return
    const t = this
    function onEnd () {
      t._transitionEnd()
      this.removeEventListener(TRANSITIONEND, onEnd)
    }
    removeClass(this.el, this.transition.toActive)
    this.el.addEventListener(TRANSITIONEND, onEnd)
    addClass(this.el, this.transition.toUnactive)
    this.state = TOUNACTIVE
    Object.keys(this.closeStack.cbs).forEach(id => this.closeStack.cbs[id]())
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
    this.state = UNACTIVE
  }
}

Mask._init()

export default Mask
