/*
* Copyright 2018 jeffwang. All rights reserved.
* Licensed under MIT
* Post page
*/

import '../sass/pages/post.scss'

import Search from './components/search'
import Toggle from './components/common/toggle'
import { Share } from 'ohu-share'
import { $ } from './common/dom'

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = new Toggle('.sidebar', {
    btn: '#j_sidebar_btn'
  })
  sidebar.bind()
  const img = $('.article_content img')
  const content = $('.article_content p')
  const share = new Share({
    title: $('.article_title').textContent,
    desc: content ? content.textContent.substr(0, 40) + '...' : document.title,
    icon: img ? img.src : 'https://avatars3.githubusercontent.com/u/14073775?s=40&v=4',
    link: window.location.href,
    from: 'ohu的博客'
  })
  share.on('share', ({ support, context }) => {
    if (!support.isSupport) {
      alert('无法进行分享，或者请使用浏览器自身的分享功能')
    }
  }, () => {
    alert('分享出错，请使用浏览器自身的分享功能')
  })
  share.mount()

  const search = new Search('.search', {
    btn: '#j_search_btn'
  })
  search.bind()
}, false)
