import { getServices } from '@/utils/getServices';
import PaymentForm from '@/components/screens/booking/PaymentForm';
import { sendBookingToAPI } from '@/utils/saveBooking';

interface Service {
  title: string;
  price: number | string;
  id?: number;
}

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BookingPage({ searchParams }: PageProps) {
  const searchParamsData = await searchParams;
  const serviceIdParam = typeof searchParamsData.serviceId === 'string' ? searchParamsData.serviceId : undefined;
  const sessionId = typeof searchParamsData["session_id"] === "string" 
    ? searchParamsData["session_id"] 
    : undefined;

  let service: Service | null = null;
  let serviceId: number | undefined;

  if (serviceIdParam) {
    try {
      const services = await getServices();
      const found = services.find(
        (s: Service) => String(s.id) === serviceIdParam
      );
      service = found || null;
      serviceId = found?.id;
    } catch (error) {
      console.error('Error loading service:', error);
    }
  }

  // Send booking data to API if sessionId exists (after payment)
  if (sessionId) {
    try {
      const result = await sendBookingToAPI(sessionId);
      if (result.success) {
        console.log("Booking data sent successfully:", result.data);
      } else {
        console.error("Failed to send booking data:", result.error);
      }
    } catch (error) {
      console.error("Error sending booking data:", error);
    }
  }

  if (!service && serviceIdParam) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-center text-gray-600">Service not found</p>
      </div>
    );
  }

  if (!serviceIdParam) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-center text-gray-600">Please select a service</p>
      </div>
    );
  }

  return <PaymentForm service={service!} serviceId={serviceId} />;
}
