import { Router } from "../deps.js";
import * as activityController from "./controllers/activityController.js";
import * as activityApi from "./apis/activityApi.js";
import * as activityService from "../services/activityService.js";
import * as userService from "../services/userService.js";
import * as userController from "./controllers/userController.js";



const router = new Router();

router.get('/', activityController.activityList);
router.get('/api/summary', activityApi.jsonSummaryData);
router.get('/api/summary/:year/:month/:day', activityApi.jsonSummaryByIdData);
router.post('/behavior/reporting/morning', activityService.addMorningActivity)
router.post('/behavior/reporting/evening', activityService.addEveningActivity)
router.get('/auth/register', userController.showRegistrationForm)
router.post('/auth/register', userService.postRegistrationForm)
router.get('/auth/login', userController.showLoginForm)
router.post('/auth/login', userService.postLoginForm)
router.post('/auth/logout', userService.postLogoutForm)
router.get('/behavior/summary', activityController.showSummaryForm)
router.post('/behavior/summary/week', activityController.showSummaryFormWeek)
router.post('/behavior/summary/month', activityController.showSummaryFormMonth)
router.get('/behavior/reporting', activityController.showReportingForm)


export { router };