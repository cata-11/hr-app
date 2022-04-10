<template>
  <nav>
    <ul>
      <li>
        <router-link to="/employees">employees</router-link>
      </li>
      <li>
        <router-link to="/teams">teams</router-link>
      </li>
      <li>
        <router-link to="/roles">roles</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  background-color: var(--blue);
  color: var(--white);
  max-width: 80rem;
  margin: 1rem auto;
  margin-bottom: 0;
}

ul {
  width: 25rem;
  display: flex;
  justify-content: space-around;
}

a {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 3rem;
  text-transform: capitalize;
  transition: all 0.2s ease-in-out;
}

li {
  width: 100%;
}

.router-link-active,
a:hover {
  background-color: var(--yellow);
  color: var(--black);
}

@media only screen and (max-width: 1280px) {
  nav {
    margin-top: 0;
  }
  ul {
    width: 100%;
  }
}
</style>
