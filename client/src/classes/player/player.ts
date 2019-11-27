import * as Phaser from 'phaser';
import {
   assets,
   lifeHearts,
   LookAt,
   playerAnimNames as anim,
   PlayerSpeed,
   scale,
} from './constants';

export class Player extends Phaser.Physics.Arcade.Sprite {
   public lookAt: LookAt = 'right';
   private cursors: { [index: string]: Phaser.Input.Keyboard.Key };
   private jumpCounter: number = 0;
   private maxJumps: number = 2;
   private isAttacking: boolean = false;
   private lifeHearts: number = lifeHearts;

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
      this.setDepth(999);
      scene.physics.world.enableBody(this);
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      this.create();
   }

   public create() {
      this.setGravity(0, 800);
      this.setCollideWorldBounds(true);
      const { playerRunSprite, playerStandSprite, playerAttackSprite } = assets;
      this.scene.anims.create({
         frameRate: 10,
         frames: this.scene.anims.generateFrameNumbers(playerRunSprite.name, { start: 0, end: 7, first: 0 }),
         key: anim.run,
         repeat: -1,
      });
      this.scene.anims.create({
         frameRate: 8,
         frames: this.scene.anims.generateFrameNumbers(playerStandSprite.name, { start: 0, end: 7 }),
         key: anim.stand,
         repeat: -1,
      });
      this.scene.anims.create({
         frameRate: 10,
         frames: this.scene.anims.generateFrameNumbers(playerAttackSprite.name, { start: 9, end: 13 }),
         key: anim.attack,
         repeat: 1,
      });
      this.on('animationcomplete', this.animFinishedHandler);
      this.body.setSize(24, 32);
   }

   public update() {
      this.scaleX = this.lookAt === 'right' ? scale : -scale;
      if (this.cursors.left.isDown) {
         this.moveLeft();
      } else if (this.cursors.right.isDown) {
         this.moveRight();
      } else {
         this.noMove();
      }
      if (this.cursors.space.isDown) {
         this.onAttack();
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

   private onAttack() {
      this.anims.play(anim.attack, true);
      this.isAttacking = true;
      this.setOffset(60, 10);
   }

   private noMove() {
      if (!this.isAttacking) {
         this.anims.play(anim.stand, true);
      }
      this.lookAt === 'right' ? this.setOffset(25, 10) : this.setOffset(50, 10);
      this.setVelocityX(0);
   }

   private moveLeft() {
      this.lookAt = 'left';
      this.setVelocityX(-PlayerSpeed.X);
      this.setOffset(60, 10);
      if (!this.isAttacking) {
         this.anims.play(anim.run, true);
      }
   }

   private moveRight() {
      this.lookAt = 'right';
      this.setVelocityX(PlayerSpeed.X);
      this.setOffset(40, 10);
      if (!this.isAttacking) {
         this.anims.play(anim.run, true);
      }
   }

   private jump() {
      this.jumpCounter++;
      this.setVelocityX(0);
      this.setVelocityY(-PlayerSpeed.Y);
   }
}
