module.exports = function(grunt) {

	grunt.initConfig({
		watch: {
			jade: {
				files: ['views/**'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['public/js/**', 'model/**/*.js', 'schema/**/*.js'],
				// tasks: ['jshint'],
				options: {
					livereload: true
				}
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				ignores: ['public/libs/**/*.js', 'node_modules/**/*.js']
			},
			all: ['public/js/*.js', 'test/**/*.js', 'app/**/*.js']
		},
		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					'public/build/index.css': 'public/less/index.less'
				}
			}
		},
		uglify: {
			development: {
				files: {
					'public/build/admin.min.js': 'public/js/admin.js',
					'public/build/detail.min.js': [
						'public/js/detail.js'
					],
					'public/build/list.min.js': 'public/js/list.js',
					'public/build/validate.min.js': 'public/js/validate.js'
				}
			}
		},
		nodemon: {
			dev: {
				options: {
					file: 'app.js',
					args: [],
					ignoredFiles: ['README.md', 'node_modules/*', '.DS_Store'],
					watchedExtensions: ['js'],
					watchedFolders: ['app', 'config'],
					debug: true,
					delayTime: 1,
					env: {
						PORT: 3000
					},
					cwd: __dirname
				}
			}
		},
		concurrent: {
			tasks: ['nodemon', 'watch', 'less', 'uglify'/*, 'jshint'*/],
			options: {
				logConcurrentOutput: true
			}
		},
		mochaTest: {
			src: 'test/**/*.js',
			options: {
				reporter: 'spec'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['concurrent']);
	grunt.registerTask('test', ['mochaTest']);
}