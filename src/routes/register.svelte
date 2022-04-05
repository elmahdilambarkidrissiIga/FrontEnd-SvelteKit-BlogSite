<script>
  let username = '',
    email = '',
    password = ''

  const submit = async () => {
    await fetch('http://localhost:8080/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      return location.assign('/login')
    })
  }
</script>

<form on:submit|preventDefault={submit} class="form-signin">
  <h1 class="h3 mb-3 fw-normal">Please Register</h1>

  <div class="form-floating">
    <input bind:value={username} type="text" class="form-control" required />
    <label for="floatingInput">Username</label>
  </div>
  <br />
  <div class="form-floating">
    <input bind:value={email} type="email" class="form-control" required />
    <label for="floatingInput">Email address</label>
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
  <br />
  <button class="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>
</form>
