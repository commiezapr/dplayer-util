const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

dataPath = "./music/";
output = "./output/";

const supportedFormats = ['.mp3', '.flac', '.m4a', '.wav'];
const effectsDir = output + "Mods/aircraft/JF-17/Sounds/Effects/Cockpit/DPlayer/";
const sdefDir = output + "Mods/aircraft/JF-17/Sounds/sdef/Cockpit/DPlayer/";
const sdefFormat = '--\nwave = \"/Effects/Cockpit/DPlayer/%s\"\ninner_radius = 10\nouter_radius = 100';

function makeDirectory(directory) {
    if(!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    } else {
        console.log("Output folder already exists, deleting it...");
        fs.rmSync(output,  { recursive: true });
        fs.mkdirSync(directory, { recursive: true });
    }
}

makeDirectory(effectsDir);
makeDirectory(sdefDir);

var count = 1;

//write the sdef file needed for the game to see the music file
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
    if(supportedFormats.includes(path.extname(file))) {
        currentFileName = 'music_' + (count < 10?('0' + count):count);

        writeSdef(currentFileName);

        if(path.extname(file) != '.wav') { //convert the file to wav if it is not already one
            ffmpeg(dataPath + file).toFormat('wav').on('error', (err) => {
                console.error(err);
            }).on('end', () => {
                console.log(`Converted ${file}`);
            }).save(`${effectsDir}${currentFileName}.wav`);
        } else { //file is already a wav, just copy
            fs.copyFileSync(dataPath+file, `${effectsDir}${currentFileName}.wav`);
            
            console.log(`Copied ${dataPath+file}`);
        }

        count++;
    }
});