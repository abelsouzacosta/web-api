import http from 'node:http';

const PORT = process.env.PORT || 8080;

let server = http.createServer((request, response) => {
  response.write("Hello World");

  response.end();
}).listen(PORT, () => console.log(`Server running on port ${PORT}`));

export {
  server
}
