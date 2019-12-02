// tslint:disable: object-literal-sort-keys
import { dimensions } from '#/config/gameConfig';
import '#/config/globals.sass';
import { GameScene } from '#/scenes/gameScene';
import { LoadingScene } from '#/scenes/loadingScene';
import { MenuScene } from '#/scenes/menuScene';
import { RestartScene } from '#/scenes/restartScene';
import { UiScene } from '#/scenes/uiScene';
import { WinScene } from '#/scenes/WinScene';

class PlatformerGame extends Phaser.Game {
   constructor(config) {
      super(config);
   }
}

const config = {
   title: 'PlatformerGame',
   type: Phaser.AUTO,
   width: dimensions.width,
   height: dimensions.height,
   parent: 'game',
   scene: [LoadingScene, MenuScene, GameScene, UiScene, RestartScene, WinScene],
   render: {
      pixelArt: true,
   },
   physics: {
      default: 'arcade',
      gravity: { y: 300 },
      arcade: {
         // debug: true,
      },
   },
};

let game: Phaser.Game;
window.addEventListener('load', () => game = new PlatformerGame(config));
export { game };
