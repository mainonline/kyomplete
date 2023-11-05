const aliases = (prefix = `src`) => ({
  '@kyo': `${prefix}/@kyo`,
  '@history': `${prefix}/@history`,
  '@lodash': `${prefix}/@lodash`,
  'app/store': `${prefix}/app/store`,
  'app/shared-components': `${prefix}/app/shared-components`,
  'app/configs': `${prefix}/app/configs`,
  'app/app-layouts': `${prefix}/app/app-layouts`,
  'app/AppContext': `${prefix}/app/AppContext`,
});

module.exports = aliases;
