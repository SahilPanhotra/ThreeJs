//import THREE from node modules
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import GUI from "lil-gui";

/**
 * Debug
 */
const gui = new GUI();
const parameters = {
  spin: () =>
  {
      gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
  }
}
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

//DEBUG
// gui.add(mesh.position, 'y', - 3, 3, 0.01) or you can chain methods shown below
gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");

gui.add(mesh, "visible");

gui.add(material, "wireframe");

gui.addColor(material, "color");

gui.add(parameters, 'spin')
//after mesh is created add them to your Scene

scene.add(mesh);

//Camera is Required to view the scene
// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
window.addEventListener("dblclick", () => {
  //webkitFullscreenElement is for non supported browser like safari etc
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});
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
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
  controls.update();
  //render needs scene and camera to render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
