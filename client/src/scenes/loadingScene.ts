import { playerHearts } from '#/classes/player/constants';
import { SceneNames } from '#/config/gameConfig';
import * as Phaser from 'phaser';

export class LoadingScene extends Phaser.Scene {
   constructor() {
      super({
         key: SceneNames.Loading,
      });
   }
   public preload() {
      const loadingBar = this.add.graphics({
         fillStyle: {
            color: 0xffffff,
         },
      });
      this.load.on('progress', (percent: number) => {
         loadingBar.fillRect(
            20,
            this.game.renderer.height / 2,
            this.game.renderer.width * percent,
            50,
         );
      });
   }

   public create() {
      // this.scene.start(SceneNames.Menu, { data: 'from loading' });
      // this.scene.start(SceneNames.Restart);
      this.scene.start(SceneNames.Game, { lifeHearts: playerHearts });
      this.scene.start(SceneNames.Ui);
   }
}
