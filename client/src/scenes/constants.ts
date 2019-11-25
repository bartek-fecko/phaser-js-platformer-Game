// tslint:disable: ordered-imports
// tslint:disable: object-literal-sort-keys
import * as skyMap from 'assets/maps/skyMap.png';
import * as mainMap from 'assets/maps/terrainMap.png';
import * as playerRun from 'assets/knight/noBKG_KnightRun_strip.png';
import * as playerStand from 'assets/knight/noBKG_KnightIdle_strip.png';
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
