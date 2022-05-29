const routes = ({
  heroService
}) => ({
  '/heroes:get': async (request, response) => {
    response.write("Get all heroes in the database");
    response.end();
  },
  '/heroes:post': async (request, response) => {
    response.write("Get all heroes in the database");
    response.end();
  }
});

export { routes };