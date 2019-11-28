import { dimensions, gameScale } from '#/config/gameConfig';
import * as Phaser from 'phaser';
import {
   assets,
   lifeHearts,
   LookAt,
   playerAnimNames as anim,
   PlayerSpeed,
   scale,
} from './constants';
const {  height: gameHeight } = dimensions;

export class Player extends Phaser.Physics.Arcade.Sprite {
   public lookAt: LookAt = 'right';
   private cursors: { [index: string]: Phaser.Input.Keyboard.Key };
   private jumpCounter: number = 0;
   private maxJumps: number = 2;
   private isAttacking: boolean = false;
   private lifeHearts: number = lifeHearts;
   private sword: Phaser.Physics.Arcade.Sprite;
   private playerContainer: Phaser.GameObjects.Container;

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
      this.setImmovable(true);
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
      this.addSword();
   }

   public addSword() {
      this.sword = this.scene.physics.add.sprite(
         this.body.width, 500, assets.swordSprite.name,
      ).setOrigin(0);
   }

   public update() {
      if (this.cursors.left.isDown) {
         this.moveLeft();
      } else if (this.cursors.right.isDown) {
         this.moveRight();
      } else if (!this.isAttacking) {
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
      this.placeSword(this.isAttacking);
   }

   public placeSword(isAttacking: boolean) {
      if (!isAttacking) {
         return this.sword.setY(gameHeight + 400);
      }
      this.sword.setX(this.body.x + (
         this.lookAt === 'right'
            ? this.body.width * 0.7
            : -this.body.width * .5
      ));
      this.sword.setY(this.body.y + this.body.height * .4);
   }

   private animFinishedHandler(animation: Phaser.Animations.Animation) {
      this.isAttacking = false;
      if (animation.key === anim.attack) {
         this.isAttacking = false;
      }
   }

   private onAttack() {
      this.lookAt === 'right' ? this.setOffset(65, 10) : this.setOffset(65, 10);
      this.anims.stopOnRepeat();
      this.anims.play(anim.attack, true);
      this.isAttacking = true;
   }

   private noMove() {
      this.setOffset(25, 10);
      this.setVelocityX(0);
      if (!this.isAttacking) {
         this.anims.play(anim.stand, true);
      }
   }

   private moveLeft() {
      this.lookAt = 'left';
      this.flipX = true;
      this.setVelocityX(-PlayerSpeed.X);
      if (!this.isAttacking) {
         this.setOffset(40, 10);
         this.anims.play(anim.run, true);
      }
   }

   private moveRight() {
      this.lookAt = 'right';
      this.flipX = false;
      this.setVelocityX(PlayerSpeed.X);
      if (!this.isAttacking) {
         this.setOffset(40, 10);
         this.anims.play(anim.run, true);
      }
   }

   private jump() {
      this.jumpCounter++;
      this.setVelocityX(0);
      this.setVelocityY(-PlayerSpeed.Y);
   }
}
