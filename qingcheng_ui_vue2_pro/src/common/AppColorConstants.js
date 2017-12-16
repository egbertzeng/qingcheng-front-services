/**
 * Created by liguohua on 24/03/2017.
 */
  import {APP_DISASTER_DAY} from "../GlobalSetting.js";
//颜色定义
export const APP_COLOR_GREY = "grey";
export const APP_COLOR_GREEN = "green";
export const APP_COLOR_RED = "red";
export const APP_COLOR_BLUE = "blue";
export const APP_COLOR_YELLOW = "yellow";
export const APP_COLOR_ORANGE = "orange";
export const APP_COLOR_OLIVE = "olive";
export const APP_COLOR_TEAL = "teal";
export const APP_COLOR_VIOLET = "violet";
export const APP_COLOR_PURPLE = "purple ";
export const APP_COLOR_BROWN = "brown";
export const APP_COLOR_PINK = "pink";
//全部颜色数组
export const APP_COLORS = [
  //APP_COLOR_BLUE,//太难看
  //APP_COLOR_YELLOW,//太难看

  APP_COLOR_GREEN,
  APP_COLOR_RED,
  APP_COLOR_ORANGE,
  APP_COLOR_OLIVE,
  APP_COLOR_TEAL,
  APP_COLOR_VIOLET,
  APP_COLOR_PURPLE,
  APP_COLOR_BROWN,
  APP_COLOR_PINK
];
//通用过滤方法
function App_Color_Common(c) {
  if (APP_DISASTER_DAY) {
    c = APP_COLOR_GREY;
  }
  return c;
}
export function App_Teal_Color() {
  return App_Color_Common(APP_COLOR_TEAL);
}
export function App_Green_Color() {
  return App_Color_Common(APP_COLOR_GREEN);
}
export function App_Red_Color() {
  return App_Color_Common(APP_COLOR_RED);
}
export function App_Random_Color() {
  return App_Color_Common(APP_COLORS[parseInt(Math.random() * APP_COLORS.length)]);
}
