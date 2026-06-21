<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { navItems, navGroupOrder, navGroupLabels, vpsNavItems } from '../data/nav.js'
import { stateMap } from '../composables/useProtocols.js'
import { collections } from '../data/database.js'

defineProps({
  open: { type: Boolean, default: true },
})

const route = useRoute()

const topSection = computed(() => {
  if (route.path.startsWith('/database')) return 'database'
  if (route.path.startsWith('/vps')) return 'vps'
  if (route.path.startsWith('/protocols')) return 'protocols'
  return 'docs'
})

// Sections grouped and ordered by navGroupOrder
const navGroups = computed(() => {
  const allGroups = navGroupOrder
    .map(gid => ({
      id: gid,
      label: navGroupLabels[gid],
      sections: navItems.filter(s => s.group === gid),
    }))
    .filter(g => g.sections.length > 0)

  if (topSection.value === 'protocols') {
    return allGroups.filter(g => g.id === 'funcionalidades')
  }
  return allGroups
})

// Groups start collapsed; sections within a group also start collapsed
const expandedGroups = ref(
  navGroupOrder.reduce((acc, g) => ({ ...acc, [g]: true }), {})
)
const expanded = ref(
  navItems.reduce((acc, s) => ({ ...acc, [s.id]: false }), {})
)

function toggleGroup(id)   { expandedGroups.value[id] = !expandedGroups.value[id] }
function toggleSection(id) { expanded.value[id] = !expanded.value[id] }

const mode = computed(() => topSection.value === 'protocols' ? 'protocols' : 'docs')

function featureLink(section, feature) {
  if (section === 'arch') return `/docs/arch/${feature}`
  return `/${mode.value}/${section}/${feature}`
}

function isFeatureActive(section, feature) {
  return route.path === featureLink(section, feature)
}

function getProgress(section, feature) {
  const id = `${section}-${feature}`
  return Object.values(stateMap.value[id] || {}).filter(Boolean).length
}
</script>

<template>
  <aside class="sidebar" :class="{ closed: !open }">

    <template v-if="topSection === 'docs' || topSection === 'protocols'">
      <template v-for="group in navGroups" :key="group.id">

        <!-- Group header — clickable, collapses/expands the whole group -->
        <div
          class="sidebar-group-label sidebar-group-toggle"
          @click="toggleGroup(group.id)"
        >
          <span>{{ group.label }}</span>
          <span class="sidebar-chevron" :class="{ open: expandedGroups[group.id] }">&#9656;</span>
        </div>

        <!-- Group body -->
        <div v-show="expandedGroups[group.id]" class="sidebar-group-body">
          <template v-for="section in group.sections" :key="section.id">

            <!-- Single-section group: items directly (no redundant section label) -->
            <template v-if="group.sections.length === 1">
              <router-link
                v-for="item in section.items"
                :key="item.feature"
                :to="featureLink(item.section, item.feature)"
                class="sidebar-item"
                :class="{ active: isFeatureActive(item.section, item.feature) }"
              >
                <span>{{ item.label }}</span>
                <span
                  v-if="topSection === 'protocols' && item.section !== 'arch'"
                  class="sidebar-progress"
                  :class="{ done: getProgress(item.section, item.feature) > 0 }"
                >{{ getProgress(item.section, item.feature) }}</span>
              </router-link>
            </template>

            <!-- Multi-section group: collapsible subsections -->
            <div v-else class="sidebar-section">
              <div class="sidebar-section-header" @click="toggleSection(section.id)">
                <span>{{ section.label }}</span>
                <span class="sidebar-chevron" :class="{ open: expanded[section.id] }">&#9656;</span>
              </div>
              <div v-show="expanded[section.id]" class="sidebar-items">
                <router-link
                  v-for="item in section.items"
                  :key="item.feature"
                  :to="featureLink(item.section, item.feature)"
                  class="sidebar-item"
                  :class="{ active: isFeatureActive(item.section, item.feature) }"
                >
                  <span>{{ item.label }}</span>
                  <span
                    v-if="topSection === 'protocols' && item.section !== 'arch'"
                    class="sidebar-progress"
                    :class="{ done: getProgress(item.section, item.feature) > 0 }"
                  >{{ getProgress(item.section, item.feature) }}</span>
                </router-link>
              </div>
            </div>

          </template>
        </div>

      </template>
    </template>

    <template v-else-if="topSection === 'vps'">
      <div class="sidebar-group-label">VPS &amp; Despliegue</div>
      <router-link
        v-for="item in vpsNavItems"
        :key="item.section"
        :to="`/vps/${item.section}`"
        class="sidebar-item"
        :class="{ active: route.path === `/vps/${item.section}` }"
      >{{ item.label }}</router-link>
    </template>

    <template v-else-if="topSection === 'database'">
      <div class="sidebar-group-label">Base de Datos</div>
      <router-link
        to="/database"
        class="sidebar-item"
        :class="{ active: route.path === '/database' }"
      >Todas las colecciones</router-link>
      <router-link
        v-for="col in collections"
        :key="col.name"
        :to="`/database/${col.name}`"
        class="sidebar-item"
        :class="{ active: route.params.collection === col.name }"
      >
        <code style="font-family:var(--font-mono); font-size:0.78rem">{{ col.name }}</code>
      </router-link>
    </template>

  </aside>
</template>
