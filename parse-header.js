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
  const importRegex = /#import \"(.+)\"/g;
  let matchImport;
  while ((matchImport = importRegex.exec(data)) !== null) {
    if (matchImport.index === importRegex.lastIndex) {
      importRegex.lastIndex++;
    }
    headerData.imports.add(matchImport[1]);
  }

  // CLASSES
  const classRegex = /@class ([^;]*);/g;
  let matchClasses;
  while ((matchClasses = classRegex.exec(data)) !== null) {
    if (matchClasses.index === classRegex.lastIndex) {
      classRegex.lastIndex++;
    }
    headerData.classes = new Set(matchClasses[1].split(',').map(c => c.trim()));
  }

  // INTERFACE
  const interfaceRegex = /@interface ([^ \n]+)( : ([^ \n]+)( <([^>\n]+)>){0,1}){0,1}/g;
  let matchInterface;
  while ((matchInterface = interfaceRegex.exec(data)) !== null) {
    if (matchInterface.index === interfaceRegex.lastIndex) {
      interfaceRegex.lastIndex++;
    }
    headerData.className = matchInterface[1].trim();
    headerData.extends = matchInterface[3];
    if (matchInterface[5]) {
      headerData.interfaces = new Set(matchInterface[5].split(',').map(i => i.trim()));
    }
  }

  // PROTOCOL
  const protocolRegex = /@protocol ([^ \n]+)( : ([^ \n]+)( <([^>\n]+)>){0,1}){0,1}/g;
  let matchProtocol;
  while ((matchProtocol = protocolRegex.exec(data)) !== null) {
    if (matchProtocol.index === protocolRegex.lastIndex) {
      protocolRegex.lastIndex++;
    }
    headerData.protocol = true;
    headerData.className = matchProtocol[1].trim();
    headerData.extends = matchProtocol[3];
    if (matchProtocol[5]) {
      headerData.interfaces = new Set(matchProtocol[5].split(',').map(i => i.trim()));
    }
  }

  // METHODS
  const methodsRegex = /(\+|\-){1} \(([^\)]+)\)([^;]+);/g;
  let matchMethod;
  while ((matchMethod = methodsRegex.exec(data)) !== null) {
    if (matchMethod.index === methodsRegex.lastIndex) {
      methodsRegex.lastIndex++;
    }
    let name = '';
    let args = [];
    const methodNameRegex = /([^:]+)(:\((([^\(\)]*\(\^\)\s*\()*[^\)]+\)*)\)([^ ]+))*/g;
    let matchMethodName;
    while ((matchMethodName = methodNameRegex.exec(matchMethod[3])) !== null) {
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
      returns: matchMethod[2],
      kind: matchMethod[1] === '+' ? 'class' : 'instance',
      kindIndicator: matchMethod[1]
    };
  }

  // PROPERTIES
  const propertiesRegex = /@property\(([^\)]+)\) ([^;]+) ([^;]*);/g;
  let matchProperties;
  while ((matchProperty = propertiesRegex.exec(data)) !== null) {
    if (matchProperty.index === propertiesRegex.lastIndex) {
      propertiesRegex.lastIndex++;
    }
    const pointer = matchProperty[3].startsWith('*')
    const name = pointer ? matchProperty[3].slice(1) : matchProperty[3]
    headerData.properties[name] = {
      name: name,
      pointer,
      type: matchProperty[2],
      attributes: matchProperty[1].split(',').map(a => a.trim())
    };
  }

  return headerData;
}
