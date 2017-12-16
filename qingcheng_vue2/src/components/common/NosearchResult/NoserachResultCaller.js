/**
 * Created by liguohua on 2017/5/5.
 */
export  function NO_SEARCH_RESULT_CALLER(cxt,res) {
  if (res.length != 0) {
    cxt.$store.state.searchResultIsNull = false;
  } else {
    cxt.$store.state.searchResultIsNull = true;
  }
}
