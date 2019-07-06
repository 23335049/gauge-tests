/* globals gauge*/
"use strict";
const { openBrowser,write, closeBrowser, goto, press, text, focus, inputField, toRightOf, into, click, $, waitFor, intercept, below, dropDown} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';
const {suiteStore, assertExists, fillForm} = require("./utils");
const {switchOrg, openTab} = require('../basic/action/home_action');

beforeSuite(async () => {
    try {
        await openBrowser({ headless: headless })
        var baseUrl = process.env.eduboss_url;
        //goto boss login page
        await goto(baseUrl);
        // intercept welcome page of too slow
        await intercept(baseUrl + "iframeTemplate.shtml", mockReturnBlank(homePagePredict));
        // enter auth info and login
        await write(process.env.eduboss_username, into(inputField({placeholder:'请输入您的手机号码或账号'})));
        await write(process.env.eduboss_password, into(inputField({placeholder:'请输入您的密码'})));
        await click($('button'));
        // resolve uat env login bug
        // if (await text('400 Bad').exists()) {
        //     baseUrl = process.env.eduboss_url.replace("https", "http")
        //     await intercept(baseUrl + "iframeTemplate.shtml", mockReturnBlank(homePagePredict));
        //     await goto(baseUrl);
        // } else {
        //     // handle error login info
        //     if (await $(`//label[@for='username'][text='登录失败：账号或密码错误']`).exists()) {
        //         throw new Error("using error username or password!");
        //     }
        // }
        // write baseUrl into suiteStore
        suiteStore.put("baseUrl", baseUrl);
    } catch (error) {
        console.error(error);
        await closeBrowser();
    }
    await waitFor(4000);    
});

afterSuite(async () => {
    await closeBrowser();
});

step("wait for <n> seconds", async (n) => {
   await waitFor(n * 1000);
});

step("change to <orgName> organization", async (orgName) => {
    var preOrgName = (await $('.managerSchoolName').text());
    if (preOrgName == orgName) {
        return;
    } else {
        await click($('.managerSchoolName'));
        var target = $(`//li[text()='${orgName}']`);
        if (await target.exists()) {
            await click(target);
            await click(text("确定"));
        } else {
            throw new Error(orgName + "不存在该机构");
        }
    }
});

function mockReturnBlank(predict) {
    return function(request) {
        if (predict(request)) {
            request.respond({status: 200, contentType: 'text/html',body: "<html></html>"})
        } else {
            request.continue();
        }
    };
}

function homePagePredict(request) {
    return request.request.url.indexOf("welcome.html") > 0
}


step("open <name> menu", async function(name) {
    var target = $(`//div[@class='submenu-panel']//a[text()='${name}']`);
    if (await target.exists()) {
        await click(target);
    } else {
        throw `no name is ${name} menu on current login user`;
    }
});

step("open <pMenu> -> <menu> tab", async function(pMenu, menu) {
    var pDom = $(`//aside[@id='left-panel']//li/a[@title='${pMenu}']`)
    await assertExists(pDom, `no name is ${pMenu} first menu on current login user`);
    await click(pDom)
    // var menuDom = $(`//div[@class='submenu-panel']//a[text()='${menu}']`);
    var menuDom = $(`//a[@class='openNewTab'][text()='${menu}']`);
    await waitFor(200);
    await assertExists(menuDom, `no name is ${menu} second menu on current login user`);
    await click(menuDom)
});

step("create student as <name>", async function(name) {
    await openTab('前台', '新生报名');
    await waitFor(2000);
    await click("新增")
    await waitFor(200);
    await fillForm({data: {学员姓名: name}})
});