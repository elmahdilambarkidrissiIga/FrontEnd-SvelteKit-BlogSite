<script context="module">
  export const load = async ({ fetch }) => {
    const res = await fetch('http://localhost:8080/api/user/user')
    const content = await res.json()
    const user = await content.user

    const id = await user.id

    const resPosts = await fetch(
      `http://localhost:8080/api/articles/articleuser/${id}`
    )
    const contentPosts = await resPosts.json()
    const posts = await contentPosts.article

    const resTag = await fetch(`http://localhost:8080/api/tag/`)
    const contentTag = await resTag.json()
    const tags = await contentTag.tag

    // console.log(posts)
    return {
      props: {
        user,
        posts,
        tags,
      },
    }
  }
</script>

<script>
  export let user
  export let posts
</script>

{#if user}
  <div class="user">
    <div class="info">
      <p>User id {user.id}</p>
      <h5>UserName: {user.username}</h5>
      <p>Email: {user.email}</p>
      <p>createdAt: {user.createdAt}</p>
      <p>updatedAt: {user.updatedAt}</p>
      <p class="link">
        <a href={`/addblog/${user.id}`}>ajouter article</a>
      </p>
      <p><a href={`/authors/update/${user.id}`}>Update Compte</a></p>
    </div>
  </div>

  <div class="user">
    <div class="info">
      {#if posts.lenght > 0}
        {#each posts as item}
          <h5>
            <a sveltekit:prefetch href={`/blog/${item.id}`}>{item.titre}</a>
          </h5>
        {/each}
      {:else}
        <p>No Posts found with</p>
      {/if}
    </div>
  </div>
{:else}
  <p>No user found with</p>
{/if}

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
    border: 5px solid #ddd;
    box-shadow: 0 0 10px rgb(105, 0, 0);
  }

  @media screen and (max-width: 600px) {
    .user {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 20px;
      margin: 30px 0;
    }
  }

  .link {
    text-align: right;
  }
</style>
