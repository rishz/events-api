/**
 * Created by rishabhshukla on 06/06/17.
 */

const express = require("express");
const app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var Event = require('./models/event.js');

mongoose.connect('mongodb://rishz:eventsdb@ds111262.mlab.com:11262/events');

app.use(bodyParser.urlencoded({extended: true}));

var port = 8100;

router.route('/events')

    .post(function (req, res) {

        var event = new Event;
        event.name = req.body.name;
        event.timestamp = req.body.timestamp;
        // event.event_id = req.body.event_id;
        event.attending_count = req.body.attending_count;
        event.interested_count = req.body.interested_count;
        event.start_time = req.body.start_time;
        event.end_time = req.body.end_time;
        event.place = req.body.place;
        event.is_private = req.body.is_private;

        event.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Event Created'});
        })
    })

    .get(function (req, res) {
        Event.find(function (err, events) {
            if (err) {
                res.send(err)
            }
            res.json(events)
        })
    });

router.get('/', function (req, res) {

    res.json({message: 'welcome to events-api!'})

});

router.route('/event/:event_id')

.get(function (req, res) {
    Event.findById(req.params.event_id, function (err, event) {
        if(err){
            res.send(err);
        }
        res.send(event)
    });
})
    .put(function (req, res) {
        Event.findById(req.params.event_id,function (err, event) {
            if(err){
                res.send(err);
            }
            event.name = req.body.name;
            event.timestamp = req.body.timestamp;
            event.attending_count = req.body.attending_count;
            event.interested_count = req.body.interested_count;
            event.start_time = req.body.start_time;
            event.end_time = req.body.end_time;
            event.place = req.body.place;
            event.is_private = req.body.is_private;
            
            event.save(function (err) {
                if(err){
                    res.send(err);
                }
                res.json({message:'Event Updated'})
            })
        })
    })

.delete(function (req, res) {
    Event.remove({_id:req.params.event_id}, function (err, event) {
        if(err){
            res.send(err)
        }

        res.json('Successfully Deleted')
    })
});


app.use('/api', router);
app.listen(port);
console.log("Listening on port " + port);
