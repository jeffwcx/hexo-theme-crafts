function importAll (r) {
  r.keys().forEach(r)
}

importAll(require.context('../../assets/icons', true, /\.svg$/))
