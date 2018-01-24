var thisSection,
thisModule,
addRemove = (el) => {
  var dataSection = el.getAttribute('data-section') || el.parentElement.getAttribute('data-section');
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
        'data-section':creator.section.id
      });
      newSection.innerHTML = creator.section.template();
      document.querySelector('article').insertBefore(newSection, el.parentElement);
      creator.section.id++;
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
  // add/remove module
  if (el.classList.contains('creator--add-remove--module')) {
    if (!el.classList.contains('del')) {
      let selEl = document.createElement('div'),
      createModule = (el) => {
        creator.modules.refresh();
        let getValue = (el) => {
          return el.querySelector('select').value;
        } 
        window['creator']['modules'][`${getValue(selEl)}`].create(selEl, dataSection);
        if (document.querySelector(`[data-section="${dataSection}"`).querySelectorAll('.info > [data-module-id]').length != 0) {
          document.querySelector(`[data-section="${dataSection}"`).querySelector('.info .creator--add-remove--module.del').classList.remove('creator--disabled');
        }
        creator.modules.refresh();
        creator.modules.id++;
      };
      setAttributes(selEl, {
        'data-section':dataSection,
        'class':`creator--dropdown-select`,
      });
      selEl.innerHTML = `<select><option value="null" disabled selected>Select a module type</option>${creator.modules.generateOptions()}</select>`;
      document.querySelector(`[data-section="${dataSection}"`).querySelector('.info').insertBefore(selEl, el.parentElement);
      selEl.onchange = () => { createModule(selEl); };
    } else {
      let sectModules = document.querySelector(`[data-section="${dataSection}"`).querySelectorAll('.info > [data-module-id]'),
      lastModule = sectModules[sectModules.length - 1];
      lastModule.remove();
      if ((sectModules.length - 1) == 0) {
        document.querySelector(`[data-section="${dataSection}"`).querySelector('.info .creator--add-remove--module.del').classList.add('creator--disabled');
      }
      creator.modules.refresh();
    }
  }
  // add/remove table row/column
  if (el.classList.contains('creator--add-remove--row') || el.classList.contains('creator--add-remove--col')) {
    let tableId = parseInt(el.parentElement.getAttribute('data-module-id')),
    thisTable = document.querySelector(`[data-module-id="${tableId}"`),
    ifFirstTable = () => {
      if (tableId == -1) {
        return ''
      } else {
        return 'creator--md'
      }
    }
    dataCols = () => { return (thisTable.querySelectorAll('td').length - 1) / (thisTable.querySelectorAll('tr').length - 1) },
    dataRows = () => { return thisTable.querySelectorAll('tr').length - 1 },
    insRow = (n) => {
      let nx = '';
      for (var i = 0; i < n; i++) {
        nx += `<td contenteditable="true" class="${ifFirstTable()}">New cell</td>`;
      }
      return nx;
    },
    insCol = (n) => {
      let nx = [];
      for (var i = 0; i < dataRows(); i++) {
        let td = document.createElement('td');
        setAttributes(td, {
          'contenteditable':'true',
          'class':ifFirstTable()
      });
        td.innerHTML = `New cell ${i + 1}`;
        nx.push(td);
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
      if (dataRows() <= 1) {
        thisTable.querySelector('.del.creator--add-remove--row').classList.add('creator--disabled');
      } else if (dataRows() > 1 && thisTable.querySelector('.del.creator--add-remove--row.creator--disabled')) {
        thisTable.querySelector('.del.creator--add-remove--row.creator--disabled').classList.remove('creator--disabled');
      }
    } else {
      if (!el.classList.contains('del')) {
        let newCols = insCol(dataRows()),
        rows = thisTable.querySelectorAll('tr'),
        insNewCols = (element, index, array) => {
          if (index < (dataRows())) {
          element.appendChild(newCols[index]);
          }
        }
        rows.forEach(insNewCols);
      } else {
        let delCol = thisTable.querySelectorAll(`td:nth-child(${dataCols()})`),
        deleteTd = (element, index, array) => {
          element.remove();
        }
        delCol.forEach(deleteTd);
      }
      if (dataCols() <= 1) {
        thisTable.querySelector('.del.creator--add-remove--col').classList.add('creator--disabled');
      } else if (dataCols() > 1 && thisTable.querySelector('.del.creator--add-remove--col.creator--disabled')) {
        thisTable.querySelector('.del.creator--add-remove--col.creator--disabled').classList.remove('creator--disabled');
      }
    }
    setAttributes(thisTable, {
      'data-rows':dataRows(),
      'data-cols':dataCols()
    });
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
      themeSel.onchange = () => { checkDef(themeSel); }
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
    id:1,
    refresh:() => {
      creator.section.list = document.querySelectorAll('section');
    },
    template:() => {
      creator.section.refresh();
      return `<div class="image creator--img-hidden"><div class="img_container"><img src="" class="creator--img-el" alt="img_${creator.section.id}" /></div><div class="creator--image-options"><input data-section="${creator.section.id}" type="url" pattern=".+\\.[A-Za-z]{3,4}$" class="creator--img-src" placeholder="Image URL"><div class="creator--dropdown-select"><label for="image-type--${creator.section.id}">Shape:</label><select class="creator--image-type" id="image-type--${creator.section.id}" data-section="${creator.section.id}"><option value="tall" selected>Tall</option><option value="circle">Circle</option><option value="diamond">Diamond</option><option value="square">Square</option><option value="wide">Wide</option></select></div><div class="creator--artist-info"><input type="text" placeholder="Artist name"><input type="url" placeholder="Link to artist profile"></div><a class="creator--add-remove--image" data-section="${creator.section.id}">Image</a></div></div><div class="info"><h3 class="section_title" contenteditable="true">Section Title</h3><div class="creator--addremove-pair" data-section="${creator.section.id}"><a class="creator--add-remove--module">Module</a> / <a class="creator--add-remove--module del creator--disabled">Module</a></div></div>`
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
          },
          changeImg = () => {
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
          element.onchange = () => {
            changeImg();
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
    list:undefined,
    id:0,
    p:{
      list:undefined,
      refresh:() => {
        creator.modules.p.list = document.querySelectorAll('p[data-module-id]');
      },
      create:(src, sect) => {
        creator.modules.p.refresh();
        let newP = document.createElement('p');
        pList = creator.modules.p.list;
        setAttributes(newP, {
          'data-module-id':creator.modules.id,
          'class':'creator--md',
          'contenteditable':'true'
        });
        newP.innerHTML = 'New paragraph! Start writing&hellip;';
        document.querySelector(`[data-section="${sect}"]`).querySelector('.info').replaceChild(newP, src);
        creator.modules.p.refresh();
      }
    },
    table:{
      list:undefined,
      refresh:() => {
        creator.modules.table.list = document.querySelectorAll('table');
      },
      create:(src, sect) => {
        creator.modules.table.refresh();
        let newTable = document.createElement('table'),
        tableList = creator.modules.table.list;
        setAttributes(newTable, {
          'data-module-id':creator.modules.id,
          'data-cols':'2',
          'data-rows':'2'
        });
        newTable.innerHTML = `<tbody><tr><td contenteditable="true" class="creator--md">Cell A1</td><td contenteditable="true" class="creator--md">Cell A2</td></tr><tr><td contenteditable="true" class="creator--md">Cell B1</td><td contenteditable="true" class="creator--md">Cell B2</td></tr><tr><td class="creator--addremove-pair" data-module-id="${creator.modules.id}"><a class="creator--add-remove--row">Row</a> / <a class="creator--add-remove--col">Column</a><br /><a class="creator--add-remove--row del">Row</a> / <a class="creator--add-remove--col del">Column</a></td></tr></tbody>`
        document.querySelector(`[data-section="${sect}"]`).querySelector('.info').replaceChild(newTable, src);
        creator.modules.table.refresh();
        creator.addRemove.refresh();
      }
    },
    prosCons:{
      list:undefined
    },
    skills:{
      list:undefined
    },
    html:{
      list:undefined
    },
    style:{
      list:undefined
    },
    script:{
      list:undefined
    },
    refresh:() => {
      creator.modules.p.refresh();
      creator.modules.table.refresh();
    },
    generateOptions:() => {
      let optArr = [
        'p','Paragraph',
        'table','Table',
        'prosCons','Pros &amp; Cons',
        'skills','Skills',
        'html','HTML',
        'style','Style (CSS)',
        'script','Script (JavaScript)'
      ],
      options = '';
      for (i = 0; i < optArr.length; i+=2) {
        options += `<option value="${optArr[i]}">${optArr[i + 1]}</option>`;
      }
      return options;
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
