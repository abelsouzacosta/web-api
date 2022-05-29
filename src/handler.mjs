import { parse } from 'node:url'; 
import { DEFAULT_HEADER } from './util/util.mjs';
import { routes } from './routes/heroRoute.mjs'

const heroRoutes = routes({
  heroService: {

  }
})

const allRoutes = {
  ...heroRoutes,

  '/:get': async (request, response) => {
    response.write("Hello World!!!");
    response.end();
  },

  default: async (request, response) => {
    response.writeHead(404, DEFAULT_HEADER);
    response.write("Not Found");
    response.end();
  }
}

function handler(request, response) {
  let { url, method } = request;
  let { pathname } = parse(url, true);
  let key = `${pathname}:${method.toLowerCase()}`
  let chosen = allRoutes[key] || allRoutes.default

  return Promise.resolve(chosen(request, response)).catch(handlerError(response))
}

function handlerError(response) {
  return error => {
    console.error(`Error: ${error.stack}`);
    response.writeHead(500, DEFAULT_HEADER);
    response.write(JSON.stringify({
      error: "Internal server error"
    }));

    return response.end();
  };
}

export default handler;