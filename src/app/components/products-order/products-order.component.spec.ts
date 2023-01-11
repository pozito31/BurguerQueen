import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsOrderComponent } from './products-order.component';

describe('ProductsOrderComponent', () => {
  let component: ProductsOrderComponent;
  let fixture: ComponentFixture<ProductsOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
