<template>
  <section :class="type">
    <div class="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    type() {
      return this.$store.getters['loader/type'];
    }
  }
};
</script>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 100;
}
.delete,
.add,
.edit {
  background-color: rgba(19, 19, 19, 0.3);
  position: absolute;
  top: 0;
  left: 0;
}
.lds-facebook {
  margin: 2rem auto;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: var(--yellow);
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}
</style>
