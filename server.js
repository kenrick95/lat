var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.json())

app.use('/', express.static('client'))
app.post('/time', function (req, res) {
  const remoteArrival = (new Date()).toISOString()
  console.log(req.body)
  res.send({
    localDeparture: req.body.localDeparture,
    remoteArrival: remoteArrival,
    remoteDeparture: (new Date()).toISOString()
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
