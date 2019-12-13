// tslint:disable: object-literal-sort-keys
export class Weather {
   public particleEmmiterSettings: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig;
   public rainPartileManager: Phaser.GameObjects.Particles.ParticleEmitterManager;
   public snowPartileManager: Phaser.GameObjects.Particles.ParticleEmitterManager;
   private scene: Phaser.Scene;
   private width: number;
   private height: number;

   constructor(
      scene: Phaser.Scene,
      width: number,
      height: number,
      particleEmmiterSettings?: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig,
   ) {
      this.scene = scene;
      this.width = width;
      this.height = height;
      this.particleEmmiterSettings = particleEmmiterSettings;
   }

   public addRain() {
      const rainTexture = this.scene.textures.createCanvas('rain', 16, 256);

      rainTexture.context.fillStyle = '#9cc9de';
      rainTexture.context.fillRect(0, 0, 15, 50);
      rainTexture.refresh();

      this.rainPartileManager = this.scene.add.particles('rain').setDepth(999);
      this.rainPartileManager.createEmitter(this.particleEmmiterSettings || {
         x: { min: 0, max: this.width },
         y: 0,
         gravityY: 400,
         maxVelocityY: 400,
         alpha: { min: 0.5, max: 1 },
         scale: { start: 0.05, end: 0.2 },
         lifespan: 1800,
         rotate: 20,
         quantity: 5,
         blendMode: 'ADD',
      });

   }

   public removeRain() {
      this.rainPartileManager.destroy();
   }

   public addSnow() {
      const circle = document.createElement('canvas');
      const ctx = circle.getContext('2d');
      ctx.beginPath();
      ctx.arc(100, 75, 50, 0, 2 * Math.PI);
      ctx.fillStyle = 'orange';
      ctx.fill();
      ctx.stroke();

      this.scene.textures.addCanvas('snow', circle);

      this.snowPartileManager = this.scene.add.particles('snow').setDepth(999);
      this.snowPartileManager.createEmitter(this.particleEmmiterSettings || {
         x: { min: 0, max: this.width },
         y: 0,
         gravityY: 0,
         maxVelocityY: 60,
         speedY: 60,
         alpha: { min: 0.2, max: 1 },
         scale: { start: 0.05, end: 0.05 },
         lifespan: 5600,
         quantity: 2,
         blendMode: 'SCREEN',
         gravityX: 4,
      });
   }

   public removeSnow() {
      this.snowPartileManager.destroy();
   }
}
