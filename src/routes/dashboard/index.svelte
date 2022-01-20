<script lang="ts">
  import { createPerson } from '$lib/models/person/action/person.action';
  import { ERole } from '$lib/types/role.type';

  // les roles pour creation user
  let roles: ERole[] = [ERole.ROOT, ERole.DEV, ERole.CLIENT];

  // create user input value
  let valueFirstName = '';
  let valueLastName = '';
  let valuePseudo = '';
  let valueEmailCreate = '';
  let valuePasswordCreate = '';

  //envoie formulaire create
  const handlerCreateForm = async (e) => {
    await createPerson(e);
    valueFirstName = '';
    valueLastName = '';
    valuePseudo = '';
    valueEmailCreate = '';
    valuePasswordCreate = '';
  };
</script>

<p>Mon compte</p>

<!-- création user -->
<h1>Creation Users</h1>
<form on:submit|preventDefault={handlerCreateForm}>
  <input
    type="text"
    name="firstName"
    placeholder="firstName"
    bind:value={valueFirstName}
  />
  <input
    type="text"
    name="lastName"
    placeholder="lastName"
    bind:value={valueLastName}
  />
  <input
    type="text"
    name="pseudo"
    placeholder="pseudo"
    bind:value={valuePseudo}
  />
  <input
    type="text"
    name="email"
    placeholder="email"
    bind:value={valueEmailCreate}
  />
  <input
    type="text"
    name="password"
    placeholder="password"
    bind:value={valuePasswordCreate}
  />
  <select name="role" id="role-select">
    <option value="">-- choisissez un role --</option>
    {#each roles as role}
      <option value={role}>{role}</option>
    {/each}
  </select>
  <button>Envoyer</button>
</form>

<style>
  input {
    display: block;
  }
</style>
