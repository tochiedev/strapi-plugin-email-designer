module.exports = [
  {
    method: 'GET',
    path: '/templates',
    handler: 'designer.getTemplates',
    config: { policies: [] },
  },
  {
    method: 'GET',
    path: '/templates/:templateId',
    handler: 'designer.getTemplate',
    config: { policies: [] },
  },
  {
    method: 'POST',
    path: '/templates/:templateId',
    handler: 'designer.saveTemplate',
    config: { policies: [] },
  },
  {
    method: 'DELETE',
    path: '/templates/:templateId',
    handler: 'designer.deleteTemplate',
    config: { policies: [] },
  },
  {
    method: 'POST',
    path: '/templates/duplicate/:sourceTemplateId',
    handler: 'designer.duplicateTemplate',
    config: { policies: [] },
  },
  {
    method: 'GET',
    path: '/config/:configKey',
    handler: 'config.getConfig',
    config: { policies: [] },
  },
  {
    method: 'GET',
    path: '/core/:coreEmailType',
    handler: 'designer.getCoreEmailType',
    config: { policies: [] },
  },
  {
    method: 'POST',
    path: '/core/:coreEmailType',
    handler: 'designer.saveCoreEmailType',
    config: { policies: [] },
  },
  //Layouts.
  {
    method: 'GET',
    path: '/layouts',
    handler: 'layout.getLayouts',
    config: { policies: [] },
  },
  {
    method: 'POST',
    path: '/layouts/:layoutId',
    handler: 'layout.saveLayout',
    config: { policies: [] },
  },
];
