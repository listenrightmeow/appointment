/*!
* Appointment - Don't be late
* v0.0.1
* https://github.com/mdyer/appointment
* copyright n9nemedia 2011
* MIT License
*/
Object.prototype.appointmentTime = function(type, date, hours) {
    if(type == 'Hourly') return false;
    var el = this,
        hours = hours.split(' '),        
        timestamp = new Date(date[2] + ',' + date[0] + ',' + date[1]),
        days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        selectedDay = days[timestamp.getDay()];

    var init = {
        
        hours : function(type, selectedDay, hours) {
            var intervals;
            console.log(hours);
            if(!hours[0].match(/\d+/g)) {
                intervals = [hours.join(' ')];
            } else {
                intervals = this.increment.call({ hours: hours, type: type });
            }
            this.updateVals(intervals);
        },

        increment : function() {
            console.log(this);
            var interval = (this.type == '15 minutes') ?  ['00','15','30','45'] : ['00', '30'],
                intervals = [],
                hours = [this.hours[0].replace(/:\d+(am|pm)/gi, ''), this.hours[2].replace(/:\d+(am|pm)/gi, '')];
            for (i = ~~hours[0]; i < 12 ; i++) {
                interval.map(function(_int){
                    intervals.push(i + ':' + _int +' AM');
                });
            }
            for (i = 0; i < ~~hours[1]; i++) {
                interval.map(function(_int){
                    if(i != 0) 
                        intervals.push(i + ':' + _int +' PM');
                    else 
                        intervals.push('12:' + _int +' PM');
                });
            }

            if(this.hours[0].match(/:\d+/g)) {
                switch(this.type) {
                    case '15 minutes':
                        if(this.hours[0].match(/:\d+/g) == ':15') intervals.splice(0, 1)
                        else if(this.hours[0].match(/:\d+/g) == ':30') intervals.splice(0, 2)
                        else if(this.hours[0].match(/:\d+/g) == ':45') intervals.splice(0, 3)
                    break;
                    case '30 minutes':
                        if(this.hours[0].match(/:\d+/g) == ':30') intervals.shift();
                    break;
                }
            } 

            if(this.hours[2].match(/:\d+/g)) {
                var endInterval;
                if(this.type == '15 minutes') {
                    switch(this.hours[2].match(/:\d+/g)[0]) {
                        case ':15':
                            endInterval = ['00'];
                        break;
                        case ':30':
                            endInterval = ['00', '15'];
                        break;
                        case ':45':
                            endInterval = ['00', '15', '30'];
                        break;
                    }    
                } else if(this.type == '30 minutes') {
                    switch(this.hours[2].match(/:\d+/g)[0]) {
                        case ':15':
                            endInterval = ['00'];
                        break;
                        case ':30':
                            endInterval = ['00'];
                        break;
                        case ':45':
                            endInterval = ['00', '30'];
                        break;
                    }    
                }
                if(this.hours[2].match(/:\d+/g)[0] != ':00') {
                    endInterval.map(function(_int){
                        intervals.push(~~hours[1] + ':' + _int +' PM');
                    });    
                }
            }
            return intervals;
        },

        updateVals : function(intervals) {
            var formVals = '';
            for (i = 0; i < intervals.length; i++) {
                formVals += '<option value=' + intervals[i] + '>' + intervals[i] + '</option>';
            }
            el.innerHTML = formVals;

        }   
    }
    init.hours(type, selectedDay, hours);
}

// (increments : 30 minutes or 15 minutes, date : MM/DD/YY)
document.querySelector('#times').appointmentTime('15 minutes', '10/11/12', '8:00AM - 5:00PM');