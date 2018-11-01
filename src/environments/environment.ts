// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000',
  facebook: {
    app: {
      appId: '500393423427790',
      version: 'v2.11',
      xfbml: true
    },
    pixelId: '1800414636686182',
    pageId: '153380438116729'
  },
  debug: true
};
