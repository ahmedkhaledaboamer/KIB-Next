import { useIntlayer } from "next-intlayer/server";

const MyComponent = () => {
  const content = useIntlayer("content");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};

export default MyComponent;
