import { Group, Mesh, MeshStandardMaterial } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { frameColorTexture, frameDispTexture, frameRoughnessTexture } from './TTextures';

const objLoader: OBJLoader = new OBJLoader();

export const framePromise = new Promise<Mesh>((resolve,reject) => {
  objLoader.loadAsync('/frame.obj').then(group => {
    const frame: Mesh = group.children[0] as Mesh;
    frame.material = new MeshStandardMaterial({
      map: frameColorTexture,
      roughnessMap: frameRoughnessTexture,
      bumpMap: frameDispTexture
    })

    frame.position.y = 45;
    frame.position.z = -1;
    frame.rotation.y = Math.PI / 180 * -90;
    frame.scale.set(2,2,2);

    resolve(frame);
  }).catch(err => {
    reject(err);
  })
})

export const getFrame = async function(): Promise<Mesh | null> {
  const group = await objLoader.loadAsync('/frame.obj');

  if(group instanceof Group) {
    const frame: Mesh = group.children[0] as Mesh;
    frame.material = new MeshStandardMaterial({
      map: frameColorTexture,
      roughnessMap: frameRoughnessTexture,
      bumpMap: frameDispTexture
    })

    frame.position.y = 120;
    frame.position.z = -70;
    frame.rotation.y = Math.PI / 180 * -90;
    frame.scale.set(2,2,2);

    return frame;
  } else {
    console.error(group);
    return null;
  }
}
