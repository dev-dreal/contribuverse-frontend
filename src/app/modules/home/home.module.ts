import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { HomeRoutingModule } from './home-routing.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [IndexComponent, HeaderComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
