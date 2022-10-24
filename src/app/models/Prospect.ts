
export class Prospects {
   constructor(public id ?: number,
              public version?: number,
              public  nom?: string,
              public prenom?: string,
              public nomComplet?: string,
              public email?: string,
              public codePays?:string,
              public telephone?:string,
              public fonction?:string,
              public satisfait?: boolean,
              public preocupation?:string
                       )
                        {
  }

}
