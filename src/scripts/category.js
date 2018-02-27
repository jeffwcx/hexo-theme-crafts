/*
* Copyright 2018 jeffwang. All rights reserved.
* Licensed under MIT
* Category Page
*/

import '../sass/pages/category.scss'
import Toggle from './components/common/toggle'

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = new Toggle('.sidebar', {
    btn: '#j_sidebar_btn'
  })
  sidebar.bind()
}, false)
