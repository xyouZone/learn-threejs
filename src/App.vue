<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { TEngine } from './assets/ts/TEngine';
import { defineComponent,onMounted,ref } from 'vue';
import { basicObjectList } from './assets/ts/TBasicObject'
// import { TCanvasTextureEditor } from './assets/ts/TCanvasTextureEdit'
import { lightsList } from './assets/ts/TLights'
import { helperList } from './assets/ts/THelper'
import { codeModelList } from './assets/ts/TCodeModel';
import { framePromise, getFrame } from './assets/ts/TLoadModel';
import { groupPromise } from './assets/ts/TGroup';

export default defineComponent({
  setup() {
    const threeTarget = ref(null);
    onMounted(() => {
      const TE = new TEngine(threeTarget.value!);
      TE.addObject(...basicObjectList);
      TE.addObject(...lightsList);
      TE.addObject(...helperList);
      // TE.addObject(...codeModelList);

      groupPromise.then(group => {
        TE.addObject(group);
      })
    })

    return {
      threeTarget
    }
  }
})
</script>

<template>
  <div class="three-canvas" ref="threeTarget">
  </div>
</template>

<style>
.three-canvas {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
