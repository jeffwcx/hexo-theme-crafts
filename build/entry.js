module.exports = {
  index: {
    input: ['./src/scripts/index.js']
  },
  post: {
    input: ['./src/scripts/post.js']
  },
  archive: {
    input: ['./src/scripts/archive.js']
  },
  category: {
    input: ['./src/scripts/category.js']
  },
  common: {
    input: ['./src/scripts/common/sprite',
      './src/scripts/common/polyfill', './src/sass/global/_all.scss']
  }
}
