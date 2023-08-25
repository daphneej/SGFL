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

export { registerUserSchema, loginUserSchema, updateUserSchema, addUserSchema };
