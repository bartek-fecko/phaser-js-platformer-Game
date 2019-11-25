import { Player } from '#/classes/player/player';
import { dimensions, SceneNames } from '#/config/gameConfig';
import * as Phaser from 'phaser';
import { assets } from './constants';
import {assets as playerAssets} from '#/classes/player/constants';

const { width: gameWidth, height: gameHeight } = dimensions;
//this.player.alpha = .1 change alpha opacity
export class GameScene extends Phaser.Scene {
   private player: Player;

   constructor() {
      super({ key: SceneNames.Game });
   }

   public preload() {
      this.load.spritesheet(
         playerAssets.playerStand.name,
         playerAssets.playerStand.data,
         {
            frameHeight: playerAssets.playerStand.frameHeight,
            frameWidth: playerAssets.playerStand.frameWidth,
         },
      );
      this.load.spritesheet(
         playerAssets.playerRun.name,
         playerAssets.playerRun.data,
         {
            frameHeight: playerAssets.playerRun.frameHeight,
            frameWidth: playerAssets.playerRun.frameWidth,
         },
      );
      this.load.spritesheet(
         playerAssets.playerAttack.name,
         playerAssets.playerAttack.data,
         {
            frameHeight: playerAssets.playerAttack.frameHeight,
            frameWidth: playerAssets.playerAttack.frameWidth,
         },
      );
      this.load.image(assets.skyMap.name, assets.skyMap.data);
      this.load.image(assets.pinkMountain.name, assets.pinkMountain.data);
      this.load.image(assets.mainMap.name, assets.mainMap.data);
      this.load.tilemapTiledJSON(assets.mapTile.name, assets.mapTile.data as unknown as string);
   }

   public create() {
      const tileMap = this.add.tilemap(assets.mapTile.name);
      const skyMap = tileMap.addTilesetImage('sky', assets.skyMap.name);
      const pinkMountainMap = tileMap.addTilesetImage(assets.pinkMountain.name);
      const terrainMap = tileMap.addTilesetImage('mainTile', assets.mainMap.name);

      const skyLayer = tileMap.createStaticLayer('sky', [skyMap], 0, 0).setScale(2);
      const terrainLayer = tileMap.createStaticLayer('terrain', [terrainMap], 0, 0).setScale(2);
      const farBackgroundLayer = tileMap.createStaticLayer('farBackground', [pinkMountainMap], 0, 0).setScale(2);
      const treesLayer = tileMap.createStaticLayer('trees', [terrainMap], 0, 0).setScale(2);

      terrainLayer.setCollisionByProperty({ collisions: true });

      this.player = new Player(
         this,
         20,
         gameHeight - assets.tileBox.width * 2 + 20,
         playerAssets.playerStand.name,
      );

      this.player.create();
      this.physics.add.collider(this.player, terrainLayer);
      this.cameras.main.setBounds(0, 0, tileMap.widthInPixels * 2, 0);
      this.cameras.main.startFollow(this.player);
      this.physics.world.setBounds(0, 0, tileMap.widthInPixels * 2, tileMap.heightInPixels);
   }

   public update() {
      this.player.update();
   }
}
