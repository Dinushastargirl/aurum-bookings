
import { Business, Service, Staff, Appointment, AppointmentStatus } from './types';

export const MOCK_BUSINESS: Business = {
  id: 'aurum_1',
  name: 'Aurum Studio',
  description: 'Minimalist creative grooming and wellness space.',
  location: 'Studio 4, Level 2, Galle Road',
  city: 'Colombo 03',
  category: 'Styling & Wellness',
  rating: 5.0,
  reviewsCount: 420,
  gallery: ['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'],
  workingHours: [
    { day: 0, start: '08:30', end: '19:30', isOpen: true }, // Sun
    { day: 1, start: '08:30', end: '19:30', isOpen: false }, // Mon - Closed
    { day: 2, start: '08:30', end: '19:30', isOpen: true }, // Tue
    { day: 3, start: '08:30', end: '19:30', isOpen: true }, // Wed
    { day: 4, start: '08:30', end: '19:30', isOpen: true }, // Thu
    { day: 5, start: '08:30', end: '19:30', isOpen: true }, // Fri
    { day: 6, start: '08:30', end: '19:30', isOpen: true }, // Sat
  ]
};

export const MOCK_SERVICES: Service[] = [
  // BLOW DRY
  { id: 'bd_short', businessId: 'aurum_1', name: 'Blow Dry (Short)', description: 'Quick styling for short hair', duration: 30, priceLKR: 2000, category: 'Blow Dry' },
  { id: 'bd_medium', businessId: 'aurum_1', name: 'Blow Dry (Medium)', description: 'Styling for medium length hair', duration: 45, priceLKR: 3000, category: 'Blow Dry' },
  { id: 'bd_long', businessId: 'aurum_1', name: 'Blow Dry (Long)', description: 'Detailed styling for long hair', duration: 60, priceLKR: 4000, category: 'Blow Dry' },

  // HAIR CUT
  { id: 'hc_ladies', businessId: 'aurum_1', name: 'Ladies Hair Cut', description: 'Professional cut and finish', duration: 60, priceLKR: 4500, category: 'Hair Cut' },
  { id: 'trim_ladies', businessId: 'aurum_1', name: 'Ladies Trim', description: 'Simple maintenance trim', duration: 30, priceLKR: 2500, category: 'Hair Cut' },
  { id: 'hc_gents', businessId: 'aurum_1', name: 'Gents Hair Cut', description: 'Precision gents cut', duration: 45, priceLKR: 2000, category: 'Hair Cut' },
  { id: 'beard_gents', businessId: 'aurum_1', name: 'Gents Beard', description: 'Beard trim and shape', duration: 20, priceLKR: 1000, category: 'Hair Cut' },

  // ROOT COLOUR
  { id: 'root_ladies', businessId: 'aurum_1', name: 'Ladies Grey Hair 1"', description: 'Standard root touch up', duration: 90, priceLKR: 4000, category: 'Root Colour' },
  { id: 'root_gents', businessId: 'aurum_1', name: 'Gents Grey Hair 1"', description: 'Gents grey coverage', duration: 60, priceLKR: 2000, category: 'Root Colour' },
  { id: 'root_hairline', businessId: 'aurum_1', name: 'Hair Line Front Ear to Ear', description: 'Targeted grey coverage', duration: 45, priceLKR: 2000, category: 'Root Colour' },
  { id: 'root_full', businessId: 'aurum_1', name: 'Full Grey Cover 1"+', description: 'Extended root coverage', duration: 120, priceLKR: 5500, category: 'Root Colour' },

  // THREADING
  { id: 'th_eyebrows', businessId: 'aurum_1', name: 'Threading: Eyebrows', description: 'Shape and clean', duration: 15, priceLKR: 500, category: 'Threading' },
  { id: 'th_upperlip', businessId: 'aurum_1', name: 'Threading: Upper Lip + Chin', description: 'Quick clean up', duration: 15, priceLKR: 500, category: 'Threading' },
  { id: 'th_fullface', businessId: 'aurum_1', name: 'Threading: Full Face', description: 'Complete facial threading', duration: 30, priceLKR: 2000, category: 'Threading' },

  // DRESSING
  { id: 'dr_style', businessId: 'aurum_1', name: 'Hair Style', description: 'Creative styling', duration: 45, priceLKR: 4000, category: 'Dressing' },
  { id: 'dr_setting', businessId: 'aurum_1', name: 'Hair Setting', description: 'Long-lasting hair setting', duration: 60, priceLKR: 4000, category: 'Dressing' },
  { id: 'dr_saree', businessId: 'aurum_1', name: 'Saree Drape', description: 'Professional draping', duration: 30, priceLKR: 2000, category: 'Dressing' },
  { id: 'dr_full', businessId: 'aurum_1', name: 'Full Dressing', description: 'Complete event look', duration: 120, priceLKR: 10000, category: 'Dressing' },

  // HAIR TREATMENT
  { id: 'ht_oil', businessId: 'aurum_1', name: 'Oil Treatment (w Steam)', description: 'Traditional oil therapy', duration: 45, priceLKR: 2000, category: 'Hair Treatment' },
  { id: 'ht_wash', businessId: 'aurum_1', name: 'Wash & Dry', description: 'Basic refreshment', duration: 30, priceLKR: 2500, category: 'Hair Treatment' },
  { id: 'ht_spa', businessId: 'aurum_1', name: 'Spa Conditioning', description: 'Deep hair spa', duration: 60, priceLKR: 3500, category: 'Hair Treatment' },
  { id: 'ht_mask', businessId: 'aurum_1', name: 'Mask Conditioning', description: 'Nourishing mask', duration: 60, priceLKR: 3500, category: 'Hair Treatment' },

  // FASHION COLOUR
  { id: 'fc_short', businessId: 'aurum_1', name: 'Fashion Colour (Short)', description: 'Trend-setting short colour', duration: 120, priceLKR: 5500, category: 'Fashion Colour' },
  { id: 'fc_medium', businessId: 'aurum_1', name: 'Fashion Colour (Medium)', description: 'Vibrant medium colour', duration: 150, priceLKR: 8500, category: 'Fashion Colour' },
  { id: 'fc_long', businessId: 'aurum_1', name: 'Fashion Colour (Long)', description: 'Stunning long hair colour', duration: 180, priceLKR: 11500, category: 'Fashion Colour' },

  // HIGHLIGHTS
  { id: 'hl_short', businessId: 'aurum_1', name: 'Highlights (Short)', description: 'Dimensional highlights', duration: 120, priceLKR: 15000, category: 'Highlights' },
  { id: 'hl_medium', businessId: 'aurum_1', name: 'Highlights (Medium)', description: 'Radiant medium highlights', duration: 150, priceLKR: 20000, category: 'Highlights' },
  { id: 'hl_long', businessId: 'aurum_1', name: 'Highlights (Long)', description: 'Lustrous long highlights', duration: 180, priceLKR: 25000, category: 'Highlights' },
  { id: 'hl_ombre', businessId: 'aurum_1', name: 'Balayage / Ombre', description: 'Hand-painted transition', duration: 210, priceLKR: 30000, category: 'Highlights' },
  { id: 'hl_gents', businessId: 'aurum_1', name: 'Gents Cap Highlight', description: 'Specific gents highlighting', duration: 90, priceLKR: 5500, category: 'Highlights' },

  // FACIALS
  { id: 'f_cleanup', businessId: 'aurum_1', name: 'Facial: Cleanup', description: 'Quick skin refresh', duration: 45, priceLKR: 5500, category: 'Facials' },
  { id: 'f_basic', businessId: 'aurum_1', name: 'Basic Facial', description: 'Standard skin care', duration: 60, priceLKR: 7500, category: 'Facials' },
  { id: 'f_balancing', businessId: 'aurum_1', name: 'Balancing Facial', description: 'Restore skin harmony', duration: 90, priceLKR: 10000, category: 'Facials' },
  { id: 'f_lightening', businessId: 'aurum_1', name: 'Lightening Facial', description: 'Brighten skin tone', duration: 90, priceLKR: 10000, category: 'Facials' },
  { id: 'f_acne', businessId: 'aurum_1', name: 'Acne Facial', description: 'Targeted acne treatment', duration: 90, priceLKR: 10000, category: 'Facials' },

  // HAIR REMOVAL
  { id: 'hr_wax_face', businessId: 'aurum_1', name: 'Face Wax', description: 'Smooth facial finish', duration: 30, priceLKR: 2500, category: 'Hair Removal' },
  { id: 'hr_arm_full', businessId: 'aurum_1', name: 'Full Arm Wax', description: 'Complete arm removal', duration: 45, priceLKR: 4000, category: 'Hair Removal' },
  { id: 'hr_arm_half', businessId: 'aurum_1', name: 'Half Arm Wax', description: 'Quick arm removal', duration: 30, priceLKR: 2500, category: 'Hair Removal' },
  { id: 'hr_leg_full', businessId: 'aurum_1', name: 'Full Leg Wax', description: 'Complete leg removal', duration: 60, priceLKR: 5000, category: 'Hair Removal' },
  { id: 'hr_leg_half', businessId: 'aurum_1', name: 'Half Leg Wax', description: 'Standard leg removal', duration: 30, priceLKR: 3500, category: 'Hair Removal' },
  { id: 'hr_underarm', businessId: 'aurum_1', name: 'Under Arm Wax', description: 'Quick underarm removal', duration: 15, priceLKR: 2000, category: 'Hair Removal' },

  // MANI PEDI (LADIES)
  { id: 'mani_l_norm', businessId: 'aurum_1', name: 'Ladies Manicure (Normal)', description: 'Standard manicure', duration: 45, priceLKR: 3500, category: 'Mani Pedi - Ladies' },
  { id: 'mani_l_gel', businessId: 'aurum_1', name: 'Ladies Manicure (Gel)', description: 'Long-lasting gel mani', duration: 60, priceLKR: 4500, category: 'Mani Pedi - Ladies' },
  { id: 'pedi_l_norm', businessId: 'aurum_1', name: 'Ladies Pedicure (Normal)', description: 'Standard pedicure', duration: 60, priceLKR: 4000, category: 'Mani Pedi - Ladies' },
  { id: 'pedi_l_gel', businessId: 'aurum_1', name: 'Ladies Pedicure (Gel)', description: 'Long-lasting gel pedi', duration: 75, priceLKR: 5000, category: 'Mani Pedi - Ladies' },

  // MANI PEDI (GENTS)
  { id: 'mani_g', businessId: 'aurum_1', name: 'Gents Manicure', description: 'Gents hand grooming', duration: 45, priceLKR: 2500, category: 'Mani Pedi - Gents' },
  { id: 'pedi_g', businessId: 'aurum_1', name: 'Gents Pedicure', description: 'Gents foot grooming', duration: 60, priceLKR: 3500, category: 'Mani Pedi - Gents' },

  // GROUP PACKAGES
  { id: 'grp_2', businessId: 'aurum_1', name: 'Group Package (For 2)', description: 'Shared beauty experience', duration: 120, priceLKR: 28000, category: 'Group Packages' },
  { id: 'grp_3', businessId: 'aurum_1', name: 'Group Package (For 3)', description: 'Group wellness session', duration: 120, priceLKR: 40000, category: 'Group Packages' },
  { id: 'grp_4', businessId: 'aurum_1', name: 'Group Package (For 4)', description: 'The ultimate group experience', duration: 120, priceLKR: 50000, category: 'Group Packages' },
];

