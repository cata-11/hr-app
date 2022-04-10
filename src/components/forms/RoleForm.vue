<template>
  <base-form
    @submit.prevent="handleSubmit"
    @modalClosed="closeModal"
    :mode="mode"
  >
    <template #header v-if="mode === 'create'">Create a new role</template>
    <template #header v-else>Edit role data</template>
    <template #body>
      <div>
        <input
          type="text"
          placeholder="Role"
          v-model="role.name"
          :class="{ invalid: !!error.name }"
          @input="isNameValid"
        />
        <p class="error">{{ error.name }}</p>
      </div>
    </template>
  </base-form>
</template>

<script>
import BaseForm from '../base/BaseForm.vue';
import { getDate } from '../../assets/base.js';
export default {
  props: ['mode', 'roleData', 'roleIdx'],
  emits: ['role-created', 'role-edited', 'modal-closed'],
  components: {
    BaseForm
  },
  data() {
    return {
      role: { name: '', date: '' },
      error: { name: '' }
    };
  },
  methods: {
    isNameValid() {
      this.error.name = '';
      if (this.role.name === '') {
        this.error.name = "Can't be empty";
        return false;
      }
      return true;
    },
    isFormValid() {
      const role_err = !this.isNameValid();
      if (role_err) {
        return false;
      }
      return true;
    },
    createRole() {
      this.role.date = getDate();
      this.$emit('role-created', { ...this.role });

      for (const key in this.role) {
        this.role[key] = '';
      }
    },
    editRole() {
      const initialData = { ...this.roleData };
      const editedData = { ...this.role };

      let isChanged = false;

      for (const key in initialData) {
        if (initialData[key] !== editedData[key]) {
          isChanged = true;
          break;
        }
      }

      if (isChanged) {
        editedData.date = getDate();
      } else if (!isChanged) {
        //
      }

      this.$emit('role-edited', {
        isChanged: isChanged,
        idx: this.roleIdx,
        data: editedData
      });
    },
    handleSubmit() {
      if (!this.isFormValid()) {
        return;
      }
      if (this.mode === 'create') this.createRole();
      else if (this.mode === 'edit') this.editRole();
    },
    closeModal() {
      this.$emit('modal-closed');
    }
  },
  mounted() {
    if (this.mode === 'edit') {
      this.role = { ...this.roleData };
    }
  }
};
</script>
