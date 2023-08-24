import { array, number, object, string } from "zod";

const registerUserSchema = object({
  email: string({
    required_error: "L'adresse email est requise",
  }).email({
    message: "Le format de l'email est invalide",
  }),
  role: string().optional(),
  password: string({
    invalid_type_error: "Le type de mot de passe est invalide",
    required_error: "Le mot de passe est requis",
  }).min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères",
  }),
  confirmPassword: string({
    invalid_type_error:
      "Le type de la confirmation du mot de passe est invalide",
    required_error: "La confirmation du mot de passe est requise",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["password", "confirmPassword"],
});

const loginUserSchema = object({
  email: string({
    required_error: "L'adresse email est requise",
  }).email({
    message: "Le format de l'adresse email est invalide",
  }),
  password: string({
    invalid_type_error: "Le type de mot de passe est invalide",
    required_error: "Le mot de passe est requis",
  }).min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères",
  }),
});

const updateUserSchema = object({
  firstName: string({
    invalid_type_error: "Le type du prénom est invalide",
  }).optional(),
  lastName: string({
    invalid_type_error: "Le type du nom de famille est invalide",
  }).optional(),
  email: string()
    .email({
      message: "Le format de l'email est invalide",
    })
    .optional(),
  role: string().optional(),
  password: string({
    invalid_type_error: "Le type du mot de passe est invalide",
  })
    .min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères",
    })
    .optional(),
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
  address: string({
    invalid_type_error: "Le type de l'adresse est invalide",
  }).optional(),
  phone: string({
    invalid_type_error: "Le type du numéro de téléphone est invalide",
  }).optional(),
  gender: string({
    invalid_type_error: "Le type du genre est invalide",
  }).optional(),
  password: string({
    required_error: "Le mot de passe est requis",
    invalid_type_error: "Le type du mot de passe est invalide",
  }).min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  role: string({
    invalid_type_error: "Le type du role est invalide",
  }).optional(),
  status: string({
    invalid_type_error: "Le type du statut est invalide",
  }).optional(),
});

export { registerUserSchema, loginUserSchema, updateUserSchema, addUserSchema };
