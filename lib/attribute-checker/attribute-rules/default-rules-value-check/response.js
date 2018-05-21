module.exports = (x, y) => ({
  type: 'geo:point',
  coordinates: [x, y],
  metadata: {
    date: new Date()
  }
});
