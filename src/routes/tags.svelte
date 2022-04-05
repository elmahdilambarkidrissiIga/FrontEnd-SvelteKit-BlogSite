<script>
  let name = ''

  const createTag = async () => {
    await fetch('http://localhost:8080/api/tag/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      return location.assign('/home')
    })
  }
</script>
