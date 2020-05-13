import { Component, OnInit } from '@angular/core';
import { PaginationService } from './pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  private next = { label: 'Próxima', disabled: false };
  private previous = { label: 'Anterior', disabled: true };
  private pageCurrent = { label: 1, isActive: true };
  private pages: any[] = [];
  private isVisible: boolean = true;

  public constructor(private paginationService: PaginationService) { 
    this.paginationService.emitirTamanho.subscribe(value => {
      if(value.size > 6 ) {
        this.isVisible = true;
        this.generatePages(value.size, value.pageCurrent);
      }
      else {
        this.isVisible = false;
      }
    });
  }

  private generatePages(size: number, indexPage:number) {
    this.pages = [];
    let n = this.getLength(size, 6);
    for(let i = 1; i <= n; i++) {
      this.pages.push({ label: i, isActive: false });
    }

    let page = this.pages.filter(page => {
      return page.label == indexPage;
    })[0];

    this.pageCurrent = page;
    this.pageCurrent.isActive = true;
  }

  private getLength(size: number, count: number) {
    let n = size/count;
    let x = parseInt(n.toFixed());
    if(x < n) {
      return x + 1;
    }

    return x;
  }

  private exchangePage(index: number) {
    this.pageCurrent.isActive = false;
    this.pages[index].isActive = true;
    this.pageCurrent = this.pages[index];
  }

  private nextPage() {
    let index = this.getIndex(this.pageCurrent);
    this.pageCurrent.isActive = false;
    let page = this.pages[index + 1];
    page.isActive = true;
    this.pageCurrent = page;
       
  }

  private previousPage() {
    let index = this.getIndex(this.pageCurrent);
    this.pageCurrent.isActive = false;
    let page = this.pages[index - 1];
    page.isActive = true;
    this.pageCurrent = page;
  }

  private getIndex(page: any) {
    return this.pages.indexOf(page);
  }

  private eventChange() {
    let index = this.getIndex(this.pageCurrent);
    
    if(index == 0) {
      this.previous.disabled = true;
    }

    if(index > 0) {
      this.previous.disabled = false;
    }

    if(index == this.pages.length - 1) {
      this.next.disabled = true;
    }

    if(index < this.pages.length - 1) {
      this.next.disabled = false;
    }
  }

  ngOnInit() {}
}
