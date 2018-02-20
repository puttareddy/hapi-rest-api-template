
module.exports = function(grunt) {

    var tsFiles = ['src/**/*.ts','test/**/*.ts'];
    var jsFiles = ['build/src/**/*.js','build/test/unit/**/*.js'];
    var configFiles= ['Gruntfile.js','tslint.json','tsconfig.json','typings.json','package.json','nodemon.json'];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concurrent: {
            start:['watch','nodemon:dev'],
            ts:['tslint', 'ts', 'copy:config'],
            options: {
                logConcurrentOutput: true
            }
        },
        nodemon:{
            dev: {
                script: 'build/src/startup-dev.js',
                options:{
                    watch: [jsFiles],
                    interrupt: true
                }
            }
        },
        copy: {
            // copy the config file to build
            config: {
                cwd: 'src',
                src: 'config/*',
                dest: 'build/src/',
                expand: true,
            },
            // copy all *.js.maps to a sourceMap folder in builds
            sourceMaps: {
                cwd: 'build/', 
                src: ['src/**/*.js.map', 'test/**/*.js.map', '!sourceMaps/'],
                dest: 'build/sourceMaps',
                expand: true
            }
        },
        clean: {
            build: ['build/', 'sourceMaps/'],
            sourceMaps: ['build/src/**/*.js.map', 'build/test/**/*.js.map']
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                },
                src: ['build/test/unit/**/*.js']
            }
        },
        tslint: {
            options: {
                // can be a configuration object or a filepath to tslint.json
                configuration: "tslint.json"
            },
            files: {
                src: tsFiles
            }
        },
        ts: {
            dev: {
                tsconfig: true,
                src: tsFiles,
                outDir: 'build'
            }
        },
        mocha_istanbul: {
            coveralls: {
                src: ['build/test/unit'], // multiple folders also works
                options: {
                    coverage:false, // this will make the grunt.event.on('coverage') event listener to be triggered
                    coverageFolder: 'build/test/coverage',
                    check: {

                    },
                    excludes: ['*.js', 'routes/*.js'],
                    root: './build/src', // define where the cover task should consider the root of libraries that are covered by tests
                    reportFormats: ['json','lcovonly'],
                    print: 'summary'
                }
            }
        },
        remapIstanbul: {
            build: {
                src: 'build/test/coverage/coverage-final.json',
                options: {
                    reports: {
                        'html': 'build/test/coverage/html-report',
                        'json': 'build/test/coverage/coverage-final.json'
                    }
                }
            }
        },
        watch: {
            ts: {
                files :[tsFiles, configFiles],
                tasks:['concurrent:ts', 'copy:sourceMaps', 'clean:sourceMaps'],
                options: {
                    interrupt: true
                }
            },
            js : {
                files :[jsFiles],
                tasks:['mochaTest'],
                options: {
                    interrupt: true
                }
                
            }
        }
    });


    //Load Grunt tasks.
    grunt.loadNpmTasks('remap-istanbul');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    require('grunt-contrib-copy')(grunt);
    require('grunt-contrib-clean')(grunt);
    require('load-grunt-tasks')(grunt);

    /*Available grunt tasks*/
    grunt.registerTask('default', ['clean:build', 'concurrent:ts', 'copy:sourceMaps', 'clean:sourceMaps', 'concurrent:start']);

    grunt.registerTask('test', ['concurrent:ts','mocha_istanbul','remapIstanbul:build']);

    grunt.registerTask('build', ['concurrent:ts']);
};