module.exports = function() {
  throw new Error(`You failed to add the plugin in the babel config. Please check that you have:
  plugins: ["jsx-code"]
`);
};
