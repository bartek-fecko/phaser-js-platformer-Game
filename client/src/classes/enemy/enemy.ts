import * as playerAssets from '#/classes/player/constants';
import { LookAt } from '#/classes/player/constants';
import { Player } from '#/classes/player/player';
import { boxWidth, dimensions, gameScale } from '#/config/gameConfig';
import * as Phaser from 'phaser';
import {
   AnimKeys,
   EnemyOptions,
   EnemySpeed,
} from './constants';

const { assets: { swordSprite } } = playerAssets;
const { height: gameHeight } = dimensions;

export class Enemy extends Phaser.Physics.Arcade.Sprite {
   public startPoint: { x: number, y: number };
   public lifeHearts: number;
   public isFighting: boolean = false;
   public isAttacking: boolean = false;
   public lookAt: LookAt = 'right';
   public isAlive = true;
   public speed: EnemySpeed;
   public sword: Phaser.Physics.Arcade.Sprite & { damage?: number };
   public cursors: { [index: string]: Phaser.Input.Keyboard.Key };
   public animKeys: AnimKeys;

   constructor(
      scene: Phaser.Scene,
      texture: string,
      enemyTileOptions: EnemyOptions,
      lifeHearts: number,
      speed: EnemySpeed,
      animKeys: AnimKeys,
      frame?: string | number,
   ) {
      super(scene, enemyTileOptions.x * gameScale, enemyTileOptions.y * gameScale, texture, frame);
      scene.sys.updateList.add(this);
      scene.sys.displayList.add(this);
      this.startPoint = {
         x: enemyTileOptions.x * gameScale,
         y: enemyTileOptions.y * gameScale,
      };
      this.lifeHearts = lifeHearts;
      this.animKeys = animKeys;
      this.speed = speed;
      this.setDepth(999);
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      scene.physics.world.enableBody(this);
      this.initalize();
   }

   public initalize() {
      this.setCollideWorldBounds(true);
   }

   public addSword(key: string, damage: number) {
      this.sword = this.scene.physics.add.sprite(
         this.body.width, 500, key,
      )
         .setOrigin(0)
         .setVisible(false);
      this.sword.body.setSize(this.body.width, 10);
      this.sword.damage = damage;
   }

   public animEndHandler(animation: Phaser.Animations.Animation) {
      if (animation.key === this.animKeys.dead && this.anims) {
         this.anims.destroy();
      }
   }

   public setDamage(amount: number) {
      this.lifeHearts -= amount;
   }

   public onDelete() {
      if (this.body && this.anims) {
         this.setOffset(0);
         this.setVelocityX(0);
         this.isAlive = false;
         this.anims.play(this.animKeys.dead, false);
      }
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

   public fightMode() {
      this.isFighting = true;
      const player = (this.scene as Phaser.Scene & { player: Player }).player;
      const playerBodyX = player.body.x;
      const playerSpriteX = player.x;

      if (!this.isAttacking || Math.abs(Math.round(playerBodyX - this.body.x)) > 10) {
         if (Math.abs(playerSpriteX - this.x) < 20) {
            this.setVelocityX(0);
            return;
         }
         this.isAttacking = false;
         playerBodyX < this.x
            ? this.move('left', -this.speed.x * 2.3)
            : this.move('right', this.speed.x * 2.3);
      }
   }

   public move(direction: LookAt, speed: number) {
      this.lookAt = direction;
      this.flipX = direction === 'left' ? true : false;
      this.setVelocityX(speed);
      if (!this.isAttacking) {
         this.setOffset(0);
         this.anims.play(this.animKeys.run, true);
      }
   }
}
