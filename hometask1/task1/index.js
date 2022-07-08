process.stdin.on('data', data => {
    data = "\n" + data.reverse()
    process.stdout.write(data + "\n")
})
