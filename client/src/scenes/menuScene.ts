import { playerHearts } from '#/classes/player/constants';
import { SceneNames } from '#/config/gameConfig';
import * as Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
   constructor() {
      super({
         key: SceneNames.Menu,
      });
   }

   public create() {
      const container = this.add.container(
         this.game.renderer.width / 2 - 50,
         this.game.renderer.height / 2 - 50,
      );

      const fontStyles = {
         fill: '#FFFFFF',
         font: '30px mainFont',
      };

      const playGameText = this.add.text(0, -50, 'Play game', { ...fontStyles, fill: '#199ca6' });
      const texts = [
         { description: 'move left', key: '← left arrow' },
         { description: 'move right', key: '→ right arrow' },
         { description: 'jump', key: '↑ up arrow' },
         { description: 'attack', key: 'space' },
      ];

      container.add(playGameText);
      const textGroup = this.add.group();
      texts.forEach(({ description, key }, i) => {
         container.add(this.add.text(0, i * 30 + 50, description, fontStyles));
         container.add(this.add.text(100, i * 30 + 50, key, fontStyles));
      });

      playGameText.setInteractive();
      playGameText.on('pointerdown', () => {
         this.scene.start(SceneNames.Game, { lifeHearts: playerHearts });
         this.scene.start(SceneNames.Ui);
      });
   }
}
