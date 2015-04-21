var fs = require('fs');
var zero = require('markzero');

var text = fs.readFileSync('README.md', 'utf-8');

var tokens = zero.Lexer.lex(text);
// console.log(tokens);

console.log( zero.MarkdownRenderer() );
