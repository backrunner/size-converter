# size-converter

Simply convert a file size from an unit to another unit.

## Usage

Install it with `npm install size-converter`, then use it in your project like this:

```javascript
const { convertFileSize } = require('size-converter');

console.log(convertFileSize('2kb', 'bytes'));
// { "number": 2048, "string": "2048Bytes" }
```

IMPORTANT: In this tool, all the units in the parameter will be regard as "Byte", "Bit" is not be supported.

## Reference

### convertFileSize

`convertFileSize: (fileSize: string, toUnit: string, unitBase?: number): ConvertedSize`

The default `unitBase` is `1024`, you can set it to `1000` or sth else.

## ConvertedSize

Including properties named `number` and `string`, number is the file size in `toUnit` without the unit itself, just a number.

The string is a human-readable file size string in `toUnit`.

## License

MIT
