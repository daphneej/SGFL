import { object, string } from "zod";

const addUserSchema = object({
  firstName: string({
    invalid_type_error: "Le type du prénom est invalide",
  })
    .trim()
    .min(1, "Le prénom est requis")
    .refine((value) => value.trim() !== "", {
      message: "Le prénom est requis",
    })
    .refine((value) => value.length <= 50, {
      message: "Le prénom ne peut pas dépasser 50 caractères",
    }),
  lastName: string({
    invalid_type_error: "Le type du nom de famille est invalide",
  })
    .trim()
    .min(1, "Le nom de famille est requis")
    .refine((value) => value.trim() !== "", {
      message: "Le nom de famille est requis",
    })
    .refine((value) => value.length <= 50, {
      message: "Le nom de famille ne peut pas dépasser 50 caractères",
    }),
  email: string({
    invalid_type_error: "Le type de l'adresse email est invalide",
  })
    .trim()
    .min(1, "L'adresse email est requise")
    .email("Le format de l'email est invalide"),
  role: string({
    invalid_type_error: "Le type du rôle est invalide",
  })
    .trim()
    .min(1, "Le rôle est requis")
    .refine((value) => value.trim() !== "", {
      message: "Le rôle est requis",
    })
    .refine((value) => value.length <= 50, {
      message: "Le rôle ne peut pas dépasser 50 caractères",
    }),
  password: string({
    invalid_type_error: "Le type du mot de passe est invalide",
  })
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .refine((value) => value.trim() !== "", {
      message: "Le mot de passe est requis",
    }),
  gender: string({
    invalid_type_error: "Le type du sexe est invalide",
  })
    .trim()
    .min(1, "Le sexe est requis")
    .refine((value) => value.trim() !== "", {
      message: "Le sexe est requis",
    }),
  address: string({
    invalid_type_error: "Le type de l'adresse est invalide",
  })
    .trim()
    .min(1, "L'adresse est requise")
    .refine((value) => value.trim() !== "", {
      message: "L'adresse est requise",
    }),
  phone: string({
    invalid_type_error: "Le type du numéro de téléphone est invalide",
  })
    .trim()
    .min(1, "Le numéro de téléphone est requis")
    .refine((value) => value.trim() !== "", {
      message: "Le numéro de téléphone est requis",
    }),
  status: string({
    invalid_type_error: "Le type du statut est invalide",
  })
    .trim()
    .min(1, "Le statut est requis")
    .refine((value) => value.trim() !== "", {
      message: "Le statut est requis",
    }),
});

const updateUserSchema = object({
  firstName: string({
    invalid_type_error: "Le type du prénom est invalide",
  })
    .trim()
    .min(1, "Le prénom est requis")
    .refine((value) => value.trim() !== "", {
      message: "Le prénom est requis",
    })
    .refine((value) => value.length <= 50, {
      message: "Le prénom ne peut pas dépasser 50 caractères",
    }),
  lastName: string({
    invalid_type_error: "Le type du nom de famille est invalide",
  })
    .trim()
    .min(1, "Le nom de famille est requis")
    .refine((value) => value.trim() !== "", {
      message: "Le nom de famille est requis",
    })
    .refine((value) => value.length <= 50, {
      message: "Le nom de famille ne peut pas dépasser 50 caractères",
    }),
  email: string({
    invalid_type_error: "Le type de l'adresse email est invalide",
  })
    .trim()
    .min(1, "L'adresse email est requise")
    .email("Le format de l'email est invalide"),
  role: string({
    invalid_type_error: "Le type du rôle est invalide",
  })
    .trim()
    .min(1, "Le rôle est requis")
    .refine((value) => value.trim() !== "", {
      message: "Le rôle est requis",
    })
    .refine((value) => value.length <= 50, {
      message: "Le rôle ne peut pas dépasser 50 caractères",
    }),
  gender: string({
    invalid_type_error: "Le type du sexe est invalide",
  })
    .trim()
    .min(1, "Le sexe est requis")
    .refine((value) => value.trim() !== "", {
      message: "Le sexe est requis",
    }),
  address: string({
    invalid_type_error: "Le type de l'adresse est invalide",
  })
    .trim()
    .min(1, "L'adresse est requise")
    .refine((value) => value.trim() !== "", {
      message: "L'adresse est requise",
    }),
  phone: string({
    invalid_type_error: "Le type du numéro de téléphone est invalide",
  })
    .trim()
    .min(1, "Le numéro de téléphone est requis")
    .refine((value) => value.trim() !== "", {
      message: "Le numéro de téléphone est requis",
    }),
  status: string({
    invalid_type_error: "Le type du statut est invalide",
  })
    .trim()
    .min(1, "Le statut est requis")
    .refine((value) => value.trim() !== "", {
      message: "Le statut est requis",
    }),
});

export { addUserSchema, updateUserSchema };
