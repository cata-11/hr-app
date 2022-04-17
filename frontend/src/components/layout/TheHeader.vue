<template>
  <nav>
    <ul>
      <li>
        <router-link to="/employees">employees</router-link>
      </li>
      <li>
        <router-link to="/teams">teams</router-link>
      </li>
      <li>
        <router-link to="/roles">roles</router-link>
      </li>
      <li v-if="!isAuth" class="auth-link-mobile">
        <router-link to="/auth"> login </router-link>
      </li>
      <li v-if="isAuth" class="auth-link-mobile" @click="logOut">
        <div class="logout">logout</div>
      </li>
    </ul>

    <router-link v-if="!isAuth" to="/auth" class="auth-link-desktop"
      >login</router-link
    >
    <div v-if="isAuth" @click="logOut" class="logout-desktop">logout</div>
  </nav>
</template>

<script>
// import BaseButton from '../base/BaseButton.vue';
export default {
  components: {
    // BaseButton
  },
  computed: {
    isAuth() {
      console.log(this.$store.getters['user/isAuth']);
      return this.$store.getters['user/isAuth'];
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('user/logout');
      this.$store.dispatch('dialog/open', {
        type: 'success',
        message: 'You are logged out.'
      });
    }
  }
};
</script>

<style scoped>
nav {
  background-color: var(--blue);
  color: var(--white);
  max-width: 80rem;
  margin: 1rem auto;
  margin-bottom: 0;
  display: flex;
  justify-content: space-between;
}

.auth-link-desktop,
.logout-desktop {
  padding: 0 2rem;
}
.auth-link-mobile {
  display: none;
}

ul {
  width: 25rem;
  display: flex;
  justify-content: space-around;
}

a,
.logout,
.logout-desktop {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 3rem;
  text-transform: capitalize;
  transition: all 0.2s ease-in-out;
}

li {
  width: 100%;
}

.router-link-active,
a:hover,
.logout:hover,
.logout-desktop:hover {
  background-color: var(--yellow);
  color: var(--black);
}

@media only screen and (max-width: 1280px) {
  nav {
    margin-top: 0;
  }
  ul {
    width: 100%;
  }
  .auth-link-desktop {
    display: none;
  }
  .auth-link-mobile {
    display: block;
  }
}

@media only screen and (max-width: 440px) {
  li {
    font-size: 0.8rem;
  }
}
</style>
