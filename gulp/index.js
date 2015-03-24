var gulp = require('gulp');

require('gulp-tasks-riq/browserify-omega')({
    bundleConfigs: [
        {
            entries: ['./index.js'],
            output: 'bundle.js'
        }
    ],
    dest: './release'
});