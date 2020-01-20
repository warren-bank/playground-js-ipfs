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

  const create_directory = async (dirpath) => {
    await ipfs.files.mkdir(dirpath, {parents: true})
  }

  const write_text_files = async (dirpath) => {
    await ipfs.files.write(dirpath + '/cat.txt', Ipfs.Buffer.from('meow'), {create: true})
    await ipfs.files.write(dirpath + '/cow.txt', Ipfs.Buffer.from('mooo'), {create: true})
    await ipfs.files.write(dirpath + '/dog.txt', Ipfs.Buffer.from('woof'), {create: true})
  }

  const remove_files = async (dirpath, ...filenames) => {
    if (!filenames.length) return
    log(`removing files: ${JSON.stringify(filenames)}`)
    filenames = filenames.map(name => `${dirpath}/${name}`)
    if (filenames.length === 1)
      filenames = filenames[0]
    await ipfs.files.rm(filenames)
  }

  const remove_dir = async (dirpath) => {
    log(`recursively removing directory: '${dirpath}'`)
    await ipfs.files.rm(dirpath, {recursive: true})
  }

  const stat_dir = async (dirpath) => {
    const data = await ipfs.files.stat(dirpath)
    log(`stat '${dirpath}': ${JSON.stringify(data, null, 4)}`)
  }

  const ls_dir = async (dirpath) => {
    const data = await ipfs.files.ls(dirpath, {long: true})
    log(`ls '${dirpath}': ${JSON.stringify(data, null, 4)}`)
  }

  const get_top_dir = (path) => {
    let endIndex = path.indexOf('/', 1)
    return (endIndex === -1)
      ? path
      : path.substr(0, endIndex)
  }

  const $root = '/'
  const $path = '/foo/bar/baz'

  await create_directory($path)
  await write_text_files($path)

  await stat_dir($root)
  await ls_dir($root)
  await ls_dir($path)

  await remove_files($path, 'cat.txt', 'dog.txt')

  await stat_dir($root)
  await ls_dir($root)
  await ls_dir($path)

  await remove_dir(get_top_dir($path))

  await stat_dir($root)
  await ls_dir($root)
})
