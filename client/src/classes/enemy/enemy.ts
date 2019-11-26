import { Player } from '#/classes/player/player';
import { LookAt } from '#/classes/player/constants';
import { gameScale } from '#/config/gameConfig';
import * as Phaser from 'phaser';
import { assets, EnemyOptions, EnemySpeed, EnemyType } from './constants';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
   public lookAt: LookAt = 'left';
   private cursors: { [index: string]: Phaser.Input.Keyboard.Key };
   private frameWidth: number;
   private frameHeight: number;
   private enemyType: EnemyType;
   private lifeHearts: number;
   private startPoint: { x: number, y: number };
   private isFighting: boolean = false;

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
      this.setScale(enemy.scale);
      this.lifeHearts = enemy.lifeHearts;
      setTimeout(() => {
         this.setGravity(0, enemy.gravityY);
         this.setVelocityX(100);
      }, 0);

      const { skeleton: { skeletonStand, skeletonAttack, skeletonRun } } = assets;
      this.scene.anims.create({
         frameRate: 10,
         frames: this.scene.anims.generateFrameNumbers(skeletonRun.name, { start: 0, end: 13 }),
         key: 'run',
         repeat: -1,
      });
      this.scene.anims.create({
         frameRate: 8,
         frames: this.scene.anims.generateFrameNumbers(skeletonStand.name, { start: 0, end: 11 }),
         key: 'stand',
         repeat: -1,
      });
      this.scene.anims.create({
         frameRate: 10,
         frames: this.scene.anims.generateFrameNumbers(skeletonAttack.name, { start: 0, end: 11 }),
         key: 'attack',
         repeat: 1,
      });
   }

   public update() {
      const playerX = (this.scene as Phaser.Scene & { player: Player }).player.x;
      if (Math.abs(playerX - this.x)) {
         this.fightMode();
      }
      if (!this.isFighting) {
         this.patrol();
      }
   }

   private patrol() {
      this.startPoint.x + 300 > this.x
         // tslint:disable-next-line: no-unused-expression
         ? this.startPoint.x - 300 > this.x && this.setVelocityX(EnemySpeed.X)
         : this.setVelocityX(-EnemySpeed.X);
   }

   private fightMode() {
      
   }

   // private moveLeft() {
   //    this.lookAt = 'left';
   //    this.setVelocityX(-EnemySpeed.X);
   //    this.setOffset(60, 10);
   //    if (!this.isAttacking) {
   //       this.anims.play('run', true);
   //    }
   // }

   // private moveRight() {
   //    this.lookAt = 'right';
   //    this.setVelocityX(EnemySpeed.X);
   //    this.setOffset(40, 10);
   //    if (!this.isAttacking) {
   //       this.anims.play('run', true);
   //    }
   // }
}
