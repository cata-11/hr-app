<template>
  <Transition name="fade" mode="out-in">
    <form class="auth-container" :key="type">
      <h1 class="type">{{ type.toUpperCase() }}</h1>
      <div class="input-container">
        <label for="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          :class="{ error: !!error.email }"
          v-model="user.email"
        />
        <p :class="['error', !error.email ? 'hide' : '']">{{ error.email }}</p>
      </div>
      <div class="input-container">
        <label for="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          :class="{ error: !!error.password }"
          v-model="user.password"
        />
        <p :class="['error', !error.password ? 'hide' : '']">
          {{ error.password }}
        </p>
      </div>
      <div class="input-container" v-if="type === 'signup'">
        <label for="repeat-password">Repeat password</label>
        <input
          type="password"
          placeholder="Repeat password"
          :class="{ error: !!error.repeatPassword }"
          v-model="user.repeatPassword"
        />
        <p :class="['error', !error.repeatPassword ? 'hide' : '']">
          {{ error.repeatPassword }}
        </p>
      </div>
      <div class="input-container" v-if="type === 'signup'">
        <label for="secret-phrase">Secret phrase</label>
        <input
          type="text"
          placeholder="Secret phrase"
          v-model="user.secretPhrase"
        />
        <p>To signup an admin account you should enter the secret phrase.</p>
      </div>
      <base-button
        color="yellow"
        size="normal"
        class="btn"
        v-if="type === 'login'"
        @click.prevent="logIn"
        >Login</base-button
      >
      <base-button
        color="yellow"
        size="normal"
        class="btn"
        v-if="type === 'signup'"
        @click.prevent="signUp"
        >SignUp</base-button
      >
      <div class="change-type" v-if="type === 'signup'">
        <p>
          Already have an account ?
          <span @click="changeType('login')">Login</span>
        </p>
      </div>
      <div class="change-type" v-if="type === 'login'">
        <p>
          Don't have an account ?
          <span @click="changeType('signup')">SignUp</span>
        </p>
      </div>
      <slot></slot>
    </form>
  </Transition>
</template>

<script>
import BaseButton from './BaseButton.vue';
export default {
  emits: ['signed-up', 'logged-in'],
  data() {
    return {
      type: 'login',
      error: {
        email: '',
        password: '',
        repeatPassword: ''
      },
      user: {
        email: '',
        password: '',
        repeatPassword: '',
        secretPhrase: ''
      }
    };
  },
  components: {
    BaseButton
  },
  methods: {
    changeType(type) {
      this.resetInputs();
      this.resetErrors();
      this.type = type;
    },

    isFormValid() {
      this.resetErrors();
      if (
        this.user.email === '' ||
        this.user.email === undefined ||
        this.user.email === null
      ) {
        this.error.email = "Can't be empty";
        return false;
      }
      if (
        this.user.password === '' ||
        this.user.password === undefined ||
        this.user.password === null
      ) {
        this.error.password = "Can't be empty";
        return false;
      }
      if (this.type === 'signup') {
        if (
          this.user.repeatPassword === '' ||
          this.user.repeatPassword === undefined ||
          this.user.repeatPassword === null
        ) {
          this.error.repeatPassword = "Can't be empty";
          return false;
        }
        if (this.user.repeatPassword !== this.user.password) {
          this.error.repeatPassword = "Passwords don't match";
          return false;
        }
      }
      return true;
    },
    resetErrors() {
      for (const key in this.error) {
        this.error[key] = '';
      }
    },
    resetInputs() {
      for (const key in this.user) {
        this.user[key] = '';
      }
    },
    logIn() {
      if (!this.isFormValid()) {
        return;
      }
      this.$emit('logged-in', {
        email: this.user.email,
        password: this.user.password
      });
    },
    signUp() {
      if (!this.isFormValid()) {
        return;
      }
      this.$emit('signed-up', {
        email: this.user.email,
        password: this.user.password,
        secretPhrase: this.user.secretPhrase
      });
    }
  }
};
</script>

<style scoped>
.auth-container {
  max-width: 20rem;
  padding: 1rem;
  background-color: var(--grey);
  margin: 1rem auto;
  box-sizing: border-box;
  position: relative;
}
.type {
  background-color: var(--blue);
  padding: 1rem;
  margin: 0 auto;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: var(--white);
  text-align: center;
}

.input-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
}

.input-container input {
  margin: 0.25rem 0;
  width: 100%;
  font-size: 1.25rem;
  padding: 0.25rem;
}
.input-container label {
  font-size: 1.25rem;
}

.btn {
  margin: 0 auto;
  font-size: 1.25rem;
  padding: 0.5rem 1rem;
}
.change-type {
  margin: 0 auto;
  margin-top: 1rem;
  width: fit-content;
}
.change-type span {
  text-decoration: underline;
  cursor: pointer;
}

.error {
  font-size: 0.75rem;
  color: var(--red);
  border-color: var(--red);
}
.hide {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
