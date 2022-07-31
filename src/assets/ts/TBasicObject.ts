import {
  Mesh,
  BoxBufferGeometry,
  MeshStandardMaterial,
  SphereBufferGeometry,
  CylinderBufferGeometry,
  Object3D,
  PlaneBufferGeometry,
  Color
} from 'three'
import { pictureTexture } from './TTextures';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper'

export const basicObjectList: Object3D[] = []

// 地面
const stage: Mesh = new Mesh(
  new BoxBufferGeometry(600,10,400),
  new MeshStandardMaterial({
    color: 'rgb(150,150,150)',
    roughness: 0
  })
)
stage.receiveShadow = true;
stage.castShadow = true;
stage.position.y = -5;

// 墙面
export const wall: Mesh = new Mesh(
  new BoxBufferGeometry(600,200,10),
  new MeshStandardMaterial({
    color: 'white'
  })
);
wall.position.y = 100;
wall.position.z = -80;

wall.updateMatrix();
wall.updateMatrixWorld();

basicObjectList.push(stage,wall);
