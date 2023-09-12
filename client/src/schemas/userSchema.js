import { object, string } from "zod";

const registerUserSchema = object({
  email: string({
    required_error: "L'adresse email est requise",
  }).email({
    message: "Le format de l'email est invalide",
  }),
  password: string({
    required_error: "Le mot de passe est requis",
  }).min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères",
  }),
  confirmPassword: string({
    required_error: "La confirmation du mot de passe est requise",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

const loginUserSchema = object({
  email: string({
    required_error: "L'adresse email est requise",
  }).email({
    message: "Le format de l'adresse email est invalide",
  }),
  password: string({
    required_error: "Le mot de passe est requis",
  }).min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères",
  }),
});

const addUserSchema = object({
  firstName: string()
    .trim()
    .min(1, "Le prénom est requis")
    .refine((value) => value.trim() !== "", {
      message: "Le prénom est requis",
    })
    .refine((value) => value.length <= 50, {
      message: "Le prénom ne peut pas dépasser 50 caractères",
    }),
  lastName: string()
    .trim()
    .min(1, "Le nom de famille est requis")
    .refine((value) => value.trim() !== "", {
      message: "Le nom de famille est requis",
    })
    .refine((value) => value.length <= 50, {
      message: "Le nom de famille ne peut pas dépasser 50 caractères",
    }),
  email: string()
    .trim()
    .min(1, "L'adresse email est requise")
    .email("Le format de l'email est invalide"),
  role: string()
    .trim()
    .min(1, "Le rôle est requis")
    .refine((value) => value.trim() !== "", {
      message: "Le rôle est requis",
    }),
  password: string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .refine((value) => value.trim() !== "", {
      message: "Le mot de passe est requis",
    }),
  gender: string()
    .trim()
    .min(1, "Le sexe est requis")
    .refine((value) => value.trim() !== "", {
      message: "Le sexe est requis",
    }),
  address: string()
    .trim()
    .min(1, "L'adresse est requise")
    .refine((value) => value.trim() !== "", {
      message: "L'adresse est requise",
    }),
  phone: string()
    .trim()
    .min(1, "Le numéro de téléphone est requis")
    .refine((value) => value.trim() !== "", {
      message: "Le numéro de téléphone est requis",
    }),
  status: string()
    .trim()
    .min(1, "Le statut est requis")
    .refine((value) => value.trim() !== "", {
      message: "Le statut est requis",
    }),
});

const updateUserSchema = object({
  firstName: string()
    .optional()
    .refine((value) => value.length <= 50, {
      message: "Le prénom ne peut pas dépasser 50 caractères",
    }),
  lastName: string()
    .optional()
    .refine((value) => value.length <= 50, {
      message: "Le nom de famille ne peut pas dépasser 50 caractères",
    }),
  email: string().email("Le format de l'email est invalide").optional(),
  role: string().optional(),
  gender: string().optional(),
  address: string().optional(),
  phone: string().optional(),
  status: string().optional(),
});

export { addUserSchema, updateUserSchema, registerUserSchema, loginUserSchema };
