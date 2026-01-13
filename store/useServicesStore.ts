import { create } from "zustand";
import { useGetData } from "../hooks/useGetData";
import { useInsertData } from "../hooks/useInsertData";

type ServicesState = {
  services: any[];
  booking: any | null;
  loading: boolean;
  error: any;

  getServices: () => Promise<void>;
  createServiceBooking: (data: any) => Promise<void>;
};

export const useServicesStore = create<ServicesState>((set) => ({
  services: [],
  booking: null,
  loading: false,
  error: null,

  /* ===== GET SERVICES ===== */
  getServices: async () => {
    set({ loading: true, error: null });
    try {
      const res = await useGetData(`service`); 
      set({ services: res, loading: false });
    } catch (error: any) {
      set({
        error: error.response || error.message,
        loading: false,
      });
    }
  },

  /* ===== CREATE SERVICE BOOKING ===== */
  createServiceBooking: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await useInsertData("web-services-booking", data);
      set({ booking: res, loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data || error.message,
        loading: false,
      });
    }
  },
}));
