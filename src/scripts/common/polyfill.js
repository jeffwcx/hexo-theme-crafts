// svg polyfill
/MSIE|Trident/.test(navigator.userAgent) && document.addEventListener('DOMContentLoaded', function () {
  [].forEach.call(document.querySelectorAll('svg'), function (svg) {
    var use = svg.querySelector('use')
    if (use) {
      var object = document.createElement('object')
      object.data = use.getAttribute('xlink:href')
      object.className = svg.getAttribute('class')
      svg.parentNode.replaceChild(object, svg)
    }
  })
})
