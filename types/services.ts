/* =========================
   SERVICES TYPES
========================= */

export interface IService {
    id: string;
    category: string;
    title: string;
    description: string;
    price: number;
    paymentLink: string;
    image: string;
    subservices?: IService[];
  }
  
  /* =========================
     API RESPONSES
  ========================= */
  
  export type ServicesResponse = IService[];
  
  /* =========================
     COMPONENT PROPS
  ========================= */
  
  export interface CardDetailsProps {
    link: string;
    btn: string;
    service: IService;
    disableModal?: boolean;
  }
  
  export interface CategoriesModalProps {
    isOpen: boolean;
    onClose: () => void;
    service: IService;
  }
  