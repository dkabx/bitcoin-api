export default {
  type: 'object',
  properties: {
    email: { type: 'string' },
    score: { type: 'number' },
  },
  required: ['email'],
} as const;
