import { game } from '#/app';
import { dimensions, SceneNames } from '#/config/gameConfig';
import * as Phaser from 'phaser';
import {
   assets,
   LookAt,
   playerAnimNames as animKeys,
   PlayerEventMessages,
   PlayerSpeed,
   scale,
} from './constants';
const { height: gameHeight } = dimensions;

export class Player extends Phaser.Physics.Arcade.Sprite {
   public isAlive: boolean = true;
   public lookAt: LookAt = 'right';
   public sword: Phaser.Physics.Arcade.Sprite;
   private attackForce = 1;
   private cursors: { [index: string]: Phaser.Input.Keyboard.Key };
   private jumpCounter: number = 0;
   private maxJumps: number = 2;
   private isAttacking: boolean = false;
   private lifeHearts: number;

   constructor(
      scene: Phaser.Scene,
      x: number,
      y: number,
      lifeHearts: number,
      texture: string,
      frame?: string | number,
   ) {
      super(scene, x, y, texture, frame);
      scene.sys.updateList.add(this);
      scene.sys.displayList.add(this);
      this.setScale(scale);
      this.setDepth(999);
      this.lifeHearts = lifeHearts;
      scene.physics.world.enableBody(this);
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      this.create();
   }

   public create() {
      this.setImmovable(true);
      this.setGravity(0, 800);
      this.setCollideWorldBounds(true);

      const { playerRunSprite, playerStandSprite, playerAttackSprite, playerDeadSprite } = assets;
      this.scene.anims.create({
         frameRate: 10,
         frames: this.scene.anims.generateFrameNumbers(playerRunSprite.name, { start: 0, end: 7, first: 0 }),
         key: animKeys.run,
         repeat: -1,
      });
      this.scene.anims.create({
         frameRate: 8,
         frames: this.scene.anims.generateFrameNumbers(playerStandSprite.name, { start: 0, end: 7 }),
         key: animKeys.stand,
         repeat: -1,
      });
      this.scene.anims.create({
         frameRate: 10,
         frames: this.scene.anims.generateFrameNumbers(playerAttackSprite.name, { start: 9, end: 13 }),
         key: animKeys.attack,
         repeat: 1,
      });
      this.scene.anims.create({
         frameRate: 20,
         frames: this.scene.anims.generateFrameNumbers(playerDeadSprite.name, { start: 0, end: 15 }),
         key: animKeys.dead,
         repeat: 0,
      });
      this.on('animationcomplete', this.animFinishedHandler);
      this.body.setSize(24, 32);
      this.addSword();
   }

   public addSword() {
      this.sword = this.scene.physics.add.sprite(
         this.body.width, 500, assets.swordSprite.name,
      )
         .setOrigin(0)
         .setVisible(false);
      this.sword.body.setSize(this.body.width, 10);
   }

   public update() {
      if (this.lifeHearts <= 0 && this.isAlive) {
         this.onDelete();
      }
      if (!this.isAlive) {
         return;
      }
      if (this.cursors.left.isDown) {
         this.move('left', -PlayerSpeed.X);
      } else if (this.cursors.right.isDown) {
         this.move('right', PlayerSpeed.X);
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

   public setDamage(amount: number) {
      this.lifeHearts -= amount;
      this.scene.events.emit(PlayerEventMessages.onPlayerRecieveDamage, { damage: amount });
   }

   public placeSword(isAttacking: boolean) {
      if (!isAttacking) {
         return this.sword.setY(gameHeight + 400);
      }
      this.sword.setX(this.body.x + (
         this.lookAt === 'right'
            ? this.body.width * .6
            : -this.sword.width * .8
      ));
      this.sword.setY(this.body.y + this.body.height * .4);
   }

   public getAttackForce() {
      return this.attackForce;
   }

   private onDelete() {
      this.isAlive = false;
      this.setVelocityX(0);
      game.registry.reset();
      this.anims.play(animKeys.dead, false);
      game.scene.start(SceneNames.Restart);
   }

   private animFinishedHandler(animation: Phaser.Animations.Animation) {
      this.isAttacking = false;
      if (animation.key === animKeys.attack) {
         this.isAttacking = false;
      }
   }

   private onAttack() {
      this.lookAt === 'right' ? this.setOffset(65, 10) : this.setOffset(65, 10);
      this.anims.stopOnRepeat();
      this.setVelocityX(0);
      this.anims.play(animKeys.attack, true);
      this.isAttacking = true;
   }

   private noMove() {
      this.setOffset(25, 10);
      this.setVelocityX(0);
      if (!this.isAttacking) {
         this.anims.play(animKeys.stand, true);
      }
   }

   private move(direction: LookAt, speed: number) {
      this.lookAt = direction;
      this.flipX = direction === 'left' ? true : false;
      this.setVelocityX(speed);
      if (!this.isAttacking) {
         this.setOffset(40, 10);
         this.anims.play(animKeys.run, true);
      }
   }

   private jump() {
      this.jumpCounter++;
      this.setVelocityX(0);
      this.setVelocityY(-PlayerSpeed.Y);
   }
}
