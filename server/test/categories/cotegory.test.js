import { createCategoryService } from "../../src/services/categories/category.services.js";

describe("createCategoryService", () => {
  it("Doit créer une catégorie avec succès", async () => {
    expect(await createCategoryService("Plomberie")).toMatchObject({
      id: expect.any(Number),
      name: "Plomberie",
    });
  });

  it("Doit retourner une erreur si la catégorie existe déjà", () => {
    expect(createCategoryService("Plomberie")).rejects.toThrow(
      "La catégorie existe déjà."
    );
  });

  it("Doit retourner une erreur si le nom de la catégorie est vide", () => {
    expect(createCategoryService("")).rejects.toThrow(
      "Le nom de la catégorie est requis."
    );
  });

  it("Doit retourner une erreur si le nom de la catégorie a un nombre de caractères > 20", () => {
    expect(
      createCategoryService("JHKJSKJSJKSJSJKSJKSSKJHJSJHDHJDHJDH")
    ).rejects.toThrow("Le nom ne peut pas dépasser 20 caractères");
  });
});
