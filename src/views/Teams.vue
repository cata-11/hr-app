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
  <section>
    <ListItems
      :items="items"
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
    createTeam() {
      console.log('create team');
    },
    editItem(id) {
      console.log(id);
    },
    deleteItem(id) {
      console.log(id);
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
