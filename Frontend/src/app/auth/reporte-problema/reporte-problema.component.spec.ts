import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteProblemaComponent } from './reporte-problema.component';

describe('ReporteProblemaComponent', () => {
  let component: ReporteProblemaComponent;
  let fixture: ComponentFixture<ReporteProblemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteProblemaComponent]
    });
    fixture = TestBed.createComponent(ReporteProblemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
