import beautify from "js-beautify";

export default function simplifyCSharpCode(code) {
  let result = code;
  result = removeMeta(result);
  result = beautify.js(result, {
    indent_size: 2,
  });
  return result;
}

function removeMeta(code) {
  const hasSingleClass = code.match(/^\s*class\s/gm).length !== 1;

  // Returns the full code if it contains 0 or >= 1 class
  if (hasSingleClass) {
    return code;
  }

  let processedCode = code;

  processedCode = processedCode.replace(/^\s*using\s+[^;]+;/gm, "").trim();

  let firstBraceIndex = processedCode.indexOf("{");
  let lastBraceIndex = processedCode.lastIndexOf("}");

  if (firstBraceIndex !== -1 && lastBraceIndex > firstBraceIndex) {
    processedCode = processedCode
      .substring(firstBraceIndex + 1, lastBraceIndex)
      .trim();
  }

  firstBraceIndex = processedCode.indexOf("{");
  lastBraceIndex = processedCode.lastIndexOf("}");

  if (firstBraceIndex !== -1 && lastBraceIndex > firstBraceIndex) {
    processedCode = processedCode
      .substring(firstBraceIndex + 1, lastBraceIndex)
      .trim();
  }

  return processedCode;
}
