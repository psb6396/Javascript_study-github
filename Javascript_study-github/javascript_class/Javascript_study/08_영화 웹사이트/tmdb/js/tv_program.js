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
                        <a href="./tv_program_detail.html?tv_program_id=${tv_program.id}">
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
