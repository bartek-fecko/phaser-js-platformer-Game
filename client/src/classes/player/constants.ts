// tslint:disable: ordered-imports
// tslint:disable: object-literal-sort-keys
import * as playerRunSprite from 'assets/knight/noBKG_KnightRun_strip.png';
import * as playerStandSprite from 'assets/knight/noBKG_KnightIdle_strip.png';
import * as playerAttackSprite from 'assets/knight/noBKG_KnightAttack_strip.png';

export const assets = {
   playerStandSprite: {
      name: 'playerStandSprite',
      data: playerStandSprite,
      frameWidth: 64,
      frameHeight: 64,
      scale: 2,
   },
   playerAttackSprite: {
      name: 'playerAttackSprite',
      data: playerAttackSprite,
      frameWidth: 144,
      frameHeight: 64,
   },
   playerRunSprite: {
      name: 'playerRunSprite',
      data: playerRunSprite,
      frameWidth: 96,
      frameHeight: 64,
      scale: 2,
   },

};

export const playerAnimNames = {
   stand: 'playerStandAnim',
   run: 'playerRunAnim',
   attack: 'playerAttackAnim',
};

export const playerHearts = 3;

export const scale = 2;

export enum PlayerSpeed {
   X = 300,
   Y = 330,
}

export type LookAt = 'left' | 'right';

export const lifeHearts = 3;
