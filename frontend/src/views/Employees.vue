<template>
  <section>
    <EmployeeForm @employeeCreated="addEmployee($event)" mode="create" />
  </section>
  <section>
    <ListItems
      :items="items"
      :fields="fields"
      @itemDeleted="deleteItem($event)"
      @itemEdited="editItem($event)"
    />
  </section>
  <Teleport to="#app">
    <section class="edit-form-container" v-if="isEditMode">
      <EmployeeForm
        class="edit-form"
        mode="edit"
        :employeeData="employeeToEdit"
        :employeeIdx="employeeToEditIdx"
        @employeeEdited="changeEmployee($event)"
        @modalClosed="closeModal"
      />
    </section>
  </Teleport>
</template>

<script>
import EmployeeForm from '../components/forms/EmployeeForm.vue';
import ListItems from '../components/items/ListItems.vue';
export default {
  components: {
    EmployeeForm,
    ListItems
  },
  data() {
    return {
      isEditMode: false,
      employeeToEdit: {},
      employeeToEditIdx: null,
      fields: [
        'Name',
        'Surname',
        'Birthdate',
        'Email',
        'Role',
        'Team',
        'Manager'
      ],
      items: [
        {
          name: 'employee1',
          surname: 'surname1',
          birthDate: '25-Apr-2000',
          email: 'employee@mail.com',
          role: 'role 2',
          team: 'team 3',
          manager: 'manager1'
        },
        {
          name: 'employee2',
          surname: 'surname2',
          birthDate: '22-Apr-2000',
          email: 'employee2@mail.com',
          role: 'role 2',
          team: 'team 1',
          manager: 'manager2'
        },
        {
          name: 'employee3',
          surname: 'surname3',
          birthDate: '22-Oct-2000',
          email: 'employee3@mail.com',
          role: 'role 2',
          team: 'team 1',
          manager: 'manager2'
        }
      ]
    };
  },
  methods: {
    addEmployee(item) {
      this.items.unshift(item);
    },
    changeEmployee(item) {
      if (item.isChanged) {
        this.items[item.idx] = { ...item.data };
      } else {
        //
      }
      this.isEditMode = false;
    },
    deleteItem(idx) {
      this.items.splice(idx, 1);
    },
    editItem(idx) {
      this.isEditMode = true;
      this.employeeToEdit = { ...this.items[idx] };
      this.employeeToEditIdx = idx;
      idx;
    },
    closeModal() {
      this.isEditMode = false;
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

@media only screen and (max-width: 768px) {
  :deep(.data-value) {
    width: 100%;
  }
}
</style>
