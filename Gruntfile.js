module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        watch: {
            scripts: {
                files: ['**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            jade: {
                files: ['views/*.jade'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: ['<%= watch.scripts.files %>']
        },
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    args: ['dev'],
                    nodeArgs: ['--debug'],
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });
                    },
                    env: {
                        PORT: '4000'
                    },
                    cwd: __dirname,
                    ignore: ['node_modules/**'],
                    ext: 'js',
                    watch: ['./'],
                    delay: 1000,
                    legacyWatch: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');

    // Default task(s).
    grunt.registerTask('default', ['nodemon', 'watch']);

};