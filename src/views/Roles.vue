<template>
  <base-form @submit.prevent="createRole">
    <template #header>Create a new role</template>
    <template #body>
      <div>
        <input
          type="text"
          placeholder="Name"
          v-model="role.name"
          :class="{ invalid: !!error.name }"
          @input="isNameValid"
        />
        <p class="error">{{ error.name }}</p>
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
      role: { name: '' },
      error: { name: '' },
      fields: ['Name', 'Date'],
      items: [
        {
          field1: 'data',
          field2: 'data'
        },
        {
          field1: 'data',
          field2: 'data'
        },
        {
          field1: 'data',
          field2: 'data'
        },
        {
          field1: 'data',
          field2: 'data'
        }
      ]
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
    getDate() {
      const today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();

      if (day < 10) day = '0' + day;
      if (month < 10) month = '0' + month;

      return day + '.' + month + '.' + year;
    },
    createRole() {
      if (!this.isNameValid()) {
        return;
      }
      console.log('create role');
      this.role.date = this.getDate();
      this.items.unshift({ ...this.role });
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
  width: calc((80% / 2));
}
:deep(.data-field) {
  width: calc((80% / 2));
}
</style>
