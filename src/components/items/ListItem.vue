<template>
  <li>
    <div class="data">
      <div v-for="data in this.item" :key="data" class="data-value">
        {{ data }}
      </div>
    </div>
    <div class="btns">
      <base-button color="yellow" @click="editItem">Edit</base-button>
      <base-button color="red" @click="deleteItem">Delete</base-button>
    </div>
  </li>
</template>

<script>
import BaseButton from '../base/BaseButton.vue';
export default {
  props: ['item', 'idx'],
  emits: ['item-edited', 'item-deleted'],
  components: {
    BaseButton
  },
  methods: {
    editItem() {
      this.$emit('item-edited', this.idx);
    },
    deleteItem() {
      this.$emit('item-deleted', this.idx);
    }
  }
};
</script>

<style scoped>
li {
  display: flex;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
}
li div {
  width: 100%;
}
.data {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.data-value {
  word-wrap: break-word;
}
.btns {
  width: 20%;
  align-items: center;
  display: flex;
  justify-content: space-evenly;
}
.btns * {
  width: 40%;
}
</style>
