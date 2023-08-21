import { Link } from "react-router-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";
import heroImage from "../../assets/images/hero.jpg";

const HeroSection = () => {
  return (
    <section id="hero" className="hero py-10 min-h-screen bg-base-100">
      <div className="container mx-auto py-12 md:py-24 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Explorez de nouveaux horizons d'apprentissage
            </h2>
            <p className="text-lg md:text-xl my-6">
              Notre plateforme vous propose une sélection variée de cours de
              haute qualité dans les domaines de l'
              <span className="underline">électricité</span>, de la{" "}
              <span className="underline">climatisation</span>, de l'
              <span className="underline">électronique automobile</span> et bien
              plus encore. Nos formateurs expérimentés sont passionnés par leur
              domaine et sont déterminés à vous aider à développer vos
              compétences et à réussir dans votre parcours professionnel.
              Rejoignez-nous dès aujourd'hui pour découvrir le pouvoir de
              l'apprentissage en ligne.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/register"
                className="btn btn-primary py-2 px-6 md:px-8"
              >
                Nous Rejoindre
              </Link>
              <AnchorLink
                href="#about"
                className="btn btn-outline py-2 px-6 md:px-8"
              >
                En Savoir Plus
              </AnchorLink>
            </div>
          </div>
          <div className="md:flex justify-end">
            <img
              src={heroImage}
              alt="Hero Image"
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
