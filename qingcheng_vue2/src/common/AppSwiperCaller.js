/**
 * Created by liguohua on 2017/4/8.
 */

//初始化轮播组件
export function APP_INIT_SWIPE_LOOP_COMPONENT() {
  let mySwiper = new Swiper('.swiper-container', {
    // onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    //   swiperAnimateCache(swiper); //隐藏动画元素
    //   swiperAnimate(swiper); //初始化完成开始动画
    // },
    // onSlideChangeEnd: function(swiper){
    //   swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
    // },
    pagination: '.swiper-pagination',
    paginationHide :true,
    paginationClickable: true,

    // paginationType: 'progress',
    paginationType: 'fraction',

    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',

    slidesPerView: 4,
    slidesPerColumn: 1,
    keyboardControl: true,
    autoplay: 8000,
    autoplayDisableOnInteraction: true,
    spaceBetween: 18,
    loop: true,
    centeredSlides: false,
    // height:140,
    autoHeight: true,
    parallax: true,
    grabCursor:false,
  });
}
