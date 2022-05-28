import { parse } from 'node:url'; 
import { DEFAULT_HEADER } from './util/util';

const allRoutes = {
  '/': (request, response) => {
    response.write("Hello World!!!");
    response.end();
  },

  '/heroes:get': (request, response) => {
    response.write("Get all heroes in the database");
    response.end();
  },

  default: (request, response) => {
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

  return chosen(request, response)
}

export default handler;