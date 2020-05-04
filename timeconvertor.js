function convert(remoteDateTime) {
    let arr, remoteTime, remoteDate, offset=0;
    arr = remoteDateTime.split('\n');
    if (arr.length === 2 && arr[1] === '') {
        remoteDate = new Date();
        remoteDate.setHours(12);
        remoteDate = remoteDate.toISOString().slice(0, 11)
        remoteTime = arr[0];
    }

    arr = remoteTime.split('to')
    var start = arr[0];
    if (arr.length === 2) {
        arr = arr[1].split(" ")
    }
    var timezone = (arr[arr.length - 1]).trim().toUpperCase();
    arr = start.split(':');
    let hours = parseInt(arr[0]);
    arr = arr[1].split(' ');
    let minutes = parseInt(arr[0]);
    if (arr[1] === 'PM') {
        hours += 12;
    }
    switch (timezone) {
        case 'MDT': {offset=-6;break}
        case 'EDT': {offset=-4;break}
        case 'PDT': {offset=-7;break}
        case 'CDT': {offset=-5;break}
    }

    arr = timezone.split('GMT');
    if (arr.length === 2) {
        offset = parseInt(arr[1]);
    }
    let soffset = (offset<0?'-':'+')+('00' + Math.abs(offset)).slice(-2)+':00';

    let fullStart = remoteDate + ('00' + hours).slice(-2) + ':' +
        ('00' + minutes).slice(-2) + ':00.000'+soffset;
    let d = new Date(fullStart);
    return d.toString().slice(16,21)+','+d.toString().slice(4,10);
}

// console.log(convert('10:30 AM to 8:30 PM GMT+1\n'));
