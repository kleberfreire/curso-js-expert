import Http from 'http';
// curl -i localhost:3000
export async function InjectHttpInterceptor(req, res) {
  const oldEmit = Http.Server.prototype.emit;
  Http.Server.prototype.emit = function(...args) {
    const [type, request, response] = args;

    if (type === 'request') {
      response.setHeader('X-Instrumented-By', 'KleberFreire');
    }

    return oldEmit.apply(this, args);
  }
}


