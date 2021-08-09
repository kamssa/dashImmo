import {Maison} from "./Maison";
import {Document} from './Document';
import {FlashMaison} from './FlashMaison';

export class DetailFlashMaison {
  constructor( public id ?: number,
               public version?: number,
               public libelle?: string,
               public description ?: string,
               public prix ?: number,
               public nbreChambre?: number,
               public nbreSalleEau?: number,
               public nbreCuisine?: number,
               public nbreSaleMange?: number,
               public nbreBuanderie?: number,
               public nbreTerrasse?: number,
               public flashMaison?: FlashMaison,
               public document?: Document
  ) {
  }
}
