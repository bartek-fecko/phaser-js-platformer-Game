import { assets as enemyAssets, EnemyOptions } from '#/classes/enemy/constants';
import { Enemy } from '#/classes/enemy/enemy';
import { assets as playerAssets } from '#/classes/player/constants';
import { Player } from '#/classes/player/player';
import { dimensions, gameScale, SceneNames } from '#/config/gameConfig';
import * as Phaser from 'phaser';
import { assets } from './constants';

const { width: gameWidth, height: gameHeight } = dimensions;
const { monster, skeleton: { skeletonStandSprite, skeletonRunSprite, skeletonAttackSprite } } = enemyAssets;
const { playerAttackSprite, playerStandSprite, playerRunSprite, swordSprite } = playerAssets;

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
         playerStandSprite.name,
         playerStandSprite.data,
         {
            frameHeight: playerStandSprite.frameHeight,
            frameWidth: playerStandSprite.frameWidth,
         },
      );
      this.load.spritesheet(
         playerRunSprite.name,
         playerRunSprite.data,
         {
            frameHeight: playerRunSprite.frameHeight,
            frameWidth: playerRunSprite.frameWidth,
         },
      );
      this.load.spritesheet(
         playerAttackSprite.name,
         playerAttackSprite.data,
         {
            frameHeight: playerAttackSprite.frameHeight,
            frameWidth: playerAttackSprite.frameWidth,
         },
      );
      this.load.spritesheet(
         skeletonStandSprite.name,
         skeletonStandSprite.data,
         {
            frameHeight: skeletonStandSprite.frameHeight,
            frameWidth: skeletonStandSprite.frameWidth,
         },
      );
      this.load.spritesheet(
         skeletonRunSprite.name,
         skeletonRunSprite.data,
         {
            frameHeight: skeletonRunSprite.frameHeight,
            frameWidth: skeletonRunSprite.frameWidth,
         },
      );
      this.load.spritesheet(
         skeletonAttackSprite.name,
         skeletonAttackSprite.data,
         {
            frameHeight: skeletonAttackSprite.frameHeight,
            frameWidth: skeletonAttackSprite.frameWidth,
         },
      );
      this.load.image(
         swordSprite.name,
         swordSprite.data,
        
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
         gameHeight - assets.tileBox.width * 2 + 20,
         playerAssets.playerStandSprite.name,
      );

      this.createEnemies();

      this.setCameraSettings();
      this.setPhysicsSettings();
   }

   public update() {
      this.player.update();
      this.enemies.getChildren().forEach((enemy) => enemy.update());

   }

   private setPhysicsSettings() {
      this.physics.world.setBounds(0, 0, this.tileMap.widthInPixels * 2, this.tileMap.heightInPixels * 2);
      this.terrainLayer.setCollisionByProperty({ collisions: true });
      this.physics.add.collider(this.player, this.terrainLayer);
      this.physics.add.collider(this.enemies, this.terrainLayer);
      this.physics.add.collider(this.player, this.enemies, this.onPlayerEnemyCollision);
   }

   private onPlayerEnemyCollision(player: Player, enemy: Enemy) {
      enemy.onPlayerCollision();
   }

   private setCameraSettings() {
      this.cameras.main.roundPixels = true;
      this.cameras.main.setBounds(0, 0, this.tileMap.widthInPixels * 2, 0);
      this.cameras.main.startFollow(this.player);
   }

   private createEnemies() {
      const enemiesTileObjects = this.tileMap.objects[0].objects as unknown as EnemyOptions[];
      this.enemies = this.physics.add.group({ immovable: true });
      enemiesTileObjects.forEach((enemyTileObject) => {
         this.enemies.add(new Enemy(
            this,
            'skeleton',
            skeletonStandSprite.name,
            enemyTileObject,
         ));
      });
   }
}
