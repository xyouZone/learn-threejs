import { AmbientLight, AxesHelper, BoxBufferGeometry, GridHelper, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer,MOUSE, Object3D, Vector2, Raycaster,Material, } from "three";
import Stats from 'three/examples/jsm/libs/stats.module'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { TEventManager } from "./TEventManager";
export class TEngine {

  private dom: HTMLElement
  private renderer: WebGLRenderer
  private transformControls: TransformControls
  private eventManager: TEventManager;

  private scene: Scene
  private camera: PerspectiveCamera

  constructor (dom: HTMLElement) {
    this.dom = dom;
    const renderer = new WebGLRenderer({
      antialias: true
    });
    // 开启渲染器阴影渲染
    renderer.shadowMap.enabled = true;
    const scene = new Scene();
    const camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 1, 1000);

    camera.position.set(200,200,200);
    camera.lookAt(new Vector3(0,0,0));
    camera.up = new Vector3(0,1,0);

    renderer.setSize(dom.offsetWidth,dom.offsetHeight,true);

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
    const orbitControls: OrbitControls = new OrbitControls(
      camera,
      renderer.domElement
    );
    orbitControls.mouseButtons = {
      LEFT: null as unknown as MOUSE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.ROTATE
    };

    // 初始变换控制器
    const transformControls = new TransformControls(camera, renderer.domElement);
    scene.add(transformControls);
    let transing = false; // 判断此次鼠标事件是否是变换事件
    transformControls.addEventListener('mouseDown', event => {
      transing = true;
    });

    document.addEventListener('keyup', event => {
      if (event.key === 'e') {
        transformControls.mode = "scale"
        return false
      }

      if (event.key === 'r') {
        transformControls.mode = "rotate"
        return false
      }

      if (event.key === 't') {
        transformControls.mode = "translate"
        return false
      }
    })

    const eventManager = new TEventManager({
      // 初始射线发射器
      dom: renderer.domElement,
      scene: scene,
      camera: camera,
    });

    let cacheObject: Mesh | null = null;
    eventManager.addEventListener("mousemove", (event) => {
      if (event.intersection.length) {
        const object = event.intersection[0].object;

        // 对比新老物体
        if (object === cacheObject) {
          return;
        } else if (object !== cacheObject && cacheObject) {
          (cacheObject.material as MeshStandardMaterial).color.multiplyScalar(
            0.5
          );
        }

        if (object.material) {
          object.material.color.multiplyScalar(2);
          cacheObject = object;
        }
      } else {
        if (cacheObject) {
          (cacheObject.material as MeshStandardMaterial).color.multiplyScalar(
            0.5
          );
          cacheObject = null;
        }
      }
    });

    renderer.domElement.addEventListener("click", (event) => {
      // 拖动结束的操作
      if (transing) {
        transing = false;
        return false;
      }

      // // 选取物体的操作
      // raycaster.setFromCamera(mouse, this.camera)

      // scene.remove(transformControls)
      // const intersection = raycaster.intersectObjects(scene.children)

      // if (intersection.length) {
      //  const object = intersection[0].object
      //  scene.add(transformControls)
      //  transformControls.attach(object)
      // }
    });

    const renderFun = () => {
      orbitControls.update();

      renderer.render(scene, camera);
      stats.update();
      requestAnimationFrame(renderFun);
    };

    renderFun();

    dom.appendChild(renderer.domElement);
    dom.appendChild(statsDom);

    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.transformControls = transformControls;
    this.eventManager = eventManager;
  }

  addObject(...object: Object3D[]) {
    object.forEach((elem) => {
      this.scene.add(elem);
    });
  }
}