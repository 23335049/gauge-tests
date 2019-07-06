const {below, $, write, into, waitFor}  = require('taiko')
var scenarioStore = {}
/**
 * store data
 */
scenarioStore.put = (key, value) => {
    gauge.dataStore.scenarioStore.put(key, value);
}

/**
 * fetch data
 */
scenarioStore.get = (key) => {
    return gauge.dataStore.scenarioStore.get(key)
} 

var specStore = {}
/**
 * store data
 */
specStore.put = (key, value) => {
    gauge.dataStore.specStore.put(key, value);
}

/**
 * fetch data
 */
specStore.get = (key) => {
    return gauge.dataStore.specStore.get(key)
} 

var suiteStore = {}
/**
 * store data
 */
suiteStore.put = (key, value) => {
    gauge.dataStore.suiteStore.put(key, value);
}

/**
 * fetch data
 */
suiteStore.get = (key) => {
   return gauge.dataStore.suiteStore.get(key)
}

 async function  assertExists(dom, msg) {
   if (await dom.exists()) {
       return dom;
   }  else {
       throw Error(msg)
   }
}

async function fillForm(option) {
    var mustInput =$(`//form//label[contains(@class, 'must-input')]`);
    assertExists(mustInput, "no find a form or label")
    var labels = await mustInput.text();
    var data = option.data || {};
    for (let i = 0; i < labels.length; i++) {
        const label = labels[i];
        var path = `//form//label[text()='${label}']/..//`;
        var target2 = $(`${path}input|${path}select`);
        if (await target2.exists()) {
            var value = data[label] || 1111112;
            var text = await target2.text();
            var isSelect = false;
            if (text.lenght > 1) {
                isSelect = true;
                value = data[label] || text[1][1]
            }
            await write(value, into($(`${path}${isSelect?'select':'input'}`)));
        }
    }
}

module.exports = {
    scenarioStore, specStore, suiteStore, assertExists, fillForm
}