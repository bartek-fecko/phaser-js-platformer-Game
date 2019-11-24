import { Player } from '#/classes/player/player';
import { dimensions, SceneNames } from '#/config/gameConfig';
import * as Phaser from 'phaser';
import { assets } from './constants';

const { width: gameWidth, height: gameHeight } = dimensions;
//this.player.alpha = .1 change alpha opacity
export class GameScene extends Phaser.Scene {
   private player: Player;

   constructor() {
      super({ key: SceneNames.Game });
   }

   public preload() {
      this.load.spritesheet(
         assets.playerStand.name,
         assets.playerStand.data,
         {
            frameHeight: assets.playerStand.frameHeight,
            frameWidth: assets.playerStand.frameWidth,
         },
      );
      this.load.spritesheet(
         assets.playerRun.name,
         assets.playerRun.data,
         {
            frameHeight: assets.playerRun.frameHeight,
            frameWidth: assets.playerRun.frameWidth,
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

      terrainLayer.setCollisionByProperty({ collisions: true });

      this.player = new Player(
         this,
         20,
         gameHeight - assets.tileBox.width * 2 - 20,
         assets.playerStand.name,
      );
      this.player.create();
      this.physics.add.collider(this.player, terrainLayer);

   }

   public update() {
      this.player.update();
   }
}
