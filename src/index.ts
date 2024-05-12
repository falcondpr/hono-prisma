import { Hono } from "hono";
import { serve } from "@hono/node-server";
import prisma from "./libs/prisma";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/user", async (c) => {
  const body = await c.req.json();

  const newUser = await prisma.user.create({
    data: body,
  });

  return c.json(newUser);
});

const port = 3000;
console.log(`server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
