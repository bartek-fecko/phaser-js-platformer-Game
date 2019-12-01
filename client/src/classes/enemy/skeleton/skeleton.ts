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
      // this.on('animationcomplete', this.onAnimComplete);
      this.on('animationrepeat', this.onAnimRepeat);
   }

   public update() {
      if (this.lifeHearts <= 0 && this.isAlive) {
         this.onDelete();
      } else if (this.lifeHearts > 0 && this.isAlive) {
         const playerX = (this.scene as Phaser.Scene & { player: Player }).player.body.x;
         Math.abs(playerX - this.x) < boxWidth * 5 ? this.fightMode() : this.isFighting = false;
         if (!this.isFighting) {
            this.patrol();
         }
         this.placeSword(this.isAttacking);
      }
   }

   public onPlayerCollision() {
      const { offsetX, offsetY } = skeletonAttackSprite;
      this.isAttacking = true;
      this.setVelocityX(0);
      this.setOffset(offsetX, offsetY);
      this.anims.play(animKeys.attack, true);
   }

   // private onAnimComplete(animation: Phaser.Animations.Animation) {
   //    if (animation.key === animKeys.attack) {

   //    }
   // }

   private onAnimRepeat(animation: Phaser.Animations.Animation) {
      if (animation.key === animKeys.attack) {
         (this.scene as Phaser.Scene & { player: Player }).player.setDamage(this.sword.damage);
      }
   }

   private setSkeletonOptions() {
      setTimeout(() => {
         this.setGravity(0, gravityY);
         this.setVelocityX(100);
         this.setScale(scale);
         this.anims.play(animKeys.run);
      }, 0);
      this.addSword(uniqid(), 1);
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
         frameRate: 18,
         frames: this.scene.anims.generateFrameNumbers(skeletonAttackSprite.name, { start: 0, end: 9 }),
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

   private patrol(range: number = 300) {
      this.startPoint.x + range > this.x
         // tslint:disable-next-line: no-unused-expression
         ? this.startPoint.x - range > this.x && this.move('right', skeletonSpeed.x)
         : this.move('left', -skeletonSpeed.x);
   }
}
