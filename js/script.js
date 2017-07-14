$(document).ready(function(){

    const button = $('button');
    button.on('click', function(){
        let firstDate = '';
        let secondDate = '';
        const begin = $('#firstDate input');
        for (let i=0; i<begin.length; i++) {
            firstDate += begin[i].value;
        }
        const end = $('#secondDate input');
        for (let i=0; i<end.length; i++) {
            secondDate += end[i].value;
        }
        let urlAPI = 'http://www.vizgr.org/historical-events/search.php?begin_date='+firstDate+'&end_date='+secondDate;
        loadFacts(urlAPI);
    });

    function loadFacts(userURL) {
        const section = $('#calendar');
        $.ajax({
            url: userURL,
            method: 'GET'
        }).done(function(response){
            console.log(response);
            $(response).find('event').each(function() {
                const date = $(this).find("date").text().split('/');
                const year = $('<div>', {class:'year'}).text(date[0]);
                const month = $('<div>', {class:'month'});
                switch (date[1]) {
                    case '01': {
                        month.text('JANUARY');
                        break;
                    }
                    case '02': {
                        month.text('FEBRUARY');
                        break;
                    }
                    case '03': {
                        month.text('MARCH');
                        break;
                    }
                    case '04': {
                        month.text('APRIL');
                        break;
                    }
                    case '05': {
                        month.text('MAY');
                        break;
                    }
                    case '06': {
                        month.text('JUNE');
                        break;
                    }
                    case '07': {
                        month.text('JULY');
                        break;
                    }
                    case '08': {
                        month.text('AUGUST');
                        break;
                    }
                    case '09': {
                        month.text('SEPTEMBER');
                        break;
                    }
                    case '10': {
                        month.text('OCTOBER');
                        break;
                    }
                    case '11': {
                        month.text('NOVEMBER');
                        break;
                    }
                    case '12': {
                        month.text('DECEMBER');
                        break;
                    }
                }
                const day = $('<div>', {class:'day'}).text(date[2]);
                const description = $(this).find("description").text();
                const eventDiv = $('<div>', {class:'event'});
                const dateDiv = $('<div>', {class:'date'});
                const infoDiv = $('<div>', {class:'description'});
                section.empty();
                dateDiv.append(year);
                dateDiv.append(day);
                dateDiv.append(month);
                infoDiv.text(description);
                eventDiv.append(dateDiv);
                eventDiv.append(infoDiv);
                section.append(eventDiv);
            });
        }).fail(function(error){
            section.empty();
            const errorDiv = $('<div>', {class:'error'});
            errorDiv.text('Sorry, try with another dates');
            section.append(errorDiv);
        })
    }

})
