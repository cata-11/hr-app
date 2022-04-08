<template>
  <base-form @submit.prevent="createTeam">
    <template #header>Create a new team</template>
    <template #body>
      <div>
        <input type="text" placeholder="Name" />
      </div>
      <div>
        <input type="text" placeholder="Role" />
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
    createTeam() {
      console.log('create team');
    }
  }
};
</script>
