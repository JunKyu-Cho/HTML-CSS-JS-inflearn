window.addEventListener('load', function() {
	var carousels = document.getElementsByClassName('carousel');

	for (var i= 0; i < carousels.length; i++) {
		// 캐러셀 이벤트 등록
		addEventToCarousel(carousels[i]);
	}
});


function addEventToCarousel(carouselElem) {
	var ulElem = carouselElem.querySelector('ul');
	var liElems = ulElem.querySelectorAll('li');

	// 너비 값 조정
	var liWidth =liElems[0].clientWidth;
	var adjustedWidth =liElems.length * liWidth;

	ulElem.style.width = adjustedWidth + 'px';

	// 슬라이드 버튼 이벤트 등록

	var slideButtons = carouselElem.querySelectorAll('.slide');
	for (var i = 0; i < slideButtons.length; i++) {
		slideButtons[i].addEventListener('click', createListenerSlide(carouselElem));
	}
}


function createListenerSlide(carouselElem) {
	return function(e) {
		var clickedButton = e.currentTarget;

		//값 가져오기
		var liElems = carouselElem.querySelectorAll('li');
		var liCount = liElems.length;
		var currentIndex = carouselElem.attributes.data.value;

		// 슬라이드 버튼 체크
		if (clickedButton.className.includes('right') && currentIndex < liCount - 1)	{
			currentIndex++;
			scrollDiv(carouselElem, currentIndex);
		} else if (clickedButton.className.includes('left') && currentIndex > 0) {
			currentIndex--;
			scrollDiv(carouselElem, currentIndex);
		}

		// 인디케이터 업데이트
		updateIndicator(carouselElem, currentIndex);

		// 슬라이드 버튼 Hidden
		updateSlideButtonVisible(carouselElem, currentIndex, liCount);

		// 이미지 인덱스값 업데이트
		carouselElem.attributes.data.value = currentIndex;
	}
}


function scrollDiv(carouselElem, nextIndex) {
	var scrollable = carouselElem.querySelector('div');
	var liWidth = scrollable.clientWidth;
	var newLeft = liWidth * nextIndex;

	scrollable.scrollTo({left: newLeft, behavior: 'smooth'});
}


function updateIndicator(carouselElem, currentIndex) {
	var indicators = carouselElem.querySelectorAll('footer > div');
	for (var i = 0; i < indicators.length; i++) {
		if (currentIndex == i) {
			indicators[i].className = 'active';			
		} else {
			indicators[i].className = '';
		}
	}
}

function updateSlideButtonVisible(carouselElem, currentIndex, liCount) {
	var left = carouselElem.querySelector('.slide-left');
	var right = carouselElem.querySelector('.slide-right');

	if (currentIndex > 0) {
		left.style.display = 'block';
	} else {
		left.style.display = 'none';
	}

	if( currentIndex < liCount - 1) {
		right.style.display = 'block';
	} else {
		right.style.display = 'none';
	}
}