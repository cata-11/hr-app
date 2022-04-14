<template>
  <section class="list-container">
    <ul
      v-if="
        (isLoading &&
          (type === 'delete' || type === 'add' || type === 'edit')) ||
        (!isLoading && items.length > 0)
      "
    >
      <li class="fields" v-if="items.length > 0">
        <div v-for="field in fields" :key="field" class="data-field">
          {{ field }}
        </div>
      </li>
      <TransitionGroup name="list">
        <ListItem
          :fields="fields"
          v-for="(item, idx) in items"
          :key="item"
          :item="item"
          :idx="idx"
          @itemDeleted="deleteItem($event)"
          @itemEdited="editItem($event)"
        />
      </TransitionGroup>
    </ul>
    <p v-else-if="!isLoading && items.length === 0">No data found.</p>
    <TheLoader
      v-if="
        isLoading && (type === 'delete' || type === 'add' || type === 'fetch')
      "
    />
  </section>
</template>

<script>
import ListItem from './ListItem.vue';
export default {
  props: ['items', 'fields'],
  emits: ['item-edited', 'item-deleted'],
  components: {
    ListItem
  },
  computed: {
    isLoading() {
      return this.$store.getters['loader/isLoading'];
    },
    type() {
      return this.$store.getters['loader/type'];
    }
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
.list-container {
  position: relative;
}
.fields {
  display: flex;
  justify-content: space-between;
  width: 80%;
  font-weight: bold;
  font-size: var(--font-size);
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  padding-right: 0;
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

@media only screen and (max-width: 768px) {
  .fields {
    display: none;
  }
  ul {
    width: 90%;
    margin: 0 auto;
    box-sizing: border-box;
  }
  li:nth-of-type(even) {
    background-color: var(--white);
  }
}
</style>
