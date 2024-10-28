const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWM0OWYyMDc2ZDNlYTdiNmE5YWQ4YzM4NzZlOTljMyIsIm5iZiI6MTczMDA3NjE4My40ODA5OTMsInN1YiI6IjY3MWFlODlhZTgzM2Q5MmVmMDVmZmIzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h0-R9e20ygBnyHwldxcuuwWdnpPyoyc6B-EqF2oWFQk',
   },
}
//현재 페이지의 url을 사용하여 URLSearchParams 객체 생성
const urlParams = new URLSearchParams(window.location.search)

//특정 쿼리 스트링 값 가져오기 (예: ?movie_id = 573435)
const movieId = urlParams.get('movie_id')

const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
const mainContainer = document.querySelector('main .container')

//1. 영화 상세정보 바인딩
const getDetailMovie = async (movieDetailUrl) => {
   try {
      const response = await fetch(movieDetailUrl, options)
      const data = await response.json()

      // console.log(data)
      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`

      const rowHtml = `<div class="row">
                  <div class="col-sm-3" style="text-align:center;">
                     <img src="${imgSrc}" alt="${data.title}" class="poster-detail" style="max-width:100%"/>
                  </div>
                  <div class="col-sm-9">
                     <h2>${data.title}</h2>
                     <ul class="movie-info">
                           <li>개봉일 ${data.release_date}</li>
                           <li>${data.genres.map((genre) => {
                              return genre.name
                           })}</li>
                           <li>${data.runtime}분</li>
                        </ul>
                        <p>${data.vote_average.toFixed(1) == 0.0 ? '미반영' : data.vote_average.toFixed(1)}</p>
                        <p>${data.overview}</p>
                  </div>
               </div>`

      mainContainer.innerHTML += rowHtml

      await getCreditsMovie(movieCreditUrl) //getDetailMovie함수가 완료 될때까지 기다렸다가 getCreditsMovie 함수 실행
   } catch (error) {
      console.log('에러 발생:', error)
   }
}

getDetailMovie(movieDetailUrl)

//2. 출연 배우 데이터 바인딩
const movieCreditUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko_KR`

const getCreditsMovie = async (movieCreditsUrl) => {
   try {
      const response = await fetch(movieCreditUrl, options)
      const data = await response.json()

      let castRowHtml = `<div style="display:flex;">`

      //출연배우 6명만 출력
      for (let i = 0; i < 6; i++) {
         // 출연배우의 이미지 정보X -> null = false
         // 이미지 정보가 없을 때는 person.png 경로를 profileImg 변수에 저장
         let profileImg = !data.cast[i].profile_path ? `./images/person.png` : `https://image.tmdb.org/t/p/w200${data.cast[i].profile_path}`

         //카드가 6개가 만들어져야 하므로 누적합산
         castRowHtml += `<div class="col-sm-2 p-3" >
                  <div class="card">
                     <img src="${profileImg}" alt="${data.cast[i].name}" class="card-img-top" />
                  </div>
                  <div class="card-body">
                     <p class="card-text">${data.cast[i].name}</p>
                  </div>
               </div>
              `
      }

      castRowHtml += `</div>`

      mainContainer.innerHTML += castRowHtml
   } catch (error) {
      console.log('에러발생:', error)
   }
}
