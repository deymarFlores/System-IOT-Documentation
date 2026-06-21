<script setup>
import { Handle, Position } from '@vue-flow/core'

defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <div
    class="fnode"
    :style="{
      '--bg': data.color || '#334155',
      '--bg2': data.colorDark || '#1e293b'
    }"
  >

    <!-- 🔵 LEFT SIDE (entrada/salida completa) -->
    <Handle
      id="left-source"
      type="source"
      :position="Position.Left"
    />
    <Handle
      id="left-target"
      type="target"
      :position="Position.Left"
    />

    <!-- 🔵 RIGHT SIDE (entrada/salida completa) -->
    <Handle
      id="right-source"
      type="source"
      :position="Position.Right"
    />
    <Handle
      id="right-target"
      type="target"
      :position="Position.Right"
    />

    <!-- 🔵 TOP SIDE -->
    <Handle
      id="top-source"
      type="source"
      :position="Position.Top"
    />
    <Handle
      id="top-target"
      type="target"
      :position="Position.Top"
    />

    <!-- 🔵 BOTTOM SIDE -->
    <Handle
      id="bottom-source"
      type="source"
      :position="Position.Bottom"
    />
    <Handle
      id="bottom-target"
      type="target"
      :position="Position.Bottom"
    />

    <!-- CONTENT -->
    <div class="fnode-inner">
      <div class="fnode-klass" v-if="data.klass">
        {{ data.klass }}
      </div>

      <div class="fnode-label">
        {{ data.label }}
      </div>

      <div class="fnode-sub" v-if="data.sub">
        {{ data.sub }}
      </div>
    </div>

  </div>
</template>

<style scoped>
.fnode {
  background: linear-gradient(170deg, var(--bg), var(--bg2));
  border: 1px solid rgba(255,255,255,0.13);
  border-radius: 8px;
  min-width: 128px;
  max-width: 175px;
  text-align: center;
  color: white;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.14),
    6px 8px 0 rgba(0,0,0,0.55),
    6px 8px 0 1px rgba(0,0,0,0.2);
  cursor: default;
  user-select: none;
  position: relative;
  overflow: hidden;
}

.fnode::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(255,255,255,0.09) 0%,
    transparent 55%
  );
  pointer-events: none;
}

.fnode-inner {
  padding: 10px 14px;
  position: relative;
}

.fnode-klass {
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.6;
  margin-bottom: 2px;
}

.fnode-label {
  font-size: 0.8125rem;
  font-weight: 700;
  line-height: 1.3;
}

.fnode-sub {
  font-size: 0.68rem;
  opacity: 0.72;
  margin-top: 4px;
  line-height: 1.35;
}
</style>