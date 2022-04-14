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
</template>

<script>
import TeamForm from '../components/forms/TeamForm.vue';
import ListItems from '../components/items/ListItems.vue';

import { getDate } from '../assets/base.js';

export default {
  components: {
    ListItems,
    TeamForm
  },
  data() {
    return {
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: item.name,
          manager: item.manager
        })
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          const data = res.team;
          const item = {
            id: data._id,
            name: data.name,
            manager: data.manager,
            date: getDate(data.createdAt)
          };
          this.$store.dispatch('loader/toggle');
          this.items.unshift(item);
        })
        .catch(() => {
          this.$store.dispatch('loader/toggle');
          this.$store.dispatch('dialog/open', {
            type: 'error',
            message: 'Failed to create team. Try again later.'
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          manager: data.manager
        })
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.$store.dispatch('loader/toggle');
          this.isEditMode = false;

          this.items[item.idx] = {
            id: res.team._id,
            name: res.team.name,
            manager: res.team.manager,
            date: getDate(res.team.updatedAt)
          };
        })
        .catch(() => {
          this.isEditMode = false;
          this.$store.dispatch('loader/toggle');
          this.$store.dispatch('dialog/open', {
            type: 'error',
            message: 'Failed to edit employee. Try again later.'
          });
        });
    },
    deleteItem(idx) {
      const id = this.items[idx].id;
      this.$store.dispatch('loader/toggle', { type: 'delete' });
      fetch('http://localhost:8000/team/' + id, {
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
            message: 'Failed to delete team. Try again later.'
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
    fetchTeams() {
      this.$store.dispatch('loader/toggle', { type: 'fetch' });
      fetch('http://localhost:8000/teams', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          const fetchedItems = [...res.teams];
          const temp = [];

          for (const item of fetchedItems) {
            temp.unshift({
              id: item._id,
              name: item.name,
              manager: item.manager,
              date: getDate(item.createdAt)
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
