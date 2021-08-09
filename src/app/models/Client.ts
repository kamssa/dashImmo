import {Adresse} from './Adresse';
import {Personne} from './Personne';

export class Client extends Personne{
  constructor(public id ?: number,
              public version?: number,
              public titre?: string,
              public nom?: string,
              public prenom?: string,
              public email?: string,
              public  numCni?: string,
              public codePays?: string,
              public telephone?: string,
              public password?: string,
              public fonction?: string,
              public nomComplet?: string,
              public adresse?: Adresse,
              public actived?: boolean,
              public type?: string) {
    super(id, version, titre, nom, prenom, email, numCni, codePays, telephone, password, fonction, nomComplet, adresse, actived, type);
  }

}
