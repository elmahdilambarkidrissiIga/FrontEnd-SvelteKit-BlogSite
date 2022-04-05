<script context="module">
  export const load = async ({ params, fetch }) => {
    const id = params.userId
    const res = await fetch(`http://localhost:8080/api/user/${id}`)
    const content = await res.json()
    const user = await content.user
    return {
      props: {
        user,
      },
    }
  }
</script>

<script>
  export let user

  let username = '',
    email = '',
    password = '',
    userId = user.id

  const submit = async () => {
    await fetch(`http://localhost:8080/api/user/${userId}`, {
      method: 'PUT',
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

      return location.assign('/profile')
    })
  }
</script>

<div class="user">
  <div class="info">
    <p>User id {user.id}</p>
    <h5>UserName: {user.username}</h5>
    <p>Email: {user.email}</p>
    <p>createdAt: {user.createdAt}</p>
    <p>updatedAt: {user.updatedAt}</p>
  </div>
</div>

<form on:submit|preventDefault={submit} class="form-signin">
  <h1 class="h3 mb-3 fw-normal">Modifier votre information</h1>

  <div class="form-floating">
    <input bind:value={username} type="text" class="form-control" />
    <label for="floatingInput">Username</label>
  </div>
  <br />
  <div class="form-floating">
    <input bind:value={email} type="email" class="form-control" />
    <label for="floatingInput">Email address</label>
  </div>
  <br />
  <div class="form-floating">
    <input bind:value={password} type="password" class="form-control" />
    <label for="floatingPassword">Password</label>
  </div>
  <br />
  <button class="w-100 btn btn-lg btn-primary" type="submit">Modifier</button>
</form>

<style>
  .user {
    width: 1300px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin: 20px 0;
  }

  .info {
    padding: 50px;
    border: 10px solid #ddd;
    box-shadow: 0 0 10px rgb(53, 51, 51);
  }

  @media screen and (max-width: 600px) {
    .user {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 20px;
      margin: 30px 0;
    }
  }
</style>
