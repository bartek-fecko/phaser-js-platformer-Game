// tslint:disable: object-literal-sort-keys
import { dimensions } from '#/config/gameConfig';
import '#/config/globals.sass';
import { GameScene } from '#/scenes/gameScene';
import { LoadingScene } from '#/scenes/loadingScene';
import { MenuScene } from '#/scenes/menuScene';
import { UiScene } from '#/scenes/uiScene';

class KacpGame extends Phaser.Game {
   constructor(config) {
      super(config);
   }
}

const config = {
   title: 'KacpGame',
   type: Phaser.AUTO,
   width: dimensions.width,
   height: dimensions.height,
   parent: 'game',
   scene: [LoadingScene, MenuScene, GameScene, UiScene],
   render: {
      pixelArt: true,
   },
   physics: {
      default: 'arcade',
      gravity: { y: 300 },
      arcade: {
         debug: true,
      },
   },
};

window.addEventListener('load', () => new KacpGame(config));
