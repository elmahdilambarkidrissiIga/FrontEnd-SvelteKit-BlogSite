<script context="module">
  export const load = async ({ params, fetch }) => {
    const id = params.userId
    const resTag = await fetch('http://localhost:8080/api/tag/')
    const content = await resTag.json()
    const tagsList = await content.tags

    const resUser = await fetch('http://localhost:8080/api/user/user')
    const contentUser = await resUser.json()
    const user = await contentUser.user

    const userId = await user.id

    const resPosts = await fetch(
      `http://localhost:8080/api/articles/articleuser/${userId}`
    )
    const contentPosts = await resPosts.json()
    const posts = await contentPosts.article

    return {
      props: {
        id,
        posts,
        tagsList,
      },
    }
  }
</script>

<script>
  export let id
  export let tagsList
  export let posts

  let valueTag = ['']

  let tagId = 'select Tag',
    articleId

  let titre = '',
    contenu = '',
    name = '',
    userId = id

  const submit = async () => {
    await fetch('http://localhost:8080/api/articles/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        titre,
        contenu,
        userId,
        tags: [valueTag],
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      } else if (response.ok) {
        return location.reload()
      }
    })
  }

  const submitTag = async () => {
    await fetch('http://localhost:8080/api/tag/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      } else if (response.ok) {
        return location.reload()
      }
    })
  }

  const submitAddTagToArticle = async () => {
    await fetch('http://localhost:8080/api/tag/addarticle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        tagId,
        articleId,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      } else if (response.ok) {
        return location.reload()
      }
    })
  }
</script>

<div class="user">
  <div class="info">
    <form on:submit|preventDefault={submit}>
      <div class="form-group">
        <label for="exampleFormControlInput1">Titre d'Article</label>
        <input
          bind:value={titre}
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="titre de post..."
        />
      </div>

      <div class="form-group">
        <label for="exampleFormControlTextarea1">Contenu</label>
        <textarea
          bind:value={contenu}
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Ecrir..."
        />
      </div>
      <br />
      <select multiple bind:value={valueTag}>
        {#each tagsList as tag}
          <option value={tag.name}>
            {tag.name}
          </option>
        {/each}
      </select>
      {valueTag}
      <br />
      <button class="w-50 btn btn-primary" type="submit">Ajouter Article</button
      >
    </form>
    <br />
    <form on:submit|preventDefault={submitTag}>
      <div class="form-group">
        <label for="exampleFormControlInput1">Name Tag</label>
        <input
          bind:value={name}
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="name tag..."
        />
      </div>
      <button class="w-50 btn btn-primary" type="submit">Creer Tag</button>
    </form>
    <br />
    <form on:submit|preventDefault={submitAddTagToArticle}>
      <p>Tags :</p>
      <select bind:value={tagId}>
        {#each tagsList as tag}
          <option value={tag.id}>
            {tag.name}
          </option>
        {/each}
      </select>
      {tagId}
      <select class="link" bind:value={articleId}>
        {#each posts as post}
          <option value={post.id}>
            {post.titre}
          </option>
        {/each}
      </select>
      {#if articleId}
        {articleId}
      {:else}
        0 article
      {/if}
      <br />
      <button class="w-10 btn btn-sm btn-primary" type="submit"
        >Ajouter tag</button
      >
    </form>
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

  .btn {
    margin-top: 15px;
  }
</style>
