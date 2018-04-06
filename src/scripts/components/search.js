/**
 * search
 */

import Toggle from './common/toggle'
import { $, removeClass, addClass } from '../common/dom'
import _debounce from 'lodash/debounce'

const STATE_ACTIVE = 'is-active'

const RESULT_LIST_ITEM = 'search_result_item'

class Search extends Toggle {
  constructor (el, opts) {
    super(el, opts)
    this.inputEl = $('input', this.el)
    this.result = $('.search_result', this.el)
    const algoliaConfig = document.querySelector('meta[property="algolia:search"]').dataset
    const client = algoliasearch(algoliaConfig.applicationId, algoliaConfig.apiKey)
    const index = client.initIndex(algoliaConfig.indexName)
    this.index = index
    this.currentFocus = null
  }

  open () {
    super.open()
    this.setCurrentFocus()
  }
  setCurrentFocus (el) {
    if (!this.currentFocus || (this.currentFocus && el === this.inputEl)) { // default focus
      this.currentFocus = this.inputEl
      this.currentFocus.focus()
    } else {
      if (this.currentFocus === this.inputEl) {
        this.currentFocus.blur()
      } else {
        removeClass(this.currentFocus, STATE_ACTIVE)
      }
      if (el && el.parentNode === this.result) {
        addClass(el, STATE_ACTIVE)
        this.currentFocus = el
        const link = $('a', this.currentFocus)
        if (link) link.focus()
      } else if (!el) {
        this.currentFocus.focus()
      }
    }
  }
  getNext () {
    if (this.currentFocus) {
      if (this.currentFocus.parentNode === this.result) {
        const nextEl = this.currentFocus.nextElementSibling
        return nextEl
      } else if (this.currentFocus === this.inputEl) {
        if (this.result.childElementCount >= 1) {
          return this.result.children[0]
        }
      }
    }
    return null
  }
  getPrev () {
    if (this.currentFocus) {
      if (this.currentFocus.parentNode === this.result) {
        const prevEl = this.currentFocus.previousElementSibling
        if (prevEl) return prevEl
        else return this.inputEl
      }
    }
    return null
  }
  getEnter () {
    if (this.currentFocus &&
      this.currentFocus.parentNode === this.result) {
      return $('a', this.currentFocus)
    }
    return null
  }
  moveUp () {
    const prev = this.getPrev()
    if (prev) {
      this.setCurrentFocus(prev)
    }
  }
  moveDown () {
    const next = this.getNext()
    if (next) {
      this.setCurrentFocus(next)
    }
  }

  emptyResult () {
    this.result.innerHTML = null
  }
  addResultList (resultList, searchValue) {
    this.emptyResult()
    const fragment = document.createDocumentFragment()
    if (resultList.length === 0) {
      const empty = document.createElement('div')
      empty.className = RESULT_LIST_ITEM
      empty.textContent = `没有「${searchValue}」相关结果`
      fragment.appendChild(empty)
    } else {
      resultList.forEach(item => {
        const resultItem = document.createElement('li')
        const link = document.createElement('a')
        link.href = item.permalink
        link.textContent = item.title
        resultItem.className = RESULT_LIST_ITEM
        resultItem.appendChild(link)
        fragment.appendChild(resultItem)
      })
    }
    this.result.appendChild(fragment)
  }
  bind () {
    super.bind()
    document.addEventListener('keydown', (evt) => {
      const keyCode = evt.keyCode
      switch (keyCode) {
        case 38: // up
          evt.preventDefault()
          this.moveUp()
          break
        case 40: // down
          evt.preventDefault()
          this.moveDown()
          break
      }
    }, false)
    this.inputEl.addEventListener('input', _debounce((evt) => {
      const searchValue = evt.target.value
      this.setCurrentFocus()
      if (searchValue) {
        this.index.search(searchValue)
          .then(result => {
            const hits = result.hits
            this.addResultList(hits, searchValue)
            return result
          })
          .catch(err => {
            console.err(err)
          })
      } else {
        this.emptyResult()
      }
    }, 300), false)
  }
}

export default Search
