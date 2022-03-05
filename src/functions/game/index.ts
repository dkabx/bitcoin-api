import { handlerPath } from '@libs/handlerResolver';

import schema from './schema';

export const updateScore = {
  handler: `${handlerPath(__dirname)}/handler.updateScore`,
  events: [
    {
      http: {
        method: 'post',
        path: 'update-score',
        cors: true,
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

export const getScore = {
  handler: `${handlerPath(__dirname)}/handler.getScore`,
  events: [
    {
      http: {
        method: 'post',
        path: 'get-score',
        cors: true,
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
