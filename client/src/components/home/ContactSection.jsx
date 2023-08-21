import { useState } from "react";
import contactImage from "../../assets/images/contact.png";

const ContactSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);

  return (
    <section id="contact" className="py-12 md:py-24 min-h-screen bg-base-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8 text-center md:text-left md:flex-row-reverse">
          <div className="flex justify-center rounded-md">
            <img
              src={contactImage}
              alt="Contact Image"
              className="w-2/3 h-2/3 object-contain"
            />
          </div>
          <div className="">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Nous contacter
            </h2>
            <p className="text-lg mb-6">
              Vous avez des questions, des commentaires ou des demandes
              spécifiques ? N'hésitez pas à nous contacter en utilisant le
              formulaire ci-dessous. Notre équipe sera ravie de vous répondre
              dans les plus brefs délais.
            </p>
            <form>
              <div className="mb-8">
                <label htmlFor="name" className="block text-lg font-medium">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Votre nom complet"
                  className="w-full px-4 py-2 mt-2 rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-primary bg-base-100"
                />
              </div>
              <div className="mb-8">
                <label htmlFor="email" className="block text-lg font-medium">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Votre adresse e-mail"
                  className="w-full px-4 py-2 mt-2 rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-primary bg-base-100"
                />
              </div>
              <div className="mb-8">
                <label htmlFor="message" className="block text-lg font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Votre message"
                  className="w-full px-4 py-2 mt-2 rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-primary bg-base-100 resize-none"
                />
              </div>
              <button
                type="submit"
                className={`w-full px-4 py-2 rounded-lg ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-focus"
                } text-white font-semibold`}
                disabled={emptyInput || isLoading}
              >
                {isLoading ? (
                  <div className="loading"></div>
                ) : (
                  <span>Envoyer</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
