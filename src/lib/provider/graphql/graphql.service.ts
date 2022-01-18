import { GraphQLClient } from 'graphql-request';
import config from 'config';
import { ERole } from '$lib/types/role.type';

// url api graphql dans graphcms
const graphqlContentUrl = config.get('graphcms.contentUrl') as string;

// client content
export const graphqlService = new GraphQLClient(graphqlContentUrl);
