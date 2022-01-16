<script lang="ts">
  import type { IPerson } from '$lib/types/person.type';

  let valueEmail = '';
  let valuePassword = '';

  let valueFirstName = '';
  let valueLastName = '';
  let valueUserName = '';
  let valuePseudo = '';
  let valueEmailCreate = '';
  let valuePasswordCreate = '';

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

  // creation user
  const createUserForm = async (e): Promise<void> => {
    // creation formData
    const formData = new FormData(e.target);
    const data = {} as IPerson;
    formData.forEach((v, k) => {
      data[k] = v;
    });

    // valueFirstName = '';
    // valueLastName = '';
    // valueUserName = '';
    // valuePseudo = '';
    // valueEmailCreate = '';
    // valuePasswordCreate = '';

    const res = await fetch('api/person.json', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const resObject = await res.json();

    console.log(resObject);
  };
</script>

<!-- connexion -->
<h1>Connexion</h1>
<form on:submit|preventDefault={connexionForm}>
  <input type="text" name="email" bind:value={valueEmail} />
  <input type="password" name="password" bind:value={valuePassword} />
  <button>Envoyer</button>
</form>

<!-- création user -->
<h1>Creation User</h1>
<form on:submit|preventDefault={createUserForm}>
  <input type="text" name="firstName" bind:value={valueFirstName} />
  <input type="text" name="lastName" bind:value={valueLastName} />
  <input type="text" name="userName" bind:value={valueUserName} />
  <input type="text" name="pseudo" bind:value={valuePseudo} />
  <input type="text" name="email" bind:value={valueEmailCreate} />
  <input type="text" name="password" bind:value={valuePasswordCreate} />
  <button>Envoyer</button>
</form>

<style>
  input {
    display: block;
  }
</style>
