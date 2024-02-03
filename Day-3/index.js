const { exec } = require('child_process');

function executeCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`Command stderr: ${stderr}`);
            return;
        }

        console.log(`Command output:\n${stdout}`);
    });
}

// Test Case
executeCommand('ls -la');
executeCommand('echo Hello World');