const io = require('socket.io-client');
const wrtc = require('wrtc');
const socket = io('http://43.200.182.153:8080');
var isChannelReady = false;
var isInitiator = false;
var isStarted = false;
var localStream;
var pc;
var remoteStream;
var turnReady;

var pcConfig = {
  'iceServers': [
  {
    "url": 'turn:43.200.182.153:3478?transport=tcp',
    "username":"jsheo",
    "credential":"jsheo"
  }]
};
const url = 'http://localhost:8083/stream/demo/channel/0/webrtc';
socket.on('connect', () => {
  console.log('Camera client has connected to server fishsense.tidepool.kr:8080');

  // Send a message to the server
  socket.emit('create or join', 'jsheo');
  console.log('message emitted');
});
socket.on('created', function(room) {
  console.log('Created room ' + room);
  isInitiator = true;
});
socket.on('message', (message) => {
  console.log(message);
});
socket.on('join', function (room){
  console.log('Another peer made a request to join room ' + room);
  console.log('This peer is the initiator of room ' + room + '!');
  isChannelReady = true;
  // getStream();
  start();
});

function getStream() {
  console.log('I am getting stream information');
  fetch(url, {
          method: 'POST'
  }).then(response => response.text())
        .then(data => null)
}

function start() {
  createPeerConnection();
  pc.addStream(localStream)
  isStarted = true;
  console.log('camera stream is ready');
  doCall();
}

function createPeerConnection() {
  try {
    pc = new wrtc.RTCPeerConnection(pcConfig);
    pc.onicecandidate = handleIceCandidate;
    pc.onaddstream = handleRemoteStreamAdded;
    pc.onremovestream = handleRemoteStreamRemoved;
    console.log('Created RTCPeerConnnection');
  } catch (e) {
    console.log('Failed to create PeerConnection, exception: ' + e.message);
    console.log('Cannot create RTCPeerConnection object.');
    return;
  }
}

function handleIceCandidate(event) {
  console.log('icecandidate event: ', event);
  if (event.candidate) {
    sendMessage({
      type: 'candidate',
      label: event.candidate.sdpMLineIndex,
      id: event.candidate.sdpMid,
      candidate: event.candidate.candidate
    });
  } else {
    console.log('End of candidates.');
  }
}

function handleCreateOfferError(event) {
  console.log('createOffer() error: ', event);
}

function doCall() {
  console.log('Sending offer to peer');
  pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
}

function doAnswer() {
  console.log('Sending answer to peer.');
  pc.createAnswer().then(
    setLocalAndSendMessage,
    onCreateSessionDescriptionError
  );
}

function setLocalAndSendMessage(sessionDescription) {
  pc.setLocalDescription(sessionDescription);
  console.log('setLocalAndSendMessage sending message', sessionDescription);
  sendMessage(sessionDescription);
}

function onCreateSessionDescriptionError(error) {
  trace('Failed to create session description: ' + error.toString());
}
