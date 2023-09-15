import {
  createCategoryService,
  getCategoriesService,
} from "../../src/services/categories/category.services.js";

// Test de creation d'une catégorie
describe("createCategoryService", () => {
  it("Doit retourner une erreur si le nom de la catégorie existe déjà", () => {
    expect(createCategoryService({ name: "Plomberie" })).rejects.toThrow(
      "La catégorie existe déjà."
    );
  });

  it("Doit retourner une erreur si le nom de la catégorie est vide", () => {
    expect(createCategoryService({ name: "" })).rejects.toThrow(
      "Le nom de la catégorie est requis."
    );
  });

  it("Doit retourner une erreur si le nom de la catégorie a un nombre de caractères > 20", () => {
    expect(
      createCategoryService({
        name: "Unnomdecatégoriequiestsuperieureà20caractères",
      })
    ).rejects.toThrow("Le nom ne peut pas dépasser 20 caractères");
  });
});

// Test de recuperation des categories
describe("getCategoriesService", () => {
  it("Doit retourner une liste de catégories", () => {
    expect(getCategoriesService()).resolves.toBeInstanceOf(Array);
  });
});
