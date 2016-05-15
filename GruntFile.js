module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);
    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'public/javascripts/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    React:true
                }
            }
        },
        watch: {
            files: ['views/jsx/*.jsx'],
            tasks: ['babel']
        },
        bowerInstall: {

            target: {

                // Point to the files that should be updated when 
                // you run `grunt bower-install` 
                src: [
                    'public/*.html'
                ],

                // Optional: 
                // --------- 
                cwd: '',
                dependencies: true,
                devDependencies: false,
                exclude: [],
                fileTypes: {},
                ignorePath: '',
                overrides: {}
            }
        },
        babel: {
            options: {
                plugins: ['transform-react-jsx'], // npm install babel-plugin-transform-react-jsx
                presets: ['es2015', 'react'] // npm install babel-preset-es2015 babel-preset-react
            },
            jsx: {
                files: [{
                    expand: true,
                    cwd: 'views/jsx',
                    src: ['*.jsx'],
                    dest: 'public/javascripts/react/',
                    ext: '.js'
                }]
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-install');
    grunt.registerTask('default', ['jshint','babel']);

};
