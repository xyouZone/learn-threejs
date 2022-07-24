export class TCanvasTextureEditor {
  canvas: HTMLCanvasElement

  constructor(width: number = 512, height: number = 512, color: string = 'rgb(255,255,255') {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.backgroundClip = color;
  }
  draw(func: (ctx: CanvasRenderingContext2D) => void): this {
    const ctx = this.canvas.getContext('2d');
    if(ctx) {
      func(ctx);
      return this;
    } else {
      console.warn(`your browser can not support canvas 2d`);
      return this;
    }
  }

  preview () {
    const canvas = this.canvas;
    canvas.style.position = 'fixed';
    canvas.style.top = '25%';
    canvas.style.left = '25%';
    document.body.appendChild(this.canvas);
    return this;
  }
}