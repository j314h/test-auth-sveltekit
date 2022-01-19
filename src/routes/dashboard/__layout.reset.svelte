<script lang="ts" context="module">
  export const load = ({ session }) => {
    console.log('SESSION DASHBOARD :', session);

    return {
      props: {},
    };
  };
</script>

<slot />
