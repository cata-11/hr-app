<template>
  <base-form
    @submit.prevent="handleSubmit"
    @modalClosed="closeModal"
    :mode="mode"
  >
    <template #header v-if="mode === 'create'">Create a new team</template>
    <template #header v-else>Edit team data</template>
    <template #body>
      <div>
        <input
          type="text"
          placeholder="Name"
          v-model="team.name"
          :class="{ invalid: !!error.name }"
          @input="isNameValid"
        />
        <p class="error">{{ error.name }}</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="Manager"
          v-model="team.manager"
          :class="{ invalid: !!error.manager }"
          @input="isManagerValid"
        />
        <p class="error">{{ error.manager }}</p>
      </div>
    </template>
  </base-form>
</template>

<script>
import { getDate } from '../../assets/base.js';
import BaseForm from '../base/BaseForm.vue';
export default {
  props: ['mode', 'teamData', 'teamIdx'],
  emits: ['team-created', 'team-edited', 'modal-closed'],

  components: {
    BaseForm
  },
  data() {
    return {
      team: {
        name: '',
        manager: ''
      },
      error: {
        name: '',
        manager: ''
      }
    };
  },
  methods: {
    isNameValid() {
      this.error.name = '';
      if (this.team.name === '') {
        this.error.name = "Can't be empty";
        return false;
      }
      return true;
    },
    isManagerValid() {
      this.error.manager = '';
      if (this.team.manager === '') {
        this.error.manager = "Can't be empty";
        return false;
      }
      return true;
    },
    isFormValid() {
      const name_err = !this.isNameValid();
      const manager_err = !this.isManagerValid();
      if (name_err || manager_err) {
        console.log('invalid');
        return false;
      }
      return true;
    },
    createTeam() {
      this.team.date = getDate();
      this.$emit('team-created', { ...this.team });

      for (const key in this.team) {
        this.tesm[key] = '';
      }
    },
    editTeam() {
      const initialData = { ...this.teamData };
      const editedData = { ...this.team };

      let isChanged = false;

      for (const key in initialData) {
        if (initialData[key] !== editedData[key]) {
          isChanged = true;
          break;
        }
      }
      if (isChanged) {
        editedData.date = getDate();
        console.log('changed to: ', editedData);
      } else if (!isChanged) {
        console.log('not changed');
      }

      this.$emit('team-edited', {
        isChanged: isChanged,
        idx: this.teamIdx,
        data: editedData
      });
    },
    handleSubmit() {
      if (!this.isFormValid()) {
        return;
      }
      if (this.mode === 'create') this.createTeam();
      else if (this.mode === 'edit') this.editTeam();
    },
    closeModal() {
      this.$emit('modal-closed');
    }
  },
  mounted() {
    if (this.mode === 'edit') {
      console.log('editing..');
      this.team = { ...this.teamData };
    }
  }
};
</script>
