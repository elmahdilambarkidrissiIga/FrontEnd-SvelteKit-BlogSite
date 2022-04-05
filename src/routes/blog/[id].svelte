<script context="module">
  export const load = async ({ params, fetch }) => {
    const id = params.id
    const res = await fetch(`http://localhost:8080/api/articles/${id}`)
    const content = await res.json()
    const post = await content.article
    const tags = await content.tags

    const userRes = await fetch(`http://localhost:8080/api/user/${post.userId}`)

    const userContent = await userRes.json()

    const user = await userContent.user

    const commentId = await post.id

    const commentRes = await fetch(
      `http://localhost:8080/api/comments/${commentId}`
    )

    const commentContent = await commentRes.json()

    const comments = await commentContent.comment

    return {
      props: {
        post,
        user,
        comments,
        tags,
      },
    }
  }
</script>

<script>
  import { paginate, LightPaginationNav } from 'svelte-paginate'
  export let post
  export let user
  export let comments
  export let tags
  // fetch post comment

  let tagId = 'select Tag'

  let email = user.email,
    contenu = '',
    articleId = post.id
  const submit = async () => {
    await fetch('http://localhost:8080/api/comments/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email,
        contenu,
        articleId,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      } else if (response.ok) {
        const comment = response.json()
        console.log(comment)
        return location.reload()
      }
    })
  }

  const handleClick = async () => {
    await fetch(`http://localhost:8080/api/articles/${post.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      } else if (response.ok) {
        return location.assign('../profile')
      }
    })
  }
  // pagination
  let items = comments
  let currentPage = 1
  let pageSize = 4
  $: paginatedItems = paginate({ items, pageSize, currentPage })
</script>

<div class="user">
  <div class="info">
    <h1>{post.titre}</h1>
    <p>{post.contenu}</p>
    <br />
    <p><a href="#{tags}">{tags}</a></p>
    <br />
    {#each paginatedItems as item}
      <p>{item.contenu}</p>
    {/each}
    <LightPaginationNav
      totalItems={items.length}
      {pageSize}
      {currentPage}
      limit={1}
      showStepOptions={true}
      on:setPage={(e) => (currentPage = e.detail.page)}
    />
    <br />
    <form on:submit|preventDefault={submit}>
      <div class="form-group">
        <label for="exampleFormControlInput1">Commentaire</label>
        <textarea
          bind:value={contenu}
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Ecrir commentaire..."
        />
      </div>
      <button class="w-10 btn btnn btn-sm btn-primary" type="submit"
        >Comment</button
      >
    </form>
    <br />
    <button class="w-10 btn btn-sm btn-primary" on:click|once={handleClick}
      >Delete</button
    >
    <p class="link">
      - Written by <a href={`/authors/${user.id}`}>{user.username}</a>
    </p>
  </div>
</div>

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
  .btnn {
    margin-top: 10px;
    margin-left: 440px;
  }
  .link {
    text-align: right;
  }
</style>
