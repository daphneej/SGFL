import { Link } from "react-router-dom";

import electricity from "@/assets/icons/electricity-icon.png";
import climatisation from "@/assets/icons/climatisation-icon.png";
import electroniqueAutomobile from "@/assets/icons/electronique-icon.png";

const FormationSection = () => {
  const formations = [
    {
      title: "Cours d'Électricité",
      description:
        "Découvrez nos cours d'électricité enseignés par des professionnels qualifiés. Apprenez les bases de l'électricité, la sécurité électrique, et devenez un expert dans le domaine.",
      icon: electricity,
    },
    {
      title: "Cours de Climatisation",
      description:
        "Maîtrisez les systèmes de climatisation et de ventilation avec nos formations spécialisées. Acquérez des compétences pratiques pour l'installation et l'entretien des systèmes de climatisation.",
      icon: climatisation,
    },
    {
      title: "Cours d'Électronique Automobile",
      description:
        "Plongez dans le monde de l'électronique automobile et apprenez à diagnostiquer et réparer les systèmes électroniques des véhicules. Devenez un expert de l'électronique embarquée.",
      icon: electroniqueAutomobile,
    },
  ];

  return (
    <section id="formations" className="min-h-screen py-10 bg-base-100">
      <div className="container px-4 py-12 mx-auto md:py-24">
        <h2 className="mb-4 text-xl font-bold text-center md:text-2xl lg:text-3xl">
          Nos offres de formation
        </h2>
        <div className="flex flex-wrap justify-center gap-8 my-8 text-center">
          {formations.map((formation, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-sm w-96 shadow-primary"
            >
              <img
                src={formation.icon}
                alt={formation.title}
                className="w-16 h-16 p-3 mx-auto mb-4 bg-gray-100 rounded-full shadow-md"
              />
              <h3 className="mb-2 text-xl font-semibold">{formation.title}</h3>
              <p>{formation.description}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center mt-8 text-center md:w-[50%] mx-auto gap-8">
          <p className="">
            Nous continuellement ajoutons de nouveaux cours pour élargir notre
            offre de formation. Restez à l'écoute pour découvrir nos prochaines
            formations passionnantes !
          </p>

          <Link
            to={"/courses"}
            className="text-white btn bg-primary hover:bg-neutral"
          >
            Parcourir les Cours
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FormationSection;
