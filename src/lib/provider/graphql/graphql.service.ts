import { GraphQLClient } from 'graphql-request';
//import config from 'config';

// url api graphql dans graphcms
//const graphqlContentUrl = config.get('graphcms.contentUrl') as string;
//const graphqlUplaodUrl = config.get('graphcms.assetUrl') as string;
const graphqlUplaodUrl = import.meta.env.VITE_GRAPHQL;

// client content
//export const graphqlService = new GraphQLClient(graphqlContentUrl);
export const graphqlService = new GraphQLClient(graphqlUplaodUrl);

// client file
//export const graphqlServiceFile = new GraphQLClient(graphqlUplaodUrl);
