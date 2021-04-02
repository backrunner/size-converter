const sizeUnits = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
const UNIT_BASE = 1024;

interface ConvertResult {
  number: number;
  string: string;
}

const formatUnit = (unit: string): string => {
  return unit === 'bytes' ? 'Bytes' : unit.toUpperCase();
};

export const convertFileSize = (size: string, toUnit: string, unitBase?: number): ConvertResult => {
  let formattedSize: string = size.toLowerCase().trim();
  let parsedSize: number | null = null;
  let currentUnit: string;
  for (const unit of sizeUnits) {
    if (formattedSize.includes(unit)) {
      currentUnit = unit;
      parsedSize = parseFloat(size.replace(unit, ''));
      if (isNaN(parsedSize)) {
        throw new Error('Size is invalid.');
      }
    }
  }
  if (!parsedSize) {
    throw new Error('Cannot convert input size to number.');
  }
  const currentUnitIndex = sizeUnits.findIndex((item) => item === currentUnit.toLowerCase());
  const toUnitIndex = sizeUnits.findIndex((item) => item === toUnit.toLowerCase());

  if (currentUnitIndex < 0 || toUnitIndex < 0) {
    throw new Error('File size unit is wrong.');
  }

  const diff = currentUnitIndex - toUnitIndex;
  const absDiff = Math.abs(diff);
  if (diff === 0) {
    return {
      number: parsedSize,
      string: parsedSize + formatUnit(toUnit),
    };
  }
  if (currentUnitIndex < toUnitIndex) {
    parsedSize = parsedSize / Math.pow(unitBase || UNIT_BASE, absDiff);
  } else {
    parsedSize = parsedSize * Math.pow(unitBase || UNIT_BASE, absDiff);
  }

  return {
    number: parsedSize,
    string: parsedSize + formatUnit(toUnit),
  };
};
