const log = (line) => {
  if (!line) return

  const output = document.getElementById('output')
  let message

  if (line.message) {
    message = `Error: ${line.message.toString()}`
    console.error(line)
  } else {
    message = line
  }

  if (message) {
    const node = document.createTextNode(`${message}\r\n`)
    output.appendChild(node)

    output.scrollTop = output.offsetHeight

    return node
  }
}
