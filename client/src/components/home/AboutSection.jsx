import AnchorLink from "react-anchor-link-smooth-scroll";
import aboutImage from "../../assets/images/about.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-10 min-h-screen bg-base-200">
      <div className="container mx-auto py-12 md:py-24 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="md:flex justify-end">
            <img
              src={aboutImage}
              alt="About Image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Découvrez notre plateforme d'apprentissage
            </h2>
            <p className="text-lg md:text-xl my-6">
              Nous sommes dédiés à fournir une expérience d'apprentissage de
              qualité supérieure dans un large éventail de domaines
              passionnants. Que vous souhaitiez vous spécialiser dans
              l'électricité, la climatisation, l'électronique automobile ou
              d'autres sujets captivants, nous sommes là pour vous aider à
              développer vos compétences et à progresser dans votre parcours
              professionnel.
            </p>
            <p className="text-lg md:text-xl mb-6">
              Notre approche pédagogique interactive et pratique vise à offrir
              des cours adaptés à tous les niveaux, que vous soyez débutant
              cherchant à acquérir de nouvelles compétences ou professionnel en
              quête de perfectionnement. Rejoignez-nous dès aujourd'hui pour
              explorer de nouvelles opportunités d'apprentissage en ligne et
              atteindre vos objectifs avec succès.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <AnchorLink
                href="#formations"
                className="btn btn-primary py-2 px-4 md:px-6"
              >
                Explorer les Formations
              </AnchorLink>
              <AnchorLink
                href="#contact"
                className="btn btn-outline py-2 px-4 md:px-6"
              >
                Nous Contacter
              </AnchorLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
