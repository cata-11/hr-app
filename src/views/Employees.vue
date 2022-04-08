<template>
  <section>
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
  </section>
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
          field2: 'data',
          field3: 'data',
          field4: 'data',
          field5: 'data',
          field6: 'data',
          field7: 'data'
        },
        {
          field1: 'data',
          field2: 'data',
          field3: 'data',
          field4: 'data',
          field5: 'data',
          field6: 'data',
          field7: 'data'
        },
        {
          field1: 'data',
          field2: 'data',
          field3: 'data',
          field4: 'data',
          field5: 'data',
          field6: 'data',
          field7: 'data'
        },
        {
          field1: 'data',
          field2: 'data',
          field3: 'data',
          field4: 'data',
          field5: 'data',
          field6: 'data',
          field7: 'data'
        }
      ]
    };
  },
  methods: {
    createEmployee() {
      console.log('create employee');
    }
  }
};
</script>
