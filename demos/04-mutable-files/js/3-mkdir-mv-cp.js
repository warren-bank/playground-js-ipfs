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

  const move_files = async (from, to, ...filenames) => {
    if (!filenames.length) return
    log(`moving files: ${JSON.stringify(filenames)}`)
    filenames = filenames.map(name => `${from}/${name}`)
    if (filenames.length === 1)
      filenames = filenames[0]
    await ipfs.files.mv(filenames, to)
  }

  const copy_files = async (from, to, ...filenames) => {
    if (!filenames.length) return
    log(`copying files: ${JSON.stringify(filenames)}`)
    filenames = filenames.map(name => `${from}/${name}`)
    if (filenames.length === 1)
      filenames = filenames[0]
    await ipfs.files.cp(filenames, to)
  }

  const stat_dir = async (dirpath) => {
    const data = await ipfs.files.stat(dirpath)
    log(`stat '${dirpath}': ${JSON.stringify(data, null, 4)}`)
  }

  const ls_dir = async (dirpath) => {
    const data = await ipfs.files.ls(dirpath, {long: true})
    log(`ls '${dirpath}': ${JSON.stringify(data, null, 4)}`)
  }

  const $root = '/'
  const $path = '/foo/bar/baz'

  await create_directory($path)
  await write_text_files($path)

  await stat_dir($root)
  await ls_dir($root)
  await ls_dir($path)

  await move_files($path, $root, 'cat.txt', 'dog.txt')

  await stat_dir($root)
  await ls_dir($root)
  await ls_dir($path)

  await copy_files($path, $root, 'cow.txt')

  await stat_dir($root)
  await ls_dir($root)
  await ls_dir($path)
})
