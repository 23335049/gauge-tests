async function  assertTaikoElementExists(dom, msg) {
    if (await dom.exists()) {
        return dom;
    }  else {
        throw Error(msg)
    }
 }

 module.exports = {
     assertTaikoElementExists
 }