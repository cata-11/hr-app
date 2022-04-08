<template>
  <section>
    <base-form @submit.prevent="createEmployee">
      <template #header>Create a new employee</template>
      <template #body>
        <div>
          <input type="text" placeholder="Name" v-model="employee.name" />
          <select v-model="employee.role">
            <option disabled selected value="">Role</option>
            <option value="role 1">role 1</option>
            <option value="role 2">role 2</option>
          </select>
        </div>
        <div>
          <input type="text" placeholder="Surname" v-model="employee.surname" />
          <select v-model="employee.team">
            <option disabled selected value="">Team</option>
            <option value="team 1">team 1</option>
            <option value="team 2">team 2</option>
            <option value="team 3">team 3</option>
          </select>
        </div>
        <div>
          <input
            type="date"
            placeholder="Birth date"
            v-model="employee.birthDate"
          />
          <input
            type="text"
            placeholder="Manager"
            readonly
            v-model="employee.manager"
          />
        </div>
        <div>
          <input type="email" placeholder="Email" v-model="employee.email" />
        </div>
      </template>
    </base-form>
  </section>
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
      employee: {
        name: '',
        surname: '',
        birthDate: '',
        email: '',
        role: '',
        team: '',
        manager: ''
      },
      fields: [
        'Name',
        'Surname',
        'Birth date',
        'Email',
        'Role',
        'Team',
        'Manager'
      ],
      items: [
        {
          field1: '1',
          field2: 'data',
          field3: 'data',
          field4: 'data',
          field5: 'data',
          field6: 'data',
          field7: 'data'
        },
        {
          field1: '2',
          field2: 'data',
          field3: 'data',
          field4: 'data',
          field5: 'data',
          field6: 'data',
          field7: 'data'
        },
        {
          field1: '3',
          field2: 'data',
          field3: 'data',
          field4: 'data',
          field5: 'data',
          field6: 'data',
          field7: 'data'
        },
        {
          field1: '4',
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

      this.items.unshift({
        ...this.employee
      });
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
  width: calc((80% / 7));
}
:deep(.data-field) {
  width: calc((80% / 7));
}
</style>
