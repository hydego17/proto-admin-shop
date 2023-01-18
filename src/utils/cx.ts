type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;
type ClassDictionary = Record<string, any>;
type ClassArray = ClassValue[];

function getVal(mix: any) {
  let k;
  let y;
  let str = '';

  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix;
  } else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          if ((y = getVal(mix[k]))) {
            str && (str += ' ');
            str += y;
          }
        }
      }
    } else {
      for (k in mix) {
        if (mix[k]) {
          str && (str += ' ');
          str += k;
        }
      }
    }
  }

  return str;
}

/**
 * clsx implementation utils.
 */
export function cx(...inputs: ClassValue[]) {
  let i = 0;
  let tmp;
  let x;
  let str = '';

  while (i < inputs.length) {
    if ((tmp = inputs[i++])) {
      if ((x = getVal(tmp))) {
        str && (str += ' ');
        str += x;
      }
    }
  }
  return str;
}
