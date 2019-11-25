// tslint:disable: ordered-imports
// tslint:disable: object-literal-sort-keys
import * as playerRun from 'assets/knight/noBKG_KnightRun_strip.png';
import * as playerStand from 'assets/knight/noBKG_KnightIdle_strip.png';
import * as playerAttack from 'assets/knight/noBKG_KnightAttack_strip.png';

export const assets = {
   playerStand: {
      name: 'playerStand',
      data: playerStand,
      frameHeight: 64,
      frameWidth: 64,
      scale: 2,
   },
   playerAttack: {
      name: 'playerAttack',
      data: playerAttack,
      frameHeight: 64,
      frameWidth: 144,
   },
   playerRun: {
      name: 'playerRun',
      data: playerRun,
      frameHeight: 64,
      frameWidth: 96,
      scale: 2,
   },

};

export const playerHearts = 3;

export const scale = 2;

export enum Speed {
   X = 460,
   Y = 330,
}
