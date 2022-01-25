<script lang="ts">
  import { createFileAction } from '$lib/modules/file/file.action';
  import type { IFile } from '$lib/modules/file/file.type';
  import Logout from '$lib/modules/logout/logout.composant.svelte';
  import { createPerson } from '$lib/modules/person/person.action';
  import { ERole } from '$lib/modules/role/role.type';
  import { createObjectAsFormData } from '$lib/provider/form/form.service';

  // les roles pour creation user
  let roles: ERole[] = [ERole.ROOT, ERole.DEV, ERole.CLIENT];

  // create user input value
  let valueFirstName = '';
  let valueLastName = '';
  let valuePseudo = '';
  let valueEmailCreate = '';
  let valuePasswordCreate = '';

  let image;
  let fs;
  // reset input form create person
  const resetInputFormCreatePerson = () => {
    valueFirstName = '';
    valueLastName = '';
    valuePseudo = '';
    valueEmailCreate = '';
    valuePasswordCreate = '';
  };

  //envoie formulaire create person
  const handlerCreateForm = async (e) => {
    // creation person
    await createPerson(e);
    // reset les input
    resetInputFormCreatePerson();
  };

  // mise en forme de l'image
  const changeInputFile = async (e) => {
    const form = new FormData();

    form.append('fileUpload', e.name);
    /* image = e.target.files[0];
    console.log('image =>', image); */

    fetch(`${import.meta.env.VITE_GRAPHCMS_UPLOAD}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN_ROOT}`,
      },
      body: form,
    });

    // await createFileAction(image);
  };
</script>

<Logout />

<p>Mon compte</p>

<h1>Creation Users</h1>

<!-- create person -->
<form on:submit|preventDefault={handlerCreateForm}>
  <!-- input -->
  <input type="text" name="firstName" placeholder="firstName" bind:value={valueFirstName} />
  <input type="text" name="lastName" placeholder="lastName" bind:value={valueLastName} />
  <input type="text" name="pseudo" placeholder="pseudo" bind:value={valuePseudo} />
  <input type="text" name="email" placeholder="email" bind:value={valueEmailCreate} />
  <input type="text" name="password" placeholder="password" bind:value={valuePasswordCreate} />

  <!-- select role -->
  <select name="role" id="role-select">
    <option value="">-- choisissez un role --</option>
    {#each roles as role}
      <option value={role}>{role}</option>
    {/each}
  </select>

  <!-- btn submit -->
  <button type="submit">Envoyer</button>
</form>

<!-- upload file -->
<h1>telecharger un fichier</h1>
<!-- upload -->
<form>
  <input type="file" name="file" on:change={changeInputFile} />
</form>

<style>
  input {
    display: block;
  }

  form {
    margin-bottom: 40px;
  }
</style>
