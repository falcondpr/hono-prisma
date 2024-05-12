import { Hono } from "hono";
import prisma from "../libs/prisma";

const post = new Hono();

post
  .post("/", async (c) => {
    const body = await c.req.json();

    const newPost = await prisma.post.create({
      data: body,
    });

    return c.json(newPost, 201);
  })
  .get("/", async (c) => {
    const posts = await prisma.post.findMany({
      include: { author: true },
    });
    return c.json(posts);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");

    const post = await prisma.post.findUnique({
      where: { id: +id },
    });

    if (!post) return c.newResponse("Post does not exist", 404);

    return c.json(post);
  })
  .patch("/:id", async (c) => {
    const id = c.req.param("id");
    const body = await c.req.json();

    const post = await prisma.post.findUnique({
      where: { id: +id },
    });

    if (!post) return c.newResponse("Post does not exist", 404);

    if (body.authorId) {
      const user = await prisma.user.findUnique({
        where: { id: +body.authorId },
      });

      if (!user) return c.newResponse("User does not exist", 404);
    }

    const postUpdated = await prisma.post.update({
      where: { id: +id },
      data: body,
      include: { author: true },
    });

    return c.json(postUpdated, 201);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");

    const post = await prisma.post.findUnique({
      where: { id: +id },
    });

    if (!post) return c.newResponse("Post does not exist", 404);

    const postDeleted = await prisma.post.delete({
      where: { id: +id },
    });

    return c.json(postDeleted);
  });

export default post;
