# Neuron Language Reference

## Objects and Functions
Objects and functions can be integrated. Neuronic Objects can hold both properties and methods accessable to itself and to other objects, providing it with a dynamic foundation for script execution. Objects and functions are defined in the following syntax:
```javascript
myObject {
  property: value;
  method(parameters);
}
```
Objects can hold both properties and methods, accessible to itself and to other objects:
```javascript
myObject {
  width: 1px;
  height: 1px;
  position: 10px 10px;
  log(this.position);
}

log(myObject.position);
```
Objects containing HTML- and CSS-specific properties should be invoked as such:
```javascript
invoke(myObject);
```
Functions can be called as methods:
```javascript
myObject(parameters)
```
Functions with return values can be called as inline functions:
```javascript
[myObject => parameters]
```
Functions can also take parameters, prefixed with `#` and followed by their parameter number:
```javascript
absoluteValue {
  return([math.abs => #0]); // #0 defines the first parameter passed
}

log([absoluteValue => 0]);
// logs '0'
```
Functions can be executed with the following syntax as well:
```javascript
add {
  log(#0 + #1 is [#0 + #1]);
}

add(0, 1);
// logs '0 + 1 is 1'
```

## Bracket Notation
Groupings, literals, and inline functions are all preceded by and followed by brackets. Bracket notation is defined by the following syntax:
```javascript
[function => parameters]
[function parameters]
[literal]
[grouping]
```
Bracket notation can be embedded in parameters or values:
```javascript
log([function => parameters]px, [grouping]px)
```
### Groupings
Parameters are seperated by commas or spaces. Bracket notation can escape parameter seperators, and pass a single parameter.
```javascript
log(Hello, World!) // The parameter seperator is not escaped
// logs 'Hello' and 'World!' in 'Hello World!'
log([Hello, World!]) // Bracket notation
// logs 'Hello, World!'
```
### Literals
Literals evaluate its contents.
```javascript
log(0 + 1) // Evaluated as a string
// logs '0 + 1'
log([0 + 1]) // Evaluated as a literal
// logs '1'
```
### Inline Functions
Inline functions can pass parameters to a function with a return value, seperated by spaces.
```javascript
[function => parameters]
```
```javascript
log([math.sqrt => 1]px);
```

## Variables and Assignments
Variables can be defined with the following syntax:
```javascript
#myVar = value
```
Variables can then be referenced or reassigned:
```javascript
log(#myVar);
#myVar = value;
```
Object properties can be referenced and reassigned as well:
```javascript
log(myObject.position);
myObject.position = value;
```

## Conditionals
Conditionals can be defined with the following syntax:
```javascript
if (condition) {
  // contents
}
```
The conditional will execute if the condition returns `true`.
### Operators
Conditions can contain the following operators:

`<`
Less than operator
`>`
Greater than operator
`<=`
Less than or equal to operator
`>=`
Greater than or equal to operator
