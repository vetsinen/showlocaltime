function convert(remoteDateTime) {
    var arr, remoteTime, remoteDate;
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
        case 'MDT': {timezone='GMT-6';break}
        case 'EDT': {timezone='GMT-4';break}
        case 'PDT': {timezone='GMT-7';break}
        case 'CDT': {timezone='GMT-5';break}

    }

    arr = timezone.split('GMT');
    if (arr.length === 2) {
        let offset = parseInt(arr[1]);
        hours = hours - offset+3;
    }

    let fullStart = remoteDate + ('0000' + hours).slice(-2) + ':' + ('0000' + minutes).slice(-2) + ':00.000Z';
    let d = new Date(fullStart);
    return d.toISOString().slice(11,16)
}

// console.log(convert('10:30 AM to 8:30 PM GMT+1\n'));