import * as activityService from "../../services/activityService.js";

const activityList = async({render, session}) => {
    const user = await session.get('user')
    render('index.ejs', { activitiesToday: await activityService.getActivityListToday(user),
                        activitiesYesterday: await activityService.getActivityListYesterday(user),
                        user});
};



const showSummaryForm = async({render, session}) => {
    const user = await session.get('user')

    render('summary.ejs', { monthlyActivities: await activityService.getMonthlySummary(user),
                            weeklyActivities: await activityService.getWeeklySummary(user),
                            user});
}

const showSummaryFormWeek = async({render, request, session}) => {
    const user = await session.get('user')
    const body = request.body();
    const params = await body.value;
    const weekYear = params.get('week');
    const week = weekYear.substring(6)
    const year = weekYear.substring(0, weekYear.length-4)
    render('summary.ejs', {weeklyActivities: await activityService.postSummaryWeek(user, week, year),
                            monthlyActivities: {},
                            user});
}

const showSummaryFormMonth = async({render, request, session}) => {
    const user = await session.get('user')
    const body = request.body();
    const params = await body.value;
    const monthYear = params.get('month');
    const month = monthYear.substring(5)
    const year = monthYear.substring(0, monthYear.length-3)
    render('summary.ejs', { monthlyActivities: await activityService.postSummaryMonth(user, month, year),
    weeklyActivities: {},
    user});
}


const showReportingForm = async({render, session}) => {
    const user = await session.get('user')

    render('reporting.ejs', {user});
}

export { activityList, showSummaryForm, showReportingForm, showSummaryFormMonth, showSummaryFormWeek };
