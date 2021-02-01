const packages = require('./docs/packages/index.js');
const examples = require('./docs/examples/index.js');

module.exports = {
  someSidebar: {
    'Getting Started': ['README'],
    Packages: packages,
    'Sample Projects': examples,
  },
};
