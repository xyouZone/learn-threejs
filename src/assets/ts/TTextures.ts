import { Texture, TextureLoader } from "three";

const textureLoader: TextureLoader = new TextureLoader();

export const pictureTexture: Texture = textureLoader.load('/1.jpg')