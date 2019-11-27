import { LookAt } from '#/classes/player/constants';
import { Player } from '#/classes/player/player';
import { gameScale } from '#/config/gameConfig';
import * as Phaser from 'phaser';
import { boxWidth } from './../../config/gameConfig';
import {
   assets,
   enemyAnimNames as anim,
   EnemyOptions,
   EnemySpeed,
   EnemyType,
} from './constants';

const { skeleton: { skeletonStandSprite, skeletonAttackSprite, skeletonRunSprite } } = assets;

export class Enemy extends Phaser.Physics.Arcade.Sprite {
   public lookAt: LookAt = 'right';
   private cursors: { [index: string]: Phaser.Input.Keyboard.Key };
   private frameWidth: number;
   private frameHeight: number;
   private enemyType: EnemyType;
   private lifeHearts: number;
   private startPoint: { x: number, y: number };
   private isFighting: boolean = false;
   private isAttacking: boolean = false;

   constructor(
      scene: Phaser.Scene,
      type: EnemyType,
      texture: string,
      enemyOptions: EnemyOptions,
      frame?: string | number,
   ) {
      super(scene, enemyOptions.x * gameScale, enemyOptions.y * gameScale, texture, frame);
      scene.sys.updateList.add(this);
      scene.sys.displayList.add(this);
      this.enemyType = type;
      this.startPoint = {
         x: enemyOptions.x * gameScale,
         y: enemyOptions.y * gameScale,
      };
      this.setDepth(999);
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      scene.physics.world.enableBody(this);
      this.create();
   }

   public create() {
      const enemy = assets[this.enemyType];
      this.setCollideWorldBounds(true);
      this.lifeHearts = enemy.lifeHearts;
      setTimeout(() => {
         this.setGravity(0, enemy.gravityY);
         this.setVelocityX(100);
         this.setScale(enemy.scale);
         this.anims.play(anim.run);
      }, 0);

      this.scene.anims.create({
         frameRate: 10,
         frames: this.scene.anims.generateFrameNumbers(skeletonRunSprite.name, { start: 0, end: 13 }),
         key: anim.run,
         repeat: -1,
      });
      this.scene.anims.create({
         frameRate: 10,
         frames: this.scene.anims.generateFrameNumbers(skeletonStandSprite.name, { start: 0, end: 11 }),
         key: anim.stand,
         repeat: -1,
      });
      this.scene.anims.create({
         frameRate: 10,
         frames: this.scene.anims.generateFrameNumbers(skeletonAttackSprite.name, { start: 0, end: 11 }),
         key: anim.attack,
         repeat: -1,
      });
      this.on('animationstart', this.animStartHandler);
   }

   public animStartHandler(animation: Phaser.Animations.Animation) {
      if (animation.key === anim.attack) {
         // this.setY(this.y - 20);
         // this.body.
         // this.setOffset(0, 70);
      }
   }

   public update() {
      const playerX = (this.scene as Phaser.Scene & { player: Player }).player.x;

      Math.abs(playerX - this.x) < boxWidth * 5 ? this.fightMode() : this.isFighting = false;
      if (!this.isFighting) {
         this.patrol();
      }
   }

   public onPlayerCollision() {
      const { offsetX, offsetY } = skeletonRunSprite;
      this.isAttacking = true;
      this.setVelocityX(0);
      this.lookAt === 'left' ? this.setOffset(offsetX, offsetY) : this.setOffset(offsetX, offsetY);
      this.anims.play(anim.attack, true);
   }

   private patrol() {
      this.startPoint.x + 300 > this.x
         // tslint:disable-next-line: no-unused-expression
         ? this.startPoint.x - 300 > this.x && this.move('right', EnemySpeed.X)
         : this.move('left', -EnemySpeed.X);
   }

   private fightMode() {
      this.isFighting = true;
      const playerX = (this.scene as Phaser.Scene & { player: Player }).player.x;

      if (!this.isAttacking || Math.abs(Math.round(playerX - this.x)) > this.width * gameScale) {
         this.isAttacking = false;
         playerX < this.x
            ? this.move('left', -EnemySpeed.X * 2)
            : this.move('right', EnemySpeed.X * 2);
      }
   }

   private move(direction: LookAt, speed: number) {
      this.lookAt = direction;
      this.flipX = direction === 'left' ? true : false;
      this.setVelocityX(speed);
      if (!this.isAttacking) {
         this.setOffset(0);
         this.anims.play(anim.run, true);
      }
   }

}
