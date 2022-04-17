<template>
  <section>
    <TeamForm @teamCreated="addTeam($event)" mode="create" />
  </section>

  <ListItems
    :items="items"
    :fields="fields"
    @itemDeleted="deleteItem($event)"
    @itemEdited="editItem($event)"
  />

  <Teleport to="#app">
    <section class="edit-form-container" v-if="isEditMode">
      <TeamForm
        class="edit-form"
        mode="edit"
        :teamData="teamToEdit"
        :teamIdx="teamToEditIdx"
        @teamEdited="changeTeam($event)"
        @modalClosed="closeModal"
      />
    </section>
  </Teleport>

  <ThePagination
    v-if="items.length"
    @pageChanged="fetchTeams($event)"
    :totalPages="totalPages"
  />
</template>

<script>
import ThePagination from '../components/layout/ThePagination.vue';

import TeamForm from '../components/forms/TeamForm.vue';
import ListItems from '../components/items/ListItems.vue';

import { getDate, getMax } from '../assets/base.js';

export default {
  components: {
    ListItems,
    TeamForm,
    ThePagination
  },
  data() {
    return {
      totalPages: 0,
      isEditMode: false,
      teamToEdit: {},
      teamToEditIdx: null,
      fields: ['Name', 'Manager', 'Date'],
      items: []
    };
  },
  methods: {
    addTeam(item) {
      this.$store.dispatch('loader/toggle', { type: 'add' });
      fetch('http://localhost:8000/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$store.getters['user/token']
        },
        body: JSON.stringify({
          name: item.name,
          manager: item.manager
        })
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res.statusCode === 409) {
            const err = new Error('Team with such name already exists !');
            err.statusCode = 409;
            throw err;
          }
          const data = res.team;
          const item = {
            id: data._id,
            name: data.name,
            manager: data.manager,
            date: getDate(getMax(data.createdAt, data.updatedAt))
          };
          this.$store.dispatch('loader/toggle');
          this.items.unshift(item);
        })
        .catch((err) => {
          this.$store.dispatch('loader/toggle');
          let msg = 'Failed to add team. Try again later.';
          if (err.statusCode === 409) {
            msg = err.message;
          }
          this.$store.dispatch('dialog/open', {
            type: 'error',
            message: msg
          });
        });
    },
    changeTeam(item) {
      if (!item.isChanged) {
        this.isEditMode = false;
        return;
      }

      const data = item.data;
      const id = data.id;

      this.$store.dispatch('loader/toggle', { type: 'edit' });

      fetch('http://localhost:8000/team/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$store.getters['user/token']
        },
        body: JSON.stringify({
          name: data.name,
          manager: data.manager
        })
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res.statusCode === 409) {
            const err = new Error('Team with such name already exists !');
            err.statusCode = 409;
            throw err;
          }

          this.$store.dispatch('loader/toggle');
          this.isEditMode = false;

          this.items[item.idx] = {
            id: res.team._id,
            name: res.team.name,
            manager: res.team.manager,
            date: getDate(getMax(res.team.createdAt, res.team.updatedAt))
          };
        })
        .catch((err) => {
          this.$store.dispatch('loader/toggle');
          let msg = 'Failed to edit team. Try again later.';
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
      fetch('http://localhost:8000/team/' + id, {
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

          let msg = 'Failed to delete team. Try again later.';
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
      this.teamToEdit = { ...this.items[idx] };
      this.teamToEditIdx = idx;
      this.isEditMode = true;
    },
    closeModal() {
      this.isEditMode = false;
    },
    fetchTeams(pageNr = 1) {
      this.$store.dispatch('loader/toggle', { type: 'fetch' });
      fetch('http://localhost:8000/teams?page=' + pageNr, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.totalPages = res.totalPages;

          const fetchedItems = [...res.teams];
          const temp = [];

          for (const item of fetchedItems) {
            temp.push({
              id: item._id,
              name: item.name,
              manager: item.manager,
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
            message: 'Failed to fetch teams. Try again later.'
          });
        });
    }
  },
  mounted() {
    this.fetchTeams();
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

@media only screen and (max-width: 768px) {
  :deep(.data-value) {
    width: 100%;
  }
}
</style>
