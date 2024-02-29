const getDate = () => {
  const today = new Date();
  const day = ['일', '월', '화', '수', '목', '금', '토'];

  const formattedDate = `${today.getMonth() + 1}월 ${today.getDate()}일 ${day[today.getDay()]}요일`;

  return formattedDate;
};

export default getDate;
