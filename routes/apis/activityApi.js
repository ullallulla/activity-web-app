import * as activityService from "../../services/activityService.js";




const jsonSummaryData = async({response}) => {
    response.body = await activityService.apiSummary;
}
const jsonSummaryByIdData = async({response, params}) => {
    const year = params.year
    const month = params.month
    const day = params.day
    response.body = await activityService.apiSummaryById(year,month,day);
}

export { jsonSummaryData, jsonSummaryByIdData };
