/**
 * toggle
 * this is a common component for simple components those just can open or close
 */

import Component from '../../common/component'
import Mask from '../mask'
import { addClass, removeClass } from '../../common/dom'

const OPEN = 0
const CLOSE = 1

const DEFAULT = {
  hasMask: true
}

class Toggle extends Component {
  constructor (el, opts) {
    super()
    this.merge(DEFAULT, opts)
    this.el = this.getElement(el)
    this.state = CLOSE
    this.activeClass = 'is-active'
    if (this.opts.hasMask) {
      Mask.onclose(() => {
        this.close()
      })
    }
    if (this.opts.btn) {
      this.btn = this.getElement(this.opts.btn)
    }
  }
  bind () {
    if (this.btn) {
      this.btn.addEventListener('click', () => {
        this.toggle()
      })
    }
  }
  open () {
    if (this.state === OPEN) return
    addClass(this.el, this.activeClass)
    if (this.opts.hasMask) {
      Mask.open()
    }
    this.state = OPEN
  }

  close () {
    if (this.state === CLOSE) return
    removeClass(this.el, this.activeClass)
    if (this.opts.hasMask) {
      Mask.close()
    }
    this.state = CLOSE
  }

  toggle () {
    this.state === OPEN ? this.close() : this.open()
  }
}

export default Toggle
