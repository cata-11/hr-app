<template>
  <base-form @submit.prevent="createRole">
    <template #header>Create a new role</template>
    <template #body>
      <div>
        <input type="text" placeholder="Name" />
      </div>
    </template>
  </base-form>
</template>

<script>
import BaseForm from '../components/base/BaseForm.vue';
export default {
  components: {
    BaseForm
  },
  methods: {
    createRole() {
      console.log('create role');
    }
  }
};
</script>
