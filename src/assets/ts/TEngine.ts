import { AmbientLight, AxesHelper, BoxBufferGeometry, GridHelper, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer,MOUSE, Object3D } from "three";
import Stats from 'three/examples/jsm/libs/stats.module'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
export class TEngine {

  private dom: HTMLElement
  private renderer: WebGLRenderer

  private scene: Scene
  private camera: PerspectiveCamera

  constructor (dom: HTMLElement) {
    this.dom = dom;
    this.renderer = new WebGLRenderer({
      antialias: true
    });
    // 开启渲染器阴影渲染
    this.renderer.shadowMap.enabled = true;
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 1, 1000);

    this.camera.position.set(200,200,200);
    this.camera.lookAt(new Vector3(0,0,0));
    this.camera.up = new Vector3(0,1,0);

    this.renderer.setSize(dom.offsetWidth,dom.offsetHeight,true);

    // this.renderer.setClearColor('rgb(255,255,255)');
    // this.renderer.clearColor();

    // 初始性能监视器
    const stats = Stats()
    const statsDom = stats.domElement;
    statsDom.style.position = 'fixed';
    statsDom.style.position = '0';
    statsDom.style.right = '5px';
    statsDom.style.left = 'unSet';

    // 初始arbitControls
    const orbitControls: OrbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    orbitControls.enableDamping = true;

    const renderFunc = () => {
      // box.position.x += 0.01;
      orbitControls.update();
      this.renderer.render(this.scene, this.camera);
      stats.update();
      requestAnimationFrame(renderFunc);
    }
    renderFunc();
    dom.appendChild(this.renderer.domElement);
    dom.appendChild(statsDom);

  }

  addObject(...object: Object3D[]) {
    object.forEach(elem => {
      this.scene.add(elem)
    })
  }
}