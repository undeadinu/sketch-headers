function forEachMatch(regex, data, fn) {
  let match;
  while ((match = regex.exec(data)) !== null) {
    if (match.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    fn(match)
  }
}

module.exports = function parseHeader (data) {
  let headerData = {
    imports: new Set(),
    classes: new Set(),
    protocol: false,
    className: null,
    extends: null,
    interfaces: new Set(),
    methods: {},
    properties: {}
  };

  // IMPORTS
  const importRegex = /#import "(.+)"/g;
  forEachMatch(importRegex, data, (match) => {
    headerData.imports.add(match[1]);
  })

  // CLASSES
  const classRegex = /@class ([^;]*);/g;
  forEachMatch(classRegex, data, (match) => {
    headerData.classes = new Set(match[1].split(',').map(c => c.trim()));
  })

  // INTERFACE
  const interfaceRegex = /@interface ([^ \n]+)( : ([^ \n]+)( <([^>\n]+)>)?)?/g;
  forEachMatch(interfaceRegex, data, (match) => {
    headerData.className = match[1].trim();
    headerData.extends = match[3];
    if (match[5]) {
      headerData.interfaces = new Set(match[5].split(',').map(i => i.trim()));
    }
  })

  // PROTOCOL
  const protocolRegex = /@protocol ([^ \n]+)( : ([^ \n]+)( <([^>\n]+)>)?)?/g;
  forEachMatch(protocolRegex, data, (match) => {
    headerData.protocol = true;
    headerData.className = match[1].trim();
    headerData.extends = match[3];
    if (match[5]) {
      headerData.interfaces = new Set(match[5].split(',').map(i => i.trim()));
    }
  })

  // METHODS
  const methodsRegex = /([+-]) \(([^\)]+)\)([^;]+);/g;
  const methodNameRegex = /([^:]+)(:\((([^\(\)]*\(\^\)\s*\()*[^\)]+\)*)\)([^ ]+))*/g;
  forEachMatch(methodsRegex, data, (match) => {
    let name = '';
    let args = [];
    let matchMethodName;
    while ((matchMethodName = methodNameRegex.exec(match[3])) !== null) {
      name += `${matchMethodName[1].trim()}${matchMethodName[2] ? ':' : ''}`;
      if (matchMethodName[3]) {
        args.push({
          type: matchMethodName[3]
        });
      }
    }
    headerData.methods[name] = {
      name,
      bridgedName: name.replace(/:/g, '_').replace(/_$/g, ''),
      args,
      returns: match[2],
      kind: match[1] === '+' ? 'class' : 'instance',
      kindIndicator: match[1]
    };
  })

  // PROPERTIES
  const propertiesRegex = /@property\(([^\)]+)\) ([^;]+) ([^;]*);/g;
  forEachMatch(propertiesRegex, data, (match) => {
    const pointer = match[3].startsWith('*')
    const name = pointer ? match[3].slice(1) : match[3]
    headerData.properties[name] = {
      name: name,
      pointer,
      type: match[2],
      attributes: match[1].split(',').map(a => a.trim())
    };
  })

  return headerData;
}
