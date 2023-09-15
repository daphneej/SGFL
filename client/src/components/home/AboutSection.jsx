import AnchorLink from "react-anchor-link-smooth-scroll";
import aboutImage from "@/assets/images/about.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen py-10 bg-base-200">
      <div className="container px-4 py-12 mx-auto md:py-24">
        <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
          <div className="justify-end md:flex">
            <img
              loading="lazy"
              src={aboutImage}
              alt="About Image"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="mb-4 text-xl font-bold md:text-2xl lg:text-3xl">
              Découvrez notre plateforme d'apprentissage
            </h2>
            <p className="my-6">
              Nous sommes dédiés à fournir une expérience d'apprentissage de
              qualité supérieure dans un large éventail de domaines
              passionnants. Que vous souhaitiez vous spécialiser dans
              l'électricité, la climatisation, l'électronique automobile ou
              d'autres sujets captivants, nous sommes là pour vous aider à
              développer vos compétences et à progresser dans votre parcours
              professionnel.
            </p>
            <p className="my-6">
              Notre approche pédagogique interactive et pratique vise à offrir
              des cours adaptés à tous les niveaux, que vous soyez débutant
              cherchant à acquérir de nouvelles compétences ou professionnel en
              quête de perfectionnement. Rejoignez-nous dès aujourd'hui pour
              explorer de nouvelles opportunités d'apprentissage en ligne et
              atteindre vos objectifs avec succès.
            </p>
            <div className="flex flex-col justify-center gap-4 md:flex-row md:justify-start">
              <AnchorLink
                href="#formations"
                className="text-white btn bg-primary hover:bg-neutral"
              >
                Explorer les Formations
              </AnchorLink>
              <AnchorLink
                href="#contact"
                className="btn btn-outline hover:bg-neutral hover:text-white hover:border-primary"
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
