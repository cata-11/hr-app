<template>
  <section style="position: relative">
    <TheLoader
      v-if="
        roles.length === 0 &&
        teams.length === 0 &&
        isLoading &&
        $store.getters['user/status'] === 'admin'
      "
      :fetchSome="true"
    />
    <EmployeeForm
      @employeeCreated="addEmployee($event)"
      mode="create"
      :roles="roles"
      :teams="teams"
    />
  </section>

  <ListItems
    :items="items"
    :fields="fields"
    @itemDeleted="deleteItem($event)"
    @itemEdited="editItem($event)"
  />

  <Teleport to="#app">
    <section class="edit-form-container" v-if="isEditMode">
      <EmployeeForm
        class="edit-form"
        mode="edit"
        :roles="roles"
        :teams="teams"
        :employeeData="employeeToEdit"
        :employeeIdx="employeeToEditIdx"
        @employeeEdited="changeEmployee($event)"
        @modalClosed="closeModal"
      />
    </section>
  </Teleport>

  <ThePagination
    v-if="items.length"
    @pageChanged="fetchEmployees($event)"
    :totalPages="totalPages"
  />
</template>

<script>
import EmployeeForm from '../components/forms/EmployeeForm.vue';
import ListItems from '../components/items/ListItems.vue';
import ThePagination from '../components/layout/ThePagination.vue';

import { getDate } from '../assets/base.js';

export default {
  components: {
    EmployeeForm,
    ListItems,
    ThePagination
  },
  data() {
    return {
      totalPages: 0,
      isEditMode: false,
      employeeToEdit: {},
      employeeToEditIdx: null,
      items: [],
      roles: [],
      teams: [],
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

  computed: {
    isLoading() {
      return this.$store.getters['loader/isLoading'];
    }
  },

  methods: {
    getTeam(name) {
      return this.teams.find((team) => team.name === name);
    },
    addEmployee(item) {
      this.$store.dispatch('loader/toggle', { type: 'add' });
      fetch('http://localhost:8000/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$store.getters['user/token']
        },
        body: JSON.stringify({
          name: item.name,
          surname: item.surname,
          birthdate: getDate(item.birthdate),
          email: item.email,
          role: item.role,
          team: {
            name: this.getTeam(item.team).name,
            manager: this.getTeam(item.team).manager
          }
        })
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          const data = res.employee;
          const item = {
            id: data._id,
            name: data.name,
            surname: data.surname,
            birthdate: data.birthdate,
            email: data.email,
            role: data.role,
            team: data.team.name,
            manager: data.team.manager
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
      const id = data.id;

      this.$store.dispatch('loader/toggle', { type: 'edit' });

      fetch('http://localhost:8000/employee/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$store.getters['user/token']
        },
        body: JSON.stringify({
          name: data.name,
          surname: data.surname,
          email: data.email,
          role: data.role,
          team: {
            name: this.getTeam(data.team).name,
            manager: this.getTeam(data.team).manager
          }
        })
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.$store.dispatch('loader/toggle');
          this.isEditMode = false;

          this.items[item.idx] = {
            id: res.employee._id,
            name: res.employee.name,
            surname: res.employee.surname,
            birthdate: res.employee.birthdate,
            email: res.employee.email,
            role: res.employee.role,
            team: res.employee.team.name,
            manager: res.employee.team.manager
          };
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
      const id = this.items[idx].id;
      this.$store.dispatch('loader/toggle', { type: 'delete' });
      fetch('http://localhost:8000/employee/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + this.$store.getters['user/token']
        }
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
    fetchEmployees(pageNr = 1) {
      this.$store.dispatch('loader/toggle', { type: 'fetch' });
      fetch('http://localhost:8000/employees?page=' + pageNr, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.totalPages = res.totalPages;

          const fetchedItems = [...res.employees];
          const temp = [];

          for (const item of fetchedItems) {
            temp.push({
              id: item._id,
              name: item.name,
              surname: item.surname,
              birthdate: getDate(item.birthdate),
              email: item.email,
              role: item.role,
              team: item.team.name,
              manager: item.team.manager
            });
          }
          this.items = [...temp];

          this.$store.dispatch('loader/toggle');
        })
        .catch(() => {
          this.$store.dispatch('loader/toggle');
          this.$store.dispatch('dialog/open', {
            type: 'error',
            message: 'Failed to fetch data. Try again later.'
          });
        });
    },
    fetchRoles() {
      fetch('http://localhost:8000/roles?all=true', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.roles = [];
          for (const item of res.roles) {
            this.roles.push(item.name);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchTeams() {
      fetch('http://localhost:8000/teams?all=true', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.teams = [];
          for (const item of res.teams) {
            this.teams.push({
              name: item.name,
              manager: item.manager
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.fetchEmployees();
    this.fetchTeams();
    this.fetchRoles();
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
