export interface LocalizedString {
  en: string;
  ar: string;
  fr: string;
  lg: string;
}

export interface HomePage {
  _id: string;
  title: LocalizedString;
  heroTitle: LocalizedString;
  heroSubtitle: LocalizedString;
  missionTitle: LocalizedString;
  missionDescription: LocalizedString;
  principlesTitle: LocalizedString;
  principles: Array<{
    title: LocalizedString;
    description: LocalizedString;
    icon: string;
  }>;
  callToActionTitle: LocalizedString;
  callToActionDescription: LocalizedString;
}

export interface SchoolInfo {
  _id: string;
  name: LocalizedString;
  mission: LocalizedString;
  vision: LocalizedString;
  story: LocalizedString;
  address: LocalizedString;
  phone: string;
  email: string;
}

export interface TeamMember {
  _id: string;
  name: LocalizedString;
  position: LocalizedString;
  bio: LocalizedString;
  image: string;
  order: number;
}

export interface AcademicProgram {
  _id: string;
  name: LocalizedString;
  description: LocalizedString;
  ageRange: LocalizedString;
  subjects: string[];
  fees: {
    tuition: number;
    registration: number;
    uniform: number;
    books: number;
  };
}

export interface IslamicLife {
  _id: string;
  title: LocalizedString;
  description: LocalizedString;
  practices: Array<{
    name: LocalizedString;
    description: LocalizedString;
    time: LocalizedString;
  }>;
}

export interface NewsEvent {
  _id: string;
  title: LocalizedString;
  description: LocalizedString;
  content: LocalizedString;
  date: string;
  image?: string;
  category: 'news' | 'event';
}

export interface Admissions {
  _id: string;
  title: LocalizedString;
  description: LocalizedString;
  requirements: string[];
  process: Array<{
    step: number;
    title: LocalizedString;
    description: LocalizedString;
  }>;
  documents: string[];
}

export interface DonationPage {
  _id: string;
  title: LocalizedString;
  appealMessage: LocalizedString;
  paymentInstructions: LocalizedString;
  bankDetails: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    swiftCode: string;
    branch: string;
  }[];
  mobileMoneyNumbers: {
    provider: string;
    number: string;
    name: string;
  }[];
  materialDonations: string[];
}

export interface ContactDetails {
  _id: string;
  address: LocalizedString;
  phone: string;
  email: string;
  openingHours: LocalizedString;
  mapCoordinates: {
    lat: number;
    lng: number;
  };
}

export interface Product {
  _id: string;
  productName: LocalizedString;
  productImage: string;
  description: LocalizedString;
  price: number; // in UGX
  category: LocalizedString;
  stockQuantity: number;
  slug: string;
}

export interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  orderDate: string;
  deliveryAddress: string;
}

export interface Expansion {
  _id: string;
  title: LocalizedString;
  description: LocalizedString;
  boardingInfo: LocalizedString;
  futureGrowthPlans: LocalizedString;
  timeline: LocalizedString;
  benefits: LocalizedString[];
}

export interface BoardingApplication {
  _id: string;
  studentName: string;
  studentAge: number;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  currentSchool: string;
  medicalInfo: string;
  emergencyContact: string;
  emergencyPhone: string;
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export type Locale = 'en' | 'ar' | 'fr' | 'lg';
