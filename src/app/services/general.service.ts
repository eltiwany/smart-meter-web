import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  getGreeting() {
    let myDate = new Date();
    let hrs = myDate.getHours();

    if (hrs < 12)
      return 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
      return 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
      return 'Good Evening';
    else
      return 'Hi';
  }

  formatNumber(num: number, digits: number) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }
}
