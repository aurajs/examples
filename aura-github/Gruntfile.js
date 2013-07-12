module.exports = function(grunt) {

  // Underscore
  // ==========
  var _ = grunt.util._;

  // Package
  // =======
  var pkg = grunt.file.readJSON('./package.json');

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: pkg,
    requirejs: {
      dist: {
        options: {
          baseUrl: '.',
          findNestedDependencies: true,
          removeCombined: false,
          optimize: 'none',
          paths: {
            underscore:   'components/underscore/underscore',
            jquery:       'components/jquery/jquery',
            eventemitter: 'components/eventemitter2/lib/eventemitter2',
            text:         'components/requirejs-text/text',
            aura:         'components/aura/lib',
            requirejs:    'components/requirejs/require',
            bootstrap:    'components/bootstrap.css/js/bootstrap',
            jquery:       'components/jquery/jquery'
          },
          shim: {
            underscore: { exports: "_" }
          },
          include: [
            'requirejs',
            'jquery',
            'underscore',
            'aura/aura',
            'aura/ext/mediator',
            'aura/ext/widgets',
            'aura/ext/debug',
            'text',
            'bootstrap'
          ],
          out: 'public/libs.js'
        }
      }
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.registerTask('default', ['requirejs']);

};