export const MOCK_STAFF: Staff[] = [
  { 
    id: 'stf_1', 
    businessId: 'aurum_1', 
    name: 'Kasun Rathnayake', 
    avatar: 'https://i.pravatar.cc/150?u=kasun', 
    services: MOCK_SERVICES.map(s => s.id), // All services assigned
    workingHours: MOCK_BUSINESS.workingHours 
  },
  { 
    id: 'stf_2', 
    businessId: 'aurum_1', 
    name: 'Praneeth Perera', 
    avatar: 'https://i.pravatar.cc/150?u=praneeth', 
    services: MOCK_SERVICES.filter(s => ['hc_gents', 'beard_gents', 'mani_g', 'pedi_g'].includes(s.id)).map(s => s.id),
    workingHours: MOCK_BUSINESS.workingHours 
  },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'aurum_appt_1',
    businessId: 'aurum_1',
    staffId: 'stf_1',
    clientId: 'c_1',
    clientName: 'Nimal Silva',
    clientPhone: '0771234567',
    serviceId: 'Signature Haircut',
    startTime: new Date(new Date().setHours(9, 30)),
    endTime: new Date(new Date().setHours(10, 15)),
    status: AppointmentStatus.CONFIRMED,
    totalPriceLKR: 4500
  },
  {
    id: 'aurum_appt_2',
    businessId: 'aurum_1',
    staffId: 'stf_2',
    clientId: 'c_2',
    clientName: 'Sunil Perera',
    clientPhone: '0719876543',
    serviceId: 'Beard Sculpture',
    startTime: new Date(new Date().setHours(14, 0)),
    endTime: new Date(new Date().setHours(14, 30)),
    status: AppointmentStatus.COMPLETED,
    totalPriceLKR: 2500
  }
];
