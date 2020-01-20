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

  const stat_root = async () => {
    const data = await ipfs.files.stat('/')
    log(`stat '/': ${JSON.stringify(data, null, 4)}`)
  }

  await stat_root()
})
