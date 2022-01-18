import { GraphQLClient } from 'graphql-request';
import config from 'config';

// url api graphql dans graphcms
const graphqlContentUrl = config.get('graphcms.contentUrl') as string;

// client content
export const graphqlService = new GraphQLClient(graphqlContentUrl);
