import { useTranslations } from 'next-intl';

const MyComponent = () => {
  const t = useTranslations('content');
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
};

export default MyComponent;
