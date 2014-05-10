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
                            mountFolder(connect, 'src/core'),
                            mountFolder(connect, 'src/public')
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'src/core'),
                            mountFolder(connect, 'src/public')
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
                        cwd: 'src/public',
                        dest: 'dist',
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
                        dot: true,
                        cwd: 'src/core',
                        dest: 'dist',
                        src: [
                            '**/*.js'
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
                        dest: 'dist/fonts',
                        src: [
                            '*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/scripts',
                        dest: 'dist/scripts',
                        src: [
                            '*.js'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/styles',
                        dest: 'dist/styles',
                        src: [
                            '*.css'
                        ]
                    }
                ]
            },
            images: {
                expand: true,
                cwd: 'src/public/images',
                dest: '.tmp/images/',
                src: '{,*/}*.{gif,webp,png,jpg}'
            },
            styles: {
                expand: true,
                cwd: 'src/public/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            fonts: {
                expand: true,
                cwd: 'src/public/bower_components/bootstrap/dist/fonts',
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
                'src/**/*.js', '!src/public/bower_components/**/*.js', 'README.md'
            ]
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'src/**/*.js',
                '!**/bower_components/**/*.js',
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
                        'src/public'
                    ]
                },
                files: {
                    '.tmp/styles/main.css': 'src/public/styles/main.less'
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/unit/server/**/*.js']
            }
        },
        ngtemplates: {
            '4yf': {
                src: 'src/public/views/**/*.html',
                dest: '.tmp/scripts/templates.js',
                options: {
                    url: function (url) {
                        return url.replace(/(src\/public\/views\/([\s\S]*?)\/)/, '').replace(/.html/, '');
                    }
                }
            }
        },
        processhtml: {
            dev: {
                files: {
                    '.tmp/index.html': ['src/public/index.html']
                }
            },
            dist: {
                files: {
                    'dist/index.html': ['src/public/index.html']
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/4yf/min.widgets.js': [
                        'src/core/**/*.js',
                        'src/public/**/*.js',
                        '!**/bower_components/**'
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
                    'src/core/models/**/*.js',
                    'src/public/viewModels/**/*.js',
                    'src/public/widgets/**/*.js',
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
                    '!src/server/**',
                    'test/unit/**/*.js',
                    '!test/unit/server/**'
                ],
                tasks: ['karma:unitAuto:run']
            },
            mocha: {
                files: [
                    'src/server/**/*.js',
                    'test/unit/server/**/*.js'
                ],
                tasks: ['mochaTest:test']
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
        function executeBuild() {
            require('time-grunt')(grunt);
            grunt.task.run([
                'version',
                'ngtemplates',
                'processhtml',
                'less'
            ]);
        });

    grunt.registerTask('test',
        'Testing jshint, unit and e2e tests',
        function executeTests() {
            grunt.task.run([
                'jshint',
                'karma:unit',
                'mochaTest:test',
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