// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useTranslations } from "next-intl";
// import { Sparkles, ArrowRight, MessageCircle } from "lucide-react";
// import CategoriesModal from "./CategoriesModal";
// import { Iservices } from "./screens/home/ServicesShowcase";
// import Button from "./button";
 
  
// interface CardDetailsProps {
//   link: string;
//   btn: string;
//   service: Iservices ;
//   disableModal?: boolean;
// }

// export default function CardDetails({
//   link,
//   btn,
//   service,
//   disableModal = false,
// }: CardDetailsProps) {
//   const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
//   const t = useTranslations("cardDetails");

//   if (!service) return null;

//   const openSubServices = () => {
//     if (!disableModal && service?.subservices && service?.subservices.length > 0) {
//       setIsCategoriesOpen(true);
//     }
//   };

//   return (
//     <div className="group relative w-full h-full rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-all flex flex-col">
//     {/* IMAGE */}
//     <div
//       onClick={openSubServices}
//       className={`relative h-[400px] w-full overflow-hidden ${
//         !disableModal && service.subservices && service.subservices.length > 0
//           ? "cursor-pointer"
//           : ""
//       }`}
//     >
//       <img
//         src={service.image || "https://shazmlc.com/book-service/images/ahmed.jpg"}
//         alt={service.title}
//         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//         onError={(e) => {
//           (e.target as HTMLImageElement).src =
//             "https://shazmlc.com/book-service/images/ahmed.jpg";
//         }}
//       />
//       {/* BADGE */}
//       {!disableModal && service.subservices && service.subservices.length > 0 && (
//         <div className="absolute top-3 right-3 bg-white/90 text-gray-900 px-3 py-1 rounded-full text-3xl font-semibold shadow-md">
//           <Sparkles className="inline w-6 h-6 me-1" />
//           {service.subservices.length} {t("sub")}
//         </div>
//       )}
//     </div>
  
//     {/* CONTENT */}
//     <div className="p-4 flex flex-col flex-1">
//       <h2 className="text-5xl font-bold text-gray-900">{service.title}</h2>
//       <p className="text-gray-600 text-2xl mt-2 flex-1">{service.description || t("noDescription")}</p>
  

//       <div className="flex items-center gap-3 w-full mt-4 pt-6">
//   {/* Chat Button - Action */}
//   <Button
//     variant="lineBlue"
//     size="sm"
//     className="flex-1 font-extrabold flex items-center gap-2"
//     onClick={() => {
//       // افتح شات / واتساب / مودال
//     }}
//   >
//     <MessageCircle className="w-5 h-5" />
//     {t("chat")}
//   </Button>

//   {/* Book Now Button - Navigation */}
//   <Link
//     href={{
//       pathname: link,
//       query: { serviceId: service.id },
//     }}
//     className="flex-1"
//   >
//     <Button
//       variant="blue"
//       size="sm"
//       className="w-full font-extrabold flex items-center gap-2"
//     >
//       {btn}
//       <ArrowRight className="w-5 h-5" />
//     </Button>
//   </Link>
// </div>

     
//     </div>
  
//     {/* MODAL */}
//     {!disableModal && service.subservices && service.subservices.length > 0 && (
//       <CategoriesModal
//         isOpen={isCategoriesOpen}
//         onClose={() => setIsCategoriesOpen(false)}
//         service={service}
//       />
//     )}
//   </div>
  
//   );
// }



"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Sparkles, ArrowRight, MessageCircle } from "lucide-react";
import CategoriesModal from "./CategoriesModal";
import { Iservices } from "./screens/home/ServicesShowcase";
 import Button from "./button";

interface CardDetailsProps {
  link: string;
  btn: string;
  service: Iservices;
  disableModal?: boolean;
}

export default function CardDetails({
  link,
  btn,
  service,
  disableModal = false,
}: CardDetailsProps) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const t = useTranslations("cardDetails");

  if (!service) return null;

  const hasSub = !disableModal && service.subservices?.length > 0;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
      
      {/* IMAGE */}
      <div
        onClick={() => hasSub && setIsCategoriesOpen(true)}
        className={`relative w-full aspect-[4/3] overflow-hidden ${hasSub ? "cursor-pointer" : ""}`}
      >
        <img
          src={service.image || "/fallback.jpg"}
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {hasSub && (
          <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1   font-semibold shadow flex items-center gap-1" 
          style={{ fontSize: "clamp(1.5rem, 2vw, 1.5rem)" }}>
            <Sparkles className="w-4 h-4" />
            {service.subservices.length} {t("sub")}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <h2
          className="font-bold text-black leading-tight"
          style={{ fontSize: "clamp(1.5rem, 2vw, 3rem)" }}
        >
          {service.title}
        </h2>

        <p
          className="flex-1 text-gray-900 leading-relaxed"
          style={{ fontSize: "clamp(1rem, 1.5vw, 1.8rem)" }}
        >
          {service.description || t("noDescription")}
        </p>

        {/* ACTIONS */}
        <div className="mt-auto flex flex-wrap gap-3">
          <Button
            variant="lineBlue"
            size="sm"
            className="flex-1 min-w-[120px] justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            {t("chat")}
          </Button>

          <Link
            href={{ pathname: link,  query: { serviceId: service.id } }}
            className="flex-1 min-w-[120px]"
          >
            <Button variant="blue" size="sm" className="w-full flex justify-center gap-2">
              {btn}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {hasSub && (
        <CategoriesModal
          isOpen={isCategoriesOpen}
          onClose={() => setIsCategoriesOpen(false)}
          service={service}
        />
      )}
    </div>
  );
}
