export const ValidateNumber = (number: string, change: () => Promise<void>) => {
  let i = '(';
  if (!number.includes('(')) {
    number = '(' + number;
  }
  if (!number.includes(')') && number.length > 4) {
    let strBefore = number.slice(0, 4);
    let strAfter = number.slice(4);
    number = strBefore + ')' + strAfter;
  }
  if (!number.includes(' ') && number.length > 5) {
    let strBefore = number.slice(0, 5);
    let strAfter = number.slice(5);
    number = strBefore + ' ' + strAfter;
  }
  if (!number.includes('-') && number.length > 9) {
    let strBefore = number.slice(0, 9);
    let strAfter = number.slice(9);
    number = strBefore + '-' + strAfter;
  }
  if (number.length > 12 && (number.match(/-/g) || []).length < 2) {
    let strBefore = number.slice(0, 12);
    let strAfter = number.slice(12);
    number = strBefore + '-' + strAfter;
  }
};
