import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteJuegoComponent } from './reporte-juego.component';

describe('ReporteJuegoComponent', () => {
  let component: ReporteJuegoComponent;
  let fixture: ComponentFixture<ReporteJuegoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteJuegoComponent]
    });
    fixture = TestBed.createComponent(ReporteJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
