import {z} from "zod";

const schema= z.enum(["admin", "user"]);

const result = schema.safeParse("admin");
const result2 = schema.safeParse("guest");

if (!result.success) {
  console.log(result.error.format());
}

if (result2.success) {
  console.log(result2.data);
}