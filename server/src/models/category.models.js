import { number, object, string } from "zod";

export const createCategorySchema = object({
  name: string({
    required_error: "Le nom de la catégorie est requis.",
  })
    .min(1, "Le nom de la catégorie est requis.")
    .max(20, "Le nom ne peut pas dépasser 20 caractères")
    .refine((value) => value.trim() !== "", {
      message: "Le nom de la catégorie est requis.",
    }),
});

export const getCategoryByIdSchema = object({
  id: string({
    invalid_type_error: "L'id de la catégorie est invalide",
    required_error: "L'id de la catégorie est requis.",
  })
    .min(1, "L'id de la catégorie est requis.")
    .refine((value) => value.trim() !== "", {
      message: "L'id de la catégorie est requis.",
    }),
});

export const updateCategorySchema = object({
  name: string({
    required_error: "Le nom de la catégorie est requis.",
  })
    .min(1, "Le nom de la catégorie est requis.")
    .max(20, "Le nom ne peut pas dépasser 20 caractères")
    .refine((value) => value.trim() !== "", {
      message: "Le nom de la catégorie est requis.",
    }),
});
