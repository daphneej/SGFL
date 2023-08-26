import { object, string, number } from "zod";

const addCourseSchema = object({
  title: string({
    required_error: "Le titre est requis",
  }).min(1, "Le titre est requis"),
  description: string({
    required_error: "La description est requise",
  }).min(1, "La description est requise"),
  price: number({
    required_error: "Le prix est requis",
  }).min(1, "Le prix est requis"),
  trainerId: number({
    required_error: "Le formateur est requis",
  }).min(1, "Le formateur est requis"),
  categoryId: number({
    required_error: "La catégorie est requise",
  }).min(1, "La catégorie est requise"),
});

const updateCourseSchema = object({
  title: string().min(1, "Le titre est requis"),
  description: string().min(1, "La description est requise"),
  price: number().min(1, "Le prix est requis"),
  trainerId: number().min(1, "Le formateur est requis"),
  categoryId: number().min(1, "La catégorie est requise"),
});

export { addCourseSchema, updateCourseSchema };
