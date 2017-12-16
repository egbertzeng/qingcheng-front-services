/**
 * Created by liguohua on 2017/6/9.
 */
import {js_util_BooleanCompare, js_util_StringCompare} from "../../../../common/util/AppCompareUtil";
export const js_util_triggerFlag = {
  flag: false,
}
//根据学生名称排序
export function js_util_sortbyUserName(users) {
  js_util_triggerFlag.flag = !js_util_triggerFlag.flag;
  users.sort((e1, e2) => {
    if (js_util_triggerFlag.flag) {
      return +js_util_StringCompare(e1.name, e2.name);
    } else {
      return -js_util_StringCompare(e1.name, e2.name);
    }
  });
}
//根据学生性别排序
export function js_util_sortbyUserGender(users) {
  js_util_triggerFlag.flag = !js_util_triggerFlag.flag;
  users.sort((e1, e2) => {
    if (js_util_triggerFlag.flag) {
      return +js_util_BooleanCompare(e1.gender, e2.gender);
    } else {
      return -js_util_BooleanCompare(e1.gender, e2.gender);
    }
  });
}
//根据学生邮箱排序
export function js_util_sortbyUserEmail(users) {
  js_util_triggerFlag.flag = !js_util_triggerFlag.flag;
  users.sort((e1, e2) => {
    if (js_util_triggerFlag.flag) {
      return +js_util_StringCompare(e1.email, e2.email);
    } else {
      return -js_util_StringCompare(e1.email, e2.email);
    }
  });
}

//根据学生口号排序
export function js_util_sortbyUserSlogan(users) {
  js_util_triggerFlag.flag = !js_util_triggerFlag.flag;
  users.sort((e1, e2) => {
    if (js_util_triggerFlag.flag) {
      return +js_util_StringCompare(e1.slogan, e2.slogan);
    } else {
      return -js_util_StringCompare(e1.slogan, e2.slogan);
    }
  });
}
//根据学生状态排序
export function js_util_sortbyUserActiveStatus(users) {
  js_util_triggerFlag.flag = !js_util_triggerFlag.flag;
  users.sort((e1, e2) => {
    if (js_util_triggerFlag.flag) {
      return +js_util_BooleanCompare(e1.activeStatus, e2.activeStatus);
    } else {
      return -js_util_BooleanCompare(e1.activeStatus, e2.activeStatus);
    }
  });
}
