<template>
  <form>
    <header>
      <h2>
        <slot name="header"></slot>
      </h2>
      <base-button size="small" color="yellow">create</base-button>
    </header>
    <div class="wrapper">
      <slot name="body"></slot>
    </div>
  </form>
</template>

<script>
import BaseButton from './BaseButton.vue';
export default {
  components: {
    BaseButton
  }
};
</script>

<style scoped>
form {
  width: 97.5%;
  margin: 0 auto;
}
header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
h2 {
  margin-right: 1.5rem;
  font-size: 1.25rem;
}
.wrapper {
  display: flex;
  justify-content: space-between;
}
.wrapper:deep(div) {
  width: 50%;
}
.wrapper:deep(input) {
  width: 95%;
  margin-bottom: 1rem;
  padding: 0.25rem;
}

.wrapper:deep(select) {
  width: 95%;
  margin-bottom: 1rem;
  padding: 0.25rem;
}
</style>
