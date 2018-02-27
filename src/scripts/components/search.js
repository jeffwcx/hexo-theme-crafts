/**
 * search
 */

import Toggle from './common/toggle'
import { $ } from '../common/dom'

class Search extends Toggle {
  constructor (el, opts) {
    super(el, opts)
    this.inputEl = $('input', this.el)
  }

  open () {
    super.open()
    this.inputEl.focus()
  }
}

export default Search
