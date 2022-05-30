import { once } from 'node:events';
import Hero from '../entities/hero.mjs'
import { HttpStatus, Headers } from '../util/util.mjs';

const routes = ({
  heroService
}) => ({
  '/heroes:get': async (request, response) => {
    response.write("Get all heroes in the database");
    response.end();
  },
  '/heroes:post': async (request, response) => {
    const bodyRequest = await once(request, 'data');
    const parsedBodyRequest = JSON.parse(bodyRequest);
    
    const hero = new Hero(parsedBodyRequest);

    const id = hero.id;

    response.writeHead(HttpStatus.CREATED, Headers.DEFAULT_HEADER);
    response.write(JSON.stringify({
      id,
      success: `User created with success`,
    }));

    return response.end();
  }
});

export { routes };