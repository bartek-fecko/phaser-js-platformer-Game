import { playerHearts } from '#/classes/player/constants';
import { SceneNames } from '#/config/gameConfig';
import * as Phaser from 'phaser';

export class UiScene extends Phaser.Scene {
   constructor() {
      super({
         key: SceneNames.Ui,
      });
   }

   public create() {
      const text = this.add.text(
         20,
         20,
         `${new Array(playerHearts).fill(1).reduce((total: string) => `${total}♥ `, '')}`,
         {
            fill: 'red',
            font: '30px mainFont',
         },
      );
      text.setInteractive();

   }
}
