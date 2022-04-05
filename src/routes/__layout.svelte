<script context="module">
  export const load = ({ session }) => {
    return {
      props: {
        auth: session.auth,
      },
    }
  }
</script>

<script>
  export let auth
  const logout = async () => {
    await fetch('http://localhost:8080/api/auth/signout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      } else if (response.ok) {
        const message = response.json()
        console.log(message)
        return location.assign('/login')
      }
    })
  }
</script>

<nav class="navbar navbar-expand-md navbar-light bg-gradient mb-4">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Home</a>
    <div>
      {#if auth}
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a class="nav-link" href="/" on:click={logout}>LogOut</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/profile">Profile</a>
          </li>
        </ul>
      {:else}
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a class="nav-link" href="/login">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/register">Register</a>
          </li>
        </ul>
      {/if}
    </div>
  </div>
</nav>

<div class="container">
  <nav>
    <ul class="ulpost">
      <li class="lipost">
        <a href="/">Home</a>
      </li>
    </ul>
  </nav>
  <slot />
</div>

<style>
  .container {
    max-width: 800px;
    margin: 50px auto;
  }

  .ulpost {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .lipost {
    margin-right: 10px;
  }
  a:link {
    color: green;
    background-color: transparent;
    text-decoration: none;
  }
  a:visited {
    color: rgb(87, 27, 13);
    background-color: transparent;
    text-decoration: none;
  }
  a:hover {
    color: red;
    background-color: transparent;
    text-decoration: underline;
  }
  a:active {
    color: rgb(117, 8, 112);
    background-color: transparent;
    text-decoration: underline;
  }
</style>
