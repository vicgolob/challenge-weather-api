const schema = {
  query: {
    type: 'object',
    properties: {
      location: { type: 'string' },
      tempReference: { type: 'string' },
      comparison: { type: 'string', enum: ['gt', 'lt', 'eq'] },
    },
    required: ['location', 'tempReference', 'comparison'],
  },
  response: {
    200: {
      type: 'boolean',
    },
  },
};

export default schema;
