import { ZoomMtg } from '@zoomus/websdk'
import crypto from 'crypto'

// console.log(meetConfig.apiKey);
// console.log("checkSystemRequirements");
// console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));
// ZoomMtg.setZoomJSLib('https://dmogdx0jrul3u.cloudfront.net/1.8.1/lib', '/av');
// ZoomMtg.setZoomJSLib('node_modules/@zoomus/websdk/dist/lib/', '/av');

ZoomMtg.setZoomJSLib('https://source.zoom.us/1.8.1/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

function generateSignature(apiKey, apiSecret, meetingNumber, role) {
  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
  const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
  const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')

  return signature;
}

export function getSignature(meetConfig) {
  try {
    const signature = generateSignature(meetConfig.apiKey, meetConfig.apiSecret, meetConfig.meetingNumber, 1);

    ZoomMtg.init({
      leaveUrl: meetConfig.leaveUrl,
      success: () => {
        ZoomMtg.join({
          signature,
          meetingNumber: meetConfig.meetingNumber,
          userName: meetConfig.userName,
          apiKey: meetConfig.apiKey,
          userEmail: meetConfig.userEmail,
          passWord: meetConfig.passWord
          // success: (success) => {
          //   console.log(success)
          // },
          // error: (error) => {
          //   console.log(error)
          // }
        })
      },
      error: (err) => {
        console.log('error', err);
      }
    })
  } catch (e) {
    console.log('erro', e)
  }
}
