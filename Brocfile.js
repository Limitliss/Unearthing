var BroccoliSass = require('broccoli-sass');
var Funnel = require('broccoli-funnel');
var Concat = require('broccoli-concat');
var MergeTrees = require('broccoli-merge-trees');
var BroccoliBabel = require('broccoli-babel-transpiler');

var projectFiles = "theme";

var scssFiles = new Funnel(projectFiles,{
  srcDir:'scss',
});

var jsFiles = new Funnel(projectFiles,{
  srcDir:'js',
});

var templatesFiles = new Funnel(projectFiles,{
  srcDir:'templates',
  destDir:'.'
});

var assetsFiles = new Funnel(projectFiles,{
  srcDir:'assets',
  destDir:'.'
});

scssFiles = new BroccoliSass([scssFiles], 'application.scss', 'css/screen.css');

jsFiles = BroccoliBabel(jsFiles, {
    filterExtensions:['js']
});

jsFiles = Concat(jsFiles, {
  inputFiles: ['*.js'],
  outputFile: '/js/theme.js'
})

assetsTree = MergeTrees([jsFiles,scssFiles,assetsFiles])

assetsTree = new Funnel(assetsTree,{
  srcDir:'.',
  destDir:'assets'
});

module.exports = MergeTrees([assetsTree,templatesFiles])
