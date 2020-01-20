### [playground for js-ipfs](https://github.com/warren-bank/playground-js-ipfs)

#### Dependencies:

* [js-ipfs](https://github.com/ipfs/js-ipfs)
  - dual [MIT license](https://github.com/ipfs/js-ipfs/blob/master/LICENSE-MIT) and [Apache 2 license](https://github.com/ipfs/js-ipfs/blob/master/LICENSE-APACHE)
  - awesome!

#### Demos:

1. [add a UUID string to the in-memory blockstore, cat locally, download through a public HTTP gateway](https://warren-bank.github.io/playground-js-ipfs/demos/01-add-cat/1.%20uuid.html)
   - from [example](https://github.com/ipfs/js-ipfs/tree/master/examples/browser-script-tag)
2. [emulate a nested directory structure containing text files](https://warren-bank.github.io/playground-js-ipfs/demos/01-add-cat/2.%20wrap-with-directory.html)
   - from [example](https://proto.school/#/regular-files-api/05)
3. [play an mp4 video using a `ReadableStream`](https://warren-bank.github.io/playground-js-ipfs/demos/02-videostream/1.%20mp4.html)
   - from [example](https://github.com/ipfs/js-ipfs/tree/master/examples/browser-readablestream)
4. [read nested data using link](https://warren-bank.github.io/playground-js-ipfs/demos/03-dag/1.%20basics.html)
   - from ['basics' tutorial](https://proto.school/#/basics/03)
5. [traverse linked blog posts starting with most recent, print in reverse order starting with oldest](https://warren-bank.github.io/playground-js-ipfs/demos/03-dag/2.%20blog.html)
   - from ['blog' tutorial](https://proto.school/#/blog/07)
6. Mutable File System (MFS)
   - from [tutorial](https://proto.school/#/mutable-file-system)
     * ['stat' empty root directory](https://warren-bank.github.io/playground-js-ipfs/demos/04-mutable-files/1.%20stat-empty-root.html)
     * ['write' a text file in root directory](https://warren-bank.github.io/playground-js-ipfs/demos/04-mutable-files/2.%20write.html)
     * ['mkdir' a nested directory path, 'write' 3 text files in, 'mv' 2 text files out, 'cp' 1 remaining text file](https://warren-bank.github.io/playground-js-ipfs/demos/04-mutable-files/3.%20mkdir-mv-cp.html)
     * ['mkdir' a nested directory path, 'cp' text file from IPFS network, 'read' content of text file](https://warren-bank.github.io/playground-js-ipfs/demos/04-mutable-files/4.%20read.html)
     * ['mkdir' a nested directory path, 'write' 3 text files in, 'rm' 2 text files, recursively 'rm' directory and all remaining contents](https://warren-bank.github.io/playground-js-ipfs/demos/04-mutable-files/5.%20rm.html)
