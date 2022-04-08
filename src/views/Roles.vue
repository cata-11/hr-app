<template>
  <base-form @submit.prevent="createRole">
    <template #header>Create a new role</template>
    <template #body>
      <div>
        <input type="text" placeholder="Name" />
      </div>
    </template>
  </base-form>

  <section>
    <ListItems :items="items"> </ListItems>
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
    createRole() {
      console.log('create role');
    }
  }
};
</script>
