'use client';

import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, ArrowLeft, Filter, Loader2, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

// API Response Interface
interface ApiArticle {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  comments: number;
}

// Component Article Interface
interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  comments: number;
}

interface FAQItem {
  question: string;
  answer: string;
}

const ArticlesPage: React.FC = () => {
  const locale = useLocale();
  const t = useTranslations('articles');
  const [selectedCategory, setSelectedCategory] = useState<string>(t('all'));
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  // Convert API date format (DD-MM-YYYY) to Date object
  const parseDate = (dateString: string): string => {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  };

  // Calculate read time based on description length
  const calculateReadTime = (description: string): string => {
    const wordsPerMinute = 200;
    const words = description.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} ${minutes === 1 ? t('minute') : t('minutes')}`;
  };

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`https://shazmlc.cloud/webhook/Blogs?lang=${apiLang}`);
        
        if (!response.ok) {
          throw new Error(t('fetchError'));
        }

        const apiArticles: ApiArticle[] = await response.json();

        // Transform API data to component format
        const transformedArticles: Article[] = apiArticles.map((apiArticle) => ({
          id: apiArticle.id,
          title: apiArticle.title,
          excerpt: apiArticle.description,
          category: apiArticle.category,
          image: apiArticle.image.startsWith('http') 
            ? apiArticle.image 
            : `https://shazmlc.cloud${apiArticle.image}`,
          date: parseDate(apiArticle.createdAt),
          author: t('author'),
          readTime: calculateReadTime(apiArticle.description),
          comments: apiArticle.comments,
        }));

        setArticles(transformedArticles);

        // Extract unique categories from articles
        const uniqueCategories = Array.from(
          new Set(transformedArticles.map((article) => article.category))
        );
        const allCategory = t('all');
        setCategories([allCategory, ...uniqueCategories]);
        // Reset selectedCategory to 'all' when data loads
        setSelectedCategory(allCategory);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(err instanceof Error ? err.message : t('errorMessage'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const filteredArticles: Article[] = articles.filter(article => {
    const matchesCategory = selectedCategory === t('all') || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get most read articles (sorted by comments count)
  const mostReadArticles = [...articles]
    .sort((a, b) => b.comments - a.comments)
    .slice(0, 4)
    .map((article) => article.title);

  // Get related articles (first 3 articles from different categories)
  const relatedArticles = articles
    .filter((article) => article.category !== selectedCategory || selectedCategory === t('all'))
    .slice(0, 3)
    .map((article) => article.title);

  const faqItems: FAQItem[] = [
    {
      question: t('faqItems.question1'),
      answer: t('faqItems.answer1')
    },
    {
      question: t('faqItems.question2'),
      answer: t('faqItems.answer2')
    },
    {
      question: t('faqItems.question3'),
      answer: t('faqItems.answer3')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100" dir="rtl">
      {/* Header Section */}
      <div className="bg-gradient-to-l from-teal-600 to-teal-700 text-white py-[10%] px-4">
        <div className=" mx-auto">
          <h1 className="text-7xl font-bold mb-4 text-center">{t('title')}</h1>
          <p className="text-4xl text-center text-teal-50 mb-8">
            {t('subtitle')}
          </p>
          
          {/* Search Bar */}
         {/* Search Bar */}
<div className="mx-auto max-w-4xl relative">
  <Search
    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
    size={20}
  />
  <input
    type="text"
    placeholder={t('searchPlaceholder')}
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full bg-white pr-12 pl-4 py-4 rounded-xl text-black placeholder-gray-500 shadow-lg focus:outline-none "
  />
</div>

        </div>
      </div>

      <div className="  mx-auto p-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Filter */}
            <div className="flex items-center gap-3 mb-8 flex-wrap">
              <Filter size={20} className="text-slate-600" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 cursor-pointer text-3xl py-2 rounded-full transition-all ${
                    selectedCategory === cat
                      ? 'bg-teal-600 text-white shadow-lg'
                      : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <p className="text-red-600 text-xl">{error}</p>
              </div>
            )}

            {/* Articles Grid */}
            {!isLoading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredArticles.length === 0 ? (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-slate-600 text-2xl">{t('noArticles')}</p>
                  </div>
                ) : (
                  filteredArticles.map(article => (
                <article
                  key={article.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-teal-600  text-white px-4 py-1 rounded-full text-sm">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-3xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-teal-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-slate-600 text-2xl mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-2 text-xl">
                        <Calendar size={16} />
                        <time dateTime={article.date}>
                          {new Date(article.date).toLocaleDateString('ar-SA', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                      </div>
                      <span className='text-xl'>{article.readTime}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-slate-400" />
                        <span className="text-xl text-slate-600">{article.author}</span>
                      </div>
                      <button className="text-teal-600 cursor-pointer text-2xl font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                        {t('readMore')}
                        <ArrowLeft size={16} />
                      </button>
                    </div>
                  </div>
                </article>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Most Read Articles */}
            <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
              <h3 className="text-3xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                {t('mostRead')}
              </h3>
              <div className="space-y-4">
                {mostReadArticles.length > 0 ? (
                  mostReadArticles.map((title, idx) => (
                    <div key={idx} className="flex gap-3 group cursor-pointer">
                      <span className="text-4xl font-bold text-teal-100 group-hover:text-teal-600 transition-colors">
                        {idx + 1}
                      </span>
                      <p className="text-slate-700 text-3xl group-hover:text-teal-600 transition-colors leading-relaxed">
                        {title}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-xl">{t('noArticles')}</p>
                )}
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-6 shadow-md text-white">
              <h3 className="text-4xl font-bold mb-4">{t('relatedArticles')}</h3>
              <div className="space-y-3">
                {relatedArticles.slice(0, 3).map((title, idx) => (
                  <div key={idx} className="pb-3 border-b border-teal-500 last:border-0">
                    <p className="text-2xl hover:text-teal-100 transition-colors cursor-pointer">
                      {title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl p-6 shadow-md mt-6">
              <h3 className="text-5xl font-bold text-slate-800 mb-4">{t('faq')}</h3>
              <div className="space-y-3">
                {faqItems.map((item, idx) => (
                  <details key={idx} className="group">
                    <summary className="cursor-pointer text-slate-700 font-semibold text-3xl list-none flex items-center justify-between py-2 hover:text-teal-600 transition-colors">
                      <span>{item.question}</span>
                      <span className="text-teal-600 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="text-slate-600 text-2xl mt-2 pr-4">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Social Media Section */}
      <footer className="bg-white py-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-4">
            <button 
              className="w-12 h-12 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              aria-label={t('socialMedia.facebook')}
            >
              <Facebook className="w-6 h-6" />
            </button>
            <button 
              className="w-12 h-12 bg-blue-400 cursor-pointer text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center"
              aria-label={t('socialMedia.twitter')}
            >
              <Twitter className="w-6 h-6" />
            </button>
            <button 
              className="w-12 h-12 cursor-pointer bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
              aria-label={t('socialMedia.instagram')}
            >
              <Instagram className="w-6 h-6" />
            </button>
            <button 
              className="w-12 h-12 cursor-pointer bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center"
              aria-label={t('socialMedia.linkedin')}
            >
              <Linkedin className="w-6 h-6" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ArticlesPage;