const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWM0OWYyMDc2ZDNlYTdiNmE5YWQ4YzM4NzZlOTljMyIsIm5iZiI6MTczMDA3NjE4My40ODA5OTMsInN1YiI6IjY3MWFlODlhZTgzM2Q5MmVmMDVmZmIzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h0-R9e20ygBnyHwldxcuuwWdnpPyoyc6B-EqF2oWFQk',
   },
}

const url = 'https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1'

const get_tv_programs = async (url) => {
   try {
      const response = await fetch(url, options)
      //   console.log(response)
      const data = await response.json()
      console.log(data)
      const results = data.results
      const container = document.querySelector('.card-container')
      let rowsHtml = ''

      for (let i = 0; i < results.length; i += 2) {
         let rowHtml = '<div class = "row">'
         for (let j = 0; j < 2; j++) {
            const index = i + j
            if (index >= results.length) break //results 배열을 벗어나면 중단

            const tv_program = results[index]
            rowHtml += `<div class="poster">
                        <a href="./detail.html?movie_id=${tv_program.id}">
                            <img src="https://image.tmdb.org/t/p/w200${tv_program.poster_path}" alt="" />
                        </a>
                        </div>
                        <div class="info">
                        <p>${tv_program.name}</p>
                        <p>${tv_program.overview}</p>
                        <p>${tv_program.vote_average.toFixed(1)}</p>
                        </div>`
         }
         rowHtml += '</div>'
         rowsHtml += rowHtml
      }
      container.innerHTML = rowsHtml
   } catch (error) {
      console.log('에러발생:', error)
   }
}

get_tv_programs(url)

//현재 페이지의 url을 사용하여 URLSearchParams 객체 생성
const urlParams = new URLSearchParams(window.location.search)

//특정 쿼리 스트링 값 가져오기 (예: ?movie_id = 573435)
const movieId = urlParams.get('movie_id')

fetch('https://api.themoviedb.org/3/tv/124364?language=ko_KR', options)
   .then((res) => res.json())
   .then((res) => console.log(res))
   .catch((err) => console.error(err))
