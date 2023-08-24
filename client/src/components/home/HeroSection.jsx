import { Link } from "react-router-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";
import heroImage from "@/assets/images/hero.jpg";

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen py-10 hero bg-base-100">
      <div className="container px-4 py-12 mx-auto md:py-24">
        <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h2 className="mb-4 text-xl font-bold md:text-2xl lg:text-3xl">
              Explorez de nouveaux horizons d'apprentissage
            </h2>
            <p className="my-6">
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
            <div className="flex flex-col justify-center gap-4 md:flex-row md:justify-start">
              <Link
                to="/register"
                className="text-white btn bg-primary hover:bg-neutral"
              >
                Nous Rejoindre
              </Link>
              <AnchorLink
                href="#about"
                className="btn btn-outline hover:bg-neutral hover:text-white hover:border-primary"
              >
                En Savoir Plus
              </AnchorLink>
            </div>
          </div>
          <div className="justify-end hidden md:flex">
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
