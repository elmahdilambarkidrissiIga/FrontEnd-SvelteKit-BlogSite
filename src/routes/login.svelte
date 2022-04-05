<script>
  let username = '',
    password = ''

  const submit = async () => {
    await fetch('http://localhost:8080/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      } else if (response.ok) {
        const user = response.json()
        return location.assign('/')
        console.log(user)
      }
    })
  }
</script>

<form on:submit|preventDefault={submit} class="form-signin">
  <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

  <div class="form-floating">
    <input bind:value={username} type="text" class="form-control" required />
    <label for="floatingInput">Username</label>
  </div>
  <br />
  <div class="form-floating">
    <input
      bind:value={password}
      type="password"
      class="form-control"
      required
    />
    <label for="floatingPassword">Password</label>
  </div>

  <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
</form>
