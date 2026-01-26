// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_BASE_PATH: 'http://devbox.bizbrolly.com:8089/', // http://localhost:8089/ this is the dev environemtn
  apiKey: 'api-api-api',
  apiUrl: 'http://devbox.bizbrolly.com:8089/',
  // apiUrl:'http://localhost:8089/',
  // apitoken: localStorage.getItem('token'),
  siteKey: '6LeRwk0gAAAAAP3rBC5O1KfqMdepTBlBh3rK8Ai7',
  imageBaseUrl: 'http://devbox.bizbrolly.com:8089/document/downloadFile?',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
