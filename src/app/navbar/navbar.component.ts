import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../cart/cart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbModule, RouterModule, FormsModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isCollapsed = true;
  searchTerm: string = '';
  isHomePage: boolean = false; // Add this line 

  @Output() searchTermChange = new EventEmitter<string>(); // Event to emit search term


  cartItems: CartItem[] = [];

  constructor(private cartService: CartService, private router: Router) {
    this.cartService.cartItems$.subscribe(items => this.cartItems = items);
  }
  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => (this.cartItems = items));
    this.checkCurrentRoute(); // Check initial route

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkCurrentRoute(); // Check route changes
    });
  }

  onSearchTermChange(event: any) {
    this.searchTerm = event.target.value;
    this.searchTermChange.emit(this.searchTerm); // Emit search term on change
  }
  checkCurrentRoute() {
    this.isHomePage = this.router.url === '/home'; // Check if current route is /home or /
  }
}
