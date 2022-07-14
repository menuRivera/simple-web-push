require('dotenv').config()
const express = require('express')
const app = express()
const webpush = require('web-push')

webpush.setVapidDetails(
    'mailto:menu.rivera@gmail.com',
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
})
app.use(express.json())

app.get('/api/vapid-public-key', (req, res) => {
    console.log('VAPID KEY REQUEST');
    res.send({
        key: process.env.PUBLIC_VAPID_KEY
    })
})

app.post('/api/subscription', (req, res) => {
    console.log(req.body);
    const { subscription } = req.body
    console.log('NEW SUBSCRIPTION RECEIVED: ', subscription);
    console.log('FAKE SAVING SUBS...');
    console.log('SENDING NOTIFICATION...');

    res.send('succes')

    webpush.sendNotification(subscription, 'BASIC NOTIFICATION PAYLOAD')
        .then(res => console.log(res))
})

app.listen(5000, () => {
    console.log('SERVER RUNNING ON PORT ', 5000)
})
