<template>
  <base-form @submit.prevent="createEmployee">
    <template #header>Create a new employee</template>
    <template #body>
      <div>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Role" />
      </div>
      <div>
        <input type="text" placeholder="Surname" />
        <input type="text" placeholder="Team" />
      </div>
      <div>
        <input type="text" placeholder="Birth date" />
        <input type="text" placeholder="Manager" />
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
    createEmployee() {
      console.log('create employee');
    }
  }
};
</script>
