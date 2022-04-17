<template>
  <section>
    <RoleForm @roleCreated="addRole($event)" mode="create" />
  </section>

  <ListItems
    :items="items"
    :fields="fields"
    @itemDeleted="deleteItem($event)"
    @itemEdited="editItem($event)"
  />

  <Teleport to="#app">
    <section class="edit-form-container" v-if="isEditMode">
      <RoleForm
        class="edit-form"
        mode="edit"
        :roleData="roleToEdit"
        :roleIdx="roleToEditIdx"
        @roleEdited="changeRole($event)"
        @modalClosed="closeModal"
      />
    </section>
  </Teleport>

  <ThePagination
    v-if="items.length"
    @pageChanged="fetchRoles($event)"
    :totalPages="totalPages"
  />
</template>

<script>
import ThePagination from '../components/layout/ThePagination.vue';

import RoleForm from '../components/forms/RoleForm.vue';
import ListItems from '../components/items/ListItems.vue';

import { getDate, getMax } from '../assets/base.js';

export default {
  components: {
    RoleForm,
    ListItems,
    ThePagination
  },
  data() {
    return {
      totalPages: 0,
      isEditMode: false,
      roleToEdit: {},
      roleToEditIdx: null,
      fields: ['Name', 'Date'],
      items: []
    };
  },
  methods: {
    addRole(item) {
      this.$store.dispatch('loader/toggle', { type: 'add' });
      fetch('http://localhost:8000/role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$store.getters['user/token']
        },
        body: JSON.stringify({
          name: item.name
        })
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.statusCode === 409) {
            const err = new Error('This role already exists !');
            err.statusCode = 409;
            throw err;
          }
          const data = res.role;
          const item = {
            id: data._id,
            name: data.name,
            date: getDate(getMax(data.createdAt, data.updatedAt))
          };
          this.$store.dispatch('loader/toggle');
          this.items.unshift(item);
        })
        .catch((err) => {
          this.$store.dispatch('loader/toggle');
          let msg = 'Failed to add role. Try again later.';
          if (err.statusCode === 409) {
            msg = err.message;
          }
          this.$store.dispatch('dialog/open', {
            type: 'error',
            message: msg
          });
        });
    },
    changeRole(item) {
      if (!item.isChanged) {
        this.isEditMode = false;
        return;
      }

      const data = item.data;
      const id = data.id;

      this.$store.dispatch('loader/toggle', { type: 'edit' });

      fetch('http://localhost:8000/role/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$store.getters['user/token']
        },
        body: JSON.stringify({
          name: data.name
        })
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.statusCode === 409) {
            const err = new Error('This role already exists !');
            err.statusCode = 409;
            throw err;
          }

          this.$store.dispatch('loader/toggle');
          this.isEditMode = false;

          this.items[item.idx] = {
            id: res.role._id,
            name: res.role.name,
            date: getDate(getMax(res.role.createdAt, res.role.updatedAt))
          };
        })
        .catch((err) => {
          this.$store.dispatch('loader/toggle');
          let msg = 'Failed to edit role. Try again later.';
          if (err.statusCode === 409) {
            msg = err.message;
          } else {
            this.isEditMode = false;
          }
          this.$store.dispatch('dialog/open', {
            type: 'error',
            message: msg
          });
        });
    },
    deleteItem(idx) {
      const id = this.items[idx].id;
      this.$store.dispatch('loader/toggle', { type: 'delete' });
      fetch('http://localhost:8000/role/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + this.$store.getters['user/token']
        }
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.statusCode === 405) {
            const err = new Error();
            err.statusCode = 405;
            err.msg = res.message;
            throw err;
          }

          this.items.splice(idx, 1);
          this.$store.dispatch('loader/toggle');
        })
        .catch((err) => {
          this.$store.dispatch('loader/toggle');

          let msg = 'Failed to delete role. Try again later.';
          if (err.statusCode === 405) {
            msg = err.msg;
          }

          this.$store.dispatch('dialog/open', {
            type: 'error',
            message: msg
          });
        });
    },
    editItem(idx) {
      this.roleToEdit = { ...this.items[idx] };
      this.roleToEditIdx = idx;
      this.isEditMode = true;
    },
    closeModal() {
      this.isEditMode = false;
    },
    fetchRoles(pageNr = 1) {
      this.$store.dispatch('loader/toggle', { type: 'fetch' });
      fetch('http://localhost:8000/roles?page=' + pageNr, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.totalPages = res.totalPages;

          const fetchedItems = [...res.roles];
          const temp = [];

          for (const item of fetchedItems) {
            temp.push({
              id: item._id,
              name: item.name,
              date: getDate(getMax(item.createdAt, item.updatedAt))
            });
          }

          this.items = [...temp];

          this.$store.dispatch('loader/toggle');
        })
        .catch(() => {
          this.$store.dispatch('loader/toggle');
          this.$store.dispatch('dialog/open', {
            type: 'error',
            message: 'Failed to fetch roles. Try again later.'
          });
        });
    }
  },
  mounted() {
    this.fetchRoles();
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

@media only screen and (max-width: 768px) {
  :deep(.data-value) {
    width: 100%;
  }
}
</style>
