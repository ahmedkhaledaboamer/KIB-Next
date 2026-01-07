import { t, type Dictionary } from "intlayer";

const myComponentContent = {
  key: "content",
  content: {
    title: t({
      en: "My Component",
      fr: "Mon Component",
      ar: "المكون",
      es: "El Componente",
    }),
    description: t({
      en: "My Component Description",
      fr: "Description du Component",
      ar: "وصف المكون",
      es: "Descripción del Componente",
    }),
  },
} satisfies Dictionary;

export default myComponentContent;
