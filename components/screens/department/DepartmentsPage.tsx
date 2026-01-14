import { getDepartments } from '@/utils/getDepartments';
import { Users, Briefcase, TrendingUp, HeadphonesIcon, Shield, Truck, FileText, Scale } from 'lucide-react';
import DepartmentSlider from './DepartmentSlider';
import { Suspense } from 'react';

// Mapping for department icons and colors
const departmentConfig: Record<string, { icon: React.ReactNode; titleColor: string }> = {
  'Leadership': {
    icon: <Users className="w-8 h-8 text-purple-500" />,
    titleColor: 'from-purple-500 to-pink-600',
  },
  'External Relations': {
    icon: <Briefcase className="w-8 h-8 text-cyan-500" />,
    titleColor: 'from-cyan-500 to-blue-600',
  },
  'Marketing': {
    icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
    titleColor: 'from-orange-500 to-red-600',
  },
  'Sales': {
    icon: <Briefcase className="w-8 h-8 text-green-500" />,
    titleColor: 'from-green-500 to-emerald-600',
  },
  'IT': {
    icon: <HeadphonesIcon className="w-8 h-8 text-blue-500" />,
    titleColor: 'from-blue-500 to-indigo-600',
  },
  'Quality': {
    icon: <Shield className="w-8 h-8 text-red-500" />,
    titleColor: 'from-red-500 to-pink-600',
  },
  'Logistics': {
    icon: <Truck className="w-8 h-8 text-yellow-500" />,
    titleColor: 'from-yellow-500 to-orange-600',
  },
  'Corporate Services and Administration': {
    icon: <FileText className="w-8 h-8 text-indigo-500" />,
    titleColor: 'from-indigo-500 to-purple-600',
  },
  'Legal': {
    icon: <Scale className="w-8 h-8 text-slate-600" />,
    titleColor: 'from-slate-600 to-gray-800',
  },
};

interface ApiDepartment {
  id: string;
  category: string;
  members: Array<{
    id: string;
    category: string;
    title: string;
    description: string;
    phone: string;
    email: string;
    image: string;
  }>;
}

async function DepartmentsContent() {
  const apiData = await getDepartments() as ApiDepartment[];

  if (!apiData || !Array.isArray(apiData) || apiData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <p className="text-gray-500">No departments data available</p>
      </div>
    );
  }

  // Transform API data to component format
  const departments = apiData.map((dept) => {
    const config = departmentConfig[dept.category] || {
      icon: <Briefcase className="w-8 h-8 text-gray-500" />,
      titleColor: 'from-gray-500 to-gray-600',
    };

    return {
      id: dept.id,
      title: dept.category,
      titleColor: config.titleColor,
      icon: config.icon,
      members: dept.members.map((member) => ({
        id: member.id,
        name: member.title, // Using title as name since API doesn't have name
        position: member.title,
        description: member.description || '',
        image: member.image,
        email: member.email,
        phone: member.phone,
        location: 'Dubai, UAE', // Default location since API doesn't provide it
      })),
    };
  });

  return (
    <>
      {departments.map((dept) => (
        <DepartmentSlider
          key={dept.id}
          title={dept.title}
          titleColor={dept.titleColor}
          members={dept.members}
          icon={dept.icon}
        />
      ))}
    </>
  );
}

function DepartmentsSkeleton() {
  // Show skeleton for a few departments
  const skeletonDepartments = Array.from({ length: 3 }).map((_, idx) => {
    const colors = [
      'from-purple-500 to-pink-600',
      'from-cyan-500 to-blue-600',
      'from-orange-500 to-red-600',
    ];
    return (
      <DepartmentSlider
        key={`skeleton-${idx}`}
        title="Loading..."
        titleColor={colors[idx % colors.length]}
        members={[]}
        icon={<Briefcase className="w-8 h-8 text-gray-500" />}
        isLoading={true}
      />
    );
  });

  return <>{skeletonDepartments}</>;
}

export default async function DepartmentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Suspense fallback={<DepartmentsSkeleton />}>
        <DepartmentsContent />
      </Suspense>
    </div>
  );
}

