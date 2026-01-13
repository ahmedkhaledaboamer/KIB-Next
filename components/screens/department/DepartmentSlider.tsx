'use client';

import React, { useRef } from 'react';
import { Users, Briefcase, TrendingUp, HeadphonesIcon, Shield, Truck, FileText, Scale, ArrowLeft, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import DepartmentCard from '@/components/DepartmentCard';

interface Member {
  name: string;
  position: string;
  description: string;
  image: string;
  email: string;
  phone: string;
  location: string;
}

interface Props {
  title: string;
  titleColor: string;
  members: Member[];
  icon: React.ReactNode;
}

export default function DepartmentsPage() {
     const departments = [
        {
          title: "Leadership",
          titleColor: "from-purple-500 to-pink-600",
            icon: <Users className="w-8 h-8 text-purple-500" />,
            members: [
              {
                name: "Sarah Mitchell",
                position: "Strategic Management",
                description: "Leading digital transformation initiatives with 15+ years experience",
                image: "/images/qq.webp",
                email: "sarah.mitchell@company.com",
                phone: "+971 50 123 4567",
                location: "Dubai, UAE"
              },
              {
                name: "James Anderson",
                position: "Operations Manager",
                description: "Optimizing business processes and operational excellence",
                image: "/images/aa.webp",
                email: "james.anderson@company.com",
                phone: "+971 50 123 4568",
                location: "Abu Dhabi, UAE"
              },
              {
                name: "Emily Chen",
                position: "Executive Assistant",
                description: "Supporting executive operations and strategic planning",
                image: "/images/dd.webp",
                email: "emily.chen@company.com",
                phone: "+971 50 123 4569",
                location: "Dubai, UAE"
              }
              ,
              {
                name: "Emily Chen",
                position: "Executive Assistant",
                description: "Supporting executive operations and strategic planning",
                image: "/images/dd.webp",
                email: "emily.chen@company.com",
                phone: "+971 50 123 4569",
                location: "Dubai, UAE"
              }
            ]
          },
          {
            title: "External Relations",
            titleColor: "from-cyan-500 to-blue-600",
            icon: <Briefcase className="w-8 h-8 text-cyan-500" />,
            members: [
              {
                name: "David Thompson",
                position: "Public Relations Director",
                description: "Managing media relations and corporate communications",
                image: "/images/qq.webp",
                email: "david.thompson@company.com",
                phone: "+971 50 234 5678",
                location: "Dubai, UAE"
              },
              {
                name: "Jessica Lee",
                position: "Partnership Manager",
                description: "Building strategic partnerships and business alliances",
                image: "/images/qq.webp",
                email: "jessica.lee@company.com",
                phone: "+971 50 234 5679",
                location: "Sharjah, UAE"
              },
              {
                name: "Robert Martinez",
                position: "External Director",
                description: "Leading external communications and stakeholder engagement",
                image: "/images/qq.webp",
                email: "robert.martinez@company.com",
                phone: "+971 50 234 5680",
                location: "Dubai, UAE"
              }
            ]
          },
          {
            title: "Marketing & Communications",
            titleColor: "from-orange-500 to-red-600",
            icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
            members: [
              {
                name: "Lisa Parker",
                position: "Digital Marketing Lead",
                description: "Expertise in digital marketing strategies and campaigns",
                image: "/images/qq.webp",
                email: "lisa.parker@company.com",
                phone: "+971 50 345 6789",
                location: "Dubai, UAE"
              },
              {
                name: "Ryan Cooper",
                position: "Marketing Manager",
                description: "Leading multi-channel marketing campaigns",
                image: "/images/qq.webp",
                email: "ryan.cooper@company.com",
                phone: "+971 50 345 6790",
                location: "Abu Dhabi, UAE"
              },
              {
                name: "Sophia Turner",
                position: "Marketing Specialist",
                description: "Content strategy and brand development expert",
                image: "/images/qq.webp",
                email: "sophia.turner@company.com",
                phone: "+971 50 345 6791",
                location: "Dubai, UAE"
              }
            ]
          },
          {
            title: "Sales & Client Relations",
            titleColor: "from-green-500 to-emerald-600",
            icon: <Briefcase className="w-8 h-8 text-green-500" />,
            members: [
              {
                name: "Michael Brown",
                position: "Sales Consultant",
                description: "Building client relationships and strategic sales",
                image: "/images/qq.webp",
                email: "michael.brown@company.com",
                phone: "+971 50 456 7890",
                location: "Dubai, UAE"
              },
              {
                name: "Rachel Green",
                position: "Sales Executive",
                description: "Driving revenue growth and client acquisition",
                image: "/images/qq.webp",
                email: "rachel.green@company.com",
                phone: "+971 50 456 7891",
                location: "Dubai, UAE"
              },
              {
                name: "Thomas Wilson",
                position: "Client Executive",
                description: "Managing high-value client relationships",
                image: "/images/qq.webp",
                email: "thomas.wilson@company.com",
                phone: "+971 50 456 7892",
                location: "Abu Dhabi, UAE"
              }
            ]
          },
          {
            title: "Technology & Support",
            titleColor: "from-blue-500 to-indigo-600",
            icon: <HeadphonesIcon className="w-8 h-8 text-blue-500" />,
            members: [
              {
                name: "Alex Kumar",
                position: "IT Services Manager",
                description: "Managing IT infrastructure and digital solutions",
                image: "/images/qq.webp",
                email: "alex.kumar@company.com",
                phone: "+971 50 567 8901",
                location: "Dubai, UAE"
              },
              {
                name: "Nina Patel",
                position: "Technical Support Lead",
                description: "Providing technical solutions and customer support",
                image: "/images/qq.webp",
                email: "nina.patel@company.com",
                phone: "+971 50 567 8902",
                location: "Dubai, UAE"
              },
              {
                name: "Chris Johnson",
                position: "Systems Administrator",
                description: "Maintaining systems and network infrastructure",
                image: "/images/qq.webp",
                email: "chris.johnson@company.com",
                phone: "+971 50 567 8903",
                location: "Sharjah, UAE"
              }
            ]
          },
          {
            title: "Quality & Risk Control",
            titleColor: "from-red-500 to-pink-600",
            icon: <Shield className="w-8 h-8 text-red-500" />,
            members: [
              {
                name: "Jennifer White",
                position: "Quality Manager",
                description: "Monitoring quality and compliance standards",
                image: "/images/qq.webp",
                email: "jennifer.white@company.com",
                phone: "+971 50 678 9012",
                location: "Dubai, UAE"
              },
              {
                name: "Mark Davis",
                position: "Risk Management Specialist",
                description: "Identifying and mitigating business risks",
                image: "/images/qq.webp",
                email: "mark.davis@company.com",
                phone: "+971 50 678 9013",
                location: "Abu Dhabi, UAE"
              },
              {
                name: "Laura Martinez",
                position: "Compliance Officer",
                description: "Ensuring regulatory compliance and standards",
                image: "/images/qq.webp",
                email: "laura.martinez@company.com",
                phone: "+971 50 678 9014",
                location: "Dubai, UAE"
              }
            ]
          },
          {
            title: "Logistics",
            titleColor: "from-yellow-500 to-orange-600",
            icon: <Truck className="w-8 h-8 text-yellow-500" />,
            members: [
              {
                name: "Daniel Garcia",
                position: "Logistics Manager",
                description: "Managing supply chain and logistics operations",
                image: "/images/qq.webp",
                email: "daniel.garcia@company.com",
                phone: "+971 50 789 0123",
                location: "Dubai, UAE"
              },
              {
                name: "Maria Rodriguez",
                position: "Operations Coordinator",
                description: "Coordinating freight and warehouse operations",
                image: "/images/qq.webp",
                email: "maria.rodriguez@company.com",
                phone: "+971 50 789 0124",
                location: "Jebel Ali, UAE"
              },
              {
                name: "Ahmed Hassan",
                position: "Supply Chain Specialist",
                description: "Optimizing supply chain efficiency",
                image: "/images/qq.webp",
                email: "ahmed.hassan@company.com",
                phone: "+971 50 789 0125",
                location: "Dubai, UAE"
              }
            ]
          },
          {
            title: "Corporate Services & Administration",
            titleColor: "from-indigo-500 to-purple-600",
            icon: <FileText className="w-8 h-8 text-indigo-500" />,
            members: [
              {
                name: "Patricia Lee",
                position: "HR Manager",
                description: "Managing talent acquisition and employee relations",
                image: "/images/qq.webp",
                email: "patricia.lee@company.com",
                phone: "+971 50 890 1234",
                location: "Dubai, UAE"
              },
              {
                name: "Steven Clark",
                position: "Finance Director",
                description: "Leading financial planning and strategy",
                image: "/images/qq.webp",
                email: "steven.clark@company.com",
                phone: "+971 50 890 1235",
                location: "Dubai, UAE"
              },
              {
                name: "Catherine Brown",
                position: "Administrative Manager",
                description: "Overseeing office operations and administration",
                image: "/images/qq.webp",
                email: "catherine.brown@company.com",
                phone: "+971 50 890 1236",
                location: "Abu Dhabi, UAE"
              }
            ]
          },
          {
            title: "Legal",
            titleColor: "from-slate-600 to-gray-800",
            icon: <Scale className="w-8 h-8 text-slate-600" />,
            members: [
              {
                name: "Victoria Adams",
                position: "Legal Researcher",
                description: "Conducting legal research and analysis",
                image: "/images/qq.webp",
                email: "victoria.adams@company.com",
                phone: "+971 50 901 2345",
                location: "Dubai, UAE"
              },
              {
                name: "Benjamin Wright",
                position: "Legal Affairs Manager",
                description: "Managing legal compliance and contracts",
                image: "/images/qq.webp",
                email: "benjamin.wright@company.com",
                phone: "+971 50 901 2346",
                location: "Dubai, UAE"
              },
              {
                name: "Olivia Taylor",
                position: "Legal Director",
                description: "Leading legal strategy and corporate governance",
                image: "/images/qq.webp",
                email: "olivia.taylor@company.com",
                phone: "+971 50 901 2347",
                location: "Abu Dhabi, UAE"
              }
            ]
          }
        ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {departments.map((dept, idx) => (
        <DepartmentSlider
          key={idx}
          title={dept.title}
          titleColor={dept.titleColor}
          members={dept.members}
          icon={dept.icon}
        />
      ))}
    </div>
  );
}

function DepartmentSlider({ title, titleColor, members, icon }: Props) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section  className="py-[clamp(3rem,10vw,6rem)] relative px-[clamp(2%,5vw,5%)]">
      {/* Header */}
      <div className="mb-[clamp(2rem,6vw,4rem)] flex flex-row items-center justify-between gap-[clamp(1rem,3vw,2rem)] flex-wrap">
  {/* Left */}
  <div className="flex items-start gap-[clamp(1rem,2.5vw,2rem)] flex-1 min-w-[200px]">
    <div className={`w-1 h-[clamp(4rem,10vw,6rem)] bg-gradient-to-b ${titleColor} rounded-full`} />

    <div>
      <div className="flex items-center gap-[clamp(0.5rem,1vw,1rem)] mb-[clamp(0.5rem,1vw,1rem)]">
        <div className="p-[clamp(0.5rem,1.5vw,1rem)] rounded-xl bg-slate-900 shadow-lg text-white">
          {icon}
        </div>
        <span className="uppercase tracking-widest text-[clamp(1rem,1.5vw,1rem)] text-gray-400">
          Department
        </span>
      </div>
      <h2 className={`font-bold text-[clamp(1.5rem,5vw,4rem)] bg-gradient-to-r ${titleColor} text-transparent bg-clip-text`}>
        {title}
      </h2>
    </div>
  </div>

  {/* Right - Navigation */}
  <div className="flex gap-[clamp(0.5rem,2vw,1rem)]">
    <button
      ref={prevRef}
      aria-label="Previous"
      className={`
        w-[clamp(2.5rem,6vw,3rem)]
        h-[clamp(2.5rem,6vw,3rem)]
        flex items-center justify-center
        rounded-full
        border border-gray-300
        bg-gradient-to-tr ${titleColor} bg-opacity-70
        text-white
        hover:scale-105 hover:shadow-lg
        transition-all duration-300
        cursor-pointer
      `}
    >
      <ArrowLeft className="w-[clamp(1rem,3vw,1.25rem)] h-[clamp(1rem,3vw,1.25rem)]" />
    </button>
    <button
      ref={nextRef}
      aria-label="Next"
      className={`
        w-[clamp(2.5rem,6vw,3rem)]
        h-[clamp(2.5rem,6vw,3rem)]
        flex items-center justify-center
        rounded-full
        border border-gray-300
        bg-gradient-to-tr ${titleColor} bg-opacity-70
        text-white
        hover:scale-105 hover:shadow-lg
        transition-all duration-300
        cursor-pointer
      `}
    >
      <ArrowRight className="w-[clamp(1rem,3vw,1.25rem)] h-[clamp(1rem,3vw,1.25rem)]" />
    </button>
  </div>
</div>


      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={30}
        breakpoints={{
          0: { slidesPerView: 1 },
          480: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
          1536: { slidesPerView: 3 },
        }}
        onBeforeInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        className="px-[clamp(1rem,2vw,2rem)] department-swiper"
      >
        {members.map((member, index) => (
          <SwiperSlide key={index}>
            <DepartmentCard member={member} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
