// tslint:disable: ordered-imports
// tslint:disable: object-literal-sort-keys
import { EnemySpeed } from '#/classes/enemy/constants';
import * as skeletonStandSprite from 'assets/enemies/Skeleton_Idle.png';
import * as skeletonRunSprite from 'assets/enemies/Skeleton_Walk.png';
import * as skeletonAttackSprite from 'assets/enemies/Skeleton_Attack.png';
import * as skeletonDeadSprite from 'assets/enemies/Skeleton_Dead.png';

export const assets = {
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
      offsetX: 15,
      offsetY: 5,
   },
   skeletonDeadSprite: {
      name: 'skeletonDeadSprite',
      data: skeletonDeadSprite,
      frameWidth: 33,
      frameHeight: 32,
   },
   bodyWidth: 18,
   bodyHeight: 32,
   gravityY: 600,
   scale: 2.5,
   lifeHearts: 3,
};

export const skeletonSpeed: EnemySpeed = {
   x: 100,
   y: 300,
};

export const skeletonAnimKeys = {
   stand: 'skeletonStandAnim',
   run: 'skeletonRunAnim',
   attack: 'skeletonAttackAnim',
   dead: 'skeeltonDeadAnim',
};
