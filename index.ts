/// <reference lib="dom" />
/// <reference lib="deno.unstable" />

import { Application } from "@oak/oak/application";

import "./telegram/initBot.ts";
import { PORT } from "./env.ts";
import router from "./routes/routes.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: PORT });
console.log(`Server has started on http://localhost:${PORT}`);
