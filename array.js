import { z } from "zod";

const schema= z.array(z.string());

const result = schema.safeParse(["apple", "banana", 5]);
const result2 = schema.safeParse(["apple", "banana", "cherry"]);

if (!result.success) {
  console.log(result.error.format());
}

if (result2.success) {
  console.log(result2.data);
}