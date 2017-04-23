const onresize = () => {
  const canvas = document.querySelector('canvas')
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
  draw()
}

const ping = async () => {
  const headers = new window.Headers()
  headers.append('Content-Type', 'application/json')
  const response = await window.fetch('/time', {
    method: 'POST',
    body: JSON.stringify({
      localDeparture: (new Date()).toISOString()
    }),
    headers: headers
  })
  const responseData = await response.json()
  responseData.localArrival = (new Date()).toISOString()
  for (var [key, value] of Object.entries(responseData)) {
    responseData[key] = new Date(value)
  }
  return responseData
}

const latencies = []

const draw = () => {
  const canvas = document.querySelector('canvas')
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)
  const barWidth = 10
  context.fillStyle = 'black'
  latencies.forEach((value, index) => {
    context.rect(0 + index * barWidth, canvas.height - value, barWidth, value)
    context.fill()
  })
}

const delay = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 100)
  })
}

document.addEventListener('DOMContentLoaded', async () => {
  onresize()
  while (latencies.length < 100) {
    const pingData = await ping()
    const latency = ((pingData.localArrival - pingData.localDeparture) - (pingData.remoteDeparture - pingData.remoteArrival)) / 2
    console.log(latency)
    latencies.push(latency)
    draw()
    await delay()
  }
})
window.addEventListener('resize', onresize)
