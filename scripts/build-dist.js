var sass = require('node-sass');
var fs = require('fs');

sass.render({
  file: './lib/styles/main.scss'
}, function(error, result) { // node-style callback from v3.0.0 onwards
  if(!error){
    fs.writeFile('./build/main.css', result.css, function(err){
      if(!err){
        console.log('css file written to disk')
      }
    });
  }
});