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

  const read_nested_data_using_link = async (val_put) => {
    const cid1 = await ipfs.dag.put({ test: val_put })
    const cid2 = await ipfs.dag.put({ bar:  cid1 })
    const node = await ipfs.dag.get(cid2, '/bar/test')

    const val_get = node.value
    log('Dag value:')
    log(`  put: (${typeof val_put}) ${val_put}`)
    log(`  get: (${typeof val_get}) ${val_get}`)
  }

  await read_nested_data_using_link(12345)
  await read_nested_data_using_link('hello world')
  await read_nested_data_using_link(Ipfs.Buffer.from('=^.^='))
})
