import * as THREE from 'three';
import { useEffect, useRef } from 'react';

export default function BitcoinRenderer() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const renderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (renderedRef.current) return;
    renderedRef.current = true;

    const container = containerRef.current!;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientWidth,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.clientWidth, container.clientWidth);

    containerRef.current?.appendChild(renderer.domElement);

    const ambLight = new THREE.AmbientLight(0xaaaaaa, 0.5);
    scene.add(ambLight);

    const pointLightLeft = new THREE.PointLight(0xaa9677, 1);
    pointLightLeft.position.set(-2, -1, 10);
    scene.add(pointLightLeft);

    const pointLightRight = new THREE.PointLight(0xff954a, 1);
    pointLightRight.position.set(-2, -1, 2);
    scene.add(pointLightRight);

    const whitePointLight = new THREE.PointLight(0xaaaaaa, 0.3);
    whitePointLight.position.set(0, 2, 1);
    scene.add(whitePointLight);

    const dirLight = new THREE.DirectionalLight(0xde813e, 1);
    dirLight.position.z = 2;
    scene.add(dirLight);

    const texture = new THREE.TextureLoader().load('/bitcoin.jpg');
    const geometry = new THREE.CylinderGeometry(3, 3, 0.4, 100);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: texture,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.set(0, 0, 7);

    mesh.rotation.x = 2;
    mesh.rotation.y = 2;

    function animate() {
      mesh.rotation.x += 0.01;
      // mesh.rotation.y += 0.01;
      // mesh.rotation.z += 0.01;
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return <div ref={containerRef} className="w-60 md:w-96" />;
}
