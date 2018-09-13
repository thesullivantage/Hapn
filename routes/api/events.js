const router = require("express").Router();
const eventsController = require("../../controllers/eventsController");

// Matches with "/api/events"
router
    .route("/")
    .get(eventsController.findAllEvents)
    .post(eventsController.createEvent)
    // .delete(eventsController.deleteExpiredEvents);

// Matches with "/api/events/daily
router
    .route("/daily")
    .get(eventsController.findAllDailyEvents)
    
// Matches with "/api/events/weekly
router
    .route("/weekly")
    .get(eventsController.findAllWeeklyEvents)

// Matches with "/api/events/montly
router
    .route("/monthly")
    .get(eventsController.findAllMonthlyEvents)

// Matches with "/api/events/:id"
router
    .route("/:id")
    .get(eventsController.findEventById)
    .put(eventsController.updateEvent)
    .delete(eventsController.removeEvent);

router
    .route("/create")
    .post(eventsController.createEvent);

router 
    .route("/yes")
    .post(eventsController.rsvpYes)

router
    .route("/no")
    .post(eventsController.rsvpNo)

router 
    .route("/undo")
    .post(eventsController.Unaccept)

router 
    .route("/checker")
    .post(eventsController.checker)

router 
    .route("/decrypt")
    .post(eventsController.decrypter)

router 
    .route("/spend")
    .post(eventsController.spenter)

// Do this in controller
// router 
//     .route("/invite")
//     .post(eventsController.Invitation)

module.exports = router;
