import fastify from "fastify";

const app = fastify();

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Http Server is running on port 3333.");
  });
