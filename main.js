//'use strict';
//
//console.log('socket test')
//var socket = io.connect('http://fishsense.tidepool.kr:8080')
//socket.on('connect', () => {
//  console.log('FishSense client has connected to server fishsense.tidepool.kr:8080');
//  socket.emit('create or join', 'jsheo');
//});
//
//socket = io.connect();
const wrtc = require('wrtc')
function startPlay (url) {
let webrtc = new wrtc.RTCPeerConnection({
  iceServers: [{
    url: 'turn:43.200.182.153:3478?transport=udp',
    username: 'jsheo',
    credential: 'jsheo'
  }],
  sdpSemantics: 'unified-plan'
})
//webrtc.ontrack = function (event) {
//  console.log(event.streams.length + ' track is delivered')
//  videoEl.srcObject = event.streams[0]
//  videoEl.play()
//}
//webrtc.addTransceiver('video', { direction: 'sendrecv' })
//console.log('sdf')
//webrtc.onnegotiationneeded = async function handleNegotiationNeeded () {
let offer;
webrtc.createOffer().then((data) => offer = data)
console.log('offer',offer)

webrtc.setLocalDescription(offer)
fetch(url, {
method: 'POST',
body: new URLSearchParams({ data: btoa(webrtc.localDescription.sdp) })
})
.then(response => response.text())
.then(data => {
  try {
    webrtc.setRemoteDescription(
      new RTCSessionDescription({ type: 'answer', sdp: atob(data) })
    )
  } catch (e) {
    console.warn(e)
  }
})
//}

//const webrtcSendChannel = webrtc.createDataChannel('rtsptowebSendChannel')
//webrtcSendChannel.onopen = (event) => {
//  console.log(`${webrtcSendChannel.label} has opened`)
//  webrtcSendChannel.send('ping')
//}
//webrtcSendChannel.onclose = (_event) => {
//  console.log(`${webrtcSendChannel.label} has closed`)
//  startPlay(videoEl, url)
//}
//webrtcSendChannel.onmessage = event => console.log(event.data)
}

//const videoEl = document.querySelector('#webrtc-video')
//const webrtcUrl = document.querySelector('#webrtc-url').value
const webrtcUrl = 'http://localhost:8083/stream/demo/channel/0/webrtc'
startPlay(webrtcUrl)
