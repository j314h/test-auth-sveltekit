<script lang="ts">
  import { session } from '$app/stores';
  import { login } from './login.action';

  // value pour les inputs
  let valueEmail = '';
  let valuePassword = '';

  // envoie fomulaire connexion
  const connexionForm = async (e) => {
    // connexion user
    const person = await login(e);
    // si person ok, creation session
    if (person) {
      $session.person = person;
    }
    // reset input connexion
    valueEmail = '';
    valuePassword = '';
  };
</script>

<h1>Connexion</h1>
<form on:submit|preventDefault={connexionForm}>
  <input type="text" name="email" bind:value={valueEmail} />
  <input type="password" name="password" bind:value={valuePassword} />
  <button>Envoyer</button>
</form>

<style>
  input {
    display: block;
  }
</style>
