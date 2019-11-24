import * as Phaser from 'phaser';
import { assets } from './constants';

export class Player extends Phaser.Physics.Arcade.Sprite {
   private cursors: { [index: string]: Phaser.Input.Keyboard.Key };

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
      this.setScale(2);
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
   }

   public update() {
      if (this.cursors.left.isDown) {
         this.scaleX = -2;
         this.setVelocityX(-160);
         this.setOffset(60, 10);
         this.anims.play('run', true);
      } else if (this.cursors.right.isDown) {
         this.scaleX = 2;
         this.setVelocityX(160);
         this.setOffset(30, 10);
         this.anims.play('run', true);
      } else {
         this.anims.play('stand', true);
         this.scaleX = 2;
         this.setOffset(15, 10);
         this.setVelocityX(0);
      }
      if (
         this.cursors.up.isDown && this.body.deltaY() > 0 &&
         (this.body as Phaser.Physics.Arcade.Body).onFloor()
      ) {
         this.setVelocityX(0);
         this.setVelocityY(-330);
      }
   }
}
