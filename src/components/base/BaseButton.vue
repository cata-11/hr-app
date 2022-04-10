<template>
  <button :class="[color, size]">
    <slot> </slot>
  </button>
</template>

<script>
export default {
  props: ['color', 'size']
};
</script>

<style scoped>
button {
  padding: 0.5rem 1rem;
  font-size: var(--font-size);
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}
button:hover {
  filter: brightness(90%);
}
.small {
  padding: 0.25rem 1.5rem;
}
.red {
  background-color: var(--red);
  color: var(--black);
}
.yellow {
  background-color: var(--yellow);
  color: var(--black);
}

@media only screen and (max-width: 512px) {
  button {
    padding: 0.25rem 0.5rem;
    font-size: calc(var(--font-size) - 0.15rem);
  }
}
</style>
