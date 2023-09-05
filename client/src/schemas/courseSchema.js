import { object, string, number } from "zod";

// Custom validation function to check allowed video file extensions
function allowedVideoExtensions(extensions) {
  return string().refine(
    (value) => {
      const fileExtension = value.split(".").pop().toLowerCase();
      return extensions.includes(fileExtension);
    },
    {
      message: "Le type du fichier vidéo est invalide",
    }
  );
}

// Custom validation function to check allowed image file extensions
function allowedImageExtensions(extensions) {
  return string().refine(
    (value) => {
      const fileExtension = value.split(".").pop().toLowerCase();
      return extensions.includes(fileExtension);
    },
    {
      message: "Le type du fichier image est invalide",
    }
  );
}

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
  thumbnail: object({
    0: object(
      {
        name: string(),
        size: number(),
        type: allowedImageExtensions([
          "image/png",
          "image/jpg",
          "image/gif",
          "image/jpeg",
          "image/webp",
        ]),
      },
      {
        required_error: "La photo de couverture est requise",
      }
    ),
  }),
  video: object(
    {
      0: object(
        {
          name: string(),
          size: number(),
          type: allowedVideoExtensions([
            "video/mp4",
            "video/webm",
            "video/ogg",
            "video/quicktime",
            "video/x-flv",
            "video/x-matroska",
            "video/x-msvideo",
            "video/x-ms-wmv",
            "video/x-ms-asf",
          ]),
        },
        {
          required_error: "La vidéo du cours est requise",
        }
      ),
    },
    { required_error: "La vidéo du cours est requise" }
  ),
  published: number().optional().default(0),
});

const updateCourseSchema = object({
  title: string().min(1, "Le titre est requis"),
  description: string().min(1, "La description est requise"),
  price: number().min(1, "Le prix est requis"),
  trainerId: number().min(1, "Le formateur est requis"),
  categoryId: number().min(1, "La catégorie est requise"),
  published: number().optional(),
});

export { addCourseSchema, updateCourseSchema };
