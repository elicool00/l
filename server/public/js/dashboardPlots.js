const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday ", "Friday", "Saturday", "Sunday"];

/* * This week * */

var bar_data = {
    data : $('#bar-week').data('week'),
    bars: { show: true }
}
$.plot('#bar-week', [bar_data], {
    grid  : {
        hoverable  : true,
        borderWidth: 1,
        borderColor: '#f3f3f3',
        tickColor  : '#f3f3f3'
    },
    series: {
        bars: {
            show: true, barWidth: 0.5, align: 'center',
        },
    },
    colors: ['#3c8dbc'],
    xaxis : {
        ticks: [[1,'Mon'], [2,'Tue'], [3,'Wed'], [4,'Thu'], [5,'Fri'],[6,'Sat'],[7,'Sun']]
    }
})

/* * This year * */

var bar_data2 = {
    data : $('#bar-year').data('year'),
    bars: { show: true }
}
$.plot('#bar-year', [bar_data2], {
    grid  : {
        hoverable  : true,
        borderWidth: 1,
        borderColor: '#f3f3f3',
        tickColor  : '#f3f3f3'
    },
    series: {
        bars: {
            show: true, barWidth: 0.5, align: 'center',
        },
    },
    colors: ['#3c8dbc'],
    xaxis : {
        ticks: [[1,'Jan'], [2,'Feb'], [3,'Mar'], [4,'Apr'], [5,'May'],[6,'Jun'],[7,'Jul'],[8,'Aug'],[9,'Sep'],[10,'Oct'],[11,'Nov'],[12,'Dec']]
    },
})

$('#bar-year').on('plothover', function (event, pos, item) {
    if (item) {
        var y = item.datapoint[1].toFixed(2)
        $('#line-chart-tooltip').html(monthNames[item.datapoint[0] - 1] + " : " + item.datapoint[1])
        .css({
            top : item.pageY + 5,
            left: item.pageX + 5
        })
        .fadeIn(200)
    } else {
        $('#line-chart-tooltip').hide()
    }

})
$('#bar-week').on('plothover', function (event, pos, item) {
    if (item) {
        var y = item.datapoint[1].toFixed(2)
        $('#line-chart-tooltip').html(dayNames[item.datapoint[0] - 1] + " : " + item.datapoint[1])
        .css({
            top : item.pageY + 5,
            left: item.pageX + 5
        })
        .fadeIn(200)
    } else {
        $('#line-chart-tooltip').hide()
    }

})
