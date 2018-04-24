const { exec } = require('child_process');

exec('yo alchmy', (err, stdout, stderr) => {
    if (err) {
        console.log('ERROR:');
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});
