/**
 * Created by liguohua on 2017/6/9.
 */
/**
 * 用于比较两个boolean类型的值的大小
 */
export function js_util_BooleanCompare(b1, b2) {
  return b1 - b2;
}

/**
 * 用于比较两个String类型的值的大小
 */
export function js_util_StringCompare(s1, s2) {
  return s1.localeCompare(s2);
}
