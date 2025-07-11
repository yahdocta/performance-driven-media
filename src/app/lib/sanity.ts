import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'x4ywkevt', 
  dataset: 'production',
  useCdn: false, // always get fresh data
  apiVersion: '2023-01-01', // use current date
});
