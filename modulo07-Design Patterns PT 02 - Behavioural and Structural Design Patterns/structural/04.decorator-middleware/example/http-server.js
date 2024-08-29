InjectHttpInterceptor()

import http from 'http';
import { InjectHttpInterceptor } from './../index.js';
// curl -i localhost:3000
function requestHandler(req, res) {
  // res.setHeader('X-Instrumented-By', 'KleberFreire');
  res.end('Hello World');
}


const server = http.createServer(requestHandler);
const port = 3000;

server.listen(port, () => { console.log('Server is running at', server.address().port) })