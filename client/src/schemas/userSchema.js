import { array, number, object, string } from "zod";

const addUserSchema = object({
  firstName: string({
    invalid_type_error: "Le type du prénom est invalide",
  }).optional(),
  lastName: string({
    invalid_type_error: "Le type du nom de famille est invalide",
  }).optional(),
  email: string({
    required_error: "L'adresse email est requise",
  }).email({
    message: "Le format de l'email est invalide",
  }),
  role: string({
    invalid_type_error: "Le type du role est invalide",
  }).optional(),
  password: string({
    required_error: "Le mot de passe est requis",
    invalid_type_error: "Le type du mot de passe est invalide",
  }).min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  gender: string({
    invalid_type_error: "Le type du genre est invalide",
  }).optional(),
  address: string({
    invalid_type_error: "Le type de l'adresse est invalide",
  }).optional(),
  phone: string({
    invalid_type_error: "Le type du numéro de téléphone est invalide",
  }).optional(),
  status: string({
    invalid_type_error: "Le type du statut est invalide",
  }).optional(),
  coursesInCart: array(
    object({
      id: number(),
    }).optional()
  ).optional(),
});

export { addUserSchema };
