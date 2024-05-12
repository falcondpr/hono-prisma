import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { logger } from "hono/logger";

import user from "./routes/user";
import post from "./routes/post";

const app = new Hono();

app.use(logger());
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// routes
app.route("/api/users", user);
app.route("/api/posts", post);

const port = 3000;
console.log(`🚀 server is running on port ${port} ✨`);

serve({
  fetch: app.fetch,
  port,
});
