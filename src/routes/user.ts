import { Hono } from "hono";
import prisma from "../libs/prisma";

const user = new Hono();

user
  .post("/", async (c) => {
    const body = await c.req.json();

    const newUser = await prisma.user.create({
      data: body,
    });

    return c.json(newUser, 201);
  })
  .get("/", async (c) => {
    const users = await prisma.user.findMany();
    return c.json(users);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");

    const user = await prisma.user.findUnique({
      where: { id: +id },
    });

    if (!user) return c.newResponse("User does not exist", 404);

    return c.json(user);
  })
  .patch("/:id", async (c) => {
    const id = c.req.param("id");
    const body = await c.req.json();

    const user = await prisma.user.findUnique({
      where: { id: +id },
    });

    if (!user) return c.newResponse("User does not exist", 404);

    const userUpdated = await prisma.user.update({
      where: { id: +id },
      data: body,
    });

    return c.json(userUpdated, 201);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");

    const user = await prisma.user.findUnique({
      where: { id: +id },
    });

    if (!user) return c.newResponse("User does not exist", 404);

    const userDeleted = await prisma.user.delete({
      where: { id: +id },
    });
    return c.json(userDeleted);
  });

export default user;
