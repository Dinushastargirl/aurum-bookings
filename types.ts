
export enum UserRole {
  CLIENT = 'CLIENT',
  BUSINESS_OWNER = 'BUSINESS_OWNER',
  STAFF = 'STAFF',
  ADMIN = 'ADMIN'
}

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  NO_SHOW = 'NO_SHOW',
  PAYMENT_FAILED = 'PAYMENT_FAILED'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  location: string;
  city: string;
  category: string;
  rating: number;
  reviewsCount: number;
  gallery: string[];
  workingHours: WorkingHours[];
}

export interface WorkingHours {
  day: number; // 0-6 (Sun-Sat)
  start: string; // "08:30"
  end: string;   // "19:30"
  isOpen: boolean;
}

export interface Service {
  id: string;
  businessId: string;
  name: string;
  description: string;
  duration: number; // in minutes
  priceLKR: number;
  category: string;
}

export interface Staff {
  id: string;
  businessId: string;
  name: string;
  avatar: string;
  services: string[];
  workingHours: WorkingHours[];
}

export interface Appointment {
  id: string;
  businessId: string;
  staffId: string;
  clientId: string;
  clientName?: string;
  clientPhone?: string;
  serviceId: string;
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  totalPriceLKR: number;
}
