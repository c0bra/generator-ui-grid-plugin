
var url = require('url');

var repo = "https://github.com/c0bra/ui-grid-plugin-skeleton.git";
var name = 'c0bra';
var pass = 'password';

var parsed = url.parse(repo);

parsed.auth = name + ':' + pass;

// console.log( 'https://' + name + ':' + pass + '@' + url );
// console.log(url.parse(repo));

console.log(url.format(parsed));
