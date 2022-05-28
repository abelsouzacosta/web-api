import http from 'node:http';
import handler from './handler.mjs'

const PORT = process.env.PORT || 8080;

let server = http.createServer(handler).listen(PORT, () => console.log(`Server running on port ${PORT}`));

export {
  server
}
