import { object, string, number, date, instanceof as instanceof_ } from "zod";
import {
  allowedImageExtensions,
  allowedVideoExtensions,
} from "@/schemas/index";

const addCourseSchema = object({
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
  price: number({
    invalid_type_error: "Le prix doit être un nombre",
  })
    .nonnegative("Le prix doit être un nombre positif")
    .step(0.01, "Le prix doit être un nombre positif"),
  categoryId: number({
    required_error: "La catégorie est requise",
    invalid_type_error: "Veuillez choisir une catégorie",
  }).min(1, "La catégorie est requise"),
  thumbnail: object({
    0: instanceof_(File, {
      message: "Le type du fichier image est invalide",
    }).refine((file) => allowedImageExtensions.includes(file.type), {
      message: "Le type du fichier image est invalide",
    }),
  }),
  video: object(
    {
      0: instanceof_(File, {
        message: "Le type du fichier vidéo est invalide",
      }).refine((file) => allowedVideoExtensions.includes(file.type), {
        message: "Le type du fichier vidéo est invalide",
      }),
    },
    { required_error: "La vidéo du cours est requise" }
  ),
  published: string().optional().default("PENDING"),
});

const adminAddCourseSchema = object({
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
  price: number({
    invalid_type_error: "Le prix doit être un nombre",
  })
    .nonnegative("Le prix doit être un nombre positif")
    .step(0.01, "Le prix doit être un nombre positif"),
  categoryId: number({
    required_error: "La catégorie est requise",
    invalid_type_error: "Veuillez choisir une catégorie",
  }).min(1, "La catégorie est requise"),
  trainerId: number({
    required_error: "Le formateur est requis",
    invalid_type_error: "Veuillez sélectionner un formateur",
  }).min(1, "Le formateur est requis"),
  published: string().optional().default("PENDING"),
  thumbnail: object({
    0: instanceof_(File, {
      message: "Le type du fichier image est invalide",
    }).refine((file) => allowedImageExtensions.includes(file.type), {
      message: "Le type du fichier image est invalide",
    }),
  }),
  video: object(
    {
      0: instanceof_(File, {
        message: "Le type du fichier vidéo est invalide",
      }).refine((file) => allowedVideoExtensions.includes(file.type), {
        message: "Le type du fichier vidéo est invalide",
      }),
    },
    { required_error: "La vidéo du cours est requise" }
  ),
  published: string().optional().default("PENDING"),
});

const updateCourseSchema = object({
  title: string().min(1, "Le titre est requis"),
  description: string().min(1, "La description est requise"),
  price: number()
    .nonnegative("Le prix doit être un nombre positif")
    .step(0.01, "Le prix doit être un nombre positif"),
  trainerId: number().min(1, "Le formateur est requis"),
  categoryId: number().min(1, "La catégorie est requise"),
  published: string().optional().default("PENDING"),
});

export { addCourseSchema, updateCourseSchema, adminAddCourseSchema };
