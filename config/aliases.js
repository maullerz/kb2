const path = require('path') // eslint-disable-line import/no-extraneous-dependencies
const fs = require('fs')

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd())

module.exports = {
  api: path.resolve(appDirectory, 'src/api'),
  data: path.resolve(appDirectory, 'src/data'),
  pages: path.resolve(appDirectory, 'src/pages'),
  components: path.resolve(appDirectory, 'src/components'),

  modules: path.resolve(appDirectory, 'src/modules'),
  store: path.resolve(appDirectory, 'src/store'),
  layouts: path.resolve(appDirectory, 'src/layouts'),
  services: path.resolve(appDirectory, 'src/services'),

  utils: path.resolve(appDirectory, 'src/utils'),
  hooks: path.resolve(appDirectory, 'src/utils/hooks'),
  assets: path.resolve(appDirectory, 'src/assets'),
  styles: path.resolve(appDirectory, 'src/assets/styles'),

  // Tell MUI to use Styled Components instead of Emotion
  '@mui/styled-engine': '@mui/styled-engine-sc',
}
