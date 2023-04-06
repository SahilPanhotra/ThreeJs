//import THREE from node modules
import * as THREE from "three";

//First of all we need a 3d Scene
const scene = new THREE.Scene();

//Objects for the Scene which will have geometry and material to form a mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);

//after mesh is created add them to your Scene

scene.add(mesh);

//Camera is Required to view the scene
// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
//It is perspective Camera meaning far things gets smaller and with much enlarged field of view it can act wierd so use field of view angle between 30-55 max
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
//Alwayz set your camera position before setting it to scene and render
camera.position.z = 3;
scene.add(camera);

//But adding a camera is not enough you need some thing in your dom to render it onto

// const canvas = document.getElementsByTagName('canvas');
const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);

let time =  Date.now()
//Animation
const tick = () => {
  // Time
  const currentTime = Date.now()
  const deltaTime = currentTime - time
  time = currentTime

  // Update objects We are multiplying by deltaTime to match speed of our model animation on all devices
  mesh.rotation.y += 0.01 * deltaTime
  //render needs scene and camera to render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
