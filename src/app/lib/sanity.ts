import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'x4ywkevt', 
  dataset: 'production',
  useCdn: true, // faster, cached data (safe for public content)
  apiVersion: '2023-01-01', // use current date
});
