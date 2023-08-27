import { useState } from "react";
import contactImage from "@/assets/images/contact.png";

const ContactSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);

  return (
    <section id="contact" className="min-h-screen py-12 md:py-24 bg-base-200">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col gap-8 text-center md:text-left md:flex-row-reverse">
          <div className="flex justify-center rounded-md">
            <img
              src={contactImage}
              alt="Contact Image"
              className="object-contain w-2/3 h-2/3"
            />
          </div>
          <div className="p-6 rounded-md bg-base-300">
            <h2 className="mb-4 text-xl font-bold md:text-2xl lg:text-3xl">
              Nous contacter
            </h2>
            <p className="mb-6">
              Vous avez des questions, des commentaires ou des demandes
              spécifiques ? N'hésitez pas à nous contacter. Notre équipe sera
              ravie de vous répondre dans les plus brefs délais.
            </p>
            <form className="text-left">
              <div className="mb-8">
                <label htmlFor="name" className="font-medium text-md">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Votre nom complet"
                  className="w-full px-4 py-2 mt-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-100"
                />
              </div>
              <div className="mb-8">
                <label htmlFor="email" className="font-medium text-md">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Votre adresse e-mail"
                  className="w-full px-4 py-2 mt-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-100"
                />
              </div>
              <div className="mb-8">
                <label htmlFor="message" className="font-medium text-md">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Votre message"
                  className="w-full px-4 py-2 mt-2 border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-primary bg-base-100"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white btn bg-primary hover:bg-neutral"
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
