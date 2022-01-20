import { GraphQLClient } from 'graphql-request';
import config from 'config';

// url api graphql dans graphcms
const graphqlContentUrl = config.get('graphcms.contentUrl') as string;
const graphqlUplaodUrl = config.get('graphcms.assetUrl') as string;


// client content
export const graphqlService = new GraphQLClient(graphqlContentUrl);

// client file
export const graphqlServiceFile = new GraphQLClient(graphqlUplaodUrl);
