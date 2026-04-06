import { z } from "zod";
import { Hono } from "hono";

const app = new Hono();

const schema = z.object({
  name: z.string(),
  age: z.number(),
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
function fetch() {
return fetch("http://localhost:3453/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "Alice", age: 25 }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
}

fetch();

export default app;
