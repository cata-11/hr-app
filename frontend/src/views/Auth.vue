<template>
  <base-auth
    @signedUp="signUp($event)"
    @loggedIn="logIn($event)"
    :key="forceRender"
  >
    <TheLoader v-if="isLoading && type === 'auth'" />
  </base-auth>
</template>

<script>
import BaseAuth from '../components/base/BaseAuth.vue';
export default {
  data() {
    return {
      forceRender: 0
    };
  },
  components: {
    BaseAuth
  },
  computed: {
    isLoading() {
      return this.$store.getters['loader/isLoading'];
    },
    type() {
      return this.$store.getters['loader/type'];
    }
  },
  methods: {
    signUp(user) {
      this.$store.dispatch('loader/toggle', { type: 'auth' });

      fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          secretPhrase: user.secretPhrase
        })
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.$store.dispatch('loader/toggle');
          if (res.statusCode === 409) {
            const err = new Error(res.message);
            err.statusCode = res.statusCode;
            throw err;
          }
          this.forceRender++;
          this.$store.dispatch('dialog/open', {
            type: 'success',
            message: res.msg
          });
        })
        .catch((err) => {
          this.$store.dispatch('loader/toggle');
          let msg = 'Failed to signup user. Try again later.';
          if (err.statusCode === 409) {
            msg = err.message;
          }
          this.$store.dispatch('dialog/open', {
            type: 'error',
            message: msg
          });
        });
    },
    logIn(user) {
      this.$store.dispatch('loader/toggle', { type: 'auth' });

      fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          password: user.password
        })
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.statusCode === 404) {
            const err = new Error(res.message);
            err.statusCode = res.statusCode;
            throw err;
          }
          this.$store.dispatch('loader/toggle');
          this.$store.dispatch('user/login', {
            email: res.email,
            token: res.token,
            status: res.status
          });

          this.$router.push('/');
        })
        .catch((err) => {
          this.$store.dispatch('loader/toggle');
          let msg = 'Failed to login user. Try again later.';
          if (err.statusCode === 404) {
            msg = err.message;
          }
          this.$store.dispatch('dialog/open', {
            type: 'error',
            message: msg
          });
        });
    }
  }
};
</script>
