import * as THREE from "three";

class SistemaSolar {
  constructor() {
    // Obtenha o elemento canvas
    this.canvas = document.getElementById('sistema-solar');

    // Crie a cena
    this.scene = new THREE.Scene();

    // Crie a câmera
    this.camera = new THREE.PerspectiveCamera(
        75,
        this.canvas.clientWidth / this.canvas.clientHeight,
        0.1,
        1000
    );

    // Crie o renderizador e configure-o para usar o canvas
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    // Crie um cubo
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.camera.position.z = 5;

    // Redimensione o canvas
    window.addEventListener('resize', () => this.resizeCanvas());

    // Inicie a animação
    this.animate();
}

  animate() {
    requestAnimationFrame(() => this.animate());

    // Rotacione o cubo
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    // Renderize a cena
    this.renderer.render(this.scene, this.camera);
  }

  resizeCanvas() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
}
}

window.addEventListener("DOMContentLoaded", () => new SistemaSolar());
