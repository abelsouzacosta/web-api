function handler(request, response) {
  let { url, method } = request;

  console.log({ url, method });

  response.write('Hello World');

  response.end();
}

export default handler;