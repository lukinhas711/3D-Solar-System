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

    this.createMercury();
    this.createVenus();
    this.createEarth();
    this.createMars();
    this.createAsteroidBelt();

    this.camera.position.z = 5;

    window.addEventListener('resize', () => this.resizeCanvas());
    window.addEventListener('wheel', (event) => this.handleScroll(event));
    window.addEventListener('keydown', (event) => this.handleKeydown(event));
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

  createMercury() {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('./textures/2k_mercury.jpg', (texture) => {
      const geometry = new THREE.SphereGeometry(0.1, 32, 32);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      this.mercury = new THREE.Mesh(geometry, material);
      this.mercury.position.set(4, 0, 0);
      this.scene.add(this.mercury);
    });
  }

  createVenus() {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('./textures/2k_venus.jpg', (texture) => {
      const geometry = new THREE.SphereGeometry(0.3, 32, 32);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      this.venus = new THREE.Mesh(geometry, material);
      this.venus.position.set(5, 0, 0); // 8 é aproximadamente 800px quando projetado na tela
      this.scene.add(this.venus);
    });
  }

  createEarth() {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('./textures/2k_earth.jpg', (texture) => {
      const geometry = new THREE.SphereGeometry(0.3, 32, 32);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      this.earth = new THREE.Mesh(geometry, material);
      this.earth.position.set(12, 0, 0); // 12 é aproximadamente 1200px quando projetado na tela
      this.scene.add(this.earth);

      textureLoader.load('./textures/2k_moon.jpg', (moonTexture) => {
        const moonGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
        this.moon = new THREE.Mesh(moonGeometry, moonMaterial);
        this.moon.position.set(1, 0, 0);
        this.earth.add(this.moon);
      });
    });
  }

  createMars() {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('./textures/2k_mars.jpg', (texture) => {
      const geometry = new THREE.SphereGeometry(0.15, 32, 32);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      this.mars = new THREE.Mesh(geometry, material);
      this.mars.position.set(16, 0, 0); // 16 é aproximadamente 1600px quando projetado na tela
      this.scene.add(this.mars);

      const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xCCCCCC });

      const moon1Geometry = new THREE.SphereGeometry(0.05, 16, 16);
      this.moon1 = new THREE.Mesh(moon1Geometry, moonMaterial);
      this.moon1.position.set(0.6, 0, 0);
      this.mars.add(this.moon1);

      const moon2Geometry = new THREE.SphereGeometry(0.04, 16, 16);
      this.moon2 = new THREE.Mesh(moon2Geometry, moonMaterial);
      this.moon2.position.set(1, 0, 0);
      this.mars.add(this.moon2);
    });
  }

  createAsteroidBelt() {
    const asteroidCount = 1000;
    const innerRadius = 18;
    const outerRadius = 22;

    for (let i = 0; i < asteroidCount; i++) {
      const geometry = new THREE.SphereGeometry(Math.random() * 0.05, 16, 16);
      const material = new THREE.MeshBasicMaterial({ color: 0xCCCCCC });
      const asteroid = new THREE.Mesh(geometry, material);

      const distance = innerRadius + Math.random() * (outerRadius - innerRadius);
      const angle = Math.random() * Math.PI * 2;

      asteroid.position.set(
        distance * Math.cos(angle),
        (Math.random() - 0.5) * 2,
        distance * Math.sin(angle)
      );

      this.scene.add(asteroid);
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    this.sun.rotation.y += 0.01;

    if (this.mercury) {
      this.mercury.rotation.y += 0.03;
      this.mercury.position.x = 4 * Math.cos(0.006 * performance.now());
      this.mercury.position.z = 4 * Math.sin(0.006 * performance.now());
    }

    if (this.venus) {
      this.venus.rotation.y += 0.01;
      this.venus.position.x = 8 * Math.cos(0.001 * performance.now());
      this.venus.position.z = 8 * Math.sin(0.001 * performance.now());
    }

    if (this.earth) {
      this.earth.rotation.y += 0.02;
      this.earth.position.x = 12 * Math.cos(0.0003 * performance.now());
      this.earth.position.z = 12 * Math.sin(0.0003 * performance.now());

      if (this.moon) {
        this.moon.position.x = 1 * Math.cos(0.01 * performance.now());
        this.moon.position.z = 1 * Math.sin(0.01 * performance.now());
      }
    }

    if (this.mars) {
      this.mars.rotation.y += 0.02;
      this.mars.position.x = 16 * Math.cos(0.00015 * performance.now());
      this.mars.position.z = 16 * Math.sin(0.00015 * performance.now());

      if (this.moon1) {
        this.moon1.position.x = 1 * Math.cos(0.008 * performance.now());
        this.moon1.position.z = 1 * Math.sin(0.008 * performance.now());
      }

      if (this.moon2) {
        this.moon2.position.x = 1 * Math.cos(0.009 * performance.now());
        this.moon2.position.z = 1 * Math.sin(0.009 * performance.now());
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  resizeCanvas() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  
    const cameraDistance = 5 * Math.max(this.canvas.clientWidth / this.canvas.clientHeight, 1);
    this.camera.position.z = cameraDistance;
  }

  handleScroll(event) {
    const delta = Math.sign(event.deltaY) * 0.5;
    this.camera.position.z = Math.max(5, this.camera.position.z + delta);
  }

  handleKeydown(event) {
    const delta = (event.code === 'ArrowUp') ? -0.5 : (event.code === 'ArrowDown') ? 0.5 : 0;
    this.camera.position.z = Math.max(5, this.camera.position.z + delta);
  }
}

window.addEventListener("DOMContentLoaded", () => new SistemaSolar());