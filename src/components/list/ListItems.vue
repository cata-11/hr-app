<template>
  <ul>
    <li class="fields">
      <div v-for="(value, key) in this.items[0]" :key="value">{{ key }}</div>
    </li>
    <ListItem v-for="item in this.items" :key="item" :item="item" />
  </ul>
</template>

<script>
import ListItem from './ListItem.vue';
export default {
  props: ['items'],
  components: {
    ListItem
  }
};
</script>

<style scoped>
ul {
  margin-top: 1rem;
}
.fields {
  display: flex;
  justify-content: space-between;
  width: 80%;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
}
.fields div {
  width: 100%;
}

li:nth-of-type(even) {
  background-color: var(--grey);
}
</style>
