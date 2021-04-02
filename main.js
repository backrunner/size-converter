(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.convertFileSize = void 0;
    const sizeUnits = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
    const UNIT_BASE = 1024;
    const formatUnit = (unit) => {
        return unit === 'bytes' ? 'Bytes' : unit.toUpperCase();
    };
    const convertFileSize = (size, toUnit, unitBase) => {
        let formattedSize = size.toLowerCase().trim();
        let parsedSize = null;
        let currentUnit;
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
        }
        else {
            parsedSize = parsedSize * Math.pow(unitBase || UNIT_BASE, absDiff);
        }
        return {
            number: parsedSize,
            string: parsedSize + formatUnit(toUnit),
        };
    };
    exports.convertFileSize = convertFileSize;
});
