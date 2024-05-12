import { Hono } from "hono";
import { serve } from "@hono/node-server";

import user from "./routes/user";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// routes
app.route("/api/users", user);

const port = 3000;
console.log(`🚀 server is running on port ${port} ✨`);

serve({
  fetch: app.fetch,
  port,
});
