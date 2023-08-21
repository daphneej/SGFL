import { Link } from "react-router-dom";

import electricity from "../../assets/icons/electricity-icon.png";
import climatisation from "../../assets/icons/climatisation-icon.png";
import electroniqueAutomobile from "../../assets/icons/electronique-icon.png";

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
    <section id="formations" className="py-10 min-h-screen bg-base-100">
      <div className="container mx-auto py-12 md:py-24 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
          Nos offres de formation
        </h2>
        <div className="flex flex-wrap justify-center gap-8 text-center my-8">
          {formations.map((formation, index) => (
            <div
              key={index}
              className="w-96 p-6 rounded-lg shadow-sm shadow-primary"
            >
              <img
                src={formation.icon}
                alt={formation.title}
                className="w-16 h-16 p-3 mx-auto mb-4 bg-gray-100 rounded-full shadow-md"
              />
              <h3 className="text-xl font-semibold mb-4">{formation.title}</h3>
              <p>{formation.description}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center mt-8 text-center md:w-[50%] mx-auto gap-8">
          <p className="text-lg">
            Nous continuellement ajoutons de nouveaux cours pour élargir notre
            offre de formation. Restez à l'écoute pour découvrir nos prochaines
            formations passionnantes !
          </p>

          <Link
            to={"/courses"}
            className="btn btn-primary w-full md:w-fit py-2 px-6 md:px-8"
          >
            Parcourir les Cours
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FormationSection;
