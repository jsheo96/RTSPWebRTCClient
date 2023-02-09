const functions = require('./functions');
test('urlFromConfig should convert config file into stream file', () => {
  config = {
    "sig_protocol" : "http",
    "sig_ip": "43.200.182.153",
    "sig_port": 8080,
    "rtsp_to_web_protocol": "http",
    "rtsp_to_web_ip": "localhost",
    "rtsp_to_web_port": 8083
  };
  expect(functions.urlFromConfig(config)).toEqual('http://localhost:8083/stream/demo/channel/0/webrtc');
});