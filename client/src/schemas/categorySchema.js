import { object, string } from "zod";

const addCategorySchema = object({
  name: string({
    required_error: "Le nom est requis",
  }).min(1, "Le nom est requis"),
});

const updateCategorySchema = object({
  name: string({
    required_error: "Le nom est requis",
  }).min(1, "Le nom est requis"),
});

export { addCategorySchema, updateCategorySchema };
