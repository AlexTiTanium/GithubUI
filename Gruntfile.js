module.exports = function(grunt) {

    // Load Grunt tasks declared in the package.json file.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({

        /**
         * This will load in our package.json file so we can have access
         * to the project name and appVersion number.
         */
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Constants for the Gruntfile so we can easily change the path for our environments.
         */
        BASE_PATH: '',
        APPLICATION_PATH: 'app/',
        BUILD_PATH: 'build/',

        /**
         * A code block that will be added to our minified code files.
         * Gets the name and appVersion and other info from the above loaded 'package.json' file.
         * @example <%= banner.join("\\n") %>
         */
        banner: [
            '/*',
            '* Project: <%= pkg.name %>',
            '* Version: <%= pkg.appVersion %> (<%= grunt.template.today("yyyy-mm-dd") %>)',
            '* Development By: <%= pkg.developedBy %>',
            '* Copyright(c): <%= grunt.template.today("yyyy") %>',
            '*/'
        ],

        /**
         * Cleans or deletes our production folder before we create a new production build.
         */
        clean: {
            dist: ['<%= BUILD_PATH %>']
        },

        /**
         * Copies certain files over from the development folder to the production folder so we don't have to do it manually.
         */
        copy: {
            build:  {
                files: [
                    // Copy favicon.ico file from development to production
                    { expand: true, cwd: '<%= BASE_PATH %>', src: 'favicon.ico', dest: '<%= BUILD_PATH %>' },
                    // Copy the media folder from development to production
                    { expand: true, cwd: '<%= BASE_PATH %>', src: ['images/**'], dest: '<%= BUILD_PATH %>' },
                    // Copy bootstrap fonts
                    { expand: true, cwd: 'bower_components/bootstrap', src: ['fonts/**'], dest: '<%= BUILD_PATH %>' },
                    // Copy the index.html file from development to production
                    { expand: true, cwd: '<%= BASE_PATH %>', dest: '<%= BUILD_PATH %>', src: ['index.html'], filter: 'isFile', dot: true }
                ]
            }
        },

        /**
         * Prepends the banner above to the minified files.
         */
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner.join("\\n") %>',
                    linebreak: true
                },
                files: {
                    src: [
                        '<%= BUILD_PATH %>' + '/assets/app.min.js',
                        '<%= BUILD_PATH %>' + '/assets/app.min.css'
                    ]
                }
            }
        },

        /**
         * The useminPrepare part of the usemin plugin looks at the html file and checks for a build:js or build:css code block.
         * It will take those files found in the code block(s) and concat them together and then runs uglify for js and/or cssmin for css files.
         * useminPrepare requires grunt-contrib-uglify, grunt-contrib-concat, and grunt-contrib-cssmin plugins to be installed. Which is listed in the package.json file.
         *
         * The usemin part will remove the code block(s) and replace that area with the single file path in the html file.
         */
        useminPrepare: {
            html: ['<%= BASE_PATH %>' + 'index.html'],
            options: {
                dest: '<%= BUILD_PATH %>'// Moves the single concatenated files to production.
            }
        },
        usemin: {
            html: ['<%= BUILD_PATH %>' + 'index.html'],
            options: {
                dirs: ['<%= BUILD_PATH %>']
            }
        },

        /**
         * Css min options
         */
        cssmin:{
            options: {
                keepSpecialComments: false
            }
        },

        /**
         * The RequireJS plugin that will use uglify2 to build and minify our JavaScript,
         * templates and any other data we include in the require files.
         */
        requirejs: {
            compile: {
                options: {

                    mainConfigFile: '<%= APPLICATION_PATH %>' + 'main.js',
                    name: '../bower_components/almond/almond',
                    out: '<%= BUILD_PATH %>' + 'assets/app.min.js',
                    wrap: true,
                    useStrict: true,
                    preserveLicenseComments: false,
                    include: ['main', 'application'],
                    optimize: 'uglify2',
                    uglify2: {
                        output: {
                            beautify: false,
                            comments: false
                        },
                        compress: {
                            sequences: false,
                            global_defs: {
                                DEBUG: false
                            }
                        },
                        warnings: false,
                        mangle: true
                    }
                }
            }
        },

        /**
         * Stylus compile main css
         */
        stylus: {
            compile: {
                options: { compress: false },
                files: {
                    'styles/main.css': 'styles/main.styl'
                }
            }
        },

        /**
         * Replace requirejs to rjs
         */
        replace: {
            build: {
                src: ['<%= BUILD_PATH %>index.html'],
                overwrite: true,
                replacements: [{
                    from: '<script src="bower_components/requirejs/require.js" data-main="app/main">',
                    to: '<script src="./assets/app.min.js">'
                }]
            }
        },

        /**
         * Creates a node.js Express Server to test our code in a server like environment.
         * Note: We are using the watch task to keep the server running.
         */
        express: {
            dev: {
                options: {
                    port: 8000,
                    hostname: "0.0.0.1",
                    bases: [__dirname],
                    livereload: true
                }
            },
            build: {
                options: {
                    port: 8001,
                    hostname: "0.0.0.1",
                    bases: ['<%= BUILD_PATH %>'],
                    livereload: false
                }
            }
        },

        /**
         * Opens the index.html file in the default browser after the node.js Express Server is running.
         */
        open: {
            dev: {
                path: 'http://localhost:8000'
            },
            build: {
                path: 'http://localhost:8001'
            }
        },

        /**
         * Watches files and will run task(s) when files are changed. It will also reload/refresh the browser.
         */
        watch: {
            css: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= BASE_PATH %>' + 'styles/**/*.styl'
                ],
                tasks: ['stylus']
            },
            src: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= APPLICATION_PATH %>' + '**/*.js',
                    '<%= BASE_PATH %>' + 'index.html',
                    '<%= APPLICATION_PATH %>' + '**/*.html'
                ]
            }
        }

    });

    /**
     * Grunt tasks:
     *
     * grunt        (Will build production bundle)
     * grunt build  (Will build production bundle)
     * grunt watch  (Run stylus real time compilation)
     * grunt server (Run run dev environment)
     * grunt server-production (Build production bundle and run production env)
     */
    grunt.registerTask('default', [
        'build'
    ]);

    grunt.registerTask('server', [
        'stylus',
        'express:dev',
        'open:dev',
        'watch'
    ]);

    grunt.registerTask('server-production', [
        'build',
        'express:build',
        'open:build',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean',
        'copy',
        'stylus',
        'useminPrepare', 'concat', 'cssmin',
        'usemin',
        'requirejs',
        'replace',
        'usebanner'
    ]);

};