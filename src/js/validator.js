export default function isValidInn(value) {
  const paramLuhn = controlLuhn(value);

  let paramLenght;
  if (value.length >= 14 && value.length <= 16) {
    paramLenght = true;
  } else {
    paramLenght = false;
  }

  const paramOnlyNumber = paramOnlyNumbers(value);

  const paramPay = paramPaySystem(value);

  return (paramLuhn && paramLenght && paramOnlyNumber && paramPay);
}

export function paramPaySystem(value) {
  if (paySystem(value) != null) {
    return true;
  }
  return false;
}

export function paySystem(value) {
  let payClass = null;
  if (/^4/.test(value)) {
    payClass = '.visa';
  } if (/^5[1-5]/.test(value)) {
    payClass = '.mastercard';
  } if (/^3[47]/.test(value)) {
    payClass = '.amex';
  } if (/^(?:2131|1800|35\d{3})\d{11}/.test(value)) {
    payClass = '.jcb';
  } if (/^2/.test(value)) {
    payClass = '.mir';
  } if (/^6(?:011|5)/.test(value)) {
    payClass = '.discover';
  } if (/^3(?:0[0-5]|[68])/.test(value)) {
    payClass = '.diners';
  }
  return payClass;
}

function paramOnlyNumbers(value) {
  const regex = /^[0-9]+$/;
  return regex.test(value);
}

export function controlLuhn(value) {
  let sum = 0;
  let even = false;
  if (value) {
    const temp = String(value).replace(/[^\d]/g, '');
    for (let i = temp.length - 1; i >= 0; i -= 1) {
      let int = parseInt(temp.charAt(i), 10);
      if (even) {
        int *= 2;
        if (int > 9) {
          int -= 9;
        }
      }
      sum += int;
      even = !even;
    }
    return (sum % 10) === 0;
  }
  return false;
}
