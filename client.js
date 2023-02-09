'use strict';

const request = require('request');
const wrtc = require('wrtc');
const io = require('socket.io-client');
const config = require('./config.json');
const signalingAddress = config.sig_protocol + '://' + config.sig_ip + ':' + config.sig_port;
const socket = io(signalingAddress); // TODO: don't hard code this
const url = config.rtsp_to_web_protocol + '://' + config.rtsp_to_web_ip + ':' + config.rtsp_to_web_port;
console.log('url', url);
//const url = 'http://localhost:8083/stream/demo/channel/0/webrtc';
socket.on('connect', () => {
  console.log('Connected to the remote socket.io server');
  socket.emit('camera join', room);
  console.log('Attempted to camera join');
});

// TODO: use variables to determine RTSPtoWeb is connected well..
var isChannelReady = false;

// TODO: When creating a room, then authenticate users by password or something (cookies, etc.)
var room = 'foo';

socket.on('camera ready', function() {
  isChannelReady = true;
});
socket.on('offer', function(params) {
  console.log('received offer');
  const socketId = params[0];
  const n = params[1];
  const m = params[2];
  const sdp = params[3];
  doAnswer2(socketId, n, sdp);
});

function doAnswer2(socketId, n, sessionDescription) {
  console.log('Sending answer to peer.');
  fetch(url, {
        method: 'POST',
        body: new URLSearchParams({ data: btoa(sessionDescription.sdp) })
      })
    .then(response => response.text())
    .then(data => {
      const sessionDescription = { type: 'answer', sdp: atob(data) };
      socket.emit('answer', [socketId, n, sessionDescription]);
    });
}
socket.on('disconnect', () => {
  console.log('Signaling server disconnected');
});
