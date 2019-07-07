/* globals gauge*/
"use strict";
const { openBrowser,write, closeBrowser, goto, press, text, focus, inputField, toRightOf, into, click, $, waitFor, intercept, below, dropDown} = require('taiko');
const assert = require("assert");
const {switchOrg, openTab} = require('../action/home_action');
const {suiteStore} = require("../context/taiko_context")

async function addStudent(name, data) {
    var batchId = suiteStore.get("banchId");
    assert.ok(name, "学生姓名不能为空");
    data = data || {};
    var relName = `${batchId}-${name}`;
    data['学员姓名'] = relName; 
    await openTab('前台', '新生报名');
    await waitFor(2000);
    await click("新增")
    await waitFor(200);
    await fillForm({data: data});
    await waitFor(200);
    await click('保存');
    await waitFor(200);
    var students = suiteStore.get("students");
    if (!students) {
        students = {};
        suiteStore.put("students", students);
    }
    students[name] = relName;
}