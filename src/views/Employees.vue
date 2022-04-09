<template>
  <section>
    <base-form @submit.prevent="createEmployee">
      <template #header>Create a new employee</template>
      <template #body>
        <div>
          <input
            type="text"
            placeholder="Name"
            v-model="employee.name"
            :class="{ invalid: !!error.name }"
            @input="isNameValid"
          />
          <p class="error">{{ error.name }}</p>

          <input
            type="date"
            placeholder="Birth date"
            v-model="employee.birthDate"
            :class="{ invalid: !!error.birthDate }"
            @input="isDateSelected"
          />
          <p class="error">{{ error.birthDate }}</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Surname"
            v-model="employee.surname"
            :class="{ invalid: !!error.surname }"
            @input="isSurnameValid"
          />
          <p class="error">{{ error.surname }}</p>
          <select
            v-model="employee.team"
            :class="{ invalid: !!error.team }"
            @change="isTeamSelected"
          >
            <option disabled selected value="">Team</option>
            <option value="team 1">team 1</option>
            <option value="team 2">team 2</option>
            <option value="team 3">team 3</option>
          </select>
          <p class="error">{{ error.team }}</p>
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            v-model="employee.email"
            :class="{ invalid: !!error.email }"
            @input="isEmailValid"
          />
          <p class="error">{{ error.email }}</p>

          <select
            v-model="employee.role"
            :class="{ invalid: !!error.role }"
            @change="isRoleSelected"
          >
            <option disabled selected value="">Role</option>
            <option value="role 1">role 1</option>
            <option value="role 2">role 2</option>
          </select>
          <p class="error">{{ error.role }}</p>
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
      error: {
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
    isEmailValid() {
      this.error.email = '';

      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regex.test(this.employee.email)) {
        this.error.email = 'Invalid email';
        return false;
      }
      return true;
    },
    isNameValid() {
      this.error.name = '';
      if (this.employee.name === '') {
        this.error.name = "Can't be empty";
        return false;
      }
      return true;
    },
    isSurnameValid() {
      this.error.surname = '';
      if (this.employee.surname === '') {
        this.error.surname = "Can't be empty";
        return false;
      }
      return true;
    },
    isTeamSelected() {
      this.error.team = '';
      if (this.employee.team === '') {
        this.error.team = 'Not selected';
        return false;
      }
      return true;
    },
    isRoleSelected() {
      this.error.role = '';
      if (this.employee.role === '') {
        this.error.role = 'Not selected';
        return false;
      }
      return true;
    },
    isDateSelected() {
      this.error.birthDate = '';
      if (this.employee.birthDate === '') {
        this.error.birthDate = 'Not selected';
        return false;
      }
      return true;
    },

    isFormValid() {
      const name_err = !this.isNameValid();
      const surname_err = !this.isSurnameValid();
      const date_err = !this.isDateSelected();
      const email_err = !this.isEmailValid();
      const role_err = !this.isRoleSelected();
      const team_err = !this.isTeamSelected();

      if (
        name_err ||
        surname_err ||
        date_err ||
        email_err ||
        role_err ||
        team_err
      ) {
        console.log('invalid');
        return false;
      } else {
        console.log('valid');
        return true;
      }
    },

    createEmployee() {
      if (!this.isFormValid()) {
        return;
      }
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
