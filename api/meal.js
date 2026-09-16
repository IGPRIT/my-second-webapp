export default async function handler(req, res) {
  const { date } = req.query;

  const API_KEY = process.env.NEIS_API_KEY;
  const OFFICE_CODE = "D10";
  const SCHOOL_CODE = "7004180";

  const mealDate = date || "";

  const url =
    "https://open.neis.go.kr/hub/mealServiceDietInfo"
    + "?KEY=" + API_KEY
    + "&Type=json"
    + "&pIndex=1"
    + "&pSize=100"
    + "&ATPT_OFCDC_SC_CODE=" + OFFICE_CODE
    + "&SD_SCHUL_CODE=" + SCHOOL_CODE
    + "&MLSV_YMD=" + mealDate;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: "급식 정보를 불러오지 못했습니다."
    });
  }
}
