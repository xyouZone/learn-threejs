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


// 图片
const picture: Mesh = new Mesh(
  new PlaneBufferGeometry(192,108),
  new MeshStandardMaterial({
    map: pictureTexture
  })
)
picture.position.y = 120;
picture.position.z = -70;
picture.scale.set(0.3,0.3,0.3);

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
wall.addEventListener('mouseenter', () => {
  (wall.material as MeshStandardMaterial).color = new Color('red');
})

wall.addEventListener('mouseleave', () => {
  (wall.material as MeshStandardMaterial).color = new Color('white');
})

basicObjectList.push(stage,wall,picture);
