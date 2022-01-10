# dplayer-util

This is a nodejs script that takes in a directory path with music files and generates a folder that you can just pop into the JF-17 music folder with all the proper configurations and music file formats.

Note that JF-17's dplayer can only add up to 30 music files.

# Pre-requisites

NodeJs - https://nodejs.org/en/

FFmpeg - https://www.ffmpeg.org/download.html

# Usage

After installing the pre-requisite dependencies, run `npm install` in command line while in the dplayer-util directory. Then, simply put your music files into the music folder, run `node .\index.js`, and the script will write all the files you need to the **/output** directory.

# Supported Formats
`wav, mp3, m4a, flac` 
