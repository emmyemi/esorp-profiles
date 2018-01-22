var artistList,
theme = 'default',
charName,
playerName,
headImgUrl,
headImgSize,
tagline,
doc = {
  head:`<head data-art="${artistList}" data-theme="${theme}"><title>${charName} &ndash; @${playerName}</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><link rel="stylesheet" type="text/css" href="/emmy/c/portfolio.css"><style>#h_bg,#h_separator{background-image:url('${headImgUrl}');}</style></head>`,
  h:`<body><script src="/emmy/c/portfolio.js"></script><div id="h" class="${headImgSize}"><div id="h_bg"></div><div id="h_separator"></div><div id="h_title"><h1>${charName}</h1><h2>${tagline}</h2></div></div>`,
  body:'',
  init:() => {
    var fullDoc = `<!DOCTYPE html><html lang="en">${this.head}${this.h}${this.body}</body></html>`;
  }
},
modules = {
  base:``,
  
}