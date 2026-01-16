'use client';

import React, { useState, useEffect, JSX } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, User, ArrowLeft, Loader2, Clock, MessageCircle, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
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

  // Map locale to API language parameter
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

  // Calculate read time based on all text content
  const calculateReadTime = (article: ArticleDetailData | null): string => {
    if (!article) return `1 ${t('minute')}`;
    
    const wordsPerMinute = 200;
    let totalWords = 0;
    
    // Count words in description
    if (article.description) {
      totalWords += article.description.split(/\s+/).filter(word => word.length > 0).length;
    }
    
    // Count words in all sections
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

  // Format date
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Fetch article detail
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

  // Render section based on type
  const renderSection = (section: ArticleSection, index: number) => {
    if (section.type === 'heading') {
      const HeadingTag = `h${section.level || 2}` as keyof JSX.IntrinsicElements;
      const headingClasses = {
        1: 'text-5xl font-bold text-slate-800 mb-6 mt-8',
        2: 'text-4xl font-bold text-slate-800 mb-4 mt-6',
        3: 'text-3xl font-semibold text-slate-700 mb-3 mt-5',
        4: 'text-2xl font-semibold text-slate-700 mb-2 mt-4',
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
          className="text-2xl text-slate-600 leading-relaxed mb-4"
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
          <p className="text-2xl text-slate-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center max-w-2xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">{t('errorTitle')}</h1>
          <p className="text-2xl text-slate-600 mb-6">{error || t('articleNotFound')}</p>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors text-xl"
          >
            <ArrowLeft size={20} />
            {t('backToArticles')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header Section */}
      <div className="bg-gradient-to-l from-teal-600 to-teal-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors text-xl"
          >
            <ArrowLeft size={20} />
            {t('backToArticles')}
          </Link>
          
          <div className="mb-4">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xl">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-2xl text-teal-50 mb-6 ">
            {article.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <time dateTime={article.createdAt}>
                {formatDate(article.createdAt)}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span>{calculateReadTime(article)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={20} />
              <span>{t('author')}</span>
            </div>
            {article.comments > 0 && (
              <div className="flex items-center gap-2">
                <MessageCircle size={20} />
                <span>{article.comments} {t('comments')}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Image */}
      {article.image && (
        <div className="max-w-7xl mx-auto px-4 -mt-8 mb-8">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-[500px] md:h-[600px] object-cover"
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {article.sections && article.sections.length > 0 ? (
            <article className="prose prose-lg max-w-none">
              {article.sections.map((section, index) => renderSection(section, index))}
            </article>
          ) : (
            <p className="text-2xl text-slate-600">{t('noContent')}</p>
          )}
        </div>
      </div>

      {/* Social Media Share Section */}
      <div className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center gap-6">
            <h3 className="text-3xl font-bold text-slate-800">{t('shareArticle')}</h3>
            <div className="flex items-center justify-center gap-4">
              <button 
                className="w-14 h-14 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center cursor-pointer"
                aria-label={t('socialMedia.facebook')}
              >
                <Facebook className="w-7 h-7" />
              </button>
              <button 
                className="w-14 h-14 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center cursor-pointer"
                aria-label={t('socialMedia.twitter')}
              >
                <Twitter className="w-7 h-7" />
              </button>
              <button 
                className="w-14 h-14 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center cursor-pointer"
                aria-label={t('socialMedia.instagram')}
              >
                <Instagram className="w-7 h-7" />
              </button>
              <button 
                className="w-14 h-14 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center cursor-pointer"
                aria-label={t('socialMedia.linkedin')}
              >
                <Linkedin className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;

