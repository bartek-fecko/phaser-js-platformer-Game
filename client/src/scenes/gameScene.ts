import { assets as enemyAssets, EnemyOptions } from '#/classes/enemy/constants';
import { Enemy } from '#/classes/enemy/enemy';
import { assets as playerAssets } from '#/classes/player/constants';
import { Player } from '#/classes/player/player';
import { dimensions, gameScale, SceneNames } from '#/config/gameConfig';
import * as Phaser from 'phaser';
import { assets } from './constants';

const { width: gameWidth, height: gameHeight } = dimensions;
const { monster } = enemyAssets;

// this.player.alpha = .1 change alpha opacity
export class GameScene extends Phaser.Scene {
   private player: Player;
   private enemies: Phaser.Physics.Arcade.Group;
   private enemiesTileObjects: EnemyOptions[];
   private tileMap: Phaser.Tilemaps.Tilemap;
   private terrainLayer: Phaser.Tilemaps.StaticTilemapLayer;

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
      this.load.spritesheet(
         monster.monsterStand.name,
         monster.monsterStand.data,
         {
            frameHeight: monster.monsterStand.frameHeight,
            frameWidth: monster.monsterStand.frameWidth,
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

      const skyLayer = tileMap
         .createStaticLayer('sky', [skyMap], 0, 0)
         .setScale(gameScale);
      const terrainLayer = tileMap
         .createStaticLayer('terrain', [terrainMap], 0, 0)
         .setScale(gameScale);
      const farBackgroundLayer = tileMap
         .createStaticLayer('farBackground', [pinkMountainMap], 0, 0)
         .setScale(gameScale);
      const treesLayer = tileMap
         .createStaticLayer('trees', [terrainMap], 0, 0)
         .setScale(gameScale);

      this.tileMap = tileMap;
      this.terrainLayer = terrainLayer;

      this.player = new Player(
         this,
         20,
         gameHeight - assets.tileBox.width * 2 + -120,
         playerAssets.playerStand.name,
      );

      this.setCameraSettings();
      this.createEnemies();
      this.setPhysicsSettings();
   }

   public update() {
      this.player.update();
   }

   private setPhysicsSettings() {
      this.physics.world.setBounds(0, 0, this.tileMap.widthInPixels * 2, this.tileMap.heightInPixels);
      this.terrainLayer.setCollisionByProperty({ collisions: true });
      this.physics.add.collider(this.player, this.terrainLayer);
      this.physics.add.collider(this.player, this.enemies);
   }

   private setCameraSettings() {
      this.cameras.main.setBounds(0, 0, this.tileMap.widthInPixels * 2, 0);
      this.cameras.main.startFollow(this.player);
   }

   private createEnemies() {
      const enemiesTileObjects = this.tileMap.objects[0].objects as unknown as EnemyOptions[];
      this.enemies = this.physics.add.group({ immovable: true });
      enemiesTileObjects.forEach((enemyTileObject) => {
         this.enemies.add(new Enemy(
            this,
            'monster',
            monster.monsterStand.name,
            enemyTileObject,
         ));
      });
   }
}
