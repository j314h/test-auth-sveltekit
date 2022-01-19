<script lang="ts" context="module">
  export const load = async ({ session }) => {
    console.log('SESSION HOME : ', session);
    if (session.person) {
      return {
        status: 302,
        redirect: '/dashboard',
      };
    }
    return {
      props: {},
    };
  };
</script>

<slot />
