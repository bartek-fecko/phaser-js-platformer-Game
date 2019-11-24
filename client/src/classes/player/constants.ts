// tslint:disable: ordered-imports
// tslint:disable: object-literal-sort-keys
import * as playerRun from 'assets/knight/noBKG_KnightRun_strip.png';
import * as playerStand from 'assets/knight/noBKG_KnightIdle_strip.png';

export const assets = {
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

};
