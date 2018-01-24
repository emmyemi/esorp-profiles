var thisSection,
thisModule,
addRemove = (el) => {
  var dataSection = el.getAttribute('data-section');
  thisSection = dataSection;
  // make sure not to toggle class for add/remove pairs
  if (!el.parentElement.classList.contains('creator--addremove-pair')) {
    el.classList.toggle('del');
  }
  // image functions
  if (el.classList.contains('creator--add-remove--image')) {
    let tgt = document.querySelector(`[data-section="${dataSection}"`);
    if (dataSection != '-1') {
      tgt.querySelector('div.image').classList.toggle('creator--img-hidden');
      if (tgt.querySelector('div.image').classList.contains('creator--img-hidden')) {
        tgt.querySelector('img').setAttribute('src', '');
      }
    } else {
      document.getElementById('head-img-options').classList.toggle('creator--hidden');
      document.getElementById('h').classList.toggle('no_banner');
      if (document.getElementById('head-img-options').classList.contains('creator--hidden')) {
        document.querySelector('#head-img-style').innerHTML = '';
      }
    }
  }
  // add/remove sections
  if (el.classList.contains('creator--add-remove--section')) {
    if (!el.classList.contains('del')) {
      let newSection = document.createElement('section');
      setAttributes(newSection, {
        'data-section':`${creator.section.list.length.toString()}`
      });
      newSection.innerHTML = creator.section.template();
      document.querySelector('article').insertBefore(newSection, el.parentElement);
    } else {
      let delSection = creator.section.list[creator.section.list.length - 1];
      delSection.remove();
    }
    creator.refresh();
    if (creator.section.list.length != 1 && document.querySelector('.creator--add-remove--section.del').classList.contains('creator--disabled')) {
      document.querySelector('.creator--add-remove--section.del').classList.remove('creator--disabled');
    } else if (creator.section.list.length == 1) {
      document.querySelector('.creator--add-remove--section.del').classList.add('creator--disabled');
    }
  }
  // add/remove table row/column
  if (el.classList.contains('creator--add-remove--row') || el.classList.contains('creator--add-remove--col')) {
    let tableId = parseInt(el.parentElement.getAttribute('data-table-id')),
    thisTable = creator.modules.table.list[tableId],
    dataCols = () => { return parseInt(thisTable.getAttribute('data-cols')); },
    dataRows = () => { return parseInt(thisTable.getAttribute('data-rows')); },
    insRow = (n) => {
      let nx = '';
      for (var i = 0; i < n; i++) {
        nx += `<td contenteditable="true">${`New cell ${i + 1}`}</td>`;
      }
      return nx;
    }
    if (el.getAttribute('class').includes('--row')) {
      if (!el.classList.contains('del')) {
        let newRow = document.createElement('tr');
        newRow.innerHTML = insRow(dataCols());
        thisTable.querySelector('tbody').insertBefore(newRow, thisTable.querySelector('.creator--addremove-pair').parentElement);
      } else {
        let delRow = thisTable.querySelectorAll('tr')[dataRows() - 1];
        delRow.remove();
      }
      thisTable.setAttribute('data-rows', (thisTable.querySelectorAll('tr').length - 1));
      if (dataRows() == 0 && !thisTable.querySelector('.creator--disabled')) {
        thisTable.querySelector('[class*="creator--add-remove"][class*="del"]').classList.add('creator--disabled');
      } else if (dataRows() != 0 && thisTable.querySelector('.creator--disabled')) {
        thisTable.querySelector('.creator--disabled').classList.remove('creator--disabled');
      }
    } else {
      // adding columns sooooon(TM)
    }
  }
},
setAttributes = (el, attr) => {
  for (var x in attr) {
    el.setAttribute(x, attr[x]);
  }
},
creator = {
  theme:{
    setTheme:() => {
      let themeSel = document.getElementById('theme-select'),
      checkDef = (el) => {
        if (el.value == 'default') {
          if (document.getElementById('theme-css')) {
            document.getElementById('theme-css').setAttribute('href', '');
          } else { // do nothing
          }
        } else {
          if (document.getElementById('theme-css')) {
            document.getElementById('theme-css').setAttribute('href', `../theme/${themeSel.value}/${themeSel.value}.css`);
          } else {
            let themeCSS = document.createElement('link');
            themeCSS.setAttribute('id', 'theme-css');
            themeCSS.setAttribute('rel', 'stylesheet');
            themeCSS.setAttribute('href', `../theme/${themeSel.value}/${themeSel.value}.css`)
            document.head.appendChild(themeCSS);
          }
        }
      };
      themeSel.onchange = () => {
        checkDef(themeSel);
      }
    }
  },
  head:{
    size:() => {
      return document.getElementById('creator--head-height-select').value;
    },
    setHeight:() => {
      let selectEl = document.getElementById('creator--head-height-select'),
      h = document.getElementById('h');
      selectEl.onchange = () => {
        h.classList.remove('sm');
        h.classList.remove('m');
        h.classList.remove('big');
        h.classList.add(creator.head.size());
      }
    }
  },
  addRemove:{
    list:undefined,
    refresh:() => {
      let elList = document.querySelectorAll('a[class^="creator--add-remove"]'),
      initOnclick = (element, index, array) => {
        element.onclick = () => { addRemove(element); };
      };
      creator.addRemove.list = elList;
      elList.forEach(initOnclick);
    }
  },
  section:{
    list:undefined,
    refresh:() => {
      creator.section.list = document.querySelectorAll('section');
    },
    template:() => {
      creator.section.refresh();
      return `<div class="image creator--img-hidden"><div class="img_container"><img src="" class="creator--img-el" alt="img_${creator.section.list.length}" /></div><div class="creator--image-options"><input data-section="${creator.section.list.length}" type="url" pattern=".+\.[A-Za-z]{3,4}$" class="creator--img-src" placeholder="Image URL"><div class="creator--dropdown-select"><label for="image-type--${creator.section.list.length}">Shape:</label><select class="creator--image-type" id="image-type--${creator.section.list.length}" data-section="${creator.section.list.length}"><option value="tall" selected>Tall</option><option value="circle">Circle</option><option value="diamond">Diamond</option><option value="square">Square</option><option value="wide">Wide</option></select></div><div class="creator--artist-info"><input type="text" placeholder="Artist name"><input type="url" placeholder="Link to artist profile"></div><a class="creator--add-remove--image" data-section="${creator.section.list.length}">Image</a></div></div><div class="info"><h3 class="section_title" contenteditable="true">Section Title</h3><div class="creator--addremove-pair"><a class="creator--add-remove--module">Module</a> / <a class="creator--add-remove--module del creator--disabled">Module</a></div></div>`
    }
  },
  img:{
    urlTether:{
      list:undefined,
      refresh:() => {
        let elList = document.querySelectorAll('input[type="url"]'),
        doTether = (element, index, array) => {
          let currentSection = element.getAttribute('data-section');
          if (currentSection != '-1') {
            element.onkeyup = () => {
              document.querySelector(`[data-section="${currentSection}"`).querySelector('img').setAttribute('src', element.value);
            }
          } else {
            element.onkeyup = () => {
              document.querySelector('#head-img-style').innerHTML = `#h_bg,#h_separator{background-image:url('${element.value}');}`
            }
          }
        }
        creator.img.urlTether.list = elList;
        elList.forEach(doTether);
      }
    },
    shape:{
      list:undefined,
      refresh:() => {
        let elList = document.querySelectorAll('[id^="image-type--"]'),
        doTether = (element, index, array) => {
          let currentSection = element.getAttribute('id').split('--')[1],
          removeAll = (el) => {
            el.classList.remove('diamond', 'circle', 'square');
          }
          element.onchange = () => {
            let section = document.querySelector(`[data-section="${currentSection}"`);
            if (element.value == 'wide') {
              removeAll(section.querySelector('.image'));
              section.classList.add('wide_img');
            } else if (element.value == 'tall') {
              section.classList.remove('wide_img');
              removeAll(section.querySelector('.image'));
            } else {
              section.classList.remove('wide_img');
              removeAll(section.querySelector('.image'));
              section.querySelector('.image').classList.add(element.value);
            }
          }
        }
        creator.img.shape.list = elList;
        elList.forEach(doTether);
      }
    },
    refresh:() => {
      creator.img.urlTether.refresh();
      creator.img.shape.refresh();
    }
  },
  modules:{
    table:{
      list:undefined,
      refresh:() => {
        let elList = document.querySelectorAll('table');
        creator.modules.table.list = elList;
      },
      create:(src) => {
        creator.modules.table.refresh();
        let newTable = document.createElement('table'),
        tableList = creator.modules.table.list;
        setAttributes(newTable, {
          'data-table-id': tableList.length - 1,
          'data-table-cols': '2',
          'data-table-rows': '2'
        });
      }
    },
    refresh:() => {
      creator.modules.table.refresh();
    }
  },
  refresh:() => {
    creator.addRemove.refresh();
    creator.section.refresh();
    creator.img.refresh();
    creator.modules.refresh();
  },
  startup:() => {
    creator.theme.setTheme();
    creator.head.setHeight();
    creator.refresh();
  }
};
window.addEventListener('DOMContentLoaded', creator.startup);
