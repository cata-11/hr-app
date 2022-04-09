<template>
  <ul v-if="items.length > 0">
    <li class="fields">
      <div v-for="field in this.fields" :key="field" class="data-field">
        {{ field }}
      </div>
    </li>
    <TransitionGroup name="list">
      <ListItem
        v-for="(item, idx) in this.items"
        :key="item"
        :item="item"
        :idx="idx"
        @itemDeleted="deleteItem($event)"
        @itemEdited="editItem($event)"
      />
    </TransitionGroup>
  </ul>
  <p v-else>No data found</p>
</template>

<script>
import ListItem from './ListItem.vue';
export default {
  props: ['items', 'fields'],
  emits: ['item-edited', 'item-deleted'],
  components: {
    ListItem
  },
  methods: {
    editItem(idx) {
      this.$emit('item-edited', idx);
    },
    deleteItem(idx) {
      this.$emit('item-deleted', idx);
    }
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
li {
  transition: all 0.2s ease-in-out;
}
li:nth-of-type(even) {
  background-color: var(--grey);
}
p {
  margin: 1rem;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease-in-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-5rem);
  transition: all 0.3s ease-in-out;
}
.list-leave-active {
  position: absolute;
  width: 80rem;
}
</style>
