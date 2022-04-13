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
      items: [],
      fields: [
        'Name',
        'Surname',
        'Birthdate',
        'Email',
        'Role',
        'Team',
        'Manager'
      ]
    };
  },
  methods: {
    addEmployee(item) {
      fetch('http://localhost:8000/employee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: item.name,
          surname: item.surname,
          birthdate: item.birthdate,
          email: item.email,
          role: item.role,
          team: item.team,
          manager: 'auto_assigned_by_team'
        })
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          const data = res.employee;
          const item = {
            _id: data._id,
            name: data.name,
            surname: data.surname,
            birthdate: data.birthdate,
            email: data.email,
            role: data.role,
            team: data.team,
            manager: data.manager
          };
          this.items.unshift(item);
        })
        .catch((err) => {
          console.log(err);
        });
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
      console.log(this.items[idx]);
      this.items.splice(idx, 1);
    },
    editItem(idx) {
      this.isEditMode = true;
      this.employeeToEdit = { ...this.items[idx] };
      this.employeeToEditIdx = idx;
    },
    closeModal() {
      this.isEditMode = false;
    },
    fetchItems() {
      console.log('fetching...');
      fetch('http://localhost:8000/employees', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.items = [...res.employees];
          // this.formatItems();
        })
        .catch((err) => console.log(err));
    }
  },
  mounted() {
    this.fetchItems();
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
