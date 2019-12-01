import { PlayerEventMessages, playerHearts } from '#/classes/player/constants';
import { SceneNames } from '#/config/gameConfig';
import * as Phaser from 'phaser';

export class UiScene extends Phaser.Scene {
   private playerHearts: number = playerHearts;

   constructor() {
      super({
         key: SceneNames.Ui,
      });
   }

   public init(data) {
      if (data.playerHearts) {
         this.playerHearts = data.playerHearts;
      }
   }

   public create() {
      const gameScene = this.scene.get(SceneNames.Game);

      const text = this.add.text(
         20,
         20,
         this.createHearts(),
         {
            fill: 'red',
            font: '30px mainFont',
         },
      );

      gameScene.events.on(PlayerEventMessages.onPlayerRecieveDamage, ({ damage }) => {
         this.playerHearts -= damage;
         text.updateText();
         text.setText(this.playerHearts > 0 ? this.createHearts() : '');
      });

      text.setInteractive();
   }

   private createHearts() {
      return `${new Array(this.playerHearts).fill(1).reduce((total: string) => `${total}♥ `, '')}`;
   }
}
