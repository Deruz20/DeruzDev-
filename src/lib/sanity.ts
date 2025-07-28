import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mock-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

export async function getHomePage(_locale: string) {
  const { mockHomePage } = await import('../data/mockData');
  return mockHomePage;
}

export async function getSchoolInfo(_locale: string) {
  const { mockSchoolInfo } = await import('../data/mockData');
  return mockSchoolInfo;
}

export async function getTeamMembers(_locale: string) {
  const { mockTeamMembers } = await import('../data/mockData');
  return mockTeamMembers;
}

export async function getAcademicPrograms(_locale: string) {
  const { mockAcademicPrograms } = await import('../data/mockData');
  return mockAcademicPrograms;
}

export async function getIslamicLife(_locale: string) {
  const { mockIslamicLife } = await import('../data/mockData');
  return mockIslamicLife;
}

export async function getNewsAndEvents(_locale: string) {
  const { mockNewsAndEvents } = await import('../data/mockData');
  return mockNewsAndEvents;
}

export async function getAdmissions(_locale: string) {
  const { mockAdmissions } = await import('../data/mockData');
  return mockAdmissions;
}

export async function getDonationPage(_locale: string) {
  const { mockDonationPage } = await import('../data/mockData');
  return mockDonationPage;
}

export async function getContactDetails(_locale: string) {
  const { mockContactDetails } = await import('../data/mockData');
  return mockContactDetails;
}

export async function getProducts(_locale: string) {
  const { mockProducts } = await import('../data/mockData');
  return mockProducts;
}

export async function getExpansion(_locale: string) {
  const { mockExpansion } = await import('../data/mockData');
  return mockExpansion;
}
