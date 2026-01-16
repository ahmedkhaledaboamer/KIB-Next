'use client';

import React, { useState, useEffect, JSX } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, User, ArrowLeft, Loader2, Clock, MessageCircle, Facebook, Twitter, Instagram, Linkedin, Eye } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

interface ArticleSection {
  type: 'heading' | 'paragraph';
  level?: number;
  text: string;
}

interface ArticleDetailData {
  category: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  comments: number;
  sections: ArticleSection[];
}

const ArticleDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('articles');
  const [article, setArticle] = useState<ArticleDetailData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isRTL = locale === 'ar';

  const localeMap: Record<string, string> = {
    ar: 'ar',
    en: 'en',
    fr: 'fr',
    de: 'de',
    es: 'es',
    it: 'it',
  };

  const apiLang = localeMap[locale] || 'ar';
  const articleId = params?.id as string;

  const calculateReadTime = (article: ArticleDetailData | null): string => {
    if (!article) return `1 ${t('minute')}`;
    
    const wordsPerMinute = 200;
    let totalWords = 0;
    
    if (article.description) {
      totalWords += article.description.split(/\s+/).filter(word => word.length > 0).length;
    }
    
    if (article.sections) {
      article.sections.forEach(section => {
        if (section.text) {
          totalWords += section.text.split(/\s+/).filter(word => word.length > 0).length;
        }
      });
    }
    
    const minutes = Math.max(1, Math.ceil(totalWords / wordsPerMinute));
    return `${minutes} ${minutes === 1 ? t('minute') : t('minutes')}`;
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) {
        setError(t('articleNotFound'));
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`https://shazmlc.cloud/webhook/blogs1?lang=${apiLang}&id=${articleId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(t('fetchError'));
        }

        const data: ArticleDetailData[] = await response.json();
        
        if (!data || data.length === 0) {
          throw new Error(t('articleNotFound'));
        }

        setArticle(data[0]);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(err instanceof Error ? err.message : t('errorMessage'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [articleId, apiLang, t]);

  const renderSection = (section: ArticleSection, index: number) => {
    if (section.type === 'heading') {
      const HeadingTag = `h${section.level || 2}` as keyof JSX.IntrinsicElements;
      const headingClasses = {
        1: 'text-3xl md:text-4xl font-bold text-slate-900 mb-6 mt-10 pb-3 border-b-2 border-teal-500',
        2: 'text-2xl md:text-3xl font-bold text-slate-800 mb-5 mt-8',
        3: 'text-xl md:text-2xl font-semibold text-slate-700 mb-4 mt-6',
        4: 'text-lg md:text-xl font-semibold text-slate-700 mb-3 mt-5',
      };
      
      return (
        <HeadingTag
          key={index}
          className={headingClasses[section.level as keyof typeof headingClasses] || headingClasses[2]}
        >
          {section.text}
        </HeadingTag>
      );
    } else if (section.type === 'paragraph') {
      return (
        <p
          key={index}
          className="text-base md:text-lg text-slate-700 leading-loose mb-5 text-justify"
        >
          {section.text}
        </p>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-xl text-slate-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center max-w-2xl mx-auto p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">{t('errorTitle')}</h1>
          <p className="text-lg text-slate-600 mb-6">{error || t('articleNotFound')}</p>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            <ArrowLeft size={20} />
            {t('backToArticles')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Image Section */}
      {article.image && (
        <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 z-10"></div>
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          
          {/* Back Button */}
          <div className="absolute top-6 left-6 md:left-8 z-20">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all border border-white/30"
            >
              <ArrowLeft size={18} />
              <span className="text-sm md:text-base">{t('backToArticles')}</span>
            </Link>
          </div>

          {/* Category Badge */}
          <div className="absolute top-6 right-6 md:right-8 z-20">
            <span className="inline-block bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              {article.category}
            </span>
          </div>
        </div>
      )}

      {/* Article Header */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-20 relative z-20">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
            {article.description}
          </p>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base text-slate-500 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-teal-600" />
              <time dateTime={article.createdAt}>
                {formatDate(article.createdAt)}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-teal-600" />
              <span>{calculateReadTime(article)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={18} className="text-teal-600" />
              <span>{t('author')}</span>
            </div>
            {article.comments > 0 && (
              <div className="flex items-center gap-2">
                <MessageCircle size={18} className="text-teal-600" />
                <span>{article.comments} {t('comments')}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          {article.sections && article.sections.length > 0 ? (
            <article className="prose prose-slate max-w-none">
              {article.sections.map((section, index) => renderSection(section, index))}
            </article>
          ) : (
            <p className="text-lg text-slate-600">{t('noContent')}</p>
          )}
          
          {/* Back to Articles Button */}
          <div className="mt-10 pt-8 border-t border-slate-200">
            <Link
              href="/articles"
              className="inline-flex items-center gap-3 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all shadow-md hover:shadow-lg font-semibold"
            >
              <ArrowLeft size={20} />
              <span>{t('backToArticles')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Share Section */}
      <div className="bg-gradient-to-r from-slate-100 to-slate-50 border-t border-slate-200 py-10 md:py-12">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{t('shareArticle')}</h3>
              <p className="text-slate-600">شارك هذا المقال مع أصدقائك</p>
            </div>
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-8">
              <button 
                className="w-12 h-12 md:w-14 md:h-14 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:scale-110 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                aria-label={t('socialMedia.facebook')}
              >
                <Facebook className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button 
                className="w-12 h-12 md:w-14 md:h-14 bg-blue-400 text-white rounded-xl hover:bg-blue-500 hover:scale-110 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                aria-label={t('socialMedia.twitter')}
              >
                <Twitter className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button 
                className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white rounded-xl hover:opacity-90 hover:scale-110 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                aria-label={t('socialMedia.instagram')}
              >
                <Instagram className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button 
                className="w-12 h-12 md:w-14 md:h-14 bg-blue-700 text-white rounded-xl hover:bg-blue-800 hover:scale-110 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                aria-label={t('socialMedia.linkedin')}
              >
                <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
            
            {/* Back to Articles Button */}
            <div className="flex justify-center pt-6 border-t border-slate-200">
              <Link
                href="/articles"
                className="inline-flex items-center gap-3 bg-teal-600 text-white px-8 py-4 rounded-xl hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl font-semibold text-lg"
              >
                <ArrowLeft size={22} />
                <span>{t('backToArticles')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;