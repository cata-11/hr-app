<template>
  <TheHeader />
  <main>
    <router-view />
  </main>
  <!-- <TheFooter /> -->
  <TheDialog />
</template>

<script>
import TheHeader from './components/layout/TheHeader';
// import TheFooter from './components/layout/TheFooter';

export default {
  components: {
    TheHeader
    // TheFooter
  }
};
</script>

<style>
@import url('./assets/base.css');

main {
  max-width: 80rem;
  margin: 1rem auto;
}
</style>
