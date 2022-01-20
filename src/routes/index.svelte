<script lang="ts">
  import { session } from '$app/stores';
  import { login } from '$lib/modules/person/person.action';

  // connexion input value
  let valueEmail = '';
  let valuePassword = '';

  let image = null;

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

<style>
  input {
    display: block;
  }
</style>
