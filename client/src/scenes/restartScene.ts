import { game } from '#/app';
import { playerHearts } from '#/classes/player/constants';
import { SceneNames } from '#/config/gameConfig';
import * as Phaser from 'phaser';

export class RestartScene extends Phaser.Scene {
   constructor() {
      super({
         key: SceneNames.Restart,
      });
   }

   public create() {
      const container = this.add.container(
         0,
         this.game.renderer.height / 2 - 50,
      );

      const background = this.add.graphics({ fillStyle: { color: 0x255255255 } });

      const rect = new Phaser.Geom.Rectangle(0, 0, this.game.renderer.width, 100);
      background.fillRectShape(rect);

      const fontStyles = {
         fill: '#FFFFFF',
         font: '30px mainFont',
      };

      const restartGameText = this.add.text(
         this.game.renderer.width / 2 - 50,
         35,
         'Restart game',
         { ...fontStyles },
      );

      restartGameText.setInteractive();
      restartGameText.on('pointerdown', () => {
         const gameScene = this.scene.get(SceneNames.Game);
         const uiScene = this.scene.get(SceneNames.Ui);
         const restartScene = this.scene.get(SceneNames.Restart);

         game.registry.reset();

         restartScene.scene.remove();
         uiScene.scene.restart({ playerHearts });
         gameScene.scene.restart({ lifeHearts: playerHearts });
      });

      container.setDepth(999);
      container.add(background);
      container.add(restartGameText);
   }
}
