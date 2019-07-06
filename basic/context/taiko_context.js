const {below, $}  = require('taiko')
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

module.exports = {
    scenarioStore, specStore, suiteStore, assertExists
}