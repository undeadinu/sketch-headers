# Sketch Headers

**Headers from [Sketch app](http://www.sketchapp.com) and macOS exported using [class-dump](http://stevenygard.com/projects/class-dump/).**

## History

| Version        | Compare           | Patch  |
| -------------- | ----------------- | ------ |
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
