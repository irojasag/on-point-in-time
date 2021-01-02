import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  public nearbyDates = [];
  public availableHours = [];
  public dateControl: FormControl;
  constructor(private renderer: Renderer2) {
    this.availableHours = [
      '7:00 AM',
      '8:00 AM',
      '9:00 AM',
      '10:00 AM',
      '11:00 AM',
    ];
    this.dateControl = new FormControl(new Date());
    this.dateControl.valueChanges.subscribe((newDate) => {
      // find in list of nerbyDates
      let index = 0;
      this.nearbyDates.find((currentDate, i) => {
        let date = ('0' + currentDate.getDate()).slice(-2);
        let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        let year = currentDate.getFullYear();

        currentDate = `${date}-${month}-${year}`;

        date = ('0' + newDate.getDate()).slice(-2);
        month = ('0' + (newDate.getMonth() + 1)).slice(-2);
        year = year = newDate.getFullYear();

        const dateToSearch = `${date}-${month}-${year}`;
        if (dateToSearch === currentDate) {
          index = i;
          return true;
        }
        return false;
      });
      //scroll
      this.scroll('date-' + index);
    });
  }

  ngOnInit(): void {
    this.addNewDates();
  }

  private addNewDates(): void {
    const length = this.nearbyDates.length;
    for (let i = 0; i < 20; i++) {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + i + length);
      this.nearbyDates.push(newDate);
    }
  }
  public scroll(id): void {
    setTimeout(() => {
      const element = this.renderer.selectRootElement(`#${id}`, true);
      element.scrollIntoView({ behavior: 'smooth' }); // for smooth scrolling
    }, 10);
  }
}
