# RTSPWebRTCClient

로컬 서버에서 WebRTC 시그널링 서버와 톻신하는 클라이언트입니다.

# Prerequisites
컴퓨터에 RTSP를 WebRTC로 변환하는 컨테이너인
ghcr.io/deepch/rtsptoweb:latest가 실행되고 있어야합니다.

# Introduction
WebRTC는 단말간 실시간 영상 통신을 가능하게 하는 기술입니다. WebRTC에 필수적인 서버인 시그널링 서버는
단말간의 ICE와 SDP를 중계해주는 역할을 합니다. 이 프로젝트는 FishScope의 로컬서버에서 시그널링 서버와 
통신하는 클라이언트에 대한 소스입니다.

이 프로그래밍 수행하는 역할은 다음과 같습니다.
- 시그널링 서버에 연결
- 카메라 서버가 룸에 들어갔다는 것을 알림
- n 번째 단말이 m 번째 카메라에 WebRTC를 offer 하면 그에 맞는 answer를 송신

# Architecture
스테레오 카메라 -> 로컬서버 -> **RTSPWebRTCClient** <-> 시그널링 서버 <-> 단말(폰, PC 등)

# Usage
양식장에 설치된 로컬서버에 다음 명령어를 수행합니다.
```commandline
$ git clone git@github.com/jsheo96/RTSPWebRTCClient.git
$ cd RTSPWebRTCClient
$ npm install
$ node client.js
```

Docker가 설치되어있다면 다음을 수행합니다.
```commandline
$ docker run --restart always -d jsheo96/rtsp-web-client:v0.0.0 
```
