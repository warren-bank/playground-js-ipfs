document.addEventListener('DOMContentLoaded', async () => {
  const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() })
  window.node = node

  const status = node.isOnline() ? 'online' : 'offline'

  console.log(`Node status: ${status}`)
  document.getElementById('status').innerHTML = `Node status: ${status}`

  // You can write more code here to use it. Use methods like
  // node.add, node.get. See the API docs here:
  // https://github.com/ipfs/interface-ipfs-core

  async function addFile () {
    const filesAdded = await node.add('d9614251-93fc-444a-8de8-72917c2e2f75-7147934a-b8b5-4283-9708-96440ee2d848')
    filesAdded.forEach((file) => console.log('successfully stored', file.hash))
  }

  async function catFile () {
    const data = await node.cat('QmNx6LZ1DQnN7gKBvwLxnSnY4zjxbadZ2Jd8o554zmBguW')
    console.log(data.toString())
  }

  async function add_then_cat () {
    await addFile()
    await catFile()
  }

  async function count_peers () {
    const peerInfos = await node.swarm.peers()
    const count     = peerInfos.length
    const peerIds   = peerInfos.map(info => info.peer._idB58String)
    console.log('peers:', {count, peerIds, peerInfos})
  }

  add_then_cat()
  setInterval(count_peers, 10000)
})
