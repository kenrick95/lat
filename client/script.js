const onresize = () => {
  const canvas = document.querySelector('canvas')
  canvas.height = window.innerHeight - 8
  canvas.width = window.innerWidth
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
  return responseData
}

document.addEventListener('DOMContentLoaded', async () => {
  onresize()
  const canvas = document.querySelector('canvas')
  const context = canvas.getContext('2d')
  console.log(await ping())
})
window.addEventListener('resize', onresize)
