/*
 * For Your Feed (4YF)
 * Version: 0.1.0
 *
 * Copyright (c) 2014.
 */
'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        concurrent: {
            server: [
                'copy:styles',
                'copy:images',
                'copy:fonts'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'copy:fonts',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
        connect: {
            options: {
                port: 9000,
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'src')
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'src')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'dist')
                        ];
                    }
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '**/*.js',
                            '**/*.html',
                            '*.{ico,png,txt}',
                            '.htaccess',
                            'bower_components/**/*',
                            'images/{,*/}*.{gif,webp,png,jpg}',
                            'styles/fonts/*',
                            '!index.html'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/images',
                        src: [
                            'generated/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/fonts',
                        dest: '<%= yeoman.dist %>/fonts',
                        src: [
                            '*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/scripts',
                        dest: '<%= yeoman.dist %>/scripts',
                        src: [
                            '*.js'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/styles',
                        dest: '<%= yeoman.dist %>/styles',
                        src: [
                            '*.css'
                        ]
                    }
                ]
            },
            images: {
                expand: true,
                cwd: '<%= yeoman.app %>/images',
                dest: '.tmp/images/',
                src: '{,*/}*.{gif,webp,png,jpg}'
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            fonts: {
                expand: true,
                cwd: '<%= yeoman.app %>/bower_components/bootstrap/dist/fonts',
                dest: '.tmp/fonts/',
                src: '{,*/}*.*'
            },
            templates: {
                expand: true,
                cdw: '.tmp/scripts/',
                src: '{,*/}*.js'
            }
        },
        coveralls: {
            options: {
                'coverage_dir': 'coverage',
                force: true,
                recursive: true
            }
        },
        groc: {
            options: {
                out: './'
            },
            javascript: [
                'src/**/*.js', '!src/bower_components/**/*.js', 'README.md'
            ]
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'src/**/*.js',
                '!src/bower_components/**/*.js',
                'test/**/*.js'
            ]
        },
        karma: {
            unit: {
                configFile: 'test/unit.karma.conf.js',
                singleRun: true
            },
            unitAuto: {
                configFile: 'test/unit.karma.conf.js',
                background: true
            }
        },
        less: {
            main: {
                opions: {
                    paths: [
                        'src'
                    ]
                },
                files: {
                    '.tmp/styles/main.css': 'src/styles/main.less'
                }
            }
        },
        ngtemplates: {
            '4yf': {
                src: 'src/views/**/*.html',
                dest: '.tmp/scripts/templates.js',
                options: {
                    url: function (url) {
                        return url.replace(/(src\/views\/([\s\S]*?)\/)/, '').replace(/.html/, '');
                    }
                }
            }
        },
        processhtml: {
            dev: {
                files: {
                    '.tmp/index.html': ['src/index.html']
                }
            },
            dist: {
                files: {
                    'dist/index.html': ['src/index.html']
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/enofjs/min.class.js': [
                        'src/ClassFactory.js'
                    ],
                    'dist/enofjs/min.enof.js': [
                        'src/*.js'
                    ]
                }
            }
        },
        version: {
            options: {
                prefix: 'Version: |\"version\": \"'
            },
            defaults: {
                src: [
                    '*.js',
                    'bower.json',
                    'src/**/*.js|html',
                    'test/**/*.js',
                    '!**/lib/**',
                    '!**/bower_components/**'
                ]
            }
        },
        watch: {
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'src/index.html',
                    '.tmp/**/*.*',
                    'src/models/{,*/}*.js',
                    'src/viewModels/{,*/}*.js',
                    'src/widgets/**/{,*/}*.js',
                    'src/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
            ngtemplates: {
                files: [
                    'src/views/**/*.html'
                ],
                tasks: ['ngtemplates']
            },
            karma: {
                files: [
                    'src/**/*.js',
                    'test/unit/**/*.js'
                ],
                tasks: ['karma:unitAuto:run']
            },
            styles: {
                files: [
                    'src/**/*.less'
                ],
                tasks: ['less']
            },
            updateIndex: {
                files: [
                    'src/index.html'
                ],
                tasks: ['processhtml']
            }
        }
    });

    grunt.registerTask('build',
        'Build all necessary files to actually be able to run the application',
        [
            'version',
            'ngtemplates',
            'processhtml',
            'less'
        ]);

    grunt.registerTask('test',
        'Testing jshint, unit and e2e tests',
        function executeTests() {
            require('time-grunt')(grunt);
            grunt.task.run([
                'jshint',
                'karma:unit',
                'uglify'
            ]);
        });

    grunt.registerTask('run',
        'Run the application with livereload and test watching',
        [
            'build',
            'connect:livereload',
            'karma:unitAuto',
            'watch'
        ]);

    grunt.registerTask('default', [
        'build',
        'test'
    ]);
};