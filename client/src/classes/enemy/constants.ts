// tslint:disable: ordered-imports
// tslint:disable: object-literal-sort-keys
import { LookAt } from '#/classes/player/constants';

export type EnemyType = 'monster' | 'normal' | 'skeleton';

export interface EnemyOptions {
   x: number;
   y: number;
   properites?: { lookAt: LookAt };
   [key: string]: any;
}

export interface EnemySpeed {
   x: number;
   y: number;
}

export interface AnimKeys {
   [key: string]: string;
}
