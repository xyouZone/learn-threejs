import { AxesHelper,GridHelper, Object3D, PointLightHelper, SpotLightHelper } from 'three'
import { pointLight, spotLight } from './TLights';

export const helperList: Object3D[] = [];

const axesHelper: AxesHelper = new AxesHelper(500);
axesHelper.raycast = () => {}
const gridHelper: GridHelper = new GridHelper(500,20,'rgb(200,200,200)','rgb(100,100,100)');
const pointLightHelper: PointLightHelper = new PointLightHelper(pointLight,pointLight.distance,pointLight.color);
const spotLightHelper: SpotLightHelper = new SpotLightHelper(spotLight,spotLight.color);
spotLightHelper.raycast = () => {}

helperList.push(axesHelper,spotLightHelper);
