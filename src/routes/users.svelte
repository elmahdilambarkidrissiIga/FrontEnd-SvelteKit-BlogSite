<script context="module">
  export const load = async ({ fetch }) => {
    const res = await fetch('http://localhost:8080/api/user/')
    const content = await res.json()
    const users = content.users
    return {
      props: {
        users,
      },
    }
  }
</script>

<script>
  export let users
</script>

{JSON.stringify(users)}
