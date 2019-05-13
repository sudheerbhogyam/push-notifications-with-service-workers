
import * as express from 'express';
import {Application} from "express";
import {readAllLessons} from "./read-all-lessons.route";
import {addPushSubscriber} from "./add-push-subscriber.route";
import {sendNewsletter} from "./send-newsletter.route";
const bodyParser = require('body-parser');

const webpush = require('web-push');



const vapidKeys = {
    "publicKey":"BJXzoigVy_ipzjYn0AHSabLuKt7jWw6X3cWV30fCY19FewT7UmpPgn1AcC4VfJkVif_Ph7eLtuNvh5NhTS2Q5TM",
    "privateKey":"LRVexm5mV2zkYGm3eAr-vS3QT26z4omZDOXu7GDWQQs"
};


webpush.setGCMAPIKey('AIzaSyCXinTaT6TcnxF1P7dAkcrz3BrbjACsaRI');
webpush.setVapidDetails(
    'mailto:sudheerbhogyam@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);




const app: Application = express();
var cors = require('cors')

app.use(cors())



app.use(bodyParser.json());


// REST API
app.route('/api/lessons')
    .get(readAllLessons);

app.route('/api/notifications')
    .post(addPushSubscriber);

app.route('/api/newsletter')
    .post(sendNewsletter);

app.get('/test',(req,res) => {


    const notificationPayload = {
        "notification": {
            "title": "Angular News",
            "body": "Newsletter Available!",
            "icon": "assets/main-page-logo-small-hat.png",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            },
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    };

    let s ={ endpoint:
        'https://fcm.googleapis.com/fcm/send/cMc_w402kLw:APA91bFKwTcSHog72sAHvtWVRkkveP2QW19A_FViFtixkLEBSSa8Z3Ko07yXOmp3fgKjLux4mYcuUVPX9_AuKDvRFpGhzDl2_I-jic7ymCq1JLQ62esvUXJNXdb5J1lV2tMb3HDL69_j',
       expirationTime: null,
       keys:
        { p256dh:
           'BPmsg2GrNNoViY66dNpHqxkWLoPIZZV_HYuMjUuOYapPjnRdGqgSSBxhtjofAGVDo0ST68_QYQ7WAxQXDu8v5ng',
          auth: 'lJF7JTaO599Y20hvC1jUCw' } }
    Promise.all([s].map(sub => webpush.sendNotification(
        sub, JSON.stringify(notificationPayload) )))
        .then(() => res.status(200).json({message: 'Newsletter sent successfully.'}))
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
        });

    res.send("WORKING");



})

// launch an HTTP Server
const httpServer = app.listen(9000, () => {
    console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
});









