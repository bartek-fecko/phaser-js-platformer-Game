import * as Phaser from 'phaser';
import { assets, scale, Speed } from './constants';

export class Player extends Phaser.Physics.Arcade.Sprite {
   private cursors: { [index: string]: Phaser.Input.Keyboard.Key };
   private jumpCounter: number = 0;
   private maxJumps: number = 2;
   private isAttacking: boolean = false;

   constructor(
      scene: Phaser.Scene,
      x: number,
      y: number,
      texture: string,
      frame?: string | number,
   ) {
      super(scene, x, y, texture, frame);
      scene.sys.updateList.add(this);
      scene.sys.displayList.add(this);
      this.setScale(scale);
      scene.physics.world.enableBody(this);
      this.cursors = this.scene.input.keyboard.createCursorKeys();
   }

   public create() {
      this.setGravity(0, 800);
      this.setCollideWorldBounds(true);
      this.scene.anims.create({
         frameRate: 10,
         frames: this.scene.anims.generateFrameNumbers(assets.playerRun.name, { start: 0, end: 7, first: 0 }),
         key: 'run',
         repeat: -1,
      });
      this.scene.anims.create({
         frameRate: 8,
         frames: this.scene.anims.generateFrameNumbers(assets.playerStand.name, { start: 0, end: 7 }),
         key: 'stand',
         repeat: -1,
      });
      this.scene.anims.create({
         frameRate: 10,
         frames: this.scene.anims.generateFrameNumbers(assets.playerAttack.name, { start: 9, end: 13 }),
         key: 'attack',
         repeat: 1,
      });

      this.on('animationcomplete', this.animFinishedHandler);
   }

   public update() {
      if (this.cursors.left.isDown) {
         this.scaleX = -scale;
         this.setVelocityX(-Speed.X);
         this.setOffset(60, 10);
         if (!this.isAttacking) {
            this.anims.play('run', true);
         }
      } else if (this.cursors.right.isDown) {
         this.scaleX = scale;
         this.setVelocityX(Speed.X);
         this.setOffset(30, 10);
         if (!this.isAttacking) {
            this.anims.play('run', true);
         }
      } else {
         if (!this.isAttacking) {
            this.anims.play('stand', true);
         }
         this.scaleX = scale;
         this.setOffset(15, 10);
         this.setVelocityX(0);
      }
      if (this.cursors.space.isDown) {
         this.anims.play('attack', true);
         this.isAttacking = true;
         this.setOffset(60, 10);
      }
      if ((this.body as Phaser.Physics.Arcade.Body).onFloor()) {
         this.jumpCounter = 0;
      }
      if (this.cursors.up.isDown && this.body.deltaY() > 0 &&
         this.jumpCounter < this.maxJumps
      ) {
         this.jump();
      }
   }

   private animFinishedHandler(animation: Phaser.Animations.Animation) {
      this.isAttacking = false;
      if (animation.key) {
         this.isAttacking = false;
      }
   }

   private jump() {
      this.jumpCounter++;
      this.setVelocityX(0);
      this.setVelocityY(-Speed.Y);
   }
}
