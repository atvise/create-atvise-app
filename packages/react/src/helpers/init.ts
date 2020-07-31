export default function init() {
  if (process.env.NODE_ENV === 'development') {
    webMI.setConfig('data.websocket', false);
  }
}
