import { once } from 'node:events';
import Hero from '../entities/hero.mjs'
import { HttpStatus, Headers } from '../util/util.mjs';

const routes = ({
  heroService
}) => ({
  '/heroes:get': async (request, response) => {
    let heroes = await heroService.find();
    response.write(JSON.stringify({
      results: heroes
    }));
    response.end();
  },
  '/heroes:post': async (request, response) => {
    const bodyRequest = await once(request, 'data');
    const parsedBodyRequest = JSON.parse(bodyRequest);
    
    const hero = new Hero(parsedBodyRequest);

    const id = await heroService.create(hero);

    response.writeHead(HttpStatus.CREATED, Headers.DEFAULT_HEADER);
    response.write(JSON.stringify({
      id,
      success: `User created with success`,
    }));

    return response.end();
  }
});

export { routes };