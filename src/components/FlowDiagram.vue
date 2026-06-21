<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import FlowNode from './FlowNode.vue'

const props = defineProps({
  nodes: { type: Array, required: true },
  edges: { type: Array, required: true },
  height: { type: Number, default: 320 }
})

const nodeTypes = { box: FlowNode }
const nodesRef = ref(props.nodes)
const edgesRef = ref(props.edges)
</script>

<template>
  <div class="flow-diagram" :style="{ height: height + 'px' }">
    <VueFlow
      :nodes="nodesRef"
      :edges="edgesRef"
      :node-types="nodeTypes"
      fit-view-on-init
      :fit-view-options="{ padding: 0.28 }"
      class="light-flow"
      :min-zoom="0.25"
      :max-zoom="2"
    />
  </div>
</template>

<style scoped>
.flow-diagram {
  border: 1px solid #d1d5db;
  border-radius: 10px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  margin-bottom: 1.5rem;
}

.dark-flow {
  background: #ffffff;
}
</style>
