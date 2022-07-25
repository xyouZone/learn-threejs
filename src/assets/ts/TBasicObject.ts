import {
  Mesh,
  BoxBufferGeometry,
  MeshStandardMaterial,
  SphereBufferGeometry,
  CylinderBufferGeometry,
  Object3D,
  PlaneBufferGeometry
} from 'three'
import { pictureTexture } from './TTextures';

export const basicObjectList: Object3D[] = []

// 地面
const stage: Mesh = new Mesh(
  new BoxBufferGeometry(200,10,200),
  new MeshStandardMaterial({
    color: 'rgb(150,150,150)',
    roughness: 0
  })
)
stage.receiveShadow = true;
stage.castShadow = true;
stage.position.y = -5;

// 立方体
const box: Mesh = new Mesh(
  new BoxBufferGeometry(20,20,20),
  new MeshStandardMaterial({
    color: 'red',
    metalness: 1,
    roughness: 0.3
  })
)
box.castShadow = true;
box.castShadow = true;
box.position.y = 10;

// 相框
const plane: Mesh = new Mesh(
  new PlaneBufferGeometry(192,108),
  new MeshStandardMaterial({
    map: pictureTexture
  })
)
plane.position.y = 45;
plane.scale.set(0.3,0.3,0.3)

basicObjectList.push(stage,box,plane);
