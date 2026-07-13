import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Cena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf2f2f2);

// Câmara
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 3, 8);

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

// Luz ambiente
scene.add(new THREE.AmbientLight(0xffffff, 2));

// Luz direcional
const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(5, 5, 5);
scene.add(light);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Carregar modelo
const loader = new GLTFLoader();

loader.load(
    '/models/teeth.glb',

    (gltf) => {

        scene.add(gltf.scene);

        console.log("Modelo carregado!");
        console.log(gltf.scene);

    },

    undefined,

    (error) => {

        console.error(error);

    }

);

// Resize
window.addEventListener('resize', () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

});

// Animação
function animate() {

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);

}

animate();