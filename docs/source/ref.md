# Neuron Language Reference

## Objects and Functions
Objects and functions can be integrated. Neuronic Objects can hold both properties and methods accessable to itself and to other objects, providing it with a dynamic foundation for script execution. Objects and functions are defined in the following syntax:
```JavaScript
myObject {
  property: value;
  method(parameters);
}
```
Objects containing HTML- and CSS-specific properties should be invoked as such:
```JavaScript
invoke(myObject);
```
Functions are to be called as methods:
```JavaScript
myObject(parameters)
```
Functions with return values can be called as inline functions:
```JavaScript
[myObject => parameters]
```
Functions can also take parameters, prefixed with a `#` and the parameter number:
```JavaScript
absoluteValue {
  return([math.abs => #0]); // #0 defines the first parameter passed
}

log([absoluteValue => 0]);
// logs '0'
```
Functions can be executed with the following syntax as well:
```JavaScript
add {
  log(#0 + #1 is [#0 + #1]);
}

add(0, 1);
// logs '0 + 1 is 1'
```
