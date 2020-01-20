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

  const get_filepath = (dirpath, filename) => `${dirpath}/${filename}`

  const copy_text_file = async (cid, filepath) => {
    await ipfs.files.cp(`/ipfs/${cid}`, filepath)
  }

  const read_text_file = async (filepath) => {
    const buffer = await ipfs.files.read(filepath)
    const text   = buffer.toString('utf8')
    log('read file:')
    log(`  path: '${filepath}'`)
    log(`  text: '${text}'`)
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
  const $name = 'hello-world.txt'

  await create_directory($path)
  await copy_text_file('QmXgZAUWd8yo4tvjBETqzUy3wLx5YRzuDwUQnBwRGrAmAo', get_filepath($path, $name))

  await stat_dir($root)
  await ls_dir($root)
  await ls_dir($path)

  await read_text_file(get_filepath($path, $name))
})
