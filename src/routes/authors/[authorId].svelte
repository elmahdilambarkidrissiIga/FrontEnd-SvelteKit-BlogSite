<script context="module">
  export const load = async ({ params, fetch }) => {
    const id = params.authorId

    console.log(id)
    //fetch user with id
    const resUser = await fetch(`http://localhost:8080/api/user/${id}`)
    const content = await resUser.json()
    const user = content.user

    //fetch posts by user
    const resPostsUser = await fetch(
      `http://localhost:8080/api/articles/articleuser/${user.id}`
    )
    const contentPosts = await resPostsUser.json()
    const posts = contentPosts.article

    // console.log(posts)
    return {
      props: {
        user,
        posts,
      },
    }
  }
</script>

<script>
  export let user
  export let posts
</script>

<h1>{user.username}</h1>
<p>{user.email}</p>
<p>{user.createdAt}</p>

<h2>Post by {user.username}</h2>
<ul>
  {#each posts as post}
    <li>
      <a href={`/blog/${post.id}`}>{post.titre}</a>
    </li>
  {/each}
</ul>

<style>
  li {
    margin-bottom: 10px;
  }

  a:link,
  a:visited {
    background-color: #f49b36;
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
  }

  a:hover,
  a:active {
    background-color: red;
  }
</style>
