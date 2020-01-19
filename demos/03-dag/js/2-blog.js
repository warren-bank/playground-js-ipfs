document.addEventListener('DOMContentLoaded', async () => {
  const ipfs = await Ipfs.create({ repo: 'ipfs-' + Math.random() })

  const log_status = async () => {
    const status = ipfs.isOnline() ? 'online' : 'offline'
    const {version} = await ipfs.version()
    const {id, agentVersion, protocolVersion, publicKey, addresses} = await ipfs.id()

    log('Node:')
    log(`  status:          ${status}`)
    log(`  version:         ${version}`)
    log(`  agentVersion:    ${agentVersion}`)
    log(`  protocolVersion: ${protocolVersion}`)
    log(`  publicKey:       ${publicKey}`)
    log(`  id:              ${id}`)
    log(`  addresses:       ${JSON.stringify(addresses)}`)
  }

  log('IPFS: Ready')
  await log_status()

  const putPosts = async () => {
    const natCid = await ipfs.dag.put({ author: "Nat" })
    const samCid = await ipfs.dag.put({ author: "Sam" })

    const treePostCid = await ipfs.dag.put({
      content: "trees",
      author: samCid,
      tags: ["outdoor", "hobby"]
    })
    const computerPostCid = await ipfs.dag.put({
      content: "computers",
      author: natCid,
      tags: ["hobby"],
      prev: treePostCid
    })
    const dogPostCid = await ipfs.dag.put({
      content: "dogs",
      author: samCid,
      tags: ["funny", "hobby"],
      prev: computerPostCid
    })

    return dogPostCid
  }

  const serializePost = (cid, post) => {
    const result = {cid, ...post}

    if (cid)
      result.cid = cid.toString()

    if (post.author)
      result.author = post.author.toString()

    if (post.prev)
      result.prev = post.prev.toString()

    return result
  }

  const traversePosts = async (cid) => {
    const result = []
    while (cid) {
      const current = await ipfs.dag.get(cid)
      const prev    = current.value.prev

      result.unshift(serializePost(cid, current.value))
      cid = prev
    }
    return result
  }

  const put_and_get = async () => {
    const cid_leaf = await putPosts()
    const posts    = await traversePosts(cid_leaf)

    log('Blog Posts: ' + JSON.stringify(posts, null, 4))
  }

  await put_and_get()
})
