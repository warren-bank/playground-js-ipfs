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

  const add_files_in_directory = async () => {
    const files = [
      {
        path:    'cats/adorable-kitty.txt',
        content: 'persian'
      },
      {
        path:    'cats/cat-drinking-milk.txt',
        content: 'yum yum'
      },
      {
        path:    'dogs/dog-on-a-table.txt',
        content: 'woof!'
      }
    ]

    const cids = await ipfs.add(files, {wrapWithDirectory: true})
    cids.sort((a, b) => {
      return (a.path < b.path)
        ? -1
        : (a.path === b.path)
          ? 0
          : 1
    })

    log(`Content IDs: ${JSON.stringify(cids, null, 4)}`)

    const root_directory = cids[0]
    if (root_directory.path !== "") throw new Error(`assersion failed: incorrect cids[0] root directory path: "${cids[0].path}"`)

    const cid   = root_directory.hash
    const file0 = (await ipfs.cat(`/ipfs/${cid}/${files[0].path}`)).toString()
    const file1 = (await ipfs.cat(`/ipfs/${cid}/${files[1].path}`)).toString()
    const file2 = (await ipfs.cat(`/ipfs/${cid}/${files[2].path}`)).toString()

    log('Directory:')
    log(`  /ipfs/${cid}/${files[0].path}`)
    log(`    ${file0}`)
    log(`  /ipfs/${cid}/${files[1].path}`)
    log(`    ${file1}`)
    log(`  /ipfs/${cid}/${files[2].path}`)
    log(`    ${file2}`)

    if (file0 !== files[0].content) throw new Error(`assersion failed: incorrect file0 content: "${file0}"`)
    if (file1 !== files[1].content) throw new Error(`assersion failed: incorrect file1 content: "${file1}"`)
    if (file2 !== files[2].content) throw new Error(`assersion failed: incorrect file2 content: "${file2}"`)

    append_html(`
      <h4>Directory via public IPFS HTTP gateway:</h4>
      <ul>
        <li><a target="_blank" href="https://ipfs.io/ipfs/${cid}/${files[0].path}">/ipfs/${cid}/${files[0].path}</a></li>
        <li><a target="_blank" href="https://ipfs.io/ipfs/${cid}/${files[1].path}">/ipfs/${cid}/${files[1].path}</a></li>
        <li><a target="_blank" href="https://ipfs.io/ipfs/${cid}/${files[2].path}">/ipfs/${cid}/${files[2].path}</a></li>
      </ul>
    `)
  }

  await add_files_in_directory()
})
