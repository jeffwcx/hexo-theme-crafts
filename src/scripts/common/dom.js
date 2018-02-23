/**
 * 对DOM操作的简单封装
 */

/**
 * 去除类
 * @param {Element} ele 元素
 * @param {String} className 类名
 */
export function removeClass (ele, className) {
  if (ele.className) {
    let classList = ele.className.split(/\s+/)
    let classIndex = classList.indexOf(className)
    if (classIndex < 0) {
      return
    }
    classList.splice(classIndex, 1)
    ele.className = classList.join(' ')
  }
  return ele.className
}

/**
 * 添加类名
 * @param {Element} ele 元素
 * @param {String} className 类名
 */
export function addClass (ele, className) {
  let classList = []
  if (ele.className) {
    classList = ele.className.split(/\s+/)
  }
  if (classList.indexOf(className) < 0) {
    classList.push(className)
  } else {
    return ele.className
  }
  ele.className = classList.join(' ')
  return ele.className
}

export function toggleClass (ele, className) {
  if (!ele) return
  let classList = ele.className
    ? ele.className.split(/\s+/)
    : []
  if (classList.indexOf(className) >= 0) {
    removeClass(ele, className)
  } else {
    addClass(ele, className)
  }
}

/**
 * 单元素选择器
 * @param {String} selector 选择器
 * @param {Element} element 父元素
 */
export function $ (selector, element) {
  let parent = element || document
  if (parent.querySelector) {
    return parent.querySelector(selector)
  }
}

/**
 * 多元素选择器
 * @param {String} selector 选择器
 * @param {Element} element 父元素
 */
export function $$ (selector, element) {
  let parent = element || document
  if (parent.querySelector) {
    return parent.querySelectorAll(selector)
  }
}

/**
 * 对事件绑定做简单的封装
 * @param {element} element - 绑定元素
 * @param {string} type - 绑定事件
 * @param {function} callback - 回调
 */
export function bindEvent (element, type, callback) {
  if (!element) return
  if (element.addEventListener) {
    element.addEventListener(type, callback, false)
  }
}

export function removeEvent (element, type, callback) {
  if (!element) return
  if (element.removeEventListener) {
    element.removeEventListener(type, callback, false)
  }
}

/**
 * 对getBoundingClientRect的简单封装
 * @param {Element} element 元素
 */
export function getRect (element) {
  if (!element) return
  return element.getBoundingClientRect()
}

export function setTransition (ele, transition, property) {
  const style = ele.style
  if (!property) {
    style.webkitTransition = transition
    style.transition = transition
  } else {
    style[`webkitTransition${property}`] = transition
    style[`transtion${property}`] = transition
  }
}
export function setTransform (ele, transform) {
  const style = ele.style
  style.webkitTransform = transform
  style.transform = transform
}
