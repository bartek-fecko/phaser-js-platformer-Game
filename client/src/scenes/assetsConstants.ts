// tslint:disable: ordered-imports
// tslint:disable: object-literal-sort-keys
import * as skyMap from 'assets/maps/skyMap.png';
import * as terrainMap from 'assets/maps/terrainMap.png';
import * as player from 'assets/knight/noBKG_KnightIdle_strip.png';
import * as mapTile from 'assets/maps/gameTile.json';

export const assets = {
   skyMap: {
      name: 'skyMap',
      data: skyMap,
   },
   terrainMap: {
      name: 'terrainMap',
      data: terrainMap,
   },
   player: {
      name: 'player',
      data: player,
      frameHeight: 64,
      frameWidth: 64,
   },
   mapTile: {
      name: 'mainTile',
      data: mapTile,
   },
};
