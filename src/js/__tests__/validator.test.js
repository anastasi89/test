import isValidInn, { paySystem } from '../validator';

test.each([
  ['', false],
  ['7000123456785947', false],
  ['4276807014926747', false],
  ['4276844027850990', false],
  ['2202200112561350', true],
  ['4000123456789017', true],
  ['5412751234123452', true],
  ['3540123456789016', true],
  ['30220298952472', true],
  ['6011004440227649', true],
  ['378742263945793', true],
  ['4000123456891a', false],
  ['427680014989-543', false],
  ['4000123456563', false],
  ['4009878,456776', false],
])(
  ('name validator for %s'),
  (numberCard, expecting) => {
    const result = isValidInn(numberCard);
    expect(result).toBe(expecting);
  },
);

test.each([
  ['2202200112566720', '.mir'],
  ['4000123456788671', '.visa'],
  ['5412751234129088', '.mastercard'],
  ['3540123456785444', '.jcb'],
  ['30220298953232', '.diners'],
  ['6011004440225643', '.discover'],
  ['378742263946777', '.amex'],
])(
  ('name validator for %s'),
  (numberCard, expecting) => {
    const result = paySystem(numberCard);
    expect(result).toBe(expecting);
  },
);
