'use strict';

const request = require('request');
const wrtc = require('wrtc');
const io = require('socket.io-client');
const socket = io('http://43.200.182.153:8080');
const url = 'http://localhost:8083/stream/demo/channel/0/webrtc';
socket.on('connect', () => {
  console.log('Connected to the remote socket.io server');
  socket.emit('camera join', room);
  console.log('Attempted to camera join');
});

// TODO: use variables to determine RTSPtoWeb is connected well..
var isChannelReady = false;
var isInitiator = false;
var isStarted = false;

// TODO: When creating a room, then authenticate users by password or something (cookies, etc.)
var room = 'foo';

socket.on('camera ready', function() {
  isChannelReady = true;
  isInitiator = false;
});
socket.on('offer', function(params) {
  console.log('received offer');
  const socketId = params[0];
  const n = params[1];
  const m = params[2];
  const sdp = params[3];
  doAnswer2(socketId, n, sdp);
});

// TODO: when the program dies send bye to sig server.

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
