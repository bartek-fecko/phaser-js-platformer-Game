import { boxWidth } from './../../config/gameConfig';
import { LookAt } from '#/classes/player/constants';
import { Player } from '#/classes/player/player';
import { gameScale } from '#/config/gameConfig';
import * as Phaser from 'phaser';
import {
   assets,
   enemyAnimNames as anim,
   EnemyOptions,
   EnemySpeed,
   EnemyType,
} from './constants';

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

      const { skeleton: { skeletonStandSprite, skeletonAttackSprite, skeletonRunSprite } } = assets;
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
         repeat: 1,
      });
      this.on('animationstart', this.animStartHandler);
   }

   public animStartHandler(animation: Phaser.Animations.Animation) {
      if (animation.key === anim.attack) {
         this.setY(this.y - 20);
         // this.body.
         // this.setOffset(0, 70);
      }
   }

   public update() {
      this.scaleX = this.lookAt === 'right' ? assets.skeleton.scale : -assets.skeleton.scale;
      const playerX = (this.scene as Phaser.Scene & { player: Player }).player.x;

      Math.abs(playerX - this.x) < boxWidth * 5 ? this.fightMode() : this.isFighting = false;
      if (!this.isFighting) {
         this.patrol();
      }
   }

   private patrol() {
      this.startPoint.x + 300 > this.x
         // tslint:disable-next-line: no-unused-expression
         ? this.startPoint.x - 300 > this.x && this.moveRight(EnemySpeed.X)
         : this.moveLeft(EnemySpeed.X);
   }

   private fightMode() {
      this.isFighting = true;
      const playerX = (this.scene as Phaser.Scene & { player: Player }).player.x;
      if (Math.abs(Math.round(playerX - this.x)) < boxWidth) {
         this.onAttack();
      } else {
         playerX < this.x ? this.moveLeft(EnemySpeed.X * 2) : this.moveRight(EnemySpeed.X * 2);
      }
   }

   private onAttack() {
      this.setVelocityX(0);
      this.lookAt === 'right' ? this.setOffset(15, 0) : this.setOffset(30, 0);
      this.anims.play(anim.attack, true);
   }

   private moveLeft(speed: number) {
      this.lookAt = 'left';
      this.setVelocityX(-speed);
      this.setOffset(20, 0);
      if (!this.isAttacking) {
         this.anims.play(anim.run, true);
      }
   }

   private moveRight(speed: number) {
      this.lookAt = 'right';
      this.setVelocityX(speed);
      this.setOffset(0, 0);
      if (!this.isAttacking) {
         this.anims.play(anim.run, true);
      }
   }
}
