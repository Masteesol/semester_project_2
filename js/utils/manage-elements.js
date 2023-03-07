/*
Functions in this document:

createElement()
selectElement()
deleteElement()
modifyClassNames()
addListener()

Params can be entered in these ways, depending on what you think is the best(applicable for most of the functions, I think):

Array: [param, param, param]
Single Value: param

String: "param param param"
String: "param | param | param"
*/

/*

------selectElement() function-------

Multiple value params:
selectElement(["#selector", ".selector"])

Multiple value params, simplified:
selectElement("#selector .selector")

or

selectElement("#selector | .selector")

Single value param:
selectElement("#selector")

If collection type is entered as a param, then the function returns the DOM elements as array
*/
export function selectElement(selectorsInput) {
  const selectors = arrayFromString(selectorsInput);
  if (selectors) {
    if (Array.isArray(selectors)) {
      return selectors.map((selector) => {
        //if array element is an array and not single value
        if (Array.isArray(selector)) {
          return selector.map((innerElement) => {
            if (document.querySelector(innerElement)) {
              return document.querySelector(innerElement);
            }
          });
        } else {
          if (document.querySelector(selector)) {
            return document.querySelector(selector);
          } else {
            return false;
          }
        }
      });
    } else {
      return document.querySelector(selectors);
    }
  } else {
    console.log("selectElement(): null value entered");
  }
}

//------selectElement() function-------

export function deleteElement(selectorsInput) {
  const selectors = arrayFromString(selectorsInput);
  if (selectors) {
    if (Array.isArray(selectors)) {
      selectors.forEach((selector) =>
        document.querySelector(selector).remove()
      );
    } else {
      document.querySelector(selectors).remove();
    }
  } else {
    console.log("null value entered");
  }
}

/*
------createElement() function-------

param = string

createElement(Element Type, Classname(s), Attribute(s), Attribute Value(s), InnerText)

All single values:
createElement("param", "param", "param", "param", "param")

Using brackets:
createElement(param, [param, param, param], [param, param], [param, param], param)

All strings (simplified syntax):
createElement(param, "param param param", "param | param", "param | param", param)
*/

export function createElement(
  type,
  classNameInput = null,
  attributeTypeInput = null,
  attributeValueInput = null,
  textValue = null,
  htmlTemplate = null
) {
  const container = document.createElement(type);

  const [className, attributeType, attributeValue] = [
    classNameInput,
    attributeTypeInput,
    attributeValueInput,
  ].map((arg) => arrayFromString(arg));
  if (className) {
    if (Array.isArray(className)) {
      className.forEach((className) => {
        container.classList.add(className);
      });
    } else {
      container.classList.add(className);
    }
  }
  if (attributeType) {
    if (Array.isArray(attributeType)) {
      attributeType.forEach((att, index) => {
        container.setAttribute(att, attributeValue[index]);
      });
    } else {
      container.setAttribute(attributeType, attributeValue);
    }
  }
  if (textValue) {
    container.innerText = textValue;
  }
  if (htmlTemplate) {
    container.innerHTML = htmlTemplate;
  }
  return container;
}

/*
Syntax: modifyClassNames(html element, class name to add (array or single value), class name to remove (array or single value));

*/

export function modifyClassNames(
  elementInput,
  addClassNamesInput = null,
  removeClassNamesInput = null,
  swap = null
) {
  const [addClassNames, removeClassNames] = [
    addClassNamesInput,
    removeClassNamesInput,
  ].map((arg) => arrayFromString(arg));
  let element = elementInput;
  if (typeof elementInput === "string") {
    element = selectElement(arrayFromString(elementInput));
  }
  //console.log(element)
  if (element) {
    if (addClassNames) {
      // if entered array of classnames to be removed
      if (Array.isArray(addClassNames)) {
        //if array of elements is entered
        if (Array.isArray(element)) {
          addClassNames.forEach((className, index) => {
            //modifyClassNamesLogic("add", "array", index);
            if (!element[index].classList.contains(className)) {
              element.classList.add(className);
            }
          });
          //if entered single element is entered
        } else {
          addClassNames.forEach((className) => {
            if (!element.classList.contains(className)) {
              element.classList.add(className);
            }
          });
        }
        //if single classname is entered
      } else {
        // and array of elements
        if (Array.isArray(element)) {
          element.forEach((el) => {
            if (!el.classList.contains(addClassNames)) {
              el.classList.add(addClassNames);
            }
          });
          //if entered single element is entered
        } else {
          if (!element.classList.contains(addClassNames)) {
            element.classList.add(addClassNames);
          }
        }
      }
    }
    if (removeClassNames) {
      // if entered array of classnames to be removed
      if (Array.isArray(removeClassNames)) {
        //if array of elements is entered
        if (Array.isArray(element)) {
          removeClassNames.forEach((className, index) => {
            if (element[index].classList.contains(className)) {
              element.classList.remove(className);
            }
          });
          //if entered single element is entered
        } else {
          removeClassNames.forEach((className) => {
            if (element.classList.contains(className)) {
              element.classList.remove(className);
            }
          });
        }
        //if single classname is entered
      } else {
        // and array of elements, but single class values
        if (Array.isArray(element)) {
          element.forEach((el) => {
            if (el.classList.contains(removeClassNames)) {
              el.classList.remove(removeClassNames);
            }
          });
          //if entered single element is entered
        } else {
          if (element.classList.contains(removeClassNames)) {
            element.classList.remove(removeClassNames);
          }
        }
      }
    }
  } else {
    //console.log(`ModifyClassNames: HTML element with is null`)
    return false;
  }
}

//elementInput can either be the dom element or the selector for a dom element
export function addListener(elementInput, functionName, eventType = "click") {
  let element = elementInput;
  if (typeof elementInput === "string") {
    element = selectElement(arrayFromString(elementInput));
  }
  //console.log(element)
  if (element && functionName) {
    if (Array.isArray(element) && !Array.isArray(functionName)) {
      //arguments type: array, single value
      element.forEach((el) => el.addEventListener(eventType, functionName));
    } else if (Array.isArray(element) && Array.isArray(functionName)) {
      //arguments type: array, array
      element.forEach((el, index) => {
        if (Array.isArray(el)) {
          //if array element is also an array
          el.forEach((item) =>
            item.addEventListener(eventType, functionName[index])
          );
        } else {
          //if all array elements are single values
          el.addEventListener(eventType, functionName[index]);
        }
      });
    } else {
      element.addEventListener(eventType, functionName);
      //arguments type: single value, single value
    }
  } else {
    console.log(
      "addListener: Error: null value entered: ",
      element,
      "and",
      functionName
    );
  }
}

function arrayFromString(input) {
  //console.log(typeof input === "string", input)
  if (typeof input === "string") {
    if (input.includes("|")) {
      return input.replaceAll(" ", "").split("|");
    } else if (input.includes(" ")) {
      //if input is attribute using ": "
      if (input.includes(": ")) {
        return input;
      } else {
        return input.split(" ");
      }
    } else {
      return input;
    }
  } else {
    return input;
  }
}
