/*
* Copyright 2018 jeffwang. All rights reserved.
* Licensed under MIT
* Index page
*/

import '../sass/pages/index.scss'

import { $, toggleClass } from './common/dom'

document.addEventListener('DOMContentLoaded', () => {
  const activeClass = 'is-active'
  const sidebarEle = $('.sidebar')
  const sidebarBtnEle = $('#j_sidebar_btn')
  sidebarBtnEle.addEventListener('click', () => {
    toggleClass(sidebarEle, activeClass)
  }, false)

  const searchEle = $('.search')
  const searchBtnEle = $('#j_search_btn')
  searchBtnEle.addEventListener('click', () => {
    toggleClass(searchEle, activeClass)
  }, false)
}, false)
