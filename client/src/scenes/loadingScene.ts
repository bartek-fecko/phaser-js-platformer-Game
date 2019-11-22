import { SceneNames } from '#/config/gameConfig';
import * as Phaser from 'phaser';

export class LoadingScene extends Phaser.Scene {
   constructor() {
      super({
         key: SceneNames.Loading,
      });
   }
   preload() {

   }
   create() {
      this.scene.start(SceneNames.Menu, { data: 'from loading' });
      this.add.text(100, 64, 'Hello World', {font:"20px mainFont", fill:"#FFFFFF"})
      console.log('yes')
   }
}
