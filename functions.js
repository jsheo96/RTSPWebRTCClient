function urlFromConfig(config) {
  var url = config.rtsp_to_web_protocol + '://' + config.rtsp_to_web_ip + ':' + config.rtsp_to_web_port;
  url = url + '/stream/demo/channel/0/webrtc';
  return url;
}

module.exports = {
  urlFromConfig : urlFromConfig
};