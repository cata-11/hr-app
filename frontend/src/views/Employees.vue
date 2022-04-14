<template>
  <section>
    <EmployeeForm @employeeCreated="addEmployee($event)" mode="create" />
  </section>
  <section class="list-container">
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
      isLoading: false,
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
      this.$store.dispatch('loader/toggle', { type: 'add' });
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
          this.$store.dispatch('loader/toggle');
          this.items.unshift(item);
        })
        .catch(() => {
          this.$store.dispatch('loader/toggle');
          this.$store.dispatch('dialog/open', {
            type: 'error',
            message: 'Failed to create employee. Try again later.'
          });
        });
    },
    changeEmployee(item) {
      if (!item.isChanged) {
        this.isEditMode = false;
        return;
      }

      const data = item.data;
      const id = data._id;

      this.$store.dispatch('loader/toggle', { type: 'edit' });

      fetch('http://localhost:8000/employee/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          surname: data.surname,
          email: data.email,
          role: data.role,
          team: data.team
        })
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.$store.dispatch('loader/toggle');
          this.isEditMode = false;
          this.items[item.idx] = { ...res.employee };
        })
        .catch(() => {
          this.isEditMode = false;
          this.$store.dispatch('dialog/open', {
            type: 'error',
            message: 'Failed to edit employee. Try again later.'
          });
        });
    },
    deleteItem(idx) {
      const id = this.items[idx]._id;
      this.$store.dispatch('loader/toggle', { type: 'delete' });
      fetch('http://localhost:8000/employee/' + id, {
        method: 'DELETE'
      })
        .then((res) => {
          return res.json();
        })
        .then(() => {
          this.items.splice(idx, 1);
          this.$store.dispatch('loader/toggle');
        })
        .catch(() => {
          this.$store.dispatch('dialog/open', {
            type: 'error',
            message: 'Failed to delete employee. Try again later.'
          });
        });
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
      this.$store.dispatch('loader/toggle', { type: 'fetch' });
      fetch('http://localhost:8000/employees', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.items = [...res.employees].reverse();
          this.$store.dispatch('loader/toggle');
        })
        .catch(() => {
          this.$store.dispatch('loader/toggle');
          this.$store.dispatch('dialog/open', {
            type: 'error',
            message: 'Failed to fetch employees. Try again later.'
          });
        });
    }
  },
  mounted() {
    this.fetchItems();
  }
};
</script>

<style scoped>
.list-container {
  position: relative;
}
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
