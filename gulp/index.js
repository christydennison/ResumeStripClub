var gulp = require('gulp'),
    fs = require('fs'),
    tasks = fs.readdirSync('./gulp/tasks/');

require('gulp-tasks-riq/browserify-omega')({
    bundleConfigs: [
        {
            entries: ['./app.js'],
            output: 'bundle.js'
        }
    ],
    dest: './release'
});

tasks.forEach(function (task) {
    require('./tasks/' + task);
});