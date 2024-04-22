const APP_ID = '08e6d3e4911841649bad97c07c3e3d8b';
const CHANNEL = 'main';
const TOKEN = '007eJxTYMgU3NMTU3zCUPZAb5f6zyk7859l3xXmqD10u9rwns6b/8sUGAwsUs1SjFNNLA0NLUwMzUwskxJTLM2TDcyTjVONUyyS1jarpTUEMjLcStRnZGSAQBCfhSE3MTOPgQEAl2ggWA==';
let UID;

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

let localTracks = [];
let remoteUsers = {};

let joinAndDisplayLocalStream = async () => {
   UID = await client.join(APP_ID, CHANNEL, TOKEN, null);

   localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

   let player = ` <div class="video-container" id="user-container-${UID}">
                  <div class="username-wrapper"><span class="user-name">My Name</span></div>
                  <div class="video-player" id="user-${UID}"> </div>
                </div>`;
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player); 
         
    localTracks[1].play(`user-${UID}`);

    await client.publish([localTracks[0], localTracks[1]]);
}

joinAndDisplayLocalStream();
