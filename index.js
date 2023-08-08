import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

    // this.createStars();
    this.createSun();

    this.createMercury();
    this.createVenus();
    this.createEarth();
    this.createMars();
    // this.createAsteroidBelt();
    this.createJupiter()
    this.createSaturn()
    this.createUranus()
    this.createNeptune()

    this.camera.position.set(0, 3, 20);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;
    this.controls.zoomSpeed = 0.5;

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

  createSun() {
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
  }

  createMercury() {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('./textures/2k_mercury.jpg', (texture) => {
      const geometry = new THREE.SphereGeometry(0.1, 32, 32);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      this.mercury = new THREE.Mesh(geometry, material);
      this.mercury.position.set(28, 0, 0);
      this.scene.add(this.mercury);
    });
  }

  createVenus() {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('./textures/2k_venus.jpg', (texture) => {
      const geometry = new THREE.SphereGeometry(0.3, 32, 32);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      this.venus = new THREE.Mesh(geometry, material);
      this.venus.position.set(5, 0, 0);
      this.scene.add(this.venus);
    });
  }

  createEarth() {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('./textures/2k_earth.jpg', (texture) => {
      const geometry = new THREE.SphereGeometry(0.3, 32, 32);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      this.earth = new THREE.Mesh(geometry, material);
      this.earth.position.set(12, 0, 0);
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
      this.mars.position.set(16, 0, 0);
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

  // createAsteroidBelt() {
  //   const asteroidCount = 1000;
  //   const innerRadius = 18;
  //   const outerRadius = 22;

  //   for (let i = 0; i < asteroidCount; i++) {
  //     const geometry = new THREE.SphereGeometry(Math.random() * 0.05, 16, 16);
  //     const material = new THREE.MeshBasicMaterial({ color: 0xCCCCCC });
  //     const asteroid = new THREE.Mesh(geometry, material);

  //     const distance = innerRadius + Math.random() * (outerRadius - innerRadius);
  //     const angle = Math.random() * Math.PI * 2;

  //     asteroid.position.set(
  //       distance * Math.cos(angle),
  //       (Math.random() - 0.5) * 2,
  //       distance * Math.sin(angle)
  //     );

  //     this.scene.add(asteroid);
  //   }
  // }

  createJupiter() {
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('./textures/2k_jupiter.jpg', (texture) => {
    const geometry = new THREE.SphereGeometry(0.9, 32, 32);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    this.jupiter = new THREE.Mesh(geometry, material);
    this.jupiter.position.set(20, 0, 0);
    this.scene.add(this.jupiter);
  });
}

createSaturn() {
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('./textures/2k_saturn.jpg', (texture) => {
    const geometry = new THREE.SphereGeometry(0.8, 32, 32);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    this.saturn = new THREE.Mesh(geometry, material);
    this.saturn.position.set(24, 0, 0);
    this.scene.add(this.saturn);

    // Create Saturn's Ring
    // const ringTexture = new THREE.TextureLoader('./textures/2k_saturn_ring.jpg');
    // const ringGeometry = new THREE.RingGeometry(1, 2, 64);
    // const ringMaterial = new THREE.MeshBasicMaterial({ map: ringTexture, side: THREE.DoubleSide });
    // this.ring = new THREE.Mesh(ringGeometry, ringMaterial);
    // this.saturn.add(this.ring);
  });
}

createUranus() {
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('./textures/2k_uranus.jpg', (texture) => {
    const geometry = new THREE.SphereGeometry(0.6, 32, 32);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    this.uranus = new THREE.Mesh(geometry, material);
    this.uranus.position.set(28, 0, 0);
    this.scene.add(this.uranus);
  });
}

createNeptune() {
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('./textures/2k_neptune.jpg', (texture) => {
    const geometry = new THREE.SphereGeometry(0.6, 32, 32);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    this.neptune = new THREE.Mesh(geometry, material);
    this.neptune.position.set(32, 0, 0);
    this.scene.add(this.neptune);
  });
}

createPluto() {
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('./textures/2k_pluto.jpg', (texture) => {
    const geometry = new THREE.SphereGeometry(0.3, 32, 32);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    this.pluto = new THREE.Mesh(geometry, material);
    this.pluto.position.set(36, 0, 0);
    this.scene.add(this.pluto)
  })
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

    if (this.jupiter) {
      this.jupiter.rotation.y += 0.01;
      this.jupiter.position.x = 20 * Math.cos(0.0003 * performance.now());
      this.jupiter.position.z = 20 * Math.sin(0.0003 * performance.now());
    }
  
    if (this.saturn) {
      this.saturn.rotation.y += 0.01;
      this.saturn.position.x = 24 * Math.cos(0.00025 * performance.now());
      this.saturn.position.z = 24 * Math.sin(0.00025 * performance.now());
  
      if (this.ring) {
        this.ring.rotation.x = 1.2; // Tilt Ring
      }
    }
  
    if (this.uranus) {
      this.uranus.rotation.y += 0.01;
      this.uranus.position.x = 28 * Math.cos(0.00023 * performance.now());
      this.uranus.position.z = 28 * Math.sin(0.00023 * performance.now());
    }
  
    if (this.neptune) {
      this.neptune.rotation.y += 0.01;
      this.neptune.position.x = 32 * Math.cos(0.00022 * performance.now());
      this.neptune.position.z = 32 * Math.sin(0.00022 * performance.now());
    }
  
    if (this.pluto) {
      this.pluto.rotation.y += 0.01;
      this.pluto.position.x = 36 * Math.cos(0.0002 * performance.now());
      this.pluto.position.z = 36 * Math.sin(0.0002 * performance.now());
    }  

    this.controls.update();

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