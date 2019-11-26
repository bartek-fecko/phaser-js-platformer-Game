import { gameScale } from '#/config/gameConfig';
import * as Phaser from 'phaser';
import { assets, EnemyOptions, EnemyType } from './constants';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
   private cursors: { [index: string]: Phaser.Input.Keyboard.Key };
   private frameWidth: number;
   private frameHeight: number;
   private enemyType: EnemyType;
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
      scene.physics.world.enableBody(this);
      this.enemyType = type;
      this.setDepth(999);
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      this.create();
   }

   public create() {
      switch (this.enemyType) {
         case 'monster':
            this.setGravity(0, assets.monster.gravityY);
            this.setScale(assets.monster.scale);
            break;
            default:
               break;
            }
         }

   public update() {

   }

}
