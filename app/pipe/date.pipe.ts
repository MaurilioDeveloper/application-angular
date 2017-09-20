import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'datex'
})

export class DatexPipe implements PipeTransform {
    transform(value: string, format: string = ""): string {
        if (!value || value === "") return "";
        let data: Date = new Date(value);
        return this.getFormattedDate(data);

    }

    getFormattedDate(date) {
        var year = date.getFullYear();
        
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        var hour = date.getHours();
        hour = hour > 9 ? hour : '0' + hour;
        
        var minutes = date.getMinutes();
        minutes = minutes > 9 ? minutes : '0' + minutes;

        var seconds = date.getSeconds();
        seconds = seconds > 9 ? seconds : '0' + seconds;
        
        return  day + '/' + month + '/' + year + ' ' + hour + ':' + minutes + ':' + seconds;

    }

} 