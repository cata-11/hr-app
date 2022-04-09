<template>
  <form>
    <div v-if="mode === 'edit'" class="close-btn" @click="modalClosed"></div>
    <header>
      <h2>
        <slot name="header"></slot>
      </h2>
      <base-button size="small" color="yellow">{{
        mode === 'edit' ? 'save' : mode
      }}</base-button>
    </header>
    <div class="wrapper">
      <slot name="body"></slot>
    </div>
  </form>
</template>

<script>
import BaseButton from './BaseButton.vue';
export default {
  emits: ['modal-closed'],
  props: ['mode'],
  components: {
    BaseButton
  },
  methods: {
    modalClosed() {
      this.$emit('modal-closed');
    }
  }
};
</script>

<style scoped>
form {
  width: 97.5%;
  margin: 0 auto;
  position: relative;
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
.wrapper:deep(input),
.wrapper:deep(select) {
  width: 95%;
  padding: 0.25rem;
  margin-top: 0.25rem;
}
.wrapper:deep(p.error) {
  font-size: 0.75rem;
  color: var(--red);
  height: 0.9rem;
}
.wrapper:deep(input.invalid),
.wrapper:deep(select.invalid) {
  border-color: var(--red);
  color: var(--red);
}
.close-btn {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--white);

  background: url('../../assets/cross.svg') center no-repeat;
  background-size: 1.25rem;
  background-color: var(--red);

  padding: 0.25rem;

  position: absolute;
  right: 0.5rem;
  top: 0.5rem;

  cursor: pointer;

  transition: all 0.2s ease-in-out;
}
.close-btn:hover {
  filter: brightness(90%);
}
</style>
