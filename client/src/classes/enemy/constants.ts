// tslint:disable: ordered-imports
// tslint:disable: object-literal-sort-keys
import { LookAt } from '#/classes/player/constants';
import * as skeletonStand from 'assets/enemies/Skeleton_Idle.png';
import * as skeletonRun from 'assets/enemies/Skeleton_Walk.png';
import * as skeletonAttack from 'assets/enemies/Skeleton_Attack.png';
import * as skeletonDead from 'assets/enemies/Skeleton_Dead.png';

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
      skeletonStand: {
         name: 'skeletonStand',
         data: skeletonStand,
         frameWidth: 24,
         frameHeight: 32,
      },
      skeletonRun: {
         name: 'skeletonRun',
         data: skeletonRun,
         frameWidth: 22,
         frameHeight: 33,
      },
      skeletonAttack: {
         name: 'skeletonAttack',
         data: skeletonAttack,
         frameWidth: 43,
         frameHeight: 37,
      },
      skeletonDead: {
         name: 'skeletonDead',
         data: skeletonDead,
         frameWidth: 33,
         frameHeight: 32,
      },
      gravityY: 600,
      scale: 2.5,
      lifeHearts: 3,
   },
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
