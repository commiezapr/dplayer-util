const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

dataPath = "./data/";
output = "./output/";

effectsDir = output + "Mods/aircraft/JF-17/Sounds/Effects/Cockpit/DPlayer/";
sdefDir = output + "Mods/aircraft/JF-17/Sounds/sdef/";

sdefFormat = '--\nwave = \"/Effects/Cockpit/DPlayer/%s\"\ninner_radius = 10\nouter_radius = 100'

function makeDirectory(directory) {
    if(!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
}

makeDirectory(effectsDir);
makeDirectory(sdefDir);

var count = 1;

function writeSdef(fileName) {
    let content = `--\nwave = \"/Effects/Cockpit/DPlayer/${fileName}\"\ninner_radius = 10\nouter_radius = 100`;

    fs.writeFile(`${sdefDir}${fileName}.sdef`, content, err => {
       if(err) {
           console.error(err);
           return;
       } 
    });
}

fs.readdirSync(dataPath).forEach(file => {
    currentFileName = 'music_' + (count < 10?('0' + count):count);

    writeSdef(currentFileName);

    ffmpeg(dataPath+file).toFormat('wav').on('error', (err) => {
        console.error(err);
    }).on('progress', (progress) => {
        console.log('Processing: ' + progress.targetSize + ' KB converted');
    }).on('end', () => {
        console.log('Processing finished !');
    }).save(`${effectsDir}${currentFileName}.wav`);

    count++;
});