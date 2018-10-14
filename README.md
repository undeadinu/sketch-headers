# Sketch Headers

**Headers from [Sketch app](http://www.sketchapp.com) and macOS exported using [class-dump](http://stevenygard.com/projects/class-dump/).**

## History

| Version        | Compare           | Patch  |
| -------------- | ----------------- | ------ |
| [52](https://github.com/skpm/sketch-headers/tree/52) | [51.1...52](https://github.com/skpm/sketch-headers/compare/51.1...52) | [51.1...52](https://github.com/skpm/sketch-headers/compare/51.1...52.diff) |
| [51.1](https://github.com/skpm/sketch-headers/tree/51.1) | [51...51.1](https://github.com/skpm/sketch-headers/compare/51...51.1) | [51...51.1](https://github.com/skpm/sketch-headers/compare/51...51.1.diff) |
| [51](https://github.com/skpm/sketch-headers/tree/51) | [50.1...51](https://github.com/skpm/sketch-headers/compare/50.1...51) | [50.1...51](https://github.com/skpm/sketch-headers/compare/50.1...51.diff) |
| [50.1](https://github.com/skpm/sketch-headers/tree/50.1) | [50...50.1](https://github.com/skpm/sketch-headers/compare/50...50.1) | [50...50.1](https://github.com/skpm/sketch-headers/compare/50...50.1.diff) |
| [50](https://github.com/skpm/sketch-headers/tree/50) | [50-beta1...50](https://github.com/skpm/sketch-headers/compare/50-beta1...50) | [50-beta1...50](https://github.com/skpm/sketch-headers/compare/50-beta1...50.diff) |
| [50-beta1](https://github.com/skpm/sketch-headers/tree/50-beta1) | [49.1...50-beta1](https://github.com/skpm/sketch-headers/compare/49.1...50-beta1) | [49.1...50-beta1](https://github.com/skpm/sketch-headers/compare/49.1...50-beta1.diff) |
| [49.1](https://github.com/skpm/sketch-headers/tree/49.1) | [49...49.1](https://github.com/skpm/sketch-headers/compare/49...49.1) | [49...49.1](https://github.com/skpm/sketch-headers/compare/49...49.1.diff) |
| [49](https://github.com/skpm/sketch-headers/tree/49) | [48.2...49](https://github.com/skpm/sketch-headers/compare/48.2...49) | [48.2...49](https://github.com/skpm/sketch-headers/compare/48.2...49.diff) |
| [48.2](https://github.com/skpm/sketch-headers/tree/48.2) | [48.1...48.2](https://github.com/skpm/sketch-headers/compare/48.1...48.2) | [48.1...48.2](https://github.com/skpm/sketch-headers/compare/48.1...48.2.diff) |
| [48.1](https://github.com/skpm/sketch-headers/tree/48.1) | [48...48.1](https://github.com/skpm/sketch-headers/compare/48...48.1) | [48...48.1](https://github.com/skpm/sketch-headers/compare/48...48.1.diff) |
| [48](https://github.com/skpm/sketch-headers/tree/48) | [48-beta4...48](https://github.com/skpm/sketch-headers/compare/48-beta4...48) | [48-beta4...48](https://github.com/skpm/sketch-headers/compare/48-beta4...48.diff) |
| [48-beta4](https://github.com/skpm/sketch-headers/tree/48-beta4) | [48-beta...48-beta4](https://github.com/skpm/sketch-headers/compare/48-beta...48-beta4) | [48-beta...48-beta4](https://github.com/skpm/sketch-headers/compare/48-beta...48-beta4.diff) |
| [48-beta](https://github.com/skpm/sketch-headers/tree/48-beta) | [47.1...48-beta](https://github.com/skpm/sketch-headers/compare/47.1...48-beta) | [47.1...48-beta](https://github.com/skpm/sketch-headers/compare/47.1...48-beta.diff) |
| [47.1](https://github.com/skpm/sketch-headers/tree/47.1) | X | X |

## API

You can access it as a JSON API here:

- https://skpm.github.io/sketch-headers/latest/sketch/index.json
- https://skpm.github.io/sketch-headers/VERSION/sketch/index.json

## Generating the headers yourself

```
npm install -g sketch-headers

sketch-headers --sketchPath=/Applications/Sketch.app --sketchOutput=./headers/sketch --macosOutput=./headers/macos
```

(all options are optional and will default to those ones)

*Disclaimer: The headers are for research purposes only. All code is Copyright © Bohemian Coding.*
