import { SceneNames } from '#/config/gameConfig';
import * as Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
   constructor() {
      super({
         key: SceneNames.Menu,
      });
   }
   public init(data) {

   }

   public create() {
      const text = this.add.text(
         this.game.renderer.width / 2 - 50,
         this.game.renderer.height / 2 - 50,
         'Play game',
         {
            fill: '#FFFFFF',
            font: '30px mainFont',
         },
      );
      text.setInteractive();
      text.on('pointerdown', () => (
         this.scene.start(SceneNames.Game, { data: 'from menu' })
      ));
   }
}
