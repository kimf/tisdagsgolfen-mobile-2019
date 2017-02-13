function colorForScore(score, par) {
  const hue = Math.round(360 * index / (count + 1));
  return `hsl(${hue}, 74%, 65%)`;
}

module.exports = {
  blue: '#1E98DF',
  white: '#fff',
  actionText: '#3FB4CF',
  inactiveText: '#9B9B9B',
  darkText: '#032250',
  lightText: '#7F91A7',
  cellBorder: '#CECECE',
  darkBackground: '#183E63',
  colorForScore
};
