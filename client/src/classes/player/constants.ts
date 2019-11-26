// tslint:disable: ordered-imports
// tslint:disable: object-literal-sort-keys
import * as playerRun from 'assets/knight/noBKG_KnightRun_strip.png';
import * as playerStand from 'assets/knight/noBKG_KnightIdle_strip.png';
import * as playerAttack from 'assets/knight/noBKG_KnightAttack_strip.png';

export const assets = {
   playerStand: {
      name: 'playerStand',
      data: playerStand,
      frameWidth: 64,
      frameHeight: 64,
      scale: 2,
   },
   playerAttack: {
      name: 'playerAttack',
      data: playerAttack,
      frameWidth: 144,
      frameHeight: 64,
   },
   playerRun: {
      name: 'playerRun',
      data: playerRun,
      frameWidth: 96,
      frameHeight: 64,
      scale: 2,
   },

};

export const playerHearts = 3;

export const scale = 2;

export enum PlayerSpeed {
   X = 460,
   Y = 330,
}

export type LookAt= 'left' | 'right';

export const lifeHearts = 3;
