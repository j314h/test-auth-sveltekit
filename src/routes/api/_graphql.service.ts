import { GraphQLClient } from 'graphql-request';

const graphqlContentUrl = import.meta.env.VITE_GRAPHCMS;
const graphqlUploaddUrl = import.meta.env.VITE_GRAPHCMS_UPLOAD;

// client content
export const graphqlService = new GraphQLClient(graphqlContentUrl);

// client file
export const graphqlServiceFile = new GraphQLClient(graphqlUploaddUrl);
