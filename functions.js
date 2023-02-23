function urlFromConfigAndChannel(config, channel) {
  var url = config.rtsp_to_web_protocol + '://' + config.rtsp_to_web_ip + ':' + config.rtsp_to_web_port;
  url = url + '/stream/demo/channel/' + channel + '/webrtc';
  return url;
}

module.exports = {
  urlFromConfigAndChannel : urlFromConfigAndChannel
};
