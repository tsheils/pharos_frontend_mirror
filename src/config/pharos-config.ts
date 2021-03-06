import {COMPONENTSCONFIG, PharosPanel} from '../config/components-config';
import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';


/**
 * pharos host url
 * todo might not want to bring environment variables into play here
 * @type {string}
 * @private
 */
const _HOST = environment.host;

/**
 * api version string
 * @type {string}
 * @private
 */
const _API = environment.api;

/**
 * main bundle of api calls used in pharos
 * @type {any}
 */
const PHAROSCONFIG: any = {
  apiUrl: _HOST + _API,
  suggestUrl: _HOST + _API + 'suggest?q=',
  radarUrl: _HOST + _API + 'hg/data?type=radar-attr_type&q=',
  radarSourcesUrl: _HOST + _API + 'hg/ds?type=radar-attr_type&q=',
  structureImageUrl: _HOST + _API + 'struc/',
  homunculusUrl: _HOST + _API + 'expression/homunculus?acc=_id_&source=',
  molConvertUrl: _HOST + _API + 'smiles',
  topicResolveUrl: `${_HOST}${_API}topics/target`,
  components: COMPONENTSCONFIG,
  graphqlUrl: environment.graphqlUrl
};

/**
 * main config object bundled with helper functions, because the object is private
 */
@Injectable({
  providedIn: 'root'
})
export class PharosConfig {
  /**
   * return main api url
   * @returns {string}
   */
   getApiPath(): string {
    return PHAROSCONFIG.apiUrl;
  }

  /**
   * get search url for typeahead suggestions
   * @returns {string}
   */
   getSuggestPath(): string {
    return PHAROSCONFIG.suggestUrl;
  }

  /**
   * get url to retrieve radar graph data
   * @return {string}
   */
   getRadarPath(): string {
    return PHAROSCONFIG.radarUrl;
  }

  /**
   * get url to retrieve radar graph data sources
   * @return {string}
   */
   getRadarSourcesPath(): string {
    return PHAROSCONFIG.radarSourcesUrl;
  }

  /**
   * returns the url for the structure image
   * the component finishes the url with the uuid and '.svg':
   * @return {string}
   */
   getStructureImageUrl(): string {
    return PHAROSCONFIG.structureImageUrl;
  }

  /**
   * get url for mol conversion api
   * @returns {string}
   */
   getMolConvertUrl(): string {
    return PHAROSCONFIG.molConvertUrl;
  }

  getTopicResolveUrl(): string {
     return PHAROSCONFIG.topicResolveUrl;
  }


// todo: deprecate
  /**
   * url for homunculus api
   * @param {string} id
   * @returns {string}
   */
   getHomunculusUrl(id: string): string {
    return PHAROSCONFIG.homunculusUrl.replace('_id_', id);
  }


  /**
   * returns the list of apis that a search query hits
   * @return {any[]}
   */
   getSearchPaths(): any[] {
    return PHAROSCONFIG.components.has('search') ? PHAROSCONFIG.components.get('search').api : null;
  }

  /**
   * returns default api url
   * @param {string} path
   * @returns {string}
   */
   getDefaultUrl(path: string): string {
    return PHAROSCONFIG.components.has(path) ? PHAROSCONFIG.components.get(path).default : null;
  }

  /**
   * fetches components by main level path, and subpath if provided.
   * If there are no associated components null is returned
   * @param {string} path The top level path for the environment object
   * @param {string} subpath (optional) sub path for a smaller subset of components
   * @returns {any[]} array of component tokens/api calls or null
   *
   */
   getComponents(path: string, subpath?: string): PharosPanel[] {
    if (PHAROSCONFIG.components.has(path)) {
      if (subpath) {
        const value = subpath
          .split('.')
          .reduce((a, b) => a[b], PHAROSCONFIG.components.get(path));
        return value.components;
      } else {
        return PHAROSCONFIG.components.get(path);
      }
    } else {
      return null;
    }
  }
}
