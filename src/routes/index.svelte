<script lang="ts">
  import { session } from '$app/stores';
  import { personAction } from '$lib/models/person/action/person.action';
  import { ERole } from '$lib/types/role.type';

  // les roles pour creation user
  let roles: ERole[] = [ERole.ROOT, ERole.DEV, ERole.CLIENT];

  // connexion input value
  let valueEmail = '';
  let valuePassword = '';

  // create user input value
  let valueFirstName = '';
  let valueLastName = '';
  let valuePseudo = '';
  let valueEmailCreate = '';
  let valuePasswordCreate = '';
  let image = null;

  // connexion user
  const connexionForm = async (e) => {
    // creation formData
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((v, k) => {
      data[k] = v;
    });

    // reset input connexion
    valueEmail = '';
    valuePassword = '';

    const test = await fetch('/api/auth.json');
    const res = await test.json();
    console.log('RESPONSE : ', test);
    console.log('BODY : ', res);
  };

  // reset input form create use
  const resetFormCreateUser = (): void => {
    valueFirstName = '';
    valueLastName = '';
    valuePseudo = '';
    valueEmailCreate = '';
    valuePasswordCreate = '';
  };

  //envoie formulaire create
  const handlerCreateForm = (e) => {
    personAction.createPerson(e);
    resetFormCreateUser();
  };

  // mise en forme de l'image
  const changeInputFile = (e) => {
    console.log('imageTarget =>', e.target);

    image = e.target.files[0];
    console.log('image =>', image);
  };
</script>

<!-- connexion -->
<h1>Connexion</h1>
<form on:submit|preventDefault={connexionForm}>
  <input type="text" name="email" bind:value={valueEmail} />
  <input type="password" name="password" bind:value={valuePassword} />
  <button>Envoyer</button>
</form>

{#if $session.user.role !== 'client'}
  <!-- création user -->
  <h1>Creation Users</h1>
  <form on:submit|preventDefault={handlerCreateForm}>
    <input type="text" name="firstName" bind:value={valueFirstName} />
    <input type="text" name="lastName" bind:value={valueLastName} />
    <input type="text" name="pseudo" bind:value={valuePseudo} />
    <input type="text" name="email" bind:value={valueEmailCreate} />
    <input type="text" name="password" bind:value={valuePasswordCreate} />
    <p>image</p>
    <input type="file" name="avatar" on:change={changeInputFile} />
    <select name="role" id="role-select">
      <option value="">-- choisissez un role --</option>
      {#each roles as role}
        <option value={role}>{role}</option>
      {/each}
    </select>
    <button>Envoyer</button>
  </form>
{/if}

<style>
  input {
    display: block;
  }
</style>
