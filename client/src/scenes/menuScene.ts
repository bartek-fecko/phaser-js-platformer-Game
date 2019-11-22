import { SceneNames } from '#/config/gameConfig';
import * as Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
   constructor() {
      super({
         key: SceneNames.Menu,
      });
   }
   init(data) {
      console.log(data)
   }
   create() {
      this.add.text(100, 64, 'Hello World', {font:"30px mainFont", fill:"#FFFFFF"})

   }
}
