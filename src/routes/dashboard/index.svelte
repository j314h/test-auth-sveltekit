<script lang="ts">
  import { createFileAction } from '$lib/modules/file/file.action';

  import Logout from '$lib/modules/logout/logout.composant.svelte';
  import { createPerson } from '$lib/modules/person/person.action';
  import { ERole } from '$lib/modules/role/role.type';

  // les roles pour creation user
  let roles: ERole[] = [ERole.ROOT, ERole.DEV, ERole.CLIENT];

  // create user input value
  let valueFirstName = '';
  let valueLastName = '';
  let valuePseudo = '';
  let valueEmailCreate = '';
  let valuePasswordCreate = '';
  let image = null;

  //envoie formulaire create
  const handlerCreateForm = async (e) => {
    await createPerson(e);
    valueFirstName = '';
    valueLastName = '';
    valuePseudo = '';
    valueEmailCreate = '';
    valuePasswordCreate = '';
  };

  // mise en forme de l'image
  const changeInputFile = (e) => {
    console.log('imageTarget =>', e.target);

    image = e.target.files[0];
    console.log('image =>', image);

    // createFileAction(image);
  };
</script>

<Logout />

<p>Mon compte</p>

<!-- création user -->
<h1>Creation Users</h1>
<form on:submit|preventDefault={handlerCreateForm}>
  <input type="text" name="firstName" placeholder="firstName" bind:value={valueFirstName} />
  <input type="text" name="lastName" placeholder="lastName" bind:value={valueLastName} />
  <input type="text" name="pseudo" placeholder="pseudo" bind:value={valuePseudo} />
  <input type="text" name="email" placeholder="email" bind:value={valueEmailCreate} />
  <input type="text" name="password" placeholder="password" bind:value={valuePasswordCreate} />
  <select name="role" id="role-select">
    <option value="">-- choisissez un role --</option>
    {#each roles as role}
      <option value={role}>{role}</option>
    {/each}
  </select>
  <button>Envoyer</button>
</form>
<form>
  <input type="file" name="file" on:change={changeInputFile} />
</form>

<style>
  input {
    display: block;
  }
</style>
