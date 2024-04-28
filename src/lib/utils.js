// https://stackoverflow.com/questions/33036487/one-liner-to-flatten-nested-object
// $roots keeps previous parent properties as they will be added as a prefix for each prop.
// $sep is just a preference if you want to seperate nested paths other than dot.
// export const flatten = (obj, roots = [], sep = '.') => Object
//   // find props of given object
//   .keys(obj)
//   // return an object by iterating props
//   .reduce((memo, prop) => Object.assign(
//     // create a new object
//     {},
//     // include previously returned object
//     memo,
//     Object.prototype.toString.call(obj[prop]) === '[object Object]'
//       // keep working if value is an object
//       ? flatten(obj[prop], roots.concat([prop]), sep)
//       // include current prop and value and prefix prop with the roots
//       : {[roots.concat([prop]).join(sep)]: obj[prop]}
//   ), {})

export const flatten = (obj, keys = [], separator = ".") => {
  return Object.keys(obj).reduce((memo, prop) => {
    const value = obj[prop];
    const nextKeys = keys.concat([prop]);
    const isObject =
      Object.prototype.toString.call(value) === "[object Object]";

    if (isObject) {
      return {
        ...memo,
        ...flatten(value, nextKeys, separator)
      };
    }

    const isArray = Array.isArray(value);
    if (isArray) {
      const arrayToObject = value.reduce((obj, cur, index) => {
        obj[index] = cur;
        return obj;
      }, {});

      return {
        ...memo,
        ...flatten(arrayToObject, nextKeys, separator)
      };
    }

    return { ...memo, [nextKeys.join(separator)]: value };
  }, {});
};
