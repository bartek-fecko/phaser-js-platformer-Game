// tslint:disable: ordered-imports
// tslint:disable: object-literal-sort-keys
import { LookAt } from '#/classes/player/constants';
import * as skeletonStandSprite from 'assets/enemies/Skeleton_Idle.png';
import * as skeletonRunSprite from 'assets/enemies/Skeleton_Walk.png';
import * as skeletonAttackSprite from 'assets/enemies/Skeleton_Attack.png';
import * as skeletonDeadSprite from 'assets/enemies/Skeleton_Dead.png';

export const assets = {
   monster: {
      monsterStand: {
         name: 'monsterStand',
         data: null,
         frameWidth: 40,
         frameHeight: 42,
      },
      gravityY: 600,
      scale: 3,
      lifeHearts: 2,
   },
   skeleton: {
      skeletonStandSprite: {
         name: 'skeletonStandSprite',
         data: skeletonStandSprite,
         frameWidth: 24,
         frameHeight: 32,
      },
      skeletonRunSprite: {
         name: 'skeletonRunSprite',
         data: skeletonRunSprite,
         frameWidth: 22,
         frameHeight: 33,
         offsetX: 10,
         offsetY: 5,
      },
      skeletonAttackSprite: {
         name: 'skeletonAttackSprite',
         data: skeletonAttackSprite,
         frameWidth: 43,
         frameHeight: 37,
      },
      skeletonDeadSprite: {
         name: 'skeletonDeadSprite',
         data: skeletonDeadSprite,
         frameWidth: 33,
         frameHeight: 32,
      },
      gravityY: 600,
      scale: 2.5,
      lifeHearts: 3,
   },
};

export const enemyAnimNames = {
   stand: 'enemyStandAnim',
   run: 'enemyRunAnim',
   attack: 'enemyAttackAnim',
};

export type EnemyType = 'monster' | 'normal' | 'skeleton';

export interface EnemyOptions {
   x: number;
   y: number;
   properites?: { lookAt: LookAt };
   wdith?: number;
   [key: string]: any;
}

export enum EnemySpeed {
   X = 100,
   Y = 300,
}
