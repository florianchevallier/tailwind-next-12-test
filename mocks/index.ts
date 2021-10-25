if (typeof window === 'undefined') {
  const { server } = require('./server')
  server.listen()
} else {
  const { worker } = require('./browser')
  console.log('worker', worker);
  worker.start()
}

export { };