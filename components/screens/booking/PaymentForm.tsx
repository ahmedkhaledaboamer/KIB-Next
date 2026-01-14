"use client";

import React, { useState, ChangeEvent, FormEvent, JSX } from 'react';
import { ChevronLeft, ChevronRight, Calendar, User, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { saveBookingData } from '@/utils/saveBooking';

interface Service {
  title: string;
  price: number | string;
  id?: number;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  timezone: string;
  duration: number;
  notes: string;
}

interface PaymentFormProps {
  service: Service;
  serviceId?: number;
}

interface FormFieldProps {
  label: string;
  name: keyof FormData;
  type?: string;
  placeholder: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

interface InfoItemProps {
  label: string;
  value: string | number | null | undefined;
}

export default function PaymentForm({ service, serviceId }: PaymentFormProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    timezone: 'UTC',
    duration: 30,
    notes: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const timeSlots: string[] = [
    '7:00 AM', '7:15 AM', '7:30 AM', '7:45 AM',
    '8:00 AM', '8:15 AM', '8:30 AM', '8:45 AM',
    '9:00 AM', '9:15 AM', '9:30 AM', '9:45 AM',
    '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM',
    '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM',
    '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM',
    '1:00 PM', '1:15 PM', '1:30 PM', '1:45 PM',
    '2:00 PM', '2:15 PM', '2:30 PM', '2:45 PM',
    '3:00 PM', '3:15 PM', '3:30 PM', '3:45 PM',
    '4:00 PM', '4:15 PM', '4:30 PM', '4:45 PM',
    '5:00 PM', '5:15 PM', '5:30 PM', '5:45 PM',
  ];

  const timezones: string[] = [
    'Asia/Jerusalem',  
    'UTC',
    'America/New_York',
    'Europe/London',
    'Asia/Dubai',
  ];

  const monthNames: string[] = [
    'January', 'February', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December'
  ];

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case 'firstName':
        if (!value) return 'First name is required';
        if (value.length < 2) return 'Must be at least 2 characters';
        return '';
      case 'lastName':
        if (!value) return 'Last name is required';
        if (value.length < 2) return 'Must be at least 2 characters';
        return '';
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        return '';
      case 'phone':
        if (!value) return 'Phone number is required';
        if (!/^\+?[0-9]{10,15}$/.test(value)) return 'Invalid phone number';
        return '';
     
      default:
        return '';
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'duration' ? parseInt(value) : value }));
    
    if (touched[name]) {
      const error = validateField(name as keyof FormData, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof FormData, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const calculateEndTime = (date: string, time: string, duration: number): string => {
    const timeStr = convertTo24Hour(time);
    const [hours, minutes] = timeStr.split(':').map(Number);

    const startDate = new Date(date);
    startDate.setHours(hours, minutes, 0, 0);

    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + duration);

    const format = (d: Date) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
        d.getDate()
      ).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(
        d.getMinutes()
      ).padStart(2, '0')}:00`;

    return format(endDate);
  };

  const convertTo24Hour = (time12h: string): string => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = String(parseInt(hours, 10) + 12);
    return `${hours.padStart(2, '0')}:${minutes}`;
  };

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!selectedDate) {
      newErrors.date = 'Please select a date';
    }
    if (!selectedTime) {
      newErrors.time = 'Please select a time';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};
    
    Object.keys(formData).forEach(key => {
      if (key !== 'notes' && key !== 'duration' && key !== 'timezone') {
        const error = validateField(key as keyof FormData, formData[key as keyof FormData] as string);
        if (error) newErrors[key] = error;
        newTouched[key] = true;
      }
    });

    setErrors(newErrors);
    setTouched(newTouched);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (isConfirming) {
      setIsConfirming(false);
      setCurrentStep(2);
    }
  };

  const handleSubmit = () => {
    if (validateStep2()) {
      setIsConfirming(true);
    }
  };

  const handleConfirm = async () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }
    
    const dateStr = selectedDate.toLocaleDateString('en-CA');
    const timeStr = convertTo24Hour(selectedTime);
    
    const bookingData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      zip: formData.zip,
      timezone: formData.timezone,
      notes: formData.notes,
      start: `${dateStr} ${timeStr}:00`,
      end: calculateEndTime(dateStr, selectedTime, formData.duration),
      location: `${formData.address}, ${formData.zip} ${formData.city}`,
      providerId: 20,
      serviceId: serviceId && serviceId < 6 ? 6 : serviceId || 6,
    };
    
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      zip: formData.zip,
      timezone: formData.timezone,
      notes: formData.notes,
      start: `${dateStr} ${timeStr}:00`,
      end: calculateEndTime(dateStr, selectedTime, formData.duration),
      location: `${formData.address}, ${formData.zip} ${formData.city}`,
      providerId: 20,
      serviceId: serviceId && serviceId < 6 ? 6 : serviceId || 6,
    };
    
    try {
      // Save to cookies using server action
      const result = await saveBookingData(userData, bookingData);
      
      if (result.success) {
        window.open("https://buy.stripe.com/test_bJe3cuayXgRk3jFd96eIw01", "_blank");
      } else {
        alert('Error saving data');
      }
    } catch (error) {
      console.error('Error saving to cookies:', error);
      alert('Error saving data');
    }
  };

  const getDaysInMonth = (date: Date): { daysInMonth: number; startingDayOfWeek: number } => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const days: JSX.Element[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-7 xs:h-6 5xl:h-10"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = selectedDate && 
        date.toDateString() === selectedDate.toDateString();
      const isToday = date.toDateString() === today.toDateString();
      const isPastDate = date < today;
      
      days.push(
        <button
          key={day}
          type="button"
          onClick={() => !isPastDate && setSelectedDate(date)}
          disabled={isPastDate}
          className={`h-7 w-7 xs:h-6 xs:w-6 5xl:h-10 5xl:w-10 rounded flex items-center justify-center text-[10px] xs:text-[8px] 5xl:text-base font-medium transition ${
            isSelected
              ? 'bg-teal-600 text-white'
              : isPastDate
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : isToday
              ? 'bg-teal-100 text-teal-600 hover:bg-teal-200'
              : 'hover:bg-gray-100 text-gray-700'
          } ${!isPastDate ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  const changeMonth = (offset: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));
  };

  // Confirmation Page
  if (isConfirming) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 overflow-hidden max-w-[100vw]">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="bg-teal-600 text-white p-4 text-center xs:p-2 5xl:p-8">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 xs:w-6 xs:h-6 xs:mb-1 5xl:w-16 5xl:h-16 5xl:mb-4" />
              <h1 className="text-lg font-bold xs:text-sm 5xl:text-3xl">Appointment Confirmation</h1>
            </div>

            <div className="p-4 xs:p-2 5xl:p-8">
              {service && (
                <div className="mb-3 p-2 bg-teal-50 rounded border border-teal-200 xs:mb-2 xs:p-1.5 5xl:mb-6 5xl:p-4">
                  <p className="text-xs text-teal-700 font-semibold xs:text-[10px] 5xl:text-lg">Service:</p>
                  <p className="text-sm font-bold text-teal-900 xs:text-xs 5xl:text-xl">{service.title || 'Service'}</p>
                  <p className="text-teal-700 mt-0.5 text-xs xs:text-[10px] 5xl:text-base">Price: AED {service.price && service.price}</p>
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-3 xs:gap-2 5xl:gap-8">
                <div>
                  <h2 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1 xs:text-xs xs:mb-1 5xl:text-xl 5xl:mb-4">
                    <User className="w-3 h-3 text-teal-600 xs:w-2 xs:h-2 5xl:w-6 5xl:h-6" />
                    Contact Information
                  </h2>
                  
                  <div className="space-y-1.5 xs:space-y-1 5xl:space-y-3">
                    <InfoItem 
                      label="Name" 
                      value={`${formData.firstName} ${formData.lastName}`}
                    />
                    <InfoItem 
                      label="Email" 
                      value={formData.email}
                    />
                    <InfoItem 
                      label="Phone" 
                      value={formData.phone}
                    />
                    <InfoItem 
                      label="Address" 
                      value={formData.address}
                    />
                    <InfoItem 
                      label="City" 
                      value={formData.city}
                    />
                    <InfoItem 
                      label="ZIP Code" 
                      value={formData.zip}
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1 xs:text-xs xs:mb-1 5xl:text-xl 5xl:mb-4">
                    <Calendar className="w-3 h-3 text-teal-600 xs:w-2 xs:h-2 5xl:w-6 5xl:h-6" />
                    Appointment Details
                  </h2>
                  
                  <div className="space-y-1.5 xs:space-y-1 5xl:space-y-3">
                    <InfoItem 
                      label="Date" 
                      value={selectedDate?.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    />
                    <InfoItem 
                      label="Time" 
                      value={selectedTime}
                    />
                    <InfoItem 
                      label="Duration" 
                      value={`${formData.duration} minutes`}
                    />
                    <InfoItem 
                      label="Timezone" 
                      value={formData.timezone}
                    />
                    <InfoItem 
                      label="Location" 
                      value={`${formData.address}, ${formData.zip} ${formData.city}`}
                    />
                    {formData.notes && (
                      <InfoItem 
                        label="Notes" 
                        value={formData.notes}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-3 border-t xs:gap-1 xs:mt-2 xs:pt-2 5xl:gap-4 5xl:mt-8 5xl:pt-6">
                <button
                  onClick={handleBack}
                  className="flex-1 px-3 py-1.5 border border-gray-300 text-gray-700 rounded text-xs font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-1 xs:px-2 xs:py-1 xs:text-[10px] 5xl:px-6 5xl:py-3 5xl:text-lg"
                >
                  <ArrowLeft className="w-3 h-3 xs:w-2 xs:h-2 5xl:w-6 5xl:h-6" />
                  BACK
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-3 py-1.5 bg-teal-600 text-white rounded text-xs font-semibold hover:bg-teal-700 transition flex items-center justify-center gap-1 xs:px-2 xs:py-1 xs:text-[10px] 5xl:px-6 5xl:py-3 5xl:text-lg"
                >
                  <CheckCircle className="w-3 h-3 xs:w-2 xs:h-2 5xl:w-6 5xl:h-6" />
                  CONFIRM TO PAY
                </button>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 overflow-hidden max-w-[100vw]">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 max-h-[90vh] overflow-y-auto xs:p-2 xs:max-h-[100vh] 5xl:p-6 5xl:max-h-[100vh]">
          
          {service && (
            <div className="mb-3 p-2 bg-teal-50 rounded border-l-2 border-teal-600 xs:mb-2 xs:p-1.5 5xl:mb-6 5xl:p-4">
              <p className="text-[10px] text-teal-800 font-semibold xs:text-[8px] 5xl:text-sm">Selected Service</p>
              <p className="text-sm font-bold text-teal-900 xs:text-xs 5xl:text-xl">{service.title || 'Service'}</p>
              <p className="text-teal-700 mt-0.5 text-xs xs:text-[10px] 5xl:text-base">Price: AED {service.price && service.price}</p>
            </div>
          )}
          
          <div className="mb-4 xs:mb-2 5xl:mb-8">
            <div className="flex items-center justify-center gap-2">
              <div className={`flex items-center gap-1 ${currentStep === 1 ? 'text-teal-600' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs xs:w-5 xs:h-5 xs:text-[10px] 5xl:w-10 5xl:h-10 5xl:text-base ${
                  currentStep === 1 ? 'bg-teal-600 text-white' : 'bg-gray-200'
                }`}>
                  1
                </div>
                <span className="font-semibold text-xs xs:text-[10px] 5xl:text-base">Select Date & Time</span>
              </div>
              
              <div className="w-8 h-1 bg-gray-200 xs:w-6 5xl:w-16">
                <div className={`h-full ${currentStep === 2 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
              </div>
              
              <div className={`flex items-center gap-1 ${currentStep === 2 ? 'text-teal-600' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs xs:w-5 xs:h-5 xs:text-[10px] 5xl:w-10 5xl:h-10 5xl:text-base ${
                  currentStep === 2 ? 'bg-teal-600 text-white' : 'bg-gray-200'
                }`}>
                  2
                </div>
                <span className="font-semibold text-xs xs:text-[10px] 5xl:text-base">Your Details</span>
              </div>
            </div>
          </div>

          {/* Step 1: Date & Time */}
          {currentStep === 1 && (
            <div className="space-y-3 xs:space-y-2 5xl:space-y-6">
              <h1 className="text-base font-bold text-gray-900 text-center mb-0.5 xs:text-sm xs:mb-0 5xl:text-2xl 5xl:mb-2">
                Select Date & Time
              </h1>

              <div className="bg-gray-50 rounded p-3 border border-gray-200 xs:p-2 5xl:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-2 5xl:gap-8">
                  {/* Calendar */}
                  <div>
                    <div className="bg-teal-600 text-white rounded-t p-1.5 flex items-center justify-between xs:p-1 5xl:p-3">
                      <button
                        type="button"
                        onClick={() => changeMonth(-1)}
                        className="p-0.5 hover:bg-teal-700 rounded text-xs xs:p-0.25 xs:text-[10px] 5xl:p-2 5xl:text-base"
                      >
                        <ChevronLeft className="w-3 h-3 xs:w-2 xs:h-2 5xl:w-6 5xl:h-6" />
                      </button>
                      <div className="font-semibold text-xs xs:text-[10px] 5xl:text-lg">
                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </div>
                      <button
                        type="button"
                        onClick={() => changeMonth(1)}
                        className="p-0.5 hover:bg-teal-700 rounded text-xs xs:p-0.25 xs:text-[10px] 5xl:p-2 5xl:text-base"
                      >
                        <ChevronRight className="w-3 h-3 xs:w-2 xs:h-2 5xl:w-6 5xl:h-6" />
                      </button>
                    </div>
                    
                    <div className="bg-white border border-teal-600 rounded-b-lg p-4">
                      <div className="grid grid-cols-7 gap-2 mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                          <div key={day} className="text-center text-sm font-semibold text-gray-600">
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {renderCalendar()}
                      </div>
                    </div>
                    {errors.date && <p className="text-red-500 text-[10px] mt-1 xs:text-[8px] 5xl:text-sm">{errors.date}</p>}
                  </div>

                  {/* Time & Timezone */}
                  <div className="space-y-2 xs:space-y-1 5xl:space-y-4">
                    <div>
                      <label className="block font-semibold mb-0.5 text-[10px] text-gray-700 xs:text-[8px] 5xl:text-base">
                        Timezone <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="timezone"
                        className="w-full px-2 py-1 bg-white border border-gray-300 rounded focus:outline-none focus:ring-0.5 focus:ring-teal-500 focus:border-teal-500 text-[10px] xs:px-1 xs:py-0.5 xs:text-[8px] 5xl:px-4 5xl:py-3 5xl:text-lg"
                        onChange={handleChange}
                        value={formData.timezone}
                      >
                        {timezones.map(tz => (
                          <option key={tz} value={tz}>{tz}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-0.5 text-[10px] text-gray-700 xs:text-[8px] 5xl:text-base">
                        Select Time <span className="text-red-500">*</span>
                      </label>
                      <div className="max-h-40 overflow-y-auto space-y-0.5 border border-gray-200 rounded p-1.5 bg-white xs:max-h-32 xs:p-1 xs:space-y-0.25 5xl:max-h-80 5xl:p-4 5xl:space-y-2">
                        {timeSlots.map(time => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`w-full py-1 px-1.5 rounded text-center text-[10px] font-medium transition xs:py-0.5 xs:px-1 xs:text-[8px] 5xl:py-3 5xl:px-4 5xl:text-base ${
                              selectedTime === time
                                ? 'bg-teal-600 text-white'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      {errors.time && <p className="text-red-500 text-[10px] mt-0.5 xs:text-[8px] 5xl:text-sm">{errors.time}</p>}
                    </div>

                    <div>
                      <label className="block font-semibold mb-0.5 text-[10px] text-gray-700 xs:text-[8px] 5xl:text-base">
                        Duration <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="duration"
                        className="w-full px-2 py-1 bg-white border border-gray-300 rounded focus:outline-none focus:ring-0.5 focus:ring-teal-500 focus:border-teal-500 text-[10px] xs:px-1 xs:py-0.5 xs:text-[8px] 5xl:px-4 5xl:py-3 5xl:text-lg"
                        onChange={handleChange}
                        value={formData.duration}
                      >
                        <option value="30">30 minutes</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="w-full py-1.5 bg-teal-600 text-white rounded text-xs font-semibold hover:bg-teal-700 transition flex items-center justify-center gap-1 xs:py-1 xs:text-[10px] 5xl:py-4 5xl:text-xl 5xl:gap-3"
              >
                Next: Your Details
                <ArrowRight className="w-3 h-3 xs:w-2 xs:h-2 5xl:w-6 5xl:h-6" />
              </button>
            </div>
          )}

          {/* Step 2: Personal Info */}
          {currentStep === 2 && (
            <div className="space-y-3 xs:space-y-2 5xl:space-y-6">
              <h1 className="text-base font-bold text-gray-900 text-center mb-0.5 xs:text-sm xs:mb-0 5xl:text-2xl 5xl:mb-2">
                Your Details
              </h1>

              {/* Personal Information */}
              <div className="bg-gray-50 rounded p-3 border border-gray-200 xs:p-2 5xl:p-6">
                <div className="grid md:grid-cols-2 gap-2 xs:gap-1 5xl:gap-4">
                  <FormField
                    label="First Name"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName ? errors.firstName : undefined}
                    required
                  />
                  <FormField
                    label="Last Name"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName ? errors.lastName : undefined}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-2 mt-2 xs:gap-1 xs:mt-1 5xl:gap-4 5xl:mt-4">
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email ? errors.email : undefined}
                    required
                  />
                  <FormField
                    label="Phone Number"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone ? errors.phone : undefined}
                    required
                  />
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-gray-50 rounded p-3 border border-gray-200 xs:p-2 5xl:p-6">
                <div className="grid md:grid-cols-2 gap-2 xs:gap-1 5xl:gap-4">
                  <FormField
                    label="City"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city ? errors.city : undefined}
                  />
                  <FormField
                    label="ZIP Code"
                    name="zip"
                    placeholder="00000"
                    value={formData.zip}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.zip ? errors.zip : undefined}
                  />
                </div>
                <div className="mt-2 xs:mt-1 5xl:mt-4">
                  <FormField
                    label="Address"
                    name="address"
                    placeholder="Address Details"
                    value={formData.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address ? errors.address : undefined}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="bg-gray-50 rounded p-3 border border-gray-200 xs:p-2 5xl:p-6">
                <textarea
                  name="notes"
                  rows={1}
                  placeholder="Notes (Optional)"
                  className="w-full px-2 py-1 border focus:outline-none border-gray-300 rounded focus:ring-0.5 focus:ring-teal-500 focus:border-teal-500 text-[10px] xs:px-1 xs:py-0.5 xs:text-[8px] 5xl:px-4 5xl:py-3 5xl:text-lg"
                  onChange={handleChange}
                  value={formData.notes}
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-2 xs:gap-1 5xl:gap-4">
                <button
                  onClick={handleBack}
                  className="flex-1 py-1.5 border border-gray-300 text-gray-700 rounded text-xs font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-1 xs:py-1 xs:text-[10px] 5xl:py-4 5xl:text-xl"
                >
                  <ArrowLeft className="w-3 h-3 xs:w-2 xs:h-2 5xl:w-6 5xl:h-6" />
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-1.5 bg-teal-600 text-white rounded text-xs font-semibold hover:bg-teal-700 transition flex items-center justify-center gap-1 xs:py-1 xs:text-[10px] 5xl:py-4 5xl:text-xl"
                >
                  Confirm
                  <ArrowRight className="w-3 h-3 xs:w-2 xs:h-2 5xl:w-6 5xl:h-6" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FormField({ label, name, type = 'text', placeholder, value, onChange, onBlur, error, required }: FormFieldProps) {
  return (
    <div>
      <label className="block font-semibold mb-0.5 text-[10px] text-gray-700 xs:text-[8px] 5xl:text-base">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full px-2 py-1 bg-white border rounded focus:ring-0.5 focus:ring-teal-500 focus:border-teal-500 transition focus:outline-none text-[10px] xs:px-1 xs:py-0.5 xs:text-[8px] 5xl:px-4 5xl:py-3 5xl:text-lg ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {error && (
        <p className="text-red-500 text-[10px] mt-0.5 xs:text-[8px] 5xl:text-sm">{error}</p>
      )}
    </div>
  );
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="p-1.5 bg-gray-50 rounded border border-gray-200 xs:p-1 5xl:p-4">
      <p className="text-[10px] font-semibold text-gray-600 mb-0.5 xs:text-[8px] xs:mb-0.25 5xl:text-base 5xl:mb-2">{label}</p>
      <p className="text-gray-900 font-medium text-[10px] xs:text-[8px] 5xl:text-lg">{value}</p>
    </div>
  );
}

