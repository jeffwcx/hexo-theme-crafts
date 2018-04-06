/*
* Copyright 2018 jeffwang. All rights reserved.
* Licensed under MIT
* Archive scripts
*/

import '../sass/pages/archive.scss'

import Toggle from './components/common/toggle'
import Search from './components/search'

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = new Toggle('.sidebar', {
    btn: '#j_sidebar_btn'
  })
  sidebar.bind()
  const search = new Search('.search', {
    btn: '#j_search_btn'
  })
  search.bind()
}, false)
