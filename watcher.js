var path = require('path')
var spawn = require('child_process').spawn
var watch = require('watch')

var started = false

var solutionsPath = path.join(__dirname, 'solutions')
watch.watchTree(solutionsPath, {
  ignoreDotFiles: true,
  filter: function (f, fstat) {
    if (f.charAt(0) == '.') return true
    if (fstat.isDirectory()) return false
    if (f.match(/\.(js|py|go|m)$/)) {
      return false
    }
    return true
  }
}, function (f, curr, prev) {
  if (prev === null && curr === null) {
    return
  }

  if (curr.nlink !== 0) {
    runFile(f)
  }
})

function runFile(filename) {
  var matches = filename.match(/\.(js|py|go|m)$/)
  if (!matches) return

  var commands
  switch (matches[1]) {
    case "m":
      commands = getCommandsObjectiveC(filename)
      break;
    case "js":
      commands = getCommandsJs(filename)
      break;
    case "py":
      commands = getCommandsPython(filename)
      break;
    case "go":
      commands = getCommandsGo(filename)
      break;
    default:
      throw new Error("No support for type", matches[1])
  }

  runCommands(filename, commands)
}

function runCommands(filename, commands) {
  if (!commands.length) return

  var shortFilename = filename.split('/').pop()
  var command = commands.shift()
  var proc = spawn(command.command, command.args)
  proc.stdout.on('data', function (data) {
    console.log(shortFilename + ' (stdout): ' + data);
  });

  proc.stderr.on('data', function (data) {
    console.log(shortFilename + ' (stderr): ' + data);
  });

  proc.on('close', function (code) {
    runCommands(shortFilename, commands)
  });
}

function getCommandsJs(filename) {
  return [
    {
      command: 'node',
      args: [ filename ]
    }
  ]
}

function getCommandsPython(filename) {
  return [
    {
      command: 'python',
      args: [ filename ]
    }
  ]
}

function getCommandsGo(filename) {
  return [
    {
      command: 'go',
      args: ['run', filename]
    }
  ]
}

function getCommandsObjectiveC(filename) {
  var parts = filename.split('/')
  parts = parts.pop().split('.')
  var outFile = './' + parts[0]
  return [
    {
      command: 'clang',
      args: ['-fobjc-arc', '-framework', 'Foundation', filename, '-o', outFile]
    },
    {
      command: outFile,
      args: []
    },
    {
      command: 'rm',
      args: [outFile]
    }
  ]
}