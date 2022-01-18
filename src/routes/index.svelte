<script lang="ts">
  import { session } from '$app/stores';
  import { personAction } from '$lib/models/person/action/person.action';
  import { fetchService } from '$lib/provider/fetch/fetch.service';
  import { formService } from '$lib/provider/form/form.service';
  import { EMethodeFetch } from '$lib/types/fetch.type';
  import type { IPersonReceved } from '$lib/types/person.type';
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

  // connexion user
  const connexionForm = async (e) => {
    // creation formData
    const formData = formService.createObjectAsFormData(e.target);

    // reset input connexion
    valueEmail = '';
    valuePassword = '';

    // create
    const { person } = await fetchService.callApi<IPersonReceved>(
      'api/login.json',
      EMethodeFetch.POST,
      formData
    );

    console.log('RESPONSE : ', person);
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
{/if}

<style>
  input {
    display: block;
  }
</style>
