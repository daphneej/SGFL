import { object, string } from "zod";

export const createCategorySchemas = object({
  name: string({
    required_error: "Le nom de la catégorie est requis.",
  })
    .min(1, "Le nom de la catégorie est requis.")
    .max(20, "Le nom ne peut pas dépasser 20 caractères")
    .refine((value) => value.trim() !== "", {
      message: "Le nom de la catégorie est requis.",
    }),
});
