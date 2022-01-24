import { GraphQLClient } from 'graphql-request';
import { GraphqlWooCrud } from 'woopear-crud-sveltekit';

const graphqlContentUrl = import.meta.env.VITE_GRAPHCMS;
const graphqlUploaddUrl = import.meta.env.VITE_GRAPHCMS_UPLOAD;

// client content
export const graphqlService = new GraphQLClient(graphqlContentUrl);

// client file
export const graphqlServiceFile = new GraphQLClient(graphqlUploaddUrl);

// test package woopear-crud-sveltekit
export const graphqlCms = new GraphqlWooCrud(graphqlContentUrl);
