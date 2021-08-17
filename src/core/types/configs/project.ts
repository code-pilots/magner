import type { DataToUrlHelper, UrlToDataHelper } from 'app/proxies/get-request';

export interface ProjectConfig {
  /** Full name of the project */
  name: string,

  /** Short name without spaces and dashes (-) */
  short_name: string,

  /** Project description */
  description?: string,

  /** Used for creating the admin panel during first stages of development if you still don't have a backend.
   * It disables the roles feature and helps logging in.<br>
   * But it still requires request functions to be written which you can simple make empty (return void). */
  noBackendMode?: boolean,

  /** Helper functions required for proper functioning of the admin panel */
  helpers: {
    /** Proxy function from the request data to URL needed in GET requests */
    dataToUrl: DataToUrlHelper,
    /** Proxy function from the URL query to the data object, opposite to 'dataToUrl' function */
    urlToData: UrlToDataHelper,
  },
}
