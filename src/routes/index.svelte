<script lang="ts">
  import Login from '$lib/modules/login/login.composant.svelte';

  let image = null;

  // mise en forme de l'image
  const changeInputFile = (e) => {
    console.log('imageTarget =>', e.target);

    image = e.target.files[0];
    console.log('image =>', image);
  };
</script>

<!-- connexion -->
<Login />
