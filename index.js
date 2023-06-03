class SistemaSolar {
  constructor() {
      this.canvas = document.getElementById('sistema-solar');
      this.ctx = this.ctx = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
  }
}

window.addEventListener('DOMContentLoaded', () => new SistemaSolar());