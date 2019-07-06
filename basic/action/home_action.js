const {$, click, waitFor} = require("taiko");
const {assertTaikoElementExists} = require("../assert/taiko_assert");

/**
 * 切换右上角组织
 * @param {string} orgName 组织名称
 */
async function switchOrg (orgName) {
    var preOrgName = (await $('.managerSchoolName').text());
    if (preOrgName == orgName) {
        return;
    } else {
        await click($('.managerSchoolName'));
        var target = $(`//li[text()='${orgName}']`);
        await assertTaikoElementExists(target, `不存在 {${orgName}}机构`);
        await click(target);
        await click(text("确定"));
    }
}


/**
 * 打开菜单
 * @param {string} firstMenu 一级菜单
 * @param {string} secondMenu  二级菜单
 */
async function openTab(firstMenu, secondMenu) {
    var pDom = $(`//aside[@id='left-panel']//li/a[@title='${firstMenu}']`)
    await assertTaikoElementExists(pDom, `no name is ${firstMenu} first menu on current login user`);
    await click(pDom)
    // var menuDom = $(`//div[@class='submenu-panel']//a[text()='${menu}']`);
    var menuDom = $(`//a[@class='openNewTab'][text()='${secondMenu}']`);
    await waitFor(200);
    await assertTaikoElementExists(menuDom, `no name is ${secondMenu} second menu on current login user`);
    await click(menuDom)
}

module.exports = {
    switchOrg, openTab
}