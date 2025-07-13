import webPush from 'web-push'
import { webPushPrivateKey, webPushPublicKey } from '../config.js'

const apiKeys = {
    publicKey: webPushPublicKey,
    privateKey: webPushPrivateKey
}

webPush.setVapidDetails(
    'mailto:YOUR_MAILTO_STRING',
    apiKeys.publicKey,
    apiKeys.privateKey
)

export default webPush