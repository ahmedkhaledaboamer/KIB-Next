"use client";

import { useTranslations } from 'next-intl';

export default function Legal() {
    const t = useTranslations("legal");
    
    const services = [
      {
        title: { highlight: t("services.contractReview.title"), rest: t("services.contractReview.titleRest") },
        description: t("services.contractReview.description"),
        image: 'https://shazmlc.com/wp-content/uploads/2025/12/AI-Powered-Contract-Analysis.webp',
        imagePosition: 'left',
      },
      {
        title: { highlight: t("services.smartContracts.title"), rest: t("services.smartContracts.titleRest") },
        description: t("services.smartContracts.description"),
        image: 'https://shazmlc.com/wp-content/uploads/2025/12/2149369111-min.webp',
        imagePosition: 'right',
      },
      {
        title: { highlight: t("services.legalConsults.title"), rest: t("services.legalConsults.titleRest") },
        description: t("services.legalConsults.description"),
        image: 'https://shazmlc.com/wp-content/uploads/2025/12/Virtual-Legal-Consultations.webp',
        imagePosition: 'left',
      },
      {
        title: { highlight: t("services.caseStrategy.title"), rest: t("services.caseStrategy.titleRest") },
        description: t("services.caseStrategy.description"),
        image: 'https://shazmlc.com/wp-content/uploads/2025/12/Data-Driven-Case-Strategy.webp',
        imagePosition: 'right',
      },
    ];
  
    return (
      <main className="min-h-screen p-[5%] bg-gradient-to-b from-gray-50 to-white">
        <div className=" max-w-10xl  xl-max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center mb-28 px-4">
  <h1
    className="font-bold mb-6 leading-tight"
    style={{
      fontSize: "clamp(2rem, 6vw, 8rem)", 
    }}
  >
    {t("title")} 
  </h1>
  
  <p
    className="text-gray-700 font-medium mx-auto"
    style={{
      fontSize: "clamp(1.25rem, 2.5vw, 3rem)",  
      maxWidth: "70ch",  
      lineHeight: 1.3,
    }}
  >
    {t("subtitle")}
  </p>
</div>

  
          {/* Sections */}
          <div className="space-y-[clamp(2rem,5vw,8rem)]">
  {services.map((service, index) => (
    <div
      key={index}
      className={`flex flex-col lg:flex-row items-center gap-[clamp(1rem,3vw,5rem)] lg:gap-[clamp(2rem,4vw,8rem)]
        ${service.imagePosition === 'right' ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Image */}
      <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl h-[clamp(12rem,25vw,40rem)] group relative">
        <img
          src={service.image}
          alt={service.title.highlight + service.title.rest}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex-1 w-full text-center   mt-6 lg:mt-0">
        <h2 className="text-[clamp(2rem,5vw,6rem)] font-bold text-gray-900 leading-snug mb-4">
          <span className="text-[#0e9185]">{service.title.highlight}</span>
          {service.title.rest}
        </h2>
        <p className="text-[clamp(1rem,2.5vw,4rem)] text-gray-700 font-medium leading-relaxed">
          {service.description}
        </p>
      </div>
    </div>
  ))}
</div>

        </div>
      </main>
    );
  }
  






// "use client";

// import { ArrowRight } from 'lucide-react';

// export default function LegalServicesBento() {
//   const services = [
//     {
//       category: "Innovation",
//       title: "AI-Powered Contract Analysis",
//       image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=800&fit=crop',
//       size: 'large', // Takes 2 columns
//     },
//     {
//       category: "Technology",
//       title: "Smart Contracts",
//       image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
//       size: 'small',
//     },
//     {
//       category: "Support",
//       title: "Virtual Legal Consultations",
//       image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=800&fit=crop',
//       size: 'small',
//     },
//     {
//       category: "Strategy",
//       title: "Data-Driven Case Strategy",
//       image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop',
//       size: 'large', // Takes 2 columns
//     },
//   ];

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-16">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
//           <div>
//             {/* Badge */}
//             <div className="inline-flex items-center gap-2 mb-6">
//               <div className="w-2 h-2 bg-teal-500 rounded-full" />
//               <span className="text-sm font-semibold uppercase tracking-wider text-teal-600">
//                 PROUD PROJECTS
//               </span>
//             </div>

//             {/* Title */}
//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
//               Breaking Boundaries,
//               <br />
//               Building <span className="text-teal-600">Dreams.</span>
//             </h1>
//           </div>

//           {/* Right Side Content */}
//           <div className="lg:max-w-md space-y-6">
//             <p className="text-gray-600 text-lg leading-relaxed">
//               We work closely with our clients to understand their unique needs and craft tailored solutions that address challenges.
//             </p>
//             <button className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full transition-all flex items-center gap-2 group">
//               <span>More Projects</span>
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </button>
//           </div>
//         </div>

//         {/* Bento Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
//           {/* Card 1 - Large (2 columns) */}
//           <div className="lg:col-span-2 group relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden cursor-pointer">
//             <img
//               src={services[0].image}
//               alt={services[0].title}
//               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
//             <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//               <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
//                 {services[0].category}
//               </span>
//               <h3 className="text-3xl lg:text-4xl font-bold">
//                 {services[0].title}
//               </h3>
//             </div>
//           </div>

//           {/* Card 2 - Small */}
//           <div className="group relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden cursor-pointer">
//             <img
//               src={services[1].image}
//               alt={services[1].title}
//               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
//             <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//               <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
//                 {services[1].category}
//               </span>
//               <h3 className="text-2xl lg:text-3xl font-bold">
//                 {services[1].title}
//               </h3>
//             </div>
//           </div>

//           {/* Card 3 - Small */}
//           <div className="group relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden cursor-pointer">
//             <img
//               src={services[2].image}
//               alt={services[2].title}
//               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
//             <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//               <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
//                 {services[2].category}
//               </span>
//               <h3 className="text-2xl lg:text-3xl font-bold">
//                 {services[2].title}
//               </h3>
//             </div>
//           </div>

//           {/* Card 4 - Large (2 columns) */}
//           <div className="lg:col-span-2 group relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden cursor-pointer">
//             <img
//               src={services[3].image}
//               alt={services[3].title}
//               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
//             <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//               <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
//                 {services[3].category}
//               </span>
//               <h3 className="text-3xl lg:text-4xl font-bold">
//                 {services[3].title}
//               </h3>
//             </div>
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }