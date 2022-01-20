<script lang="ts">
  import { goto } from '$app/navigation';
  import { session } from '$app/stores';
  import { callApi } from '$lib/provider/fetch/fetch.service';
  import { EMethodeFetch } from '$lib/provider/fetch/fetch.type';

  const handlerDeconnecion = async (): Promise<void> => {
    const res = await callApi<{ deconnect: boolean }>(
      'api/logout.json',
      EMethodeFetch.GET
    );
    if (res.deconnect) {
      $session.person = null;
    }
    goto('/');
  };
</script>

<button on:click={handlerDeconnecion}>Déconnection</button>
