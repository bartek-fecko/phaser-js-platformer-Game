import { EnemyOptions } from '#/classes/enemy/constants';
import { Enemy } from '#/classes/enemy/enemy';
import { Player } from '#/classes/player/player';
import { boxWidth } from '#/config/gameConfig';
import * as Phaser from 'phaser';
import * as uniqid from 'uniqid';
import { assets, skeletonAnimKeys as animKeys, skeletonSpeed } from './constants';

const {
   skeletonAttackSprite,
   skeletonDeadSprite,
   skeletonRunSprite,
   skeletonStandSprite,
   scale,
   gravityY,
   lifeHearts,
} = assets;

export class Skeleton extends Enemy {
   constructor(
      scene: Phaser.Scene,
      enemyTileOptions: EnemyOptions,
      frame?: string | number,
   ) {
      super(
         scene,
         skeletonStandSprite.name,
         enemyTileOptions,
         lifeHearts,
         skeletonSpeed,
         animKeys,
         frame,
      );
      this.createAnimations();
      this.setSkeletonOptions();
   }

   public update() {
      if (this.lifeHearts === 0 && this.isAlive) {
         this.onDelete();
      } else if (this.lifeHearts > 0 && this.isAlive) {
         const playerX = (this.scene as Phaser.Scene & { player: Player }).player.body.x;
         Math.abs(playerX - this.x) < boxWidth * 5 ? this.fightMode() : this.isFighting = false;
         if (!this.isFighting) {
            this.patrol();
         }
         // this.placeSword(this.isAttacking);
      }
   }

   public onPlayerCollision() {
      const { offsetX, offsetY } = skeletonAttackSprite;
      this.isAttacking = true;
      this.setVelocityX(0);
      this.setOffset(offsetX, offsetY);
      this.anims.play(animKeys.attack, true);
   }

   private setSkeletonOptions() {
      setTimeout(() => {
         this.setGravity(0, gravityY);
         this.setVelocityX(100);
         this.setScale(scale);
         this.anims.play(animKeys.run);
      }, 0);
      this.addSword(uniqid());
   }

   private createAnimations() {
      this.scene.anims.create({
         frameRate: 10,
         frames: this.scene.anims.generateFrameNumbers(skeletonRunSprite.name, { start: 0, end: 13 }),
         key: animKeys.run,
         repeat: -1,
      });
      this.scene.anims.create({
         frameRate: 10,
         frames: this.scene.anims.generateFrameNumbers(skeletonStandSprite.name, { start: 0, end: 11 }),
         key: animKeys.stand,
         repeat: -1,
      });
      this.scene.anims.create({
         frameRate: 10,
         frames: this.scene.anims.generateFrameNumbers(skeletonAttackSprite.name, { start: 0, end: 11 }),
         key: animKeys.attack,
         repeat: -1,
      });
      this.scene.anims.create({
         frameRate: 10,
         frames: this.scene.anims.generateFrameNumbers(skeletonDeadSprite.name, { start: 0, end: 15 }),
         key: animKeys.dead,
         repeat: 0,
      });
   }

   private patrol() {
      this.startPoint.x + 300 > this.x
         // tslint:disable-next-line: no-unused-expression
         ? this.startPoint.x - 300 > this.x && this.move('right', skeletonSpeed.x)
         : this.move('left', -skeletonSpeed.x);
   }
}
