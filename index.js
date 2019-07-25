const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
let otherUrl = null
if (process.env.NAME === 'hello') {
  otherUrl = 'http://' + process.env.GENERAL_SERVICE_SERVICE_HOST + ':3000'
} else {
  otherUrl = 'http://' + process.env.HELLO_SERVICE_SERVICE_HOST + ':3000'
}
const message = process.env.MESSAGE

app.use(bodyParser.json())

app.get('/', (req, res) => res.send(message))

app.get('/config', (req, res) => res.send({'OTHER_URL': otherUrl, 'NAME': process.env.NAME, 'GENERAL_DEPLOYMENT_SERVICE_HOST': process.env.GENERAL_DEPLOYMENT_SERVICE_HOST, 'HELLO_DEPLOYMENT_SERVICE_HOST': process.env.HELLO_DEPLOYMENT_SERVICE_HOST }))

app.get('/getOther1', (req, res) => {
    axios.get(otherUrl)
        .then(r => {
            const d = r.data
            console.log(d)
            res.send(d)
        })    
})

const port = process.env.PORT
const host = process.env.CURRENT_HOST

app.listen(port, host, () => console.log(`App is listening on ${host}:${port}`))
