Neuron Standard Properties Reference
====================================

Static Methods
-----------------
``[colorspaces.hextorgba => hex]``
    Returns the RGBA value of ``hex``
``[int? => x]``
    Returns a boolean corresponding to the value of ``x``, if ``x`` is an integer
``[bool? => x]``
    Returns a boolean corresponding to the value of ``x``, if ``x`` is a boolean
``[concatenate => x y]``
    Returns a string with the concatenated value of ``x`` and ``y``
``[length? => string]``
    Returns the length of ``string``
``[includes? => string value]``
    Returns a boolean corresponding to the value of ``string``, if ``string`` includes ``value``
``[upcase => string]``
    Returns a string corresponding to the uppercased value of ``string``
``[downcase => string]``
    Returns a string corresponding to the lowercased value of ``string``
``[input]``
    Returns the value of a prompt, containing the user input

Static Properties
-----------------
``inherited(object)``
    The inheritance property
``setProperty(object, property, value)``
    Sets the property of the given object to the passed value
``fill(r, g, b, a)``
    Sets the fill property to the values passed
``stroke(object, property, value)``
    Sets the stroke property to the values passed
``position(x, y)``
    Sets the position property to the values passed
``width(x)``
    Sets the width property to the values passed
``height(x)``
    Sets the height property to the values passed
``polygon([x, y]...)``
    Sets the polygon property containing the passed values; generates a polygon containing the passed values
``value(value)``
    The shorthand variable value property
``return(value)``
    Returns the given value
``gradient([color]...)``
    Sets the gradient property containing the passed values; generates a gradient containing the passed values
``image(url)``
    Sets the polygon property containing the passed values; generates an image containing the passed values
``alert(value)``
    Produces an alert in the current window containing the given value
``window(value)``
    Produces a new window
``invoke(object)``
    Invokes the given object
``onclick([redirect/log/alert/...], value)``
    Executes the given function once clicked
``appendProperty(object, property, value)``
    Appends a property with the passed value to the given object
``redirect(url)``
    Redirects the page to the given URL
