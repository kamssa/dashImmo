import {DetailTerrain} from './DetailTerrain';

export class ImageDetail {
  constructor(public id ?: number,
              public version?: number,
              public  imageUrl?: string,
              public  imageId?: string,
              public  detailTerrain?: DetailTerrain) {}
}
