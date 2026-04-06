import { z } from "zod";
import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

const schema = z.object({
  name: z.string(),
  age: z.number(),
  address: z.object({
    city: z.string()
  })
});

const result = schema.safeParse({ name: "John", age: 30 });

if (!result.success) {
  console.log(result.error.format());
}

app.post("/users", async (c) => {
  const body = await c.req.json();
  const result = schema.safeParse(body);

  if (!result.success) {
    return c.json(result.error.format(), 400);
  }

  return c.json(result.data);
});


const port = 8334;
serve({ fetch: app.fetch, port: port });
console.log(`Server berjalan di http://localhost:${port}`);

export default app;
