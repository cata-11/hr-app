<template>
  <section v-if="!!type">
    <div class="dialog">
      <div :class="['header', type]">{{ type }}</div>
      <div class="body">{{ message }}</div>
      <div class="btn">
        <base-button
          :color="type === 'error' ? 'red' : 'yellow'"
          size="big"
          @click="closeDialog"
          >OK</base-button
        >
      </div>
    </div>
  </section>
</template>

<script>
import BaseButton from '../base/BaseButton.vue';
export default {
  components: {
    BaseButton
  },
  computed: {
    type() {
      return this.$store.getters['dialog/type'];
    },
    message() {
      return this.$store.getters['dialog/message'];
    }
  },
  methods: {
    closeDialog() {
      this.$store.dispatch('dialog/close');
    }
  }
};
</script>

<style scoped>
section {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(19, 19, 19, 0.9);

  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  width: 25rem;
  background-color: var(--white);
}
.header {
  font-size: 1.5rem;
  padding: 0.5rem;
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
}
.body {
  padding: 1rem;
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  margin-top: 1rem;
  color: var(--black);
}
.error {
  background-color: var(--red);
}
.success {
  background-color: var(--yellow);
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

@media only screen and (max-width: 768px) {
  .dialog {
    width: 20rem;
  }
}

.btn > * {
  color: var(--white) !important;
}

@media only screen and (min-width: 0) {
  .btn > * {
    padding: 0.5rem 1rem !important;
    font-size: 1.25rem !important;
  }
}
</style>
