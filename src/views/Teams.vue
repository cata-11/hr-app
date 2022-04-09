<template>
  <base-form @submit.prevent="createTeam">
    <template #header>Create a new team</template>
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
  <section>
    <ListItems
      :items="items"
      :fields="fields"
      @itemDeleted="deleteItem($event)"
      @itemEdited="editItem($event)"
    />
  </section>
</template>

<script>
import BaseForm from '../components/base/BaseForm.vue';
import ListItems from '../components/list/ListItems.vue';
export default {
  components: {
    BaseForm,
    ListItems
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
      },
      fields: ['Name', 'Manager', 'Date'],
      items: [
        {
          field1: 'data',
          field2: 'data',
          field3: 'data'
        },
        {
          field1: 'data',
          field2: 'data',
          field3: 'data'
        },
        {
          field1: 'data',
          field2: 'data',
          field3: 'data'
        },
        {
          field1: 'data',
          field2: 'data',
          field3: 'data'
        }
      ]
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
    getDate() {
      const today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();

      if (day < 10) day = '0' + day;
      if (month < 10) month = '0' + month;

      return day + '.' + month + '.' + year;
    },
    createTeam() {
      if (!this.isFormValid()) {
        return;
      }

      this.team.date = this.getDate();
      this.items.unshift({ ...this.team });

      console.log('create team');
    },
    editItem(idx) {
      console.log(idx);
    },
    deleteItem(idx) {
      this.items.splice(idx, 1);
    }
  }
};
</script>

<style scoped>
:deep(.data-value) {
  width: calc((80% / 3));
}
:deep(.data-field) {
  width: calc((80% / 3));
}
</style>
