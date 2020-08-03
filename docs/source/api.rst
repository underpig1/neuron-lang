Neuron API Reference
====================

Window API
^^^^^^^^^^
Properties
----------
``window.width``
    Returns the width of the current window
``window.height``
    Returns the height of the current window
Static Properties
-----------------
``window.event``
    Returns the event of the current window

Math API
^^^^^^^^
Static Properties
-----------------
``math.infinity``
    Returns the value of infinity
``math.pi``
    Returns the value of pi
``math.E``
    Returns the value of Euler's constant
Static Methods
-----------------
``[math.abs => x]``
    Returns the absolute value of ``x``
``[math.acos => x]``
    Returns the arccosine of ``x``
``[math.acosh => x]``
    Returns the hyperbolic arccosine of ``x``
``[math.asin => x]``
    Returns the arcsine of ``x``
``[math.asinh => x]``
    Returns the hyperbolic arcsine of ``x``
``[math.atan => x]``
    Returns the arctangent of ``x``
``[math.atanh => x]``
    Returns the hyperbolic arctangent of ``x``
``[math.atan2 => x y]``
    Returns the arctangent of the quotient of ``x`` and ``y``
``[math.cbrt => x]``
    Returns the cube root of ``x``
``[math.ceil => x]``
    Returns the smallest integer greater than or equal to ``x``
``[math.clz32 => x]``
    Returns the number of leading zeroes of the 32-bit integer ``x``
``[math.cos => x]``
    Returns the cosine of ``x``
``[math.cosh => x]``
    Returns the hyperbolic cosine of ``x``
``[math.fround => x]``
    Returns the nearest single precision float representation of ``x``
``[math.hypot => ...]``
    Returns the square root of the sum of squares of its arguments
``[math.imul => x y]``
    Returns the result of the 32-bit integer multiplication of ``x`` and ``y``
``[math.log => x]``
    Returns the natural logarithm of ``x``
``[math.log10 => x]``
    Returns the base-10 logarithm of ``x``
``[math.log2 => x]``
    Returns the base-2 logarithm of ``x``
``[math.max => ...]``
    Returns the largest of its arguments
``[math.min => ...]``
    Returns the smallest of its arguments
``[math.pow => x y]``
    Returns base ``x`` to the exponent power ``y``
``[math.random]``
    Returns a pseudo-random number between ``0`` and ``1``
``[math.round => x]``
    Returns ``x`` rounded to the nearest integer
``[math.sign => x]``
    Returns the sign of ``x``
``[math.sin => x]``
    Returns the sine of ``x``
``[math.sinh => x]``
    Returns the hyperbolic sine of ``x``
``[math.sqrt => x]``
    Returns the positive square root of ``x``
``[math.tan => x]``
    Returns the tangent of ``x``
``[math.tanh => x]``
    Returns the hyperbolic tangent of ``x``
``[math.trunc => x]``
    Returns the integer portion of ``x``

JSON API
^^^^^^^^
Static Methods
-----------------
``[json.parse => json]``
    Returns the object represented by ``json``
``[json.string => json]``
    Returns the string value of ``json``

RegExp API
^^^^^^^^^^
Static Methods
-----------------
``[re.match => string regexp]``
    Returns the matching string against the regular expression
``[re.replace => string regexp string]``
    Returns the string value, replacing the matching strings against the regular expression

Time API
^^^^^^^^
Static Properties
-----------------
``time.now``
    Returns the numeric value corresponding to the current time
``time.day``
    Returns the numeric value corresponding to the current day of the week
``time.year``
    Returns the numeric value corresponding to the current year
``time.hour``
    Returns the numeric value corresponding to the current hour
``time.milliseconds``
    Returns the numeric value corresponding to the current millisecond
``time.minutes``
    Returns the numeric value corresponding to the current minute
``time.month``
    Returns the numeric value corresponding to the current month
``time.seconds``
    Returns the numeric value corresponding to the current second
``time.time``
    Returns the numeric value corresponding to the current time
``time.timezone``
    Returns the time-zone offset in minutes for the current locale
``time.UTC``
    Returns the numeric value corresponding to the current day of the month according to universal time
