// tslint:disable: ordered-imports
// tslint:disable: object-literal-sort-keys
import * as skyMap from 'assets/maps/skyMap.png';
import * as terrainMap from 'assets/maps/terrainMap.png';
import * as playerRun from 'assets/knight/noBKG_KnightRun_strip.png';
import * as playerStand from 'assets/knight/noBKG_KnightIdle_strip.png';
import * as mapTile from 'assets/maps/gameTile.json';

export const assets = {
   tileBox: {
      width: 64,
   },
   skyMap: {
      name: 'skyMap',
      data: skyMap,
   },
   terrainMap: {
      name: 'terrainMap',
      data: terrainMap,
   },
   playerStand: {
      name: 'player',
      data: playerStand,
      frameHeight: 64,
      frameWidth: 64,
      scale: 2,
   },
   // playerJump: {
   //    name: 'playerJump',
   //    data: playerJump,
   //    frameHeight: 64,
   //    frameWidth: 64,
   // },
   playerRun: {
      name: 'playerRun',
      data: playerRun,
      frameHeight: 64,
      frameWidth: 96,
      scale: 2,
   },
   mapTile: {
      name: 'mainTile',
      data: mapTile,
   },
};
