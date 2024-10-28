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

const getDetailMovie = async (movieDetailUrl) => {
   try {
      const response = await fetch(movieDetailUrl, options)
      const data = await response.json()

      console.log(data)
   } catch (error) {
      console.log('에러 발생:', error)
   }
}

getDetailMovie(movieDetailUrl)

fetch(movieDetailUrl, options)
   .then((res) => res.json())
   .then((res) => console.log(res))
   .catch((err) => console.error(err))
