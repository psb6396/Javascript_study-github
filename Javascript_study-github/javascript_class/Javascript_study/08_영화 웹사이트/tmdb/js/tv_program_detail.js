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
const tv_program_id = urlParams.get('tv_program_id')
const tv_program_detailUrl = `https://api.themoviedb.org/3/tv/${tv_program_id}?language=ko_KR`

const get_detail_tv_program = async (tv_program_detailUrl) => {
   try {
      const response = await fetch(tv_program_detailUrl, options)
      const data = await response.json()

      console.log(data)
   } catch (error) {
      console.log('에러 발생:', error)
   }
}

get_detail_tv_program(tv_program_detailUrl)
