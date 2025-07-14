// sanity.ts
// Sanity client configuration for Performance Driven Media. Used to fetch content from Sanity CMS.

import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'x4ywkevt', // Your Sanity project ID
  dataset: 'production', // Dataset to use
  useCdn: false, // Always get fresh data
  apiVersion: '2023-01-01', // Use current date for API version
});
