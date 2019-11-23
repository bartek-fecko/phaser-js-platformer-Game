import { dimensions, SceneNames } from '#/config/gameConfig';
import * as Phaser from 'phaser';
import { assets } from './assetsConstants';

const { width: gameWidth, height: gameHeight } = dimensions;
//this.player.alpha = .1 change alpha opacity
export class GameScene extends Phaser.Scene {
   private platforms;
   private cursors;
   private player;

   constructor() {
      super({ key: SceneNames.Game });
   }

   public preload() {

      this.load.spritesheet(
         assets.player.name,
         assets.player.data,
         {
            frameHeight: assets.player.frameHeight,
            frameWidth: assets.player.frameWidth,
         },
      );
      this.load.image(assets.skyMap.name, assets.skyMap.data);
      this.load.image(assets.terrainMap.name, assets.terrainMap.data);
      this.load.tilemapTiledJSON(assets.mapTile.name, assets.mapTile.data as unknown as string);
   }

   public create() {
      const tileMap = this.add.tilemap(assets.mapTile.name);
      const skyMap = tileMap.addTilesetImage('sky', assets.skyMap.name);
      const terrainMap = tileMap.addTilesetImage('gameTile', assets.terrainMap.name);

      const skyLayer = tileMap.createStaticLayer('background', [skyMap], 0, 0).setScale(2.5);
      const terrainLayer = tileMap.createStaticLayer('terrain', [terrainMap], 0, 0).setScale(2.5);
      const treesLayer = tileMap.createStaticLayer('trees', [terrainMap], 0, 0).setScale(2.5);

      this.player = this.physics.add.sprite(20, gameHeight - 64 * 2 - 20, assets.player.name).setScale(2);
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);
      this.anims.create({
         frameRate: 10,
         frames: this.anims.generateFrameNumbers(assets.player.name, { start: 0, end: 3 }),
         key: 'left',
         repeat: -1,
      });
      this.cursors = this.input.keyboard.createCursorKeys();

   }
   public update() {
      if (this.cursors.left.isDown) {
         this.player.scaleX = -2;
      }
      else {
         this.player.scaleX = 2;
      }
   }
}
