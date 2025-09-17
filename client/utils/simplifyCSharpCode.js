import beautify from "js-beautify";

export default function simplifyCSharpCode(code) {
  let result = code;
  result = removeMeta(result);
  result = beautify.js(result, {
    indent_size: 2,
    indent_char: " "
  });
  result = formatNormalize(result);
  return result;
}

function removeMeta(code) {
  const classMatches = code.match(/^\s*(?:(?:public|private|protected|internal|static|abstract|sealed|partial)\s+)*class\s+[^\{]+/gm);
  const hasSingleClass = classMatches && classMatches.length === 1;

  if (!hasSingleClass) {
    return code;
  }

  let processedCode = code.replace(/^\s*using\s+[^;]+;/gm, "").trim();

  let classStartIndex = processedCode.indexOf("class");
  if (classStartIndex === -1) {
    return processedCode;
  }
  let firstBraceIndex = processedCode.indexOf("{", classStartIndex);
  if (firstBraceIndex === -1) {
    return processedCode;
  }

  let braceCount = 1;
  let lastBraceIndex = -1;
  for (let i = firstBraceIndex + 1; i < processedCode.length; i++) {
    if (processedCode[i] === "{") {
      braceCount++;
    } else if (processedCode[i] === "}") {
      braceCount--;
    }
    if (braceCount === 0) {
      lastBraceIndex = i;
      break;
    }
  }

  if (lastBraceIndex !== -1) {
    processedCode = processedCode.substring(firstBraceIndex + 1, lastBraceIndex).trim();
  }

  let namespaceStartIndex = processedCode.indexOf("namespace");
  if (namespaceStartIndex !== -1) {
    firstBraceIndex = processedCode.indexOf("{", namespaceStartIndex);
    if (firstBraceIndex !== -1) {
      braceCount = 1;
      lastBraceIndex = -1;
      for (let i = firstBraceIndex + 1; i < processedCode.length; i++) {
        if (processedCode[i] === "{") {
          braceCount++;
        } else if (processedCode[i] === "}") {
          braceCount--;
        }
        if (braceCount === 0) {
          lastBraceIndex = i;
          break;
        }
      }
      if (lastBraceIndex !== -1) {
        processedCode = processedCode.substring(firstBraceIndex + 1, lastBraceIndex).trim();
      }
    }
  }

  return processedCode;
}

function formatNormalize(code) {
  return code.replace(/\$ "/g, '$"');
}
