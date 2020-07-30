# Neuron Language Reference

## Objects and Functions
Objects and functions can be integrated. Neuronic Objects can hold both properties and methods accessable to itself and to other objects, providing it with a dynamic foundation for script execution. Objects and functions are defined in the following syntax:
```javascript
myObject {
  property: value;
  method(parameters);
}
```
Objects containing HTML- and CSS-specific properties should be invoked as such:
```javascript
invoke(myObject);
```
Functions are to be called as methods:
```javascript
myObject(parameters)
```
Functions with return values can be called as inline functions:
```javascript
[myObject => parameters]
```
Functions can also take parameters, prefixed with a `#` and the parameter number:
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

```eval_rst
Functions can be executed with the following syntax as well:
  Functions can be executed with the following syntax as well:
```
