<template>
  <base-form
    @submit.prevent="handleSubmit"
    @modalClosed="closeModal"
    :mode="mode"
  >
    <template #header v-if="mode === 'create'">Create a new employee</template>
    <template #header v-else>Edit employee data</template>
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
          :readonly="mode === 'edit' ? true : false"
          type="date"
          placeholder="Birthdate"
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
</template>

<script>
import BaseForm from '../base/BaseForm.vue';
export default {
  props: ['mode', 'employeeData', 'employeeIdx'],
  emits: ['employee-created', 'employee-edited', 'modal-closed'],
  components: {
    BaseForm
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
      }
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
        return false;
      } else {
        return true;
      }
    },
    createEmployee() {
      this.$emit('employee-created', { ...this.employee });

      for (const key in this.employee) {
        this.employee[key] = '';
      }
    },
    editEmployee() {
      const initialData = { ...this.employeeData };
      initialData.birthDate = this.employee.birthDate;
      const editedData = { ...this.employee };

      let isChanged = false;

      for (const key in initialData) {
        if (initialData[key] !== editedData[key]) {
          isChanged = true;
          break;
        }
      }

      if (isChanged) {
        editedData.birthDate = this.employeeData.birthDate;
      } else if (!isChanged) {
        //
      }

      this.$emit('employee-edited', {
        isChanged: isChanged,
        idx: this.employeeIdx,
        data: editedData
      });
    },
    handleSubmit() {
      if (!this.isFormValid()) {
        return;
      }
      if (this.mode === 'create') this.createEmployee();
      else if (this.mode === 'edit') this.editEmployee();
    },
    closeModal() {
      this.$emit('modal-closed');
    }
  },
  mounted() {
    if (this.mode === 'edit') {
      this.employee = { ...this.employeeData };
      this.employee.birthDate = new Date(this.employee.birthDate)
        .toISOString()
        .substring(0, 10);
    }
  }
};
</script>
