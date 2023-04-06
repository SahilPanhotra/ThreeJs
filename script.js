//import THREE from node modules
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from "gsap";
//First of all we need a 3d Scene


// //Cursor Cordinates
// const cursor = {
//   x: 0,
//   y: 0,
// };
// window.addEventListener("mousemove", (event) => {
//   cursor.x = event.clientX / sizes.width - 0.5;
//   cursor.y = event.clientY / sizes.height - 0.5;
// });

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

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  100
);
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );

//Alwayz set your camera position before setting it to scene and render
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);

//But adding a camera is not enough you need some thing in your dom to render it onto

// const canvas = document.getElementsByTagName('canvas');
const canvas = document.querySelector("canvas.webgl");
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
const clock = new THREE.Clock();
//using Gsap Library
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
// gsap.to(mesh.position, { duration: 1, delay: 2, x: -2 })

//Animation
const tick = () => {
  // // Time
  const elapsedTime = clock.getElapsedTime();

  // // Update
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2 ;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2 ;
  // camera.position.y = -(cursor.y*3);
  // camera.lookAt(mesh.position)
  // mesh.rotation.y = elapsedTime;
  // mesh.position.y = Math.sin(elapsedTime);

  // Update controls after damping enabled
  // By default, the camera is looking at the center of the scene. We can change that with the target property.
  controls.update()
  //render needs scene and camera to render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
