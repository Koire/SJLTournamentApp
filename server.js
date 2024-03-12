import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts"
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

const app = new Application();
const port = 8080;
const router = new Router();

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods())
app.use(async (context) => {
    await context.send({
      root: `${Deno.cwd()}/dist`,
      index:"index.html",
    });
});

console.log(`listening on port: ${port}`)
await app.listen({port})