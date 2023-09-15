import { object, string, number, any } from "zod";
import { allowedImageExtensions, allowedVideoExtensions } from "./index.js";

export const addCourseBodySchema = object({
  title: string({
    required_error: "Le titre est requis",
  })
    .min(1, "Le titre est requis")
    .max(30, "Le titre ne peut pas dépasser 30 caractères")
    .refine((value) => value.trim() !== "", {
      message: "Le titre est requis",
    }),
  description: string({
    required_error: "La description est requise",
  })
    .min(1, "La description est requise")
    .max(160, "La description ne peut pas dépasser 160 caractères")
    .refine((value) => value.trim() !== "", {
      message: "La description est requise",
    }),
  price: string()
    .min(1, "Le prix doit être un nombre positif")
    .refine((value) => value.trim() !== "", {
      message: "Le prix est requis",
    })
    .refine((value) => parseFloat(value) >= 0, {
      message: "Le prix doit être un nombre positif",
    }),
  categoryId: string({
    required_error: "La catégorie est requise",
  })
    .min(1, "La catégorie est requise")
    .refine((value) => value.trim() !== "", {
      message: "La catégorie est requise",
    }),
  published: string().optional().default("PENDING"),
});

export const addCourseFilesSchema = object({
  thumbnail: any().refine(
    (file) => allowedImageExtensions.includes(file[0].mimetype),
    {
      message: "Le type du fichier image est invalide",
    }
  ),
  video: any().refine(
    (file) => allowedVideoExtensions.includes(file[0].mimetype),
    {
      message: "Le type du fichier vidéo est invalide",
    }
  ),
});

export const getCourseByIdSchema = object({
  id: string({
    required_error: "L'id du cours est requis",
  })
    .min(1, "L'id du cours est requis")
    .refine((value) => value.trim() !== "", {
      message: "L'id du cours est requis",
    }),
});

export const updateCourseBodySchema = object({
  title: string({
    required_error: "Le titre est requis",
  })
    .min(1, "Le titre est requis")
    .max(30, "Le titre ne peut pas dépasser 30 caractères")
    .refine((value) => value.trim() !== "", {
      message: "Le titre est requis",
    }),
  description: string({
    required_error: "La description est requise",
  })
    .min(1, "La description est requise")
    .max(160, "La description ne peut pas dépasser 160 caractères")
    .refine((value) => value.trim() !== "", {
      message: "La description est requise",
    }),
  price: string()
    .min(1, "Le prix doit être un nombre positif")
    .refine((value) => value.trim() !== "", {
      message: "Le prix est requis",
    })
    .refine((value) => parseFloat(value) >= 0, {
      message: "Le prix doit être un nombre positif",
    }),
  categoryId: string({
    required_error: "La catégorie est requise",
  })
    .min(1, "La catégorie est requise")
    .refine((value) => value.trim() !== "", {
      message: "La catégorie est requise",
    }),
  published: string().optional().default("PENDING"),
});
