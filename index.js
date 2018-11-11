var production = process.env.NODE_ENV === 'production';
module.exports = require('./dist/index-node8' + (production ? '' : '-dev') + '.cjs');
