import {PharosBase, PharosSerializer, PharosSubList} from './pharos-base';
import {PharosProperty} from './pharos-property';
import gql from 'graphql-tag';
import {DataProperty} from '../tools/generic-table/components/property-display/data-property';

const LISTFIELDS =  gql`
  fragment listFields on Target {
    _tcrdid:tcrdid
    name
    gene: sym
    accession: uniprot
    idgFamily: fam
    idgTDL: tdl
    novelty
    description
    uniProtFunction: props (name: "UniProt Function"){
      value
    }
    jensenScore: props(name: "JensenLab PubMed Score") {
      value
    }
    antibodyCount: props(name: "Ab Count") {
      value
    }
    ppiCount: ppiCounts {
      value
    }
  }
`;


const DETAILSFIELDS = gql`
  #import "./listFields.gql"
  fragment detailsFields on Target {
    ...listFields
    symbols: synonyms(name: "symbol") {
      name
      value
    }
    generifCount
    uniprotIds: synonyms(name: "uniprot") {
      name
      value
    }
    ensemblId: synonyms(name: "Uniprot") {
      name
      value
    }
  }
  ${LISTFIELDS}
`;



/**
 * main target object
 */
export class Target extends PharosBase {

  static listfragments  = LISTFIELDS;

  static detailsfragments = DETAILSFIELDS;

  /**
   * target name
   */
  name: string;

  /**
   * target gene name
   */
  gene: string;

  /**
   * target accession id
   */
  accession: string;

  /**
   * target description
   */
  description: string;

  /**
   * idg family distinction
   */
  idgFamily: string;

  /**
   * idg development level
   */
  idgTDL: string;

  /**
   * idg novelty score
   */
  novelty:  number;

  /**
   * text mined publication score
   */
  jensenScore:  number;


  uniprotIds: string[] | any[];

  symbols: string[];

  /**
   * antibodipedia.org? count
   */
  antibodyCount:  number;

  /**
   * Gene RiF count
   */
  generifCount:  number;


  drugs: [];
  /**
   * monoclonal count
   * // todo: not used
   */
  monoclonalCount: number;

  /**
   * number of publications
   */
  pubmedCount:  number;



  /**
   * number of patents
   */
  patentCount:  number;

  /**
   * number of grants
   */
  grantCount:  number;

  /**
   * amount of grant funding
   */
  grantTotalCost:  number;

  /**
   * number of r01 grants
   */
  r01Count:  number;

  /**
   * number of protein-protein interactions
   */
  ppiCount:  number | any[];

  /**
   * knowledge availability score
   */
  knowledgeAvailability:  number;

  /**
   * pubtator literature score
   */
  pubTatorScore:  number;

  /**
   * sublist object for links
   */
  _links: PharosSubList;

  /**
   * links count
   */
  _linksCount: number;
  /**
   * sublist object for properties
   */
  _properties: PharosSubList;

  /**
   * properties count
   */
  _propertiesCount: number;
  /**
   * sublist object for synonyms
   */
  _synonyms: PharosSubList;

  /**
   * synonyms count
   */
  _synonymsCount: number;

  /**
   * sublist object for publications
   */
  _publications: PharosSubList;

  /**
   * count of publications
   */
  _publicationsCount: number;
}

/**
 * serializer for publicaiton object operations
 */
export class TargetSerializer implements PharosSerializer {

  /**
   * no args constructor
   */
  constructor () {}

  /**
   * create target object from json
   * @param json
   * @return {Target}
   */
  fromJson(json: any): Target {
    const obj = new Target();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);

    /**
     * mapping graphql responses, since they are returned as arrays
     */
    if (json.novelty) {
    obj.novelty = +json.novelty.toFixed(2);
    }

    if (json.jensenScore && json.jensenScore.length) {
    obj.jensenScore = +(+json.jensenScore[0].value).toFixed(2);
    }

    if (json.antibodyCount && json.antibodyCount.length) {
    obj.antibodyCount = +(+json.antibodyCount[0].value).toFixed(2);
    }

    if (json.ppiCount) {
    obj.ppiCount = json.ppiCount.reduce((prev, cur) => prev + cur.value, 0);
    }

    if (json.uniprotIds) {
      obj.uniprotIds = [{uniprotId: obj.accession}, ...json.uniprotIds.map(id => id = {uniprotId: id.value})];
    } else {
      obj.uniprotIds = [{uniprotId: obj.accession}];
    }

    if (json.symbols) {
      obj.symbols = [...new Set<string>(json.symbols.map(sym => sym = {symbol: sym.value}))];
    }

    if (json.uniProtFunction) {
      obj.description = `${(json.uniProtFunction.map(id => id.value)).join(' ')} ${obj.description}`;
    }

    // console.log(obj);

    if (obj._links) {
      obj._links = new PharosSubList(obj._links);
      obj._linksCount = obj._links.count;
    }
    if (obj._properties) {
      obj._properties = new PharosSubList(obj._properties);
      obj._propertiesCount = obj._properties.count;
    }
    if (obj._synonyms) {
      obj._synonyms = new PharosSubList(obj._synonyms);
      obj._synonymsCount = obj._synonyms.count;
    }
    if (obj._publications) {
      obj._publications = new PharosSubList(obj._publications);
      obj._publicationsCount = obj._publications.count;
    }
    return obj;
  }

  /**
   * flatten target to json
   * @param {PharosBase} obj
   * @return {any}
   */
  toJson(obj: PharosBase): any {
    return [];
  }

  /**
   * return target as properties
   * @param {PharosBase} obj
   * @return {any}
   * @private
   */
  _asProperties(obj: Target): any {
    console.log(obj);
    const newObj: any = this._mapField(obj);
    if (newObj.accession && newObj.accession.term) {
      newObj.name.internalLink = ['/targets', newObj.accession.term];
    }

    if (newObj.gene && newObj.gene.term) {
      newObj.gene.internalLink = ['/targets', newObj.gene.term];
    }
    console.log(newObj);
    return newObj;
  }

  private _mapField (obj: any) {
    const retObj: {} = Object.assign({}, obj);
      Object.keys(obj).map(objField => {
        if (Array.isArray(obj[objField])) {
          retObj[objField] = obj[objField].map(arrObj => this._mapField(arrObj));
        } else {
          retObj[objField] = new DataProperty({name: objField, label: objField, term: obj[objField]});
        }
      });
    return retObj;
  }

  _fromProperties(properties: any): Target {
    const target = new Target();
    Object.keys(properties).forEach(prop => target[prop] = properties[prop].term);
    return target;
  }


}




