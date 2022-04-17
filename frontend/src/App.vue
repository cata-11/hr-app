<template>
  <TheHeader />
  <main>
    <router-view />
  </main>
  <TheDialog />
</template>

<script>
import TheHeader from './components/layout/TheHeader';

export default {
  components: {
    TheHeader
  },
  mounted() {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    const status = localStorage.getItem('status');

    if (!email || !token || !status) {
      this.$store.dispatch('user/logout');
    } else {
      this.$store.dispatch('user/login', {
        email: email,
        token: token,
        status: status
      });
    }
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
