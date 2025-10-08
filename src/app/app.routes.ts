import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Shop } from './shop/shop';
import { Detail } from './detail/detail';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: Home},
    {path: 'about', component: About},
    {path: 'contact', component: Contact},
    {path: 'shop/:filter', component: Shop, data: {prerender: false}},
    {path: 'detail/:id', component: Detail}
];
