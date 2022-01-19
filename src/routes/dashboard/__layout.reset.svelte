<script lang="ts" context="module">
  export const load = async ({ session }) => {
    console.log('SESSION DASHBOARD :', session);
    if (!session.person) {
      return {
        status: 302,
        redirect: '/',
      };
    }
    return {};
  };
</script>

<slot />
