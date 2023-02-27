import md from "markdown-it";
import prism from "markdown-it-prism";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-java";
import "prismjs/components/prism-powershell";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-apacheconf";
import "prismjs/components/prism-nginx";
import "prismjs/components/prism-batch";
import "prismjs/components/prism-javascript";

export default defineNuxtPlugin(() => {
  const markd = md();
  var defaultRender = markd.renderer.rules.link_open || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };
  markd.use(prism);
  
  markd.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    var hIndex = tokens[idx].attrIndex('href');
    if (hIndex < 0) {
      // there is no href link
    } else {
      // there is an href link
      if (tokens[idx].attrs[hIndex][1].startsWith('http')) {
        var aIndex = tokens[idx].attrIndex('target');
        if (aIndex < 0) {
          tokens[idx].attrPush(['target', '_blank']); // target attr doesn't exist, so add new attribute
        } else {
          tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
        }
        return defaultRender(tokens, idx, options, env, self);
      } else {
        return defaultRender(tokens, idx, options, env, self);
      }
    }
  };
  
  return {
    provide: {
      mdRenderer: markd,
    },
  };
});