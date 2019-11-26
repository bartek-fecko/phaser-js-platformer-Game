// tslint:disable: ordered-imports
// tslint:disable: object-literal-sort-keys
import * as monsterStand from 'assets/enemies/monster.png';

export const assets = {
   monster: {
      monsterStand: {
         name: 'monsterStand',
         data: monsterStand,
         frameHeight: 42,
         frameWidth: 40,
      },
      gravityY: 600,
      scale: 3,
   },
};

export type EnemyType = 'monster' | 'normal';

export interface EnemyOptions {
   x: number;
   y: number;
   properites?: { lookAt: string };
   wdith?: number;
   [key: string]: any;
}
