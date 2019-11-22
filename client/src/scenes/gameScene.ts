import { dimensions, SceneNames } from '#/config/gameConfig';
// tslint:disable: object-literal-sort-keys
import * as bomb from 'assets/bomb.png';
import * as dude from 'assets/dude.png';
import * as platform from 'assets/platform.png';
import * as sky from 'assets/sky.png';
import * as star from 'assets/star.png';
import * as Phaser from 'phaser';
const { width, height } = dimensions;

const assets = {
   sky: {
      name: 'sky',
      data: sky,
   },
   star: {
      name: 'star',
      data: star,
   },
   platform: {
      name: 'platform',
      data: platform,
   },
   bomb: {
      name: 'bomb',
      data: bomb,
   },
   dude: {
      name: 'dude',
      data: dude,
   },
};

export class GameScene extends Phaser.Scene {
   private platforms;
   constructor() {
      super({ key: SceneNames.Game });
   }
   public preload() {
      this.load.image(assets.sky.name, assets.sky.data);
      this.load.image(assets.star.name, assets.star.data);
      this.load.image(assets.platform.name, assets.platform.data);
   }

   public create() {
      this.add.image(width / 2, height / 2, assets.sky.name);
      this.platforms = this.physics.add.staticGroup();

      this.platforms.create(400, 568, assets.platform.name).setScale(2).refreshBody();

      this.platforms.create(600, 400, assets.platform.name);
      this.platforms.create(50, 250, assets.platform.name);
      this.platforms.create(750, 220, assets.platform.name);
   }
   public update() {

   }
}
