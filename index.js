import * as THREE from "three";

class SistemaSolar {
  constructor() {
    this.canvas = document.getElementById('sistema-solar');

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
        75,
        this.canvas.clientWidth / this.canvas.clientHeight,
        0.1,
        1000
    );

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.createStars();

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('./textures/2k_sun.jpg', (texture) => {

      const geometry = new THREE.SphereGeometry(2, 32, 32);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      this.sun = new THREE.Mesh(geometry, material);
      this.scene.add(this.sun);

      this.camera.position.set(0, 3, 5);
      this.camera.lookAt(new THREE.Vector3(0, 1, 0));

      this.animate();
    });

    this.camera.position.z = 5;

    window.addEventListener('resize', () => this.resizeCanvas());
  }

  createStars() {
    const starCount = 1000;
    const starColors = [0xFFFFFF, 0x89CFF0, 0xFFA07A];

    for (let i = 0; i < starCount; i++) {
      const geometry = new THREE.SphereGeometry(Math.random() * 0.07, 16, 16);
      const material = new THREE.MeshBasicMaterial({ color: starColors[Math.floor(Math.random() * starColors.length)] });
      const star = new THREE.Mesh(geometry, material);

      star.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );

      this.scene.add(star);
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    this.sun.rotation.y += 0.01;

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