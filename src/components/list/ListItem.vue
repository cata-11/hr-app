<template>
  <li>
    <div class="data">
      <div v-for="item in this.item" :key="item">{{ item }}</div>
    </div>
    <div class="btns">
      <base-button color="yellow">Edit</base-button>
      <base-button color="red">Delete</base-button>
    </div>
  </li>
</template>

<script>
import BaseButton from '../base/BaseButton.vue';
export default {
  props: ['item'],
  components: {
    BaseButton
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
.btns {
  width: 20%;
  display: flex;
  justify-content: space-evenly;
}
.btns * {
  width: 40%;
}
</style>
