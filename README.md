# Parser Combinator Library for Parser Expression Grammars (PEG)

 The earlier parser combinator library was an experimental one and was for studying functonal Javscrript.
 This library, PEG.JS, is a fully functional one and can be used to to create parsers for any domain specific language 
 that can be expressed in terms of a parser expresion grammar.
 
 The code has been packaged in two forms-- one for use in browsers. This is available in the the folder, client_es5
 The other one is for use with node.js and is available in the folder "node".
 
 Two examples have been developed to demonstrate the usage.
 
 calc.js, which directly computes the value of a standard arithmetic expressiom
 calcAST.js , which produces an intermediate representation in terms of an abstract syntax tree and has two 
 computational functions-- one to compute the value of the expression from the AST and another to convert 
 the expression to a polish notation.
 
 This is an advanced version of the parser combinator library that I had used to explaining functional
 programming concepts in my book-- Deep Dive: The Magical World Of Functional Programming". The book is 
 available on kindle store, at a price that would,at most, cover the price of two cocktails in any pub! The easiest
 way to understand this code is to buy that book. Otherwise you can study calc.js and calcAST.js to understand the
 usage.
  

  
  
 
 The usage is the the same for both the versions. If you are studying the code, it is better to study refer to the
 files in node.
 

## Usage ( File peg.js)
 
 The file peg.js exports the following functions.  
 
 All the parser functions returned by these functions ( except entryPoint()) return a "token" data type. 
 Tokens can be od type "error", "unit", 'seq','rep' or 'mapped' ( see pegToken.js). 
 Token functions defined in pegtoken.js are straight forward. 
 
 
 
 1. empty()/emptyAbs()
 
 Returns a function that accepts a string is empty or not. The function empty() skips the leading
 whitespaces, while emptyAbs() does not.
 
 2. matcher(regEx)/matcherAbs(regEx)
 
 Returns a function that accepts a string and returns whether the string begins with the pattern defined by
 regEx. regEx must begin witha '^';  The function returned by matcher() skips leading whitespaces and the one returned by matcherabs() does not
 
 
 3. or(parser1, parser2)
 
 Returns  a parser function that accepts a string. The parser returned by or() returnsa valid token
 if one of the parsers ( parser1 or parser 2) matches the string
 
 4. seq(p1,p2,p3,...Pn)
 
 Returns a parser that determines whether a string matches that sequecn of parsers p1...pn. The parser
  function returned by  seq() returns an error if any of the parsers  ( p1,p1..pn) returns an error. Otherwise
  it retuns an array of values where each element corresponds to the return values of p1,p2..pn respectively.
  
  if p1 returns r1, p1 returns r2, .... pn returns rn then the parser function returns
  [r1,r2....rn] on success and a token or the type "error" otherwise.
 
 5. rep(parser)

This is repeated application of the same parser on a string after advancing the input string by the previous match.
The function returns an array in which each element represents a successful application of the the parser. If no matches are found
it returns an empty array.

6. map(parser,mapFn)

Returns a function that maps the result of a parser using mapFn. MapFn will receive a string if the parser has been created 
by a matcher(). If it has been created by seq or rep it will get an array. Please study the calc.js code to understand

7. entryPoint(parser)

Returns a function that acts as the entrypoint or the final parser in the PEG definition. The function returned
by entryPoint() returns an object of type {err, value}. If err is true then the value has the error string which
defines the position at whihc the rror was found. if err is false the value has the value as computed
successfully by the parser.

Please study calcAST.js to understand the usage.

## Developing



### Tools
 
 Created using Eclipse   
