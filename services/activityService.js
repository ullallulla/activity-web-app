import { executeQuery } from "../database/database.js";

const getActivityListToday = async(user) => {
    console.log('user',user)



    if (user){
        const today = await executeQuery("SELECT AVG(mood)::numeric(100,2) as mood FROM activities WHERE DATE_PART('year', reported_on) = DATE_PART('year', NOW()) AND DATE_PART('month', reported_on) = DATE_PART('month', NOW()) AND DATE_PART('day', reported_on) = DATE_PART('day', NOW()) AND (user_id = $1)", user.id);
        console.log('today',today.rows)

        if(!today)
            return []
        return today.rows;
    }

    else {
        console.log('asd')
        return [];

    }


}


const getActivityListYesterday = async(user) => {
    console.log('user',user)



    if (user){
        const yesterday = await executeQuery("SELECT AVG(mood)::numeric(100,2) as mood FROM activities WHERE DATE_PART('year', reported_on) = (DATE_PART('year', NOW())) AND DATE_PART('month', reported_on) = (DATE_PART('month', NOW())) AND DATE_PART('day', reported_on) = DATE_PART('day', NOW()) - 1 AND (user_id = $1)", user.id);
        console.log('yesterday',yesterday.rows[0])

        if(!yesterday.rows[0].mood)
            return []
        return yesterday.rows;
    }

    else {
        return [];

    }


}
const addMorningActivity = async({request, response, session}) => {
    const body = request.body();
    const params = await body.value;

    const sleepDuration = params.get('sleepDuration');
    const sleepQuality = params.get('sleepQuality');
    const mood = params.get('mood');

    const user = await session.get('user')


    await executeQuery("INSERT INTO activities (reported_on, sleep_duration, sleep_quality, mood, user_id) VALUES (NOW(), $1, $2, $3, $4)", sleepDuration, sleepQuality, mood, user.id);
    response.redirect('/');
}

const addEveningActivity = async({request, response, session}) => {
    const body = request.body();
    const params = await body.value;

    const exerciseDuration = params.get('exerciseDuration');
    const studyDuration = params.get('studyDuration');
    const eatingHabits = params.get('eatingHabits')
    const mood = params.get('mood');

    const user = await session.get('user')


    await executeQuery("INSERT INTO activities (reported_on, exercise_duration, study_duration, eating_habits, mood, user_id) VALUES (NOW(),$1, $2, $3, $4, $5)", exerciseDuration, studyDuration, eatingHabits, mood, user.id);
    response.redirect('/');
}

const postSummaryWeek = async(user, week, year) => {
    /*
    const body = request.body();
    const params = await body.value;

    const weekYear = params.get('week');
    const week = weekYear.substring(6)
    const year = weekYear.substring(0, weekYear.length-4)
    console.log('weekYear',weekYear)
    console.log('week',week)
    console.log('year', year)
    */

    if (week){
        const res = await executeQuery("SELECT AVG(sleep_quality)::numeric(100,2) as sleep_quality, AVG(mood)::numeric(100,2) as mood, AVG(sleep_duration)::numeric(100,2) as sleep_duration, AVG(exercise_duration)::numeric(100,2) as exercise_duration, AVG(study_duration)::numeric(100,2) as study_duration FROM activities WHERE DATE_PART('week', reported_on) = $1 AND DATE_PART('year', reported_on) = $2 AND user_id = $3;", week, year, user.id)
        return res.rows
    }


}

const postSummaryMonth = async(user, month, year) => {
    /*
    const body = request.body();
    const params = await body.value;


    const monthYear = params.get('month');
    const month = monthYear.substring(6)
    const year = monthYear.substring(0, monthYear.length-4)
    */

    if (month) {
        const res = await executeQuery("SELECT AVG(sleep_quality)::numeric(100,2) as sleep_quality, AVG(mood)::numeric(100,2) as mood, AVG(sleep_duration)::numeric(100,2) as sleep_duration, AVG(exercise_duration)::numeric(100,2) as exercise_duration, AVG(study_duration)::numeric(100,2) as study_duration FROM activities WHERE DATE_PART('month', reported_on) = $1 AND DATE_PART('year', reported_on) = $2 AND user_id = $3;", month, year, user.id)
        console.log(res.rows)
        return res.rows
    }

}

const getWeeklySummary = async(user) => {
    const res = await executeQuery("SELECT AVG(sleep_quality)::numeric(100,2) as sleep_quality, AVG(mood)::numeric(100,2) as mood, AVG(sleep_duration)::numeric(100,2) as sleep_duration, AVG(exercise_duration)::numeric(100,2) as exercise_duration, AVG(study_duration)::numeric(100,2) as study_duration FROM activities WHERE DATE_PART('week', reported_on) = (DATE_PART('week', NOW()) -1 ) AND DATE_PART('year', reported_on) = DATE_PART('year', NOW()) AND user_id = $1;", user.id);
    if (!res.rows[0].mood) {
        return [];
    }
    console.log('Weekly Summary',res.rows)

    return res.rows;
}

const getMonthlySummary = async(user) => {
    const res = await executeQuery("SELECT AVG(sleep_quality)::numeric(100,2) as sleep_quality, AVG(mood)::numeric(100,2) as mood, AVG(sleep_duration)::numeric(100,2) as sleep_duration, AVG(exercise_duration)::numeric(100,2) as exercise_duration, AVG(study_duration)::numeric(100,2) as study_duration FROM activities WHERE DATE_PART('month', reported_on) = (DATE_PART('month', NOW()) -1) AND DATE_PART('year', reported_on) = DATE_PART('year', NOW()) AND user_id = $1;", user.id);
    if (!res.rows[0].mood) {
        return [];
    }
    console.log('Monthly Summary',res.rows)
    return res.rows;
}

const apiSummary = async() => {
    const res = await executeQuery("SELECT AVG(sleep_quality)::numeric(100,2) as sleep_quality, AVG(mood)::numeric(100,2) as mood, AVG(sleep_duration)::numeric(100,2) as sleep_duration, AVG(exercise_duration)::numeric(100,2) as exercise_duration, AVG(study_duration)::numeric(100,2) as study_duration FROM activities WHERE (reported_on > (CURRENT_DATE - INTERVAL '7 days')) ");

    if (!res){
        return {}
    }

    return res.rows

}

const apiSummaryById = async(year,month,day) => {

    console.log('year:', year, 'month:', month, 'day:', day)

    const res = await executeQuery("SELECT AVG(sleep_quality)::numeric(100,2) as sleep_quality, AVG(mood)::numeric(100,2) as mood, AVG(sleep_duration)::numeric(100,2) as sleep_duration, AVG(exercise_duration)::numeric(100,2) as exercise_duration, AVG(study_duration)::numeric(100,2) as study_duration FROM activities WHERE DATE_PART('year', reported_on) = $1 AND DATE_PART('month', reported_on) = $2 AND DATE_PART('day', reported_on) = $3;", year, month, day);

    if (!res){
        return {}
    }

    return res.rows



}

export { getActivityListToday, getActivityListYesterday, addMorningActivity, addEveningActivity, getMonthlySummary, getWeeklySummary, postSummaryWeek, postSummaryMonth, apiSummary, apiSummaryById };
