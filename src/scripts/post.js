/*
* Copyright 2018 jeffwang. All rights reserved.
* Licensed under MIT
* Post page
*/

import '../sass/pages/post.scss'

import Search from './components/search'
import Toggle from './components/common/toggle'

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = new Toggle('.sidebar', {
    btn: '#j_sidebar_btn'
  })
  sidebar.bind()

  const search = new Search('.search', {
    btn: '#j_search_btn',
    hasMask: false
  })
  search.bind()
}, false)
