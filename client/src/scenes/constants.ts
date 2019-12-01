// tslint:disable: ordered-imports
// tslint:disable: object-literal-sort-keys
import * as skyMap from 'assets/maps/skyMap.png';
import * as mainMap from 'assets/maps/terrainMap.png';
import * as mapTile from 'assets/maps/gameTile.json';
import * as pinkMountain from 'assets/maps/pinkMountain.png';

export const assets = {
   tileBox: {
      width: 64,
   },
   skyMap: {
      name: 'skyMap',
      data: skyMap,
   },
   pinkMountain: {
      name: 'pinkMountain',
      data: pinkMountain,
   },
   mainMap: {
      name: 'mainMap',
      data: mainMap,
   },
   mapTile: {
      name: 'mainTile',
      data: mapTile,
   },
};

export interface GameSceneState {
   lifeHearts: number;
}
