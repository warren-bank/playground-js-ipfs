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

  const write_text_file = async () => {
    await ipfs.files.write('/cat.txt', Ipfs.Buffer.from('meow'), {create: true})
  }

  const stat_dir = async (path) => {
    const data = await ipfs.files.stat(path)
    log(`stat '${path}': ${JSON.stringify(data, null, 4)}`)
  }

  const ls_dir = async (path) => {
    const data = await ipfs.files.ls(path, {long: true})
    log(`ls '${path}': ${JSON.stringify(data, null, 4)}`)
  }

  await write_text_file()
  await stat_dir('/')
  await ls_dir('/')
})
