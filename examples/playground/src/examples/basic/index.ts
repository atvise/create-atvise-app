/* eslint-disable import/no-webpack-loader-syntax */
// @ts-ignore
import appSource from '!!raw-loader!./app.jsx';

export default {
  name: 'Basic usage',
  files: [
    {
      name: 'app.jsx',
      contents: appSource,
    },
  ],
};
