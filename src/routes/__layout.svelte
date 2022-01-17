<script lang="ts" context="module">
  export const load = ({ session }) => {
    console.log('USER LAYOUT SESSION : ', session);

    return {
      props: {
        user: session.user,
      },
    };
  };
</script>

<slot />
